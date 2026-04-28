'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import MagneticButton from './MagneticButton'
import ThreeScene from './ThreeScene'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [deviceType, setDeviceType] = useState<'desktop' | 'mobile'>('desktop')
  const containerRef = useRef<HTMLDivElement>(null)
  const threeSceneRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Check if mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 1024
    setDeviceType(isMobile ? 'mobile' : 'desktop')

    const handleResize = () => {
      setDeviceType(window.innerWidth < 1024 ? 'mobile' : 'desktop')
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    // Setup scroll pinning for Hero section (3 seconds)
    const pin = gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        once: false,
      },
    })

    // Cleanup
    return () => {
      pin.scrollTrigger?.kill()
      gsap.killTweensOf(containerRef.current)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      mouseX.set(x * 0.01)
      mouseY.set(y * 0.01)

      // Parallax for floating elements
      setMousePosition({
        x: x * 0.02,
        y: y * 0.02,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1 * i,
      },
    }),
  }

  const floatingOrbs = [
    {
      className: 'top-0 right-0 w-96 h-96',
      gradient: 'radial-gradient(circle, rgba(0,245,255,.15), transparent 70%)',
      duration: 6,
      delay: 0,
    },
    {
      className: 'bottom-0 left-0 w-64 h-64',
      gradient: 'radial-gradient(circle, rgba(255,45,120,.12), transparent 70%)',
      duration: 6,
      delay: 3,
    },
    {
      className: 'top-1/3 left-2/5 w-56 h-56',
      gradient: 'radial-gradient(circle, rgba(180,255,57,.08), transparent 70%)',
      duration: 6,
      delay: 1.5,
    },
  ]

  const stats = [
    { value: '$650M+', label: 'Revenue Enabled' },
    { value: '6wk', label: 'Avg. Launch Timeline' },
    { value: '92%', label: 'Success Rate' },
  ]

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-12 pt-36 pb-20 overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Background Grid with Parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        style={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
          transform: 'translateX(-50%) perspective(600px) rotateX(55deg)',
          backgroundImage:
            'linear-gradient(rgba(0,245,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          right: 0,
          width: '100%',
          height: '60%',
          pointerEvents: 'none',
        }}
        className="pointer-events-none"
      />

      {/* Animated Orbs with Enhanced Parallax */}
      {floatingOrbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute ${orb.className} rounded-full blur-3xl pointer-events-none`}
          style={{
            background: orb.gradient,
            x: mousePosition.x * (0.1 + index * 0.05),
            y: mousePosition.y * (0.1 + index * 0.05),
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Three.js 3D Scene (Desktop Only) */}
      {deviceType === 'desktop' && (
        <motion.div
          ref={threeSceneRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute top-1/4 right-1/4 w-96 h-96 lg:w-125 lg:h-125 pointer-events-none"
        >
          <ThreeScene containerRef={threeSceneRef} isMobile={false} />
        </motion.div>
      )}

      {/* Content with Parallax */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
        style={{
          y: useTransform(mouseY, [-100, 100], [20, -20]),
        }}
      >
        {/* Text Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 font-mono text-xs tracking-widest text-cyan mb-8">
          <motion.div
            className="w-10 h-px bg-cyan"
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          Enterprise Digital Solutions
        </motion.div>

        {/* Main Heading */}
        <h1 className="font-bebas text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-3 overflow-hidden">
          {['Built to', 'Scale.', 'Engineered to Measure.'].map((text, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              className={i === 0 ? 'text-white' : i === 1 ? 'text-cyan' : i === 2 ? 'text-white' : 'text-white'}
            >
              {text}
            </motion.div>
          ))}
        </h1>

        {/* Subheading - Professional value prop */}
        <motion.p
          variants={itemVariants}
          className="max-w-3xl text-lg leading-relaxed text-muted my-8"
        >
          Enterprise-grade digital infrastructure designed for predictable growth. We architect scalable systems, optimize operational efficiency, and deliver outcomes tied directly to revenue impact. From platform architecture to market positioning, every decision is data-driven and measurable.
        </motion.p>

        {/* Trust Badge - Enterprise focus */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-4 bg-card border border-cyan/20 rounded-lg px-6 py-3 mb-12"
        >
          <div className="flex gap-3">
            <span className="text-xs font-mono text-muted uppercase">Trusted by:</span>
            <span className="text-xs font-mono text-white">Global 500 • Fortune 1000 • Leading B2B Companies</span>
          </div>
        </motion.div>

        {/* CTA Buttons - Professional language */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 flex-wrap">
          <MagneticButton variant="primary" href="#engagement">
            <span>Request Consultation</span>
            <motion.svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="ml-2 inline"
            >
              <path d="M1 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </motion.svg>
          </MagneticButton>

          <motion.a
            href="#case-studies"
            className="inline-flex items-center gap-2.5 text-white font-mono text-xs tracking-widest uppercase hover:text-acid transition-colors group"
            whileHover={{ x: 4 }}
          >
            View Case Studies
            <motion.span
              className="w-10 h-px bg-muted group-hover:bg-acid transition-all"
              animate={{ width: [40, 50, 40] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="absolute right-0 top-1/2 -translate-y-1/2 border-l-1.5 border-t-1.5 border-muted w-1 h-1" />
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Stats with Parallax */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-20 right-12 flex flex-col gap-7 z-10"
        style={{
          x: useTransform(mouseX, [-100, 100], [-10, 10]),
          y: useTransform(mouseY, [-100, 100], [-15, 15]),
        }}
        role="region"
        aria-label="Key performance metrics"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="text-right group cursor-default"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 + i * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="font-bebas text-5xl text-cyan leading-none group-hover:text-acid transition-colors">
              {stat.value}
            </div>
            <div className="font-mono text-xs tracking-widest text-muted uppercase mt-2 group-hover:text-cyan transition-colors">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-10 left-12 flex items-center gap-4 font-mono text-xs tracking-widest text-muted uppercase z-10"
      >
        <motion.div
          className="w-px h-16 bg-linear-to-b from-cyan to-transparent"
          animate={{ scaleY: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        Scroll
      </motion.div>
    </section>
  )
}

export default Hero
