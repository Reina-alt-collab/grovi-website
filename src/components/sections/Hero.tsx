'use client'
import { useEffect, useState, useRef } from 'react'
import { trackButtonClick, trackScroll } from '@/lib/analytics'
import styles from './Hero.module.css'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
  }>>([])
  const [connections, setConnections] = useState<Array<{
    from: { x: number; y: number };
    to: { x: number; y: number };
    opacity: number;
  }>>([])
  
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
    
    // Generate particles only on client side after mount
    const generatedParticles = Array.from({ length: 25 }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 4,
      delay: Math.random() * 2,
      duration: Math.random() * 10 + 15
    }))
    
    setParticles(generatedParticles)
    
    // Generate connections between nearby particles
    const generatedConnections = []
    for (let i = 0; i < generatedParticles.length; i++) {
      for (let j = i + 1; j < generatedParticles.length; j++) {
        const distance = Math.sqrt(
          Math.pow(generatedParticles[i].x - generatedParticles[j].x, 2) + 
          Math.pow(generatedParticles[i].y - generatedParticles[j].y, 2)
        )
        if (distance < 25) {
          generatedConnections.push({
            from: generatedParticles[i],
            to: generatedParticles[j],
            opacity: Math.max(0.1, 1 - distance / 25)
          })
        }
      }
    }
    
    setConnections(generatedConnections)
  }, [])

  useEffect(() => {
    if (!mounted || !containerRef.current || particles.length === 0) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        mouseRef.current = {
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        }
        
        // Move particles toward mouse
        particlesRef.current.forEach((particle, index) => {
          if (particle) {
            const attraction = 0.02
            const currentX = parseFloat(particle.style.left) || particles[index]?.x || 0
            const currentY = parseFloat(particle.style.top) || particles[index]?.y || 0
            
            const newX = currentX + (mouseRef.current.x - currentX) * attraction
            const newY = currentY + (mouseRef.current.y - currentY) * attraction
            
            particle.style.left = `${newX}%`
            particle.style.top = `${newY}%`
          }
        })
      }
    }

    const container = containerRef.current
    container.addEventListener('mousemove', handleMouseMove)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mounted, particles])

  const handleScroll = (targetId: string) => {
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      
      // Track scroll event
      trackScroll(targetId.replace('#', ''))
    }
  }

  const handleConnectNowClick = () => {
    trackButtonClick('Conectar Ahora', 'Hero')
    handleScroll('#agendar')
  }

  const handleExploreNetworkClick = () => {
    trackButtonClick('Explorar Red', 'Hero')
    handleScroll('#sobre-nosotros')
  }

  return (
    <section className={styles.hero} ref={containerRef}>
      {/* Particle Network Background - Only render after mount */}
      {mounted && particles.length > 0 && (
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
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
          
          {/* Connection Lines */}
          {connections.map((connection, index) => {
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
                  opacity: connection.opacity,
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
          <h1 className={`${styles.title} ${mounted ? styles.fadeInLeft : ''}`}>
            Conectamos tu visión con resultados
          </h1>
          <p className={`${styles.subtitle} ${mounted ? styles.fadeInLeft : ''}`}>
            Transformamos ideas en estrategias digitales exitosas. Nuestra red de expertos conecta cada aspecto de tu negocio para impulsar un crecimiento sostenible y medible.
          </p>
          <div className={`${styles.buttons} ${mounted ? styles.fadeInLeft : ''}`}>
            <button 
              className={styles.primaryButton}
              onClick={handleConnectNowClick}
            >
              <span className={styles.buttonText}>Conectar Ahora</span>
              <span className={styles.buttonIcon}>🚀</span>
            </button>
            <button 
              className={styles.secondaryButton}
              onClick={handleExploreNetworkClick}
            >
              <span className={styles.buttonText}>Explorar Red</span>
              <span className={styles.buttonIcon}>🔗</span>
            </button>
          </div>
          
          {/* Network Stats */}
          <div className={`${styles.networkStats} ${mounted ? styles.fadeInUp : ''}`}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Conexiones Exitosas</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>200%</span>
              <span className={styles.statLabel}>Crecimiento Promedio</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Red Activa</span>
            </div>
          </div>
        </div>

        <div className={`${styles.visual} ${mounted ? styles.fadeInRight : ''}`}>
          <div className={styles.networkHub}>
            <div className={styles.centralNode}>
              <div className={styles.nodeCore}>
                <span className={styles.nodeIcon}>⚡</span>
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
                  {['💼', '📊', '🎯', '🚀', '💡', '🔗'][index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}