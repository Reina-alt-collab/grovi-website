'use client'

import { useEffect, useState } from 'react'
import styles from './Services.module.css'

export default function Services() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const services = [
    {
      icon: '🛠️',
      title: 'Operaciones de E-Commerce y Shopify',
      description: 'Optimización de workflows, SOPs y coordinación de tiendas digitales para generar eficiencia y resultados claros.'
    },
    {
      icon: '✉️',
      title: 'Automatización de Lifecycle y Emails',
      description: 'Diseño e implementación de flujos Klaviyo y carritos abandonados, enfocados en conversión y retención.'
    },
    {
      icon: '🤖',
      title: 'Operaciones Inteligentes con IA',
      description: 'Automatizaciones, dashboards operativos y herramientas de decisión basadas en datos para impulsar eficiencia y resultados.'
    }
  ]

  return (
    <section id="servicios" className={styles.services}>
      <div className="container">
        <div className={`${styles.header} ${mounted ? styles.fadeIn : ''}`}>
          <h2 className={styles.title}>Servicios / Capacidades</h2>
          <p className={styles.subtitle}>
            Tres áreas en las que entrego resultados medibles y automatización práctica
          </p>
        </div>

        <div className={`${styles.cards} ${mounted ? styles.fadeInUp : ''}`}>
          {services.map((service, index) => (
            <div key={service.title} className={styles.card} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={styles.icon}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}