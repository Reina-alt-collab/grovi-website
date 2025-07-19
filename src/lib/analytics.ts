// lib/analytics.ts
// Complete analytics functions for Grovi website

// Google Analytics Tracking ID
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-RDMLRL7W3Z'

// Type definitions for Google Analytics
interface GtagFunction {
  (command: 'config', targetId: string, config?: Record<string, unknown>): void;
  (command: 'event', eventName: string, eventParameters?: Record<string, unknown>): void;
  (command: string, ...args: unknown[]): void;
}

declare global {
  interface Window {
    gtag?: GtagFunction;
  }
}

// Check if gtag is available
const isGtagAvailable = (): boolean => {
  return typeof window !== 'undefined' && 'gtag' in window && typeof window.gtag === 'function'
}

// Log for development
const devLog = (message: string, data?: string | Record<string, unknown>) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 Analytics: ${message}`, data || '')
  }
}

// Page view tracking
export const pageview = (url: string): void => {
  if (isGtagAvailable() && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
  devLog('Page View', url)
}

// Button click tracking
export const trackButtonClick = (action: string, section: string): void => {
  if (isGtagAvailable() && window.gtag) {
    window.gtag('event', 'click', {
      event_category: section,
      event_label: action,
    })
  }
  devLog('Button Click', `${action} in ${section}`)
}

// Scroll tracking
export const trackScroll = (section: string): void => {
  if (isGtagAvailable() && window.gtag) {
    window.gtag('event', 'scroll', {
      event_category: 'Navigation',
      event_label: section,
    })
  }
  devLog('Scroll to', section)
}

// Calendly load tracking
export const trackCalendlyLoad = (status: string): void => {
  if (isGtagAvailable() && window.gtag) {
    window.gtag('event', 'calendly_load', {
      event_category: 'Calendly',
      event_label: status,
    })
  }
  devLog('Calendly Load', status)
}

// Calendly error tracking
export const trackCalendlyError = (error: string, retryCount: number): void => {
  if (isGtagAvailable() && window.gtag) {
    window.gtag('event', 'calendly_error', {
      event_category: 'Calendly',
      event_label: error,
      value: retryCount,
    })
  }
  devLog('Calendly Error', `${error} (Retry: ${retryCount})`)
}

// Form submission tracking
export const trackFormSubmission = (formName: string, success = true): void => {
  if (isGtagAvailable() && window.gtag) {
    window.gtag('event', success ? 'form_submit' : 'form_error', {
      event_category: 'Form',
      event_label: formName,
    })
  }
  devLog('Form Submission', `${formName} - ${success ? 'Success' : 'Error'}`)
}

// Download tracking
export const trackDownload = (fileName: string): void => {
  if (isGtagAvailable() && window.gtag) {
    window.gtag('event', 'file_download', {
      event_category: 'Download',
      event_label: fileName,
    })
  }
  devLog('Download', fileName)
}

// External link tracking
export const trackExternalLink = (url: string): void => {
  if (isGtagAvailable() && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'External Link',
      event_label: url,
    })
  }
  devLog('External Link', url)
}

// Custom event tracking
export const trackCustomEvent = (eventName: string, parameters?: Record<string, unknown>): void => {
  if (isGtagAvailable() && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
  devLog(`Custom Event: ${eventName}`, parameters)
}

// Contact method tracking
export const trackContactMethod = (
  method: 'email' | 'phone' | 'whatsapp' | 'form', 
  location?: string
): void => {
  if (isGtagAvailable() && window.gtag) {
    window.gtag('event', 'contact_attempt', {
      event_category: 'Contact',
      event_label: method,
      custom_parameter_1: location || 'unknown',
    })
  }
  devLog('Contact Method', `${method} from ${location || 'unknown location'}`)
}

// Hero CTA tracking
export const trackHeroCTA = (ctaText: string, targetSection: string): void => {
  if (isGtagAvailable() && window.gtag) {
    window.gtag('event', 'hero_cta_click', {
      event_category: 'Hero',
      event_label: ctaText,
      custom_parameter_1: targetSection,
    })
  }
  devLog('Hero CTA', `${ctaText} → ${targetSection}`)
}

// Section visibility tracking
export const trackSectionView = (sectionName: string): void => {
  if (isGtagAvailable() && window.gtag) {
    window.gtag('event', 'section_view', {
      event_category: 'Engagement',
      event_label: sectionName,
    })
  }
  devLog('Section View', sectionName)
}

// Time on page tracking
export const trackTimeOnPage = (seconds: number, page: string): void => {
  if (isGtagAvailable() && window.gtag) {
    window.gtag('event', 'time_on_page', {
      event_category: 'Engagement',
      event_label: page,
      value: Math.round(seconds),
    })
  }
  devLog('Time on Page', `${Math.round(seconds)}s on ${page}`)
}

// Named export object for easy access
const analytics = {
  pageview,
  trackButtonClick,
  trackScroll,
  trackCalendlyLoad,
  trackCalendlyError,
  trackFormSubmission,
  trackDownload,
  trackExternalLink,
  trackCustomEvent,
  trackContactMethod,
  trackHeroCTA,
  trackSectionView,
  trackTimeOnPage,
  GA_TRACKING_ID
}

export default analytics