'use client'
import { useEffect, useState } from 'react'
import styles from './CaseStudies.module.css'

export default function CaseStudies() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleScroll = (targetId: string) => {
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const caseStudies = [
    {
      number: '40%',
      title: 'Incremento en Ingresos',
      description: 'Ayudamos a una empresa de tecnología a reestructurar su estrategia de marketing digital y optimizar sus procesos de ventas, resultando en un incremento del 40% en sus ingresos en solo 6 meses.',
      industry: 'Tecnología',
      timeline: '6 meses',
      featured: true
    },
    {
      number: '150%',
      title: 'Crecimiento en Leads',
      description: 'Implementamos una estrategia de marketing digital integral que triplicó la generación de leads cualificados para una empresa de servicios profesionales.',
      industry: 'Servicios',
      timeline: '4 meses',
      featured: false
    },
    {
      number: '85%',
      title: 'Mejora en Eficiencia',
      description: 'Automatización de procesos empresariales que redujo costos operativos y mejoró la eficiencia general de una empresa manufacturera.',
      industry: 'Manufactura',
      timeline: '8 meses',
      featured: false
    }
  ]

  return (
    <section id="casos-de-exito" className={styles.caseStudies}>
      <div className={styles.container}>
        <div className={`${styles.header} ${mounted ? styles.fadeIn : ''}`}>
          <h2 className={styles.title}>Casos de Éxito Destacados</h2>
          <p className={styles.subtitle}>
            Descubre cómo ayudamos a nuestros clientes a alcanzar resultados extraordinarios
          </p>
        </div>

        <div className={styles.studiesGrid}>
          {caseStudies.map((study, index) => (
            <div 
              key={study.title}
              className={`${styles.studyCard} ${study.featured ? styles.featured : ''} ${mounted ? styles.slideUp : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={styles.studyNumber}>{study.number}</div>
              <h3 className={styles.studyTitle}>{study.title}</h3>
              <p className={styles.studyDescription}>{study.description}</p>
              
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

              {study.featured && (
                <div className={styles.featuredBadge}>
                  ⭐ Caso Destacado
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={`${styles.ctaSection} ${mounted ? styles.fadeInUp : ''}`}>
          <h3 className={styles.ctaTitle}>¿Listo para ser nuestro próximo caso de éxito?</h3>
          <p className={styles.ctaText}>
            Conversemos sobre cómo podemos impulsar el crecimiento de tu negocio con estrategias probadas.
          </p>
          <button 
            className={styles.ctaButton}
            onClick={() => handleScroll('#agendar')}
          >
            Descubre Cómo
          </button>
        </div>
      </div>
    </section>
  )
}