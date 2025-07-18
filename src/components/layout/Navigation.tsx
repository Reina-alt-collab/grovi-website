'use client'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Sobre Nosotros', href: '#sobre-nosotros' },
  { label: 'Casos de Éxito', href: '#casos-de-exito' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          background: scrolled ? 'rgba(248, 245, 241, 0.98)' : 'rgba(248, 245, 241, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(217, 166, 161, 0.1)',
          zIndex: 1000,
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            height: '60px',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
          }}
        >
          {/* Logo */}
          <div>
            <img
              src="/grovi-logo-removebg.png"
              alt="Logo de Grovi"
              style={{
                height: '35px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>

          {/* Desktop Menu */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '2rem' }}>
              {navItems.map((item) => (
                <div
                  key={item.href}
                  style={{
                    fontWeight: '500',
                    color: '#242424',
                    cursor: 'pointer',
                    position: 'relative',
                    padding: '0.5rem 0',
                  }}
                  onClick={() => handleNavClick(item.href)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F07255'
                    const underline = e.currentTarget.querySelector('.nav-underline') as HTMLElement
                    if (underline) underline.style.width = '100%'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#242424'
                    const underline = e.currentTarget.querySelector('.nav-underline') as HTMLElement
                    if (underline) underline.style.width = '0'
                  }}
                >
                  {item.label}
                  <div
                    className="nav-underline"
                    style={{
                      position: 'absolute',
                      bottom: '-5px',
                      left: 0,
                      width: '0',
                      height: '2px',
                      background: '#F07255',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* CTA Button / Mobile Menu */}
          {!isMobile ? (
            <button
              style={{
                background: 'linear-gradient(135deg, #F07255, #ff8066)',
                color: 'white',
                borderRadius: '50px',
                fontWeight: '600',
                padding: '0.75rem 1.5rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(240, 114, 85, 0.3)',
                transition: 'all 0.3s ease',
                fontSize: '14px',
              }}
              onClick={() => handleNavClick('#agendar')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(240, 114, 85, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(240, 114, 85, 0.3)'
              }}
            >
              Agendar Llamada
            </button>
          ) : (
            <div
              style={{
                cursor: 'pointer',
                padding: '0.5rem',
              }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div>
                <div
                  style={{
                    width: '25px',
                    height: '3px',
                    background: '#242424',
                    marginBottom: '3px',
                    transition: 'all 0.3s ease',
                    transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                  }}
                />
                <div
                  style={{
                    width: '25px',
                    height: '3px',
                    background: '#242424',
                    marginBottom: '3px',
                    transition: 'all 0.3s ease',
                    opacity: mobileMenuOpen ? 0 : 1,
                  }}
                />
                <div
                  style={{
                    width: '25px',
                    height: '3px',
                    background: '#242424',
                    transition: 'all 0.3s ease',
                    transform: mobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none',
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && (
          <div
            style={{
              maxHeight: mobileMenuOpen ? '400px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease',
              background: '#F8F5F1',
              borderTop: mobileMenuOpen ? '1px solid rgba(217, 166, 161, 0.2)' : 'none',
              boxShadow: mobileMenuOpen ? '0 5px 15px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            <div
              style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                padding: mobileMenuOpen ? '1.5rem 2rem' : '0 2rem',
                gap: mobileMenuOpen ? '1rem' : '0',
                transition: 'all 0.3s ease',
              }}
            >
              {navItems.map((item) => (
                <div
                  key={item.href}
                  style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    textAlign: 'center',
                    padding: '0.5rem',
                    color: '#242424',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => handleNavClick(item.href)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F07255'
                    e.currentTarget.style.background = 'rgba(240, 114, 85, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#242424'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {item.label}
                </div>
              ))}
              <button
                style={{
                  background: 'linear-gradient(135deg, #F07255, #ff8066)',
                  color: 'white',
                  borderRadius: '50px',
                  fontWeight: '600',
                  marginTop: '1rem',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(240, 114, 85, 0.3)',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => handleNavClick('#agendar')}
              >
                Agendar Llamada
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}