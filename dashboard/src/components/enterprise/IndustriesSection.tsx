'use client'

import { motion } from 'framer-motion'
import { AnimatedCard, SlideUp } from './Animations'
import { ShoppingCart, Heart, TrendingUp, BookOpen, Home, Plane, Rocket, Building2, CheckCircle2 } from 'lucide-react'

const industries = [
  {
    icon: ShoppingCart,
    name: 'E-commerce',
    description: 'Scalable platforms and growth systems for online businesses',
    color: 'from-blue-500 to-blue-600',
    accentColor: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    icon: Heart,
    name: 'Healthcare',
    description: 'HIPAA-compliant systems and patient engagement platforms',
    color: 'from-red-500 to-red-600',
    accentColor: 'bg-red-50 dark:bg-red-950/20',
  },
  {
    icon: TrendingUp,
    name: 'Fintech',
    description: 'Secure financial solutions and compliance-driven technology',
    color: 'from-green-500 to-green-600',
    accentColor: 'bg-green-50 dark:bg-green-950/20',
  },
  {
    icon: BookOpen,
    name: 'Education',
    description: 'Learning platforms and student engagement systems',
    color: 'from-purple-500 to-purple-600',
    accentColor: 'bg-purple-50 dark:bg-purple-950/20',
  },
  {
    icon: Home,
    name: 'Real Estate',
    description: 'Property management and real estate marketing solutions',
    color: 'from-orange-500 to-orange-600',
    accentColor: 'bg-orange-50 dark:bg-orange-950/20',
  },
  {
    icon: Plane,
    name: 'Travel & Hospitality',
    description: 'Booking systems and guest experience platforms',
    color: 'from-cyan-500 to-cyan-600',
    accentColor: 'bg-cyan-50 dark:bg-cyan-950/20',
  },
  {
    icon: Rocket,
    name: 'SaaS & Startups',
    description: 'Scalable infrastructure for growing tech companies',
    color: 'from-indigo-500 to-indigo-600',
    accentColor: 'bg-indigo-50 dark:bg-indigo-950/20',
  },
  {
    icon: Building2,
    name: 'Enterprise',
    description: 'Mission-critical systems for large organizations',
    color: 'from-slate-600 to-slate-700',
    accentColor: 'bg-slate-50 dark:bg-slate-950/20',
  },
]

export const IndustriesSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SlideUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              We deliver tailored technology and growth solutions across diverse industries with proven expertise.
            </p>
          </div>
        </SlideUp>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {industries.map((industry, idx) => {
            const Icon = industry.icon
            return (
              <AnimatedCard key={idx} delay={idx * 0.08}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  className={`h-full p-8 rounded-xl border border-slate-200 dark:border-slate-700 ${industry.accentColor} bg-white dark:bg-slate-800 transition-all duration-300 flex flex-col`}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${industry.color} p-3 mb-6 shadow-md`}>
                    <Icon className="w-full h-full text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                    {industry.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                    {industry.description}
                  </p>

                  {/* Arrow indicator */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.08 + 0.1 }}
                    viewport={{ once: true }}
                    className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"
                  >
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors">
                      Learn more →
                    </span>
                  </motion.div>
                </motion.div>
              </AnimatedCard>
            )
          })}
        </div>

        {/* Trust Line */}
        <SlideUp delay={0.3}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 pt-8 border-t border-slate-200 dark:border-slate-700"
          >
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <p className="text-sm lg:text-base font-semibold text-slate-700 dark:text-slate-300">
              Proven experience across multiple industries and business models
            </p>
          </motion.div>
        </SlideUp>
      </div>
    </section>
  )
}
