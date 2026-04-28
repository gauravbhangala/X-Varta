'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Globe, Smartphone, TrendingUp, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Solution {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  accentColor: string;
  isPrimary?: boolean;
}

const solutions: Solution[] = [
  {
    id: 1,
    title: 'Software Solutions',
    description: 'End-to-end software development from concept to deployment and ongoing optimization',
    icon: Code2,
    accentColor: 'text-indigo-600 dark:text-indigo-400',
    isPrimary: true,
  },
  {
    id: 2,
    title: 'Web & Platform Solutions',
    description: 'Scalable web applications and SaaS platforms built for enterprise scale',
    icon: Globe,
    accentColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 3,
    title: 'Mobile Solutions',
    description: 'Cross-platform mobile apps that deliver seamless user experiences',
    icon: Smartphone,
    accentColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 4,
    title: 'Growth & Marketing Systems',
    description: 'Multi-channel marketing automation and growth infrastructure',
    icon: TrendingUp,
    accentColor: 'text-orange-600 dark:text-orange-400',
    isPrimary: true,
  },
  {
    id: 5,
    title: 'AI & Automation',
    description: 'Intelligent systems and automation to drive business efficiency',
    icon: Sparkles,
    accentColor: 'text-purple-600 dark:text-purple-400',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
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

export default function HomeSolutionsSection() {
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
              Our Solutions
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-indigo-600 dark:bg-indigo-500 opacity-60"
                style={{ transformOrigin: 'center' }}
              />
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-6">
            Comprehensive technology and growth solutions designed to transform your business
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16"
        >
          {solutions.map((solution) => {
            const IconComponent = solution.icon;
            return (
              <motion.div
                key={solution.id}
                variants={itemVariants}
                className={`group relative ${solution.isPrimary ? 'lg:col-span-2 lg:row-span-2' : ''}`}
              >
                {/* Card */}
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)' }}
                  className={`h-full bg-white dark:bg-slate-800 rounded-xl p-6 lg:p-8 border border-slate-200 dark:border-slate-700 transition-all duration-300 flex flex-col relative overflow-hidden`}
                >
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 mb-4 group-hover:scale-110 transition-transform duration-300 ${solution.accentColor}`}>
                    <IconComponent size={24} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white mb-3 leading-snug">
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 grow mb-6 text-sm lg:text-base leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Learn More Link */}
                  <Link href="/solutions">
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                    >
                      Learn More
                      <ArrowRight size={18} />
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <Link href="/solutions">
            <motion.button
              whileHover={{ y: -3, boxShadow: '0 15px 30px rgba(79, 70, 229, 0.2)' }}
              whileTap={{ y: 0 }}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              View All Solutions
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
