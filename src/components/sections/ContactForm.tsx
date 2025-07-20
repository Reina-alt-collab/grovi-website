'use client'

import { useEffect, useRef, useState } from 'react'
import { trackFormSubmission, trackCTAClick } from '@/lib/analytics'
import styles from './ContactForm.module.css'

interface ContactFormProps {
  onFormSubmit: (formType: string) => void
  onCTAClick: (ctaType: string, section: string) => void
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
}

export default function ContactForm({ onFormSubmit, onCTAClick }: ContactFormProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '', lastName: '', email: '', phone: '', company: '', subject: '', message: ''
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return !value.trim() ? 'Este campo es requerido' : ''
      case 'email':
        if (!value.trim()) return 'Este campo es requerido'
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Email inválido' : ''
      case 'phone':
        return value && !/^[\+]?[0-9\s\-\(\)]+$/.test(value) ? 'Teléfono inválido' : ''
      case 'subject':
        return !value ? 'Selecciona un asunto' : ''
      case 'message':
        return !value.trim() ? 'Este campo es requerido' : ''
      default:
        return ''
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData])
      if (error) {
        newErrors[key] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(false)
    setShowError(false)

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      onFormSubmit('contact_form')
      trackFormSubmission('contact_form', 'website')
      setShowSuccess(true)
      setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', subject: '', message: '' })
      setErrors({})
    } catch (error) {
      setShowError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCalendlyCTAClick = () => {
    onCTAClick('agendar_llamada', 'contact_form')
    trackCTAClick('agendar_llamada', 'contact_form', '#agendar')
  }

  return (
    <section ref={sectionRef} id="contacto" className={`section ${styles.contactSection}`}>
      <div className="container">
        <div className={`section-header ${styles.sectionHeader}`}>
          <h2 className={`section-title fade-in ${isInView ? 'visible' : ''}`}>
            Contacto
          </h2>
          <p className={`section-subtitle fade-in ${isInView ? 'visible' : ''}`}>
            Conversemos sobre tu proyecto y cómo podemos ayudarte
          </p>
        </div>
        
        <div className={styles.contactGrid}>
          <div className={`${styles.contactForm} fade-in ${isInView ? 'visible' : ''}`}>
            <h3 className={styles.formTitle}>Envíanos un mensaje</h3>
            
            {showSuccess && (
              <div className={styles.formSuccess}>
                <strong>¡Mensaje enviado con éxito!</strong><br />
                Nos pondremos en contacto contigo muy pronto.
              </div>
            )}
            
            {showError && (
              <div className={styles.formError}>
                <strong>Error al enviar el mensaje.</strong><br />
                Por favor, inténtalo de nuevo o contáctanos directamente.
              </div>
            )}
            
            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName" className={styles.formLabel}>Nombre *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={`${styles.formInput} ${errors.firstName ? styles.error : ''}`}
                    required
                  />
                  {errors.firstName && <div className={styles.fieldError}>{errors.firstName}</div>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="lastName" className={styles.formLabel}>Apellido *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={`${styles.formInput} ${errors.lastName ? styles.error : ''}`}
                    required
                  />
                  {errors.lastName && <div className={styles.fieldError}>{errors.lastName}</div>}
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
                  required
                />
                {errors.email && <div className={styles.fieldError}>{errors.email}</div>}
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={`${styles.formInput} ${errors.phone ? styles.error : ''}`}
                    placeholder="+34 XXX XXX XXX"
                  />
                  {errors.phone && <div className={styles.fieldError}>{errors.phone}</div>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="company" className={styles.formLabel}>Empresa</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={styles.formInput}
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.formLabel}>Asunto *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`${styles.formSelect} ${errors.subject ? styles.error : ''}`}
                  required
                >
                  <option value="">Selecciona un tema</option>
                  <option value="consultation">Consulta general</option>
                  <option value="services">Información sobre servicios</option>
                  <option value="quote">Solicitar presupuesto</option>
                  <option value="partnership">Oportunidad de colaboración</option>
                  <option value="other">Otro tema</option>
                </select>
                {errors.subject && <div className={styles.fieldError}>{errors.subject}</div>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`${styles.formTextarea} ${errors.message ? styles.error : ''}`}
                  placeholder="Cuéntanos sobre tu proyecto o consulta..."
                  required
                />
                {errors.message && <div className={styles.fieldError}>{errors.message}</div>}
              </div>
              
              <button type="submit" className={styles.formSubmit} disabled={isSubmitting}>
                {isSubmitting && <span className={styles.loadingSpinner}></span>}
                <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}</span>
              </button>
            </form>
          </div>
          
          <div className={`${styles.contactInfo} fade-in ${isInView ? 'visible' : ''}`}>
            <h3 className={styles.infoTitle}>Información de contacto</h3>
            
            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <div className={styles.contactDetails}>
                  <h4>Email</h4>
                  <p>
                    <a href="mailto:soporte@grovi.net" className={styles.contactLink}>
                      soporte@grovi.net
                    </a>
                  </p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📱</span>
                <div className={styles.contactDetails}>
                  <h4>Teléfono</h4>
                  <p>
                    <a href="tel:+34695920917" className={styles.contactLink}>
                      +34 695 920 917
                    </a>
                  </p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>🌍</span>
                <div className={styles.contactDetails}>
                  <h4>Ubicación</h4>
                  <p>Málaga, España</p>
                </div>
              </div>
            </div>
            
            <div className={styles.contactCta}>
              <h4>¿Prefieres una llamada?</h4>
              <p>Agenda una llamada de 15 minutos para hablar directamente</p>
              <a 
                href="#agendar" 
                className={styles.ctaButton}
                onClick={handleCalendlyCTAClick}
              >
                Agendar Llamada
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}