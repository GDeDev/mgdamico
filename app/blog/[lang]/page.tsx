import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteFooter from '../../../components/SiteFooter';
import SiteTop from '../../../components/SiteTop';
import { BLOG_ENABLED } from '../../../data/blog';
import { COPY, LANGS } from '../../../data/content';
import type { Lang } from '../../../data/content';
import { BLOG_T } from '../../../lib/blog-i18n';
import { formatDate, getPosts } from '../../../lib/posts';

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_ENABLED ? LANGS.map((lang) => ({ lang })) : [];
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!LANGS.includes(lang as Lang)) return {};
  const l = lang as Lang;
  return {
    title: `Blog · ${COPY[l].name}`,
    description: BLOG_T[l].desc,
    alternates: {
      canonical: `/blog/${l}`,
      languages: { es: '/blog/es', en: '/blog/en', 'x-default': '/blog/es' },
      types: { 'application/rss+xml': `/blog/${l}/feed.xml` },
    },
    openGraph: { locale: BLOG_T[l].locale },
  };
}

export default async function BlogIndex({ params }: Props) {
  const { lang } = await params;
  if (!BLOG_ENABLED || !LANGS.includes(lang as Lang)) notFound();
  const l = lang as Lang;
  const t = BLOG_T[l];
  const posts = getPosts(l);

  return (
    <div className="soft-page" lang={l}>
      <SiteTop lang={l} section="blog" langLinks={{ es: '/blog/es', en: '/blog/en' }} />
      <main className="soft-main">
        <section>
          <p className="soft-prompt">guest@mda ~ $ ls blog/</p>
          <h1>{t.title}</h1>
          <p className="soft-meta">{t.desc}</p>
        </section>

        <section>
          {posts.length === 0 && <p className="soft-meta">{t.none}</p>}
          {posts.map((p) => (
            <article className="soft-card" key={p.slug}>
              <div className="soft-card-top">
                <Link className="soft-post-link" href={`/blog/${l}/${p.slug}`}>
                  <strong>{p.title}</strong>
                </Link>
                <span>
                  <time dateTime={p.date}>{formatDate(p.date, l)}</time> · {p.minutes} {t.min}
                </span>
              </div>
              {p.summary && <p>{p.summary}</p>}
              {p.tags.length > 0 && <p className="soft-tags">{p.tags.map((tag) => `#${tag}`).join(' ')}</p>}
            </article>
          ))}
        </section>
      </main>
      <SiteFooter lang={l} />
    </div>
  );
}
