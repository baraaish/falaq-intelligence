// Shared page chrome for the static generators (services, sectors).
// Company and standards pages predate this and keep their own copy in
// build-company-pages.js.

const site = "https://falaqai.com";
const whatsapp = "962792961872";
const email = "hello@falaqai.com";

const chromeLabels = {
  ar: {
    dir: "rtl",
    home: "الرئيسية",
    services: "الخدمات",
    sectors: "القطاعات",
    agent: "تحدث للوكيل",
    trust: "الثقة والمعايير",
    about: "من نحن",
    contact: "تواصل معنا",
    language: "EN",
    company: "الشركة والمعايير",
    legal: "السياسات القانونية",
    footer: "نبني وكلاء ذكاء اصطناعي ينفذون العمل داخل عمليات الشركات بالعربية والإنجليزية.",
    rights: "فلق للذكاء الاصطناعي. جميع الحقوق محفوظة.",
    responsibleAi: "الذكاء الاصطناعي المسؤول",
    serviceStandards: "معايير الخدمة",
    sla: "اتفاقية مستوى الخدمة",
    privacy: "سياسة الخصوصية",
    terms: "الشروط والأحكام",
    skip: "تجاوز إلى المحتوى",
    mainNav: "التنقل الرئيسي",
    ctaTitle: "حدّد العملية التي تكلّفك أكثر من غيرها",
    ctaLead: "سنوضّح كيف ينفّذها وكيل فلق، ببداية محددة النطاق ومقاييس متفق عليها مسبقًا.",
    ctaWhatsapp: "تحدث معنا على واتساب",
    ctaEmail: "راسلنا بالبريد"
  },
  en: {
    dir: "ltr",
    home: "Home",
    services: "Services",
    sectors: "Sectors",
    agent: "Talk to the agent",
    trust: "Trust & standards",
    about: "About",
    contact: "Contact us",
    language: "العربية",
    company: "Company & standards",
    legal: "Legal policies",
    footer: "We build AI agents that perform real work inside business operations in Arabic and English.",
    rights: "Falaq Intelligence. All rights reserved.",
    responsibleAi: "Responsible AI",
    serviceStandards: "Service standards",
    sla: "Service level agreement",
    privacy: "Privacy policy",
    terms: "Terms",
    skip: "Skip to content",
    mainNav: "Main navigation",
    ctaTitle: "Identify the process that carries the highest cost",
    ctaLead: "We will demonstrate how a Falaq agent would carry it out, beginning with a scoped engagement and measures agreed in advance.",
    ctaWhatsapp: "Talk to us on WhatsApp",
    ctaEmail: "Send us an email"
  }
};

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function homeHref(language) {
  return language === "ar" ? "/" : "/en/";
}

function sectionRoute(section, language) {
  return language === "ar" ? `/${section}/` : `/en/${section}/`;
}

function itemRoute(section, slug, language) {
  return language === "ar" ? `/${section}/${slug}/` : `/en/${section}/${slug}/`;
}

function socialLinks() {
  return `<div class="social-links" aria-label="Social media"><a class="social-link" href="https://www.instagram.com/falaqai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg></a><a class="social-link" href="https://www.facebook.com/profile.php?id=61592175171348" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.7 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.7 1.8-1.7h1.9V2.5c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.3H6.8V13h3.1v9h3.8Z"/></svg></a><a class="social-link" href="https://www.linkedin.com/company/135187245/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 8.1H3.2V21h3.3V8.1ZM4.8 3A1.9 1.9 0 1 0 4.8 6.8 1.9 1.9 0 0 0 4.8 3ZM21 13.6c0-3.9-2.1-5.8-4.9-5.8-2.3 0-3.3 1.2-3.9 2.1V8.1H9V21h3.3v-6.4c0-1.7.3-3.4 2.5-3.4 2.2 0 2.2 2 2.2 3.5V21h3.3l.7-7.4Z"/></svg></a></div>`;
}

function ctaSection(language) {
  const l = chromeLabels[language];
  return `    <section class="service-cta"><div class="wrap"><h2>${esc(l.ctaTitle)}</h2><p>${esc(l.ctaLead)}</p><div class="cta-actions"><a class="nav-button primary" href="https://wa.me/${whatsapp}" target="_blank" rel="noopener noreferrer">${esc(l.ctaWhatsapp)}</a><a class="nav-button" href="mailto:${email}">${esc(l.ctaEmail)}</a></div></div></section>`;
}

