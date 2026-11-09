import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { THEME_INIT } from '../components/theme';
import './globals.css';

// self-hosted at build time: no render-blocking request to Google Fonts
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '700'], display: 'swap', variable: '--font-mono' });

const site = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const metadata: Metadata = {
  metadataBase: new URL(site ? `https://${site}` : 'http://localhost:3000'),
  title: "Marco Giuliano D'Amico · Tech Lead · Full Stack",
  description:
    "Marco Giuliano D'Amico. Tech Lead y desarrollador full stack TypeScript en fintech: NestJS, Next.js y AWS. Buenos Aires, Argentina.",
  openGraph: {
    type: 'profile',
    title: "Marco Giuliano D'Amico · Tech Lead · Full Stack",
    description: 'TypeScript · NestJS · Next.js · AWS · Fintech',
    locale: 'es_AR',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className={`${mono.className} ${mono.variable}`}>{children}</body>
    </html>
  );
}
