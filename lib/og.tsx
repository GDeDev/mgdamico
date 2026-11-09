import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

// Terminal-style preview card shared by every route's opengraph-image
export function ogCard({ prompt, title, subtitle, footer }: { prompt: string; title: string; subtitle?: string; footer?: string }) {
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
          <div style={{ display: 'flex', color: '#5dff6a' }}>{prompt}</div>
          <div style={{ display: 'flex', color: '#fff', fontSize: title.length > 40 ? 52 : 68, fontWeight: 700 }}>{title}</div>
          {subtitle && <div style={{ display: 'flex', color: '#5dff6a', fontSize: 38 }}>{subtitle}</div>}
          {footer && <div style={{ display: 'flex', color: '#b6d3bd' }}>{footer}</div>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#5dff6a' }}>
          {'guest@mda ~ $'}
          <div style={{ width: 18, height: 34, background: '#5dff6a' }} />
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
