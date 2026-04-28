'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, BarChart3, Award, Shield, Cog } from 'lucide-react';

interface WhyChoosePoint {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  accentColor: string;
}

const whyChoosePoints: WhyChoosePoint[] = [
  {
    id: 1,
    title: 'End-to-End Solutions',
    description: 'Development, marketing systems, and AI integration all in one partnership',
    icon: Cog,
    accentColor: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    title: 'Scalable & Future-Ready',
    description: 'Systems built to grow with your business and adapt to market changes',
    icon: Zap,
    accentColor: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 3,
    title: 'Data-Driven Decisions',
    description: 'Every strategy backed by analytics and measurable business insights',
    icon: BarChart3,
    accentColor: 'from-purple-500 to-purple-600'
  },
  {
    id: 4,
    title: 'Proven Industry Experience',
    description: '50+ successful projects across e-commerce, fintech, SaaS, and enterprise',
    icon: Award,
    accentColor: 'from-orange-500 to-orange-600'
  },
  {
    id: 5,
    title: 'Performance & Security',
    description: 'Enterprise-grade security standards with optimized performance at scale',
    icon: Shield,
    accentColor: 'from-red-500 to-red-600'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

export default function WhyChooseUsSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Why Choose X Varta
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We combine engineering excellence with growth-focused strategies to deliver measurable results.
          </p>
        </motion.div>

        {/* Why Choose Us Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12"
        >
          {whyChoosePoints.map((point) => {
            const IconComponent = point.icon;
            return (
              <motion.div
                key={point.id}
                variants={itemVariants}
                className="group relative"
              >
                {/* Card Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${point.accentColor} rounded-2xl opacity-5 group-hover:opacity-10 transition-opacity duration-300 blur-xl`} />

                {/* Card */}
                <div className="relative h-full bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-slate-900/50 flex flex-col">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${point.accentColor} mb-4`}>
                    <IconComponent size={28} className="text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {point.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base flex-grow">
                    {point.description}
                  </p>

                  {/* Check Mark */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"
                  >
                    <CheckCircle2 size={20} className="text-emerald-500" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Verification Line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center justify-center gap-3 text-slate-600 dark:text-slate-400 bg-blue-50 dark:bg-blue-950/20 rounded-full py-3 px-6 w-fit mx-auto"
        >
          <CheckCircle2 size={20} className="text-blue-600 dark:text-blue-400" />
          <span className="text-sm md:text-base font-medium">
            Focused on delivering real business outcomes, not just code
          </span>
        </motion.div>
      </div>
    </section>
  );
}
