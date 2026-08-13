const path = require("node:path");
const PDFDocument = require("pdfkit");

const FONT_PATH = path.join(__dirname, "fonts", "NotoSansArabic.ttf");
const PAGE = { width: 595.28, height: 841.89, margin: 48 };

const THEMES = {
  "lead-qualification": { accent: "#7c3aed", soft: "#f3edff", dark: "#241438" },
  "quote-follow-up": { accent: "#2563eb", soft: "#edf3ff", dark: "#10254d" },
  "booking-recovery": { accent: "#d97706", soft: "#fff4e3", dark: "#442507" },
  "customer-service": { accent: "#0891b2", soft: "#e5f8fc", dark: "#073943" },
  "accounts-receivable": { accent: "#059669", soft: "#e7f8f0", dark: "#073d31" },
  "document-processing": { accent: "#db2777", soft: "#fdebf4", dark: "#4d102e" },
  "crm-control": { accent: "#4f46e5", soft: "#efeeff", dark: "#1d194d" }
};

function labels(language) {
  return language === "en" ? {
    prepared: "Prepared for",
    challenge: "Our understanding of the challenge",
    solution: "Proposed solution",
    role: "The agent and team balance",
    workflow: "Proposed workflow",
    output: "Visible outcome",
    rules: "Decision and handling rules",
    when: "When",
    action: "Action",
    deliverables: "What the solution includes",
    value: "Expected business value",
    metrics: "How success can be measured",
    next: "Recommended next step",
    confidential: "Initial concept for discussion"
  } : {
    prepared: "أُعدّ خصيصًا لـ",
    challenge: "فهمنا للتحدي",
    solution: "الحل المقترح",
    role: "التوازن بين الوكيل والفريق",
    workflow: "مسار العمل المقترح",
    output: "الناتج المرئي",
    rules: "قواعد القرار والتعامل",
    when: "عندما",
    action: "الإجراء",
    deliverables: "ما الذي يتضمنه الحل",
    value: "القيمة المتوقعة للعمل",
    metrics: "كيف نقيس النجاح",
    next: "الخطوة التالية",
    confidential: "تصور أولي للنقاش"
  };
}

const CONTENT_WIDTH = PAGE.width - PAGE.margin * 2;
const CONTENT_BOTTOM = PAGE.height - 112;
const ARABIC = /[\u0600-\u06ff]/;
const graphemes = typeof Intl.Segmenter === "function"
  ? new Intl.Segmenter("ar", { granularity: "grapheme" })
  : null;

function textOptions(extra = {}) {
  return { lineBreak: false, ...extra };
}

function shorten(value, max) {
  const source = String(value || "").trim();
  return source.length > max ? `${source.slice(0, max - 1).trimEnd()}…` : source;
}

function splitLongToken(doc, token, width) {
  if (doc.widthOfString(token) <= width) return [token];
  const units = graphemes
    ? [...graphemes.segment(token)].map((part) => part.segment)
    : Array.from(token);
  const pieces = [];
  let piece = "";
  for (const unit of units) {
    if (piece && doc.widthOfString(piece + unit) > width) {
      pieces.push(piece);
      piece = unit;
    } else {
      piece += unit;
    }
  }
  if (piece) pieces.push(piece);
  return pieces;
}

function layoutLines(doc, value, width) {
  const output = [];
  for (const paragraph of String(value || "").split(/\r?\n/)) {
    const sourceWords = paragraph.trim().split(/\s+/).filter(Boolean);
    const words = sourceWords.flatMap((word) => splitLongToken(doc, word, width));
    if (!words.length) {
      output.push([]);
      continue;
    }
    const space = doc.widthOfString(" ");
    let line = [];
    let lineWidth = 0;
    for (const word of words) {
      const wordWidth = doc.widthOfString(word);
      const candidateWidth = lineWidth + (line.length ? space : 0) + wordWidth;
      if (line.length && candidateWidth > width) {
        output.push(line);
        line = [word];
        lineWidth = wordWidth;
      } else {
        line.push(word);
        lineWidth = candidateWidth;
      }
    }
    output.push(line);
  }
  return output;
}

function lineHeight(size, ar, lineGap = 0) {
  return size * (ar ? 1.58 : 1.42) + lineGap;
}

