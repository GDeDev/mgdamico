import type { MetadataRoute } from 'next';
import { BLOG_ENABLED } from '../data/blog';
import { LANGS } from '../data/content';
import { getPosts } from '../lib/posts';

const site = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const base = site ? `https://${site}` : 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: 'monthly', priority: 1 },
    ...LANGS.map((lang) => ({
      url: `${base}/cv/${lang}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: { languages: Object.fromEntries(LANGS.map((l) => [l, `${base}/cv/${l}`])) },
    })),
    ...(BLOG_ENABLED
      ? LANGS.flatMap((l) => [
          { url: `${base}/blog/${l}`, changeFrequency: 'weekly' as const, priority: 0.7 },
          ...getPosts(l).map((p) => ({ url: `${base}/blog/${l}/${p.slug}`, lastModified: p.date, priority: 0.6 })),
        ])
      : []),
  ];
}
