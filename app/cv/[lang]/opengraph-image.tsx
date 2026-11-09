import { COPY, LANGS } from '../../../data/content';
import type { Lang } from '../../../data/content';
import { OG_SIZE, ogCard } from '../../../lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const c = COPY[(lang as Lang) in COPY ? (lang as Lang) : 'es'];
  return ogCard({
    prompt: lang === 'en' ? '> cat resume.md' : '> cat cv.md',
    title: c.name,
    subtitle: c.role,
    footer: 'TypeScript · NestJS · Next.js · AWS · Fintech',
  });
}
