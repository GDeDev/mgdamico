'use client';

import { useEffect, useState } from 'react';
import { THEME_KEY } from './theme';

type Theme = 'light' | 'dark';

function current(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === 'dark' || set === 'light') return set;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle({ labels }: { labels: Record<Theme, string> }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => setTheme(current()), []);

  const toggle = () => {
    const next: Theme = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
    setTheme(next);
  };

  // label names the theme you switch TO; neutral icon until mounted to avoid a hydration mismatch
  const target: Theme = theme === 'dark' ? 'light' : 'dark';
  return (
    <button className="soft-btn alt small" type="button" onClick={toggle} aria-label={labels[target]} title={labels[target]}>
      {theme === null ? '◐' : theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}
