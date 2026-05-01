'use client'

import { motion } from 'framer-motion'
import { SlideUp } from './Animations'
import { Code2, Server, Smartphone, Cloud, Zap, CheckCircle2 } from 'lucide-react'

const technologies = [
  {
    category: 'Frontend',
    description: 'Modern UI frameworks and styling',
    icon: Code2,
    color: 'from-blue-500 to-blue-600',
    accentColor: 'bg-blue-50 dark:bg-blue-950/20',
    techs: ['React.js', 'Next.js', 'Tailwind CSS', 'TypeScript'],
  },
  {
    category: 'Backend',
    description: 'Scalable server infrastructure',
    icon: Server,
    color: 'from-green-500 to-green-600',
    accentColor: 'bg-green-50 dark:bg-green-950/20',
    techs: ['Node.js', 'Express.js', 'PostgreSQL', 'REST API / GraphQL'],
  },
  {
    category: 'Mobile',
    description: 'Cross-platform app development',
    icon: Smartphone,
    color: 'from-purple-500 to-purple-600',
    accentColor: 'bg-purple-50 dark:bg-purple-950/20',
    techs: ['React Native', 'Flutter'],
  },
  {
    category: 'Cloud & DevOps',
    description: 'Deployment and infrastructure',
    icon: Cloud,
    color: 'from-orange-500 to-orange-600',
    accentColor: 'bg-orange-50 dark:bg-orange-950/20',
    techs: ['AWS', 'Vercel', 'Docker'],
  },
  {
    category: 'AI & Data',
    description: 'Intelligence and automation',
    icon: Zap,
    color: 'from-indigo-500 to-indigo-600',
    accentColor: 'bg-indigo-50 dark:bg-indigo-950/20',
    techs: ['AI APIs', 'Automation Tools', 'Analytics Systems'],
  },
]

export const TechnologiesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SlideUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Technology Stack & Engineering Expertise
            </h2>
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              We leverage modern technologies and scalable architectures to build high-performance digital systems.
            </p>
          </div>
        </SlideUp>

        {/* Technology Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {technologies.map((tech, idx) => {
            const Icon = tech.icon
            return (
              <SlideUp key={idx} delay={idx * 0.08}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  className={`h-full p-8 rounded-xl border border-slate-200 dark:border-slate-700 ${tech.accentColor} bg-white dark:bg-slate-800 transition-all duration-300 flex flex-col`}
                >
                  {/* Icon & Category Header */}
                  <div className="mb-6">
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${tech.color} p-3 mb-4 shadow-md`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {tech.category}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {tech.description}
                    </p>
                  </div>

                  {/* Technologies List */}
                  <div className="space-y-3 flex-1 mb-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                    {tech.techs.map((item, techIdx) => (
                      <motion.div
                        key={techIdx}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.08 + techIdx * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 bg-gradient-to-r ${tech.color}`}
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </SlideUp>
            )
          })}
        </div>

        {/* Trust Line */}
        <SlideUp delay={0.4}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 pt-8 border-t border-slate-200 dark:border-slate-700"
          >
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <p className="text-sm lg:text-base font-semibold text-slate-700 dark:text-slate-300">
              Built with modern, scalable, and future-ready technologies
            </p>
          </motion.div>
        </SlideUp>
      </div>
    </section>
  )
}
