import { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
  // REMOVIDO: experimental optimizeCss que causaba el error de 'critters'
}

export default nextConfig