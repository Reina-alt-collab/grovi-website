'use client'
import { useEffect, useState, useCallback, useMemo } from 'react'
import styles from './CaseStudies.module.css'

// Import analytics for tracking
import { trackButtonClick, trackScroll } from '../../lib/analytics'

// 🔧 FIX 3: TypeScript Interface para type safety
interface CaseStudy {
  number: string
  title: string
  description: string
  detailedDescription: string
  industry: string
  timeline: string
  challenges: string[]
  solutions: string[]
  featured: boolean
  icon: string
}

export default function CaseStudies() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  // 🔧 FIX 2: Intersection Observer state
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {

    // Detect mobile device
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // 🔧 FIX 2: Intersection Observer para animaciones optimizadas
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    const section = document.querySelector('#casos-de-exito')
    if (section) observer.observe(section)
    
    return () => observer.disconnect()
  }, [])

  // 🔧 FIX 1: useCallback para optimizar handlers
  const handleScroll = useCallback((targetId: string) => {
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      
      // Track scroll event
      trackScroll(targetId.replace('#', ''))
    }
  }, [])

  const handleCtaClick = useCallback(() => {
    trackButtonClick('Descubre Cómo', 'Casos de Éxito')
    handleScroll('#agendar')
  }, [handleScroll])

  const handleCardInteraction = useCallback((index: number) => {
    if (isMobile) {
      setActiveCard(activeCard === index ? null : index)
    }
  }, [isMobile, activeCard])

  // 🔧 FIX 1: useMemo para optimizar data y evitar re-renders
  const caseStudies: CaseStudy[] = useMemo(() => [
    {
      number: '40%',
      title: 'Incremento en Ingresos',
      description: 'Ayudamos a una empresa de tecnología a reestructurar su estrategia de marketing digital y optimizar sus procesos de ventas, resultando en un incremento del 40% en sus ingresos en solo 6 meses.',
      detailedDescription: 'Mediante análisis profundo de datos, optimización de embudos de conversión y implementación de automatización de marketing, logramos transformar completamente el modelo de negocio del cliente.',
      industry: 'Tecnología',
      timeline: '6 meses',
      challenges: ['Baja conversión', 'Procesos manuales', 'Falta de datos'],
      solutions: ['Marketing automation', 'CRM integration', 'Data analytics'],
      featured: true,
      icon: '🚀'
    },
    {
      number: '100%',
      title: 'Crecimiento en Leads',
      description: 'Implementamos una estrategia de marketing digital integral que triplicó la generación de leads cualificados para una empresa de servicios profesionales.',
      detailedDescription: 'Creamos una estrategia omnicanal que incluía SEO, content marketing, social media y PPC, resultando en un crecimiento sostenible de leads cualificados.',
      industry: 'Servicios',
      timeline: '4 meses',
      challenges: ['Pocos leads', 'Baja calidad', 'Alto costo por lead'],
      solutions: ['SEO optimization', 'Content strategy', 'Lead scoring'],
      featured: false,
      icon: '📈'
    },
    {
      number: '85%',
      title: 'Mejora en Eficiencia',
      description: 'Automatización de procesos empresariales que redujo costos operativos y mejoró la eficiencia general de una empresa manufacturera.',
      detailedDescription: 'Implementamos sistemas de gestión automatizados, workflows optimizados y dashboards en tiempo real para monitorear y mejorar la productividad.',
      industry: 'Manufactura',
      timeline: '8 meses',
      challenges: ['Procesos lentos', 'Errores manuales', 'Falta de visibilidad'],
      solutions: ['Process automation', 'Real-time monitoring', 'Quality systems'],
      featured: false,
      icon: '⚙️'
    }
  ], [])

  return (
    <section id="casos-de-exito" className={styles.caseStudies}>
      <div className={styles.container}>
        {/* 🔧 FIX 2: Usar isVisible en lugar de mounted para animaciones */}
        <div className={`${styles.header} ${isVisible ? styles.fadeIn : ''}`}>
          <h2 className={styles.title}>Casos de Éxito Destacados</h2>
          <p className={styles.subtitle}>
            Descubre cómo ayudamos a nuestros clientes a alcanzar resultados extraordinarios
          </p>
        </div>

        <div className={styles.studiesGrid}>
          {caseStudies.map((study, index) => (
            <div 
              key={study.title}
              className={`
                ${styles.studyCard} 
                ${study.featured ? styles.featured : ''} 
                ${isVisible ? styles.slideUp : ''}
                ${activeCard === index ? styles.active : ''}
                ${isMobile ? styles.mobileCard : ''}
              `}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => handleCardInteraction(index)}
              role={isMobile ? 'button' : 'article'}
              tabIndex={isMobile ? 0 : undefined}
              aria-expanded={isMobile ? activeCard === index : undefined}
            >
              <div className={styles.cardHeader}>
                <div className={styles.studyIcon}>{study.icon}</div>
                <div className={styles.studyNumber}>{study.number}</div>
              </div>
              
              <h3 className={styles.studyTitle}>{study.title}</h3>
              
              <p className={styles.studyDescription}>
                {activeCard === index && isMobile ? study.detailedDescription : study.description}
              </p>
              
              {/* Mobile: Show expanded content when active */}
              {isMobile && activeCard === index && (
                <div className={styles.expandedContent}>
                  <div className={styles.challengesSolutions}>
                    <div className={styles.challenges}>
                      <h4>🎯 Desafíos:</h4>
                      <ul>
                        {study.challenges.map((challenge, i) => (
                          <li key={i}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.solutions}>
                      <h4>✅ Soluciones:</h4>
                      <ul>
                        {study.solutions.map((solution, i) => (
                          <li key={i}>{solution}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Desktop: Always show meta info */}
              {!isMobile && (
                <div className={styles.studyMeta}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Industria:</span>
                    <span className={styles.metaValue}>{study.industry}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Tiempo:</span>
                    <span className={styles.metaValue}>{study.timeline}</span>
                  </div>
                </div>
              )}

              {/* Mobile: Show meta in collapsed state */}
              {isMobile && (
                <div className={styles.mobileMetaRow}>
                  <span className={styles.mobileMetaItem}>
                    <span className={styles.metaIcon}>🏢</span>
                    {study.industry}
                  </span>
                  <span className={styles.mobileMetaItem}>
                    <span className={styles.metaIcon}>⏱️</span>
                    {study.timeline}
                  </span>
                  <span className={styles.expandIndicator}>
                    {activeCard === index ? '−' : '+'}
                  </span>
                </div>
              )}

              {study.featured && (
                <div className={styles.featuredBadge}>
                  ⭐ Caso Destacado
                </div>
              )}

              {/* Mobile tap hint */}
              {isMobile && activeCard !== index && (
                <div className={styles.tapHint}>
                  Toca para ver más detalles
                </div>
              )}
            </div>
          ))}
        </div>


        <div className={`${styles.ctaSection} ${isVisible ? styles.fadeInUp : ''}`}>
          <h3 className={styles.ctaTitle}>¿Listo para ser nuestro próximo caso de éxito?</h3>
          <p className={styles.ctaText}>
            Conversemos sobre cómo podemos impulsar el crecimiento de tu negocio con estrategias probadas.
          </p>
          <button 
            className={styles.ctaButton}
            onClick={handleCtaClick}
          >
            <span className={styles.buttonText}>Descubre Cómo</span>
            <span className={styles.buttonIcon}>🚀</span>
          </button>
        </div>
      </div>
    </section>
  )
}
