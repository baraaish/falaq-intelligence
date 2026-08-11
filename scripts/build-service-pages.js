const fs = require("node:fs");
const path = require("node:path");
const { CATEGORIES, SERVICES } = require("../content/services.js");
const { FLOWS } = require("../content/agent-flows.js");
const { markup: flowMarkup } = require("../assets/flow-view.js");
const { site, esc, homeHref, sectionRoute, itemRoute, ctaSection, seoHead, chrome, chromeLabels } = require("./lib/layout.js");

const root = path.resolve(__dirname, "..");

// The seven services that already have hand-built pages. They are richer than
// this template and are left alone until each is compared side by side.
const LEGACY = new Set([
  "lead-qualification", "quote-follow-up", "booking-recovery", "customer-service",
  "accounts-receivable", "document-processing", "crm-control"
]);

const labels = {
  ar: {
    detail: "ما الذي يقوم به",
    flow: "كيف يعمل، خطوة بخطوة",
    flowLead: "هذا هو المسار الفعلي بقواعده وحدوده — بما في ذلك اللحظة التي يتوقف فيها الوكيل ويسلّم لموظف.",
    flowStrings: { step: "خطوة", trigger: "يصل من", decision: "يتحقق", log: "يُسجَّل" },
    guardrails: "الضوابط التي تحكم الوكيل",
    guardrailsLead: "أربعة مبادئ تحكم ما نبنيه وما نرفضه، وتنطبق على كل وكيل دون استثناء.",
    across: "يعمل عبر",
    included: "ما الذي يشمله",
    always: "مشمول في كل تعاقد",
    related: "خدمات في المسار نفسه",
    guardrailItems: [
      { title: "صدق تشغيلي", text: "لا نلتزم إلا بعملية نقدر على قياسها. وحين لا يتفوق الوكيل على طريقة العمل الحالية، نقولها قبل توقيع العقد." },
      { title: "إشراف بشري بالتصميم", text: "كل وكيل يعمل ضمن حدود محددة ويصعّد إلى شخص بالاسم. الصلاحية تُمنح من العميل عمدًا، ولا يفترضها النظام." },
      { title: "العربية أولًا، والإنجليزية بالتساوي", text: "عملاؤكم يكتبون باللهجة ويبدّلون اللغة داخل الجملة ويتوقعون أن يُفهموا. نبني لهذا الواقع لا نلتف حوله بالترجمة." },
      { title: "سلّم أولًا ثم توسّع", text: "نبدأ بعملية واحدة عالية الأثر ونستحق التالية. انضباط النطاق يحمي ميزانيتكم بقدر ما يحمي مصداقيتنا." }
    ],
    listEyebrow: "١٧ خدمة · ٥ مسارات",
    listHeadline: "كل خدمة يمكن التعاقد عليها وحدها",
    listLead: "أغلب التعاقدات تجمع خدمتين أو ثلاثًا، وتبدأ بالعملية التي تحمل أعلى كلفة تشغيلية.",
    listTitle: "خدمات فلق للذكاء الاصطناعي | ١٧ خدمة عبر خمسة مسارات",
    listDescription: "سبعة عشر خدمة ذكاء اصطناعي: وكلاء الإيرادات والعملاء، المستندات والأنظمة، التكامل، القنوات، والتمكين.",
    alwaysItems: [
      "صلاحيات محددة، وتصعيد إلى مسؤول بالاسم، وتقارير دورية",
      "التسليم كتجربة محددة النطاق، أو عقد تشغيل شهري، أو بناء وتسليم",
      "التشغيل عبر واتساب والدردشة والصوت والبريد، وداخل الـ CRM والتقويم"
    ]
  },
  en: {
    detail: "What it does",
    flow: "How it works, step by step",
    flowLead: "This is the real workflow with its rules and its limits — including the moment the agent stops and hands the case to a person.",
    flowStrings: { step: "Step", trigger: "Arrives from", decision: "Checks", log: "Recorded" },
    guardrails: "The guardrails it runs under",
    guardrailsLead: "Four principles govern what we build and what we decline, and they apply to every agent without exception.",
    across: "Operates across",
    included: "What is included",
    always: "Included in every engagement",
    related: "Services on the same track",
    guardrailItems: [
      { title: "Operational honesty", text: "We commit only to processes we can measure. Where an agent cannot outperform the current method of working, we say so before the contract is signed." },
      { title: "Human oversight by design", text: "Every agent operates within defined limits and escalates to a named individual. Authority is granted deliberately by the client and never assumed by the system." },
      { title: "Arabic first, English equally", text: "Your customers write in dialect, switch language mid-sentence, and expect to be understood. We build for that reality rather than translating around it." },
      { title: "Deliver, then expand", text: "We begin with one high-impact process and earn the next. Scope discipline protects your budget as much as it protects our credibility." }
    ],
    listEyebrow: "17 services · 5 tracks",
    listHeadline: "Each service can be engaged independently",
    listLead: "Most engagements combine two or three, beginning with the process that carries the highest operational cost.",
    listTitle: "Falaq AI Services | 17 services across five tracks",
    listDescription: "Seventeen AI services across revenue and customer operations, documents and systems, integrations, channels, and enablement.",
    alwaysItems: [
      "Defined permissions, escalation to a named owner, and reporting",
      "Delivery as a scoped pilot, an operations retainer, or a build-and-handover project",
      "Operation across WhatsApp, web chat, voice, email, and your CRM and calendar"
    ]
  }
};

