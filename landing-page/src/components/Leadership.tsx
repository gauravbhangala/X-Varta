'use client'

import { motion } from 'framer-motion'

const Leadership = () => {
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

  const leaders = [
    {
      name: 'Leadership Team',
      title: 'Collective Expertise',
      background:
        '15+ years scaling enterprise digital operations across Fortune 500 companies, mid-market SaaS platforms, and high-growth startups.',
      expertise: [
        'Enterprise architecture & digital transformation',
        'Sales enablement & revenue operations',
        'Platform engineering & systems design',
        'Data-driven marketing & performance optimization',
      ],
      approach:
        'We lead with strategy, execute with precision, and measure everything. Our philosophy: clarity drives decisions, systems enable scale, measurement enables improvement.',
    },
  ]

  const principles = [
    {
      title: 'Strategy First, Tactics Never',
      desc: 'We diagnose before we prescribe. Every recommendation is grounded in research, customer insight, and competitive context—not trends.',
      icon: '🎯',
    },
    {
      title: 'Systems Over Heroics',
      desc: 'Sustainable growth comes from repeatable systems, not individual brilliance. We build infrastructure that works at scale with less friction.',
      icon: '⚙️',
    },
    {
      title: 'Measure Everything',
      desc: 'Assumptions are liabilities. We establish baselines, track progress, and iterate rapidly. Transparency on metrics is non-negotiable.',
      icon: '📊',
    },
    {
      title: 'Execute, Then Optimize',
      desc: 'Perfect preparation is procrastination. We ship quickly, gather data, and refine. Speed of learning beats perfection of planning.',
      icon: '🚀',
    },
  ]

  return (
    <section id="leadership" className="relative px-12 py-32 overflow-hidden z-10">
      {/* Gradient backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-acid/5 rounded-full blur-3xl" />
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
            Our Approach
            <span className="text-muted"> ]</span>
          </div>
          <h2 className="font-bebas text-5xl md:text-6xl leading-tight tracking-tight mb-6">
            Leadership & Expertise
          </h2>
          <p className="text-muted max-w-3xl leading-relaxed">
            Our team brings 15+ years of enterprise-scale experience. We've architected platforms that serve millions, optimized systems that generate hundreds of millions in revenue, and led transformations that redefined market positions. This isn't theory—it's hard-won experience.
          </p>
        </motion.div>

        {/* Leadership Card */}
        <motion.div variants={itemVariants} className="mb-20 bg-gradient-to-br from-card to-background border border-cyan/20 rounded-lg p-12 md:p-16 hover:border-cyan/40 transition-all">
          <div className="space-y-8">
            {leaders.map((leader, i) => (
              <div key={i}>
                <div className="mb-6">
                  <h3 className="font-bebas text-3xl text-cyan mb-2">{leader.name}</h3>
                  <p className="text-sm text-acid font-semibold">{leader.title}</p>
                </div>

                <p className="text-muted leading-relaxed mb-8">{leader.background}</p>

                <div className="mb-8 p-6 bg-cyan/5 border border-cyan/20 rounded-lg">
                  <p className="text-sm text-white font-semibold mb-4">Core Competencies</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {leader.expertise.map((exp, expIdx) => (
                      <li key={expIdx} className="flex gap-3 text-sm text-muted">
                        <span className="text-cyan font-bold">✓</span>
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-l-2 border-acid pl-6 py-2">
                  <p className="text-muted leading-relaxed italic text-sm">"{leader.approach}"</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Principles Grid */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="font-bebas text-3xl mb-12 text-white">Our Operating Philosophy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-gradient-to-br from-card to-background border border-cyan/10 rounded-lg p-8 hover:border-cyan/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{principle.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-bebas text-lg text-cyan mb-3">{principle.title}</h4>
                    <p className="text-xs text-muted leading-relaxed">{principle.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Statement */}
        <motion.div
          variants={itemVariants}
          className="mt-20 border-t border-cyan/20 pt-12"
        >
          <div className="max-w-3xl">
            <h3 className="font-bebas text-2xl text-white mb-4">Why Trust Us</h3>
            <p className="text-muted leading-relaxed mb-6">
              We've worked with enterprise teams that have strict requirements: transparency on timelines, accountability on metrics, and clarity on reasoning. These demands have made us better. We document our thinking, we measure our promises, and we admit when we're wrong. Your success is tied to our reputation—we treat every engagement with that weight.
            </p>
            <p className="text-sm text-teal font-semibold">
              Ready to discuss your digital strategy?
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Leadership
