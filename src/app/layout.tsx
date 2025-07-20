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

// Viewport configuration (Next.js 15+)
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
  
  // Open Graph Meta Tags
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
  
  // Twitter Card Meta Tags
  twitter: {
    card: 'summary_large_image',
    title: 'Grovi - Soluciones innovadoras para tu éxito',
    description: 'Transformamos tu visión en resultados tangibles. Incrementa tus ingresos hasta un 40% con estrategias innovadoras.',
    images: ['https://grovi.net/grovi-logo-removebg.png'],
    site: '@grovi',
    creator: '@grovi',
  },
  
  // Apple Web App Meta Tags
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
  
  // Additional Mobile Meta Tags
  formatDetection: {
    telephone: false,
  },
  
  // Icons
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

// Structured Data for SEO
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
        
        {/* Additional Mobile Optimization */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Grovi" />
        <meta name="msapplication-TileColor" content="#F8F5F1" />
        <meta name="msapplication-TileImage" content="/Favicon G.png" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        
        {/* GDPR Compliant Google Analytics with Consent Mode */}
        <script 
          async 
          src="https://www.googletagmanager.com/gtag/js?id=G-RDMLRL7W3Z"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Make gtag globally available
              window.gtag = gtag;
              
              gtag('js', new Date());
              
              // Set default consent to 'denied' for GDPR compliance
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'personalization_storage': 'denied',
                'functionality_storage': 'denied',
                'security_storage': 'granted'
              });
              
              gtag('config', 'G-RDMLRL7W3Z', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
        
        {/* Screen reader only utility styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .sr-only {
              position: absolute;
              width: 1px;
              height: 1px;
              padding: 0;
              margin: -1px;
              overflow: hidden;
              clip: rect(0, 0, 0, 0);
              white-space: nowrap;
              border: 0;
            }
            
            .focus\\:not-sr-only:focus {
              position: static;
              width: auto;
              height: auto;
              padding: 0.5rem 1rem;
              margin: 0;
              overflow: visible;
              clip: auto;
              white-space: normal;
            }
          `
        }} />
      </head>
      <body className={poppins.className} suppressHydrationWarning={true}>
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent text-white px-4 py-2 rounded-md z-50"
        >
          Saltar al contenido principal
        </a>
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main id="main-content" role="main">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Cookie Banner for GDPR Compliance */}
        <CookieBanner />
        
        {/* Vercel Analytics */}
        <Analytics />
        
        {/* Performance and Error Monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance monitoring
              if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                      gtag('event', 'LCP', {
                        event_category: 'Web Vitals',
                        value: Math.round(entry.startTime),
                        non_interaction: true,
                      });
                    }
                    if (entry.entryType === 'first-input') {
                      gtag('event', 'FID', {
                        event_category: 'Web Vitals',
                        value: Math.round(entry.processingStart - entry.startTime),
                        non_interaction: true,
                      });
                    }
                  }
                });
                observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
              }
              
              // Error tracking
              window.addEventListener('error', (e) => {
                gtag('event', 'exception', {
                  description: e.error?.message || 'Unknown error',
                  fatal: false,
                });
              });
              
              // Unhandled promise rejection tracking
              window.addEventListener('unhandledrejection', (e) => {
                gtag('event', 'exception', {
                  description: e.reason?.message || 'Unhandled promise rejection',
                  fatal: false,
                });
              });
            `,
          }}
        />
      </body>
    </html>
  )
}