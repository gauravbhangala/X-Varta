'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Show after scrolling 800px
      if (scrollY > 800 && !isVisible) {
        setIsVisible(true)
        setHasScrolled(true)
      } else if (scrollY < 800 && isVisible && !hasScrolled) {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible, hasScrolled])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-8 right-8 z-40 flex flex-col gap-3"
        >
          {/* Floating CTA */}
          <motion.a
            href="mailto:hello@nexus.agency"
            className="group relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-cyan to-acid text-black font-bold shadow-2xl shadow-cyan/40 hover:shadow-cyan/60 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </motion.svg>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-4 whitespace-nowrap font-mono text-xs uppercase tracking-wider px-3 py-1 bg-black border border-cyan/20 text-cyan rounded pointer-events-none"
            >
              Schedule Call
            </motion.div>
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#services"
            className="group relative inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-cyan/20 text-cyan hover:border-cyan transition-all shadow-lg shadow-black/20"
            whileHover={{ scale: 1.1, borderColor: '#00f5ff' }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path d="M12 5v14M5 12l7-7 7 7" />
            </motion.svg>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-4 whitespace-nowrap font-mono text-xs uppercase tracking-wider px-3 py-1 bg-black border border-cyan/20 text-cyan rounded pointer-events-none"
            >
              Explore
            </motion.div>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FloatingCTA
