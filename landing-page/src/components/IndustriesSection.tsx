'use client'

import { motion } from 'framer-motion'
import { AnimatedCard } from './Animations'
import { Building2, ShoppingCart, Cpu, Heart, Briefcase, Scale } from 'lucide-react'

const industries = [
  { icon: Building2, name: 'Finance & Banking' },
  { icon: ShoppingCart, name: 'Retail & E-commerce' },
  { icon: Cpu, name: 'Technology' },
  { icon: Heart, name: 'Healthcare' },
  { icon: Briefcase, name: 'Enterprise' },
  { icon: Scale, name: 'Legal & Compliance' },
]

export const IndustriesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Industry Expertise
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Proven experience across diverse sectors and verticals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, idx) => {
            const Icon = industry.icon
            return (
              <AnimatedCard key={idx} delay={idx * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {industry.name}
                  </h3>
                </motion.div>
              </AnimatedCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
