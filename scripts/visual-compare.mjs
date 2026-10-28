/**
 * Compares the ORIGINAL html/css/js site with the new Next.js + Tailwind site,
 * pixel by pixel, at several screen widths, and reports the difference per section.
 *
 * Setup (once):   npx playwright install chromium
 * Every run:      npm run build && npm run start      (terminal 1: new site on :3000)
 *                 npm run compare                      (terminal 2)
 *
 * Environment variables (optional):
 *   ORIGINAL_DIR  folder that contains the original index.html   (default: the parent folder)
 *   NEW_URL       address of the new site                        (default: http://localhost:3000)
 *
 * Results are printed and saved in ./visual-report (original, new and diff images).
 * Animations are frozen at their final state in BOTH sites so only layout and style are compared.
 */
import http from "node:http";
import { createReadStream, existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import pixelmatch from "pixelmatch";
import pngjs from "pngjs";
import { chromium } from "playwright";

const { PNG } = pngjs;

const ORIGINAL_DIR = path.resolve(process.env.ORIGINAL_DIR ?? "..");
const NEW_URL = process.env.NEW_URL ?? "http://localhost:3000";
const ORIGINAL_PORT = 4010;
const ORIGINAL_URL = `http://localhost:${ORIGINAL_PORT}/`;
const WIDTHS = [375, 768, 1024, 1440];
const VIEWPORT_HEIGHT = 900;
const OUT_DIR = "visual-report";

/** Sections of the ORIGINAL page, used to say *where* a difference is. */
const SECTIONS = [
  [".hero", "hero"],
  [".service", "services"],
  [".about", "about"],
  [".special-dish", "special dish"],
  [".menu", "menu"],
  [".testi", "testimonial"],
  [".reservation", "reservation"],
  [".features", "features"],
  [".event", "events"],
  [".footer", "footer"],
];

/** Every animation jumps to its end state and transitions are removed. */
const FREEZE_CSS = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    animation-fill-mode: forwards !important;
    transition: none !important;
    scroll-behavior: auto !important;
    caret-color: transparent !important;
  }
