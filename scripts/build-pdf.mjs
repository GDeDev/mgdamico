// Generates public/Giuliano-DAmico-CV-<lang>.pdf by printing /cv/<lang> with headless Chrome/Edge.
// Usage: start the site (npm run build && npm start), then `node scripts/build-pdf.mjs [baseUrl]`.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const base = process.argv[2] ?? 'http://localhost:3000';
const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) throw new Error('No Chrome/Edge found. Set CHROME_PATH.');

const out = resolve('public');
mkdirSync(out, { recursive: true });
for (const lang of ['es', 'en']) {
  const file = resolve(out, `Giuliano-DAmico-CV-${lang}.pdf`);
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${file}`, `${base}/cv/${lang}`], { stdio: 'inherit' });
  console.log('wrote', file);
}
