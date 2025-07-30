'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './CaseStudies.module.css'

interface CaseStudiesProps {
  onCTAClick: (ctaType: string, section: string) => void
}

interface CounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  startCounting: boolean
}

const AnimatedCounter = ({ end, suffix = '', prefix = '', duration = 2000, startCounting }: CounterProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startCounting) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, startCounting])

  return (
    <span className={styles.caseStudyNumber}>
      {prefix}{count}{suffix}
    </span>
  )
}

export default function CaseStudies({ onCTAClick }: CaseStudiesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [startCounting, setStartCounting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      setIsInView(true)
      setTimeout(() => setStartCounting(true), 500)
    }
  },
  {
    threshold: 0.1, // smaller threshold means easier to trigger
    rootMargin: '0px 0px -10% 0px', // helps trigger earlier on mobile
  }
)

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
  const timeout = setTimeout(() => {
    if (!isInView && window.innerWidth < 768) {
      setIsInView(true)
      setStartCounting(true)
    }
  }, 2000)

  return () => clearTimeout(timeout)
}, [isInView])

  const handleCTAClick = () => {
    onCTAClick('descubre_como', 'case_studies')
  }

  return (
    <section 
      ref={sectionRef}
      id="casos-de-exito" 
      className={`section ${styles.caseStudies}`}
      aria-labelledby="casestudies-title"
    >
      <div className="container">
        {/* Section Header */}
        <div className={`section-header ${styles.sectionHeader}`}>
          <h2 
            id="casestudies-title"
            className={`section-title fade-in ${isInView ? 'visible' : ''}`}
          >
            Casos de Éxito Destacados
          </h2>
          <p className={`section-subtitle fade-in ${isInView ? 'visible' : ''}`}>
            Descubre cómo ayudamos a nuestros clientes a alcanzar resultados extraordinarios
          </p>
        </div>
        
        {/* Main Case Study Card */}
        <div className={`${styles.caseStudyCard} fade-in ${isInView ? 'visible' : ''}`}>
          {/* Success Metric */}
          <div className={styles.metricContainer}>
            <AnimatedCounter 
              end={40}
              suffix="%"
              duration={2500}
              startCounting={startCounting}
            />
            <div className={styles.metricLabel}>Incremento en Ingresos</div>
          </div>
          
          {/* Case Study Content */}
          <div className={styles.caseStudyContent}>
            <h3 className={styles.caseStudyTitle}>
              Transformación Digital Exitosa
            </h3>
            
            <div className={styles.clientInfo}>
              <div className={styles.clientLogo}>
                <span>TF</span>
              </div>
              <div className={styles.clientDetails}>
                <h4>TechPet Solutions</h4>
                <p>Soluciones tecnológicas para mascotas</p>
              </div>
            </div>
            
            <p className={styles.caseStudyDescription}>
              Ayudamos a TechPet, una empresa especializada en soluciones tecnológicas para mascotas, 
              a reestructurar su estrategia de marketing digital y optimizar sus procesos de ventas, 
              resultando en un incremento del 40% en sus ingresos en solo 6 meses.
            </p>
            
            {/* Additional Metrics */}
            <div className={styles.additionalMetrics}>
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>65%</span>
                <span className={styles.metricText}>Más leads cualificados</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>50%</span>
                <span className={styles.metricText}>Reducción tiempo de conversión</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>6</span>
                <span className={styles.metricText}>Meses para lograr resultados</span>
              </div>
            </div>
            
            {/* Testimonial */}
            <blockquote className={styles.testimonial}>
              <p>
                &quot;Grovi nos ayudó a aumentar nuestras ventas en un 40%, después de haber probado varias agencias de marketing.&quot;
              </p>
              <cite>
                <strong>María González</strong><br />
                <span>CEO, TechPet Solutions</span>
              </cite>
            </blockquote>
            
            {/* CTA Button */}
            <div className={styles.ctaContainer}>
              <a 
                href="#agendar" 
                className={`btn btn-primary ${styles.ctaButton}`}
                onClick={handleCTAClick}
                role="button"
                aria-label="Descubre cómo Grovi puede ayudar a tu empresa"
              >
                Descubre Cómo
              </a>
            </div>
          </div>
        </div>

        {/* Process Overview */}
        <div className={`${styles.processSection} fade-in ${isInView ? 'visible' : ''}`}>
          <h3 className={styles.processTitle}>Nuestro Proceso Probado</h3>
          
          <div className={styles.processSteps}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h4>Análisis Profundo</h4>
                <p>Evaluamos tu situación actual y identificamos oportunidades de mejora</p>
              </div>
            </div>
            
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h4>Estrategia Personalizada</h4>
                <p>Desarrollamos un plan específico adaptado a tus necesidades y objetivos</p>
              </div>
            </div>
            
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h4>Implementación Ágil</h4>
                <p>Ejecutamos la estrategia con metodologías probadas y seguimiento continuo</p>
              </div>
            </div>
            
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h4>Resultados Medibles</h4>
                <p>Monitoreamos el progreso y optimizamos para maximizar el ROI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Additional hook for scroll-triggered animations
export function useScrollAnimation(threshold: number = 0.3) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
