const fs = require("node:fs");
const path = require("node:path");
const { SECTORS, RETIRED_SLUGS } = require("../content/sectors.js");
const { SERVICES, CATEGORIES } = require("../content/services.js");
const { FLOWS } = require("../content/agent-flows.js");
const { markup: flowMarkup } = require("../assets/flow-view.js");
const { RULES, RULE_TEXT } = require("../content/agent-rules.js");
const { site, esc, homeHref, sectionRoute, itemRoute, ctaSection, seoHead, chrome, chromeLabels } = require("./lib/layout.js");

const root = path.resolve(__dirname, "..");

const labels = {
  ar: {
    automate: "ما الذي نؤتمته عادةً",
    firstAgent: "الوكيل الأول المعتاد",
    firstAgentLead: "نبدأ بعملية واحدة عالية الأثر ونتوسّع بعد ثبوت النتائج. في هذا القطاع تكون البداية عادةً من هنا.",
    readiness: "مؤشرات الجاهزية",
    readinessLead: "إن انطبق اثنان أو أكثر من هذه على شركتك، فالأتمتة ستثبت أثرها سريعًا.",
    others: "قطاعات أخرى نخدمها",
    flowStrings: { step: "خطوة", trigger: "يصل من", decision: "يتحقق", log: "يُسجَّل" },
    listTitle: "القطاعات التي نخدمها",
    listHeadline: "معرفة تشغيلية بالقطاع، لا عرضًا عامًا",
    listLead: "نعمل مع منشآت قائمة صغيرة ومتوسطة — من ١٠ إلى ٢٠٠ موظف — يصلها طلب أكثر مما تستوعبه فرقها، وتعمل بانضباط تشغيلي يكفي لتثبت الأتمتة.",
    listDescription: "وكلاء ذكاء اصطناعي لقطاعات الرعاية الصحية والتعليم والتجارة والضيافة وصناعة المحتوى، بتركيز على عمليات قابلة للقياس في الأردن والخليج.",
    profileTitle: "ملف العميل المناسب",
    notFitTitle: "أين لسنا الخيار المناسب",
    notFit: "المؤسسات التي تبحث عن شريك بحثي، أو بيت تطوير برمجيات عام، أو روبوت محادثة يُوضع على الموقع دون تغيير في العملية التي خلفه.",
    viewService: "اطّلع على الخدمة",
    readinessItems: [
      "الاستفسارات تصل أسرع مما يستطيع الفريق الرد عليه",
      "عروض الأسعار والعملاء المحتملون يسقطون لعدم المتابعة",
      "الموظفون ينقلون البيانات من المستندات إلى الأنظمة يدويًا",
      "الأسئلة نفسها يُجاب عنها مرارًا كل يوم",
      "لا يُعتمد على الـ CRM لأنه ليس محدّثًا"
    ],
    profileItems: [
      { title: "الحجم", text: "من ١٠ إلى ٢٠٠ موظف، فرع واحد أو عدة فروع" },
      { title: "الجغرافيا", text: "الأردن والسعودية والإمارات وعُمان وقطر والكويت" },
      { title: "الحجم التشغيلي", text: "مئات الرسائل أو الحجوزات أو المستندات أسبوعيًا" },
      { title: "صاحب القرار", text: "المالك أو المدير العام أو مدير العمليات أو المبيعات أو الدعم" },
      { title: "الأنظمة", text: "نظام CRM، ونظام حجز أو نقاط بيع، وواتساب للأعمال، وبريد إلكتروني" }
    ]
  },
  en: {
    automate: "What we typically automate",
    firstAgent: "Usual first agent",
    firstAgentLead: "We begin with one high-impact process and expand once results are established. In this sector, the starting point is usually here.",
    readiness: "Indicators of readiness",
    readinessLead: "If two or more of these describe your business, automation will show its effect quickly.",
    others: "Other sectors we serve",
    flowStrings: { step: "Step", trigger: "Arrives from", decision: "Checks", log: "Recorded" },
    listTitle: "Sectors served",
    listHeadline: "Operational knowledge of the sector, not a general pitch",
    listLead: "We work with established small and mid-sized organisations — typically 10 to 200 staff — that receive more inbound demand than their teams can handle, and that operate with sufficient process discipline for automation to hold.",
    listDescription: "AI agents for healthcare, education, retail, hospitality, content, and SME operations, built around measurable processes in Jordan and the Gulf.",
    profileTitle: "Ideal client profile",
    notFitTitle: "Where we are not the right fit",
    notFit: "Organisations seeking a research partner, a general software development house, or a chatbot placed on a website without change to the process behind it.",
    viewService: "View the service",
    readinessItems: [
      "Enquiries arrive faster than the team can respond",
      "Quotations and leads lapse for want of follow-up",
      "Staff transcribe data from documents into systems manually",
      "The same questions are answered repeatedly each day",
      "The CRM is not relied upon because it is not current"
    ],
    profileItems: [
      { title: "Size", text: "10–200 employees, one to several branches" },
      { title: "Geography", text: "Jordan, Saudi Arabia, UAE, Oman, Qatar, Kuwait" },
      { title: "Volume", text: "Hundreds of customer messages, bookings or documents each week" },
      { title: "Buyer", text: "Owner, general manager, or head of operations, sales or support" },
      { title: "Systems", text: "A CRM, a booking or POS system, WhatsApp Business, email" }
    ]
  }
};

