// Tried in order. Cerebras leads on free daily allowance, Groq on latency,
// so the pair covers both a burst and a long quiet day before the rest kick in.
const PROVIDERS = [
  {
    name: "cerebras",
    keyEnv: "CEREBRAS_API_KEY",
    modelEnv: "CEREBRAS_MODEL",
    defaultModel: "gpt-oss-120b",
    url: "https://api.cerebras.ai/v1/chat/completions"
  },
  {
    name: "groq",
    keyEnv: "GROQ_API_KEY",
    modelEnv: "GROQ_MODEL",
    defaultModel: "llama-3.3-70b-versatile",
    url: "https://api.groq.com/openai/v1/chat/completions"
  },
  {
    name: "gemini",
    keyEnv: "GEMINI_API_KEY",
    modelEnv: "GEMINI_MODEL",
    defaultModel: "gemini-2.0-flash",
    url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions"
  },
  {
    name: "openrouter",
    keyEnv: "OPENROUTER_API_KEY",
    modelEnv: "OPENROUTER_MODEL",
    defaultModel: "openai/gpt-oss-20b:free",
    url: "https://openrouter.ai/api/v1/chat/completions"
  }
];

function providerKey(provider) {
  return process.env[provider.keyEnv] || "";
}

function configuredProviders() {
  return PROVIDERS.filter((provider) => Boolean(providerKey(provider)));
}

function parseJsonContent(content) {
  const text = String(content || "").trim();
  try {
    return JSON.parse(text);
  } catch (_) {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end <= start) throw new Error("Provider returned invalid JSON");
    return JSON.parse(text.slice(start, end + 1));
  }
}

async function callProvider(provider, messages, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout || 45000);

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${providerKey(provider)}`
    };
    if (provider.name === "openrouter") {
      headers["HTTP-Referer"] = process.env.PUBLIC_SITE_URL || "http://localhost:3000";
      headers["X-Title"] = "Falaq Intelligence Workflow Builder";
    }

    const response = await fetch(provider.url, {
      method: "POST",
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        model: process.env[provider.modelEnv] || provider.defaultModel,
        messages,
        temperature: options.temperature ?? 0.35,
        max_tokens: options.maxTokens || 2200
      })
    });

    if (!response.ok) {
      const detail = (await response.text()).slice(0, 300);
      throw new Error(`${response.status}: ${detail}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("Provider returned an empty response");
    return parseJsonContent(content);
  } finally {
    clearTimeout(timeout);
  }
}

async function generateJson(messages, options = {}) {
  const providers = configuredProviders();
  const errors = [];

  for (const provider of providers) {
    try {
      const data = await callProvider(provider, messages, options);
      return { data, provider: provider.name };
    } catch (error) {
      errors.push(`${provider.name}: ${error.message}`);
    }
  }

  const error = new Error(providers.length ? errors.join(" | ") : "No AI provider is configured");
  error.code = "NO_PROVIDER_AVAILABLE";
  throw error;
}

let probeCache = { at: 0, result: null };

// A provider only ever runs when the ones above it fail, so a retired endpoint
// or a renamed model can sit broken for weeks. This exercises each one for real.
// Cached, because the probe spends the same quota it is meant to protect.
async function probeProviders(maxAgeMs = 5 * 60 * 1000) {
  if (probeCache.result && Date.now() - probeCache.at < maxAgeMs) return probeCache.result;

  const result = await Promise.all(configuredProviders().map(async (provider) => {
    const model = process.env[provider.modelEnv] || provider.defaultModel;
    const startedAt = Date.now();
    try {
      await callProvider(provider, [
        { role: "system", content: 'Reply with JSON only: {"ok":true}' },
        { role: "user", content: "ping" }
      ], { maxTokens: 20, temperature: 0, timeout: 15000 });
      return { name: provider.name, model, ok: true, ms: Date.now() - startedAt };
    } catch (error) {
      return { name: provider.name, model, ok: false, ms: Date.now() - startedAt, error: error.message.slice(0, 160) };
    }
  }));

  probeCache = { at: Date.now(), result };
  return result;
}

module.exports = { configuredProviders, generateJson, probeProviders };
