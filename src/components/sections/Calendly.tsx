'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Calendly.module.css'

interface CalendlyProps {
  onCalendlyInteraction: (eventType: string) => void
}

export default function Calendly({ onCalendlyInteraction }: CalendlyProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const loadCalendly = () => {
    if (document.querySelector('script[src*="calendly"]')) {
      setIsLoaded(true)
      initializeWidget()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = () => {
      setIsLoaded(true)
      onCalendlyInteraction('widget_loaded')
      // Give the script time to fully initialize
      setTimeout(initializeWidget, 500)
    }
    script.onerror = () => {
      console.error('Failed to load Calendly script')
    }
    document.head.appendChild(script)
  }

  const initializeWidget = () => {
  const widget = document.querySelector('.calendly-inline-widget')
  if ((window as any).Calendly && widget) {
    try {
      (window as any).Calendly.initInlineWidget({
        url: 'https://calendly.com/soporte-grovi/llamada-de-descubrimiento-de-15-minutos?hide_gdpr_banner=1&primary_color=ff735c',
        parentElement: widget as HTMLElement
      })
    } catch (error) {
      console.error('Error initializing Calendly:', error)
    }
  }
}
  useEffect(() => {
    const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      setIsInView(true)
      loadCalendly()
    }
  },
  { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
)
    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      observer.disconnect()
    }
  }, [onCalendlyInteraction])

  // Initialize widget when loaded
  useEffect(() => {
    if (isLoaded) {
      setTimeout(initializeWidget, 100)
    }
  }, [isLoaded]) // Added dependency

  const handleDirectBooking = () => {
    onCalendlyInteraction('direct_booking_clicked')
    window.open('https://calendly.com/soporte-grovi/llamada-de-descubrimiento-de-15-minutos', '_blank', 'width=800,height=700')
  }

  return (
    <section 
      ref={sectionRef}
      id="agendar" 
      className={`section ${styles.calendlySection}`}
    >
      <div className="container">
        <div className={`section-header ${styles.sectionHeader}`}>
          <h2 className={`section-title fade-in ${isInView ? 'visible' : ''}`}>
            Agenda Tu Llamada
          </h2>
          <p className={`section-subtitle fade-in ${isInView ? 'visible' : ''}`}>
            Conversemos sobre cómo podemos impulsar el crecimiento de tu negocio
          </p>
        </div>
        
        <div className={`${styles.calendlyContainer} fade-in ${isInView ? 'visible' : ''}`}>
          <div className={styles.calendlyWidget}>
            {!isLoaded ? (
              <div className={styles.loadingState}>
                <div className={styles.loadingSpinner}></div>
                <p>Cargando calendario...</p>
              </div>
            ) : (
            
              <div className={styles.calendlyInline}>
                <div 
                 className="calendly-inline-widget"
                 data-url="https://calendly.com/soporte-grovi/llamada-de-descubrimiento-de-15-minutos?hide_gdpr_banner=1&primary_color=ff735c"
                style={{ width: '100%', height: '100%' }}
                />
              </div>
            )}
          </div>
          
          <div className={styles.benefitsSection}>
            <h3 className={styles.benefitsTitle}>¿Qué puedes esperar?</h3>
            
            <div className={styles.benefitsList}>
              {[
                { icon: '🎯', title: 'Análisis de tu situación', desc: 'Evaluaremos tus desafíos actuales y oportunidades' },
                { icon: '💡', title: 'Estrategias personalizadas', desc: 'Ideas específicas para tu industria y situación' },
                { icon: '📈', title: 'Plan de acción claro', desc: 'Pasos concretos para impulsar tu crecimiento' },
                { icon: '🤝', title: 'Sin compromiso', desc: 'Una conversación amigable para conocernos' }
              ].map((benefit, index) => (
                <div key={index} className={styles.benefitItem}>
                  <span className={styles.benefitIcon}>{benefit.icon}</span>
                  <div className={styles.benefitContent}>
                    <h4>{benefit.title}</h4>
                    <p>{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleDirectBooking}
              className={`btn btn-primary ${styles.fallbackButton}`}
              style={{ marginTop: '2rem' }}
            >
              📞 Agendar Llamada Directa
            </button>
          </div>
        </div>
        
        <div className={`${styles.trustSection} fade-in ${isInView ? 'visible' : ''}`}>
          <div className={styles.trustIndicators}>
            {[
              { icon: '⚡', text: 'Respuesta en 24h' },
              { icon: '🔒', text: '100% Confidencial' },
              { icon: '✅', text: 'Sin compromisos' },
              { icon: '🎁', text: 'Consulta gratuita' }
            ].map((trust, index) => (
              <div key={index} className={styles.trustItem}>
                <span className={styles.trustIcon}>{trust.icon}</span>
                <span>{trust.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}