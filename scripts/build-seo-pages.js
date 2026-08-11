const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const site = "https://falaqai.com";
const socialImage = `${site}/assets/falaq-social-card.jpg`;
const countries = ["Jordan", "Saudi Arabia", "United Arab Emirates", "Oman", "Qatar", "Kuwait"];

const pages = [
  {
    source: "index.html",
    arPath: "/",
    enPath: "/en/",
    type: "home",
    ar: {
      title: "فلق للذكاء الاصطناعي | وكلاء AI لأتمتة عمليات الشركات",
      description: "فلق تبني وكلاء ذكاء اصطناعي للشركات يؤهلون العملاء، يتابعون المبيعات، يخدمون العملاء، ويحدّثون الأنظمة بالعربية والإنجليزية.",
    },
    en: {
      title: "Falaq Intelligence | AI Agents for Business Operations",
      description: "Falaq builds practical AI agents that qualify leads, follow up sales, support customers, process documents, and update business systems.",
    },
  },
  {
    source: "services/index.html",
    arPath: "/services/",
    enPath: "/en/services/",
    type: "listing",
    ar: {
      title: "وكلاء الذكاء الاصطناعي للشركات | خدمات فلق AI",
      description: "استعرض وكلاء فلق للذكاء الاصطناعي: تأهيل العملاء، متابعة العروض، الحجز، خدمة العملاء، التحصيل، المستندات، وإدارة CRM.",
    },
    en: {
      title: "AI Agents for Business Workflows | Falaq Services",
      description: "Explore Falaq AI agents for lead qualification, quote follow-up, booking, customer service, receivables, documents, and CRM control.",
    },
  },
  {
    slug: "lead-qualification",
    ar: {
      title: "تأهيل العملاء بالذكاء الاصطناعي | وكيل فلق AI",
      description: "وكيل ذكاء اصطناعي يستقبل العملاء من واتساب والموقع والإعلانات، يجمع بياناتهم، يقيّم جاهزيتهم، ويوجههم إلى الإجراء المناسب.",
      name: "وكيل تأهيل العملاء بالذكاء الاصطناعي",
      serviceType: "أتمتة استقبال وتأهيل العملاء المحتملين",
    },
    en: {
      title: "AI Lead Qualification Agent | Falaq Intelligence",
      description: "An AI lead qualification agent that receives leads, gathers data, scores readiness, and routes each opportunity to the right sales action.",
      name: "AI Lead Qualification Agent",
      serviceType: "AI lead intake and qualification automation",
    },
  },
  {
    slug: "quote-follow-up",
    ar: {
      title: "متابعة عروض الأسعار بالذكاء الاصطناعي | فلق AI",
      description: "وكيل ذكاء اصطناعي يتابع عروض الأسعار تلقائيًا، يرصد اهتمام العميل واعتراضاته، وينبه فريق المبيعات عند ظهور نية شراء حقيقية.",
      name: "وكيل متابعة عروض الأسعار",
      serviceType: "أتمتة متابعة عروض الأسعار وفرص المبيعات",
    },
    en: {
      title: "AI Quote Follow-Up Agent | Falaq Intelligence",
      description: "An AI agent that follows up every quote, identifies objections and buying intent, and alerts sales when an opportunity needs human action.",
      name: "AI Quote Follow-Up Agent",
      serviceType: "AI quote and sales opportunity follow-up",
    },
  },
  {
    slug: "booking-recovery",
    ar: {
      title: "إدارة الحجوزات واستعادة المكالمات بالذكاء الاصطناعي | فلق",
      description: "وكيل فلق يرد على المكالمات الفائتة، يحجز المواعيد، يؤكدها ويذكّر بها، ويعيد جدولة الحالات لتقليل ضياع الحجوزات وعدم الحضور.",
      name: "وكيل إدارة الحجوزات واستعادة المكالمات",
      serviceType: "أتمتة الحجز واستعادة المكالمات الفائتة",
    },
    en: {
      title: "AI Booking and Missed-Call Recovery Agent | Falaq",
      description: "An AI booking agent that recovers missed calls, books and confirms appointments, sends reminders, and reduces no-shows automatically.",
      name: "AI Booking and Missed-Call Recovery Agent",
      serviceType: "AI booking and missed-call recovery automation",
    },
  },
  {
    slug: "customer-service",
    ar: {
      title: "وكيل خدمة العملاء بالذكاء الاصطناعي | فلق AI",
      description: "وكيل خدمة عملاء ذكي يجيب من قاعدة معرفتك، يصنف الطلبات، ينفذ الإجراءات المسموحة، ويصعّد الحالات الحساسة للموظف المختص.",
      name: "وكيل خدمة العملاء بالذكاء الاصطناعي",
      serviceType: "أتمتة خدمة العملاء وتوجيه الطلبات",
    },
    en: {
      title: "AI Customer Service Agent | Falaq Intelligence",
      description: "An AI customer service agent that answers from your knowledge base, routes requests, performs approved actions, and escalates sensitive cases.",
      name: "AI Customer Service Agent",
      serviceType: "AI customer service and request routing",
    },
  },
  {
    slug: "accounts-receivable",
    ar: {
      title: "تحصيل المستحقات بالذكاء الاصطناعي | وكيل فلق AI",
      description: "وكيل ذكاء اصطناعي يرسل تذكيرات مهنية للفواتير، يسجل وعود الدفع والاعتراضات، ويتوقف عند السداد أو يصعّد الحالة للمحاسب.",
      name: "وكيل تحصيل ومتابعة المستحقات",
      serviceType: "أتمتة متابعة الفواتير وتحصيل المستحقات",
    },
    en: {
      title: "AI Accounts Receivable Agent | Falaq Intelligence",
      description: "An AI accounts receivable agent that sends professional reminders, tracks payment promises and disputes, and escalates cases to accounting.",
      name: "AI Accounts Receivable Agent",
      serviceType: "AI invoice and accounts receivable follow-up",
    },
  },
  {
    slug: "document-processing",
    ar: {
      title: "معالجة المستندات والفواتير بالذكاء الاصطناعي | فلق",
      description: "وكيل فلق يستخرج البيانات من المستندات والفواتير، يتحقق من الحقول، يكشف النواقص، وينقل البيانات المنظمة إلى أنظمتك.",
      name: "وكيل معالجة المستندات بالذكاء الاصطناعي",
      serviceType: "أتمتة استخراج ومعالجة بيانات المستندات",
    },
    en: {
      title: "AI Document Processing Agent | Falaq Intelligence",
      description: "An AI document processing agent that extracts and validates data, flags missing fields, and sends structured records to your business systems.",
      name: "AI Document Processing Agent",
      serviceType: "AI document data extraction and processing",
    },
  },
  {
    slug: "crm-control",
    ar: {
      title: "تحديث وتنظيم CRM بالذكاء الاصطناعي | وكيل فلق",
      description: "وكيل ذكاء اصطناعي ينظف بيانات CRM، يدمج السجلات المكررة، يوزع العملاء، يراقب الصفقات المتوقفة، ويرسل تقارير دقيقة.",
      name: "وكيل تنظيم وتحديث CRM",
      serviceType: "أتمتة جودة بيانات وإدارة نظام CRM",
    },
    en: {
      title: "AI CRM Control and Data Quality Agent | Falaq",
      description: "An AI CRM agent that cleans records, resolves duplicates, routes leads, monitors stalled deals, and keeps sales data accurate and current.",
      name: "AI CRM Control Agent",
      serviceType: "AI CRM data quality and workflow control",
    },
  },
];

