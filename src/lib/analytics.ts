// analytics.ts - Google Analytics and event tracking

// Type for gtag function
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

// Track form submissions
export const trackFormSubmission = (formType: string, source: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      event_category: 'engagement',
      event_label: formType,
      form_source: source,
      page_location: window.location.href
    })
  }
}

// Track CTA clicks
export const trackCTAClick = (ctaType: string, section: string, href: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: `${ctaType}_${section}`,
      click_source: section,
      page_location: href
    })
  }
}

// Track page views (for SPA navigation)
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
      page_title: title,
      page_location: url,
    })
  }
}

// Track custom events
export const trackCustomEvent = (eventName: string, parameters: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}