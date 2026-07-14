const capabilities = require("./capabilities.json");
const questions = require("./questions.json");
const { generateJson } = require("./providers");

function cleanText(value, max = 2000) {
  return String(value || "").trim().slice(0, max);
}

function classifyLocally(message) {
  const normalized = cleanText(message).toLowerCase();
  let best = "lead-qualification";
  let score = 0;

  for (const [key, capability] of Object.entries(capabilities)) {
    const current = capability.keywords.reduce((total, keyword) => (
      normalized.includes(keyword.toLowerCase()) ? total + 1 : total
    ), 0);
    if (current > score) {
      best = key;
      score = current;
    }
  }
  return best;
}

function buildQuestions(category, language) {
  const lang = language === "en" ? "en" : "ar";
  const capability = capabilities[category] || capabilities["lead-qualification"];
  const focus = capability[lang];
  const categoryQuestion = {
    id: "desiredOutcome",
    type: "choice",
    question: focus.focusQuestion,
    options: focus.focusOptions,
    placeholder: lang === "ar" ? "أو اكتب النتيجة المطلوبة..." : "Or describe the desired outcome..."
  };
  return [questions[lang][0], categoryQuestion, ...questions[lang].slice(1)];
}

async function analyzeRequest(message, language) {
  const lang = language === "en" ? "en" : "ar";
  let category = classifyLocally(message);
  let provider = "local";
  let acknowledgement = lang === "ar"
    ? "فهمت الفكرة الأولية. سأطرح عليك أسئلة قصيرة حتى أبني تصورًا مناسبًا للعملية."
    : "I understand the initial idea. I’ll ask a few short questions to shape the right workflow.";

  try {
    const allowed = Object.entries(capabilities).map(([key, value]) => `${key}: ${value[lang].summary}`).join("\n");
    const result = await generateJson([
      {
        role: "system",
        content: `Classify the user's request into exactly one allowed category. Reply as JSON only with keys category and acknowledgement. The acknowledgement must be one short, helpful sentence in ${lang === "ar" ? "Arabic" : "English"}. Allowed categories:\n${allowed}`
      },
      { role: "user", content: cleanText(message, 1500) }
    ], { maxTokens: 250, temperature: 0.1 });

    if (capabilities[result.data.category]) category = result.data.category;
    if (result.data.acknowledgement) acknowledgement = cleanText(result.data.acknowledgement, 300);
    provider = result.provider;
  } catch (_) {
    // Local classification keeps the intake usable before API keys are configured.
  }

  return {
    category,
    categoryLabel: capabilities[category][lang].title,
    acknowledgement,
    questions: buildQuestions(category, lang),
    provider
  };
}

function answerMap(answers) {
  return Object.fromEntries((Array.isArray(answers) ? answers : []).map((item) => [item.id, cleanText(item.value, 1200)]));
}

