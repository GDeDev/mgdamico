import { BLOG_ENABLED } from '../../../../data/blog';
import { COPY, LANGS } from '../../../../data/content';
import type { Lang } from '../../../../data/content';
import { getPost, getPosts } from '../../../../lib/posts';
import { OG_SIZE, ogCard } from '../../../../lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return BLOG_ENABLED ? LANGS.flatMap((lang) => getPosts(lang).map((p) => ({ lang, slug: p.slug }))) : [];
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const l = (LANGS.includes(lang as Lang) ? lang : 'es') as Lang;
  const post = getPost(l, slug);
  return ogCard({
    prompt: `> cat blog/${slug}.${l}.md`,
    title: post?.title ?? COPY[l].name,
    subtitle: COPY[l].name,
  });
}
