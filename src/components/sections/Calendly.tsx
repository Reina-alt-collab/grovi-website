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
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default function CalendlySection() {
  const [mounted, setMounted] = useState(false)
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Clean Calendly URL
  const calendlyUrl = "https://calendly.com/soporte-grovi/llamada-de-descubrimiento-de-15-minutos"

  useEffect(() => {
    setMounted(true)
    
    // Detect mobile device
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Check if Calendly is already loaded
    if (window.Calendly) {
      setCalendlyLoaded(true)
      return () => window.removeEventListener('resize', checkMobile)
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
      window.removeEventListener('resize', checkMobile)
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript)
      }
    }
  }, [])

  // Initialize Calendly widget after script loads (only for desktop)
  useEffect(() => {
    if (calendlyLoaded && window.Calendly && !isMobile) {
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
  }, [calendlyLoaded, calendlyUrl, isMobile])

  const openCalendlyPopup = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: calendlyUrl })
    } else {
      // Fallback: open in new tab
      window.open(calendlyUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section id="agendar" className={styles.calendly}>
      <div className="container">
        <div className={`${styles.header} ${mounted ? 'fade-in' : ''}`}>
          <h2 className={`${styles.title} text-gradient`}>Agenda Tu Llamada</h2>
          <p className={styles.subtitle}>
            Conversemos sobre cómo podemos impulsar el crecimiento de tu negocio
          </p>
        </div>

        <div className={`${styles.calendlyContainer} ${mounted ? 'fade-in-up' : ''}`}>
          {isMobile ? (
            // Mobile: Show optimized card with button
            <div className={styles.mobileCalendlyWrapper}>
              <div className={styles.mobileCalendlyCard}>
                <div className={styles.calendarIcon}>📅</div>
                <h3 className={styles.mobileCalendlyTitle}>
                  Llamada de Descubrimiento
                </h3>
                <div className={styles.mobileCalendlyMeta}>
                  <span className={styles.duration}>⏱️ 15 minutos</span>
                  <span className={styles.type}>💻 Videollamada</span>
                  <span className={styles.price}>🆓 Gratis</span>
                </div>
                <p className={styles.mobileCalendlyDescription}>
                  Una conversación inicial para conocer tus necesidades y objetivos empresariales.
                </p>
                <button 
                  onClick={openCalendlyPopup}
                  className={styles.mobileCalendlyButton}
                >
                  <span className={styles.buttonText}>Seleccionar Fecha y Hora</span>
                  <span className={styles.buttonIcon}>📲</span>
                </button>
                <div className={styles.mobileFeatures}>
                  <div className={styles.feature}>
                    <span className={styles.featureIcon}>✅</span>
                    <span>Sin compromiso</span>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureIcon}>🔒</span>
                    <span>Información confidencial</span>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureIcon}>🎯</span>
                    <span>Consulta personalizada</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Desktop: Show inline widget
            <div className={styles.desktopCalendlyWrapper}>
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
                    className="btn btn-primary"
                  >
                    Abrir Calendly en Nueva Pestaña
                  </a>
                  <div className={styles.contactAlternative}>
                    <p>O contáctanos directamente:</p>
                    <a href="mailto:soporte@grovi.net" className={styles.contactLink}>
                      📧 soporte@grovi.net
                    </a>
                    <a href="tel:+34695920917" className={styles.contactLink}>
                      📱 +34 695 920 917
                    </a>
                  </div>
                </div>
              ) : !calendlyLoaded ? (
                // Loading fallback
                <div className={styles.loadingFallback}>
                  <div className="loading"></div>
                  <h3>Cargando calendario...</h3>
                  <p>Preparando tu experiencia de reserva</p>
                </div>
              ) : (
                // Calendly widget
                <div className={styles.calendlyWidget}>
                  <div 
                    className="calendly-inline-widget"
                    style={{ 
                      minWidth: '320px', 
                      height: '650px',
                      borderRadius: 'var(--border-radius)',
                      overflow: 'hidden'
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className={`${styles.benefits} ${mounted ? 'fade-in-up' : ''}`}>
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

        <div className={`${styles.guarantee} ${mounted ? 'fade-in-up' : ''}`}>
          <div className={styles.guaranteeContent}>
            <div className={styles.guaranteeIcon}>⏱️</div>
            <div className={styles.guaranteeText}>
              <h4 className={styles.guaranteeTitle}>Compromiso de 15 Minutos</h4>
              <p>Sin presión de ventas. Solo una conversación honesta sobre cómo podemos ayudarte.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}