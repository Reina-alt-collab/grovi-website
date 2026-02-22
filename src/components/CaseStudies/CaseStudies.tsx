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

// Animated counter
const AnimatedCounter = ({ end, suffix = '', prefix = '', duration = 2000, startCounting }: CounterProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startCounting) return
    let startTime = 0
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))
      if (progress < 1) animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, startCounting])

  return <span className={styles.caseStudyNumber}>{prefix}{count}{suffix}</span>
}

// Main Case Studies section
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
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleCTAClick = () => {
    onCTAClick('descubre_como', 'case_studies')
  }

  return (
    <section ref={sectionRef} id="casos-de-exito" className={`section ${styles.caseStudies}`}>
      <div className="container">
        {/* Section Header */}
        <div className={`section-header ${styles.sectionHeader}`}>
          <h2 className={`section-title fade-in ${isInView ? 'visible' : ''}`} id="casestudies-title">
            Proyectos y Resultados
          </h2>
          <p className={`section-subtitle fade-in ${isInView ? 'visible' : ''}`}>
            Ejemplos de flujos, automatizaciones y optimizaciones que implementé para generar resultados medibles
          </p>
        </div>

        {/* Portfolio Metrics Card */}
        <div className={`${styles.caseStudyCard} fade-in ${isInView ? 'visible' : ''}`}>
          <div className={styles.metricContainer}>
            <AnimatedCounter end={40} suffix="%" startCounting={startCounting} />
            <div className={styles.metricLabel}>Incremento en ingresos</div>
          </div>

          <div className={styles.caseStudyContent}>
            <h3 className={styles.caseStudyTitle}>Flujos de Klaviyo y Automatización</h3>

            <div className={styles.clientInfo}>
              <div className={styles.clientLogo}>
                <span>GF</span>
              </div>
              <div className={styles.clientDetails}>
                <h4>Grovi / Portfolio</h4>
                <p>Optimización y automatización de flujos e-commerce</p>
              </div>
            </div>

            <p className={styles.caseStudyDescription}>
              Implementé un flujo de bienvenida con 3 emails y un flujo de carrito abandonado, 
              integrando automatizaciones y métricas claras que proyectan un incremento del 40% en ingresos y leads más cualificados en 6 meses.
            </p>

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
                <span className={styles.metricText}>Meses para resultados</span>
              </div>
            </div>

            <blockquote className={styles.testimonial}>
              <p>
                &quot;Andreina optimizó nuestros flujos y aumentó nuestros ingresos de manera clara y medible.&quot;
              </p>
              <cite>
                <strong>Autoevaluación / Portfolio</strong>
              </cite>
            </blockquote>

            <div className={styles.ctaContainer}>
              <a
                href="#contacto"
                className={`btn btn-primary ${styles.ctaButton}`}
                onClick={handleCTAClick}
                role="button"
                aria-label="Descubre cómo Andreina puede ayudarte"
              >
                Descubre Cómo
              </a>
            </div>
          </div>
        </div>

        {/* Process Overview */}
        <div className={`${styles.processSection} fade-in ${isInView ? 'visible' : ''}`}>
          <h3 className={styles.processTitle}>Mi Proceso de Trabajo</h3>
          <div className={styles.processSteps}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h4>Evaluación Operativa</h4>
                <p>Analizo flujos existentes y sistemas para detectar oportunidades de mejora</p>
              </div>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h4>Diseño de Automatización</h4>
                <p>Creo flujos y sistemas automatizados para aumentar eficiencia y conversiones</p>
              </div>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h4>Implementación</h4>
                <p>Integro y ejecuto las soluciones en Shopify, Klaviyo y otros sistemas</p>
              </div>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h4>Resultados Medibles</h4>
                <p>Monitoreo métricas clave y optimizo continuamente para maximizar ingresos y eficiencia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}