pages.forEach((page) => {
  if (!page.slug) return;
  page.source = `services/${page.slug}/index.html`;
  page.arPath = `/services/${page.slug}/`;
  page.enPath = `/en/services/${page.slug}/`;
  page.type = "service";
});

function schemaFor(page, language) {
  const localized = page[language];
  const currentPath = language === "ar" ? page.arPath : page.enPath;
  const homePath = language === "ar" ? "/" : "/en/";
  const servicesPath = language === "ar" ? "/services/" : "/en/services/";
  const graph = [];

  if (page.type === "home") {
    graph.push({
      "@type": "Organization",
      "@id": `${site}/#organization`,
      name: "Falaq Intelligence",
      alternateName: "فلق للذكاء الاصطناعي",
      url: `${site}/`,
      logo: `${site}/assets/falaq-symbol.png`,
      image: socialImage,
      email: "hello@falaqai.com",
      telephone: "+962792961872",
      sameAs: [
        "https://www.instagram.com/falaqai/",
        "https://www.facebook.com/profile.php?id=61592175171348",
        "https://www.linkedin.com/company/135187245/",
      ],
      areaServed: countries,
    });
    graph.push({
      "@type": "WebSite",
      "@id": `${site}/#website`,
      url: `${site}/`,
      name: "Falaq Intelligence",
      alternateName: "فلق للذكاء الاصطناعي",
      publisher: { "@id": `${site}/#organization` },
      inLanguage: ["ar", "en"],
    });
  }

  if (page.type === "listing") {
    graph.push({
      "@type": "ItemList",
      "@id": `${site}${currentPath}#services`,
      name: localized.title,
      itemListElement: pages.filter((item) => item.type === "service").map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item[language].name,
        url: `${site}${language === "ar" ? item.arPath : item.enPath}`,
      })),
    });
  }

  if (page.type === "service") {
    graph.push({
      "@type": "Service",
      "@id": `${site}${currentPath}#service`,
      name: localized.name,
      description: localized.description,
      url: `${site}${currentPath}`,
      provider: {
        "@type": "Organization",
        "@id": `${site}/#organization`,
        name: "Falaq Intelligence",
        url: `${site}/`,
      },
      serviceType: localized.serviceType,
      areaServed: countries,
      inLanguage: language,
    });
  }

  if (page.type !== "home") {
    const items = [
      { "@type": "ListItem", position: 1, name: language === "ar" ? "الرئيسية" : "Home", item: `${site}${homePath}` },
      { "@type": "ListItem", position: 2, name: language === "ar" ? "الخدمات" : "Services", item: `${site}${servicesPath}` },
    ];
    if (page.type === "service") items.push({ "@type": "ListItem", position: 3, name: localized.name, item: `${site}${currentPath}` });
    graph.push({ "@type": "BreadcrumbList", "@id": `${site}${currentPath}#breadcrumb`, itemListElement: items });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function seoBlock(page, language) {
  const localized = page[language];
  const currentPath = language === "ar" ? page.arPath : page.enPath;
  const locale = language === "ar" ? "ar_JO" : "en_US";
  const alternateLocale = language === "ar" ? "en_US" : "ar_JO";
  return [
    "<!-- SEO:START -->",
    '  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">',
    `  <link rel="canonical" href="${site}${currentPath}">`,
    `  <link rel="alternate" hreflang="ar" href="${site}${page.arPath}">`,
    `  <link rel="alternate" hreflang="en" href="${site}${page.enPath}">`,
    `  <link rel="alternate" hreflang="x-default" href="${site}${page.arPath}">`,
    '  <link rel="icon" href="/assets/falaq-symbol.png" type="image/png">',
    '  <meta property="og:type" content="website">',
    '  <meta property="og:site_name" content="Falaq Intelligence">',
    `  <meta property="og:title" content="${localized.title}">`,
    `  <meta property="og:description" content="${localized.description}">`,
    `  <meta property="og:url" content="${site}${currentPath}">`,
    `  <meta property="og:image" content="${socialImage}">`,
    '  <meta property="og:image:width" content="1200">',
    '  <meta property="og:image:height" content="630">',
    `  <meta property="og:image:alt" content="${language === "ar" ? "فلق للذكاء الاصطناعي - وكلاء AI لعمليات الشركات" : "Falaq Intelligence - AI agents for business operations"}">`,
    `  <meta property="og:locale" content="${locale}">`,
    `  <meta property="og:locale:alternate" content="${alternateLocale}">`,
    '  <meta name="twitter:card" content="summary_large_image">',
    `  <meta name="twitter:title" content="${localized.title}">`,
    `  <meta name="twitter:description" content="${localized.description}">`,
    `  <meta name="twitter:image" content="${socialImage}">`,
    `  <script type="application/ld+json">${JSON.stringify(schemaFor(page, language))}</script>`,
    "<!-- SEO:END -->",
  ].join("\n");
}

function prepareHtml(source, page, language) {
  const localized = page[language];
  let html = source
    .replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->\s*/g, "")
    .replace(/\s*<meta property="og:(?:title|description|type)"[^>]*>/g, "")
    .replace(/<html\b[^>]*>/i, `<html lang="${language}" dir="${language === "ar" ? "rtl" : "ltr"}">`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${localized.title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${localized.description}">`)
    .replace("</head>", `${seoBlock(page, language)}\n</head>`);

  if (page.type === "home") {
    const target = language === "ar" ? "/en/" : "/";
    const label = language === "ar" ? "EN" : "ع";
    const hreflang = language === "ar" ? "en" : "ar";
    html = html
      .replace(/<(?:button|a) class="btn btn-lang"[^>]*>[\s\S]*?<\/(?:button|a)>/, `<a class="btn btn-lang" id="langBtn" href="${target}" hreflang="${hreflang}" lang="${hreflang}">${label}</a>`)
      .replace(/\/\/ language toggle \(persisted\)[\s\S]*?\n\s*\/\/ mobile nav/, `// Language is determined by the canonical URL.\n  render('${language}');\n\n  // mobile nav`)
      .replace(/(\/\/ Language is determined by the canonical URL\.\s*\n\s*)render\(['"](?:ar|en)['"]\);/, `$1render('${language}');`);
    if (language === "en") html = html.replace(/(href|src)="assets\//g, '$1="/assets/');
  } else if (page.type === "listing") {
    const target = language === "ar" ? "/en/services/" : "/services/";
    const label = language === "ar" ? "EN" : "ع";
    const hreflang = language === "ar" ? "en" : "ar";
    html = html
      .replace(/<(?:button|a) class="btn btn-lang"[^>]*>[\s\S]*?<\/(?:button|a)>/, `<a class="btn btn-lang" id="langBtn" href="${target}" hreflang="${hreflang}" lang="${hreflang}">${label}</a>`)
      .replace(/var stored=localStorage[\s\S]*?\n\s*document\.getElementById\('yr'\)/, `render('${language}');\n  document.getElementById('yr')`)
      .replace(/render\(['"](?:ar|en)['"]\);\s*\n\s*document\.getElementById\('yr'\)/, `render('${language}');\n  document.getElementById('yr')`);
  } else {
    const target = language === "ar" ? page.enPath : page.arPath;
    const label = language === "ar" ? "EN" : "AR";
    const hreflang = language === "ar" ? "en" : "ar";
    html = html
      .replace(/(?:<button onClick="\{\{ toggleLang \}\}" style="\{\{ langBtnStyle \}\}">[\s\S]*?<\/button>|<a href="[^"]+" hreflang="(?:ar|en)" lang="(?:ar|en)" style="\{\{ langBtnStyle \}\};text-decoration:none;display:inline-flex;align-items:center;">[\s\S]*?<\/a>)/, `<a href="${target}" hreflang="${hreflang}" lang="${hreflang}" style="{{ langBtnStyle }};text-decoration:none;display:inline-flex;align-items:center;">${label}</a>`)
      .replace(/lang:\s*'(?:ar|en)'/, `lang: '${language}'`)
      .replace(/<a href="\.\.\/\.\.\/" data-falaq-home[\s\S]*?<\/a>/, `<a href="${language === "ar" ? "/" : "/en/"}" data-falaq-home style="position:fixed;bottom:18px;inset-inline-start:18px;z-index:99999;display:inline-flex;align-items:center;gap:7px;padding:9px 15px;border-radius:999px;background:rgba(7,11,20,.85);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1px solid rgba(168,85,247,.45);color:#E8E8EC;font:600 13px 'Tajawal','Manrope',system-ui,sans-serif;text-decoration:none;box-shadow:0 8px 24px rgba(0,0,0,.45)"><span style="color:#A855F7;font-size:15px">⌂</span><span>${language === "ar" ? "فلق · الرئيسية" : "Falaq · Home"}</span></a>`);

    if (language === "en") {
      html = html
        .replace('src="./support.js"', `src="/services/${page.slug}/support.js"`)
        .replace(/(?:href|src)="\.\.\/\.\.\/assets\//g, (match) => match.startsWith("href") ? 'href="/assets/' : 'src="/assets/')
        .replace('from="./animations.jsx ./ui-mocks.jsx ./scenes.jsx"', `from="/services/${page.slug}/animations.jsx /services/${page.slug}/ui-mocks.jsx /services/${page.slug}/scenes.jsx"`);
    }
  }

  return html;
}

function writeFile(relativePath, content) {
  const filePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.replace(/\r?\n/g, "\n"));
}

pages.forEach((page) => {
  const sourcePath = path.join(root, page.source);
  const original = fs.readFileSync(sourcePath, "utf8");
  writeFile(page.source, prepareHtml(original, page, "ar"));
  const englishOutput = page.type === "home" ? "en/index.html" : page.type === "listing" ? "en/services/index.html" : `en/services/${page.slug}/index.html`;
  writeFile(englishOutput, prepareHtml(original, page, "en"));
});

const legacyRedirects = pages.map((page) => ({
  file: page.type === "home" ? "ar/index.html" : page.type === "listing" ? "ar/services/index.html" : `ar/services/${page.slug}/index.html`,
  target: page.arPath,
  title: page.ar.title,
}));

legacyRedirects.forEach(({ file, target, title }) => {
  writeFile(file, `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="${site}${target}"><title>${title}</title></head><body><p><a href="${target}">انتقل إلى الصفحة</a></p><script>location.replace(${JSON.stringify(target)})</script></body></html>\n`);
});

// /contact/ has always been a redirect into the home page's contact section.
// The English side was missing one, so /en/contact/ answered with a 404.
writeFile("en/contact/index.html", `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0;url=/en/#contact"><link rel="canonical" href="${site}/en/#contact"><title>Contact Falaq Intelligence</title></head><body><p><a href="/en/#contact">Go to contact</a></p><script>location.replace("/en/#contact")</script></body></html>\n`);

// Pages still rendered client-side by app.js. The sector pages left this list
// once build-sector-pages.js started emitting them as static, indexable HTML.
[
  "about/index.html",
  "contact/index.html",
  "thank-you/index.html",
  "ar/about/index.html",
  "ar/contact/index.html",
  "ar/thank-you/index.html",
].forEach((file) => {
  const filePath = path.join(root, file);
  let html = fs.readFileSync(filePath, "utf8");
  if (!html.includes('name="robots"')) html = html.replace("<meta http-equiv=", '<meta name="robots" content="noindex,follow"><meta http-equiv=');
  writeFile(file, html);
});

const companySlugs = ["about", "trust", "responsible-ai", "service-standards", "sla", "privacy", "terms", "how-we-work", "measuring-results", "technology"];

// Services introduced by content/services.js carry their own metadata from
// build-service-pages.js, so only their sitemap entries are needed here.
const { SERVICES } = require("../content/services.js");
const { SECTORS } = require("../content/sectors.js");
const generatedServiceSlugs = SERVICES
  .map((service) => service.slug)
  .filter((slug) => !pages.some((page) => page.slug === slug));

const sitemapEntries = pages.flatMap((page) => [
  { loc: `${site}${page.arPath}`, ar: `${site}${page.arPath}`, en: `${site}${page.enPath}` },
  { loc: `${site}${page.enPath}`, ar: `${site}${page.arPath}`, en: `${site}${page.enPath}` },
]).concat(companySlugs.flatMap((slug) => [
  { loc: `${site}/${slug}/`, ar: `${site}/${slug}/`, en: `${site}/en/${slug}/` },
  { loc: `${site}/en/${slug}/`, ar: `${site}/${slug}/`, en: `${site}/en/${slug}/` },
])).concat(generatedServiceSlugs.flatMap((slug) => [
  { loc: `${site}/services/${slug}/`, ar: `${site}/services/${slug}/`, en: `${site}/en/services/${slug}/` },
  { loc: `${site}/en/services/${slug}/`, ar: `${site}/services/${slug}/`, en: `${site}/en/services/${slug}/` },
])).concat([{ loc: `${site}/industries/`, ar: `${site}/industries/`, en: `${site}/en/industries/` },
  { loc: `${site}/en/industries/`, ar: `${site}/industries/`, en: `${site}/en/industries/` }])
  .concat(SECTORS.flatMap((sector) => [
    { loc: `${site}/industries/${sector.slug}/`, ar: `${site}/industries/${sector.slug}/`, en: `${site}/en/industries/${sector.slug}/` },
    { loc: `${site}/en/industries/${sector.slug}/`, ar: `${site}/industries/${sector.slug}/`, en: `${site}/en/industries/${sector.slug}/` },
  ]));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries.map((entry) => `  <url>
    <loc>${entry.loc}</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="${entry.ar}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${entry.en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${entry.ar}"/>
    <lastmod>2026-08-11</lastmod>
  </url>`).join("\n")}
</urlset>
`;
writeFile("sitemap.xml", sitemap);
writeFile("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);

console.log(`Built SEO metadata and ${pages.length} English page variants.`);
