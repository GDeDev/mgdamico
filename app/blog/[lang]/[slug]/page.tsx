import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GiscusComments, { GISCUS_READY } from '../../../../components/GiscusComments';
import PostReactions from '../../../../components/PostReactions';
import SiteFooter from '../../../../components/SiteFooter';
import SiteTop from '../../../../components/SiteTop';
import { BLOG_ENABLED } from '../../../../data/blog';
import { COPY, GITHUB, LANGS } from '../../../../data/content';
import type { Lang } from '../../../../data/content';
import { BLOG_T } from '../../../../lib/blog-i18n';
import { formatDate, getPost, getPosts, getTranslations } from '../../../../lib/posts';

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_ENABLED ? LANGS.flatMap((lang) => getPosts(lang).map((p) => ({ lang, slug: p.slug }))) : [];
}

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = BLOG_ENABLED && LANGS.includes(lang as Lang) ? getPost(lang as Lang, slug) : null;
  if (!post) return {};
  const l = post.lang;
  const tr = getTranslations(slug);
  return {
    title: `${post.title} · ${COPY[l].name}`,
    description: post.summary,
    alternates: {
      canonical: `/blog/${l}/${slug}`,
      languages: Object.fromEntries(tr.map((x) => [x, `/blog/${x}/${slug}`])),
    },
    openGraph: { type: 'article', title: post.title, description: post.summary, publishedTime: post.date, locale: BLOG_T[l].locale },
  };
}

export default async function BlogPost({ params }: Props) {
  const { lang, slug } = await params;
  if (!LANGS.includes(lang as Lang)) notFound();
  const l = lang as Lang;
  const post = BLOG_ENABLED ? getPost(l, slug) : null;
  if (!post) notFound();
  const t = BLOG_T[l];

  // posts are sorted newest first
  const all = getPosts(l);
  const i = all.findIndex((p) => p.slug === post.slug);
  const newer = i > 0 ? all[i - 1] : null;
  const older = i < all.length - 1 ? all[i + 1] : null;

  // the language switch lands on the translation if it exists, otherwise on that language's blog index
  const tr = getTranslations(slug);
  const langLinks = {
    es: tr.includes('es') ? `/blog/es/${slug}` : '/blog/es',
    en: tr.includes('en') ? `/blog/en/${slug}` : '/blog/en',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    inLanguage: l,
    author: { '@type': 'Person', name: COPY[l].name, sameAs: [GITHUB] },
  };

  return (
    <div className="soft-page" lang={l}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <SiteTop lang={l} section="blog" langLinks={langLinks} />
      <main className="soft-main">
        <article>
          <p className="soft-prompt">guest@mda ~ $ cat blog/{post.slug}.{l}.md</p>
          <h1>{post.title}</h1>
          <p className="soft-meta">
            <time dateTime={post.date}>{formatDate(post.date, l)}</time> · {post.minutes} {t.minRead}
            {post.tags.length > 0 && <> · {post.tags.map((tag) => `#${tag}`).join(' ')}</>}
          </p>
          <div className="soft-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
        {(newer || older) && (
          <nav className="post-nav" aria-label={t.more}>
            {older && (
              <Link href={`/blog/${l}/${older.slug}`}>
                <span>{t.prev}</span>
                {older.title}
              </Link>
            )}
            {newer && (
              <Link className="next" href={`/blog/${l}/${newer.slug}`}>
                <span>{t.next}</span>
                {newer.title}
              </Link>
            )}
          </nav>
        )}
        {GISCUS_READY ? <GiscusComments slug={post.slug} lang={l} /> : <PostReactions slug={post.slug} title={post.title} lang={l} />}
      </main>
      <SiteFooter lang={l} />
    </div>
  );
}
