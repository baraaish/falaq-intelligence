const express = require("express");
const path = require("node:path");
const fs = require("node:fs/promises");
const crypto = require("node:crypto");
const { analyzeRequest, validateAnswer, generateProposal, cleanText } = require("./proposal");
const { renderPdf } = require("./pdf");
const capabilities = require("./capabilities.json");
const { configuredProviders } = require("./providers");

const app = express();
const port = Number(process.env.PORT) || 3000;
const root = path.resolve(__dirname, "..");
const dataDirectory = path.join(__dirname, "data");

app.use(express.json({ limit: "1mb" }));

const allowedOrigins = new Set([
  "https://falaqai.com",
  "https://www.falaqai.com",
  "https://baraaish.github.io",
  ...(process.env.CORS_ORIGINS || "").split(",").map((origin) => origin.trim()).filter(Boolean)
]);

app.use((request, response, next) => {
  const origin = request.get("origin");
  if (origin && allowedOrigins.has(origin)) {
    response.set({
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      Vary: "Origin"
    });
  }
  if (request.method === "OPTIONS") return response.sendStatus(origin && allowedOrigins.has(origin) ? 204 : 403);
  next();
});

function isValidEmail(value) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value) {
  return !value || String(value).replace(/\D/g, "").length >= 8;
}

function normalizeContact(input = {}) {
  return {
    name: cleanText(input.name, 120),
    company: cleanText(input.company, 160),
    email: cleanText(input.email, 180).toLowerCase(),
    phone: cleanText(input.phone, 60)
  };
}

async function recordLead(record) {
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.appendFile(path.join(dataDirectory, "leads.jsonl"), `${JSON.stringify(record)}\n`, "utf8");

  if (!process.env.GOOGLE_SHEETS_URL) return false;
  try {
    const response = await fetch(process.env.GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      redirect: "follow"
    });
    return response.ok;
  } catch (error) {
    console.warn("Google Sheets sync failed:", error.message);
    return false;
  }
}

app.get("/api/agent/status", (_request, response) => {
  response.json({
    ok: true,
    providers: configuredProviders().map((provider) => provider.name),
    mode: configuredProviders().length ? "ai" : "local",
    googleSheets: Boolean(process.env.GOOGLE_SHEETS_URL)
  });
});

app.post("/api/agent/analyze", async (request, response) => {
  const message = cleanText(request.body?.message, 1500);
  const language = request.body?.language === "en" ? "en" : "ar";
  if (message.length < 3) return response.status(400).json({ error: language === "ar" ? "اكتب وصفًا أوضح قليلًا." : "Please add a little more detail." });

  try {
    response.json({ ok: true, ...(await analyzeRequest(message, language, request.body?.preferredCategory)) });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: language === "ar" ? "تعذر تحليل الطلب الآن." : "The request could not be analyzed right now." });
  }
});

app.post("/api/agent/validate-answer", async (request, response) => {
  const language = request.body?.language === "en" ? "en" : "ar";
  const answer = cleanText(request.body?.answer, 1600);
  if (!request.body?.question?.id || !answer) {
    return response.status(400).json({ error: language === "ar" ? "الإجابة غير مكتملة." : "The answer is incomplete." });
  }
  try {
    response.json({ ok: true, ...(await validateAnswer({ ...request.body, language, answer })) });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: language === "ar" ? "تعذر تقييم الإجابة." : "The answer could not be evaluated." });
  }
});

app.post("/api/agent/finalize", async (request, response) => {
  const language = request.body?.language === "en" ? "en" : "ar";
  const contact = normalizeContact(request.body?.contact);
  const category = capabilities[request.body?.category] ? request.body.category : "lead-qualification";
  const initialRequest = cleanText(request.body?.initialRequest, 1500);
  const answers = Array.isArray(request.body?.answers) ? request.body.answers.slice(0, 12) : [];

  if (!contact.name || (!contact.email && !contact.phone)) {
    return response.status(400).json({ error: language === "ar" ? "أدخل الاسم والبريد أو رقم واتساب." : "Enter your name and an email or WhatsApp number." });
  }
  if (!isValidEmail(contact.email) || !isValidPhone(contact.phone)) {
    return response.status(400).json({ error: language === "ar" ? "تحقق من البريد أو رقم واتساب." : "Check the email or WhatsApp number." });
  }
  if (!initialRequest || answers.length < 4) {
    return response.status(400).json({ error: language === "ar" ? "المحادثة غير مكتملة." : "The conversation is incomplete." });
  }

  try {
    const reference = `FLQ-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    const generated = await generateProposal({ language, category, initialRequest, answers });
    const categoryLabel = capabilities[category][language].title;
    const pdf = await renderPdf({ proposal: generated.proposal, contact, language, categoryLabel, reference });
    const record = {
      receivedAt: new Date().toISOString(),
      reference,
      ...contact,
      language,
      category,
      categoryLabel,
      initialRequest,
      answers,
      proposal: generated.proposal,
      provider: generated.provider,
      source: "falaq-bot"
    };
    const sheetSynced = await recordLead(record);
    const safeName = contact.name.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").slice(0, 50) || "client";

    response.json({
      ok: true,
      proposal: generated.proposal,
      provider: generated.provider,
      sheetSynced,
      reference,
      fileName: `Falaq-Proposal-${safeName}.pdf`,
      pdfBase64: Buffer.from(pdf).toString("base64")
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: language === "ar" ? "تعذر إنشاء الملف الآن. حاول مرة أخرى." : "The proposal could not be created. Please try again." });
  }
});

app.use((request, response, next) => {
  if (/^\/(backend|node_modules)(\/|$)/.test(request.path) || ["/package.json", "/package-lock.json", "/google-apps-script.js", "/GOOGLE_SHEETS_SETUP.md"].includes(request.path) || request.path.startsWith("/.env")) {
    return response.sendStatus(404);
  }
  next();
});
app.use(express.static(root, { dotfiles: "deny", extensions: ["html"] }));

app.listen(port, process.env.HOST || "127.0.0.1", () => {
  console.log(`Falaq website and agent running at http://127.0.0.1:${port}`);
  console.log(`Agent mode: ${configuredProviders().length ? configuredProviders().map((item) => item.name).join(" -> ") : "local fallback"}`);
});
