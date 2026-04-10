'use client'

import { motion } from 'framer-motion'

interface ProcessStep {
  num: string
  title: string
  desc: string
}

const Process = () => {
  const processSteps: ProcessStep[] = [
    {
      num: '01',
      title: 'Deep Audit',
      desc: "We dissect your current digital presence — site performance, SEO gaps, ad account health, and competitive landscape. We find every leak before building.",
    },
    {
      num: '02',
      title: 'Strategy Blueprint',
      desc: 'A custom growth roadmap mapped to your business goals. Every service works in synchrony — no siloed thinking, no wasted budget.',
    },
    {
      num: '03',
      title: 'Execute & Build',
      desc: 'Our specialists move fast. Websites launched in weeks, campaigns live in days. Flawless execution backed by obsessive QA.',
    },
    {
      num: '04',
      title: 'Scale & Dominate',
      desc: 'We monitor, optimize, and aggressively scale what works. Monthly reports, transparent data, and a relentless push toward market dominance.',
    },
  ]

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

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const dotVariants = {
    rest: { scale: 1, boxShadow: '0 0 0 0px rgba(0, 245, 255, 0.3)' },
    hover: {
      scale: 1.1,
      y: -8,
      boxShadow: '0 10px 30px rgba(0, 245, 255, 0.4)',
      transition: { type: 'spring', stiffness: 300 },
    },
  }

  return (
    <section id="process" className="px-12 py-32 relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-3 font-mono text-xs tracking-wider text-cyan mb-6"
      >
        <span className="text-muted">[ </span>
        How We Work
        <span className="text-muted"> ]</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="font-bebas text-5xl md:text-7xl leading-tight tracking-tighter mb-20"
      >
        THE NEXUS<br />
        <span className="text-muted">PROCESS</span>
      </motion.h2>

      <div className="flex flex-col lg:flex-row gap-0 relative">
        {/* Animated Process line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="absolute top-10 left-0 right-0 h-px hidden lg:block pointer-events-none origin-left"
          style={{
            background: 'linear-gradient(90deg, transparent, #00f5ff, #b4ff39, #ff2d78, transparent)',
            opacity: 0.3,
          }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row w-full gap-0 relative"
        >
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              variants={stepVariants}
              className="flex-1 px-8 relative transition-all duration-300 group"
              whileHover="hover"
              initial="rest"
            >
              {/* Step dot */}
              <motion.div
                variants={dotVariants}
                className="w-20 h-20 border border-cyan/20 flex items-center justify-center mb-8 bg-card transition-all duration-400 group-hover:border-cyan cursor-pointer"
                style={{ clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)' }}
              >
                <motion.span
                  className="font-bebas text-2xl text-cyan"
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                >
                  {step.num}
                </motion.span>
              </motion.div>

              {/* Step content */}
              <motion.div
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-bebas text-2xl tracking-wide mb-3 leading-tight">{step.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
              </motion.div>

              {/* Connection line for mobile */}
              {i < processSteps.length - 1 && (
                <motion.div
                  className="lg:hidden my-6 ml-10 h-12 border-l-2 border-cyan/20"
                  initial={{ opacity: 0, height: 0 }}
                  whileInView={{ opacity: 1, height: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Process
