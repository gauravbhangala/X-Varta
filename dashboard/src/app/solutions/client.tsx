'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Code2, Globe, Smartphone, TrendingUp, Sparkles, Users, Zap, BarChart3, Lock, Cloud } from 'lucide-react';

interface Solution {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  accentColor: string;
  capabilities: string[];
  outcomes: string[];
}

const solutions: Solution[] = [
  {
    id: 'software',
    title: 'Software Solutions',
    subtitle: 'Custom Development for Enterprise',
    description: 'Tailored software applications built with scalability, security, and performance at the core. From concept to deployment, we engineer solutions that solve complex business challenges and drive operational excellence.',
    icon: Code2,
    accentColor: 'from-blue-500 to-blue-600',
    capabilities: [
      'Full-stack development (Frontend, Backend, Database)',
      'Enterprise architecture & system design',
      'API development & integration',
      'Real-time data processing',
      'Cloud infrastructure setup'
    ],
    outcomes: [
      '95%+ system uptime and reliability',
      '70% faster deployment cycles',
      'Seamless third-party integrations',
      'Enterprise-grade security compliance'
    ]
  },
  {
    id: 'web',
    title: 'Web & Platform Solutions',
    subtitle: 'High-Performance Web Applications',
    description: 'Modern, responsive web platforms built with Next.js and cutting-edge technologies. We create digital experiences that engage users, drive conversions, and scale effortlessly with your business growth.',
    icon: Globe,
    accentColor: 'from-emerald-500 to-emerald-600',
    capabilities: [
      'Next.js & React application development',
      'Responsive & progressive web design',
      'SEO optimization & performance tuning',
      'Real-time dashboards & analytics platforms',
      'CDN optimization & caching strategies'
    ],
    outcomes: [
      '300% improvement in page load speed',
      '+45% increase in conversion rates',
      'Top search engine rankings',
      'Mobile-first responsive design'
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Solutions',
    subtitle: 'iOS & Android Apps Done Right',
    description: 'Cross-platform mobile applications that deliver native-like performance and seamless user experiences. Build once, deploy everywhere with React Native and native frameworks.',
    icon: Smartphone,
    accentColor: 'from-purple-500 to-purple-600',
    capabilities: [
      'Native iOS & Android development',
      'Cross-platform development (React Native)',
      'Mobile-first UI/UX design',
      'Offline functionality & sync',
      'Push notifications & in-app messaging'
    ],
    outcomes: [
      '+85% user engagement & retention',
      '4.8+ average app store ratings',
      'Zero-downtime app updates',
      'Seamless mobile payment integration'
    ]
  },
  {
    id: 'growth',
    title: 'Growth & Marketing Systems',
    subtitle: 'Technology-Driven Growth',
    description: 'Marketing automation platforms and growth systems that drive customer acquisition, retention, and lifetime value. Combine technology with data-driven strategies for exponential business growth.',
    icon: TrendingUp,
    accentColor: 'from-orange-500 to-orange-600',
    capabilities: [
      'Marketing automation platforms',
      'Customer journey mapping & optimization',
      'Email & communication systems',
      'Analytics & business intelligence',
      'Revenue attribution & forecasting'
    ],
    outcomes: [
      '+150% growth in customer acquisition',
      '+65% improvement in marketing ROI',
      '40% reduction in customer acquisition cost',
      'Automated revenue pipeline'
    ]
  },
  {
    id: 'ai',
    title: 'AI & Automation Solutions',
    subtitle: 'Intelligence at Scale',
    description: 'Harness the power of artificial intelligence and machine learning to automate processes, gain insights, and create competitive advantages. From predictive analytics to intelligent automation.',
    icon: Sparkles,
    accentColor: 'from-indigo-500 to-indigo-600',
    capabilities: [
      'Machine learning model development',
      'Predictive analytics & forecasting',
      'Natural language processing',
      'Computer vision applications',
      'Intelligent process automation (RPA)'
    ],
    outcomes: [
      '+80% operational efficiency gains',
      '60% reduction in manual processes',
      'Real-time predictive insights',
      'Automated decision-making systems'
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export default function SolutionsClient() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative w-full pt-20 md:pt-32 pb-16 md:pb-20 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-950/20 dark:to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Technology & Growth Solutions
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Comprehensive solutions designed to solve your toughest business challenges. From custom software to AI-powered automation, we deliver results that matter.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Explore Our Solutions
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Solutions Sections */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-20"
          >
            {solutions.map((solution, index) => {
              const IconComponent = solution.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={solution.id}
                  variants={itemVariants}
                  className="group"
                >
                  {/* Solution Card */}
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
                    {/* Content - Alternates left/right */}
                    <div className={isEven ? 'order-1' : 'lg:order-2'}>
                      {/* Icon Badge */}
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.accentColor} mb-6`}>
                        <IconComponent size={32} className="text-white" />
                      </div>

                      {/* Title */}
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                        {solution.title}
                      </h2>
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-4">
                        {solution.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed">
                        {solution.description}
                      </p>

                      {/* Capabilities */}
                      <div className="mb-8">
                        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4">
                          Key Capabilities
                        </h3>
                        <ul className="space-y-3">
                          {solution.capabilities.map((capability, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0 mt-1" />
                              <span className="text-slate-700 dark:text-slate-300">{capability}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Business Outcomes */}
                      <div className="mb-8 bg-blue-50 dark:bg-blue-950/20 rounded-xl p-6">
                        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4">
                          Business Outcomes
                        </h3>
                        <ul className="space-y-3">
                          {solution.outcomes.map((outcome, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2 + idx * 0.05, duration: 0.4 }}
                              className="flex items-start gap-3"
                            >
                              <TrendingUp size={18} className={`text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1`} />
                              <span className="text-slate-700 dark:text-slate-300 font-medium">{outcome}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <motion.button
                        whileHover={{ x: 4 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        Start Your {solution.title.split(' ')[0]} Project
                        <ArrowRight size={18} />
                      </motion.button>
                    </div>

                    {/* Visual - Alternates left/right */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className={isEven ? 'order-2' : 'lg:order-1'}
                    >
                      <div className={`relative h-96 bg-gradient-to-br ${solution.accentColor} rounded-2xl opacity-10 dark:opacity-5 group-hover:opacity-15 dark:group-hover:opacity-10 transition-opacity duration-300`} />
                    </motion.div>
                  </div>

                  {/* Divider */}
                  {index < solutions.length - 1 && (
                    <div className="my-20 border-t border-slate-200 dark:border-slate-800" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Our solutions are tailored to your unique challenges. Let's discuss how we can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Schedule Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
              >
                View Case Studies
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Line */}
      <section className="w-full py-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-emerald-500" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">50+ Projects Delivered</span>
            </div>
            <div className="hidden sm:block w-1 h-6 bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <Users size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">20+ Happy Clients</span>
            </div>
            <div className="hidden sm:block w-1 h-6 bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-orange-500" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">98% Satisfaction Rate</span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