function route(slug, language) {
  return itemRoute("industries", slug, language);
}

function listingRoute(language) {
  return sectionRoute("industries", language);
}

function serviceRoute(slug, language) {
  return itemRoute("services", slug, language);
}

function findService(slug) {
  const service = SERVICES.find((item) => item.slug === slug);
  if (!service) throw new Error(`content/sectors.js references unknown service slug: ${slug}`);
  return service;
}

function sectorPage(sector, language) {
  const content = sector[language];
  const l = labels[language];
  const c = chromeLabels[language];
  const agent = findService(sector.firstAgent);
  const others = SECTORS.filter((item) => item.slug !== sector.slug);
  const title = language === "ar"
    ? `${content.name} | وكلاء فلق للذكاء الاصطناعي`
    : `AI agents for ${content.name} | Falaq Intelligence`;

  const head = seoHead({
    title,
    description: content.summary,
    canonical: route(sector.slug, language),
    arPath: route(sector.slug, "ar"),
    enPath: route(sector.slug, "en"),
    language,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: content.name,
          description: content.summary,
          provider: { "@type": "Organization", name: "Falaq Intelligence", url: site },
          audience: { "@type": "BusinessAudience", name: content.name },
          areaServed: ["Jordan", "Saudi Arabia", "United Arab Emirates", "Oman", "Qatar", "Kuwait"],
          url: `${site}${route(sector.slug, language)}`
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: c.home, item: `${site}${homeHref(language)}` },
            { "@type": "ListItem", position: 2, name: c.sectors, item: `${site}${listingRoute(language)}` },
            { "@type": "ListItem", position: 3, name: content.name, item: `${site}${route(sector.slug, language)}` }
          ]
        }
      ]
    }
  });

  const body = `    <header class="hero"><div class="wrap hero-content">
      <div class="breadcrumb"><a href="${homeHref(language)}">${c.home}</a> / <a href="${listingRoute(language)}">${c.sectors}</a> / ${esc(content.name)}</div>
      <span class="eyebrow">${esc(content.subtypes)}</span>
      <h1>${esc(content.title)}</h1>
      <p class="hero-lead">${esc(content.summary)}</p>
    </div></header>
    <div class="wrap service-body">
      <section class="content-section"><span class="section-num">01</span><h2>${esc(l.automate)}</h2><ul>${content.automate.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></section>
      <section class="content-section"><span class="section-num">02</span><h2>${esc(l.firstAgent)}</h2><p>${esc(l.firstAgentLead)}</p><div class="related-grid one-up"><a class="related-card" href="${serviceRoute(agent.slug, language)}"><b>${esc(agent.number)} · ${esc(agent[language].name)}</b><span>${esc(agent[language].summary)}</span></a></div>${FLOWS[sector.firstAgent] ? `<div class="flow-canvas fx-in">${flowMarkup(FLOWS[sector.firstAgent][language], l.flowStrings)}</div>` : ""}</section>
      <section class="content-section"><span class="section-num">03</span><h2>${esc(l.readiness)}</h2><p>${esc(l.readinessLead)}</p><ul>${l.readinessItems.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></section>
    </div>
    <section class="related"><div class="wrap"><h2>${esc(l.others)}</h2><div class="related-grid">${others.map((item) => `<a class="related-card" href="${route(item.slug, language)}"><b>${esc(item[language].name)}</b><span>${esc(item[language].summary)}</span></a>`).join("")}</div></div></section>
${ctaSection(language)}`;

  return chrome({
    language,
    head,
    body,
    current: "sectors",
    languageHref: route(sector.slug, language === "ar" ? "en" : "ar")
  });
}

