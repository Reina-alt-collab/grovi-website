// Google Analytics tracking ID
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Check if GA is available
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    console.log('📊 Tracking pageview:', url)
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      cookie_domain: 'grovi.net',
      cookie_flags: 'SameSite=None;Secure'
    })
  } else {
    console.warn('⚠️ gtag not available or GA_TRACKING_ID missing')
  }
}

// Track custom events
export const event = (
  action: string,
  category: string = 'General',
  label?: string,
  value?: number,
  customParameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    console.log('📈 Tracking event:', { action, category, label, value })
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...customParameters
    })
  } else {
    console.warn('⚠️ gtag not available for event tracking')
  }
}

// Track conversions
export const conversion = (conversionLabel: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    console.log('🎯 Tracking conversion:', conversionLabel)
    window.gtag('event', 'conversion', {
      send_to: `${GA_TRACKING_ID}/${conversionLabel}`,
      value: value,
      currency: 'EUR'
    })
  }
}

// Track form submissions
export const trackFormSubmission = (formName: string, method: string = 'online') => {
  event('form_submit', 'Form', formName, undefined, {
    form_name: formName,
    submission_method: method
  })
}

// Track CTA clicks
export const trackCTAClick = (ctaType: string, section: string, destination?: string) => {
  event('cta_click', 'CTA', `${ctaType}_${section}`, undefined, {
    cta_type: ctaType,
    section: section,
    destination: destination
  })
}

// Track Calendly interactions
export const trackCalendlyInteraction = (eventType: string, details?: string) => {
  event('calendly_interaction', 'Calendly', eventType, undefined, {
    interaction_type: eventType,
    details: details
  })
}