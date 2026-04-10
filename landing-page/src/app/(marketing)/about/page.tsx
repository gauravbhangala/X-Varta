'use client'

import { motion } from 'framer-motion'

const AboutPage = () => {
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

  const values = [
    {
      title: 'Clarity Over Complexity',
      description: 'We simplify enterprise challenges into actionable strategies. Complex problems deserve clear solutions.',
      icon: '🎯',
    },
    {
      title: 'Data-Driven Decisions',
      description: 'Every recommendation is backed by research, analysis, and verifiable metrics. No assumptions.',
      icon: '📊',
    },
    {
      title: 'Systems Not Shortcuts',
      description: 'Sustainable growth comes from repeatable systems and infrastructure, not heroic efforts.',
      icon: '⚙️',
    },
    {
      title: 'Accountability Always',
      description: 'We measure what we promise. Transparent reporting on progress, wins, and misses.',
      icon: '✓',
    },
    {
      title: 'Enterprise Empathy',
      description: 'We understand large organizations. Slow decision-making, competing priorities, legacy systems.',
      icon: '💡',
    },
    {
      title: 'Outcome Obsession',
      description: 'Your success is our success. We optimize for your business impact, not billable hours.',
      icon: '🚀',
    },
  ]

  const team = [
    {
      role: 'Strategy & Leadership',
      description:
        '15+ years driving enterprise digital transformation. Led digital operations for Fortune 500 companies, scaled SaaS platforms, and built systems that serve millions.',
    },
    {
      role: 'Platform Architecture',
      description:
        'Expert-level infrastructure design. We architecting systems for scale, security, and compliance. Experience with high-traffic platforms and complex integrations.',
    },
    {
      role: 'Growth & Positioning',
      description:
        'Trained in Jobs-to-be-Done methodology, buyer psychology, and market dynamics. We position your solutions to win competitive deals.',
    },
    {
      role: 'Sales & Marketing Alignment',
      description:
        'We bridge the gap between marketing and sales. Experience building sales enablement systems and optimizing deal cycles.',
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
              About Us
            </div>
            <h1 className="font-bebas text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6 text-white">
              Built for <span className="text-cyan">Enterprise</span>
            </h1>
            <p className="max-w-2xl text-lg text-muted leading-relaxed">
              We help large organizations modernize their digital operations, scale efficiently, and capture market opportunities through strategic systems and precise execution.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Origin Story */}
      <section className="relative px-12 py-32 overflow-hidden z-10 border-t border-cyan/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="font-bebas text-5xl text-white mb-8">Our Story</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants} className="space-y-6">
                <p className="text-muted leading-relaxed">
                  We started because we saw a pattern: large organizations know what they need to change, but execution is hard. They face competing priorities, legacy systems, skeptical stakeholders, and the complex reality of running large operations.
                </p>

                <p className="text-muted leading-relaxed">
                  Most agencies don't get this. They're optimized for startup speed or creative campaigns. But enterprise transformation demands something different: patience, rigor, transparency, and systems thinking.
                </p>

                <p className="text-muted leading-relaxed">
                  So we built a firm designed specifically for this challenge. We don't rush. We research. We build systems that work at scale. We document our thinking. We measure everything. We admit when we're wrong.
                </p>

                <p className="text-muted leading-relaxed">
                  Our clients trust us because we've been through this at scale. We understand the politics, the constraints, the opportunities. And we deliver outcomes—not excuses.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-card to-background border border-cyan/20 rounded-lg p-12"
              >
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-mono tracking-widest text-cyan uppercase mb-3">Founded</p>
                    <p className="text-2xl text-white font-semibold">2018</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono tracking-widest text-cyan uppercase mb-3">Enterprise Clients</p>
                    <p className="text-2xl text-white font-semibold">180+</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono tracking-widest text-cyan uppercase mb-3">Revenue Enabled</p>
                    <p className="text-2xl text-white font-semibold">$650M+</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono tracking-widest text-cyan uppercase mb-3">Industries Served</p>
                    <p className="text-2xl text-white font-semibold">12+</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="relative px-12 py-32 overflow-hidden z-10 border-t border-cyan/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="font-bebas text-5xl text-white mb-4">Our Values</h2>
              <p className="text-muted max-w-2xl">
                These principles guide every decision we make and every project we take on.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-card to-background border border-cyan/10 rounded-lg p-8 hover:border-cyan/30 transition-all"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="font-bebas text-xl text-cyan mb-3">{value.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Expertise */}
      <section className="relative px-12 py-32 overflow-hidden z-10 border-t border-cyan/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="font-bebas text-5xl text-white mb-4">Team Expertise</h2>
              <p className="text-muted max-w-2xl">
                We're not a typical agency. Every person on our team brings deep enterprise experience.
              </p>
            </motion.div>

            <div className="space-y-6">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-card border border-cyan/10 rounded-lg p-8 hover:border-cyan/30 transition-all"
                >
                  <h3 className="font-bebas text-2xl text-cyan mb-3">{member.role}</h3>
                  <p className="text-muted leading-relaxed">{member.description}</p>
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
              Let's Work Together
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              If what you've read resonates, let's have a conversation about your challenges and opportunities.
            </p>
          </motion.div>

          <motion.a
            variants={itemVariants}
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan to-acid text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Us
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8h14M9 1l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.a>
        </motion.div>
      </section>
    </main>
  )
}

export default AboutPage
