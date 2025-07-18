import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Grovi - Soluciones innovadoras para su éxito',
  description: 'Transformamos tu visión en resultados tangibles con estrategias innovadoras y soluciones personalizadas. Incrementa tus ingresos hasta un 40% con Grovi.',
  keywords: 'soluciones empresariales, estrategias innovadoras, crecimiento empresarial, consultoría, Grovi, Málaga',
  authors: [{ name: 'Grovi' }],
  openGraph: {
    title: 'Grovi - Soluciones innovadoras para su éxito',
    description: 'Transformamos tu visión en resultados tangibles con estrategias innovadoras. Incrementa tus ingresos hasta un 40% con nuestras soluciones personalizadas.',
    url: 'https://grovi.com',
    siteName: 'Grovi',
    images: [
      {
        url: 'https://grovi.com/grovi-logo-removebg.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grovi - Soluciones innovadoras para su éxito',
    description: 'Transformamos tu visión en resultados tangibles. Incrementa tus ingresos hasta un 40% con estrategias innovadoras.',
    images: ['https://grovi.com/grovi-logo-removebg.png'],
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
        <link rel="icon" type="image/png" sizes="32x32" href="/Favicon G.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/Favicon G.png" />
        <meta name="theme-color" content="#F8F5F1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}