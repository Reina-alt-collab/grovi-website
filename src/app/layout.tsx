import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import GoogleAnalytics from '../components/analytics/GoogleAnalytics'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Grovi Consulting - Consultoría Empresarial en Málaga',
  description: 'Conectamos tu visión con resultados. Consultoría empresarial especializada en estrategias de crecimiento digital y optimización de procesos para empresas en España.',
  keywords: 'consultoría empresarial, Málaga, estrategia digital, optimización procesos, crecimiento empresarial, consulting España',
  authors: [{ name: 'Grovi Consulting' }],
  creator: 'Grovi Consulting',
  publisher: 'Grovi Consulting',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://grovi.net',
    title: 'Grovi Consulting - Consultoría Empresarial en Málaga',
    description: 'Conectamos tu visión con resultados. Transformamos ideas en estrategias digitales exitosas.',
    siteName: 'Grovi Consulting',
    images: [
      {
        url: 'https://grovi.net/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Grovi Consulting - Consultoría Empresarial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grovi Consulting - Consultoría Empresarial en Málaga',
    description: 'Conectamos tu visión con resultados. Transformamos ideas en estrategias digitales exitosas.',
    images: ['https://grovi.net/og-image.jpg'],
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
  verification: {
    google: 'tu-codigo-de-verificacion-google', // Agregar cuando tengas Google Search Console
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${poppins.variable}`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}