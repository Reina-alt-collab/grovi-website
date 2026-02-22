'use client'

import { useEffect, useState } from 'react'
import styles from './Hero.module.css'

interface HeroProps {
  onCTAClick: (ctaType: string, section: string) => void
}

export default function Hero({ onCTAClick }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handlePrimaryClick = () => {
    onCTAClick('agendar_llamada', 'hero')
  }

  const handleSecondaryClick = () => {
    onCTAClick('conocer_mas', 'hero')
  }

  return (
    <section className={styles.hero} id="hero">
      {/* Animated Background */}
      <div className={styles.heroBackground}></div>
      <div className="container">
        <div className={styles.heroContainer}>
          {/* Hero Content */}
          <div className={`${styles.heroContent} ${isLoaded ? styles.slideInLeft : ''}`}>
            <h1 className={styles.heroTitle}>
              Optimizo operaciones y flujos de e-commerce para generar resultados
            </h1>
            <p className={styles.heroSubtitle}>
              Automatización inteligente, sistemas de ingresos y gestión operativa para tiendas Shopify y negocios digitales
            </p>
            <div className={styles.heroActions}>
              <a
                href="#contacto"
                className={`btn btn-primary ${styles.primaryButton}`}
                onClick={handlePrimaryClick}
                role="button"
                aria-label="Agendar una llamada para conocer más sobre Andreina"
              >
                Trabajemos juntas
              </a>
              <a
                href="#sobre-mi"
                className={`btn btn-secondary ${styles.secondaryButton}`}
                onClick={handleSecondaryClick}
                role="button"
                aria-label="Conocer más sobre los servicios de Andreina"
              >
                Conocer Más
              </a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className={`${styles.heroVisual} ${isLoaded ? styles.slideInRight : ''}`}>
            <div className={styles.heroGraphic} role="img" aria-label="Gráfico representativo de optimización de e-commerce">
              <div className={styles.heroGraphicInner}></div>
              <div className={styles.heroGraphicIcon}>📈</div>
            </div>

            {/* Floating Elements */}
            <div className={styles.floatingElements}>
              <div className={`${styles.floatingElement} ${styles.element1}`}>💡</div>
              <div className={`${styles.floatingElement} ${styles.element2}`}>🚀</div>
              <div className={`${styles.floatingElement} ${styles.element3}`}>📊</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollArrow}></div>
      </div>
    </section>
  )
}
