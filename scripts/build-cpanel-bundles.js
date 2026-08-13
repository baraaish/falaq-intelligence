"use strict";

const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");

const projectRoot = path.resolve(__dirname, "..");
const outputRoot = path.join(projectRoot, "deploy-package");

const publicFiles = ["index.html", "robots.txt", "sitemap.xml"];
const publicDirectories = [
  "about",
  "ar",
  "assets",
  "contact",
  "en",
  "how-we-work",
  "industries",
  "measuring-results",
  "privacy",
  "responsible-ai",
  "service-standards",
  "services",
  "sla",
  "technology",
  "terms",
  "thank-you",
  "trust"
];

const apiFiles = [
  "package.json",
  "package-lock.json",
  "backend/capabilities.json",
  "backend/email.js",
  "backend/pdf-lite.js",
  "backend/pdf.js",
  "backend/proposal.js",
  "backend/providers.js",
  "backend/questions.json",
  "backend/rate-limit.js",
  "backend/server.js",
  "backend/fonts/NotoSansArabic.ttf",
  "backend/fonts/OFL.txt"
];
const optionalApiFiles = ["app.js"];

const forbiddenSegments = new Set([
  ".git",
  ".github",
  ".agents",
  ".claude",
  "node_modules",
  "docs",
  "prototypes",
  "content",
  "scripts",
  "tmp"
]);
const forbiddenFileNames = new Set([
  ".cpanel.yml",
  ".dockerignore",
  "CNAME",
  "Dockerfile",
  "render.yaml",
  "DEPLOY_RENDER.md"
]);

function normalize(relativePath) {
  return relativePath.split(path.sep).join("/");
}

function assertSafeRelative(relativePath) {
  const normalized = normalize(relativePath);
  const segments = normalized.split("/");
  if (!normalized || normalized.startsWith("/") || segments.includes("..")) {
    throw new Error(`Unsafe bundle path: ${relativePath}`);
  }
  if (segments.some((segment) => forbiddenSegments.has(segment))) {
    throw new Error(`Forbidden directory in bundle: ${normalized}`);
  }
  if (normalized === "backend/data" || normalized.startsWith("backend/data/")) {
    throw new Error(`Runtime lead data must never enter a bundle: ${normalized}`);
  }
  if (segments.some((segment) => /^\.env(?:\.|$)/i.test(segment))) {
    throw new Error(`Environment file must never enter a bundle: ${normalized}`);
  }
  if (forbiddenFileNames.has(segments.at(-1))) {
    throw new Error(`Hosting artifact must never enter a bundle: ${normalized}`);
  }
  return normalized;
}

function sourceFile(relativePath) {
  const safePath = assertSafeRelative(relativePath);
  const absolutePath = path.join(projectRoot, ...safePath.split("/"));
  const stats = fs.lstatSync(absolutePath);
  if (!stats.isFile() || stats.isSymbolicLink()) {
    throw new Error(`Expected a regular source file: ${safePath}`);
  }
  return { source: absolutePath, relative: safePath, stats };
}