function measureText(doc, value, width, size, ar, lineGap = 0) {
  doc.font("Falaq").fontSize(size);
  return layoutLines(doc, value, width).length * lineHeight(size, ar, lineGap);
}

function drawRtlLine(doc, words, x, y, width) {
  let cursor = x + width;
  const space = Math.max(doc.widthOfString(" "), doc._fontSize * 0.28);
  words.forEach((word, index) => {
    const wordWidth = doc.widthOfString(word);
    cursor -= wordWidth;
    doc.text(word, cursor, y, textOptions({ width: wordWidth + 1, align: ARABIC.test(word) ? "right" : "left" }));
    if (index < words.length - 1) cursor -= space;
  });
}

function write(doc, value, x, y, width, size, color, ar, extra = {}) {
  doc.font("Falaq").fontSize(size).fillColor(color);
  const source = String(value || "");
  const rtl = ar && ARABIC.test(source);
  const lines = layoutLines(doc, source, width);
  const leading = lineHeight(size, ar, extra.lineGap || 0);
  lines.forEach((words, index) => {
    const lineY = y + index * leading;
    if (rtl) {
      drawRtlLine(doc, words, x, lineY, width);
      return;
    }
    const line = words.join(" ");
    const align = extra.align || (ar ? "right" : "left");
    doc.text(line, x, lineY, textOptions({
      width,
      align,
      characterSpacing: extra.characterSpacing || 0
    }));
  });
  doc.y = y + lines.length * leading;
  return doc.y;
}

function footer(doc, context) {
  const y = PAGE.height - 92;
  doc.moveTo(PAGE.margin, y - 9).lineTo(PAGE.width - PAGE.margin, y - 9).lineWidth(0.5).strokeColor("#e8e1ec").stroke();
  write(doc, context.labels.confidential, PAGE.margin, y, 270, 7.5, "#8e8495", context.ar);
  write(doc, context.reference, PAGE.width - PAGE.margin - 190, y, 190, 7.5, "#8e8495", false, { align: "right" });
  doc.y = y;
}

function brand(doc, context) {
  const x = context.ar ? PAGE.width - PAGE.margin - 210 : PAGE.margin;
  doc.roundedRect(x, 42, 30, 30, 9).fill(context.theme.soft);
  write(doc, "F", x + 8, 47, 16, 15, context.theme.accent, false, { align: "center" });
  write(doc, "FALAQ INTELLIGENCE", x + 40, 47, 170, 11, context.theme.dark, false);
}

function decorate(doc, context) {
  doc.save();
  doc.circle(context.ar ? 30 : PAGE.width - 30, -6, 120).fillOpacity(0.08).fill(context.theme.accent);
  doc.circle(context.ar ? 12 : PAGE.width - 12, 12, 66).fillOpacity(0.08).fill(context.theme.accent);
  doc.restore();
}

function renderChrome(doc, context, page) {
  decorate(doc, context);
  brand(doc, context);
  write(doc, page.kicker, PAGE.margin, 92, CONTENT_WIDTH, 8.5, context.theme.accent, context.ar, { characterSpacing: 0.5 });
  write(doc, page.title, PAGE.margin, 112, CONTENT_WIDTH, 21, context.theme.dark, context.ar, { lineGap: 2 });
  footer(doc, context);
}

function addPage(doc, context, title, kicker = "FALAQ") {
  // Finish the active page while it is still selected. This avoids relying on
  // PDFKit's buffered-page switching, which is inconsistent with RTL text.
  if (context.currentPage) renderChrome(doc, context, context.currentPage);
  doc.addPage({ size: "A4", margins: { top: 0, right: 0, bottom: 0, left: 0 } });
  context.currentPage = { title: shorten(title, 180), kicker: shorten(kicker, 110) };
  const titleHeight = measureText(doc, title, CONTENT_WIDTH, 21, context.ar, 2);
  doc.x = PAGE.margin;
  doc.y = Math.max(164, 112 + titleHeight + 14);
}

function addFreshPage(doc, context, title, kicker = "FALAQ") {
  addPage(doc, context, title, kicker);
}

function ensureSpace(doc, context, height, title, kicker) {
  if (doc.y + height > CONTENT_BOTTOM - 18) addPage(doc, context, title, kicker);
}

