import { BLOG_ENABLED } from '../../../../data/blog';
import { COPY, LANGS } from '../../../../data/content';
import type { Lang } from '../../../../data/content';
import { BLOG_T } from '../../../../lib/blog-i18n';
import { getPost, getPosts } from '../../../../lib/posts';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_ENABLED ? LANGS.map((lang) => ({ lang })) : [];
}

const site = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const base = site ? `https://${site}` : 'http://localhost:3000';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// absolute URLs for images and links, so the HTML works inside a feed reader
const absolute = (html: string) => html.replace(/(src|href)="\/(?!\/)/g, `$1="${base}/`);

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!BLOG_ENABLED || !LANGS.includes(lang as Lang)) return new Response('Not found', { status: 404 });
  const l = lang as Lang;
  const t = BLOG_T[l];

  const posts = getPosts(l);
  const items = posts
    .map((meta) => {
      const post = getPost(l, meta.slug);
      const url = `${base}/blog/${l}/${meta.slug}`;
      return `    <item>
      <title>${esc(meta.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${meta.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(meta.summary)}</description>
${meta.tags.map((tag) => `      <category>${esc(tag)}</category>`).join('\n')}
      <content:encoded><![CDATA[${absolute(post?.html ?? '').replace(/]]>/g, ']]]]><![CDATA[>')}]]></content:encoded>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${esc(`${t.title} · ${COPY[l].name}`)}</title>
    <link>${base}/blog/${l}</link>
    <atom:link href="${base}/blog/${l}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${esc(t.desc)}</description>
    <language>${l === 'es' ? 'es-AR' : 'en-US'}</language>
${posts[0] ? `    <lastBuildDate>${new Date(`${posts[0].date}T12:00:00Z`).toUTCString()}</lastBuildDate>` : ''}
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
