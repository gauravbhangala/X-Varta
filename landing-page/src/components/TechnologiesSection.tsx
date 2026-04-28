'use client'

import { motion } from 'framer-motion'
import { SlideUp } from './Animations'

const technologies = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  Backend: ['Node.js', 'Python', 'PostgreSQL', 'GraphQL', 'REST API'],
  Mobile: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  Cloud: ['AWS', 'Google Cloud', 'Azure', 'Supabase'],
  AI: ['TensorFlow', 'PyTorch', 'OpenAI', 'Langchain'],
}

export const TechnologiesSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SlideUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Technology Stack
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Built with the latest and most reliable technologies
            </p>
          </div>
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {Object.entries(technologies).map((category, catIdx) => (
            <SlideUp key={catIdx} delay={catIdx * 0.1}>
              <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 text-center">
                  {category[0]}
                </h3>
                <div className="space-y-2">
                  {category[1].map((tech, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 4 }}
                      className="text-slate-600 dark:text-slate-300 text-sm flex items-center"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-3 flex-shrink-0" />
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </div>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  )
}
