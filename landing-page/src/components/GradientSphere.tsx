'use client'

import { motion } from 'framer-motion'

export const GradientSphere = () => {
  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      {/* Animated gradient sphere */}
      <div className="relative w-80 h-80">
        {/* Outer glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse" />
        
        {/* Main sphere */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full shadow-2xl">
          {/* Light reflection */}
          <div className="absolute top-12 left-12 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        </div>

        {/* Floating particles */}
        <motion.div
          className="absolute -top-8 -right-8 w-12 h-12 bg-blue-400 rounded-full blur-lg opacity-50"
          animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-12 -left-4 w-16 h-16 bg-purple-400 rounded-full blur-lg opacity-40"
          animate={{ y: [0, -25, 0], x: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 -right-6 w-10 h-10 bg-pink-400 rounded-full blur-lg opacity-50"
          animate={{ y: [0, 20, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>
    </div>
  )
}