function sectionTitleHeight(doc, context, title) {
  return Math.max(36, measureText(doc, title, CONTENT_WIDTH - 42, 15, context.ar, 1) + 9);
}

function sectionTitle(doc, context, number, title) {
  const y = doc.y;
  const height = sectionTitleHeight(doc, context, title);
  const bubbleX = context.ar ? PAGE.width - PAGE.margin - 30 : PAGE.margin;
  doc.roundedRect(bubbleX, y, 30, 25, 8).fill(context.theme.soft);
  write(doc, String(number).padStart(2, "0"), bubbleX + 3, y + 5, 24, 8, context.theme.accent, false, { align: "center" });
  const titleX = context.ar ? PAGE.margin : PAGE.margin + 42;
  write(doc, title, titleX, y + 1, CONTENT_WIDTH - 42, 15, context.theme.dark, context.ar, { lineGap: 1 });
  doc.y = y + height;
}

function paragraphHeight(doc, context, value, options = {}) {
  const width = options.width ?? CONTENT_WIDTH;
  const size = options.size || 10.5;
  return measureText(doc, value, width, size, context.ar, options.lineGap ?? 4) + (options.after ?? 12);
}

function paragraph(doc, context, value, options = {}) {
  const x = options.x ?? PAGE.margin;
  const width = options.width ?? CONTENT_WIDTH;
  const y = options.y ?? doc.y;
  write(doc, value, x, y, width, options.size || 10.5, options.color || "#564e5c", context.ar, { lineGap: options.lineGap ?? 4 });
  doc.y += options.after ?? 12;
}

function renderSection(doc, context, number, title, value, pageTitle, kicker, options = {}) {
  const height = sectionTitleHeight(doc, context, title) + paragraphHeight(doc, context, value, options);
  ensureSpace(doc, context, Math.min(height, CONTENT_BOTTOM - 180), pageTitle, kicker);
  sectionTitle(doc, context, number, title);
  paragraph(doc, context, value, options);
}

function cardHeight(doc, context, title, body) {
  const innerWidth = CONTENT_WIDTH - 92;
  const titleHeight = measureText(doc, title, innerWidth, 12.5, context.ar, 1);
  const bodyHeight = measureText(doc, body, innerWidth, 9.5, context.ar, 3);
  return Math.max(88, 20 + titleHeight + 7 + bodyHeight + 18);
}

function card(doc, context, title, body, number) {
  const x = PAGE.margin;
  const width = CONTENT_WIDTH;
  const height = cardHeight(doc, context, title, body);
  const y = doc.y;
  doc.roundedRect(x, y, width, height, 15).fillAndStroke("#ffffff", "#e8e1ec");
  doc.roundedRect(context.ar ? x + width - 52 : x + 16, y + 16, 36, 36, 11).fill(context.theme.soft);
  write(doc, String(number).padStart(2, "0"), context.ar ? x + width - 48 : x + 20, y + 26, 28, 9, context.theme.accent, false, { align: "center" });
  const textX = context.ar ? x + 24 : x + 68;
  write(doc, title, textX, y + 14, width - 92, 12.5, context.theme.dark, context.ar, { lineGap: 1 });
  write(doc, body, textX, doc.y + 7, width - 92, 9.5, "#5e5664", context.ar, { lineGap: 3 });
  doc.y = y + height + 12;
}

function bulletHeight(doc, context, item) {
  return Math.max(25, measureText(doc, item, CONTENT_WIDTH - 30, 10, context.ar, 3) + 8);
}

function bullet(doc, context, item) {
  const y = doc.y;
  const height = bulletHeight(doc, context, item);
  const markerX = context.ar ? PAGE.width - PAGE.margin - 16 : PAGE.margin;
  doc.circle(markerX + 7, y + 8, 7).fill(context.theme.soft);
  doc.circle(markerX + 7, y + 8, 2.3).fill(context.theme.accent);
  const textX = context.ar ? PAGE.margin : PAGE.margin + 30;
  write(doc, item, textX, y, CONTENT_WIDTH - 30, 10, "#504858", context.ar, { lineGap: 3 });
  doc.y = y + height;
}

