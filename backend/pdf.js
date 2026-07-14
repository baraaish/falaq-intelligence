const fs = require("node:fs");
const puppeteer = require("puppeteer-core");

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

function workflow(items, language) {
  return `<div class="workflow">${items.map((step, index) => `
    <div class="workflow-step">
      <span class="step-number">${String(index + 1).padStart(2, "0")}</span>
      <div><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.description)}</p></div>
    </div>
    ${index < items.length - 1 ? `<span class="connector">${language === "ar" ? "←" : "→"}</span>` : ""}
  `).join("")}</div>`;
}

function proposalHtml({ proposal, contact, language, categoryLabel, reference }) {
  const ar = language !== "en";
  const preparedFor = ar ? "أُعدّ خصيصًا لـ" : "Prepared for";
  const labels = ar ? {
    challenge: "فهمنا للتحدي",
    solution: "الحل المقترح",
    workflow: "مسار العمل المقترح",
    roles: "التوازن بين الوكيل والفريق",
    value: "القيمة المتوقعة للعمل",
    metrics: "كيف نقيس النجاح",
    next: "الخطوة التالية",
    confidential: "تصور أولي للنقاش - فلق للذكاء الاصطناعي"
  } : {
    challenge: "Our understanding of the challenge",
    solution: "Proposed solution",
    workflow: "Proposed workflow",
    roles: "The agent and team balance",
    value: "Expected business value",
    metrics: "How success can be measured",
    next: "Recommended next step",
    confidential: "Initial concept for discussion - Falaq Intelligence"
  };

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
    .brand-mark { display: grid; width: 38px; height: 38px; place-items: center; border: 1px solid #d8b4fe; border-radius: 12px; color: #8b5cf6; background: #faf7ff; font-size: 22px; }
    .brand small { display: block; color: #81778c; font-size: 9px; font-weight: 500; }
    .cover { display: flex; min-height: 253mm; flex-direction: column; justify-content: space-between; }
    .cover-main { position: relative; z-index: 2; margin-top: 38mm; }
    .eyebrow { display: inline-block; margin-bottom: 12px; padding: 5px 12px; border: 1px solid #eadbff; border-radius: 999px; color: #7c3aed; background: #faf7ff; font-size: 10px; font-weight: 700; }
    h1 { max-width: 165mm; margin: 0; color: #17101f; font-size: 31px; line-height: 1.35; }
    .subtitle { max-width: 145mm; margin: 14px 0 0; color: #6e6577; font-size: 15px; }
    .prepared { margin-top: 30mm; padding: 18px 20px; border-inline-start: 4px solid #a855f7; background: #faf8fc; }
    .prepared span { display: block; color: #8a8092; font-size: 10px; }
    .prepared strong { display: block; margin-top: 4px; font-size: 18px; }
    .prepared small { color: #766d7e; }
    .ref { display: flex; justify-content: space-between; color: #8c8395; font-size: 9px; }
    .section-label { margin: 0 0 7px; color: #8b5cf6; font-size: 10px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; }
    h2 { margin: 0 0 13px; color: #1b1521; font-size: 22px; line-height: 1.35; }
    h3 { margin: 0 0 4px; font-size: 13px; }
    p { margin: 0; color: #554d5d; font-size: 12px; }
    .opening { margin: 20px 0 24px; padding: 20px 22px; border: 1px solid #eadff5; border-radius: 18px; background: linear-gradient(135deg, #fbf8ff, #fff); color: #32283b; font-size: 14px; font-weight: 600; }
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .card { padding: 18px; border: 1px solid #ece7f0; border-radius: 16px; background: #fff; box-shadow: 0 10px 30px rgba(47,31,62,.04); }
    .workflow { display: grid; gap: 8px; margin-top: 18px; }
    .workflow-step { display: grid; grid-template-columns: 35px 1fr; gap: 12px; align-items: start; padding: 12px 14px; border: 1px solid #ece5f2; border-radius: 14px; background: linear-gradient(90deg, #fcfaff, #fff); }
    [dir="rtl"] .workflow-step { grid-template-columns: 35px 1fr; }
    .step-number { display: grid; width: 32px; height: 32px; place-items: center; border-radius: 10px; background: #ede3ff; color: #7136bc; font-size: 10px; font-weight: 800; }
    .workflow-step p { font-size: 10.5px; line-height: 1.6; }
    .connector { height: 8px; margin-inline-start: 15px; color: #b79bcf; font-size: 12px; transform: rotate(90deg); transform-origin: center; }
    .check-list { display: grid; gap: 10px; margin: 12px 0 0; padding: 0; list-style: none; }
    .check-list li { position: relative; padding-inline-start: 24px; color: #504858; font-size: 11px; }
    .check-list li::before { content: "✓"; position: absolute; inset-inline-start: 0; top: 1px; display: grid; width: 17px; height: 17px; place-items: center; border-radius: 50%; background: #eee5ff; color: #7c3aed; font-size: 9px; font-weight: 900; }
    .sales-line { margin: 24px 0; padding: 22px; border-radius: 18px; background: #160d20; color: #f5ebff; font-size: 15px; font-weight: 700; line-height: 1.75; }
    .next { padding: 22px; border: 1px solid #d9c2ef; border-radius: 18px; background: linear-gradient(135deg, #f7efff, #fff); }
    .footer { position: absolute; right: 18mm; bottom: 9mm; left: 18mm; display: flex; justify-content: space-between; border-top: 1px solid #eee8f2; padding-top: 6px; color: #988fa0; font-size: 8px; }
  </style></head>
  <body>
    <section class="page cover">
      <div>
        <div class="brand"><span class="brand-mark">✦</span><span>FALAQ INTELLIGENCE<small>${ar ? "فلق للذكاء الاصطناعي" : "AI agents for real operations"}</small></span></div>
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
      <div class="brand"><span class="brand-mark">✦</span><span>FALAQ INTELLIGENCE</span></div>
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
      <div class="brand"><span class="brand-mark">✦</span><span>FALAQ INTELLIGENCE</span></div>
      <div style="margin-top:24px"><p class="section-label">04</p><h2>${labels.workflow}</h2>${workflow(proposal.workflow, language)}</div>
      <div class="footer"><span>${labels.confidential}</span><span>${escapeHtml(reference)}</span></div>
    </section>

    <section class="page">
      <div class="brand"><span class="brand-mark">✦</span><span>FALAQ INTELLIGENCE</span></div>
      <div style="margin-top:30px" class="two-col">
        <article class="card"><p class="section-label">05</p><h2>${labels.value}</h2>${list(proposal.businessValue)}</article>
        <article class="card"><p class="section-label">06</p><h2>${labels.metrics}</h2>${list(proposal.successMetrics)}</article>
      </div>
      <article class="next" style="margin-top:28px"><p class="section-label">07</p><h2>${labels.next}</h2><p>${escapeHtml(proposal.nextStep)}</p></article>
      <div style="margin-top:35mm;text-align:center"><div class="brand" style="justify-content:center"><span class="brand-mark">✦</span><span>FALAQ INTELLIGENCE</span></div><p style="margin-top:12px">hello@falaqai.com · +962 79 296 1872</p></div>
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
  const executablePath = findBrowser();
  if (!executablePath) throw new Error("No compatible browser was found for PDF generation");

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"]
  });

  try {
    const page = await browser.newPage();
    await page.setContent(proposalHtml(data), { waitUntil: "networkidle0" });
    return await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true });
  } finally {
    await browser.close();
  }
}

module.exports = { renderPdf, proposalHtml };
