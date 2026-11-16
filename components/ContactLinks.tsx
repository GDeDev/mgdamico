import { EMAIL, GITHUB, WHATSAPP } from '../data/content';
import type { Lang } from '../data/content';

const ICONS = {
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 11.6A8 8 0 0 1 8.2 18.7L4 20l1.3-4A8 8 0 1 1 20 11.6Z" />
      <path d="M9.2 8.8c.3 2.3 2.7 4.7 5 5l1.2-1.2-1.8-1-.8.7a3.6 3.6 0 0 1-1.7-1.7l.7-.8-1-1.8L9.2 8.8Z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
    </svg>
  ),
};

const TIPS = {
  es: { mail: 'Escribime un mail', whatsapp: 'Hablemos por WhatsApp', github: 'Mirá mi código' },
  en: { mail: 'Send me an email', whatsapp: 'Let’s chat on WhatsApp', github: 'See my code' },
};

export default function ContactLinks({ lang }: { lang: Lang }) {
  const tip = TIPS[lang];
  const items = [
    { key: 'mail', href: `mailto:${EMAIL}`, label: EMAIL, external: false },
    { key: 'whatsapp', href: WHATSAPP.url, label: WHATSAPP.display, external: true },
    { key: 'github', href: GITHUB, label: 'GitHub', external: true },
  ] as const;

  return (
    <div className="soft-actions contact-links">
      {items.map((it) => (
        <a
          key={it.key}
          className={`soft-btn contact-btn ${it.key}${it.key === 'mail' ? '' : ' alt'}`}
          href={it.href}
          {...(it.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <span className="contact-ico">{ICONS[it.key]}</span>
          <span>{it.label}</span>
          <span className="contact-tip" role="tooltip">
            <span className="contact-tip-ico">{ICONS[it.key]}</span>
            {tip[it.key]}
          </span>
        </a>
      ))}
    </div>
  );
}
