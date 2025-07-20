'use client'

import { useState, useEffect } from 'react'
import styles from './CookieBanner.module.css'

// Type for gtag function
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('grovi-cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else if (consent === 'accepted') {
      // User previously accepted - grant consent
      grantAnalyticsConsent()
    }
  }, [])

  const grantAnalyticsConsent = () => {
    // Check if gtag is available and is a function
    if (typeof window !== 'undefined' && 
        typeof window.gtag === 'function') {
      try {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted'
        })
      } catch (error) {
        console.log('Analytics consent update failed:', error)
      }
    } else {
      // If gtag isn't ready yet, try again after a short delay
      setTimeout(() => {
        if (typeof window.gtag === 'function') {
          try {
            window.gtag('consent', 'update', {
              'analytics_storage': 'granted',
              'ad_storage': 'granted'
            })
          } catch (error) {
            console.log('Analytics consent update failed (delayed):', error)
          }
        }
      }, 1000)
    }
  }

  const handleAccept = () => {
    localStorage.setItem('grovi-cookie-consent', 'accepted')
    grantAnalyticsConsent()
    setShowBanner(false)
  }

  const handleDecline = () => {
    localStorage.setItem('grovi-cookie-consent', 'declined')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className={styles.cookieBanner}>
      <div className={styles.cookieContent}>
        <div className={styles.cookieText}>
          <span>🍪 Utilizamos cookies para mejorar tu experiencia.</span>
          <a href="/politica-privacidad" className={styles.policyLink}>
            Más info
          </a>
        </div>
        <div className={styles.cookieActions}>
          <button onClick={handleDecline} className={styles.declineBtn}>
            Rechazar
          </button>
          <button onClick={handleAccept} className={styles.acceptBtn}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}