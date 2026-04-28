'use client'

import { motion } from 'framer-motion'

interface AnimatedCardProps {
  children: React.ReactNode
  delay?: number
}

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

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
}

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

interface SlideUpProps {
  children: React.ReactNode
  delay?: number
}

export const SlideUp: React.FC<SlideUpProps> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}