function seoHead({ title, description, canonical, arPath, enPath, language, schema }) {
  return `  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
  <link rel="canonical" href="${site}${canonical}">
  <link rel="alternate" hreflang="ar" href="${site}${arPath}">
  <link rel="alternate" hreflang="en" href="${site}${enPath}">
  <link rel="alternate" hreflang="x-default" href="${site}${arPath}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Falaq Intelligence">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${site}${canonical}">
  <meta property="og:image" content="${site}/assets/falaq-social-card.jpg">
  <meta property="og:locale" content="${language === "ar" ? "ar_JO" : "en_US"}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${site}/assets/falaq-social-card.jpg">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

// `current` marks the active top-level nav item: "services" or "sectors".
function chrome({ language, head, body, current, languageHref }) {
  const l = chromeLabels[language];
  const home = homeHref(language);
  const switchHref = languageHref || (language === "ar" ? "/en/" : "/");
  const mark = (key) => (current === key ? ' aria-current="page"' : "");
  return `<!doctype html>
<html lang="${language}" dir="${l.dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
${head}
  <link rel="icon" href="/assets/falaq-symbol.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/company-pages.css">
  <link rel="stylesheet" href="/assets/service-pages.css">
  <link rel="stylesheet" href="/assets/flow-view.css">
  <link rel="stylesheet" href="/assets/agent-stage.css">
</head>
<body>
  <a class="skip-link" href="#main">${l.skip}</a>
  <nav class="site-nav" aria-label="${l.mainNav}">
    <div class="wrap nav-inner">
      <a class="brand" href="${home}" aria-label="Falaq Intelligence"><span class="brand-mark"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 3.5c1.9 10 6.7 14.8 16.5 16.7C30.7 22.1 25.9 26.9 24 37 22.1 26.9 17.3 22.1 7.5 20.2 17.3 18.3 22.1 13.5 24 3.5Z" fill="#4da3ff"/><path d="M10 40.5a17 17 0 0 0 28 0" fill="none" stroke="#4da3ff" stroke-width="3" stroke-linecap="round"/></svg></span><span>${language === "ar" ? "فلق للذكاء الاصطناعي" : "Falaq Intelligence"}</span></a>
      <div class="nav-links"><a href="${home}">${l.home}</a><a href="${sectionRoute("services", language)}"${mark("services")}>${l.services}</a><a href="${sectionRoute("industries", language)}"${mark("sectors")}>${l.sectors}</a><a href="${sectionRoute("agent", language)}"${mark("agent")}>${l.agent}</a><a href="${sectionRoute("trust", language)}">${l.trust}</a><a href="${sectionRoute("about", language)}">${l.about}</a></div>
      <div class="nav-actions"><a class="nav-button" href="${switchHref}" hreflang="${language === "ar" ? "en" : "ar"}">${l.language}</a><a class="nav-button primary" href="${language === "ar" ? "/#contact" : "/en/#contact"}">${l.contact}</a></div>
    </div>
  </nav>
  <main id="main">
${body}
  </main>
  <footer class="site-footer"><div class="wrap"><div class="footer-grid"><div><a class="brand" href="${home}">Falaq Intelligence</a><p class="footer-copy">${l.footer}</p>${socialLinks()}</div><div class="footer-col"><strong>${l.company}</strong><a href="${sectionRoute("about", language)}">${l.about}</a><a href="${sectionRoute("trust", language)}">${l.trust}</a><a href="${sectionRoute("responsible-ai", language)}">${l.responsibleAi}</a><a href="${sectionRoute("service-standards", language)}">${l.serviceStandards}</a><a href="${sectionRoute("sla", language)}">${l.sla}</a></div><div class="footer-col"><strong>${l.legal}</strong><a href="${sectionRoute("privacy", language)}">${l.privacy}</a><a href="${sectionRoute("terms", language)}">${l.terms}</a><a href="mailto:${email}">${email}</a></div></div><div class="copyright">© 2026 ${l.rights}</div></div></footer>
</body>
</html>`;
}

module.exports = {
  site, whatsapp, email, chromeLabels,
  esc, homeHref, sectionRoute, itemRoute, socialLinks, ctaSection, seoHead, chrome
};
