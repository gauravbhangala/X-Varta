'use client'

import { motion } from 'framer-motion'

const TrustSignals = () => {
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
      value: '100+',
      label: 'Brands Transformed',
      delimiter: true,
    },
    {
      value: '5.2×',
      label: 'Average Revenue Increase',
      delimiter: true,
    },
    {
      value: '48h',
      label: 'Average Strategy Turnaround',
      delimiter: false,
    },
  ]

  return (
    <section id="trust" className="relative px-12 py-24 overflow-hidden z-10 bg-card/40 border-t border-b border-cyan/10">
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
            Trusted by industry leaders and fast-growing brands
          </h2>
          <p className="text-muted max-w-2xl">
            We've helped over 100 companies transform their digital presence into profitable growth engines.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group"
            >
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-bebas text-5xl md:text-6xl text-cyan leading-none">
                  {metric.value}
                </span>
                {metric.delimiter && (
                  <div className="w-px h-12 bg-gradient-to-b from-cyan to-transparent" />
                )}
              </div>
              <p className="text-sm text-muted uppercase font-mono tracking-widest">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Client Logos Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <p className="text-xs font-mono tracking-widest text-muted uppercase mb-6">
            Trusted by forward-thinking brands
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="h-14 bg-card border border-cyan/20 rounded-lg flex items-center justify-center text-xs text-muted font-mono transition-all hover:border-cyan/40 hover:bg-cyan/5"
                whileHover={{ scale: 1.05, borderColor: '#00f5ff' }}
              >
                Brand {i + 1}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-cyan/5 to-acid/5 border border-cyan/20 rounded-xl p-8 md:p-12">
          <div className="flex flex-col gap-6">
            {/* Stars */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-acid" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-lg leading-relaxed">
              "NEXUS didn't just build us a website—they built us a lead generation machine. In 90 days, we went from 5 leads/month to 50+. Their team understands our business better than we do."
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan to-acid rounded-full flex items-center justify-center text-white font-bold text-sm">
                JH
              </div>
              <div>
                <p className="font-semibold text-white">James Harrison</p>
                <p className="text-xs text-muted font-mono uppercase tracking-wider">CEO, TechScale Inc.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default TrustSignals
