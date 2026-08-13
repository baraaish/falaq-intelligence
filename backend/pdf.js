const fs = require("node:fs");
const puppeteer = require("puppeteer-core");
const { renderPdfLite } = require("./pdf-lite");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function list(items, className = "check-list") {
  return `<ul class="${className}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

const SERVICE_THEMES = {
  "lead-qualification": { accent: "#7c3aed", soft: "#f1e9ff", dark: "#241438", mark: "✦", ar: "من أول رسالة إلى فرصة جاهزة للمبيعات", en: "From first message to sales-ready opportunity" },
  "quote-follow-up": { accent: "#2563eb", soft: "#e9f1ff", dark: "#10254d", mark: "↗", ar: "متابعة تعرف متى تذكّر ومتى تصعّد", en: "Follow-up that knows when to remind and escalate" },
  "booking-recovery": { accent: "#d97706", soft: "#fff3df", dark: "#442507", mark: "◷", ar: "حجز مؤكد ومسار واضح لكل تغيير", en: "Confirmed bookings and a clear path for every change" },
  "customer-service": { accent: "#0891b2", soft: "#e2f8fc", dark: "#073943", mark: "◎", ar: "إجابة واضحة وتسليم ذكي للحالات المهمة", en: "Clear answers and intelligent handoff for important cases" },
  "accounts-receivable": { accent: "#059669", soft: "#e2f8ef", dark: "#073d31", mark: "◈", ar: "متابعة منتظمة تحفظ العلاقة وتوضح الالتزام", en: "Consistent follow-up that protects relationships and commitments" },
  "document-processing": { accent: "#db2777", soft: "#fde8f2", dark: "#4d102e", mark: "▤", ar: "من مستند وارد إلى بيانات قابلة للتنفيذ", en: "From incoming document to actionable information" },
  "crm-control": { accent: "#4f46e5", soft: "#ecebff", dark: "#1d194d", mark: "⌘", ar: "سجل موثوق يقود الخطوة التالية", en: "A trusted record that drives the next action" }
};

function workflowOverview(items, language) {
  const resultLabel = language === "ar" ? "ما يتغير" : "What changes";
  return `<div class="flow-map">${items.map((step, index) => `
    <article class="flow-node">
      <div class="flow-node-top"><span>${String(index + 1).padStart(2, "0")}</span><i>${index === 0 ? "●" : index === items.length - 1 ? "✓" : "→"}</i></div>
      <h3>${escapeHtml(step.title)}</h3>
      <p><b>${resultLabel}</b>${escapeHtml(step.result || step.description)}</p>
    </article>
  `).join("")}</div>`;
}

function workflow(items, language, startIndex = 0) {
  const outputLabel = language === "ar" ? "الناتج" : "Output";
  return `<div class="workflow">${items.map((step, index) => `
    <div class="workflow-step">
      <span class="step-number">${String(startIndex + index + 1).padStart(2, "0")}</span>
      <div><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.description)}</p>${step.result ? `<p class="step-result"><b>${outputLabel}:</b> ${escapeHtml(step.result)}</p>` : ""}</div>
    </div>
    ${index < items.length - 1 ? `<span class="connector">${language === "ar" ? "←" : "→"}</span>` : ""}
  `).join("")}</div>`;
}

function proposalHtml({ proposal, contact, language, category, categoryLabel, reference }) {
  const ar = language !== "en";
  const theme = SERVICE_THEMES[category] || SERVICE_THEMES["lead-qualification"];
  const whatsappText = ar
    ? `مرحبًا فلق، أود مناقشة العرض ${reference} الخاص بخدمة ${categoryLabel}`
    : `Hello Falaq, I would like to discuss proposal ${reference} for ${categoryLabel}`;
  const whatsappUrl = `https://wa.me/962792961872?text=${encodeURIComponent(whatsappText)}`;
  const emailSubject = ar ? `مناقشة عرض فلق ${reference}` : `Discuss Falaq proposal ${reference}`;
  const emailBody = ar ? `مرحبًا، أود مناقشة العرض رقم ${reference}.` : `Hello, I would like to discuss proposal ${reference}.`;
  const emailUrl = `mailto:hello@falaqai.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const preparedFor = ar ? "أُعدّ خصيصًا لـ" : "Prepared for";
  const labels = ar ? {
    challenge: "فهمنا للتحدي",
    solution: "الحل المقترح",
    overview: "الخدمة في نظرة واحدة",
    overviewLead: "هكذا تتحرك الحالة من لحظة الوصول حتى النتيجة، دون أن تضيع المسؤولية بين الخطوات.",
    workflow: "مسار العمل المقترح",
    workflowPartOne: "من الوصول إلى القرار",
    workflowPartTwo: "من التنفيذ إلى الإغلاق",
    roles: "التوازن بين الوكيل والفريق",
    decisions: "قواعد القرار والتعامل",
    deliverables: "ما الذي يتضمنه الحل",
    value: "القيمة المتوقعة للعمل",
    metrics: "كيف نقيس النجاح",
    next: "الخطوة التالية",
    ctaTitle: "حوّل هذا التصور إلى خطوة عملية",
    ctaLead: "ناقش معنا القواعد والربط ونطاق البداية المناسب لعملك.",
    whatsapp: "ناقش العرض عبر واتساب",
    email: "أرسل لنا بريدًا",
    condition: "عندما",
    action: "الإجراء",
    confidential: "تصور أولي للنقاش - فلق للذكاء الاصطناعي"
  } : {
    challenge: "Our understanding of the challenge",
    solution: "Proposed solution",
    overview: "The service at a glance",
    overviewLead: "See how each case moves from arrival to outcome without losing ownership between steps.",
    workflow: "Proposed workflow",
    workflowPartOne: "From intake to decision",
    workflowPartTwo: "From execution to closure",
    roles: "The agent and team balance",
    decisions: "Decision and handling rules",
    deliverables: "What the solution includes",
    value: "Expected business value",
    metrics: "How success can be measured",
    next: "Recommended next step",
    ctaTitle: "Turn this concept into an operating next step",
    ctaLead: "Discuss the rules, connections, and right starting scope for your business.",
    whatsapp: "Discuss on WhatsApp",
    email: "Send us an email",
    condition: "When",
    action: "Action",
    confidential: "Initial concept for discussion - Falaq Intelligence"
  };
  const workflowMiddle = Math.ceil(proposal.workflow.length / 2);
  const workflowPartOne = proposal.workflow.slice(0, workflowMiddle);
  const workflowPartTwo = proposal.workflow.slice(workflowMiddle);

  return `<!doctype html>
  <html lang="${ar ? "ar" : "en"}" dir="${ar ? "rtl" : "ltr"}">
  <head><meta charset="utf-8"><style>
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #17131d; background: #fff; font-family: ${ar ? "Tahoma, Arial" : "Arial"}, sans-serif; line-height: 1.7; }
    .page { position: relative; width: 210mm; min-height: 297mm; padding: 22mm 18mm 18mm; overflow: hidden; page-break-after: always; background: #fff; }
    .page:last-child { page-break-after: auto; }
    .page::before { content: ""; position: absolute; width: 105mm; height: 105mm; border-radius: 50%; top: -62mm; inset-inline-end: -42mm; background: radial-gradient(circle, rgba(168,85,247,.20), rgba(139,92,246,.04) 58%, transparent 70%); }
    .brand { position: relative; z-index: 2; display: flex; align-items: center; gap: 10px; font-weight: 800; letter-spacing: .02em; }
    .brand-mark { display: grid; width: 38px; height: 38px; place-items: center; border: 1px solid color-mix(in srgb, var(--accent), white 60%); border-radius: 12px; color: var(--accent); background: var(--soft); font-size: 22px; }
    .brand small { display: block; color: #81778c; font-size: 9px; font-weight: 500; }
    .cover { display: flex; min-height: 253mm; flex-direction: column; justify-content: space-between; }
    .cover-main { position: relative; z-index: 2; margin-top: 38mm; }
    .eyebrow { display: inline-block; margin-bottom: 12px; padding: 5px 12px; border: 1px solid var(--soft); border-radius: 999px; color: var(--accent); background: var(--soft); font-size: 10px; font-weight: 700; }
    h1 { max-width: 165mm; margin: 0; color: #17101f; font-size: 31px; line-height: 1.35; }
    .subtitle { max-width: 145mm; margin: 14px 0 0; color: #6e6577; font-size: 15px; }
    .prepared { margin-top: 30mm; padding: 18px 20px; border-inline-start: 4px solid var(--accent); background: var(--soft); }
    .prepared span { display: block; color: #8a8092; font-size: 10px; }
    .prepared strong { display: block; margin-top: 4px; font-size: 18px; }
    .prepared small { color: #766d7e; }
    .ref { display: flex; justify-content: space-between; color: #8c8395; font-size: 9px; }
    .section-label { margin: 0 0 7px; color: var(--accent); font-size: 10px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; }
    h2 { margin: 0 0 13px; color: #1b1521; font-size: 22px; line-height: 1.35; }
    h3 { margin: 0 0 4px; font-size: 13px; }
    p { margin: 0; color: #554d5d; font-size: 12px; }
    .opening { margin: 20px 0 24px; padding: 20px 22px; border: 1px solid #eadff5; border-radius: 18px; background: linear-gradient(135deg, #fbf8ff, #fff); color: #32283b; font-size: 14px; font-weight: 600; }
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .card { padding: 18px; border: 1px solid #ece7f0; border-radius: 16px; background: #fff; box-shadow: 0 10px 30px rgba(47,31,62,.04); break-inside: avoid; }
    .workflow { display: grid; gap: 8px; margin-top: 18px; }
    .workflow-step { display: grid; grid-template-columns: 35px 1fr; gap: 12px; align-items: start; padding: 12px 14px; border: 1px solid #ece5f2; border-radius: 14px; background: linear-gradient(90deg, #fcfaff, #fff); break-inside: avoid; }
    [dir="rtl"] .workflow-step { grid-template-columns: 35px 1fr; }
    .step-number { display: grid; width: 32px; height: 32px; place-items: center; border-radius: 10px; background: var(--soft); color: var(--accent); font-size: 10px; font-weight: 800; }
    .workflow-step p { font-size: 10.5px; line-height: 1.55; }
    .workflow-step .step-result { margin-top: 5px; padding-top: 5px; border-top: 1px solid #eee8f2; color: #413649; font-size: 9.5px; }
    .workflow-step .step-result b { color: var(--accent); }
    .connector { height: 8px; margin-inline-start: 15px; color: #b79bcf; font-size: 12px; transform: rotate(90deg); transform-origin: center; }
    .check-list { display: grid; gap: 10px; margin: 12px 0 0; padding: 0; list-style: none; }
    .check-list li { position: relative; padding-inline-start: 24px; color: #504858; font-size: 11px; }
    .check-list li::before { content: "✓"; position: absolute; inset-inline-start: 0; top: 1px; display: grid; width: 17px; height: 17px; place-items: center; border-radius: 50%; background: var(--soft); color: var(--accent); font-size: 9px; font-weight: 900; }
    .sales-line { margin: 24px 0; padding: 22px; border-radius: 18px; background: var(--dark); color: #fff; font-size: 15px; font-weight: 700; line-height: 1.75; }
    .overview-head { margin: 24px 0 18px; max-width: 155mm; }
    .overview-head p { font-size: 13px; }
    .service-ribbon { display: flex; align-items: center; gap: 12px; margin-top: 18px; padding: 14px 16px; border-radius: 16px; color: var(--dark); background: var(--soft); font-size: 13px; font-weight: 800; }
    .service-ribbon span { display: grid; width: 34px; height: 34px; place-items: center; border-radius: 11px; color: white; background: var(--accent); font-size: 18px; }
    .flow-map { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 18px; }
    .flow-node { position: relative; min-height: 47mm; padding: 16px; border: 1px solid color-mix(in srgb, var(--accent), white 78%); border-radius: 17px; background: linear-gradient(145deg, var(--soft), #fff 66%); break-inside: avoid; }
    .flow-node:last-child:nth-child(3n+1) { grid-column: 2; }
    .flow-node-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; color: var(--accent); font-size: 10px; font-weight: 900; }
    .flow-node-top i { display: grid; width: 25px; height: 25px; place-items: center; border-radius: 50%; color: white; background: var(--accent); font-style: normal; }
    .flow-node h3 { min-height: 12mm; color: var(--dark); font-size: 13px; }
    .flow-node p { margin-top: 10px; font-size: 9.5px; line-height: 1.55; }
    .flow-node p b { display: block; margin-bottom: 3px; color: var(--accent); font-size: 8px; text-transform: uppercase; }
    .decision-list { display: grid; gap: 10px; margin-top: 15px; }
    .decision { display: grid; grid-template-columns: .8fr 1.2fr; gap: 12px; padding: 13px 14px; border: 1px solid #ece5f2; border-radius: 13px; background: #fcfaff; break-inside: avoid; }
    .decision span { display: block; margin-bottom: 3px; color: var(--accent); font-size: 8px; font-weight: 800; text-transform: uppercase; }
    .decision p { color: #443c4b; font-size: 10px; }
    .next { padding: 22px; border: 1px solid color-mix(in srgb, var(--accent), white 65%); border-radius: 18px; background: linear-gradient(135deg, var(--soft), #fff); }
    .cta-panel { margin-top: 24px; padding: 26px; border-radius: 22px; color: white; background: var(--dark); text-align: center; }
    .cta-panel h2, .cta-panel p { color: white; }
    .cta-panel p { opacity: .78; }
    .cta-actions { display: flex; justify-content: center; gap: 12px; margin-top: 20px; }
    .cta-button { display: inline-block; min-width: 58mm; padding: 12px 16px; border-radius: 12px; color: var(--dark); background: white; font-size: 11px; font-weight: 800; text-decoration: none; }
    .cta-button.primary { color: white; background: var(--accent); }
    .footer { position: absolute; right: 18mm; bottom: 9mm; left: 18mm; display: flex; justify-content: space-between; border-top: 1px solid #eee8f2; padding-top: 6px; color: #988fa0; font-size: 8px; }
  </style></head>
  <body style="--accent:${theme.accent};--soft:${theme.soft};--dark:${theme.dark}">
    <section class="page cover">
      <div>
        <div class="brand"><span class="brand-mark">${theme.mark}</span><span>FALAQ INTELLIGENCE<small>${ar ? "فلق للذكاء الاصطناعي" : "AI agents for real operations"}</small></span></div>
        <div class="cover-main">
          <span class="eyebrow">${escapeHtml(categoryLabel)}</span>
          <h1>${escapeHtml(proposal.title)}</h1>
          <p class="subtitle">${escapeHtml(proposal.subtitle)}</p>
          <div class="prepared"><span>${preparedFor}</span><strong>${escapeHtml(contact.name)}</strong><small>${escapeHtml(contact.company || "")}</small></div>
        </div>
      </div>
      <div class="ref"><span>${labels.confidential}</span><span>${escapeHtml(reference)}</span></div>
    </section>

    <section class="page">
      <div class="brand"><span class="brand-mark">${theme.mark}</span><span>FALAQ INTELLIGENCE</span></div>
      <div class="opening">${escapeHtml(proposal.opening)}</div>
      <div class="two-col">
        <article class="card"><p class="section-label">01</p><h2>${labels.challenge}</h2><p>${escapeHtml(proposal.challenge)}</p></article>
        <article class="card"><p class="section-label">02</p><h2>${labels.solution}</h2><p>${escapeHtml(proposal.solution)}</p></article>
      </div>
      <div class="sales-line">${escapeHtml(proposal.salesLine)}</div>
      <article class="card"><p class="section-label">03</p><h2>${labels.roles}</h2><p>${escapeHtml(proposal.humanRole)}</p></article>
      <div class="footer"><span>${labels.confidential}</span><span>${escapeHtml(reference)}</span></div>
    </section>

    <section class="page">
      <div class="brand"><span class="brand-mark">${theme.mark}</span><span>FALAQ INTELLIGENCE</span></div>
      <div class="overview-head"><p class="section-label">04</p><h2>${labels.overview}</h2><p>${labels.overviewLead}</p><div class="service-ribbon"><span>${theme.mark}</span>${escapeHtml(theme[ar ? "ar" : "en"])}</div></div>
      ${workflowOverview(proposal.workflow, language)}
      <div class="footer"><span>${labels.confidential}</span><span>${escapeHtml(reference)}</span></div>
    </section>

    <section class="page">
      <div class="brand"><span class="brand-mark">${theme.mark}</span><span>FALAQ INTELLIGENCE</span></div>
      <div style="margin-top:24px"><p class="section-label">05 · ${labels.workflowPartOne}</p><h2>${labels.workflow}</h2>${workflow(workflowPartOne, language, 0)}</div>
      <div class="footer"><span>${labels.confidential}</span><span>${escapeHtml(reference)}</span></div>
    </section>

    <section class="page">
      <div class="brand"><span class="brand-mark">${theme.mark}</span><span>FALAQ INTELLIGENCE</span></div>
      <div style="margin-top:24px"><p class="section-label">05 · ${labels.workflowPartTwo}</p><h2>${labels.workflow}</h2>${workflow(workflowPartTwo, language, workflowMiddle)}</div>
      <div class="footer"><span>${labels.confidential}</span><span>${escapeHtml(reference)}</span></div>
    </section>

    <section class="page">
      <div class="brand"><span class="brand-mark">${theme.mark}</span><span>FALAQ INTELLIGENCE</span></div>
      <div style="margin-top:30px" class="two-col">
        <article class="card" style="grid-column:1/-1"><p class="section-label">06</p><h2>${labels.decisions}</h2><div class="decision-list">${(proposal.decisionRules || []).map((rule) => `<div class="decision"><div><span>${labels.condition}</span><p>${escapeHtml(rule.condition)}</p></div><div><span>${labels.action}</span><p>${escapeHtml(rule.action)}</p></div></div>`).join("")}</div></article>
        <article class="card" style="grid-column:1/-1"><p class="section-label">07</p><h2>${labels.deliverables}</h2>${list(proposal.deliverables || [])}</article>
      </div>
      <div class="footer"><span>${labels.confidential}</span><span>${escapeHtml(reference)}</span></div>
    </section>

    <section class="page">
      <div class="brand"><span class="brand-mark">${theme.mark}</span><span>FALAQ INTELLIGENCE</span></div>
      <div style="margin-top:30px" class="two-col">
        <article class="card"><p class="section-label">08</p><h2>${labels.value}</h2>${list(proposal.businessValue)}</article>
        <article class="card"><p class="section-label">09</p><h2>${labels.metrics}</h2>${list(proposal.successMetrics)}</article>
      </div>
      <article class="next" style="margin-top:28px"><p class="section-label">10</p><h2>${labels.next}</h2><p>${escapeHtml(proposal.nextStep)}</p></article>
      <div class="cta-panel"><h2>${labels.ctaTitle}</h2><p>${labels.ctaLead}</p><div class="cta-actions"><a class="cta-button primary" href="${escapeHtml(whatsappUrl)}">${labels.whatsapp}</a><a class="cta-button" href="${escapeHtml(emailUrl)}">${labels.email}</a></div></div>
      <div style="margin-top:16mm;text-align:center"><div class="brand" style="justify-content:center"><span class="brand-mark">${theme.mark}</span><span>FALAQ INTELLIGENCE</span></div><p style="margin-top:12px">hello@falaqai.com · +962 79 296 1872</p></div>
      <div class="footer"><span>${labels.confidential}</span><span>${escapeHtml(reference)}</span></div>
    </section>
  </body></html>`;
}

function findBrowser() {
  const candidates = [
    process.env.BROWSER_EXECUTABLE_PATH,
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium"
  ].filter(Boolean);
  return candidates.find((candidate) => fs.existsSync(candidate));
}

async function renderPdf(data) {
  if (process.env.PDF_RENDERER === "lite") return renderPdfLite(data);
  const executablePath = findBrowser();
  if (!executablePath) return renderPdfLite(data);

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath,
      headless: true,
      timeout: 60000,
      args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"]
    });
  } catch (error) {
    console.warn(`Chromium PDF unavailable; using the lightweight renderer: ${error.message}`);
    return renderPdfLite(data);
  }

  try {
    const page = await browser.newPage();
    await page.setContent(proposalHtml(data), { waitUntil: "networkidle0" });
    return await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true });
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { renderPdf, proposalHtml };
