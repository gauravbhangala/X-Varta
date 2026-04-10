'use client'

import { motion } from 'framer-motion'

const CaseStudiesPage = () => {
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
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const caseStudies = [
    {
      id: 1,
      title: 'Mid-Market SaaS Platform',
      challenge: 'Sales cycle compressed from 6+ months to 14 weeks',
      metric: '133% conversion rate increase',
      industry: 'Technology',
      approach: 'Outcome-focused positioning, website redesign, sales alignment',
      results: [
        'Sales cycle: 6+ months → 14 weeks (57% reduction)',
        'Conversion rate: 1.2% → 2.8% (133% improvement)',
        'Qualified leads: +210%',
        'YoY revenue growth: 34%',
      ],
    },
    {
      id: 2,
      title: 'Enterprise Healthcare Provider',
      challenge: 'Digital transformation at scale',
      metric: '$45M digital revenue captured',
      industry: 'Healthcare',
      approach: 'Platform architecture, patient experience optimization, compliance integration',
      results: [
        'New digital channels: 5 integrated pathways',
        'Patient acquisition cost: -32%',
        'Digital revenue contribution: 18% of total',
        'Implementation: 16-week sprint',
      ],
    },
    {
      id: 3,
      title: 'B2B Manufacturing Company',
      challenge: 'Modernization of legacy operations',
      metric: '28% operational efficiency gain',
      industry: 'Manufacturing',
      approach: 'Systems integration, process optimization, buyer enablement',
      results: [
        'Order processing time: -41%',
        'Supply chain visibility: Real-time',
        'Client retention: +23%',
        'New market entry: 3 regions',
      ],
    },
  ]

  return (
    <main className="bg-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative px-12 pt-32 pb-20 overflow-hidden min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-acid/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2.5 font-mono text-xs tracking-widest text-cyan mb-6">
              <motion.div className="w-10 h-px bg-cyan" />
              Case Studies
            </div>
            <h1 className="font-bebas text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6 text-white">
              Outcomes <span className="text-cyan">That Matter</span>
            </h1>
            <p className="max-w-2xl text-lg text-muted leading-relaxed">
              Real challenges from real enterprises. Here's how we solved them and what changed for our clients.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Case Studies Grid */}
      <section className="relative px-12 py-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-20"
          >
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                variants={itemVariants}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Left: Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 bg-cyan/10 border border-cyan/30 rounded text-xs font-mono tracking-widest text-cyan uppercase mb-4">
                      {study.industry}
                    </span>
                    <h2 className="font-bebas text-4xl md:text-5xl text-white mb-4">{study.title}</h2>
                  </div>

                  <div className="mb-8 p-6 bg-card border border-cyan/20 rounded-lg">
                    <p className="text-sm text-muted font-mono uppercase tracking-wider mb-2">Challenge</p>
                    <p className="text-white font-semibold">{study.challenge}</p>
                  </div>

                  <div className="mb-8">
                    <p className="text-sm text-muted font-mono uppercase tracking-wider mb-4">Approach</p>
                    <p className="text-muted leading-relaxed">{study.approach}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted font-mono uppercase tracking-wider mb-4">Results</p>
                    <ul className="space-y-2">
                      {study.results.map((result, i) => (
                        <li key={i} className="text-muted text-sm flex gap-3">
                          <span className="text-acid font-bold shrink-0">→</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Metrics */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <motion.div
                    className="relative bg-gradient-to-br from-card to-background border border-cyan/20 rounded-lg p-12 hover:border-cyan/40 transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <div className="absolute top-4 right-4 w-12 h-12 bg-cyan/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📊</span>
                    </div>

                    <div className="text-center">
                      <p className="text-xs font-mono tracking-widest text-muted uppercase mb-4">Key Metric</p>
                      <h3 className="font-bebas text-5xl text-cyan mb-6">{study.metric}</h3>
                      <div className="h-24 bg-cyan/5 border border-cyan/10 rounded-lg flex items-center justify-center">
                        <p className="text-xs text-muted italic text-center px-4">
                          Measured and tracked throughout engagement
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-12 py-32 overflow-hidden z-10 border-t border-cyan/20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="font-bebas text-5xl md:text-6xl text-white mb-6">Your Challenge Is Here</h2>
            <p className="text-muted leading-relaxed mb-8">
              If any of these scenarios resonate with your business, we've likely solved it before. Let's discuss how we can deliver similar outcomes for you.
            </p>
          </motion.div>

          <motion.a
            variants={itemVariants}
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan to-acid text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Schedule a Strategy Discussion
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8h14M9 1l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.a>
        </motion.div>
      </section>
    </main>
  )
}

export default CaseStudiesPage
