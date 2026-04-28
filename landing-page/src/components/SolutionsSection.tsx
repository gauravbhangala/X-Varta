'use client'

import { motion } from 'framer-motion'
import { AnimatedCard } from './Animations'
import { Zap, Globe, Smartphone, TrendingUp, Brain } from 'lucide-react'

const solutions = [
  {
    icon: Zap,
    title: 'Software Solutions',
    description: 'Custom enterprise software tailored to your business needs',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Globe,
    title: 'Web & Platform Solutions',
    description: 'Scalable web applications and cloud platforms',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Solutions',
    description: 'Native and cross-platform mobile applications',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: TrendingUp,
    title: 'Growth & Marketing Systems',
    description: 'Data-driven marketing automation and analytics',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Brain,
    title: 'AI Solutions',
    description: 'Machine learning and artificial intelligence integration',
    color: 'from-indigo-500 to-purple-500',
  },
]

export const SolutionsSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Comprehensive Solutions
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Everything you need to drive digital transformation and achieve business excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {solutions.map((solution, idx) => {
            const Icon = solution.icon
            return (
              <AnimatedCard key={idx} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  className="h-full p-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${solution.color} p-3 mb-6`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {solution.description}
                  </p>
                </motion.div>
              </AnimatedCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
