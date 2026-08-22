#!/usr/bin/env node
// Scans the /images and /music folders and writes manifest.json files
// listing their contents — index.html fetches these at load time. Run
// this after adding or removing photos or songs:
//
//   node scripts/generate-manifest.js
//
// (Or just push — .github/workflows/generate-manifest.yml runs this
// automatically and commits the updated manifests.)

const fs = require("fs");
const path = require("path");

function writeManifest(dir, extensions) {
  const manifestPath = path.join(dir, "manifest.json");
  const files = fs
    .readdirSync(dir)
    .filter((name) => extensions.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  fs.writeFileSync(manifestPath, JSON.stringify(files, null, 2) + "\n");

  console.log(
    `Wrote ${files.length} file(s) to ${path.relative(process.cwd(), manifestPath)}`
  );
}

writeManifest(
  path.join(__dirname, "..", "images"),
  new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"])
);

writeManifest(
  path.join(__dirname, "..", "music"),
  new Set([".mp3", ".m4a", ".ogg", ".wav"])
);
