const { execFileSync } = require("node:child_process");

const PROVIDERS = [
  {
    name: "groq",
    keyEnv: "GROQ_API_KEY",
    modelEnv: "GROQ_MODEL",
    defaultModel: "llama-3.3-70b-versatile",
    url: "https://api.groq.com/openai/v1/chat/completions"
  },
  {
    name: "cerebras",
    keyEnv: "CEREBRAS_API_KEY",
    modelEnv: "CEREBRAS_MODEL",
    defaultModel: "gpt-oss-120b",
    url: "https://api.cerebras.ai/v1/chat/completions"
  },
  {
    name: "openrouter",
    keyEnv: "OPENROUTER_API_KEY",
    modelEnv: "OPENROUTER_MODEL",
    defaultModel: "openai/gpt-oss-20b:free",
    url: "https://openrouter.ai/api/v1/chat/completions"
  },
  {
    name: "github-models",
    keyEnv: "GITHUB_MODELS_TOKEN",
    modelEnv: "GITHUB_MODELS_MODEL",
    defaultModel: "openai/gpt-4.1-mini",
    url: "https://models.github.ai/inference/chat/completions"
  }
];

let cachedGitHubToken;

function providerKey(provider) {
  if (process.env[provider.keyEnv]) return process.env[provider.keyEnv];
  if (provider.name !== "github-models") return "";
  if (cachedGitHubToken !== undefined) return cachedGitHubToken;
  try {
    cachedGitHubToken = execFileSync("gh", ["auth", "token"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch (_) {
    cachedGitHubToken = "";
  }
  return cachedGitHubToken;
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

module.exports = { configuredProviders, generateJson };
