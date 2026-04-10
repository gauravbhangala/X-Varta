'use client'

import { motion } from 'framer-motion'

const EngagementModel = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const models = [
    {
      title: 'Project-Based',
      description: 'Discrete, scoped engagements with defined deliverables, timeline, and investment. Ideal for website redesigns, digital transformation initiatives, or targeted optimization projects.',
      commonOutcomes: ['Website Redesign', 'Digital Strategy Development', 'Platform Implementation'],
      duration: '3-6 months',
      icon: '📊',
    },
    {
      title: 'Retainer Partnership',
      description: 'Ongoing, strategic engagement with dedicated team capacity. Includes regular strategy reviews, optimization cycles, and continuous improvement. Typically structured as monthly engagements.',
      commonOutcomes: ['Continuous Growth Management', 'Performance Optimization', 'Team Augmentation'],
      duration: '12+ months',
      icon: '🤝',
    },
    {
      title: 'Advisory Engagement',
      description: 'Executive-level strategic guidance and consulting. Includes quarterly strategy sessions, market analysis, competitive benchmarking, and organizational guidance.',
      commonOutcomes: ['Strategy Validation', 'Market Positioning', 'Executive Alignment'],
      duration: 'Flexible',
      icon: '💼',
    },
  ]

  return (
    <section id="engagement" className="relative px-12 py-32 overflow-hidden z-10 bg-card/40 border-y border-cyan/10">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-0 w-96 h-96 bg-acid/5 rounded-full blur-3xl"
          style={{ transform: 'translate(50%, -50%)' }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="font-bebas text-4xl md:text-5xl leading-tight tracking-tight mb-4">
            Engagement Models
          </h2>
          <p className="text-muted max-w-2xl">
            We offer flexible partnership structures designed to align with your objectives, timeline, and organizational needs.
          </p>
        </motion.div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {models.map((model, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative bg-gradient-to-br from-background to-card border border-cyan/10 rounded-lg p-8 hover:border-cyan/30 transition-all"
            >
              {/* Accent */}
              <motion.div
                className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan to-acid"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
              />

              {/* Icon */}
              <span className="text-4xl mb-4 block">{model.icon}</span>

              {/* Title */}
              <h3 className="font-bebas text-2xl mb-4 text-white">{model.title}</h3>

              {/* Description */}
              <p className="text-sm text-muted mb-6 leading-relaxed">{model.description}</p>

              {/* Outcomes */}
              <div className="mb-6">
                <p className="text-xs font-mono tracking-widest text-muted uppercase mb-3">Common Outcomes</p>
                <ul className="space-y-2">
                  {model.commonOutcomes.map((outcome, j) => (
                    <li key={j} className="text-sm text-cyan flex gap-2">
                      <span>→</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Duration */}
              <div className="pt-6 border-t border-cyan/10">
                <p className="text-xs font-mono text-muted">
                  <strong className="text-white">Duration:</strong> {model.duration}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <p className="text-muted mb-6">Which engagement model aligns with your current needs?</p>
          <motion.a
            href="mailto:hello@nexus.agency"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan to-acid text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Our Team
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8h14M9 1l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default EngagementModel
