'use client'

import { motion } from 'framer-motion'

const CaseStudy = () => {
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
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const sections = [
    {
      title: 'Client Context',
      description: '[Enterprise SaaS Client] — B2B platform, $15M ARR, 60-person team, 12-month sales cycle, enterprise customer base.',
      icon: '📋',
    },
    {
      title: 'Challenge',
      description: 'Sales cycle stalled at 6+ months. Web presence didn\'t communicate ROI to executive buyers. Conversion rate: 1.2%. Messaging misaligned between sales and marketing. Competitive positioning unclear.',
      details: [
        'Root Cause Analysis: Website positioned around features, not business outcomes.',
        'Market Context: 3 competitors entering space with clearer value propositions.',
        'Internal Gap: Sales team working from messaging not on website.',
      ],
      icon: '⚠️',
    },
    {
      title: 'Approach',
      description: 'Conducted discovery: customer interviews (12), competitive analysis (5 primary), sales call audits (30). Built messaging architecture around business outcomes. Designed sales-marketing feedback loop.',
      details: [
        'Systems Used: Clearbit (data enrichment), Typeform (buyer research), Figma (rapid prototyping)',
        'Framework: Jobs-to-be-Done for messaging development',
        'Reasoning: Executive buyers evaluate solutions on business impact, not technical features. Clear outcome-focused messaging reduces sales friction.',
      ],
      icon: '🎯',
    },
    {
      title: 'Implementation Timeline',
      description: 'Phased delivery over 14 weeks with measurable gates at each phase to ensure alignment and early course correction.',
      timeline: [
        {
          phase: 'Days 1-30: Discovery & Strategy',
          items: [
            'Buyer persona refinement & customer interviews',
            'Competitive positioning map',
            'Value proposition architecture',
            'Sales team workshop & feedback incorporation',
          ],
        },
        {
          phase: 'Days 31-60: Redesign & Build',
          items: [
            'Website information architecture redesign',
            'Sales enablement materials development',
            'Marketing automation setup (HubSpot)',
            'Content pillar mapping & first 20% of assets',
          ],
        },
        {
          phase: 'Days 61-90: Optimization & Launch',
          items: [
            'A/B testing on key conversion points',
            'SEO optimization & content expansion',
            'Sales team integration & training',
            'Go-live with monitoring dashboard',
          ],
        },
      ],
      icon: '⚙️',
    },
    {
      title: 'Outcome',
      description: 'Sales cycle reduced to 14 weeks (57% improvement). Conversion rate increased to 2.8% (133% improvement). Qualified leads increased 210%. YoY revenue growth: 34%.',
      details: [
        'Metric: Sales cycle tracked weekly via CRM',
        'Baseline: 1.2% conversion on web → decision phase',
        'Attribution: 67% of new customers reported website/content as decision factor',
      ],
      icon: '📈',
    },
  ]

  return (
    <section id="case-studies" className="relative px-12 py-32 overflow-hidden z-10">
      {/* Gradient backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-acid/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-cyan mb-6">
            <span className="text-muted">[ </span>
            Case Study Example
            <span className="text-muted"> ]</span>
          </div>
          <h2 className="font-bebas text-5xl md:text-6xl leading-tight tracking-tight mb-6">
            Strategic Repositioning & Growth
          </h2>
          <p className="text-muted max-w-2xl leading-relaxed">
            The following case study illustrates our approach to diagnosing challenges and implementing measurable improvements for enterprise clients.
          </p>
        </motion.div>

        {/* Case Study Flow - Clean, readable */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative bg-gradient-to-br from-card to-background border border-cyan/10 rounded-lg p-8 md:p-12 hover:border-cyan/30 transition-all"
            >
              {/* Subtle accent line */}
              <motion.div
                className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan to-acid"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
              />

              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start gap-6">
                  <span className="text-3xl shrink-0">{section.icon}</span>
                  <div>
                    <h3 className="font-bebas text-2xl text-cyan mb-3">{section.title}</h3>
                    <p className="text-muted leading-relaxed text-sm">{section.description}</p>
                  </div>
                </div>

                {/* Timeline Details (for Implementation section) */}
                {section.timeline && (
                  <div className="mt-6 space-y-4 border-t border-cyan/10 pt-6">
                    {section.timeline.map((phase, phaseIdx) => (
                      <div key={phaseIdx}>
                        <h4 className="text-sm font-semibold text-white mb-3">{phase.phase}</h4>
                        <ul className="space-y-2 ml-4">
                          {phase.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="text-xs text-muted flex gap-2">
                              <span className="text-cyan font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Details & Reasoning */}
                {section.details && (
                  <div className="space-y-3 border-t border-cyan/10 pt-6">
                    {section.details.map((detail, detailIdx) => (
                      <p key={detailIdx} className="text-xs text-muted leading-relaxed flex gap-3">
                        <span className="text-acid font-bold shrink-0">→</span>
                        <span>{detail}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Learnings */}
        <motion.div variants={itemVariants} className="mt-20 bg-gradient-to-r from-cyan/10 to-acid/10 border border-cyan/20 rounded-lg p-12">
          <h3 className="font-bebas text-2xl mb-6 text-white">Key Learnings</h3>
          <ul className="space-y-5">
            <li className="flex gap-4">
              <span className="text-cyan font-bold text-lg">1.</span>
              <div>
                <span className="text-white font-semibold block mb-1">Outcome-Focused Messaging Compresses Sales Cycles</span>
                <span className="text-muted text-sm">Enterprise buyers evaluate solutions on business impact first. Features support the decision, but outcomes drive it. This client reduced sales friction by 40% through clearer ROI positioning.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-acid font-bold text-lg">2.</span>
              <div>
                <span className="text-white font-semibold block mb-1">Sales-Marketing Alignment Multiplies Impact</span>
                <span className="text-muted text-sm">Messaging that sales teams don't use doesn't work. By involving sales in the positioning workshop, we ensured adoption and created a feedback loop that improved messaging continuously.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-magenta font-bold text-lg">3.</span>
              <div>
                <span className="text-white font-semibold block mb-1">Measurement Systems Enable Rapid Optimization</span>
                <span className="text-muted text-sm">Weekly sales cycle tracking and conversion point monitoring revealed which messaging changes had real impact. This data-driven approach allowed us to prioritize the highest-leverage improvements.</span>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <p className="text-muted mb-6 text-sm">Interested in discussing your growth challenges?</p>
          <motion.a
            href="#engagement"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan to-acid text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Schedule Strategy Discussion
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8h14M9 1l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default CaseStudy
