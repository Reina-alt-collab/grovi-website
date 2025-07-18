/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Aplicar a todas las páginas
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'payment=*, microphone=*, camera=*, geolocation=*, fullscreen=*'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
    ]
  },
  // Configuración para imágenes
  images: {
    domains: ['assets.calendly.com'],
    unoptimized: false,
  },
  // Configuración para análisis
  experimental: {
    optimizeCss: true,
  }
}

module.exports = nextConfig