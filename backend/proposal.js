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

async function analyzeRequest(message, language, preferredCategory) {
  const lang = language === "en" ? "en" : "ar";
  let category = capabilities[preferredCategory] ? preferredCategory : classifyLocally(message);
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

    if (!capabilities[preferredCategory] && capabilities[result.data.category]) category = result.data.category;
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

const FOLLOW_UPS = {
  ar: {
    businessContext: "ماذا تقدم الشركة تحديدًا، ومن هو العميل الذي يشتري هذه الخدمة؟",
    currentProcess: "ما الخطوات التي تحدث بعد وصول الطلب، ومن ينفذ كل خطوة حتى النتيجة النهائية؟",
    pain: "ما الأثر الفعلي لهذه المشكلة: فرصة تضيع، وقت يتأخر، أم بيانات تصبح غير دقيقة؟",
    channels: "هل هذه هي قناة الوصول فقط، أم يجب أن يرد الوكيل ويتابع عبرها أيضًا؟",
    volume: "وما زمن الاستجابة المطلوب لهذه الحالات تقريبًا؟",
    rules: "اذكر أهم 3 معلومات يجب جمعها، وقاعدة واحدة تغيّر الإجراء أو الأولوية.",
    handoff: "عند التحويل، ما الملخص أو البيانات التي يجب أن تصل إلى الموظف؟",
    systems: "ما البيانات التي يجب قراءتها أو تحديثها داخل هذا النظام؟",
    success: "حوّلها إلى نتيجة واضحة يمكن ملاحظتها، مثل زمن رد أو حالة لا يجب أن تبقى دون متابعة.",
    desiredOutcome: "ما الإجراء النهائي الذي تريد من الوكيل تنفيذه لتحقيق هذه النتيجة؟",
    generic: "أعطني مثالًا عمليًا واحدًا حتى أبني الخطوة بشكل أدق."
  },
  en: {
    businessContext: "What exactly does the company offer, and who buys this service?",
    currentProcess: "What happens after the request arrives, who performs each step, and what closes the process?",
    pain: "What is the real impact: a lost opportunity, a delay, or inaccurate information?",
    channels: "Is this only the intake channel, or should the agent also reply and follow up there?",
    volume: "What response time do these cases require?",
    rules: "Name the three most important fields to collect and one rule that changes priority or action.",
    handoff: "At handoff, which summary or information must reach the team member?",
    systems: "Which information should be read or updated in that system?",
    success: "Turn that into an observable outcome, such as a response target or a case that must never remain unattended.",
    desiredOutcome: "What final action should the agent execute to achieve that outcome?",
    generic: "Give me one practical example so I can define this step more precisely."
  }
};

function localAnswerValidation(payload) {
  const lang = payload.language === "en" ? "en" : "ar";
  const question = payload.question || {};
  const answer = cleanText(payload.answer, 1600);
  const normalized = answer.toLowerCase();
  const exactOption = Array.isArray(question.options) && question.options.some((option) => option.toLowerCase() === normalized);
  const alwaysEnough = ["channels", "desiredOutcome"].includes(question.id) && exactOption;
  const weakAnswers = lang === "ar"
    ? ["لا اعرف", "لا أعرف", "عادي", "نعم", "لا", "مش عارف", "غير محدد"]
    : ["i don't know", "not sure", "normal", "yes", "no", "unknown", "not defined"];
  const weak = answer.length < 10 || weakAnswers.includes(normalized);
  const detailedIds = ["businessContext", "currentProcess", "pain", "rules", "handoff", "systems", "success"];
  const needsDetail = detailedIds.includes(question.id) && answer.length < 28;
  const sufficient = alwaysEnough || (!weak && !needsDetail && !(exactOption && question.id !== "channels" && question.id !== "desiredOutcome"));

  return {
    sufficient,
    followUp: sufficient ? "" : (FOLLOW_UPS[lang][question.id] || FOLLOW_UPS[lang].generic),
    normalizedAnswer: answer
  };
}

async function validateAnswer(payload) {
  const local = localAnswerValidation(payload);
  const exactOption = Array.isArray(payload.question?.options) && payload.question.options.includes(payload.answer);
  if (exactOption) return { ...local, provider: "local" };
  if (cleanText(payload.answer, 1600).length < 10) return { ...local, provider: "local" };

  const lang = payload.language === "en" ? "en" : "ar";
  try {
    const result = await generateJson([
      {
        role: "system",
        content: `You evaluate discovery answers for a business workflow proposal. Decide whether the answer is concrete enough to design the requested operational step. Do not demand engineering details, exact numbers the user may not know, or a long answer. Reject vague answers that do not identify the process, actor, information, decision, impact, or expected outcome requested by the question.

Reply in JSON only:
{"sufficient":true,"followUp":"","normalizedAnswer":""}

If insufficient, followUp must be one short, specific question in ${lang === "ar" ? "Arabic" : "English"} that asks only for the missing detail. normalizedAnswer should combine the useful facts already provided without inventing information.`
      },
      {
        role: "user",
        content: JSON.stringify({
          service: payload.category,
          initialRequest: cleanText(payload.initialRequest, 1500),
          question: payload.question,
          answer: cleanText(payload.answer, 1600),
          previousAnswers: Array.isArray(payload.previousAnswers) ? payload.previousAnswers.slice(-5) : []
        })
      }
    ], { maxTokens: 350, temperature: 0.1 });

    return {
      sufficient: result.data.sufficient === true,
      followUp: cleanText(result.data.followUp || local.followUp, 300),
      normalizedAnswer: cleanText(result.data.normalizedAnswer || payload.answer, 1600),
      provider: result.provider
    };
  } catch (_) {
    return { ...local, provider: "local" };
  }
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
  const business = answers.businessContext || (lang === "ar" ? "الشركة وعملاؤها" : "the company and its customers");
  const currentProcess = answers.currentProcess || cleanText(payload.initialRequest, 900);
  const pain = answers.pain || cleanText(payload.initialRequest, 900);
  const volume = answers.volume || (lang === "ar" ? "حجم العمل الحالي" : "the current workload");
  const rules = answers.rules || (lang === "ar" ? "المعلومات وقواعد الأولوية المتفق عليها" : "the agreed information and priority rules");
  const success = answers.success || (lang === "ar" ? "سرعة ووضوح أكبر في تنفيذ كل حالة" : "faster and clearer case execution");

  if (lang === "ar") {
    return {
      title: `تصور مقترح: ${copy.title}`,
      subtitle: "تصور تشغيلي أولي مصمم حول احتياج العمل",
      opening: `الحل المقترح يحوّل ${volume} من متابعة تعتمد على الذاكرة والجهد اليدوي إلى مسار واضح يبدأ من وصول الحالة وينتهي بإجراء موثق وقابل للمتابعة.`,
      challenge: `تعمل ${business} اليوم وفق المسار التالي: ${currentProcess}. نقطة التعطل الأساسية هي: ${pain}. النتيجة أن الفريق ينفق وقته في ملاحقة الخطوات بدل التركيز على الحالات التي تحتاج قراره وخبرته.`,
      solution: `${copy.summary} يبدأ من ${channel}، ويجمع ويقيّم الحالات وفق ${rules}، ثم ينفذ ${outcome} ويوثق النتيجة داخل ${systems}.`,
      workflow: [
        { title: "التقاط الحالة", description: `يستقبل الوكيل الحالة من ${channel} ويربطها بمصدرها ووقت وصولها.`, result: "طلب موثق وجاهز للمعالجة بدل بقائه داخل قناة غير منظمة." },
        { title: "جمع البيانات المطلوبة", description: `يدير محادثة قصيرة لجمع ${rules} دون طرح أسئلة لا تخدم القرار.`, result: "ملف حالة يحتوي المعلومات التي يحتاجها المسار التالي." },
        { title: "استكمال النواقص", description: "يفحص اكتمال الإجابات ويعيد السؤال بصورة أوضح عندما تكون المعلومة ناقصة أو مبهمة.", result: "لا تنتقل الحالة إلى التنفيذ ببيانات غير كافية." },
        { title: "تطبيق قواعد العمل", description: `يقيّم الحالة ويحدد الأولوية والإجراء المناسب بالاعتماد على ${rules}.`, result: "قرار تشغيلي واضح وقابل للمراجعة لكل حالة." },
        { title: "تنفيذ الإجراء التالي", description: `ينفذ ${outcome} ويرسل الرسالة أو المتابعة المناسبة حسب حالة العميل.`, result: "انتقال فعلي للخطوة التالية بدل الاكتفاء بالرد الآلي." },
        { title: "التسليم للموظف", description: `يحوّل ${handoff} إلى الموظف المناسب مع البيانات والسياق الذي جُمع.`, result: "يبدأ الموظف من قرار واضح، لا من إعادة قراءة المحادثة كاملة." },
        { title: "التحديث والإغلاق", description: `يسجل النتيجة والخطوة القادمة داخل ${systems} ويُبقي الحالات غير المغلقة ظاهرة للمتابعة.`, result: "سجل محدث وصورة واضحة لما تم وما ينتظر الإجراء." }
      ],
      decisionRules: [
        { condition: "المعلومات الإلزامية ناقصة", action: "يطلب الوكيل المعلومة الناقصة قبل التصنيف أو التنفيذ." },
        { condition: "الحالة تطابق أولوية أو إجراء متفقًا عليه", action: `ينفذ مسار ${outcome} مباشرة ويوثق سبب الاختيار.` },
        { condition: "الحالة حساسة أو خارج القواعد", action: `يطبق مسار التسليم البشري: ${handoff}.` }
      ],
      humanRole: "يحتفظ الفريق بالموافقات النهائية والحالات الحساسة والاستثناءات، بينما يتولى الوكيل الاستقبال والجمع والتصنيف والمتابعة المتكررة.",
      deliverables: ["مسار محادثة وجمع معلومات مصمم للعملية", "قواعد تصنيف وتوجيه متفق عليها", `ربط تشغيلي مع ${systems}`, "تسليم بشري بملخص كامل", "رؤية واضحة لحالة الطلبات والنتائج"],
      businessValue: [`التعامل المنتظم مع ${volume}`, `تقليل أثر المشكلة الحالية: ${pain}`, "منع انتقال الحالات الناقصة إلى الفريق", "توجيه وقت الموظفين للحالات التي تحتاج قرارًا بشريًا"],
      successMetrics: [success, "زمن الوصول إلى أول إجراء مفيد", "نسبة الحالات المكتملة من أول مسار", "عدد الحالات التي بقيت دون إجراء أو مالك", "نسبة التسليمات البشرية التي وصلت ببيانات كاملة"],
      salesLine: "هذا ليس ردًا آليًا إضافيًا؛ إنه مسار تشغيل ينقل الحالة من الوصول إلى النتيجة، ويمنح فريقك سيطرة أوضح على كل فرصة وكل استثناء.",
      nextStep: "نوصي بجلسة تحقق قصيرة، ثم Pilot محدود النطاق على عملية واحدة لقياس الأثر قبل التوسع."
    };
  }

  return {
    title: `Proposed concept: ${copy.title}`,
    subtitle: "An initial operating concept designed around your workflow",
    opening: `The proposed solution turns ${volume} from memory-driven manual follow-up into a defined path that starts at case arrival and ends with a documented action.`,
    challenge: `${business} currently operates as follows: ${currentProcess}. The primary breakdown is: ${pain}. The team spends time chasing steps instead of focusing on cases that require judgment and expertise.`,
    solution: `${copy.summary} It starts from ${channel}, collects and evaluates cases using ${rules}, executes ${outcome}, and documents the result in ${systems}.`,
    workflow: [
      { title: "Capture the case", description: `Receive the case from ${channel} and record its source and arrival time.`, result: "A documented request ready for processing." },
      { title: "Collect required information", description: `Run a focused conversation to gather ${rules}.`, result: "A case file containing the information needed for the next decision." },
      { title: "Complete missing details", description: "Check answer quality and ask a clearer follow-up when information is incomplete.", result: "No case moves forward without enough information." },
      { title: "Apply business rules", description: `Determine priority and action using ${rules}.`, result: "A clear, reviewable operating decision for every case." },
      { title: "Execute the next action", description: `Execute ${outcome} and send the appropriate response or follow-up.`, result: "Real movement to the next step, not only an automated reply." },
      { title: "Hand off to the team", description: `Transfer ${handoff} with the collected context and data.`, result: "The team starts from a clear decision instead of rereading the full conversation." },
      { title: "Update and close", description: `Record the result and next action in ${systems}, keeping open cases visible.`, result: "An updated record and a clear view of pending work." }
    ],
    decisionRules: [
      { condition: "Required information is missing", action: "Request the missing detail before classification or execution." },
      { condition: "The case matches an agreed priority or action", action: `Run the ${outcome} path and document why it was selected.` },
      { condition: "The case is sensitive or outside the rules", action: `Use the human handoff path: ${handoff}.` }
    ],
    humanRole: "The team keeps final approvals, sensitive cases, and exceptions, while the agent handles repetitive intake, collection, classification, and follow-up.",
    deliverables: ["A conversation and data-collection path designed for the process", "Agreed classification and routing rules", `Operational connection with ${systems}`, "Human handoff with a complete summary", "Clear visibility into request status and outcomes"],
    businessValue: [`Consistent handling of ${volume}`, `Reduced impact of the current issue: ${pain}`, "No incomplete case reaches the team", "Team time directed to cases requiring human judgment"],
    successMetrics: [success, "Time to first useful action", "Cases completed through the first path", "Cases left without an action or owner", "Human handoffs received with complete information"],
    salesLine: "This is not another automated reply. It is an operating path that moves each case from arrival to outcome and gives your team clearer control over every opportunity and exception.",
    nextStep: "We recommend a short validation session followed by a limited pilot on one process before expanding."
  };
}

function hasUnsupportedNumber(value, sourceText) {
  const numbers = String(value || "").match(/\d+(?:[.,]\d+)?/g) || [];
  return numbers.some((number) => !String(sourceText || "").includes(number));
}

function softenGuarantees(value) {
  return cleanText(value, 1000)
    .replace(/\bguarantees?\b/gi, "supports")
    .replace(/\bensure(s|d)?\b/gi, "helps maintain")
    .replace(/ضمان/g, "دعم")
    .replace(/يضمن/g, "يساعد على");
}

function normalizeProposal(candidate, fallback, sourceText) {
  const output = { ...fallback };
  const stringKeys = ["title", "subtitle", "opening", "challenge", "solution", "humanRole", "salesLine", "nextStep"];
  for (const key of stringKeys) {
    if (candidate?.[key]) {
      const cleaned = softenGuarantees(candidate[key]).slice(0, key === "challenge" ? 1000 : 700);
      if (!hasUnsupportedNumber(cleaned, sourceText)) output[key] = cleaned;
    }
  }
  if (Array.isArray(candidate?.workflow) && candidate.workflow.length >= 5) {
    output.workflow = candidate.workflow.slice(0, 9).map((step, index) => {
      const title = cleanText(step.title, 100);
      const description = softenGuarantees(step.description).slice(0, 350);
      const result = softenGuarantees(step.result).slice(0, 250);
      return {
        title: hasUnsupportedNumber(title, sourceText) ? fallback.workflow[index]?.title || "" : title,
        description: hasUnsupportedNumber(description, sourceText) ? fallback.workflow[index]?.description || "" : description,
        result: !result || hasUnsupportedNumber(result, sourceText) ? fallback.workflow[index]?.result || "" : result
      };
    }).filter((step) => step.title && step.description);
  }
  if (Array.isArray(candidate?.decisionRules) && candidate.decisionRules.length) {
    output.decisionRules = candidate.decisionRules.slice(0, 6).map((rule, index) => {
      const condition = cleanText(rule.condition, 180);
      const action = softenGuarantees(rule.action).slice(0, 280);
      return {
        condition: hasUnsupportedNumber(condition, sourceText) ? fallback.decisionRules[index]?.condition || "" : condition,
        action: hasUnsupportedNumber(action, sourceText) ? fallback.decisionRules[index]?.action || "" : action
      };
    }).filter((rule) => rule.condition && rule.action);
  }
  for (const key of ["deliverables", "businessValue", "successMetrics"]) {
    if (Array.isArray(candidate?.[key]) && candidate[key].length) {
      output[key] = candidate[key].slice(0, 6).map((item, index) => {
        const cleaned = softenGuarantees(item).slice(0, 180);
        return hasUnsupportedNumber(cleaned, sourceText) ? fallback[key]?.[index] || "" : cleaned;
      }).filter(Boolean);
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

Write for a business decision-maker, not an engineer. Do not mention APIs, databases, prompts, model names, code, architecture, authentication, or implementation internals. Use confident, specific language: say what the agent receives, checks, decides, executes, records, and hands off. Do not use generic phrases such as "improve efficiency" unless you explain exactly how. Do not invent percentages, prices, guarantees, client results, or delivery dates.

Every section must use facts from the discovery answers. The workflow must reflect the user's current channels, required information, decision rules, handoff cases, systems, volume, and success definition. If an input is unknown, state it as an item to confirm instead of inventing it.

Return JSON only with this schema:
{"title":"","subtitle":"","opening":"","challenge":"","solution":"","workflow":[{"title":"","description":"","result":""}],"decisionRules":[{"condition":"","action":""}],"humanRole":"","deliverables":[""],"businessValue":[""],"successMetrics":[""],"salesLine":"","nextStep":""}

The workflow must have 6 to 9 operational steps in strict chronological order from trigger to closure. Each step needs a concrete action and a business result. Include 3 to 6 decision rules and 4 to 6 deliverables. Never introduce a number, percentage, response target, or time period unless it appears in the discovery answers. Keep marketing language to the opening, one sales line, and the next step; the rest must be practical and precise.`
      },
      { role: "user", content: JSON.stringify({ initialRequest: payload.initialRequest, answers: payload.answers }) }
    ], { maxTokens: 2400, temperature: 0.3 });

    return { proposal: normalizeProposal(result.data, fallback, JSON.stringify({ initialRequest: payload.initialRequest, answers: payload.answers })), provider: result.provider };
  } catch (_) {
    return { proposal: fallback, provider: "local" };
  }
}

module.exports = { analyzeRequest, validateAnswer, generateProposal, cleanText };
