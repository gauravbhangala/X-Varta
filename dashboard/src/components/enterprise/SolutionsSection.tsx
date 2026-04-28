'use client'

import { motion } from 'framer-motion'
import { AnimatedCard, SlideUp } from './Animations'
import { Code2, Globe, Smartphone, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react'

const solutions = [
  {
    icon: Code2,
    title: 'Software Solutions',
    description: 'Build robust, scalable enterprise software that powers your business operations.',
    outcome: 'Improve efficiency, scalability, and operational performance',
    capabilities: [
      'Custom Software Development',
      'SaaS Platforms',
      'Enterprise Systems',
      'API Integration',
    ],
    color: 'from-blue-500 to-cyan-500',
    accentColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
    isPrimary: true,
    span: 'lg:col-span-2',
  },
  {
    icon: Globe,
    title: 'Web & Platform Solutions',
    description: 'Create high-performance web applications and e-commerce platforms.',
    outcome: 'Boost conversion rates and user engagement',
    capabilities: [
      'Websites & Web Apps',
      'E-commerce Platforms',
      'UI/UX Engineering',
      'Performance Optimization',
    ],
    color: 'from-purple-500 to-pink-500',
    accentColor: 'bg-purple-50 dark:bg-purple-950/30',
    borderColor: 'border-purple-200 dark:border-purple-800',
    isPrimary: false,
  },
  {
    icon: Smartphone,
    title: 'Mobile Solutions',
    description: 'Deliver seamless mobile experiences across all devices and platforms.',
    outcome: 'Expand reach and enhance customer experience',
    capabilities: [
      'iOS & Android Apps',
      'Cross-platform Development',
      'App Optimization',
      'Mobile-First Design',
    ],
    color: 'from-green-500 to-emerald-500',
    accentColor: 'bg-green-50 dark:bg-green-950/30',
    borderColor: 'border-green-200 dark:border-green-800',
    isPrimary: false,
  },
  {
    icon: TrendingUp,
    title: 'Growth & Marketing Systems',
    description: 'Drive measurable business growth with data-driven marketing technology.',
    outcome: 'Accelerate revenue growth and marketing ROI',
    capabilities: [
      'SEO (Technical, On-page, Off-page)',
      'Google & Meta Ads',
      'Conversion Optimization',
      'Marketing Automation',
    ],
    color: 'from-orange-500 to-red-500',
    accentColor: 'bg-orange-50 dark:bg-orange-950/30',
    borderColor: 'border-orange-200 dark:border-orange-800',
    isPrimary: true,
    span: 'lg:col-span-2',
  },
  {
    icon: Sparkles,
    title: 'AI Solutions',
    description: 'Leverage artificial intelligence to automate processes and gain insights.',
    outcome: 'Unlock automation, efficiency, and intelligent decision-making',
    capabilities: [
      'AI Automation',
      'Intelligent Chatbots',
      'Data Insights & Analytics',
      'Predictive Modeling',
    ],
    color: 'from-indigo-500 to-purple-500',
    accentColor: 'bg-indigo-50 dark:bg-indigo-950/30',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    isPrimary: false,
  },
]

export const SolutionsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SlideUp>
          <div className="text-center mb-16">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full">
                End-to-End Technology & Growth Solutions
              </span>
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Comprehensive Business Capabilities
            </h2>
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              We deliver integrated solutions designed to accelerate your digital transformation and business outcomes.
            </p>
          </div>
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {solutions.map((solution, idx) => {
            const Icon = solution.icon
            const isPrimary = solution.isPrimary
            return (
              <AnimatedCard 
                key={idx} 
                delay={idx * 0.1}
              >
                <motion.div
                  whileHover={{ y: -8, boxShadow: isPrimary ? '0 32px 64px rgba(0,0,0,0.15)' : '0 24px 48px rgba(0,0,0,0.12)' }}
                  className={`h-full p-8 rounded-xl border transition-all duration-300 flex flex-col ${
                    isPrimary
                      ? `border-l-4 ${solution.borderColor} bg-white dark:bg-slate-800 ${solution.accentColor}`
                      : `${solution.borderColor} bg-white dark:bg-slate-800 ${solution.accentColor}`
                  }`}
                >
                  {/* Icon with accent */}
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${solution.color} p-3.5 mb-6 shadow-md`}>
                    <Icon className="w-full h-full text-white" />
                  </div>

                  {/* Primary Badge */}
                  {isPrimary && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: idx * 0.1 + 0.2 }}
                      viewport={{ once: true }}
                      className="inline-block mb-3"
                    >
                      <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${solution.color} text-white`}>
                        PRIMARY CAPABILITY
                      </span>
                    </motion.div>
                  )}

                  {/* Title */}
                  <h3 className={`font-bold text-slate-900 dark:text-white mb-2 ${isPrimary ? 'text-xl' : 'text-lg'}`}>
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Outcome Highlight */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 + 0.1 }}
                    viewport={{ once: true }}
                    className={`mb-5 pb-5 border-b ${solution.borderColor}`}
                  >
                    <p className={`text-sm font-semibold text-slate-700 dark:text-slate-200 ${
                      isPrimary ? 'text-base' : ''
                    }`}>
                      ✓ {solution.outcome}
                    </p>
                  </motion.div>

                  {/* Capabilities */}
                  <div className="space-y-3 flex-1 mb-6">
                    {solution.capabilities.map((capability, capIdx) => (
                      <motion.div
                        key={capIdx}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 + capIdx * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                          {capability}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ x: 4 }}
                    className={`pt-5 border-t ${solution.borderColor} text-blue-600 dark:text-blue-400 text-sm font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors ${
                      isPrimary ? 'text-base font-bold' : ''
                    }`}
                  >
                    Explore Solution →
                  </motion.button>
                </motion.div>
              </AnimatedCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
