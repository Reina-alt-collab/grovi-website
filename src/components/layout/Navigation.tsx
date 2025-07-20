'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Navigation.module.css'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Add scrolled class for background change
      setIsScrolled(currentScrollY > 50)

      // Hide/show navigation on scroll (optional UX enhancement)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false) // Hide when scrolling down
      } else {
        setIsVisible(true) // Show when scrolling up
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    
    // Prevent body scroll when mobile menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    document.body.style.overflow = 'unset'
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href')
    if (href?.startsWith('#')) {
      e.preventDefault()
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70 // Account for fixed navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      }
      
      closeMobileMenu()
      
      // Track navigation clicks
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'navigation_click', {
          event_category: 'Navigation',
          event_label: targetId,
          section: targetId
        })
      }
    }
  }

  const handleCTAClick = () => {
    // Track CTA clicks
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cta_click', {
        event_category: 'Navigation',
        event_label: 'agendar_llamada',
        section: 'navigation'
      })
    }
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMobileMenuOpen && !target.closest(`.${styles.navigation}`)) {
        closeMobileMenu()
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen])

  return (
    <nav 
      className={`${styles.navigation} ${isScrolled ? styles.scrolled : ''} ${isVisible ? styles.visible : styles.hidden}`}
      role="navigation" 
      aria-label="Navegación principal"
    >
      <div className={styles.navContainer}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <Image
            src="/grovi-logo-removebg.png"
            alt="Logo de Grovi"
            width={120}
            height={35}
            className={styles.logo}
            priority
            sizes="120px"
            quality={90}
          />
        </div>

        {/* Desktop Navigation Menu */}
        <ul className={`${styles.navMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`} role="menubar">
          <li role="none">
            <a 
              href="#sobre-nosotros" 
              className={styles.navLink}
              onClick={handleNavClick}
              role="menuitem"
              tabIndex={isMobileMenuOpen ? 0 : undefined}
            >
              Sobre Nosotros
            </a>
          </li>
          <li role="none">
            <a 
              href="#casos-de-exito" 
              className={styles.navLink}
              onClick={handleNavClick}
              role="menuitem"
              tabIndex={isMobileMenuOpen ? 0 : undefined}
            >
              Casos de Éxito
            </a>
          </li>
          <li role="none">
            <a 
              href="#contacto" 
              className={styles.navLink}
              onClick={handleNavClick}
              role="menuitem"
              tabIndex={isMobileMenuOpen ? 0 : undefined}
            >
              Contacto
            </a>
          </li>
          <li role="none" className={styles.mobileCtaItem}>
            <a 
              href="#agendar" 
              className={`${styles.navCta} ${styles.mobileCtaButton}`}
              onClick={(e) => {
                handleNavClick(e)
                handleCTAClick()
              }}
              role="menuitem"
              tabIndex={isMobileMenuOpen ? 0 : undefined}
              aria-label="Agendar una llamada gratuita con Grovi"
            >
              Agendar Llamada
            </a>
          </li>
        </ul>

        {/* Desktop CTA Button */}
        <a 
          href="#agendar" 
          className={`${styles.navCta} ${styles.desktopCta}`}
          onClick={(e) => {
            handleNavClick(e)
            handleCTAClick()
          }}
          role="button"
          aria-label="Agendar una llamada gratuita con Grovi"
        >
          Agendar Llamada
        </a>

        {/* Mobile Menu Toggle */}
        <button 
          className={`${styles.mobileToggle} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className={styles.mobileOverlay}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  )
}

// Hook for navigation state management
export function useNavigation() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const navHeight = 80

    const observerOptions = {
      root: null,
      rootMargin: `-${navHeight}px 0px -50% 0px`,
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return { activeSection }
}

// Utility function for smooth scroll with offset
export function scrollToSection(sectionId: string, offset: number = 70) {
  const element = document.getElementById(sectionId)
  if (element) {
    const elementTop = element.offsetTop - offset
    window.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    })
  }
}