function bulletList(doc, context, items, pageTitle, kicker) {
  for (const item of items || []) {
    const height = bulletHeight(doc, context, item);
    ensureSpace(doc, context, height, pageTitle, kicker);
    bullet(doc, context, item);
  }
}

function ruleCardHeight(doc, context, rule) {
  const inner = CONTENT_WIDTH / 2 - 24;
  const whenHeight = measureText(doc, rule.condition, inner, 9.5, context.ar, 3);
  const actionHeight = measureText(doc, rule.action, inner, 9.5, context.ar, 3);
  return Math.max(92, Math.max(whenHeight, actionHeight) + 54);
}

function ruleCard(doc, context, rule, index) {
  const x = PAGE.margin;
  const width = CONTENT_WIDTH;
  const inner = width / 2 - 24;
  const height = ruleCardHeight(doc, context, rule);
  const y = doc.y;
  doc.roundedRect(x, y, width, height, 14).fillAndStroke(index % 2 ? "#ffffff" : "#fcfaff", "#e8e1ec");
  const leftText = context.ar ? rule.action : rule.condition;
  const rightText = context.ar ? rule.condition : rule.action;
  const leftLabel = context.ar ? context.labels.action : context.labels.when;
  const rightLabel = context.ar ? context.labels.when : context.labels.action;
  write(doc, leftLabel, x + 18, y + 14, inner, 8, context.theme.accent, context.ar);
  write(doc, leftText, x + 18, y + 34, inner, 9.5, "#504858", context.ar, { lineGap: 3 });
  write(doc, rightLabel, x + width / 2 + 6, y + 14, inner, 8, context.theme.accent, context.ar);
  write(doc, rightText, x + width / 2 + 6, y + 34, inner, 9.5, "#504858", context.ar, { lineGap: 3 });
  doc.y = y + height + 10;
}

function salesPanelHeight(doc, context, value) {
  return Math.max(92, measureText(doc, value, CONTENT_WIDTH - 44, 11, context.ar, 5) + 36);
}

function renderCover(doc, context, data, proposal) {
  doc.addPage({ size: "A4", margins: { top: PAGE.margin, right: PAGE.margin, bottom: 52, left: PAGE.margin } });
  decorate(doc, context);
  brand(doc, context);
  write(doc, data.categoryLabel || "Falaq Intelligence", PAGE.margin, 170, CONTENT_WIDTH, 10, context.theme.accent, context.ar);
  const title = shorten(proposal.title, 260);
  const subtitle = shorten(proposal.subtitle, 260);
  let titleSize = 28;
  while (titleSize > 18 && measureText(doc, title, CONTENT_WIDTH, titleSize, context.ar, 7) + measureText(doc, subtitle, CONTENT_WIDTH, 13, context.ar, 4) > 280) {
    titleSize -= 2;
  }
  write(doc, title, PAGE.margin, 205, CONTENT_WIDTH, titleSize, context.theme.dark, context.ar, { lineGap: 7 });
  write(doc, subtitle, PAGE.margin, doc.y + 14, CONTENT_WIDTH, 13, "#6e6577", context.ar, { lineGap: 4 });
  const preparedY = 555;
  doc.roundedRect(PAGE.margin, preparedY, CONTENT_WIDTH, 100, 18).fill(context.theme.soft);
  write(doc, context.labels.prepared, PAGE.margin + 22, preparedY + 18, CONTENT_WIDTH - 44, 9, context.theme.accent, context.ar);
  write(doc, shorten(data.contact?.name || "", 120), PAGE.margin + 22, preparedY + 42, CONTENT_WIDTH - 44, 17, context.theme.dark, context.ar);
  write(doc, shorten(data.contact?.company || "", 120), PAGE.margin + 22, preparedY + 69, CONTENT_WIDTH - 44, 10, "#716779", context.ar);
  footer(doc, context);
}

function renderPageChrome(doc, context) {
  if (!context.currentPage) return;
  renderChrome(doc, context, context.currentPage);
  context.currentPage = null;
}

