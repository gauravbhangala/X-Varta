'use client'

import { motion } from 'framer-motion'

const SolutionsPage = () => {
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

  const solutions = [
    {
      title: 'Digital Transformation Strategy',
      description:
        'Comprehensive assessment and roadmap for modernizing digital operations. We audit your current state, identify growth opportunities, and build a phased implementation plan.',
      features: [
        'Current-state maturity assessment',
        'Competitive benchmarking analysis',
        'Roadmap development (12-36 months)',
        'Organizational alignment workshops',
        'ROI forecasting and resource planning',
      ],
      timeline: '6-8 weeks',
      investment: 'Custom based on scope',
    },
    {
      title: 'Enterprise Web & Platform Solutions',
      description:
        'Custom-built, scalable digital platforms designed for security, compliance, and performance. From architecture through deployment.',
      features: [
        'System architecture design',
        'Security & compliance integration',
        'Scalability planning',
        'API integration & third-party systems',
        'Performance optimization & monitoring',
      ],
      timeline: '12-24 weeks',
      investment: 'Custom based on complexity',
    },
    {
      title: 'Growth & Market Positioning',
      description:
        'Strategic positioning and market acceleration. We help you define your value, reach the right buyers, and optimize conversion.',
      features: [
        'Market positioning strategy',
        'Buyer research & persona development',
        'Go-to-market strategy',
        'Messaging architecture',
        'Channel strategy & activation',
      ],
      timeline: '8-12 weeks',
      investment: '$15K - $45K',
    },
    {
      title: 'Sales & Marketing Enablement',
      description:
        'Equip your teams with systems, tools, and messaging to accelerate deal cycles. Alignment between marketing and sales drives results.',
      features: [
        'Sales collateral development',
        'Messaging framework & validation',
        'Marketing automation setup',
        'Sales training & onboarding',
        'Performance tracking dashboard',
      ],
      timeline: '8-10 weeks',
      investment: '$20K - $60K',
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
              Solutions
            </div>
            <h1 className="font-bebas text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6 text-white">
              Strategic <span className="text-cyan">Solutions</span>
            </h1>
            <p className="max-w-2xl text-lg text-muted leading-relaxed">
              Four core services, each designed to solve critical enterprise challenges. Mix and match based on your needs.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Solutions Grid */}
      <section className="relative px-12 py-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {solutions.map((solution, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group bg-gradient-to-br from-card to-background border border-cyan/10 rounded-lg p-10 hover:border-cyan/40 transition-all"
                whileHover={{ y: -5 }}
              >
                {/* Title */}
                <h3 className="font-bebas text-2xl text-cyan mb-4">{solution.title}</h3>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed mb-8">{solution.description}</p>

                {/* Features */}
                <div className="mb-8 pb-8 border-b border-cyan/10">
                  <p className="text-xs font-mono tracking-widest text-cyan uppercase mb-4">What's Included</p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="text-xs text-muted flex gap-2">
                        <span className="text-acid font-bold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline & Investment */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-mono tracking-widest text-muted uppercase mb-1">Timeline</p>
                    <p className="text-white font-semibold">{solution.timeline}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono tracking-widest text-muted uppercase mb-1">Investment Range</p>
                    <p className="text-white font-semibold">{solution.investment}</p>
                  </div>
                </div>

                {/* CTA */}
                <motion.a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-cyan text-xs font-mono tracking-widest uppercase hover:text-acid transition-colors mt-8 group"
                  whileHover={{ x: 4 }}
                >
                  Learn More
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    →
                  </motion.span>
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solution Combinations */}
      <section className="relative px-12 py-32 overflow-hidden z-10 border-t border-cyan/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="font-bebas text-5xl text-white mb-6">Common Combinations</h2>
              <p className="text-muted max-w-2xl">
                Most enterprises benefit from combining solutions. Here are common patterns:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: 'The Accelerator',
                  solutions: ['Market Positioning', 'Sales Enablement'],
                  outcome: 'Faster deal cycles & higher conversion',
                  timeline: '12-14 weeks',
                },
                {
                  name: 'The Foundation',
                  solutions: ['Digital Transformation', 'Enterprise Platform'],
                  outcome: 'Modern infrastructure & scalable systems',
                  timeline: '18-32 weeks',
                },
                {
                  name: 'The Complete Transformation',
                  solutions: ['All Four Solutions'],
                  outcome: 'End-to-end digital modernization',
                  timeline: '24-36 weeks',
                },
                {
                  name: 'The Strategy First',
                  solutions: ['Digital Transformation', 'Market Positioning'],
                  outcome: 'Clear roadmap & competitive positioning',
                  timeline: '14-20 weeks',
                },
              ].map((combo, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-card border border-cyan/10 rounded-lg p-8 hover:border-cyan/30 transition-all"
                >
                  <h3 className="font-bebas text-xl text-cyan mb-3">{combo.name}</h3>
                  <div className="mb-4">
                    <p className="text-xs text-muted font-mono uppercase mb-2">Includes</p>
                    <div className="flex flex-wrap gap-2">
                      {combo.solutions.map((sol, idx) => (
                        <span key={idx} className="text-xs bg-cyan/10 border border-cyan/30 text-cyan px-2 py-1 rounded">
                          {sol}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-white mb-4">{combo.outcome}</p>
                  <p className="text-xs text-muted font-mono">{combo.timeline}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-12 py-32 overflow-hidden z-10 border-t border-cyan/20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="font-bebas text-5xl md:text-6xl text-white mb-6">
              Not Sure Which Is Right?
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Schedule a strategy discussion. We'll assess your situation and recommend the best approach.
            </p>
          </motion.div>

          <motion.a
            variants={itemVariants}
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan to-acid text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Start a Conversation
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8h14M9 1l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.a>
        </motion.div>
      </section>
    </main>
  )
}

export default SolutionsPage
