import Image from 'next/image';
import { COPY, EMAIL, GITHUB } from '../data/content';
import type { Lang } from '../data/content';
import SiteFooter from './SiteFooter';
import HtmlLang from './HtmlLang';
import SiteTop from './SiteTop';

const LABELS = {
  es: {
    sections: ['Sobre mí', 'Experiencia', 'Proyectos', 'Stack', 'Formación', 'Contacto'],
  },
  en: {
    sections: ['About', 'Experience', 'Projects', 'Stack', 'Education', 'Contact'],
  },
};

function Facts({ items }: { items: [string, string][] }) {
  return (
    <dl className="soft-facts">
      {items.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function CvDocument({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const t = LABELS[lang];

  return (
    <div className="soft-page" lang={lang}>
      <HtmlLang lang={lang} />
      <SiteTop lang={lang} section="cv" />

      <main className="soft-main">
        <section className="soft-hero">
          <Image className="soft-photo" src="/photo.jpg" alt={c.name} width={120} height={150} preload />
          <div>
            <h1>{c.name}</h1>
            <p className="soft-role">{c.role}</p>
            <p className="soft-meta">
              {c.location} · <a href={`mailto:${EMAIL}`}>{EMAIL}</a> ·{' '}
              <a href={GITHUB} target="_blank" rel="noopener noreferrer">github.com/GDeDev</a>
            </p>
          </div>
        </section>

        <section>
          <h2>{t.sections[0]}</h2>
          <p>{c.about[0]}</p>
          <p>{c.about[1]}</p>
        </section>

        <section>
          <h2>{t.sections[1]}</h2>
          {c.jobs.map((j) => (
            <article className="soft-card" key={j.org}>
              <div className="soft-card-top">
                <strong>{j.role}</strong>
                <span>{j.when}</span>
              </div>
              <div className="soft-org">{j.org}</div>
              <p>{j.summary}</p>
              {j.bullets.length > 0 && (
                <ul>
                  {j.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </section>

        <section>
          <h2>{t.sections[2]}</h2>
          {c.projects.map((p) => (
            <article className="soft-card" key={p.name}>
              <strong>{p.name}</strong>
              <p>{p.text}</p>
              {p.points && (
                <ul>
                  {p.points.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              )}
              <div className="soft-org">{p.tags}</div>
            </article>
          ))}
        </section>

        <section>
          <h2>{t.sections[3]}</h2>
          <Facts items={c.stack} />
        </section>

        <section>
          <h2>{t.sections[4]}</h2>
          <Facts items={c.learning} />
        </section>

        <section className="no-print">
          <h2>{t.sections[5]}</h2>
          <p>{c.contactIntro}</p>
          <div className="soft-actions">
            <a className="soft-btn" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a className="soft-btn alt" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}
