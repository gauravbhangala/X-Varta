'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Service {
  num: string
  title: string
  desc: string
  tags: string[]
  icon: number
}

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const services: Service[] = [
    {
      num: '01',
      title: 'Digital Transformation Strategy',
      desc: 'Comprehensive digital maturity assessment, roadmap development, and organizational alignment. We identify opportunities to optimize operations, improve customer experience, and drive revenue growth through digital capabilities.',
      tags: ['Digital Audit', 'Roadmap Development', 'Change Management', 'ROI Forecasting'],
      icon: 0,
    },
    {
      num: '02',
      title: 'Enterprise Web & Platform Solutions',
      desc: 'Custom-built, scalable digital platforms engineered for global security, compliance, and performance standards. From e-commerce to SaaS platforms, we deliver systems built for enterprise-grade reliability and growth.',
      tags: ['Platform Architecture', 'Scalability', 'Security & Compliance', 'Integration'],
      icon: 1,
    },
    {
      num: '03',
      title: 'Growth & Market Positioning',
      desc: 'Strategic assistance in market positioning, customer acquisition, and revenue optimization. Through research, competitive analysis, and data-driven insights, we help companies articulate their value and capture growth opportunities.',
      tags: ['Market Positioning', 'Buyer Research', 'Go-to-Market Strategy', 'Conversion Optimization'],
      icon: 2,
    },
    {
      num: '04',
      title: 'Sales & Marketing Enablement',
      desc: 'Equip your teams with systems, tools, and messaging that accelerate deal cycles and improve win rates. Sales collateral, case studies, training, and performance dashboards—all designed to scale your revenue operations.',
      tags: ['Sales Enablement', 'Content Strategy', 'Messaging Framework', 'Performance Tracking'],
      icon: 3,
    },
  ]

  const iconColors = ['#00f5ff', '#b4ff39', '#ff2d78', '#00f5ff']

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const iconVariants = {
    rest: { rotate: 0, scale: 1 },
    hover: {
      rotate: 8,
      scale: 1.1,
      transition: { type: 'spring', stiffness: 300, damping: 10 },
    },
  }

  const accentLineVariants = {
    rest: { width: 0 },
    hover: {
      width: '100%',
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  // GSAP ScrollTrigger animations with enhanced cinematic effect
  useEffect(() => {
    if (!containerRef.current) return

    const cards = containerRef.current.querySelectorAll('[data-card]')
    const section = containerRef.current

    // Staggered reveal animation for cards
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 80,
          rotation: index % 2 === 0 ? -3 : 3,
        },
        {
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
            end: 'top 35%',
            scrub: 1.2,
            markers: false,
          },
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1,
        }
      )
    })

    // Smooth color transition on headline as you scroll
    const headline = section.querySelector('h2')
    if (headline) {
      gsap.to(headline, {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'center center',
          scrub: 1,
          markers: false,
        },
        color: '#00f5ff',
        duration: 0.8,
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="services" className="px-12 py-32 relative z-10" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-3 font-mono text-xs tracking-wider text-cyan mb-6"
      >
        <span className="text-muted">[ </span>
        Our Solutions
        <span className="text-muted"> ]</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="font-bebas text-5xl md:text-7xl leading-tight tracking-tighter mb-20"
      >
        Strategic Solutions for<br />
        <span className="text-muted">Enterprise Growth</span>
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-cyan/20"
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            data-card
            variants={cardVariants}
            className="group bg-card border border-cyan/20 p-14 relative overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:border-cyan/40 cursor-pointer"
            whileHover="hover"
            initial="rest"
          >
            {/* Gradient overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-linear-to-br from-cyan/5 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Top accent line */}
            <motion.div
              variants={accentLineVariants}
              initial="rest"
              whileHover="hover"
              className="absolute top-0 left-0 h-0.5"
              style={{
                background:
                  i === 0
                    ? 'linear-gradient(90deg, #00f5ff, #b4ff39)'
                    : i === 1
                      ? 'linear-gradient(90deg, #b4ff39, #ff2d78)'
                      : i === 2
                        ? 'linear-gradient(90deg, #ff2d78, #00f5ff)'
                        : 'linear-gradient(90deg, #b4ff39, #00f5ff)',
              }}
            />

            {/* Service number */}
            <motion.div
              className="absolute top-6 right-8 font-bebas text-6xl text-cyan/10 pointer-events-none leading-none"
              initial={{ opacity: 0.1 }}
              whileHover={{ opacity: 0.2 }}
              transition={{ duration: 0.3 }}
            >
              {service.num}
            </motion.div>

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                variants={iconVariants}
                className="w-14 h-14 border border-cyan/20 flex items-center justify-center mb-8 transition-all duration-400"
                style={{ borderColor: iconColors[i] + '40' }}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  stroke={iconColors[i]}
                >
                  {i === 0 && (
                    <>
                      <rect x="3" y="3" width="18" height="18" rx="1" />
                      <path d="M3 9h18M9 21V9" />
                    </>
                  )}
                  {i === 1 && (
                    <>
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35M11 7v4l3 2" />
                    </>
                  )}
                  {i === 2 && <path d="M22 12h-4l-3 9L9 3l-3 9H2" />}
                  {i === 3 && (
                    <>
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </>
                  )}
                </svg>
              </motion.div>

              {/* Content */}
              <h3 className="font-bebas text-4xl tracking-wide mb-4">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted mb-8">{service.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, j) => (
                  <motion.span
                    key={j}
                    className="font-mono text-xs uppercase tracking-wider px-3 py-1 border border-cyan/20 text-muted transition-all duration-300 group-hover:border-cyan/50 group-hover:text-cyan"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Services
