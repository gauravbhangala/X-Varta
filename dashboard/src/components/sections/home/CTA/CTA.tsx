'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function HomeFinalCTASection() {
  return (
    <section className="w-full py-24 md:py-32 bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-900 dark:to-indigo-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-10 -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-10 -ml-48 -mb-48"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-6"
          >
            <p className="text-emerald-300 font-bold text-sm tracking-widest uppercase mb-4">Transform Your Business Today</p>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Build
            <br />
            <span className="relative inline-block">
              Scalable Digital Solutions?
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute bottom-2 left-0 right-0 h-2 bg-emerald-400 -z-0 opacity-40"
                style={{ transformOrigin: 'left' }}
              />
            </span>
          </h2>
          
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join 50+ enterprise companies that have transformed their business. Limited availability this quarter.
          </p>

          {/* Trust Line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-2 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-sm text-emerald-200 font-medium">Trusted by 50+ enterprise teams • Average kickoff: 48 hours</span>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link href="/contact?source=homepage">
            <motion.button
              whileHover={{ y: -4, boxShadow: '0 25px 50px rgba(0,0,0,0.4)' }}
              whileTap={{ y: 0 }}
              className="px-8 py-4 bg-white hover:bg-slate-100 text-indigo-600 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Start Your Project
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          <Link href="/audit?source=homepage">
            <motion.button
              whileHover={{ y: -4, borderColor: '#10B981' }}
              whileTap={{ y: 0 }}
              className="px-8 py-4 bg-indigo-500/20 hover:bg-indigo-500/30 text-white font-bold rounded-lg border-2 border-white/40 hover:border-emerald-400 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Get Free Website Audit
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-12 border-t border-indigo-400/20"
        >
          <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
            <CheckCircle size={20} className="text-emerald-400 flex-shrink-0" />
            <span className="text-indigo-100 font-medium">No hidden fees</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-indigo-400/30" />
          <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
            <CheckCircle size={20} className="text-emerald-400 flex-shrink-0" />
            <span className="text-indigo-100 font-medium">Free consultation</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-indigo-400/30" />
          <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
            <CheckCircle size={20} className="text-emerald-400 flex-shrink-0" />
            <span className="text-indigo-100 font-medium">24/7 support</span>
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-indigo-200 text-sm mt-12 space-y-2"
        >
          <p>Response time: <span className="font-semibold text-emerald-300">Within 24 hours</span></p>
          <p>Average project timeline: <span className="font-semibold text-emerald-300">4-12 weeks</span></p>
        </motion.div>
      </div>
    </section>
  );
}
