import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

// Import GoogleAnalytics component
import GoogleAnalytics from '../components/analytics/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#F07255',
  colorScheme: 'light',
}

export const metadata: Metadata = {
  title: 'Grovi Consulting - Consultoría Empresarial en Málaga',
  description: 'Conectamos tu visión con resultados. Consultoría empresarial especializada en estrategias de crecimiento digital y optimización de procesos para empresas en España.',
  keywords: 'consultoría empresarial, Málaga, estrategia digital, optimización procesos, crecimiento empresarial, consulting España',
  authors: [{ name: 'Grovi Consulting' }],
  creator: 'Grovi Consulting',
  publisher: 'Grovi Consulting',
  category: 'Business Consulting',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://grovi.net',
    title: 'Grovi Consulting - Consultoría Empresarial en Málaga',
    description: 'Conectamos tu visión con resultados. Transformamos ideas en estrategias digitales exitosas.',
    siteName: 'Grovi Consulting',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Grovi Consulting',
  },
  formatDetection: {
    telephone: true,
    date: false,
    address: true,
    email: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* iOS and Mobile Optimization */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Grovi Consulting" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        
        {/* Touch and Tap Optimization */}
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="apple-touch-fullscreen" content="yes" />
        
        {/* Performance and Caching */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        
        {/* Spanish locale and business */}
        <meta name="geo.region" content="ES-AN" />
        <meta name="geo.placename" content="Málaga" />
        <meta name="geo.position" content="36.7213028;-4.4216366" />
        <meta name="ICBM" content="36.7213028, -4.4216366" />
      </head>
      <body className={`${inter.className} ${poppins.variable}`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}