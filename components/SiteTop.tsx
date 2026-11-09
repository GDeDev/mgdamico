import Link from 'next/link';
import { BLOG_ENABLED } from '../data/blog';
import { cvPdf } from '../data/content';
import type { Lang } from '../data/content';

import ThemeToggle from './ThemeToggle';

const T = {
  es: { console: 'Ir a la consola', pdf: 'Descargar CV', theme: { light: 'Cambiar a modo claro', dark: 'Cambiar a modo oscuro' } },
  en: { console: 'Open console', pdf: 'Download CV', theme: { light: 'Switch to light mode', dark: 'Switch to dark mode' } },
};

// one header for every "document" page (CV and blog), so moving between them doesn't shift anything
export default function SiteTop({
  lang,
  section,
  langLinks = { es: '/cv/es', en: '/cv/en' },
}: {
  lang: Lang;
  section: 'cv' | 'blog';
  langLinks?: Record<Lang, string>;
}) {
  const t = T[lang];
  const tab = (href: string, label: string, on: boolean) => (
    <Link href={href} className={on ? 'on' : ''} aria-current={on ? 'page' : undefined}>
      {label}
    </Link>
  );

  return (
    <header className="soft-top no-print">
      <div className="soft-top-group">
        <nav className="soft-toggle" aria-label={lang === 'es' ? 'Secciones' : 'Sections'}>
          {tab(`/cv/${lang}`, 'CV', section === 'cv')}
          {BLOG_ENABLED && tab(`/blog/${lang}`, 'Blog', section === 'blog')}
        </nav>
        <nav className="soft-toggle" aria-label="Idioma / Language">
          {tab(langLinks.es, 'ES', lang === 'es')}
          {tab(langLinks.en, 'EN', lang === 'en')}
        </nav>
      </div>
      <div className="soft-top-actions">
        <ThemeToggle labels={t.theme} />
        <a className="soft-btn small" href={cvPdf(lang)} download>{t.pdf}</a>
        <Link className="soft-link" href={`/console?lang=${lang}`}>{'>_ ' + t.console}</Link>
      </div>
    </header>
  );
}
