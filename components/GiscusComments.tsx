'use client';

import { useEffect, useRef } from 'react';

// Comments and reactions backed by GitHub Discussions (https://giscus.app).
export const GISCUS = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
};

export const GISCUS_READY = Boolean(GISCUS.repo && GISCUS.repoId && GISCUS.category && GISCUS.categoryId);

// follows the site toggle (data-theme on <html>) and falls back to the OS setting
function currentTheme() {
  const t = document.documentElement.dataset.theme;
  const dark = t === 'dark' || (t !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  return `${window.location.origin}/giscus/${dark ? 'dark' : 'light'}.css`;
}

export default function GiscusComments({ slug, lang }: { slug: string; lang: 'es' | 'en' }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el || !GISCUS_READY) return;

    const s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    s.async = true;
    s.crossOrigin = 'anonymous';
    const attrs: Record<string, string> = {
      'data-repo': GISCUS.repo!,
      'data-repo-id': GISCUS.repoId!,
      'data-category': GISCUS.category!,
      'data-category-id': GISCUS.categoryId!,
      'data-mapping': 'specific',
      'data-term': `blog/${slug}`,
      'data-strict': '1',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': currentTheme(),
      'data-lang': lang,
      'data-loading': 'lazy',
    };
    for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
    el.appendChild(s);

    const sync = () => {
      el.querySelector<HTMLIFrameElement>('iframe.giscus-frame')?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: currentTheme() } } },
        'https://giscus.app',
      );
    };
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', sync);

    return () => {
      mo.disconnect();
      mq.removeEventListener('change', sync);
      el.replaceChildren();
    };
  }, [slug, lang]);

  return (
    <section className="rx" aria-label={lang === 'es' ? 'Comentarios' : 'Comments'}>
      <div ref={host} className="giscus-host" />
    </section>
  );
}
