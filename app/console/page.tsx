import type { Metadata } from 'next';
import Terminal from '../../components/Terminal';

export const metadata: Metadata = {
  title: "Consola · Marco Giuliano D'Amico",
  alternates: { canonical: '/console' },
};

export default function ConsolePage() {
  return <Terminal initial="console" />;
}
