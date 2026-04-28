'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CaseStudy {
  id: number;
  title: string;
  industry: string;
  problem: string;
  outcome: string;
  metricValue: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: 'E-commerce Platform Optimization',
    industry: 'E-commerce',
    problem: 'Low conversion and high bounce rate',
    outcome: 'Complete platform redesign with checkout optimization',
    metricValue: '+120% Traffic',
  },
  {
    id: 2,
    title: 'SaaS Dashboard for Enterprise',
    industry: 'SaaS',
    problem: 'Complex data visualization limiting adoption',
    outcome: 'Intuitive real-time dashboard with API integration',
    metricValue: '+85% Adoption',
  },
  {
    id: 3,
    title: 'FinTech Mobile Banking App',
    industry: 'Fintech',
    problem: 'Security concerns limiting growth',
    outcome: 'Secure mobile-first app with biometric auth',
    metricValue: '+230% Users',
  },
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
    transition: { duration: 0.6 }
  }
};

export default function HomeCaseStudiesSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 relative inline-block w-full">
            <span className="relative">
              Case Studies & Results
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-52 h-1 bg-indigo-600 dark:bg-indigo-500 opacity-60"
                style={{ transformOrigin: 'center' }}
              />
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-6">
            See how we've helped companies achieve measurable growth
          </p>
        </motion.div>

        {/* Case Studies Grid - Split Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8 mb-16"
        >
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)' }}
                className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-all duration-300 relative"
              >
                {/* Split Layout Container - Left Content, Right Result */}
                <div className="grid grid-cols-1 md:grid-cols-5 min-h-64">
                  
                  {/* Left Column - Content */}
                  <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between">
                    
                    {/* Industry Badge */}
                    <div>
                      <div className="inline-flex items-center gap-2 w-fit mb-6">
                        <TrendingUp size={14} className="text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                          {study.industry}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-8 leading-snug">
                        {study.title}
                      </h3>

                      {/* Content */}
                      <div className="space-y-6">
                        <div>
                          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                            Challenge
                          </p>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {study.problem}
                          </p>
                        </div>
                        <div className="h-px bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700" />
                        <div>
                          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                            Solution
                          </p>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {study.outcome}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Learn More - Bottom Left */}
                    <Link href="/enterprise#case-studies">
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group/link mt-8"
                      >
                        View Case Study
                        <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </motion.div>
                    </Link>
                  </div>

                  {/* Right Column - Result Highlight */}
                  <div className="md:col-span-2 bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-900/50 dark:to-indigo-900/20 p-8 md:p-10 border-l border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center">
                    <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-4 uppercase tracking-widest">
                      Measurable Result
                    </p>
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    >
                      <p className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent font-mono leading-none">
                        {study.metricValue}
                      </p>
                    </motion.div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <Link href="/enterprise#case-studies">
            <motion.button
              whileHover={{ y: -3, boxShadow: '0 15px 30px rgba(79, 70, 229, 0.2)' }}
              whileTap={{ y: 0 }}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              View All Case Studies
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
