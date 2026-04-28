'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface Stat {
  number: string;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  { number: '50', label: 'Enterprise Clients', suffix: '+' },
  { number: '200', label: 'Projects Delivered', suffix: '+' },
  { number: '98', label: 'Client Satisfaction', suffix: '%' },
  { number: '15', label: 'Years Combined Experience', suffix: '+' },
];

export default function HomeTrustSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Trust Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium mb-2">
            Trusted by teams at scaling startups and established enterprises
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="text-center group"
            >
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
                {stat.suffix && (
                  <span className="text-3xl md:text-4xl ml-1">{stat.suffix}</span>
                )}
              </div>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust Line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center justify-center gap-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-full py-4 px-8 w-fit mx-auto border border-emerald-200 dark:border-emerald-800 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span className="text-sm md:text-base font-medium text-slate-700 dark:text-slate-300">
            Trusted by industry leaders and innovative startups
          </span>
        </motion.div>
      </div>
    </section>
  );
}
