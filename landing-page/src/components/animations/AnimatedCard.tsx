'use client'

import { motion } from 'framer-motion'
import type { AnimatedCardProps } from './types'

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="h-full"
    >
      {children}
    </motion.div>
  )
}
