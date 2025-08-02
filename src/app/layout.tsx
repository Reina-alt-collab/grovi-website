import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/CookieBanner'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#F8F5F1',
}

export const metadata: Metadata = {
  title: 'Grovi - Soluciones innovadoras para su éxito',
  description: 'Transformamos tu visión en resultados tangibles con estrategias innovadoras y soluciones personalizadas. Incrementa tus ingresos hasta un 40% con Grovi.',
  keywords: 'soluciones empresariales, estrategias innovadoras, crecimiento empresarial, consultoría, Grovi, Málaga',
  authors: [{ name: 'Grovi' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'Grovi - Soluciones innovadoras para tu éxito',
    description: 'Transformamos tu visión en resultados tangibles con estrategias innovadoras. Incrementa tus ingresos hasta un 40% con nuestras soluciones personalizadas.',
    images: [
      {
        url: 'https://grovi.net/grovi-logo-removebg.png',
        width: 1200,
        height: 630,
        alt: 'Grovi Logo',
      },
    ],
    url: 'https://grovi.net',
    siteName: 'Grovi',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grovi - Soluciones innovadoras para tu éxito',
    description: 'Transformamos tu visión en resultados tangibles. Incrementa tus ingresos hasta un 40% con estrategias innovadoras.',
    images: ['https://grovi.net/grovi-logo-removebg.png'],
    site: '@grovi',
    creator: '@grovi',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/Favicon G.png', sizes: '32x32', type: 'image/png' },
      { url: '/Favicon G.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/Favicon G.png', sizes: '180x180', type: 'image/png' },
      { url: '/Favicon G.png', sizes: '152x152', type: 'image/png' },
      { url: '/Favicon G.png', sizes: '120x120', type: 'image/png' },
      { url: '/Favicon G.png', sizes: '76x76', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome',
        sizes: '192x192',
        url: '/Favicon G.png',
      },
      {
        rel: 'android-chrome',
        sizes: '512x512',
        url: '/Favicon G.png',
      },
    ],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Grovi",
  "description": "Soluciones innovadoras para el éxito empresarial",
  "url": "https://grovi.net",
  "logo": "https://grovi.net/grovi-logo-removebg.png",
  "image": "https://grovi.net/grovi-logo-removebg.png",
  "telephone": "+34695920917",
  "email": "soporte@grovi.net",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Málaga",
    "addressCountry": "ES"
  },
  "sameAs": [
    "https://grovi.net"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+34695920917",
    "contactType": "customer service",
    "availableLanguage": "Spanish"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Spain"
  },
  "serviceType": "Business Consulting"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* GTM Head Snippet */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id=GT-MJWHCS9D'+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GT-MJWHCS9D');
            `,
          }}
        />

        {/* Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Grovi" />
        <meta name="msapplication-TileColor" content="#F8F5F1" />
        <meta name="msapplication-TileImage" content="/Favicon G.png" />

        {/* Preconnects */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>

      <body className={poppins.className} suppressHydrationWarning={true}>
        {/* GTM Body Snippet */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GT-MJWHCS9D"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        {/* Skip to Main Content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent text-white px-4 py-2 rounded-md z-50"
        >
          Saltar al contenido principal
        </a>

        {/* Site Layout */}
        <Navigation />
        <main id="main-content" role="main">{children}</main>
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}