function listingPage(language) {
  const l = labels[language];
  const c = chromeLabels[language];
  const title = language === "ar"
    ? "القطاعات التي نخدمها | فلق للذكاء الاصطناعي"
    : "Sectors served | Falaq Intelligence";

  const head = seoHead({
    title,
    description: l.listDescription,
    canonical: listingRoute(language),
    arPath: listingRoute("ar"),
    enPath: listingRoute("en"),
    language,
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: title,
      numberOfItems: SECTORS.length,
      itemListElement: SECTORS.map((sector, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: sector[language].name,
        url: `${site}${route(sector.slug, language)}`
      }))
    }
  });

  const body = `    <header class="hero"><div class="wrap hero-content">
      <div class="breadcrumb"><a href="${homeHref(language)}">${c.home}</a> / ${esc(c.sectors)}</div>
      <span class="eyebrow">${esc(l.listTitle)}</span>
      <h1>${esc(l.listHeadline)}</h1>
      <p class="hero-lead">${esc(l.listLead)}</p>
    </div></header>
    <div class="wrap service-body">
      <section class="content-section"><span class="section-num">01</span><h2>${esc(l.listTitle)}</h2><div class="related-grid">${SECTORS.map((sector) => {
        const agent = findService(sector.firstAgent);
        return `<a class="related-card" href="${route(sector.slug, language)}"><b>${esc(sector[language].name)}</b><span>${esc(sector[language].summary)}</span><em class="card-tag">${esc(l.firstAgent)}: ${esc(agent[language].name)}</em></a>`;
      }).join("")}</div></section>
      <section class="content-section"><span class="section-num">02</span><h2>${esc(l.profileTitle)}</h2><div class="cards">${l.profileItems.map((item) => `<div class="info-card"><strong>${esc(item.title)}</strong><span>${esc(item.text)}</span></div>`).join("")}</div></section>
      <section class="content-section"><span class="section-num">03</span><h2>${esc(l.readiness)}</h2><ul>${l.readinessItems.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></section>
      <section class="content-section"><span class="section-num">04</span><h2>${esc(l.notFitTitle)}</h2><p class="notice">${esc(l.notFit)}</p></section>
    </div>
${ctaSection(language)}`;

  return chrome({
    language,
    head,
    body,
    current: "sectors",
    languageHref: listingRoute(language === "ar" ? "en" : "ar")
  });
}

function redirectStub(target, language) {
  const lang = language === "ar" ? 'lang="ar" dir="rtl"' : 'lang="en"';
  const word = language === "ar" ? "انتقل إلى القطاعات" : "Go to sectors";
  return `<!doctype html><html ${lang}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><link rel="canonical" href="${site}${target}"><meta http-equiv="refresh" content="0;url=${target}"><title>Falaq Intelligence</title></head><body><p><a href="${target}">${word}</a></p><script>location.replace(${JSON.stringify(target)})</script></body></html>`;
}

let written = 0;

for (const sector of SECTORS) {
  for (const language of ["ar", "en"]) {
    const output = path.join(root, language === "ar" ? "industries" : "en/industries", sector.slug, "index.html");
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, `${sectorPage(sector, language)}\n`);
    written += 1;
  }
}

