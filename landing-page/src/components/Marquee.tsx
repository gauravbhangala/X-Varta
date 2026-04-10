'use client'

import { motion } from 'framer-motion'

const Marquee = () => {
  const items = [
    'Web Architecture',
    'Advanced SEO',
    'Performance Marketing',
    'Social Media Command',
    'Brand Authority',
    'Revenue Scaling',
    'Digital Dominance',
    'High-Intent Traffic',
  ]

  const marqueeVariants = {
    animate: {
      x: [0, -1920],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 20,
          ease: 'linear',
        },
      },
    },
  }

  return (
    <motion.div
      className="overflow-hidden border-y border-cyan/20 bg-cyan/3 py-5 relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="flex gap-0"
        variants={marqueeVariants}
        animate="animate"
        style={{ width: 'max-content' }}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-8 px-12 font-bebas text-xl tracking-wider whitespace-nowrap ${
              (i + 1) % 2 === 0 ? 'text-cyan' : 'text-muted'
            }`}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            />
            {item}
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Marquee
