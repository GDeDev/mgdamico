'use client';

import { useEffect } from 'react';
import type { Lang } from '../data/content';

const COPY = {
  es: { question: '¿Cómo querés conocerme?', console: 'Consola', cv: 'CV', loading: 'Cargando' },
  en: { question: 'How would you like to get to know me?', console: 'Console', cv: 'Résumé', loading: 'Loading' },
};

export function Gate({
  lang,
  setLang,
  onConsole,
  onCv,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  onConsole: () => void;
  onCv: () => void;
}) {
  const t = COPY[lang];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (k === '1' || k === 'c') onConsole();
      else if (k === '2' || k === 'v' || k === 'r') onCv();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onConsole, onCv]);

  return (
    <div className="gate">
      <div className="gate-lang">
        <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
        <button className={lang === 'es' ? 'on' : ''} onClick={() => setLang('es')}>ES</button>
      </div>
      <h1>{t.question}</h1>
      <div className="gate-opts">
        <button onClick={onConsole}>
          {t.console}
          <span className="us" aria-hidden="true">_</span>
        </button>
        <button onClick={onCv}>{t.cv}</button>
      </div>
    </div>
  );
}

export function CvLoader({ lang, onDone }: { lang: Lang; onDone: () => void }) {
  useEffect(() => {
    const id = setTimeout(onDone, 1400);
    return () => clearTimeout(id);
  }, [onDone]);

  return (
    <div className="gate cv-loader" role="status">
      <div className="cv-bar"><i /></div>
      <span>{COPY[lang].loading}</span>
    </div>
  );
}
