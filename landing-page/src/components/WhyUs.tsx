'use client'

import { motion } from 'framer-motion'

interface WhyItem {
  num: string
  title: string
  desc: string
  category: 'Approach' | 'Systems' | 'Execution'
}

interface Stat {
  num: string
  label: string
}

const WhyUs = () => {
  const whyItems: WhyItem[] = [
    {
      num: '01',
      title: 'Research-First Strategy',
      desc: 'We diagnose before prescribing. Customer interviews, competitive analysis, sales audits, and market context inform every recommendation. No assumptions.',
      category: 'Approach',
    },
    {
      num: '02',
      title: 'Outcome-Focused Positioning',
      desc: 'Your messaging is engineered around business outcomes, not features. This shifts buyer perception and compresses sales cycles by 40%+.',
      category: 'Approach',
    },
    {
      num: '03',
      title: 'Integrated Execution',
      desc: 'One team. Web design, content, paid media, and sales enablement move in lockstep. No agency handoffs. No mixed messages.',
      category: 'Systems',
    },
    {
      num: '04',
      title: 'Systems-Based Scaling',
      desc: 'We build repeatable systems—not heroic efforts. Your growth compounds through infrastructure, not individual brilliance.',
      category: 'Systems',
    },
    {
      num: '05',
      title: 'Measurement & Iteration',
      desc: 'Baselines established day one. Weekly tracking on KPIs, rapid testing, continuous optimization. Data drives every decision.',
      category: 'Execution',
    },
    {
      num: '06',
      title: 'Radical Transparency',
      desc: 'You see all metrics. We document our thinking. We report wins and misses equally. Trust is built through honest communication.',
      category: 'Execution',
    },
  ]

  const categories = ['Approach', 'Systems', 'Execution'] as const
  const categoryDescriptions = {
    Approach: 'How we think and diagnose your challenges',
    Systems: 'How we deliver and execute at scale',
    Execution: 'How we measure and optimize continuously',
  }

  const stats: Stat[] = [
    { num: '180+', label: 'Enterprise Clients Served' },
    { num: '34%', label: 'Avg. YoY Revenue Growth' },
    { num: '6wk', label: 'Average Engagement Velocity' },
    { num: '92%', label: 'Project Success Rate' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="why"
      className="relative py-32 overflow-hidden z-10"
      style={{
        background: 'linear-gradient(170deg, transparent 40%, rgba(0,245,255,.03) 100%)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left Side */}
        <div className="px-12 py-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 font-mono text-xs tracking-wider text-cyan mb-6"
          >
            <span className="text-muted">[ </span>
            Where We Differ
            <span className="text-muted"> ]</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-bebas text-5xl md:text-6xl leading-tight tracking-tighter mb-4"
          >
            Our Three<br />
            <span className="text-muted">Operating Pillars</span>
          </motion.h2>

          <p className="text-muted text-sm mb-16 max-w-xl">
            Enterprise growth isn't generic. Our three pillars—how we approach problems, how we deliver solutions, and how we measure results—work together to compress timelines and multiply outcomes.
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-0"
          >
            {categories.map((category) => (
              <div key={category} className="mb-12 pb-12 border-b border-cyan/20 last:border-b-0 last:mb-0 last:pb-0">
                <div className="mb-8">
                  <h3 className="font-bebas text-xl text-cyan uppercase tracking-wider mb-2">{category}</h3>
                  <p className="text-xs text-muted">{categoryDescriptions[category]}</p>
                </div>
                <div className="space-y-6">
                  {whyItems.filter((item) => item.category === category).map((item, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="group flex gap-4 cursor-pointer"
                      whileHover={{ paddingLeft: 12 }}
                    >
                      <motion.div
                        className="font-bebas text-3xl text-cyan leading-none shrink-0"
                        whileHover={{ scale: 1.15 }}
                      >
                        {item.num}
                      </motion.div>
                      <div>
                        <motion.h4
                          className="text-base font-bold mb-1 transition-colors group-hover:text-acid"
                          whileHover={{ color: '#ffff00' }}
                        >
                          {item.title}
                        </motion.h4>
                        <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="px-12 py-20 bg-card border-l border-cyan/20"
          style={{ clipPath: 'polygon(40px 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-0"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={statVariants}
                className={`text-center py-10 ${i !== stats.length - 1 ? 'border-b border-cyan/20' : ''}`}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="font-bebas text-7xl leading-none bg-linear-to-r from-cyan to-acid bg-clip-text text-transparent mb-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {stat.num}
                </motion.div>
                <motion.div
                  className="text-sm text-muted tracking-wider"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyUs
