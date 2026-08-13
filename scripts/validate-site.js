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

function relative(file) {
  return path.relative(root, file).replaceAll(path.sep, "/");
}

function localTarget(sourceFile, rawValue) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(rawValue)) return null;

  const hashAt = rawValue.indexOf("#");
  const fragment = hashAt >= 0 ? rawValue.slice(hashAt + 1) : "";
  const beforeHash = hashAt >= 0 ? rawValue.slice(0, hashAt) : rawValue;
  const pathname = beforeHash.split("?", 1)[0];
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    return { error: `Invalid URL encoding: ${rawValue}` };
  }

  let target = decodedPath
    ? path.resolve(decodedPath.startsWith("/") ? root : path.dirname(sourceFile), decodedPath.replace(/^\/+/, ""))
    : sourceFile;
  if (target !== root && !target.startsWith(`${root}${path.sep}`)) {
    return { error: `Path escapes the site root: ${rawValue}` };
  }

  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, "index.html");
  if (!fs.existsSync(target) && !path.extname(target) && fs.existsSync(`${target}.html`)) target = `${target}.html`;
  return { target, fragment };
}

const allFiles = filesUnder(root);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
const cssFiles = allFiles.filter((file) => file.endsWith(".css"));
const errors = [];
const idCache = new Map();
let checkedReferences = 0;

function idsIn(file) {
  if (idCache.has(file)) return idCache.get(file);
  const html = fs.readFileSync(file, "utf8");
  const ids = new Set();
  for (const match of html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)) {
    if (ids.has(match[1])) errors.push(`${relative(file)} has duplicate id="${match[1]}"`);
    ids.add(match[1]);
  }
  idCache.set(file, ids);
  return ids;
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  idsIn(file);
  for (const match of html.matchAll(/\b(?:href|src)\s*=\s*["']([^"'<>]+)["']/gi)) {
    const rawValue = match[1].trim();
    const resolved = localTarget(file, rawValue);
    if (!resolved) continue;
    checkedReferences += 1;
    if (resolved.error) {
      errors.push(`${relative(file)}: ${resolved.error}`);
      continue;
    }
    if (!fs.existsSync(resolved.target)) {
      errors.push(`${relative(file)} references missing ${rawValue}`);
      continue;
    }
    if (resolved.fragment && resolved.target.endsWith(".html")) {
      let fragment = resolved.fragment;
      try {
        fragment = decodeURIComponent(fragment);
      } catch {
        errors.push(`${relative(file)} has invalid fragment encoding: ${rawValue}`);
        continue;
      }
      if (!idsIn(resolved.target).has(fragment)) {
        errors.push(`${relative(file)} references missing anchor ${rawValue}`);
      }
    }
  }
}

for (const file of cssFiles) {
  // Inline SVG data URIs contain their own url(#fragment) filter references.
  // Those are internal to the embedded document, not files on disk, so the
  // whole data URI is removed before the file references are collected.
  const css = fs.readFileSync(file, "utf8").replace(/url\(\s*["']?data:[^)]*\)/gi, "");
  for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) {
    const rawValue = match[1].trim();
    const resolved = localTarget(file, rawValue);
    if (!resolved) continue;
    checkedReferences += 1;
    if (resolved.error) errors.push(`${relative(file)}: ${resolved.error}`);
    else if (!fs.existsSync(resolved.target)) errors.push(`${relative(file)} references missing ${rawValue}`);
  }
}

if (errors.length) throw new Error(`Site validation failed:\n- ${errors.join("\n- ")}`);

console.log(`Validated ${htmlFiles.length} HTML pages and ${checkedReferences} local references.`);
