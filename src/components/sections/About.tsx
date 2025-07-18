'use client'
import { useEffect, useState } from 'react'
import styles from './About.module.css'

export default function About() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: '🎯',
      title: 'Estrategia Personalizada',
      description: 'Soluciones únicas para cada cliente'
    },
    {
      icon: '🚀',
      title: 'Resultados Medibles',
      description: 'ROI comprobado y métricas claras'
    },
    {
      icon: '🤝',
      title: 'Soporte Continuo',
      description: 'Acompañamiento en cada paso'
    },
    {
      icon: '💡',
      title: 'Innovación Constante',
      description: 'Tecnología de vanguardia'
    }
  ]

  const handleScroll = (targetId: string) => {
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="sobre-nosotros" className={styles.about}>
      <div className={styles.container}>
        <div className={`${styles.header} ${mounted ? styles.fadeIn : ''}`}>
          <h2 className={styles.title}>Sobre Nosotros</h2>
          <p className={styles.subtitle}>
            Somos un equipo de expertos comprometidos con la excelencia y la innovación
          </p>
        </div>

        <div className={styles.content}>
          <div className={`${styles.textSection} ${mounted ? styles.fadeInLeft : ''}`}>
            <h3 className={styles.missionTitle}>Nuestra Misión</h3>
            <p className={styles.missionText}>
              En Grovi, creemos que cada empresa tiene un potencial único. Nuestra misión es descubrir ese potencial y transformarlo en resultados extraordinarios a través de estrategias personalizadas y soluciones innovadoras.
            </p>
            <p className={styles.missionText}>
              Trabajamos de cerca con nuestros clientes para entender sus desafíos específicos y desarrollar soluciones que no solo resuelvan problemas, sino que impulsen el crecimiento sostenible a largo plazo.
            </p>
            <button 
              className={styles.ctaButton}
              onClick={() => handleScroll('#casos-de-exito')}
            >
              Ver Resultados
            </button>
          </div>

          <div className={`${styles.featuresGrid} ${mounted ? styles.fadeInRight : ''}`}>
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className={styles.feature}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h4 className={styles.featureTitle}>{feature.title}</h4>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}