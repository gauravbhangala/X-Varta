'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Zap,
  Users,
  Target,
  Lock
} from 'lucide-react';
import Link from 'next/link';

interface ValueProp {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const valueProps: ValueProp[] = [
  {
    id: 1,
    icon: <Trophy size={24} />,
    title: 'Industry Expertise',
    description: 'Over 15 years of combined experience delivering enterprise solutions'
  },
  {
    id: 2,
    icon: <Zap size={24} />,
    title: 'Rapid Delivery',
    description: 'Agile methodologies and automated pipelines for faster time-to-market'
  },
  {
    id: 3,
    icon: <Users size={24} />,
    title: 'Dedicated Support',
    description: 'Continuous partnership with 24/7 technical support and consultations'
  },
  {
    id: 4,
    icon: <Target size={24} />,
    title: 'Results-Driven',
    description: '98% client satisfaction with measurable ROI on every project'
  },
  {
    id: 5,
    icon: <Lock size={24} />,
    title: 'Security First',
    description: 'Enterprise-grade security, compliance, and data protection built-in'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function HomeWhyChooseUsSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-white dark:bg-slate-950">
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
              Why Choose Us
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-indigo-600 dark:bg-indigo-500 opacity-60"
                style={{ transformOrigin: 'center' }}
              />
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-6">
            We combine technical excellence with business acumen to deliver transformative solutions
          </p>
        </motion.div>

        {/* Value Props Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16"
        >
          {valueProps.map((prop) => (
            <motion.div
              key={prop.id}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)' }}
                className="text-center p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-300 relative overflow-hidden"
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-all duration-300">
                    {prop.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 leading-snug">
                  {prop.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {prop.description}
                </p>

                {/* Checkmark Accent */}
                <div className="flex justify-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Learn More Link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <Link href="/enterprise#why-choose-us">
            <motion.p
              whileHover={{ x: 4 }}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors inline-flex items-center gap-2 cursor-pointer group"
            >
              Learn more about our approach 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.p>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
