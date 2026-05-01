'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Zap } from 'lucide-react';
import Link from 'next/link';

export default function HomeHeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 dark:from-slate-900/50 dark:via-slate-950 dark:to-slate-900/70" />
      
      {/* Animated background elements */}
      <motion.div
        animate={{ opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
      />
      <motion.div
        animate={{ opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-800 mb-8"
            >
              <Zap size={16} className="text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                Engineering Excellence
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                Build Systems That Scale.
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10">Without the Complexity.</span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="absolute bottom-2 left-0 right-0 h-3 bg-indigo-600 dark:bg-indigo-500 -z-0 opacity-40"
                    style={{ transformOrigin: 'left' }}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Subheader */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg md:text-xl text-slate-700 dark:text-slate-200 mb-8 leading-relaxed max-w-2xl font-medium"
            >
              Purpose-built backend infrastructure, intelligent APIs, and growth systems for teams that need to move fast. No bloat. No templates. Just what works.
            </motion.p>

            {/* Trust Line */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-12"
            >
              <Code2 size={18} className="text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium">
                Trusted by 50+ enterprise clients worldwide
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              {/* Primary Button */}
              <Link href="/solutions">
                <motion.button
                  whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(79, 70, 229, 0.3)' }}
                  whileTap={{ y: 0 }}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Start Your Project
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.button>
              </Link>

              {/* Secondary Button */}
              <motion.button
                whileHover={{ y: -2, borderColor: '#4F46E5' }}
                whileTap={{ y: 0 }}
                className="px-8 py-4 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-semibold rounded-lg transition-all duration-300 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Get Free Website Audit
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Premium SaaS Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:block"
          >
            {/* Dashboard glow effect */}
            <div className="absolute inset-0 blur-3xl opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full" />
              <div className="absolute bottom-0 left-20 w-72 h-72 bg-emerald-500 rounded-full" />
            </div>
            
            {/* Premium SaaS Dashboard */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden backdrop-blur-xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 dark:from-indigo-900/20 dark:to-emerald-900/20 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">Analytics</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>Last 24h</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'System Uptime', value: '99.97%', trend: '+0.2%', color: 'emerald' },
                      { label: 'Active Users', value: '47.2K', trend: '+18%', color: 'indigo' },
                      { label: 'API Latency', value: '28ms', trend: '-12%', color: 'blue' },
                      { label: 'Revenue Impact', value: '3.2x', trend: '+45%', color: 'purple' },
                    ].map((kpi, idx) => {
                      const colorClasses = {
                        indigo: 'bg-indigo-500/10 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400',
                        emerald: 'bg-emerald-500/10 border-emerald-200 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400',
                        blue: 'bg-blue-500/10 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400',
                        purple: 'bg-purple-500/10 border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400',
                      };
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + idx * 0.05 }}
                          className={`p-3 rounded-lg border ${colorClasses[kpi.color as keyof typeof colorClasses]}`}
                        >
                          <p className="text-xs font-semibold opacity-75 mb-1">{kpi.label}</p>
                          <div className="flex items-end justify-between">
                            <span className="text-lg font-bold">{kpi.value}</span>
                            <span className="text-xs font-semibold bg-white dark:bg-slate-700 px-2 py-0.5 rounded">{kpi.trend}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Mini Chart */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-end gap-1 h-12">
                      {[35, 48, 52, 71, 65, 78, 72, 88].map((height, idx) => (
                        <motion.div
                          key={idx}
                          animate={{ height: `${(height / 100) * 100}%` }}
                          transition={{ delay: 0.8 + idx * 0.05, duration: 0.8 }}
                          className="flex-1 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t opacity-75 hover:opacity-100 transition-opacity"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-semibold">Peak Hours Usage</p>
                  </motion.div>

                  {/* Status Indicators */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                    {['API', 'DB', 'Cache', 'Queue'].map((service, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                          className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"
                        />
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
