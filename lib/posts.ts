// server only: uses node:fs at build time
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { marked } from 'marked';
import { LANGS } from '../data/content';
import type { Lang } from '../data/content';

const DIR = join(process.cwd(), 'content', 'blog');

// Posts live in content/blog/<slug>.<lang>.md (e.g. mi-nota.es.md, mi-nota.en.md).
// A post can exist in one language or both; same slug = same post.
export interface PostMeta {
  slug: string;
  lang: Lang;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
  minutes: number;
}

export interface Post extends PostMeta {
  html: string;
}

// minimal frontmatter: `key: value` lines between two `---`
function parse(file: string) {
  const m0 = file.match(/^(.+)\.(es|en)\.md$/);
  if (!m0) throw new Error(`${file}: el nombre debe ser <slug>.es.md o <slug>.en.md`);
  const raw = readFileSync(join(DIR, file), 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: falta el frontmatter (--- ... ---)`);
  const data: Record<string, string> = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  if (!data.title || !/^\d{4}-\d{2}-\d{2}$/.test(data.date ?? '')) {
    throw new Error(`${file}: title y date (YYYY-MM-DD) son obligatorios`);
  }
  const body = m[2];
  const meta: PostMeta = {
    slug: m0[1],
    lang: m0[2] as Lang,
    title: data.title,
    date: data.date,
    summary: data.summary ?? '',
    tags: (data.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean),
    minutes: Math.max(1, Math.round(body.split(/\s+/).length / 200)),
  };
  return { meta, body, draft: data.draft === 'true' };
}

function files() {
  return readdirSync(DIR).filter((f) => f.endsWith('.md'));
}

function all() {
  return files()
    .map(parse)
    .filter((p) => !p.draft);
}

export function getPosts(lang: Lang): PostMeta[] {
  return all()
    .map((p) => p.meta)
    .filter((p) => p.lang === lang)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(lang: Lang, slug: string): Post | null {
  const p = all().find((x) => x.meta.lang === lang && x.meta.slug === slug);
  if (!p) return null;
  // the content is mine and rendered at build time, so raw HTML in the Markdown is trusted
  const html = (marked.parse(p.body, { async: false }) as string).replace(/<img /g, '<img loading="lazy" decoding="async" ');
  return { ...p.meta, html };
}

/** Languages in which a post exists (to link a note to its translation). */
export function getTranslations(slug: string): Lang[] {
  return LANGS.filter((l) => all().some((p) => p.meta.slug === slug && p.meta.lang === l));
}

export function formatDate(date: string, lang: Lang = 'es') {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(lang === 'es' ? 'es-AR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