`;

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

function serveOriginal() {
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url ?? "/", "http://local").pathname);
    const file = path.join(ORIGINAL_DIR, pathname === "/" ? "index.html" : pathname);

    if (!file.startsWith(ORIGINAL_DIR) || !existsSync(file) || statSync(file).isDirectory()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream",
    });
    createReadStream(file).pipe(res);
  });

  return new Promise((resolve) => server.listen(ORIGINAL_PORT, () => resolve(server)));
}

async function open(page, url, width) {
  await page.setViewportSize({ width, height: VIEWPORT_HEIGHT });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForFunction(() => document.body.classList.contains("loaded"));
  await page.addStyleTag({ content: FREEZE_CSS });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
}

/** Viewport screenshot at the top of the page (topbar, header, start of the hero). */
async function topShot(page, url, width) {
  await open(page, url, width);
  return page.screenshot();
}

/** Viewport screenshot with the mobile menu open (only below 1200px). */
async function menuShot(page, url, width) {
  await open(page, url, width);
  await page.click('button[aria-label="open menu"]');
  await page.waitForTimeout(300);
  return page.screenshot();
}

/** The whole page, with fixed elements hidden so they don't cover the sections. */
async function fullShot(page, url, width) {
  await open(page, url, width);

  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
    await Promise.all(
      [...document.images].map((img) =>
        img.complete ? null : new Promise((resolve) => (img.onload = img.onerror = resolve)),
      ),
    );
    for (const element of document.querySelectorAll("*")) {
      if (getComputedStyle(element).position === "fixed") element.style.visibility = "hidden";
    }
  });
  await page.waitForTimeout(400);

  const bands = await page.evaluate(
    (sections) =>
      sections.flatMap(([selector, label]) => {
        const element = document.querySelector(selector);
        if (!element) return [];
        const box = element.getBoundingClientRect();
        return [
          { label, top: Math.round(box.top + window.scrollY), height: Math.round(box.height) },
        ];
      }),
    SECTIONS,
  );

  const image = await page.screenshot({ fullPage: true });
  return { image, bands };
}

function padded(png, width, height) {
  const out = new PNG({ width, height });
  PNG.bitblt(png, out, 0, 0, png.width, png.height, 0, 0);
  return out;
}

function compare(originalBuffer, newBuffer, bands = []) {
  const original = PNG.sync.read(originalBuffer);
  const next = PNG.sync.read(newBuffer);
  const width = Math.max(original.width, next.width);
  const height = Math.max(original.height, next.height);
  const a = padded(original, width, height);
  const b = padded(next, width, height);
  const diff = new PNG({ width, height });

  const changed = pixelmatch(a.data, b.data, diff.data, width, height, { threshold: 0.1 });

  const perSection = bands.map(({ label, top, height: bandHeight }) => {
    let count = 0;
    const end = Math.min(top + bandHeight, height);
    for (let y = top; y < end; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        if (diff.data[i] === 255 && diff.data[i + 1] === 0 && diff.data[i + 2] === 0) count++;
      }
    }
    return { label, percent: (count / Math.max(1, width * (end - top))) * 100 };
  });

  return {
    percent: (changed / (width * height)) * 100,
    heights: [original.height, next.height],
    perSection,
    diff,
    original,
    next,
  };
}

function save(name, result) {
  writeFileSync(path.join(OUT_DIR, `${name}-original.png`), PNG.sync.write(result.original));
  writeFileSync(path.join(OUT_DIR, `${name}-new.png`), PNG.sync.write(result.next));
  writeFileSync(path.join(OUT_DIR, `${name}-diff.png`), PNG.sync.write(result.diff));
}

const flag = (percent) => (percent > 2 ? "  <-- CHECK" : percent > 0.5 ? "  (small)" : "");

async function main() {
  if (!existsSync(path.join(ORIGINAL_DIR, "index.html"))) {
    console.error(
      `Could not find index.html in ${ORIGINAL_DIR}. Set ORIGINAL_DIR to the original site folder.`,
    );
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });
  const server = await serveOriginal();
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    for (const width of WIDTHS) {
      console.log(`\n=== ${width}px wide ===`);

      const top = compare(
        await topShot(page, ORIGINAL_URL, width),
        await topShot(page, NEW_URL, width),
      );
      save(`${width}-top`, top);
      console.log(`top of page      ${top.percent.toFixed(2)}% different${flag(top.percent)}`);

      if (width < 1200) {
        const menu = compare(
          await menuShot(page, ORIGINAL_URL, width),
          await menuShot(page, NEW_URL, width),
        );
        save(`${width}-menu-open`, menu);
        console.log(`mobile menu open ${menu.percent.toFixed(2)}% different${flag(menu.percent)}`);
      }

      const original = await fullShot(page, ORIGINAL_URL, width);
      const next = await fullShot(page, NEW_URL, width);
      const full = compare(original.image, next.image, original.bands);
      save(`${width}-full`, full);

      console.log(`full page        ${full.percent.toFixed(2)}% different${flag(full.percent)}`);
      console.log(
        `page height      original ${full.heights[0]}px, new ${full.heights[1]}px${full.heights[0] === full.heights[1] ? "" : "  <-- CHECK"}`,
      );
      for (const { label, percent } of full.perSection) {
        console.log(`  ${label.padEnd(14)} ${percent.toFixed(2)}%${flag(percent)}`);
      }
    }

    console.log(
      `\nImages saved in ./${OUT_DIR}. Open the "-diff.png" files: red marks the differences.`,
    );
    console.log(
      "Reading the numbers: under 0.5% is normal font/antialiasing noise; over 2% deserves a look.",
    );
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((error) => {
  console.error(error.message);
  console.error(`Is the new site running at ${NEW_URL}? (npm run build && npm run start)`);
  process.exit(1);
});
