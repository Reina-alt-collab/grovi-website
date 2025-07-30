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
  const consent = localStorage.getItem('grovi-cookie-consent')
  console.log('[CookieBanner] Current consent:', consent) // 🔍 Debug

  if (!consent) {
    console.log('[CookieBanner] Showing banner...')
    setShowBanner(true)
  } else if (consent === 'accepted') {
    console.log('[CookieBanner] Consent already accepted, applying...')
    grantAnalyticsConsent()
  }
}, [])

  const grantAnalyticsConsent = () => {
  const updateConsent = () => {
    try {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      })

    } catch (error) {
      console.error('Analytics consent update failed:', error)
    }
  }

  if (typeof window !== 'undefined') {
    if (typeof window.gtag === 'function') {
      updateConsent()
    } else {
      // Retry once after a short delay
      setTimeout(() => {
        if (typeof window.gtag === 'function') {
          updateConsent()
        }
      }, 1000)
    }
  }
}

  const handleAccept = () => {
  localStorage.setItem('grovi-cookie-consent', 'accepted')
  grantAnalyticsConsent()
  setShowBanner(false)

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'cookie_consent', {
      event_category: 'consent',
      event_label: 'accepted',
      value: 1
    })
  }
}

  const handleDecline = () => {
  localStorage.setItem('grovi-cookie-consent', 'declined')
  setShowBanner(false)

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'cookie_consent', {
      event_category: 'consent',
      event_label: 'declined',
      value: 0
    })
  }
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