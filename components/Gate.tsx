'use client';

import { useEffect } from 'react';
import { COPY as PROFILE } from '../data/content';
import type { Lang } from '../data/content';

const COPY = {
  es: { question: '¿Cómo querés conocerme?', console: 'Consola', cv: 'CV' },
  en: { question: 'How would you like to get to know me?', console: 'Console', cv: 'Résumé' },
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
        <button className={lang === 'en' ? 'on' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        <button className={lang === 'es' ? 'on' : ''} aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
      </div>
      <h1>{PROFILE[lang].name}</h1>
      <p className="gate-role">{PROFILE[lang].role}</p>
      <p className="gate-question">{t.question}</p>
      <div className="gate-opts">
        <button onClick={onConsole} aria-keyshortcuts="1 C">
          {t.console}
          <span className="us" aria-hidden="true">_</span>
        </button>
        <button onClick={onCv} aria-keyshortcuts="2 V R">{t.cv}</button>
      </div>
    </div>
  );
}
