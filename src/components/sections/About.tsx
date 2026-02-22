'use client'
import { useEffect, useState } from 'react'
import styles from './About.module.css'

export default function About() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="sobre-nosotros" className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sobre Mi</h2>
        <p className={styles.subtitle}>
          Soy Andreina Fernandez, especializada en optimización de operaciones y flujos de e-commerce para tiendas Shopify y negocios digitales.
        </p>
        {/* Add features / metrics here */}
      </div>
    </section>
  )
}