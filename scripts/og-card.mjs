// Renders public/og.jpg (1200×630 social card) from content/profile.json.
// Uses the installed Google Chrome via playwright-core; set CHROME_PATH to use another Chromium.
// Run with: npm run og
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const root = resolve(import.meta.dirname, '..');
const profile = JSON.parse(await readFile(join(root, 'content/profile.json'), 'utf8'));
const fileUrl = (p) => pathToFileURL(join(root, p)).href;

const escape = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: 'Archivo'; font-weight: 100 900; font-stretch: 62% 125%;
  src: url('${fileUrl('node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2')}') format('woff2'); }
@font-face { font-family: 'Instrument Serif'; font-style: italic;
  src: url('${fileUrl('node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2')}') format('woff2'); }
@font-face { font-family: 'JetBrains Mono';
  src: url('${fileUrl('node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2')}') format('woff2'); }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; background: #ECECEE; color: #121417; font-family: 'Archivo', sans-serif;
  display: grid; grid-template-columns: 1fr 504px; overflow: hidden; }
.text { padding: 64px 56px 56px 72px; display: flex; flex-direction: column; justify-content: space-between; }
.mono { font-family: 'JetBrains Mono', monospace; font-size: 18px; letter-spacing: 0.04em; text-transform: uppercase; color: #4A4E55; }
.kicker { display: flex; align-items: center; gap: 12px; }
.dot { width: 10px; height: 10px; border-radius: 50%; background: #2342D6; }
h1 { line-height: 0.86; letter-spacing: -0.03em; }
.first { display: block; font-weight: 900; font-stretch: 125%; font-size: 128px; }
.last { display: block; font-family: 'Instrument Serif', serif; font-style: italic; font-weight: 400; font-size: 136px; letter-spacing: -0.02em; color: #2342D6; }
.foot { display: flex; align-items: center; gap: 16px; text-transform: none; color: #121417; }
.mark { width: 48px; height: 48px; border-radius: 50%; background: #121417; color: #ECECEE; display: flex;
  align-items: center; justify-content: center; font-family: 'Archivo'; font-weight: 800; font-stretch: 112%; font-size: 17px; letter-spacing: 0.02em; }
img { width: 504px; height: 630px; object-fit: cover; object-position: 50% 30%; display: block; }
</style></head><body>
<div class="text">
  <p class="mono kicker"><span class="dot"></span>${escape(profile.title)} · ${escape(profile.location)}</p>
  <h1><span class="first">${escape(profile.name.first.toUpperCase())}</span><span class="last">${escape(profile.name.last)}</span></h1>
  <p class="mono foot"><span class="mark">${escape(profile.name.first[0] + profile.name.last[0])}</span>${escape(profile.email)}</p>
</div>
<img src="${fileUrl(profile.portrait)}" alt="">
</body></html>`;

const dir = await mkdtemp(join(tmpdir(), 'og-card-'));
const cardPath = join(dir, 'card.html');
await writeFile(cardPath, html);

const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' },
);
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(pathToFileURL(cardPath).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const out = join(root, 'public/og.jpg');
  await page.screenshot({ path: out, type: 'jpeg', quality: 86 });
  console.log(`Wrote ${out}`);
} finally {
  await browser.close();
  await rm(dir, { recursive: true, force: true });
}
