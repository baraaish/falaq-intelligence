const fs = require("node:fs");
const path = require("node:path");
const { FLOWS } = require("../content/agent-flows.js");
const { site, esc, homeHref, sectionRoute, seoHead, chrome, chromeLabels } = require("./lib/layout.js");

const root = path.resolve(__dirname, "..");

const labels = {
  ar: {
    title: "تحدث إلى وكيل فلق | فلق للذكاء الاصطناعي",
    description: "صف عملية من عملك وشاهد الوكيل يحوّلها إلى متغيرات وقاعدة وإجراء، مع حد تسليم واضح للإنسان.",
    eyebrow: "الوكيل، مباشرةً",
    headline: "صف عمليتك. شاهد القرار يتكوّن.",
    lead: "اكتب حالة حقيقية من شغلك. الوكيل يستخرج ما يحتاجه، يطبّق قواعده المعلنة، ويقول لك أين يتوقف ويسلّم لموظف.",
    placeholder: "مثال: عندي عيادة أسنان وبضيع مواعيد لأن المرضى ما بيردوا على التأكيد…",
    send: "ابدأ",
    examplesLabel: "أو ابدأ من هنا",
    status: "متصل",
    reset: "محادثة جديدة"
  },
  en: {
    title: "Talk to a Falaq agent | Falaq Intelligence",
    description: "Describe a process from your business and watch the agent turn it into variables, a rule and an action, with a clear handoff to a person.",
    eyebrow: "The agent, live",
    headline: "Describe your process. Watch the decision form.",
    lead: "Write a real case from your operation. The agent extracts what it needs, applies its published rules, and tells you where it stops and hands over to a person.",
    placeholder: "For example: I run a dental clinic and lose appointments because patients never reply to confirmations…",
    send: "Start",
    examplesLabel: "Or start here",
    status: "Online",
    reset: "New conversation"
  }
};

function route(language) {
  return sectionRoute("agent", language);
}

// Written out rather than assembled from the sector data. Stitching a sector
// name onto a summary produced broken sentences in Arabic, and an opener the
// visitor is invited to click has to read like something a person would type.
// Each one still maps to a real sector and its usual first agent.
const EXAMPLES = {
  ar: [
    "عندي عيادة أسنان وبضيع مواعيد لأن المرضى ما بيردوا على رسائل التأكيد",
    "طلبات متجري بتوصل على واتساب وبنسجّلها يدويًا وبتضيع طلبات",
    "فريق المبيعات بيتأخر بمتابعة عروض الأسعار وما في سجل واضح للنتائج"
  ],
  en: [
    "I run a dental clinic and lose appointments because patients never reply to confirmations",
    "Our store orders arrive on WhatsApp and we enter them by hand, so some get lost",
    "Sales are slow to follow up quotations and there is no clear record of outcomes"
  ]
};

function examples(language) {
  return EXAMPLES[language] || EXAMPLES.ar;
}

function page(language) {
  const l = labels[language];
  const c = chromeLabels[language];

  const head = seoHead({
    title: l.title,
    description: l.description,
    canonical: route(language),
    arPath: route("ar"),
    enPath: route("en"),
    language,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: l.title,
      description: l.description,
      url: `${site}${route(language)}`,
      inLanguage: language,
      isPartOf: { "@type": "WebSite", name: "Falaq Intelligence", url: site }
    }
  });

  const chips = examples(language)
    .map((text) => `<button type="button" data-example="${esc(text)}">${esc(text)}</button>`)
    .join("");

  const body = `    <section class="stage" data-phase="rest">
      <div class="st-rest">
        <div class="st-figure">
          <img src="/assets/avatar/agent-invite.webp" width="640" height="882" alt="" fetchpriority="high">
        </div>
        <span class="t-label">${esc(l.eyebrow)}</span>
        <h1 class="t-h1 st-title">${esc(l.headline)}</h1>
        <p class="st-lead">${esc(l.lead)}</p>
        <form class="st-composer" data-rest-form>
          <label class="ac-sr" for="st-input">${esc(l.placeholder)}</label>
          <textarea id="st-input" rows="1" maxlength="600" placeholder="${esc(l.placeholder)}" data-rest-input></textarea>
          <button class="st-send" type="submit">${esc(l.send)}</button>
        </form>
        <div class="st-examples">
          <span>${esc(l.examplesLabel)}</span>
          <div class="st-chips">${chips}</div>
        </div>
      </div>

      <div class="st-live">
        <aside class="st-rail">
          <img src="/assets/avatar/agent-face.webp" width="256" height="256" alt="" loading="lazy">
          <span class="st-rail-status">${esc(l.status)}</span>
          <button class="st-reset" type="button" data-reset>${esc(l.reset)}</button>
        </aside>
        <div class="st-console" data-console></div>
      </div>
    </section>

    <script src="/assets/config.js"></script>
    <script src="/assets/generated/agent-flows.js"></script>
    <script src="/assets/flow-view.js"></script>
    <script src="/assets/agent-choreo.js"></script>
    <script src="/assets/agent-console.js"></script>
    <script src="/assets/agent-stage.js"></script>
    <script>window.FalaqStage.boot(document.querySelector('.stage'), ${JSON.stringify(language)});</script>`;

  return chrome({ language, head, body, current: "agent" })
    .replace(
      '<link rel="stylesheet" href="/assets/flow-view.css">',
      '<link rel="stylesheet" href="/assets/flow-view.css">\n  <link rel="stylesheet" href="/assets/agent-console.css">'
    );
}

// The console gets a service slug back as `category`. Emitting the published
// flows under the same key lets the page draw the real workflow for whichever
// agent the model settled on, with no extra request.
const flowData = { ar: {}, en: {} };
for (const language of ["ar", "en"]) {
  for (const [slug, flow] of Object.entries(FLOWS)) flowData[language][slug] = flow[language];
}
const generatedDir = path.join(root, "assets", "generated");
fs.mkdirSync(generatedDir, { recursive: true });
fs.writeFileSync(
  path.join(generatedDir, "agent-flows.js"),
  `// GENERATED by scripts/build-agent-page.js from content/agent-flows.js.
// Do not edit; run \`npm run build:seo\`.
window.FALAQ_FLOWS = ${JSON.stringify(flowData, null, 2)};
`
);

let written = 0;
for (const language of ["ar", "en"]) {
  const output = path.join(root, language === "ar" ? "agent" : "en/agent", "index.html");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${page(language)}\n`);
  written += 1;
}

console.log(`Built ${written} agent pages.`);

module.exports = { route };
