/** @type {import('next').NextConfig} */
const dev = process.env.NODE_ENV !== 'production';
// 'unsafe-inline' scripts: Next's inline bootstrap would need nonces, which turn static pages dynamic
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://giscus.app${dev ? " 'unsafe-eval'" : ''}`,
  "frame-src https://giscus.app",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${dev ? ' ws: wss:' : ''}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
].join('; ');

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [
      { source: '/giscus/:path*', headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }] },
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