function collectDirectory(relativeDirectory) {
  const safeDirectory = assertSafeRelative(relativeDirectory);
  const absoluteDirectory = path.join(projectRoot, ...safeDirectory.split("/"));
  const directoryStats = fs.lstatSync(absoluteDirectory);
  if (!directoryStats.isDirectory() || directoryStats.isSymbolicLink()) {
    throw new Error(`Expected a regular source directory: ${safeDirectory}`);
  }

  const results = [];
  const walk = (currentDirectory, currentRelative) => {
    const entries = fs.readdirSync(currentDirectory, { withFileTypes: true })
      .sort((left, right) => left.name.localeCompare(right.name, "en"));
    for (const entry of entries) {
      const relative = assertSafeRelative(`${currentRelative}/${entry.name}`);
      const absolute = path.join(currentDirectory, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Symlinks are not allowed in bundles: ${relative}`);
      if (entry.isDirectory()) walk(absolute, relative);
      else if (entry.isFile()) results.push(sourceFile(relative));
      else throw new Error(`Unsupported filesystem entry: ${relative}`);
    }
  };
  walk(absoluteDirectory, safeDirectory);
  return results;
}

function uniqueSorted(files) {
  const byRelativePath = new Map();
  for (const file of files) {
    if (byRelativePath.has(file.relative)) throw new Error(`Duplicate bundle entry: ${file.relative}`);
    byRelativePath.set(file.relative, file);
  }
  return [...byRelativePath.values()].sort((left, right) => left.relative.localeCompare(right.relative, "en"));
}

function copyBundle(files, destination) {
  fs.rmSync(destination, { recursive: true, force: true });
  fs.mkdirSync(destination, { recursive: true });
  for (const file of files) {
    const output = path.join(destination, ...file.relative.split("/"));
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.copyFileSync(file.source, output, fs.constants.COPYFILE_EXCL);
  }
}

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) value = (value & 1) ? (0xedb88320 ^ (value >>> 1)) : (value >>> 1);
  return value >>> 0;
});

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date) {
  const year = Math.max(1980, date.getFullYear());
  const time = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const day = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { time, day };
}

function createZip(files, outputPath) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const file of files) {
    const name = Buffer.from(file.relative, "utf8");
    const input = fs.readFileSync(file.source);
    const compressed = zlib.deflateRawSync(input, { level: zlib.constants.Z_BEST_COMPRESSION });
    const checksum = crc32(input);
    const { time, day } = dosDateTime(file.stats.mtime);

    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0x0800, 6);
    localHeader.writeUInt16LE(8, 8);
    localHeader.writeUInt16LE(time, 10);
    localHeader.writeUInt16LE(day, 12);
    localHeader.writeUInt32LE(checksum, 14);
    localHeader.writeUInt32LE(compressed.length, 18);
    localHeader.writeUInt32LE(input.length, 22);
    localHeader.writeUInt16LE(name.length, 26);
    localHeader.writeUInt16LE(0, 28);
    localParts.push(localHeader, name, compressed);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(0x0314, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0x0800, 8);
    centralHeader.writeUInt16LE(8, 10);
    centralHeader.writeUInt16LE(time, 12);
    centralHeader.writeUInt16LE(day, 14);
    centralHeader.writeUInt32LE(checksum, 16);
    centralHeader.writeUInt32LE(compressed.length, 20);
    centralHeader.writeUInt32LE(input.length, 24);
    centralHeader.writeUInt16LE(name.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);
    centralParts.push(centralHeader, name);

    offset += localHeader.length + name.length + compressed.length;
  }

  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralDirectory.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);

  fs.writeFileSync(outputPath, Buffer.concat([...localParts, centralDirectory, end]));
}

function describe(files, directory, zipPath) {
  const bytes = files.reduce((sum, file) => sum + file.stats.size, 0);
  return {
    directory: path.relative(projectRoot, directory),
    zip: path.relative(projectRoot, zipPath),
    files: files.length,
    uncompressedBytes: bytes,
    zipBytes: fs.statSync(zipPath).size
  };
}

function build() {
  fs.mkdirSync(outputRoot, { recursive: true });

  const publicBundle = uniqueSorted([
    ...publicFiles.map(sourceFile),
    ...publicDirectories.flatMap(collectDirectory)
  ]);
  const apiBundle = uniqueSorted([
    ...apiFiles.map(sourceFile),
    ...optionalApiFiles
      .filter((relativePath) => fs.existsSync(path.join(projectRoot, relativePath)))
      .map(sourceFile)
  ]);

  const publicDirectory = path.join(outputRoot, "cpanel-public_html");
  const apiDirectory = path.join(outputRoot, "cpanel-api-app");
  const publicZip = path.join(outputRoot, "falaqai-public_html.zip");
  const apiZip = path.join(outputRoot, "falaqai-api-app.zip");

  copyBundle(publicBundle, publicDirectory);
  copyBundle(apiBundle, apiDirectory);
  createZip(publicBundle, publicZip);
  createZip(apiBundle, apiZip);

  const report = {
    generatedAt: new Date().toISOString(),
    publicHtml: describe(publicBundle, publicDirectory, publicZip),
    apiApp: describe(apiBundle, apiDirectory, apiZip)
  };
  fs.writeFileSync(path.join(outputRoot, "cpanel-bundles-report.json"), `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

build();
