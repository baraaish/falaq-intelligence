const fs = require("node:fs");

const slugs = [
  "lead-qualification",
  "quote-follow-up",
  "booking-recovery",
  "customer-service",
  "accounts-receivable",
  "document-processing",
  "crm-control",
];
const pages = ["", "en/", "services/", "en/services/"];
slugs.forEach((slug) => pages.push(`services/${slug}/`, `en/services/${slug}/`));
const companySlugs = ["about", "trust", "responsible-ai", "service-standards", "sla", "privacy", "terms"];
companySlugs.forEach((slug) => pages.push(`${slug}/`, `en/${slug}/`));

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

pages.forEach((page) => {
  const file = `${page}index.html`;
  const html = fs.readFileSync(file, "utf8");
  const language = page.startsWith("en/") ? "en" : "ar";
  if (!html.includes(`<html lang="${language}"`)) throw new Error(`Language mismatch in ${file}`);
  required.forEach((value) => {
    if (!html.includes(value)) throw new Error(`Missing ${value} in ${file}`);
  });

  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!match) throw new Error(`Missing JSON-LD in ${file}`);
  JSON.parse(match[1]);

  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)">/)?.[1];
  if (!title || title.length < 30 || title.length > 68) throw new Error(`Invalid title length in ${file}: ${title?.length}`);
  if (!description || description.length < 80 || description.length > 170) throw new Error(`Invalid description length in ${file}: ${description?.length}`);
  if (titles.has(`${language}:${title}`)) throw new Error(`Duplicate title: ${title}`);
  if (descriptions.has(`${language}:${description}`)) throw new Error(`Duplicate description: ${description}`);
  titles.add(`${language}:${title}`);
  descriptions.add(`${language}:${description}`);

  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
  const expected = `https://falaqai.com/${page}`;
  if (canonical !== expected) throw new Error(`Canonical mismatch in ${file}: ${canonical}`);
});

const sitemap = fs.readFileSync("sitemap.xml", "utf8");
pages.forEach((page) => {
  if (!sitemap.includes(`<loc>https://falaqai.com/${page}</loc>`)) throw new Error(`Missing sitemap URL: /${page}`);
});

console.log(`Validated metadata, JSON-LD, and sitemap entries for ${pages.length} pages.`);
