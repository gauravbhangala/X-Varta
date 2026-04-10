'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import MagneticButton from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  // Scroll-triggered background animation
  useEffect(() => {
    if (!sectionRef.current) return

    gsap.to(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'center 30%',
        scrub: 1.5,
      },
      '--bg-opacity': 1,
      duration: 1,
    })

    // Animate accent lines
    const accentLines = sectionRef.current.querySelectorAll('[data-accent-line]')
    accentLines.forEach((line) => {
      gsap.to(line, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 20%',
          scrub: 1,
        },
        opacity: 1,
        duration: 0.8,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative px-12 py-32 overflow-hidden z-10 text-center"
    >
      {/* Premium Background Gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,245,255,.12), transparent), radial-gradient(ellipse 40% 40% at 20% 0%, rgba(255,45,120,.08), transparent)',
        }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,245,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Animated Accent Lines */}
      <motion.div
        data-accent-line
        className="absolute top-0 left-1/4 w-px h-32 bg-linear-to-b from-cyan to-transparent opacity-0"
        animate={{ height: [120, 180, 120] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        data-accent-line
        className="absolute bottom-0 right-1/4 w-px h-32 bg-linear-to-t from-acid to-transparent opacity-0"
        animate={{ height: [120, 180, 120] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10"
      >
        {/* Header Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center justify-center gap-3 font-mono text-xs tracking-wider text-cyan mb-6"
        >
          <span className="text-muted">[ </span>
          Next Steps
          <span className="text-muted"> ]</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          variants={itemVariants}
          className="font-bebas text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6"
        >
          SCHEDULE A<br />
          <motion.span
            initial={{ opacity: 0, WebkitTextStroke: '2px rgba(0,245,255,.2)' }}
            whileInView={{ opacity: 1, WebkitTextStroke: '2px rgba(0,245,255,.4)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              color: 'transparent',
            }}
          >
            STRATEGY DISCUSSION
          </motion.span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Our team will review your current state, identify growth opportunities, and discuss how we can support your strategic objectives.
        </motion.p>

        {/* CTA Buttons with Magnetic Effects */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <MagneticButton variant="primary" href="mailto:hello@nexus.agency">
            Schedule Consultation
          </MagneticButton>

          <MagneticButton variant="secondary" href="#case-studies">
            View Case Studies
          </MagneticButton>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-xs text-muted font-mono"
        >
          <motion.div className="flex items-center gap-2" whileHover={{ x: 4 }}>
            <span className="w-1 h-1 rounded-full bg-cyan" />
            <span>Response within <strong className="text-white">24 hours</strong></span>
          </motion.div>
          <motion.div className="w-px h-4 bg-cyan/20" />
          <motion.div className="flex items-center gap-2" whileHover={{ x: 4 }}>
            <span className="w-1 h-1 rounded-full bg-acid" />
            Response Time &lt; 1h
          </motion.div>
          <motion.div className="w-px h-4 bg-cyan/20" />
          <motion.div className="flex items-center gap-2" whileHover={{ x: 4 }}>
            <span className="w-1 h-1 rounded-full bg-magenta" />
            100% Risk-Free
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default CTA
