import type { MetadataRoute } from 'next';

const site = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const base = site ? `https://${site}` : 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${base}/sitemap.xml`,
  };
}