function route(slug, language) {
  return itemRoute("services", slug, language);
}

function listingRoute(language) {
  return sectionRoute("services", language);
}

function categoryOf(key) {
  return CATEGORIES.find((item) => item.key === key);
}

function seoTitle(service, language) {
  const name = service[language].name;
  return language === "ar" ? `${name} | وكيل فلق للذكاء الاصطناعي` : `${name} | Falaq Intelligence`;
}

function servicePage(service, language) {
  const content = service[language];
  const l = labels[language];
  const c = chromeLabels[language];
  const category = categoryOf(service.category);
  const related = SERVICES.filter((item) => item.category === service.category && item.slug !== service.slug);

  const head = seoHead({
    title: seoTitle(service, language),
    description: content.summary,
    canonical: route(service.slug, language),
    arPath: route(service.slug, "ar"),
    enPath: route(service.slug, "en"),
    language,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: content.name,
          serviceType: content.name,
          description: content.summary,
          provider: { "@type": "Organization", name: "Falaq Intelligence", url: site },
          areaServed: ["Jordan", "Saudi Arabia", "United Arab Emirates", "Oman", "Qatar", "Kuwait"],
          availableLanguage: ["ar", "en"],
          url: `${site}${route(service.slug, language)}`
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: c.home, item: `${site}${homeHref(language)}` },
            { "@type": "ListItem", position: 2, name: c.services, item: `${site}${listingRoute(language)}` },
            { "@type": "ListItem", position: 3, name: content.name, item: `${site}${route(service.slug, language)}` }
          ]
        }
      ]
    }
  });

  // Services 15 to 17 are advisory rather than runtime agents, so they have no
  // flow and the section is omitted instead of being invented for them.
  const flow = FLOWS[service.slug]?.[language];
  const sections = [
    `<h2>${esc(l.detail)}</h2><p>${esc(content.detail)}</p>`,
    flow ? `<h2>${esc(l.flow)}</h2><p>${esc(l.flowLead)}</p><div class="flow-canvas fx-in">${flowMarkup(flow, l.flowStrings)}</div>` : null,
    `<h2>${esc(l.across)}</h2><ul class="chips">${content.operatesAcross.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`,
    `<h2>${esc(l.included)}</h2><div class="cards">${content.included.map((item, index) => `<div class="info-card"><strong>${String(index + 1).padStart(2, "0")}</strong><span>${esc(item)}</span></div>`).join("")}</div>`,
    `<h2>${esc(l.guardrails)}</h2><p>${esc(l.guardrailsLead)}</p><div class="cards">${l.guardrailItems.map((item) => `<div class="info-card"><strong>${esc(item.title)}</strong><span>${esc(item.text)}</span></div>`).join("")}</div>`,
    `<h2>${esc(l.always)}</h2><ul>${l.alwaysItems.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`
  ].filter(Boolean);

  const body = `    <header class="hero"><div class="wrap hero-content">
      <div class="breadcrumb"><a href="${homeHref(language)}">${c.home}</a> / <a href="${listingRoute(language)}">${c.services}</a> / ${esc(content.name)}</div>
      <span class="eyebrow">${esc(service.number)} · ${esc(category[language].title)}</span>
      <h1>${esc(content.title)}</h1>
      <p class="hero-lead">${esc(content.summary)}</p>
    </div></header>
    <div class="wrap service-body">
${sections.map((html, index) => `      <section class="content-section"><span class="section-num">${String(index + 1).padStart(2, "0")}</span>${html}</section>`).join("\n")}
    </div>
${related.length ? `    <section class="related"><div class="wrap"><h2>${esc(l.related)}</h2><div class="related-grid">${related.map((item) => `<a class="related-card" href="${route(item.slug, language)}"><b>${esc(item[language].name)}</b><span>${esc(item[language].summary)}</span></a>`).join("")}</div></div></section>\n` : ""}${ctaSection(language)}`;

  return chrome({
    language,
    head,
    body,
    current: "services",
    languageHref: route(service.slug, language === "ar" ? "en" : "ar")
  });
}

