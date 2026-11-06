import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const monoFamily = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

export const metadata: Metadata = {
  title: "Marco D'Amico · Backend · DevSecOps · Agentic Engineering",
  description:
    "Marco Giuliano D'Amico. Senior Backend / Full Stack y Agentic Engineer. NestJS, Node.js, AWS, DevSecOps.",
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
        />
      </head>
      <body style={{ fontFamily: monoFamily }}>{children}</body>
    </html>
  );
}
