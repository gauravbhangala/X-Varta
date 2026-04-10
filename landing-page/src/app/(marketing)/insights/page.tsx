'use client'

import { motion } from 'framer-motion'

const InsightsPage = () => {
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

  const insights = [
    {
      id: 1,
      title: 'Why Enterprise Sales Cycles Are Longer Than They Need to Be',
      category: 'Strategy',
      date: 'Jan 2025',
      readTime: '5 min read',
      excerpt:
        'Most enterprise sales cycles are artificially inflated. Not because of procurement. Because of unclear messaging and misalignment between teams.',
      preview: 'The average enterprise sales cycle is 6+ months. We\'ve cut that to 14 weeks for our clients. Here\'s how...',
    },
    {
      id: 2,
      title: 'The Jobs-to-be-Done Framework for SaaS Positioning',
      category: 'Framework',
      date: 'Dec 2024',
      readTime: '8 min read',
      excerpt:
        'Feature lists don\'t sell. Buyers evaluate solutions on business outcomes. Here\'s the framework we use to position for winning deals.',
      preview: 'How to identify the real job your customer is trying to do and build messaging around it.',
    },
    {
      id: 3,
      title: 'Systems Thinking for Enterprise Growth',
      category: 'Operations',
      date: 'Nov 2024',
      readTime: '7 min read',
      excerpt:
        'Sustainable growth doesn\'t come from individual heroics. It comes from systems that work reliably at scale without requiring genius.',
      preview: 'A practical guide to building repeatable systems that accelerate growth.',
    },
    {
      id: 4,
      title: 'The Death of the Marketing Funnel (And What Replaces It)',
      category: 'Strategy',
      date: 'Oct 2024',
      readTime: '6 min read',
      excerpt:
        'Your buyers don\'t move linearly through a funnel. They loop, backtrack, and seek validation. Here\'s a better mental model.',
      preview: 'Understanding buyer behavior at every stage of enterprise decision-making.',
    },
    {
      id: 5,
      title: 'Measurement That Matters: KPIs for Digital Transformation',
      category: 'Analytics',
      date: 'Sep 2024',
      readTime: '9 min read',
      excerpt:
        'You can\'t manage what you don\'t measure. Here\'s how to establish baselines and track the metrics that actually matter.',
      preview: 'Building a measurement framework that drives decision-making and accountability.',
    },
    {
      id: 6,
      title: 'Why Enterprise Teams Miss Competitive Opportunities',
      category: 'Strategy',
      date: 'Aug 2024',
      readTime: '6 min read',
      excerpt:
        'Large organizations move slowly. But miss no-brainers. Here\'s why and how to fix it.',
      preview: 'Structural barriers in large organizations and how to overcome them.',
    },
  ]

  const categories = ['All', 'Strategy', 'Framework', 'Operations', 'Analytics']

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
              Insights
            </div>
            <h1 className="font-bebas text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6 text-white">
              Thought <span className="text-cyan">Leadership</span>
            </h1>
            <p className="max-w-2xl text-lg text-muted leading-relaxed">
              Frameworks, strategies, and insights from 15+ years of enterprise digital transformation. Practical thinking for serious companies.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Insights Grid */}
      <section className="relative px-12 py-32 overflow-hidden z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Filter Tabs */}
            <motion.div variants={itemVariants} className="mb-16 flex gap-3 overflow-x-auto pb-4">
              {categories.map((category, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-lg font-mono text-xs tracking-widest uppercase transition-all shrink-0 ${
                    i === 0
                      ? 'bg-cyan text-black'
                      : 'bg-card border border-cyan/20 text-cyan hover:border-cyan/40'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {insights.map((insight) => (
                <motion.article
                  key={insight.id}
                  variants={itemVariants}
                  className="group bg-gradient-to-br from-card to-background border border-cyan/10 rounded-lg p-8 hover:border-cyan/40 transition-all cursor-pointer"
                  whileHover={{ y: -5 }}
                >
                  {/* Category Badge */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-block px-2 py-1 bg-cyan/10 border border-cyan/30 rounded text-xs font-mono tracking-widest text-cyan uppercase">
                      {insight.category}
                    </span>
                    <span className="text-xs text-muted font-mono">{insight.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bebas text-2xl text-white mb-3 group-hover:text-cyan transition-colors">
                    {insight.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted text-sm mb-6 leading-relaxed">{insight.excerpt}</p>

                  {/* Preview */}
                  <div className="p-4 bg-cyan/5 border border-cyan/10 rounded-lg mb-6">
                    <p className="text-xs text-cyan font-mono uppercase tracking-wider mb-2">Preview</p>
                    <p className="text-sm text-muted italic">{insight.preview}</p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted font-mono">{insight.readTime}</span>
                    <motion.span
                      className="text-cyan font-mono text-xs uppercase font-bold"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
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
              Stay Updated
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              New insights delivered monthly. No sales pitches. Just practical frameworks and strategies for enterprise growth.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-card border border-cyan/20 rounded-lg text-white placeholder-muted focus:outline-none focus:border-cyan/40 transition-all"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-cyan to-acid text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan/50 transition-all">
              Subscribe
            </button>
          </motion.div>

          <p className="text-xs text-muted mt-4">We respect your inbox. Unsubscribe anytime.</p>
        </motion.div>
      </section>
    </main>
  )
}

export default InsightsPage
