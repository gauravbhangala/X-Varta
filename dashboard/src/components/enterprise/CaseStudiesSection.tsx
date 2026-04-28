'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, CheckCircle2 } from 'lucide-react';

interface CaseStudy {
  id: number;
  title: string;
  industry: string;
  problem: string;
  solution: string;
  results: {
    metric: string;
    value: string;
  }[];
  accentColor: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: 'E-commerce Platform Optimization',
    industry: 'E-commerce',
    problem: 'Low conversion rates and high bounce rate affecting revenue',
    solution: 'Complete UI/UX redesign with SEO optimization and checkout flow improvements',
    results: [
      { metric: 'Traffic Increase', value: '+120%' },
      { metric: 'Conversion Rate', value: '+45%' },
      { metric: 'Average Order Value', value: '+32%' }
    ],
    accentColor: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    title: 'SaaS Dashboard for Enterprise Analytics',
    industry: 'SaaS & Analytics',
    problem: 'Complex data visualization causing user friction and low adoption',
    solution: 'Built intuitive real-time dashboard with custom reporting and API integration',
    results: [
      { metric: 'User Adoption', value: '+85%' },
      { metric: 'Time to Insight', value: '-60%' },
      { metric: 'Customer Retention', value: '+92%' }
    ],
    accentColor: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 3,
    title: 'FinTech Mobile Banking App',
    industry: 'Fintech',
    problem: 'Security concerns and outdated UX limiting customer growth',
    solution: 'Developed secure mobile-first app with biometric auth and real-time transaction monitoring',
    results: [
      { metric: 'Active Users', value: '+230%' },
      { metric: 'Transaction Volume', value: '+156%' },
      { metric: 'Support Tickets', value: '-48%' }
    ],
    accentColor: 'from-purple-500 to-purple-600'
  }
];

export default function CaseStudiesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-transparent via-slate-900/5 to-transparent dark:via-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              CASE STUDIES
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Case Studies & Proven Results
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Real projects, real solutions, and measurable outcomes.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              className="group relative"
            >
              {/* Card Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${study.accentColor} rounded-2xl opacity-5 group-hover:opacity-10 transition-opacity duration-300 blur-xl`} />

              {/* Card */}
              <div className="relative h-full bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-slate-900/50 flex flex-col">
                {/* Industry Badge */}
                <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1 bg-gradient-to-r ${study.accentColor} bg-opacity-10 rounded-lg w-fit`}>
                  <TrendingUp size={14} className={`text-blue-600 dark:text-blue-400`} />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {study.industry}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {study.title}
                </h3>

                {/* Problem */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Challenge
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 line-clamp-2">
                    {study.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Solution
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 line-clamp-2">
                    {study.solution}
                  </p>
                </div>

                {/* Results - Emphasized */}
                <div className="flex-grow">
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
                    Results
                  </p>
                  <div className="space-y-2">
                    {study.results.map((result, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
                        className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                      >
                        <span className="text-sm text-slate-700 dark:text-slate-400">
                          {result.metric}
                        </span>
                        <span className="font-bold text-base bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                          {result.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Learn More Link */}
                <motion.div
                  className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700"
                  whileHover={{ x: 4 }}
                >
                  <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                    Explore Case Study
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Verification Line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-12 text-slate-600 dark:text-slate-400"
        >
          <CheckCircle2 size={20} className="text-emerald-500" />
          <span className="text-sm md:text-base font-medium">
            Proven track record across diverse industries and business models
          </span>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to Achieve Similar Results?
          </h3>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Let us help you build scalable solutions that drive measurable business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              View All Case Studies
            </button>
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">
              Start Your Project
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
