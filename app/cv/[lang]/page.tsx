import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CvDocument from '../../../components/CvDocument';
import { COPY, EMAIL, GITHUB, LANGS } from '../../../data/content';
import type { Lang } from '../../../data/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const c = COPY[lang as Lang];
  if (!c) return {};
  return {
    title: `${c.name} · CV`,
    description: `${c.role}. ${c.about[0]}`,
    alternates: {
      canonical: `/cv/${lang}`,
      languages: { es: '/cv/es', en: '/cv/en', 'x-default': '/cv/es' },
    },
    openGraph: { type: 'profile', title: `${c.name} · CV`, locale: lang === 'en' ? 'en_US' : 'es_AR' },
  };
}

export default async function CvPage({ params }: Props) {
  const { lang } = await params;
  if (!LANGS.includes(lang as Lang)) notFound();
  const c = COPY[lang as Lang];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: c.name,
    jobTitle: c.role,
    email: `mailto:${EMAIL}`,
    sameAs: [GITHUB],
    address: { '@type': 'PostalAddress', addressLocality: 'Buenos Aires', addressCountry: 'AR' },
    knowsAbout: c.stack.map(([, v]) => v).join(' · ').split(' · '),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <CvDocument lang={lang as Lang} />
    </>
  );
}
