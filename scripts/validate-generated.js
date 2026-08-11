const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const ignoredDirectories = new Set([".agents", ".claude", ".git", "node_modules"]);

function filesUnder(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesUnder(fullPath));
    else files.push(fullPath);
  }
  return files;
}

function isGenerated(file) {
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  return relative.endsWith(".html")
    || relative === "sitemap.xml"
    || relative === "robots.txt"
    || relative === "assets/generated/home-data.js";
}

function snapshot() {
  const result = new Map();
  for (const file of filesUnder(root).filter(isGenerated)) {
    const relative = path.relative(root, file).replaceAll(path.sep, "/");
    result.set(relative, crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex"));
  }
  return result;
}

const before = snapshot();
require("./build-company-pages.js");
require("./build-seo-pages.js");
require("./build-service-pages.js");
require("./build-sector-pages.js");
const after = snapshot();
const paths = new Set([...before.keys(), ...after.keys()]);
const changed = [...paths].filter((file) => before.get(file) !== after.get(file)).sort();

if (changed.length) {
  throw new Error(`Generated files were stale and have been rebuilt:\n- ${changed.join("\n- ")}\nReview them, then run the check again.`);
}

console.log(`Validated that ${after.size} generated files match their sources.`);
