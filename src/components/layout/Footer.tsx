'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer() {
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

  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { label: 'Sobre Nosotros', href: '#sobre-nosotros' },
      { label: 'Casos de Éxito', href: '#casos-de-exito' },
      { label: 'Nuestro Equipo', href: '#sobre-nosotros' }
    ],
    services: [
      { label: 'Consultoría Empresarial', href: '#contacto' },
      { label: 'Estrategia Digital', href: '#contacto' },
      { label: 'Optimización de Procesos', href: '#contacto' }
    ],
    contact: [
      { label: 'Agendar Llamada', href: '#agendar' },
      { label: 'Enviar Mensaje', href: '#contacto' },
      { label: 'Soporte', href: 'mailto:soporte@grovi.net' }
    ]
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={`${styles.footerContent} ${mounted ? styles.fadeIn : ''}`}>
          {/* Logo and Description */}
          <div className={styles.brandSection}>
  <div className={styles.logoContainer}>
    <Image
      src="/grovi-logo-removebg.png"
      alt="Logo de Grovi"
      width={120}
      height={40}
      className={styles.logo}
      priority={false}
    />
  </div>
  <p className={styles.brandDescription}>
    Transformamos tu visión en resultados tangibles con estrategias innovadoras y soluciones personalizadas que impulsan el crecimiento de tu negocio.
  </p>
  <div className={styles.contactInfo}>
    <div className={styles.contactItem}>
      <span className={styles.contactIcon}>📧</span>
      <a href="mailto:soporte@grovi.net" className={styles.contactLink}>
        soporte@grovi.net
      </a>
    </div>
    <div className={styles.contactItem}>
      <span className={styles.contactIcon}>📱</span>
      <a href="tel:+34695920917" className={styles.contactLink}>
        +34 695 920 917
      </a>
    </div>
    <div className={styles.contactItem}>
      <span className={styles.contactIcon}>🌍</span>
      <span className={styles.contactText}>Málaga, España</span>
    </div>
  </div>
</div>

          {/* Company Links */}
          <div className={styles.linkSection}>
            <h4 className={styles.linkTitle}>Empresa</h4>
            <ul className={styles.linkList}>
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleScroll(link.href)}
                    className={styles.footerLink}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className={styles.linkSection}>
            <h4 className={styles.linkTitle}>Servicios</h4>
            <ul className={styles.linkList}>
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleScroll(link.href)}
                    className={styles.footerLink}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div className={styles.linkSection}>
            <h4 className={styles.linkTitle}>Contacto</h4>
            <ul className={styles.linkList}>
              {footerLinks.contact.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('mailto:') ? (
                    <a href={link.href} className={styles.footerLink}>
                      {link.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => handleScroll(link.href)}
                      className={styles.footerLink}
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`${styles.ctaSection} ${mounted ? styles.fadeInUp : ''}`}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>¿Listo para impulsar tu negocio?</h3>
            <p className={styles.ctaText}>
              Conversemos sobre cómo podemos ayudarte a alcanzar tus objetivos empresariales.
            </p>
            <div className={styles.ctaButtons}>
              <button 
                onClick={() => handleScroll('#agendar')}
                className={styles.primaryCta}
              >
                Agendar Llamada Gratuita
              </button>
              <button 
                onClick={() => handleScroll('#contacto')}
                className={styles.secondaryCta}
              >
                Enviar Mensaje
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright Only */}
        <div className={`${styles.bottomBar} ${mounted ? styles.fadeInUp : ''}`}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © {currentYear} Grovi. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}