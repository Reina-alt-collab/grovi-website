'use client'
import { useEffect, useState } from 'react'
import styles from './ContactForm.module.css'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

export default function ContactForm() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    setMounted(true)
  }, [])

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
        return !value.trim() ? 'El nombre es requerido' : ''
      case 'lastName':
        return !value.trim() ? 'El apellido es requerido' : ''
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value.trim()) return 'El email es requerido'
        if (!emailRegex.test(value)) return 'Ingresa un email válido'
        return ''
      case 'subject':
        return !value.trim() ? 'El asunto es requerido' : ''
      case 'message':
        return !value.trim() ? 'El mensaje es requerido' : ''
      case 'phone':
        if (value && !/^[\+]?[0-9\s\-\(\)]+$/.test(value)) {
          return 'Ingresa un teléfono válido'
        }
        return ''
      default:
        return ''
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors: FormErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData])
      if (error) newErrors[key] = error
    })

    setErrors(newErrors)

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Log form data (replace with actual submission)
      console.log('Form submitted:', formData)
      
      setSubmitStatus('success')
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleScroll = (targetId: string) => {
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="contacto" className={styles.contact}>
      <div className={styles.container}>
        <div className={`${styles.header} ${mounted ? styles.fadeIn : ''}`}>
          <h2 className={styles.title}>Contacto</h2>
          <p className={styles.subtitle}>
            Conversemos sobre tu proyecto y cómo podemos ayudarte
          </p>
        </div>

        <div className={styles.contentGrid}>
          {/* Contact Form */}
          <div className={`${styles.formSection} ${mounted ? styles.fadeInLeft : ''}`}>
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Envíanos un mensaje</h3>
              
              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>✅</div>
                  <strong>¡Mensaje enviado con éxito!</strong>
                  <p>Nos pondremos en contacto contigo muy pronto.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                  <div className={styles.errorIcon}>⚠️</div>
                  <strong>Error al enviar el mensaje.</strong>
                  <p>Por favor, inténtalo de nuevo o contáctanos directamente.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName" className={styles.label}>Nombre *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.firstName && <span className={styles.fieldError}>{errors.firstName}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName" className={styles.label}>Apellido *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.lastName && <span className={styles.fieldError}>{errors.lastName}</span>}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>Teléfono</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+34 XXX XXX XXX"
                      className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="company" className={styles.label}>Empresa</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={styles.input}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>Asunto *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`${styles.select} ${errors.subject ? styles.inputError : ''}`}
                    disabled={isSubmitting}
                  >
                    <option value="">Selecciona un tema</option>
                    <option value="consultation">Consulta general</option>
                    <option value="services">Información sobre servicios</option>
                    <option value="quote">Solicitar presupuesto</option>
                    <option value="partnership">Oportunidad de colaboración</option>
                    <option value="support">Soporte técnico</option>
                    <option value="other">Otro tema</option>
                  </select>
                  {errors.subject && <span className={styles.fieldError}>{errors.subject}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Mensaje *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Cuéntanos sobre tu proyecto o consulta..."
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.message && <span className={styles.fieldError}>{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting && <div className={styles.spinner}></div>}
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className={`${styles.infoSection} ${mounted ? styles.fadeInRight : ''}`}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Información de contacto</h3>
              
              <div className={styles.contactMethods}>
                <div className={styles.contactMethod}>
                  <div className={styles.methodIcon}>📧</div>
                  <div className={styles.methodContent}>
                    <h4>Email</h4>
                    <a href="mailto:soporte@grovi.net" className={styles.contactLink}>
                      soporte@grovi.net
                    </a>
                  </div>
                </div>
                
                <div className={styles.contactMethod}>
                  <div className={styles.methodIcon}>📱</div>
                  <div className={styles.methodContent}>
                    <h4>Teléfono</h4>
                    <a href="tel:+34695920917" className={styles.contactLink}>
                      +34 695 920 917
                    </a>
                  </div>
                </div>
                
                <div className={styles.contactMethod}>
                  <div className={styles.methodIcon}>🌍</div>
                  <div className={styles.methodContent}>
                    <h4>Ubicación</h4>
                    <span className={styles.contactText}>Málaga, España</span>
                  </div>
                </div>
              </div>

              <div className={styles.calendaryCta}>
                <h4 className={styles.ctaTitle}>¿Prefieres una llamada?</h4>
                <p className={styles.ctaText}>
                  Agenda una llamada de 15 minutos para hablar directamente
                </p>
                <button 
                  className={styles.ctaButton}
                  onClick={() => handleScroll('#agendar')}
                >
                  Agendar Llamada
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}