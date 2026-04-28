'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap } from 'lucide-react';

interface TrustIndicator {
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
}

const trustIndicators: TrustIndicator[] = [
  {
    icon: CheckCircle2,
    label: 'Free consultation'
  },
  {
    icon: Zap,
    label: 'Fast response time'
  },
  {
    icon: CheckCircle2,
    label: 'Scalable solutions'
  }
];

export default function FinalCTASection() {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-slate-900" />
      
      {/* Animated Background Elements */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Build Scalable Digital Solutions?
          </h2>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's create software, platforms, and growth systems that drive measurable business results.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            {/* Primary CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white hover:bg-blue-50 text-blue-600 font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              Start Your Project
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group border-2 border-blue-400 hover:border-blue-300"
            >
              Get Free SEO Audit
              <Zap
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center"
          >
            {trustIndicators.map((indicator, index) => {
              const Icon = indicator.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:border-white/40 transition-colors"
                >
                  <Icon size={18} className="text-emerald-300 flex-shrink-0" />
                  <span className="text-white font-medium text-sm">{indicator.label}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Additional Trust Message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-blue-100 text-sm md:text-base mt-8 pt-8 border-t border-white/10"
          >
            Join 50+ companies transforming their business with X Varta
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
