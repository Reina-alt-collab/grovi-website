'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import styles from './Calendly.module.css'

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: Element | null;
        prefill?: Record<string, unknown>;
        utm?: Record<string, unknown>;
      }) => void;
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default function CalendlySection() {
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const calendlyUrl = "https://calendly.com/soporte-grovi/llamada-de-descubrimiento-de-15-minutos"
  const MAX_RETRIES = 3
  const SCRIPT_TIMEOUT = 10000

  // Mobile detection
  const checkMobile = useCallback(() => {
    const mobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    setIsMobile(mobile)
  }, [])

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    const section = document.querySelector('#agendar')
    if (section) observer.observe(section)
    
    return () => observer.disconnect()
  }, [])

  // Load Calendly script
  const loadCalendlyScript = useCallback(async () => {
    if (window.Calendly) {
      setCalendlyLoaded(true)
      return
    }

    const existingScript = document.querySelector('script[src*="calendly.com"]')
    if (existingScript) {
      setLoadError(true)
      return
    }

    try {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.defer = true
      scriptRef.current = script

      timeoutRef.current = setTimeout(() => {
        setLoadError(true)
        console.error('Calendly script loading timeout')
      }, SCRIPT_TIMEOUT)

      script.onload = () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
        
        setCalendlyLoaded(true)
        setLoadError(false)
        
        if (window.Calendly) {
          try {
            document.documentElement.style.setProperty('--calendly-cookie-banner-display', 'none')
          } catch {
            console.log('Calendly cookie override not needed')
          }
        }
      }
      
      script.onerror = () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
        
        setLoadError(true)
        
        if (retryCount < MAX_RETRIES) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1)
            setLoadError(false)
          }, 2000 * (retryCount + 1))
        }
      }

      document.head.appendChild(script)
    } catch {
      console.error('Error creating Calendly script')
      setLoadError(true)
    }
  }, [retryCount])

  // Initialize on mount
  useEffect(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [checkMobile])

  // Load script when visible
  useEffect(() => {
    if (isVisible && !isMobile && !calendlyLoaded && !loadError) {
      loadCalendlyScript()
    }
  }, [isVisible, isMobile, calendlyLoaded, loadError, loadCalendlyScript])

  // Initialize Calendly widget
  useEffect(() => {
    if (calendlyLoaded && window.Calendly && !isMobile) {
      setTimeout(() => {
        try {
          const widgetElement = document.querySelector('.calendly-inline-widget')
          if (widgetElement && !widgetElement.hasChildNodes()) {
            if (window.Calendly && window.Calendly.initInlineWidget) {
              window.Calendly.initInlineWidget({
                url: calendlyUrl,
                parentElement: widgetElement,
                prefill: {
                  name: '',
                  email: '',
                  customAnswers: { a1: 'Grovi Website' }
                },
                utm: {
                  utmSource: 'grovi-website',
                  utmMedium: 'website',
                  utmCampaign: 'consultation'
                }
              });
              
              // Hide cookie notices
              setTimeout(() => {
                const cookieNotices = document.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="gdpr"]')
                cookieNotices.forEach(notice => {
                  if (notice.textContent?.toLowerCase().includes('cookie') || 
                      notice.textContent?.toLowerCase().includes('privacy')) {
                    (notice as HTMLElement).style.display = 'none'
                  }
                })
              }, 2000)
            }
          }
        } catch {
          console.error('Error initializing Calendly widget')
          setLoadError(true)
        }
      }, 100)
    }
  }, [calendlyLoaded, calendlyUrl, isMobile])

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current)
      }
    }
  }, [])

  // Open popup (mobile)
  const openCalendlyPopup = useCallback(() => {
    if ('gtag' in window && typeof window.gtag === 'function') {
      window.gtag('event', 'click', {
        event_category: 'Calendly',
        event_label: 'Mobile Popup Open'
      })
    }
    
    try {
      if (window.Calendly && window.Calendly.initPopupWidget) {
        window.Calendly.initPopupWidget({ 
          url: calendlyUrl + '?utm_source=grovi-mobile&utm_medium=popup&utm_campaign=consultation'
        })
      } else {
        window.open(
          calendlyUrl + '?utm_source=grovi-mobile&utm_medium=fallback&utm_campaign=consultation', 
          '_blank', 
          'noopener,noreferrer'
        )
      }
    } catch {
      console.error('Error opening Calendly popup')
      window.open(calendlyUrl, '_blank', 'noopener,noreferrer')
    }
  }, [calendlyUrl])

  // Manual retry function
  const handleRetry = useCallback(() => {
    setLoadError(false)
    setCalendlyLoaded(false)
    setRetryCount(0)
    
    if (scriptRef.current && scriptRef.current.parentNode) {
      scriptRef.current.parentNode.removeChild(scriptRef.current)
    }
    
    setTimeout(() => {
      loadCalendlyScript()
    }, 500)
  }, [loadCalendlyScript])

  return (
    <section id="agendar" className={styles.calendly}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.fadeIn : ''}`}>
          <h2 className={styles.title}>Agenda Tu Llamada de Descubrimiento</h2>
          <p className={styles.subtitle}>
            Conversemos sobre cómo podemos impulsar el crecimiento de tu negocio con estrategias probadas y personalizadas
          </p>
        </div>

        <div className={`${styles.calendlyContainer} ${isVisible ? styles.fadeInUp : ''}`}>
          {isMobile ? (
            <div className={styles.mobileCalendlyWrapper}>
              <div className={styles.mobileCalendlyCard}>
                <div className={styles.calendarIcon}>📅</div>
                <h3 className={styles.mobileCalendlyTitle}>
                  Llamada de Descubrimiento Gratuita
                </h3>
                <div className={styles.callDuration}>15 minutos</div>
                <p className={styles.mobileCalendlyDescription}>
                  Una conversación inicial para conocer tus necesidades empresariales y explorar cómo podemos ayudarte a alcanzar tus objetivos de crecimiento.
                </p>
                
                <div className={styles.mobileFeatures}>
                  <div className={styles.feature}>
                    <span className={styles.featureIcon}>✅</span>
                    <span>Análisis gratuito de tu situación actual</span>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureIcon}>🎯</span>
                    <span>Recomendaciones específicas</span>
                  </div>
                  <div className={styles.feature}>
                    <span className={styles.featureIcon}>🚀</span>
                    <span>Plan de acción inicial</span>
                  </div>
                </div>
                
                <button 
                  onClick={openCalendlyPopup}
                  className={styles.mobileCalendlyButton}
                >
                  <span className={styles.buttonText}>Seleccionar Fecha y Hora</span>
                  <span className={styles.buttonIcon}>📲</span>
                </button>
                
                <div className={styles.mobileInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>⏱️</span>
                    <span>15 minutos</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>💻</span>
                    <span>Videollamada</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>🆓</span>
                    <span>Completamente gratis</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.desktopCalendlyWrapper}>
              <div className={styles.calendlyWidget}>
                {loadError ? (
                  <div className={styles.errorFallback}>
                    <div className={styles.errorIcon}>⚠️</div>
                    <h3>Problema al cargar el calendario</h3>
                    <p>Por favor, intenta una de estas opciones:</p>
                    
                    <div className={styles.errorActions}>
                      <button 
                        onClick={handleRetry}
                        className={styles.retryButton}
                        disabled={retryCount >= MAX_RETRIES}
                      >
                        {retryCount >= MAX_RETRIES ? 'Máximo de reintentos alcanzado' : 'Reintentar'}
                      </button>
                      
                      <a 
                        href={calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.fallbackButton}
                      >
                        Abrir Calendly en Nueva Pestaña
                      </a>
                    </div>
                    
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
                  <div className={styles.loadingFallback}>
                    <div className={styles.loadingSpinner}></div>
                    <h3>Cargando calendario...</h3>
                    <p>Preparando tu experiencia de reserva personalizada</p>
                    <div className={styles.loadingFeatures}>
                      <div className={styles.loadingFeature}>📅 Horarios disponibles en tiempo real</div>
                      <div className={styles.loadingFeature}>🇪🇸 Configurado para España (GMT+1)</div>
                      <div className={styles.loadingFeature}>⚡ Confirmación automática</div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.widgetWrapper}>
                    <div 
                      className="calendly-inline-widget"
                      style={{ 
                        minWidth: '320px', 
                        height: '630px',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        border: 'none'
                      }}
                    />
                    <div className={styles.widgetOverlay} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={`${styles.benefits} ${isVisible ? styles.fadeInUp : ''}`}>
          <h3 className={styles.benefitsTitle}>¿Qué puedes esperar de nuestra llamada?</h3>
          <div className={styles.benefitsList}>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🎯</div>
              <div className={styles.benefitContent}>
                <h4>Análisis Personalizado</h4>
                <p>Evaluación gratuita de tu situación actual y identificación de oportunidades de crecimiento específicas para tu negocio</p>
              </div>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>💡</div>
              <div className={styles.benefitContent}>
                <h4>Estrategia Inicial</h4>
                <p>Recomendaciones específicas y accionables basadas en tu industria, objetivos y recursos disponibles</p>
              </div>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🚀</div>
              <div className={styles.benefitContent}>
                <h4>Plan de Acción</h4>
                <p>Próximos pasos claros y priorizados para comenzar tu transformación empresarial de manera efectiva</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.guarantee} ${isVisible ? styles.fadeInUp : ''}`}>
          <div className={styles.guaranteeContent}>
            <div className={styles.guaranteeIcon}>⏱️</div>
            <div className={styles.guaranteeText}>
              <h4 className={styles.guaranteeTitle}>Compromiso de 15 Minutos</h4>
              <p className={styles.guaranteeDescription}>
                Sin presión de ventas. Solo una conversación honesta y profesional sobre cómo podemos ayudarte a alcanzar tus objetivos empresariales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}