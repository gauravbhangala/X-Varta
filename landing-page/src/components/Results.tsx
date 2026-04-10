'use client'

import { motion } from 'framer-motion'

const Results = () => {
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

  const results = [
    {
      metric: '+450%',
      description: 'Increase in qualified leads in 6 months',
      icon: '📈',
      color: 'from-cyan',
    },
    {
      metric: '3×',
      description: 'Improvement in conversion rate',
      icon: '🎯',
      color: 'from-acid',
    },
    {
      metric: '-62%',
      description: 'Reduction in customer acquisition cost',
      icon: '💰',
      color: 'from-magenta',
    },
    {
      metric: '24/7',
      description: 'Automated lead capture system',
      icon: '⚡',
      color: 'from-cyan',
    },
  ]

  return (
    <section id="results" className="relative px-12 py-32 overflow-hidden z-10">
      {/* Gradient backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-acid/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-cyan/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-cyan mb-6">
            <span className="text-muted">[ </span>
            Real Results
            <span className="text-muted"> ]</span>
          </div>
          <h2 className="font-bebas text-5xl md:text-7xl leading-tight tracking-tight mb-6">
            What happens when strategy <span className="text-acid">meets execution</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            We don't just talk about results. Here's what our clients actually achieved.
          </p>
        </motion.div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {results.map((result, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative bg-gradient-to-br from-card to-background border border-cyan/20 rounded-xl p-8 overflow-hidden transition-all hover:border-cyan/50 hover:shadow-lg hover:shadow-cyan/20"
              whileHover={{ y: -4 }}
            >
              {/* Accent line */}
              <motion.div
                className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan to-acid"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
              />

              {/* Icon */}
              <div className="text-4xl mb-4">{result.icon}</div>

              {/* Metric */}
              <div className={`font-bebas text-5xl mb-3 bg-gradient-to-r ${result.color} to-acid bg-clip-text text-transparent`}>
                {result.metric}
              </div>

              {/* Description */}
              <p className="text-muted text-sm leading-relaxed">{result.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Case Study Section */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-cyan/10 to-acid/10 border border-cyan/30 rounded-2xl p-12 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Challenge */}
            <div>
              <h3 className="font-bebas text-2xl mb-4 text-cyan">The Challenge</h3>
              <p className="text-muted leading-relaxed mb-6">
                SaaS company, Series A funded, with a product-market fit but struggling to scale customer acquisition. They were getting ~50 organic leads/month but converting <strong>only 2%</strong> into customers.
              </p>
              <ul className="space-y-3 text-sm text-muted">
                <li className="flex gap-3">
                  <span className="text-acid">•</span>
                  <span>No conversion rate optimization strategy</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-acid">•</span>
                  <span>Website didn't communicate value clearly</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-acid">•</span>
                  <span>Ad spend was inefficient and untracked</span>
                </li>
              </ul>
            </div>

            {/* Right: Solution & Results */}
            <div>
              <h3 className="font-bebas text-2xl mb-4 text-acid">The Solution</h3>
              <p className="text-muted leading-relaxed mb-6">
                Complete rebrand and website rebuild. We implemented conversion architecture, A/B tested messaging, optimized ad targeting, and set up automated lead scoring.
              </p>

              {/* Results Timeline */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="text-cyan font-mono font-bold text-sm min-w-fit">30 days</div>
                  <div className="text-sm text-muted">
                    Website redesigned, conversion rate increased to <strong>4.8%</strong>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-acid font-mono font-bold text-sm min-w-fit">90 days</div>
                  <div className="text-sm text-muted">
                    Leads increased to 220/month, 10x ROI on marketing spend
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-magenta font-mono font-bold text-sm min-w-fit">180 days</div>
                  <div className="text-sm text-muted">
                    Became their <strong>#1 customer acquisition channel</strong>, 450+ leads/month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div variants={itemVariants} className="mt-20 text-center">
          <p className="text-muted mb-6">Ready to see similar results for your business?</p>
          <motion.a
            href="#cta"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan to-acid text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Your Free Strategy Session
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8h14M9 1l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Results
