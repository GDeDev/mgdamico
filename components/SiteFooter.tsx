import Link from 'next/link';
import { BLOG_ENABLED } from '../data/blog';
import { COPY, EMAIL, GITHUB } from '../data/content';
import type { Lang } from '../data/content';
import ScrollTop from './ScrollTop';

const T = {
  es: { made: 'Hecho con Next.js · sin cookies ni trackers', exit: 'gracias por pasar' },
  en: { made: 'Built with Next.js · no cookies, no trackers', exit: 'thanks for stopping by' },
};

export default function SiteFooter({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const t = T[lang];

  return (
    <footer className="site-foot no-print">
      <div className="site-foot-in">
        <div>
          <strong>{c.name}</strong>
          <p>
            {c.role} · {c.location}{' '}
            <span className="stars">
              {[1978, 1986, 2022].map((y) => {
                const label = lang === 'es' ? `Campeón del mundo ${y}` : `World Cup champion ${y}`;
                return (
                  <span key={y} role="img" aria-label={label} data-tip={label} tabIndex={0}>
                    ⭐
                  </span>
                );
              })}
            </span>
          </p>
        </div>
        <nav aria-label={lang === 'es' ? 'Enlaces' : 'Links'}>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
          <Link href={`/cv/${lang}`}>CV</Link>
          {BLOG_ENABLED && <Link href={`/blog/${lang}`}>Blog</Link>}
          {BLOG_ENABLED && <a href={`/blog/${lang}/feed.xml`}>RSS</a>}
        </nav>
        <p className="soft-prompt">
          guest@mda ~ $ exit <span aria-hidden="true">·</span> {t.exit} <span aria-hidden="true">·</span> © {new Date().getFullYear()} · {t.made}
        </p>
      </div>
      <ScrollTop label={lang === 'es' ? 'Volver arriba' : 'Back to top'} />
    </footer>
  );
}
