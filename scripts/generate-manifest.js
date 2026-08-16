#!/usr/bin/env node
// Scans the /images folder and writes /images/manifest.json — the list of
// photo filenames that index.html fetches at load time. Run this after
// adding or removing photos:
//
//   node scripts/generate-manifest.js
//
// (Or just push — .github/workflows/generate-manifest.yml runs this
// automatically and commits the updated manifest.)

const fs = require("fs");
const path = require("path");

const IMAGES_DIR = path.join(__dirname, "..", "images");
const MANIFEST_PATH = path.join(IMAGES_DIR, "manifest.json");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);

const files = fs
  .readdirSync(IMAGES_DIR)
  .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(files, null, 2) + "\n");

console.log(
  `Wrote ${files.length} photo(s) to ${path.relative(process.cwd(), MANIFEST_PATH)}`
);
