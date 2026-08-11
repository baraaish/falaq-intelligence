const fs = require("node:fs");
const { SERVICES } = require("../content/services.js");
const { SECTORS } = require("../content/sectors.js");

const pages = [
  "",
  "en/",
  "services/",
  "en/services/",
  "industries/",
  "en/industries/",
];
SERVICES.forEach(({ slug }) => pages.push(`services/${slug}/`, `en/services/${slug}/`));

const companySlugs = [
  "about",
  "trust",
  "responsible-ai",
  "service-standards",
  "sla",
  "privacy",
  "terms",
  "how-we-work",
  "measuring-results",
  "technology",
];
companySlugs.forEach((slug) => pages.push(`${slug}/`, `en/${slug}/`));
SECTORS.forEach(({ slug }) => pages.push(`industries/${slug}/`, `en/industries/${slug}/`));

const required = [
  'rel="canonical"',
  'hreflang="ar"',
  'hreflang="en"',
  'hreflang="x-default"',
  'property="og:image"',
  'name="twitter:card"',
];
const titles = new Set();
const descriptions = new Set();
const errors = [];

pages.forEach((page) => {
  const file = `${page}index.html`;
  const html = fs.readFileSync(file, "utf8");
  const language = page.startsWith("en/") ? "en" : "ar";
  if (!html.includes(`<html lang="${language}"`)) errors.push(`Language mismatch in ${file}`);
  required.forEach((value) => {
    if (!html.includes(value)) errors.push(`Missing ${value} in ${file}`);
  });

  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!match) {
    errors.push(`Missing JSON-LD in ${file}`);
  } else {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      errors.push(`Invalid JSON-LD in ${file}: ${error.message}`);
    }
  }

  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)">/)?.[1];
  if (!title || title.length < 30 || title.length > 68) errors.push(`Invalid title length in ${file}: ${title?.length}`);
  if (!description || description.length < 80 || description.length > 170) errors.push(`Invalid description length in ${file}: ${description?.length}`);
  if (title && titles.has(`${language}:${title}`)) errors.push(`Duplicate title: ${title}`);
  if (description && descriptions.has(`${language}:${description}`)) errors.push(`Duplicate description: ${description}`);
  if (title) titles.add(`${language}:${title}`);
  if (description) descriptions.add(`${language}:${description}`);

  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
  const expected = `https://falaqai.com/${page}`;
  if (canonical !== expected) errors.push(`Canonical mismatch in ${file}: ${canonical}`);
});

const sitemap = fs.readFileSync("sitemap.xml", "utf8");
pages.forEach((page) => {
  if (!sitemap.includes(`<loc>https://falaqai.com/${page}</loc>`)) errors.push(`Missing sitemap URL: /${page}`);
});

if (errors.length) {
  throw new Error(`SEO validation failed:\n- ${errors.join("\n- ")}`);
}

console.log(`Validated metadata, JSON-LD, and sitemap entries for ${pages.length} pages.`);
