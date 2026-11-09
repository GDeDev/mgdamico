import type { Lang } from '../data/content';

export const BLOG_T: Record<
  Lang,
  { title: string; desc: string; none: string; minRead: string; min: string; prev: string; next: string; more: string; locale: string }
> = {
  es: {
    title: 'Blog',
    desc: 'Notas sobre arquitectura, AWS, liderazgo técnico y desarrollo asistido por IA.',
    none: 'Todavía no hay notas.',
    minRead: 'min de lectura',
    min: 'min',
    prev: '← anterior',
    next: 'siguiente →',
    more: 'Más notas',
    locale: 'es_AR',
  },
  en: {
    title: 'Blog',
    desc: 'Notes on architecture, AWS, technical leadership and AI-assisted development.',
    none: 'No posts yet.',
    minRead: 'min read',
    min: 'min',
    prev: '← previous',
    next: 'next →',
    more: 'More posts',
    locale: 'en_US',
  },
};
