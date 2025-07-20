/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'grovi.net',
      },
    ],
  },
  // Remove the experimental optimizeCss that was causing the critters error
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = nextConfig