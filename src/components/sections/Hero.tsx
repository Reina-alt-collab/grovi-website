'use client'
import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { trackButtonClick, trackScroll } from '@/lib/analytics'
import styles from './Hero.module.css'

// 🔧 FIX 3: TypeScript interfaces para type safety
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface Connection {
  from: { x: number; y: number };
  to: { x: number; y: number };
  opacity: number;
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  // 🔧 FIX 2: Intersection Observer + mobile detection
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)

  // 🔧 FIX 1: useCallback para mobile detection
  const checkMobile = useCallback(() => {
    const mobile = window.innerWidth <= 768 || 
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    setIsMobile(mobile)
  }, [])

  // 🔧 FIX 2: Intersection Observer para lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    const section = containerRef.current
    if (section) observer.observe(section)
    
    return () => observer.disconnect()
  }, [])

  // 🔧 FIX 1: useMemo para generar partículas (expensive calculation)
  const generatedParticles = useMemo(() => {
    if (!isVisible) return []
    
    // 🔧 FIX 4: Menos partículas en móvil para performance
    const particleCount = isMobile ? 12 : 25
    
    return Array.from({ length: particleCount }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: isMobile ? Math.random() * 4 + 2 : Math.random() * 6 + 4, // Más pequeñas en móvil
      delay: Math.random() * 2,
      duration: Math.random() * 10 + 15
    }))
  }, [isVisible, isMobile])

  // 🔧 FIX 1: useMemo para generar conexiones (expensive calculation)
  const generatedConnections = useMemo(() => {
    if (!isVisible || generatedParticles.length === 0) return []
    
    const connections: Connection[] = []
    const maxDistance = isMobile ? 20 : 25 // Menos conexiones en móvil
    
    for (let i = 0; i < generatedParticles.length; i++) {
      for (let j = i + 1; j < generatedParticles.length; j++) {
        const distance = Math.sqrt(
          Math.pow(generatedParticles[i].x - generatedParticles[j].x, 2) + 
          Math.pow(generatedParticles[i].y - generatedParticles[j].y, 2)
        )
        if (distance < maxDistance) {
          connections.push({
            from: generatedParticles[i],
            to: generatedParticles[j],
            opacity: Math.max(0.1, 1 - distance / maxDistance)
          })
        }
      }
    }
    
    return connections
  }, [generatedParticles, isVisible, isMobile])

  useEffect(() => {
    setMounted(true)
    checkMobile()
    
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [checkMobile])

  // 🔧 FIX 3: Actualizar particles y connections solo cuando cambien
  useEffect(() => {
    if (mounted && isVisible) {
      setParticles(generatedParticles)
      setConnections(generatedConnections)
    }
  }, [mounted, isVisible, generatedParticles, generatedConnections])

  // 🔧 FIX 4: Mouse interaction optimizado con requestAnimationFrame + mobile detection
  useEffect(() => {
    if (!mounted || !containerRef.current || particles.length === 0 || isMobile) {
      // 🚀 SKIP mouse tracking en móvil para performance
      return
    }

    let isTracking = false

    // 🔧 FIX 5: Throttled mouse move con requestAnimationFrame
    const handleMouseMove = (e: MouseEvent) => {
      if (isTracking) return
      
      isTracking = true
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      animationFrameRef.current = requestAnimationFrame(() => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (rect) {
          mouseRef.current = {
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100
          }
          
          // 🔧 FIX 6: Optimized particle movement
          particlesRef.current.forEach((particle, index) => {
            if (particle && particles[index]) {
              const attraction = 0.015 // Slightly reduced for smoother movement
              const currentX = parseFloat(particle.style.left) || particles[index].x
              const currentY = parseFloat(particle.style.top) || particles[index].y
              
              const newX = currentX + (mouseRef.current.x - currentX) * attraction
              const newY = currentY + (mouseRef.current.y - currentY) * attraction
              
              // 🔧 FIX 7: Use transform instead of left/top for better performance
              particle.style.transform = `translate(${newX - particles[index].x}%, ${newY - particles[index].y}%)`
            }
          })
        }
        
        isTracking = false
      })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [mounted, particles, isMobile])

  // 🔧 FIX 1: useCallback para handlers optimizados
  const handleScroll = useCallback((targetId: string) => {
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      trackScroll(targetId.replace('#', ''))
    }
  }, [])

  const handleConnectNowClick = useCallback(() => {
    trackButtonClick('Conectar Ahora', 'Hero')
    handleScroll('#agendar')
  }, [handleScroll])

  const handleExploreNetworkClick = useCallback(() => {
    trackButtonClick('Explorar Red', 'Hero')
    handleScroll('#sobre-nosotros')
  }, [handleScroll])

  // 🔧 FIX 8: Cleanup function optimized
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      // Clear particles refs
      particlesRef.current = []
    }
  }, [])

  return (
    <section className={styles.hero} ref={containerRef}>
      {/* Particle Network Background - Only render when visible and after mount */}
      {mounted && isVisible && particles.length > 0 && (
        <div className={styles.particleContainer}>
          {/* Particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              ref={el => { 
                if (el) particlesRef.current[particle.id] = el 
              }}
              className={styles.particle}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                // 🔧 FIX 7: Initial transform for better performance
                transform: 'translate(0%, 0%)',
                willChange: isMobile ? 'auto' : 'transform' // Only optimize for desktop
              }}
            />
          ))}
          
          {/* Connection Lines - Simplified on mobile */}
          {(!isMobile || connections.length < 15) && connections.map((connection, index) => {
            const length = Math.sqrt(
              Math.pow(connection.to.x - connection.from.x, 2) + 
              Math.pow(connection.to.y - connection.from.y, 2)
            )
            const angle = Math.atan2(
              connection.to.y - connection.from.y,
              connection.to.x - connection.from.x
            ) * (180 / Math.PI)

            return (
              <div
                key={index}
                className={styles.connectionLine}
                style={{
                  left: `${connection.from.x}%`,
                  top: `${connection.from.y}%`,
                  width: `${length}%`,
                  transform: `rotate(${angle}deg)`,
                  opacity: isMobile ? connection.opacity * 0.6 : connection.opacity, // More subtle on mobile
                  animationDelay: `${index * 0.1}s`
                }}
              />
            )
          })}
        </div>
      )}

      {/* Content */}
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={`${styles.title} ${mounted && isVisible ? styles.fadeInLeft : ''}`}>
            Conectamos tu visión con resultados
          </h1>
          <p className={`${styles.subtitle} ${mounted && isVisible ? styles.fadeInLeft : ''}`}>
            Transformamos ideas en estrategias digitales exitosas. Nuestra red de expertos conecta cada aspecto de tu negocio para impulsar un crecimiento sostenible y medible.
          </p>
          <div className={`${styles.buttons} ${mounted && isVisible ? styles.fadeInLeft : ''}`}>
            <button 
              className={styles.primaryButton}
              onClick={handleConnectNowClick}
              aria-describedby="connect-now-description"
            >
              <span className={styles.buttonText}>Conectar Ahora</span>
              <span className={styles.buttonIcon} aria-hidden="true">🚀</span>
            </button>
            <button 
              className={styles.secondaryButton}
              onClick={handleExploreNetworkClick}
              aria-describedby="explore-network-description"
            >
              <span className={styles.buttonText}>Explorar Red</span>
              <span className={styles.buttonIcon} aria-hidden="true">🔗</span>
            </button>
          </div>
          
          {/* Network Stats */}
          <div className={`${styles.networkStats} ${mounted && isVisible ? styles.fadeInUp : ''}`} role="list">
            <div className={styles.stat} role="listitem">
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Conexiones Exitosas</span>
            </div>
            <div className={styles.stat} role="listitem">
              <span className={styles.statNumber}>200%</span>
              <span className={styles.statLabel}>Crecimiento Promedio</span>
            </div>
            <div className={styles.stat} role="listitem">
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Red Activa</span>
            </div>
          </div>
        </div>

        <div className={`${styles.visual} ${mounted && isVisible ? styles.fadeInRight : ''}`}>
          <div className={styles.networkHub}>
            <div className={styles.centralNode}>
              <div className={styles.nodeCore}>
                <span className={styles.nodeIcon} aria-hidden="true">⚡</span>
              </div>
              <div className={styles.nodeRing}></div>
              <div className={styles.nodeRing} style={{ animationDelay: '1s' }}></div>
            </div>
            
            {/* Satellite Nodes */}
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className={styles.satelliteNode}
                style={{
                  transform: `rotate(${index * 60}deg) translateY(-100px)`,
                  animationDelay: `${index * 0.3}s`
                }}
              >
                <div className={styles.satelliteCore}>
                  <span aria-hidden="true">
                    {['💼', '📊', '🎯', '🚀', '💡', '🔗'][index]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden accessibility descriptions */}
      <p id="connect-now-description" className="sr-only">
        Navega a la sección de agendamiento para conectar con nuestro equipo
      </p>
      <p id="explore-network-description" className="sr-only">
        Navega a la sección sobre nosotros para conocer más sobre nuestra red
      </p>
    </section>
  )
}