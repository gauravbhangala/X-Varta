'use client'

import { motion } from 'framer-motion'
import { SlideUp } from './Animations'

export const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <SlideUp>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
        </SlideUp>

        <SlideUp delay={0.1}>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of enterprise clients who have already accelerated their digital transformation journey with our solutions.
          </p>
        </SlideUp>

        <SlideUp delay={0.2}>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-white text-blue-600 font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
          >
            Start Your Journey Today
          </motion.button>
        </SlideUp>

        <SlideUp delay={0.3}>
          <p className="text-blue-200 text-sm mt-8">
            No credit card required • 14-day free trial • Enterprise support included
          </p>
        </SlideUp>
      </div>
    </section>
  )
}
