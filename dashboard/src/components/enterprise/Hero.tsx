'use client'

import { motion } from 'framer-motion'
import { GradientSphere } from './GradientSphere'
import { FadeIn, SlideUp } from './Animations'

export const Hero = () => {
  const trustIndicators = [
    'Trusted by startups & enterprises',
    'End-to-End Technology Solutions',
    'Scalable & Future-Ready Systems',
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 pt-20 lg:pt-0">
      {/* Background elements */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Headline */}
            <SlideUp delay={0.1}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                Engineering Scalable Digital Products & Growth Systems
              </h1>
            </SlideUp>

            {/* Subtext */}
            <SlideUp delay={0.2}>
              <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                We help enterprises and growing businesses build software, platforms, and marketing systems that drive measurable growth.
              </p>
            </SlideUp>

            {/* CTA Buttons */}
            <SlideUp delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  Start Your Project
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
                >
                  Explore Solutions
                </motion.button>
              </div>
            </SlideUp>

            {/* Trust Indicators */}
            <SlideUp delay={0.4}>
              <div className="space-y-3 pt-4">
                {trustIndicators.map((indicator, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                      {indicator}
                    </p>
                  </motion.div>
                ))}
              </div>
            </SlideUp>

            {/* Stats */}
            <SlideUp delay={0.5}>
              <div className="grid grid-cols-3 gap-8 pt-12 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400"
                  >
                    50+
                  </motion.div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Projects Delivered</p>
                </div>
                <div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    viewport={{ once: true }}
                    className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400"
                  >
                    20+
                  </motion.div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Happy Clients</p>
                </div>
                <div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400"
                  >
                    98%
                  </motion.div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Satisfaction Rate</p>
                </div>
              </div>
            </SlideUp>
          </div>

          {/* Right Content - 3D Sphere */}
          <FadeIn delay={0.3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="hidden lg:block"
            >
              <GradientSphere />
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
