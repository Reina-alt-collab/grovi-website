import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      { protocol: 'https', hostname: 'grovi.net', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'assets.calendly.com', port: '', pathname: '/**' },
    ],
  },

  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ]
  },

  ...(process.env.NODE_ENV === 'production' && { compiler: { removeConsole: true } }),

  experimental: {
    // remove appnpm run dev
    // Dir entirely
  },
}

export default nextConfig