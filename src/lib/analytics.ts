export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Debug: Log the GA_TRACKING_ID at module level
console.log('📊 Analytics module loaded - GA_TRACKING_ID:', GA_TRACKING_ID)

// Declaración global para gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'consent',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
  }
}

// Función para rastrear páginas vistas
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Función para rastrear eventos personalizados
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Eventos específicos para Grovi
export const trackButtonClick = (buttonName: string, section: string) => {
  event({
    action: 'click',
    category: 'Button',
    label: `${section} - ${buttonName}`,
  })
}

export const trackFormSubmit = (formName: string) => {
  event({
    action: 'submit',
    category: 'Form',
    label: formName,
  })
}

export const trackCalendlyOpen = () => {
  event({
    action: 'open',
    category: 'Calendly',
    label: 'Agendar Llamada',
  })
}

export const trackScroll = (section: string) => {
  event({
    action: 'scroll_to',
    category: 'Navigation',
    label: section,
  })
}