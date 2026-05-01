'use client'

import { motion } from 'framer-motion'
import type { FadeInProps } from './types'

export const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, duration = 0.6 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  )
}