function renderLiteDocument(doc, data) {
  const language = data.language === "en" ? "en" : "ar";
  const context = {
    ar: language === "ar",
    labels: labels(language),
    theme: THEMES[data.category] || THEMES["lead-qualification"],
    reference: data.reference || "FALAQ",
    currentPage: null
  };
  const proposal = data.proposal || {};
  const kicker = data.categoryLabel || "Falaq Intelligence";
  const proposalTitle = proposal.title || kicker;
  doc.registerFont("Falaq", FONT_PATH);

  renderCover(doc, context, data, proposal);
  doc.y = 0;

  addPage(doc, context, proposalTitle, kicker);
  const openingHeight = paragraphHeight(doc, context, proposal.opening, { size: 13, lineGap: 6, after: 24 });
  ensureSpace(doc, context, openingHeight, proposalTitle, kicker);
  paragraph(doc, context, proposal.opening, { size: 13, color: context.theme.dark, after: 24, lineGap: 6 });
  renderSection(doc, context, 1, context.labels.challenge, proposal.challenge, proposalTitle, kicker, { after: 20 });
  renderSection(doc, context, 2, context.labels.solution, proposal.solution, proposalTitle, kicker, { after: 20 });
  renderSection(doc, context, 3, context.labels.role, proposal.humanRole, proposalTitle, kicker);

  addPage(doc, context, context.labels.workflow, kicker);
  (proposal.workflow || []).forEach((step, index) => {
    if (index > 0 && index % 4 === 0) {
      addFreshPage(doc, context, context.labels.workflow, kicker);
    }
    const body = `${step.description}${step.result ? `\n${context.labels.output}: ${step.result}` : ""}`;
    const height = cardHeight(doc, context, step.title, body) + 20;
    ensureSpace(doc, context, height, context.labels.workflow, kicker);
    card(doc, context, step.title, body, index + 1);
  });

  addPage(doc, context, context.labels.rules, kicker);
  (proposal.decisionRules || []).forEach((rule, index) => {
    const height = ruleCardHeight(doc, context, rule) + 42;
    ensureSpace(doc, context, height, context.labels.rules, kicker);
    ruleCard(doc, context, rule, index);
  });
  const deliverableHeading = sectionTitleHeight(doc, context, context.labels.deliverables);
  ensureSpace(doc, context, deliverableHeading + 50, context.labels.deliverables, kicker);
  sectionTitle(doc, context, 6, context.labels.deliverables);
  bulletList(doc, context, proposal.deliverables, context.labels.deliverables, kicker);

  addPage(doc, context, context.labels.value, kicker);
  sectionTitle(doc, context, 7, context.labels.value);
  bulletList(doc, context, proposal.businessValue, context.labels.value, kicker);
  doc.y += 15;
  const metricsHeading = sectionTitleHeight(doc, context, context.labels.metrics);
  ensureSpace(doc, context, metricsHeading + 50, context.labels.metrics, kicker);
  sectionTitle(doc, context, 8, context.labels.metrics);
  bulletList(doc, context, proposal.successMetrics, context.labels.metrics, kicker);
  doc.y += 15;
  const nextHeight = sectionTitleHeight(doc, context, context.labels.next)
    + paragraphHeight(doc, context, proposal.nextStep, { size: 12, after: 12 });
  ensureSpace(doc, context, nextHeight, context.labels.next, kicker);
  sectionTitle(doc, context, 9, context.labels.next);
  paragraph(doc, context, proposal.nextStep, { size: 12, color: context.theme.dark });

  const panelHeight = salesPanelHeight(doc, context, proposal.salesLine);
  ensureSpace(doc, context, panelHeight + 8, context.labels.next, kicker);
  const salesY = doc.y + 8;
  doc.roundedRect(PAGE.margin, salesY, CONTENT_WIDTH, panelHeight, 18).fill(context.theme.dark);
  write(doc, proposal.salesLine, PAGE.margin + 22, salesY + 18, CONTENT_WIDTH - 44, 11, "#ffffff", context.ar, { lineGap: 5 });
  doc.y = salesY + panelHeight;
  renderPageChrome(doc, context);
}

async function renderPdfLite(data) {
  const doc = new PDFDocument({ autoFirstPage: false, bufferPages: true, info: { Title: data.proposal?.title || "Falaq Proposal", Author: "Falaq Intelligence" } });
  const chunks = [];
  const result = new Promise((resolve, reject) => {
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });
  renderLiteDocument(doc, data);
  doc.end();
  return result;
}

module.exports = { renderPdfLite };
