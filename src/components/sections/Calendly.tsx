'use client'
import { useEffect, useState } from 'react'
import styles from './Calendly.module.css'

declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: {
        url: string;
        parentElement: Element | null;
        prefill: Record<string, unknown>;
        utm: Record<string, unknown>;
      }) => void;
    };
  }
}

export default function CalendlySection() {
  const [mounted, setMounted] = useState(false)
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)
  const [loadError, setLoadError] = useState(false)

  // Clean Calendly URL without problematic parameters
  const calendlyUrl = "https://calendly.com/soporte-grovi/llamada-de-descubrimiento-de-15-minutos"

  useEffect(() => {
    setMounted(true)
    
    // Check if Calendly is already loaded
    if (window.Calendly) {
      setCalendlyLoaded(true)
      return
    }

    // Load Calendly script with error handling
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    
    script.onload = () => {
      console.log('Calendly script loaded successfully')
      setCalendlyLoaded(true)
    }
    
    script.onerror = () => {
      console.error('Failed to load Calendly script')
      setLoadError(true)
    }

    document.head.appendChild(script)

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript)
      }
    }
  }, [])

  // Initialize Calendly widget after script loads
  useEffect(() => {
    if (calendlyLoaded && window.Calendly) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        try {
          window.Calendly.initInlineWidget({
            url: calendlyUrl,
            parentElement: document.querySelector('.calendly-inline-widget'),
            prefill: {},
            utm: {}
          });
        } catch (error) {
          console.error('Error initializing Calendly widget:', error)
          setLoadError(true)
        }
      }, 100)
    }
  }, [calendlyLoaded, calendlyUrl])

  return (
    <section id="agendar" className={styles.calendly}>
      <div className={styles.container}>
        <div className={`${styles.header} ${mounted ? styles.fadeIn : ''}`}>
          <h2 className={styles.title}>Agenda Tu Llamada</h2>
          <p className={styles.subtitle}>
            Conversemos sobre cómo podemos impulsar el crecimiento de tu negocio
          </p>
        </div>

        <div className={`${styles.calendlyContainer} ${mounted ? styles.fadeInUp : ''}`}>
          <div className={styles.calendlyWidget}>
            {loadError ? (
              // Error fallback
              <div className={styles.errorFallback}>
                <div className={styles.errorIcon}>⚠️</div>
                <h3>Problema al cargar el calendario</h3>
                <p>Por favor, agenda tu llamada directamente:</p>
                <a 
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.fallbackButton}
                >
                  Abrir Calendly en Nueva Pestaña
                </a>
                <div className={styles.contactAlternative}>
                  <p>O contáctanos directamente:</p>
                  <a href="mailto:soporte@grovi.net" className={styles.emailLink}>
                    soporte@grovi.net
                  </a>
                  <a href="tel:+34695920917" className={styles.phoneLink}>
                    +34 695 920 917
                  </a>
                </div>
              </div>
            ) : !calendlyLoaded ? (
              // Loading fallback
              <div className={styles.loadingFallback}>
                <div className={styles.loadingSpinner}></div>
                <h3>Cargando calendario...</h3>
                <p>Preparando tu experiencia de reserva</p>
              </div>
            ) : (
              // Calendly widget
              <div 
                className="calendly-inline-widget"
                style={{ 
                  minWidth: '300px', 
                  height: '100%',
                  borderRadius: '15px',
                  overflow: 'hidden'
                }}
              />
            )}
          </div>
        </div>

        <div className={`${styles.benefits} ${mounted ? styles.fadeInUp : ''}`}>
          <h3 className={styles.benefitsTitle}>¿Qué puedes esperar de nuestra llamada?</h3>
          <div className={styles.benefitsList}>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🎯</div>
              <div className={styles.benefitContent}>
                <h4>Análisis Personalizado</h4>
                <p>Evaluación gratuita de tu situación actual y oportunidades de crecimiento</p>
              </div>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>💡</div>
              <div className={styles.benefitContent}>
                <h4>Estrategia Inicial</h4>
                <p>Recomendaciones específicas para tu industria y objetivos</p>
              </div>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🚀</div>
              <div className={styles.benefitContent}>
                <h4>Plan de Acción</h4>
                <p>Próximos pasos claros para comenzar tu transformación empresarial</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.guarantee} ${mounted ? styles.fadeInUp : ''}`}>
          <div className={styles.guaranteeContent}>
            <div className={styles.guaranteeIcon}>⏱️</div>
            <div>
              <h4 className={styles.guaranteeTitle}>Compromiso de 15 Minutos</h4>
              <p className={styles.guaranteeText}>
                Sin presión de ventas. Solo una conversación honesta sobre cómo podemos ayudarte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}