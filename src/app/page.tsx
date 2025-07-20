'use client'

import { useEffect } from 'react'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import CaseStudies from '@/components/sections/CaseStudies'
import Calendly from '@/components/sections/Calendly'
import ContactForm from '@/components/sections/ContactForm'

// Custom hook for scroll animations
function useScrollAnimations() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
}

// Custom hook for smooth scrolling navigation
function useSmoothScrolling() {
  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const targetId = target.getAttribute('href')?.substring(1)
        const targetElement = document.getElementById(targetId || '')
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 70 // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])
}

// Custom hook for mobile optimizations
function useMobileOptimizations() {
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

    if (isIOS) {
      // Fix iOS Safari viewport issues
      const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      }
      
      setViewportHeight()
      window.addEventListener('resize', setViewportHeight)
      window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100)
      })

      return () => {
        window.removeEventListener('resize', setViewportHeight)
        window.removeEventListener('orientationchange', setViewportHeight)
      }
    }

    if (isMobile) {
      // Improve touch performance
      const touchStartHandler = () => {}
      const touchMoveHandler = () => {}
      
      document.addEventListener('touchstart', touchStartHandler, { passive: true })
      document.addEventListener('touchmove', touchMoveHandler, { passive: true })

      return () => {
        document.removeEventListener('touchstart', touchStartHandler)
        document.removeEventListener('touchmove', touchMoveHandler)
      }
    }
  }, [])
}

// Custom hook for Google Analytics events
function useAnalytics() {
  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'G-RDMLRL7W3Z', {
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }, [])

  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: 'User Interaction',
        ...parameters
      })
    }
  }

  return { trackEvent }
}

export default function HomePage() {
  // Initialize custom hooks
  useScrollAnimations()
  useSmoothScrolling()
  useMobileOptimizations()
  const { trackEvent } = useAnalytics()

  // Handle CTA clicks for analytics
  const handleCTAClick = (ctaType: string, section: string) => {
    trackEvent('cta_click', {
      cta_type: ctaType,
      section: section,
      event_label: `${ctaType} - ${section}`
    })
  }

  // Handle form submissions for analytics
  const handleFormSubmission = (formType: string) => {
    trackEvent('form_submit', {
      form_type: formType,
      event_label: `Form Submission - ${formType}`
    })
  }

  // Handle Calendly interactions
  const handleCalendlyInteraction = (eventType: string) => {
    trackEvent('calendly_interaction', {
      interaction_type: eventType,
      event_label: `Calendly - ${eventType}`
    })
  }

  // Handle section view tracking
  useEffect(() => {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.id || entry.target.className
          trackEvent('section_view', {
            section_name: sectionName,
            event_label: `Section View - ${sectionName}`
          })
        }
      })
    }, { threshold: 0.5 })

    // Observe all main sections
    const sections = document.querySelectorAll('section[id]')
    sections.forEach(section => sectionObserver.observe(section))

    return () => sectionObserver.disconnect()
  }, [trackEvent])

  return (
    <>
      {/* Hero Section */}
      <Hero onCTAClick={handleCTAClick} />
      
      {/* About Section */}
      <About onCTAClick={handleCTAClick} />
      
      {/* Case Studies Section */}
      <CaseStudies onCTAClick={handleCTAClick} />
      
      {/* Calendly Section */}
      <Calendly onCalendlyInteraction={handleCalendlyInteraction} />
      
      {/* Contact Form Section */}
      <ContactForm 
        onFormSubmit={handleFormSubmission}
        onCTAClick={handleCTAClick}
      />

      {/* Structured Data for the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Grovi - Soluciones innovadoras para tu éxito",
            "description": "Transformamos tu visión en resultados tangibles con estrategias innovadoras y soluciones personalizadas.",
            "url": "https://grovi.net",
            "mainEntity": {
              "@type": "Organization",
              "name": "Grovi",
              "url": "https://grovi.net",
              "logo": "https://grovi.net/grovi-logo-removebg.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+34695920917",
                "contactType": "customer service"
              }
            },
            "potentialAction": [
              {
                "@type": "ReserveAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://calendly.com/soporte-grovi/llamada-de-descubrimiento-de-15-minutos",
                  "actionPlatform": [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform"
                  ]
                },
                "object": {
                  "@type": "Service",
                  "name": "Consulta de descubrimiento"
                }
              }
            ]
          })
        }}
      />

      {/* Additional Performance Optimizations */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Preload critical resources
            if ('requestIdleCallback' in window) {
              requestIdleCallback(() => {
                // Preload Calendly resources
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = 'https://assets.calendly.com/assets/external/widget.js';
                link.as = 'script';
                document.head.appendChild(link);
              });
            }

            // Critical performance metrics
            if ('PerformanceObserver' in window) {
              // Cumulative Layout Shift
              let clsValue = 0;
              let clsEntries = [];
              
              const clsObserver = new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                  if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    clsEntries.push(entry);
                  }
                }
              });
              
              clsObserver.observe({ entryTypes: ['layout-shift'] });
              
              // Report CLS on page visibility change
              document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'hidden' && clsValue > 0) {
                  gtag('event', 'CLS', {
                    event_category: 'Web Vitals',
                    value: Math.round(clsValue * 1000),
                    non_interaction: true,
                  });
                }
              });
            }
          `
        }}
      />
    </>
  )
}

// Error Boundary Component (for production use)
export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return children // In a real app, implement proper error boundary
}