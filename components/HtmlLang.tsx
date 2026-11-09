'use client';

import { useEffect } from 'react';

// the root layout is static (lang="es"); documents in another language update <html lang> on mount
export default function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = prev;
    };
  }, [lang]);
  return null;
}