function listingPage(language) {
  const l = labels[language];
  const c = chromeLabels[language];

  const head = seoHead({
    title: l.listTitle,
    description: l.listDescription,
    canonical: listingRoute(language),
    arPath: listingRoute("ar"),
    enPath: listingRoute("en"),
    language,
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: l.listTitle,
      numberOfItems: SERVICES.length,
      itemListElement: SERVICES.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service[language].name,
        url: `${site}${route(service.slug, language)}`
      }))
    }
  });

  const groups = CATEGORIES.map((category) => {
    const items = SERVICES.filter((service) => service.category === category.key);
    return `      <section class="content-section"><span class="section-num">${esc(items[0].number)}</span><h2>${esc(category[language].title)}</h2><p>${esc(category[language].lead)}</p><div class="related-grid">${items.map((service) => `<a class="related-card" href="${route(service.slug, language)}"><b>${esc(service.number)} · ${esc(service[language].name)}</b><span>${esc(service[language].summary)}</span></a>`).join("")}</div></section>`;
  }).join("\n");

  const body = `    <header class="hero"><div class="wrap hero-content">
      <div class="breadcrumb"><a href="${homeHref(language)}">${c.home}</a> / ${esc(c.services)}</div>
      <span class="eyebrow">${esc(l.listEyebrow)}</span>
      <h1>${esc(l.listHeadline)}</h1>
      <p class="hero-lead">${esc(l.listLead)}</p>
    </div></header>
    <div class="wrap service-body">
${groups}
    </div>
${ctaSection(language)}`;

  return chrome({
    language,
    head,
    body,
    current: "services",
    languageHref: listingRoute(language === "ar" ? "en" : "ar")
  });
}

let written = 0;
const skipped = [];

for (const service of SERVICES) {
  if (LEGACY.has(service.slug)) {
    skipped.push(service.slug);
    continue;
  }
  for (const language of ["ar", "en"]) {
    const output = path.join(root, language === "ar" ? "services" : "en/services", service.slug, "index.html");
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, `${servicePage(service, language)}\n`);
    written += 1;
  }
}

for (const language of ["ar", "en"]) {
  const output = path.join(root, language === "ar" ? "services" : "en/services", "index.html");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${listingPage(language)}\n`);
  written += 1;
}

console.log(`Built ${written} pages from content/services.js.`);
console.log(`Left untouched (hand-built, richer): ${skipped.join(", ")}`);

module.exports = { route, listingRoute };
