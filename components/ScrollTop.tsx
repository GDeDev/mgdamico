'use client';

import { useEffect, useState } from 'react';

// "back to top" arrow for the long document pages; shows up after scrolling down a screen or so
export default function ScrollTop({ label }: { label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const up = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button type="button" className={`scroll-top no-print${show ? ' on' : ''}`} onClick={up} aria-label={label} title={label} tabIndex={show ? 0 : -1} aria-hidden={!show}>
      <span aria-hidden="true">↑</span>
    </button>
  );
}