for (const language of ["ar", "en"]) {
  const output = path.join(root, language === "ar" ? "industries" : "en/industries", "index.html");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${listingPage(language)}\n`);
  written += 1;
}

// Retired slugs keep responding so older links and any indexed URL still land
// somewhere useful instead of a 404.
let redirects = 0;
for (const slug of RETIRED_SLUGS) {
  for (const language of ["ar", "en"]) {
    const output = path.join(root, language === "ar" ? "industries" : "en/industries", slug, "index.html");
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, `${redirectStub(listingRoute(language), language)}\n`);
    redirects += 1;
  }
}

// Older Arabic routes used an unnecessary /ar prefix. Keep every known form
// working, but make the primary Arabic URLs under /industries/ unambiguous.
const legacyArabicIndex = path.join(root, "ar", "industries", "index.html");
fs.mkdirSync(path.dirname(legacyArabicIndex), { recursive: true });
fs.writeFileSync(legacyArabicIndex, `${redirectStub(listingRoute("ar"), "ar")}\n`);
redirects += 1;
for (const sector of SECTORS) {
  const output = path.join(root, "ar", "industries", sector.slug, "index.html");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${redirectStub(route(sector.slug, "ar"), "ar")}\n`);
  redirects += 1;
}
for (const slug of RETIRED_SLUGS) {
  const output = path.join(root, "ar", "industries", slug, "index.html");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${redirectStub(listingRoute("ar"), "ar")}\n`);
  redirects += 1;
}

// The home page renders its sector cards from an inline script and cannot
// require() the content modules, so the data is emitted for it to read.
const homeData = { ar: {}, en: {} };
for (const language of ["ar", "en"]) {
  homeData[language].sectors = SECTORS.map((sector) => ({
    slug: sector.slug,
    icon: sector.icon,
    t: sector[language].name,
    d: sector[language].summary,
    href: route(sector.slug, language)
  }));
  homeData[language].stats = [
    { n: String(SERVICES.length), t: language === "ar" ? "خدمة عبر الوكلاء والتكامل والتمكين" : "Services across agents, integrations and enablement" },
    { n: "6", t: language === "ar" ? "أسواق في الأردن والخليج" : "Markets served across Jordan and the Gulf" },
    { n: "2", t: language === "ar" ? "لغتا عمل، العربية والإنجليزية" : "Working languages, Arabic and English" },
    { n: "1", t: language === "ar" ? "عملية في كل مرة، حتى تثبت النتائج" : "Process at a time, until results are established" }
  ];
  // Each sector ships the flow of the agent an engagement usually starts with,
  // so the picker can draw it with no network call.
  homeData[language].flows = {};
  for (const sector of SECTORS) {
    const flow = FLOWS[sector.firstAgent];
    if (!flow) throw new Error(`content/agent-flows.js is missing a flow for ${sector.firstAgent}`);
    const agent = findService(sector.firstAgent);
    homeData[language].flows[sector.slug] = {
      ...flow[language],
      agent: agent[language].name,
      agentHref: itemRoute("services", agent.slug, language)
    };
  }
  homeData[language].flowStrings = language === "ar"
    ? { step: "خطوة", trigger: "يصل من", decision: "يتحقق", log: "يُسجَّل" }
    : { step: "Step", trigger: "Arrives from", decision: "Checks", log: "Recorded" };

  // Sandbox definitions, keyed by sector so the picker can switch both the
  // diagram and the rule engine together. Agents without published rules are
  // simply absent, and the section hides itself.
  homeData[language].rules = {};
  for (const sector of SECTORS) {
    if (RULES[sector.firstAgent]) homeData[language].rules[sector.slug] = RULES[sector.firstAgent];
  }
  homeData[language].ruleText = RULE_TEXT[language];
  homeData[language].sandboxStrings = language === "ar"
    ? { extracted: "ما استخرجه الوكيل", rules: "القواعد التي انطبقت", handoff: "التسليم" }
    : { extracted: "What the agent extracted", rules: "Rules that applied", handoff: "Handoff" };

  // The home page renders all 17 services as cards. `image` points at the
  // photograph for that service; the card falls back to a generated mark when
  // the file is absent, so a partial image set still ships cleanly.
  homeData[language].categories = CATEGORIES.map((category) => ({
    key: category.key,
    title: category[language].title,
    lead: category[language].lead
  }));
  homeData[language].services = SERVICES.map((service) => ({
    slug: service.slug,
    number: service.number,
    category: service.category,
    name: service[language].name,
    summary: service[language].summary,
    href: itemRoute("services", service.slug, language),
    image: `/assets/services/${service.slug}.webp`
  }));
}

const generatedDir = path.join(root, "assets", "generated");
fs.mkdirSync(generatedDir, { recursive: true });
fs.writeFileSync(
  path.join(generatedDir, "home-data.js"),
  `// GENERATED by scripts/build-sector-pages.js from content/sectors.js and\n// content/services.js. Do not edit; run \`npm run build:seo\`.\nwindow.FALAQ_HOME = ${JSON.stringify(homeData, null, 2)};\n`
);

console.log(`Built ${written} sector pages and ${redirects} redirects from content/sectors.js.`);
console.log("Wrote assets/generated/home-data.js");

module.exports = { route, listingRoute };