function localProposal(payload) {
  const lang = payload.language === "en" ? "en" : "ar";
  const capability = capabilities[payload.category] || capabilities["lead-qualification"];
  const copy = capability[lang];
  const answers = answerMap(payload.answers);
  const channel = answers.channels || (lang === "ar" ? "القنوات الحالية" : "current channels");
  const systems = answers.systems || (lang === "ar" ? "الأنظمة الحالية" : "current systems");
  const outcome = answers.desiredOutcome || copy.focusOptions[0];
  const handoff = answers.handoff || (lang === "ar" ? "الحالات التي تحتاج قرارًا بشريًا" : "cases requiring a human decision");

  if (lang === "ar") {
    return {
      title: `تصور مقترح: ${copy.title}`,
      subtitle: "تصور تشغيلي أولي مصمم حول احتياج العمل",
      opening: "كل خطوة يدوية تتكرر دون مسار واضح تستهلك وقت الفريق وتؤخر الفرص. هذا التصور يحول العملية إلى رحلة منظمة، قابلة للقياس، مع بقاء القرار البشري حاضرًا حيث يصنع الفرق.",
      challenge: cleanText(payload.initialRequest, 900),
      solution: `${copy.summary} يبدأ العمل من ${channel} ويتكامل تشغيليًا مع ${systems}، مع تركيز واضح على ${outcome}.`,
      workflow: [
        { title: "استقبال الطلب", description: `استقبال الحالة من ${channel} وتسجيل نقطة البداية بوضوح.` },
        { title: "جمع المعلومات", description: "طرح الأسئلة المطلوبة وتجميع البيانات الأساسية دون إرهاق العميل." },
        { title: "التحقق من الاكتمال", description: "اكتشاف المعلومات الناقصة وطلبها قبل انتقال الحالة للمرحلة التالية." },
        { title: "التصنيف والتوجيه", description: "تصنيف الحالة وفق قواعد العمل وتحديد الإجراء أو الأولوية المناسبة." },
        { title: "تنفيذ الإجراء", description: `تنفيذ المسار المتفق عليه لتحقيق ${outcome}.` },
        { title: "التسليم البشري", description: `تحويل ${handoff} إلى الموظف المناسب مع ملخص كامل.` },
        { title: "التوثيق والمتابعة", description: `تحديث ${systems} وإظهار نتيجة كل حالة للفريق.` }
      ],
      humanRole: "يحتفظ الفريق بالموافقات النهائية والحالات الحساسة والاستثناءات، بينما يتولى الوكيل الاستقبال والجمع والتصنيف والمتابعة المتكررة.",
      businessValue: ["استجابة أكثر انتظامًا", "تقليل العمل اليدوي المتكرر", "وضوح أكبر في حالة كل طلب", "تسليم أسرع للحالات المهمة"],
      successMetrics: ["زمن الاستجابة الأول", "نسبة اكتمال البيانات", "عدد الحالات المنفذة دون متابعة يدوية", "نسبة الحالات المسلمة بنجاح للفريق"],
      salesLine: "الهدف ليس إضافة أداة أخرى، بل منح فريقك مسار عمل ينفذ الجزء المتكرر ويترك له الوقت للقرارات التي تحتاج خبرته.",
      nextStep: "نوصي بجلسة تحقق قصيرة، ثم Pilot محدود النطاق على عملية واحدة لقياس الأثر قبل التوسع."
    };
  }

  return {
    title: `Proposed concept: ${copy.title}`,
    subtitle: "An initial operating concept designed around your workflow",
    opening: "Every repeated manual step without a clear path consumes team time and slows opportunities. This concept turns the process into an organized, measurable journey while keeping human judgment where it matters.",
    challenge: cleanText(payload.initialRequest, 900),
    solution: `${copy.summary} It starts from ${channel}, works operationally with ${systems}, and focuses on ${outcome}.`,
    workflow: [
      { title: "Request intake", description: `Receive the case from ${channel} and record a clear starting point.` },
      { title: "Information gathering", description: "Ask the required questions and collect essential data without burdening the customer." },
      { title: "Completeness check", description: "Detect and request missing information before moving forward." },
      { title: "Classification and routing", description: "Classify the case using business rules and select the right priority or action." },
      { title: "Action execution", description: `Run the agreed path to achieve ${outcome}.` },
      { title: "Human handoff", description: `Transfer ${handoff} to the right team member with a complete summary.` },
      { title: "Documentation and follow-up", description: `Update ${systems} and keep the outcome visible to the team.` }
    ],
    humanRole: "The team keeps final approvals, sensitive cases, and exceptions, while the agent handles repetitive intake, collection, classification, and follow-up.",
    businessValue: ["More consistent response", "Less repeated manual work", "Clearer status for every request", "Faster handoff of important cases"],
    successMetrics: ["First-response time", "Information completion rate", "Cases completed without manual follow-up", "Successful handoff rate"],
    salesLine: "The goal is not to add another tool, but to give your team a workflow that executes repetitive work and preserves its time for decisions requiring expertise.",
    nextStep: "We recommend a short validation session followed by a limited pilot on one process before expanding."
  };
}

function normalizeProposal(candidate, fallback) {
  const output = { ...fallback };
  const stringKeys = ["title", "subtitle", "opening", "challenge", "solution", "humanRole", "salesLine", "nextStep"];
  for (const key of stringKeys) {
    if (candidate?.[key]) output[key] = cleanText(candidate[key], key === "challenge" ? 1000 : 700);
  }
  if (Array.isArray(candidate?.workflow) && candidate.workflow.length >= 5) {
    output.workflow = candidate.workflow.slice(0, 9).map((step) => ({
      title: cleanText(step.title, 100),
      description: cleanText(step.description, 350)
    })).filter((step) => step.title && step.description);
  }
  for (const key of ["businessValue", "successMetrics"]) {
    if (Array.isArray(candidate?.[key]) && candidate[key].length) {
      output[key] = candidate[key].slice(0, 6).map((item) => cleanText(item, 180)).filter(Boolean);
    }
  }
  return output;
}

async function generateProposal(payload) {
  const fallback = localProposal(payload);
  const lang = payload.language === "en" ? "en" : "ar";
  const capability = capabilities[payload.category] || capabilities["lead-qualification"];

  try {
    const result = await generateJson([
      {
        role: "system",
        content: `You are Falaq Intelligence's business workflow designer. Create a polished business proposal in ${lang === "ar" ? "Arabic" : "English"}. Stay strictly within this capability: ${capability[lang].summary}

Write for a business decision-maker, not an engineer. Do not mention APIs, databases, prompts, model names, code, architecture, authentication, or implementation internals. Use confident but honest marketing language. Do not invent percentages, prices, guarantees, client results, or delivery dates.

Return JSON only with this schema:
{"title":"","subtitle":"","opening":"","challenge":"","solution":"","workflow":[{"title":"","description":""}],"humanRole":"","businessValue":[""],"successMetrics":[""],"salesLine":"","nextStep":""}

The workflow must have 5 to 9 operational steps. Keep marketing language to a few strong lines; most of the document must remain practical.`
      },
      { role: "user", content: JSON.stringify({ initialRequest: payload.initialRequest, answers: payload.answers }) }
    ], { maxTokens: 2400, temperature: 0.3 });

    return { proposal: normalizeProposal(result.data, fallback), provider: result.provider };
  } catch (_) {
    return { proposal: fallback, provider: "local" };
  }
}

module.exports = { analyzeRequest, generateProposal, cleanText };
