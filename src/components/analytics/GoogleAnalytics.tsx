'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

// Import analytics functions with relative path
import { pageview, GA_TRACKING_ID } from '../../lib/analytics'

export default function GoogleAnalytics() {
  const pathname = usePathname()

  // Debug: Verificar ID de Google Analytics
  useEffect(() => {
    console.log('🔍 Google Analytics Debug:')
    console.log('GA_TRACKING_ID:', GA_TRACKING_ID)
    console.log('process.env.NEXT_PUBLIC_GA_ID:', process.env.NEXT_PUBLIC_GA_ID)
    console.log('Component mounted:', new Date().toISOString())
    
    if (!GA_TRACKING_ID) {
      console.error('❌ Google Analytics ID no encontrado! Verifica la variable de entorno NEXT_PUBLIC_GA_ID')
    } else {
      console.log('✅ Google Analytics ID encontrado:', GA_TRACKING_ID)
    }
  }, [])

  useEffect(() => {
    if (GA_TRACKING_ID) {
      // Solo usar pathname, sin searchParams para evitar el error de Suspense
      console.log('📊 Tracking pageview for:', pathname)
      pageview(pathname)
    }
  }, [pathname])

  if (!GA_TRACKING_ID) {
    console.warn('⚠️ Google Analytics no se cargará: ID no configurado')
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        onLoad={() => {
          console.log('✅ Google Analytics script cargado exitosamente')
        }}
        onError={() => {
          console.error('❌ Error cargando script de Google Analytics')
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('✅ Google Analytics configurado exitosamente')
          console.log('🎯 GA Tracking ID:', GA_TRACKING_ID)
        }}
        dangerouslySetInnerHTML={{
          __html: `
            console.log('🚀 Inicializando Google Analytics...');
            window.dataLayer = window.dataLayer || [];
            function gtag(){
              console.log('📡 gtag called with:', arguments);
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              cookie_domain: 'grovi.net',
              cookie_flags: 'SameSite=None;Secure',
              custom_map: {
                'custom_parameter_1': 'empresa_espanola'
              }
            });
            console.log('✅ Google Analytics inicializado con ID: ${GA_TRACKING_ID}');
          `,
        }}
      />
    </>
  )
}