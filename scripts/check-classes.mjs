/**
 * Finds Tailwind classes that were written in the TSX files but produced NO css.
 * Tailwind silently ignores unknown classes (typos, missing theme tokens), so this
 * is the quickest way to catch a style that never made it to the page.
 *
 *   npm run build
 *   npm run check:classes          (add --list to only print the classes found)
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const CSS_DIR = ".next/static/css";
const listOnly = process.argv.includes("--list");

/** Markers that never produce css of their own (used only as `group-*` anchors). */
const MARKERS = /^group(\/[\w-]+)?$/;

/** Strings that look like classes but are not (icon names, CSS variable names, meta values). */
const iconNames = new Set(
  [...readFileSync("src/components/ui/Icon.tsx", "utf8").matchAll(/"([a-z-]+)":/g)].map(
    (m) => m[1],
  ),
);
const NOT_CLASSES = /^(--next-[\w-]+|device-width|about-label|dish-label|-)$/;

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (full.endsWith(".tsx")) files.push(full);
  }
  return files;
}

function classCandidates(source) {
  const withoutImports = source
    .replace(/^import[\s\S]*?from\s+["'][^"']+["'];?/gm, "")
    .replace(/^import\s+["'][^"']+["'];?/gm, "");

  const found = new Set();

  for (const match of withoutImports.matchAll(/"([^"\n]*)"|'([^'\n]*)'|`([^`]*)`/g)) {
    const text = match[1] ?? match[2] ?? match[3] ?? "";

    for (const token of text.split(/\s+/)) {
      if (!token) continue;
      if (/[${}*]/.test(token)) continue; // template pieces, wildcards in comments
      if (/^[/#(@.]/.test(token) || /^https?:/.test(token)) continue; // paths, urls, anchors
      if (/\.(png|jpe?g|svg|css|ts|tsx)\b/.test(token) && !token.includes("[")) continue;
      if (!/[-:[]/.test(token)) continue; // plain words (flex, grid...) are not checked
      if (token.includes("/") && !/(\d\/\d|^group|[:[])/.test(token)) continue; // mime types, paths
      if (MARKERS.test(token) || NOT_CLASSES.test(token) || iconNames.has(token)) continue;
      found.add(token);
    }
  }

  return found;
}

const sourceFiles = walk("src").filter((file) => !file.endsWith("Icon.tsx"));
const byFile = new Map(
  sourceFiles.map((file) => [file, classCandidates(readFileSync(file, "utf8"))]),
);

if (listOnly) {
  for (const [file, tokens] of byFile) console.log(`${file}\n  ${[...tokens].join("\n  ")}`);
  process.exit(0);
}

if (!existsSync(CSS_DIR)) {
  console.error("No built CSS found. Run `npm run build` first.");
  process.exit(1);
}

const css = readdirSync(CSS_DIR)
  .filter((name) => name.endsWith(".css"))
  .map((name) => readFileSync(join(CSS_DIR, name), "utf8"))
  .join("\n");

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Builds a regex matching the token as a CSS class selector, however it was escaped. */
function selectorFor(token) {
  let source = "";
  [...token].forEach((char, index) => {
    if (index === 0 && /\d/.test(char)) source += `\\\\3${char} ?`;
    else if (/[A-Za-z0-9_-]/.test(char)) source += char;
    else source += `\\\\${escapeRegExp(char)}`;
  });
  return new RegExp(`\\.${source}(?![A-Za-z0-9_-])`);
}

let checked = 0;
let missing = 0;

for (const [file, tokens] of byFile) {
  const lost = [...tokens].filter((token) => !selectorFor(token).test(css));
  checked += tokens.size;
  missing += lost.length;
  if (lost.length) console.log(`\n${file}\n  ${lost.join("\n  ")}`);
}

console.log(`\n${checked} classes checked, ${missing} without any CSS.`);
if (missing) {
  console.log("Each one above is either a typo or a theme token that does not exist.");
  process.exitCode = 1;
}
