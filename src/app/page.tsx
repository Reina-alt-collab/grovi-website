'use client'

import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import CaseStudies from '@/components/CaseStudies/CaseStudies'
import ContactForm from '@/components/sections/ContactForm'
import Calendly from '@/components/sections/Calendly'
import { trackFormSubmission, trackCTAClick } from '@/lib/analytics'

// Type for gtag function
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

export default function HomePage() {
  // Analytics event handlers with proper typing
  const handleFormSubmission = (formType: string) => {
    trackFormSubmission(formType, 'homepage')
    
    // Track in Google Analytics with proper typing
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submission', {
        event_category: 'engagement',
        event_label: formType,
        page_location: window.location.href
      })
    }
  }

  const handleCTAClick = (ctaType: string, section: string) => {
    trackCTAClick(ctaType, section, window.location.href)
    
    // Track in Google Analytics with proper typing
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: `${ctaType}_${section}`,
        page_location: window.location.href
      })
    }
  }

  const handleCalendlyInteraction = (eventType: string) => {
    // Track Calendly interactions
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calendly_interaction', {
        event_category: 'calendly',
        event_label: eventType,
        page_location: window.location.href
      })
    }
  }

  return (
    <>
      <Hero 
        onCTAClick={handleCTAClick}
      />
      <About 
        onCTAClick={handleCTAClick}
      />
      <CaseStudies 
        onCTAClick={handleCTAClick}
      />
      <ContactForm 
        onFormSubmit={handleFormSubmission}
        onCTAClick={handleCTAClick}
      />
      <Calendly 
        onCalendlyInteraction={handleCalendlyInteraction}
      />
    </>
  )
}