import Navigation from '@/components/layout/Navigation'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import CaseStudies from '@/components/sections/CaseStudies'
import CalendlySection from '@/components/sections/Calendly'
import ContactForm from '@/components/sections/ContactForm'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <CaseStudies />
      <CalendlySection />
      <ContactForm />
      <Footer />
    </>
  )
}