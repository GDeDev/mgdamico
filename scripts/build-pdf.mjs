// Generates public/Giuliano-DAmico-CV-<lang>.pdf by printing /cv/<lang> with headless Chrome/Edge.
// Usage: `npm run build && npm run pdf`. Without a baseUrl it starts the built site itself on a spare port;
// pass a baseUrl (e.g. http://localhost:3000) to print an already running site instead.
import { execFileSync, spawn } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const PORT = 3123;
const given = process.argv[2];
const base = given ?? `http://localhost:${PORT}`;
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

let server;
if (!given) {
  if (!existsSync('.next')) throw new Error('Falta el build: corré "npm run build" primero.');
  server = spawn(process.execPath, [resolve('node_modules/next/dist/bin/next'), 'start', '-p', String(PORT)], { stdio: 'ignore' });
  let up = false;
  for (let i = 0; i < 60 && !up; i++) {
    try { up = (await fetch(`${base}/cv/es`)).ok; } catch {}
    if (!up) await new Promise((r) => setTimeout(r, 500));
  }
  if (!up) { server.kill(); throw new Error('El servidor no levantó a tiempo.'); }
}

try {
  const out = resolve('public');
  mkdirSync(out, { recursive: true });
  for (const lang of ['es', 'en']) {
    const file = resolve(out, `Giuliano-DAmico-CV-${lang}.pdf`);
    execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${file}`, `${base}/cv/${lang}`], { stdio: 'inherit' });
    console.log('wrote', file);
  }
} finally {
  server?.kill();
}
