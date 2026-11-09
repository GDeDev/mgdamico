import { ImageResponse } from 'next/og';
import { COPY } from '../data/content';

export const alt = "Marco Giuliano D'Amico · Tech Lead · Full Stack";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Terminal-style preview card for links shared on LinkedIn / WhatsApp / X
export default function OgImage() {
  const c = COPY.es;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#000',
          color: '#d3ecd8',
          padding: '64px 72px',
          fontFamily: 'monospace',
          fontSize: 30,
        }}
      >
        <div style={{ display: 'flex', color: '#8fb59a' }}>guest@mda: ~</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', color: '#5dff6a' }}>{'> whoami'}</div>
          <div style={{ display: 'flex', color: '#fff', fontSize: 68, fontWeight: 700 }}>{c.name}</div>
          <div style={{ display: 'flex', color: '#5dff6a', fontSize: 38 }}>{c.role}</div>
          <div style={{ display: 'flex', color: '#b6d3bd' }}>TypeScript · NestJS · Next.js · AWS · Fintech</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#5dff6a' }}>
          {'guest@mda ~ $'}
          <div style={{ width: 18, height: 34, background: '#5dff6a' }} />
        </div>
      </div>
    ),
    size,
  );
}
