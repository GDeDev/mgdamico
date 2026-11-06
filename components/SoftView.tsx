'use client';

import Image from 'next/image';
import { COPY, EMAIL, GITHUB } from '../data/content';
import type { Lang } from '../data/content';

const LABELS = {
  es: { console: 'Ir a la consola', sections: ['Sobre mí', 'Experiencia', 'Stack', 'Formación', 'Contacto'] },
  en: { console: 'Open console', sections: ['About', 'Experience', 'Stack', 'Learning', 'Contact'] },
};

export default function SoftView({
  lang,
  setLang,
  onConsole,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  onConsole: () => void;
}) {
  const c = COPY[lang];
  const t = LABELS[lang];

  return (
    <div className="soft-page">
      <header className="soft-top">
        <div className="soft-toggle">
          <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
          <button className={lang === 'es' ? 'on' : ''} onClick={() => setLang('es')}>ES</button>
        </div>
        <button className="soft-link" onClick={onConsole}>{'>_ ' + t.console}</button>
      </header>

      <main className="soft-main">
        <section className="soft-hero">
          <Image className="soft-photo" src="/photo.jpg" alt="Marco Giuliano D'Amico" width={120} height={150} priority />
          <div>
            <h1>{c.name}</h1>
            <p className="soft-role">{c.role}</p>
            <p>{c.about[0]}</p>
          </div>
        </section>

        <section>
          <h2>{t.sections[0]}</h2>
          <p>{c.about[1]}</p>
          <dl className="soft-facts">
            {c.facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2>{t.sections[1]}</h2>
          {c.exp.map(([role, org, when, text]) => (
            <article className="soft-card" key={role + org}>
              <div className="soft-card-top">
                <strong>{role}</strong>
                <span>{when}</span>
              </div>
              <div className="soft-org">{org}</div>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section>
          <h2>{t.sections[2]}</h2>
          <dl className="soft-facts">
            {c.stack.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2>{t.sections[3]}</h2>
          <dl className="soft-facts">
            {c.learning.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2>{t.sections[4]}</h2>
          <p>{c.contactIntro}</p>
          <div className="soft-actions">
            <a className="soft-btn" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a className="soft-btn alt" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </section>
      </main>
    </div>
  );
}
