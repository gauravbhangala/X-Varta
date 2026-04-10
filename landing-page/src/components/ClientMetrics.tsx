'use client'

import { motion } from 'framer-motion'

const ClientMetrics = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const metrics = [
    {
      value: '$650M+',
      label: 'Revenue Enabled for Clients',
      description: '(Last 3 years)',
    },
    {
      value: '180+',
      label: 'Enterprise & B2B Clients',
      description: '(Across 12 industries)',
    },
    {
      value: '92%',
      label: 'Average Project Success Rate',
      description: '(On-time, on-budget delivery)',
    },
  ]

  const clientSectors = [
    'Financial Services',
    'Healthcare & Life Sciences',
    'Technology & SaaS',
    'Manufacturing & Logistics',
    'Retail & E-Commerce',
    'Professional Services',
    'Energy & Utilities',
    'Real Estate & Construction',
  ]

  return (
    <section id="metrics" className="relative px-12 py-24 overflow-hidden z-10 bg-card/40 border-y border-cyan/10">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 w-96 h-96 bg-cyan/5 rounded-full blur-3xl"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="font-bebas text-4xl md:text-5xl leading-tight tracking-tight mb-4">
            Enterprise-Scale Outcomes
          </h2>
          <p className="text-muted max-w-2xl text-sm">
            Proven results across industries. Our track record reflects our commitment to measurable, sustainable business growth.
          </p>
        </motion.div>

        {/* Metrics Grid - Subtle, professional */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-gradient-to-br from-background to-card border border-cyan/10 rounded-lg p-8 hover:border-cyan/30 transition-all"
            >
              <div className="mb-4">
                <span className="font-bebas text-5xl text-cyan leading-none">
                  {metric.value}
                </span>
              </div>
              <p className="text-sm font-semibold text-white mb-2">{metric.label}</p>
              <p className="text-xs text-muted font-mono">{metric.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Client Sectors */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="font-bebas text-2xl mb-6 text-white">Industries & Sectors Served</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {clientSectors.map((sector, i) => (
              <motion.div
                key={i}
                className="bg-card border border-cyan/10 rounded-lg px-4 py-3 text-sm font-mono text-muted text-center hover:border-cyan/30 hover:bg-cyan/5 transition-all"
                whileHover={{ y: -2 }}
              >
                {sector}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Client Logos Placeholder */}
        <motion.div variants={itemVariants} className="pt-8 border-t border-cyan/10">
          <p className="text-xs font-mono tracking-widest text-muted uppercase mb-8">
            [Replace with actual client logos - 8-12 logos recommended]
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="h-12 bg-card border border-cyan/20 rounded-lg flex items-center justify-center text-xs text-muted font-mono"
                whileHover={{ borderColor: '#00f5ff' }}
              >
                Client Logo
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ClientMetrics
