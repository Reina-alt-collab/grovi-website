'use client'

import { useState } from 'react'
import Hero from '@/components/section/Hero'
import About from '@/components/section/About'
import Services from '@/components/section/Services'
import CaseStudies from '@/components/section/CaseStudies'

export default function HomePage() {
  // Centralized CTA handler for all sections
  const [lastCTA, setLastCTA] = useState<{ ctaType: string, section: string } | null>(null)

  const handleCTAClick = (ctaType: string, section: string) => {
    console.log('CTA clicked:', ctaType, section)
    setLastCTA({ ctaType, section })
    // TODO: add Google Analytics / event tracking here if needed
  }

  return (
    <>
      {/* Hero Section */}
      <Hero onCTAClick={handleCTAClick} />

      {/* About / Personal Info */}
      <About />

      {/* Services / Capabilities */}
      <Services />

      {/* Case Studies / Portfolio */}
      <CaseStudies onCTAClick={handleCTAClick} />
    </>
  )
}