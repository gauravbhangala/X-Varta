'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, TrendingUp, BookOpen, Home, Plane, Rocket, Building2 } from 'lucide-react';
import Link from 'next/link';

interface Industry {
  id: number;
  name: string;
  description: string;
  icon: React.ComponentType<{ size: number }>;
}

const industries: Industry[] = [
  {
    id: 1,
    name: 'E-commerce',
    description: 'Scalable platforms for online businesses',
    icon: ShoppingCart,
  },
  {
    id: 2,
    name: 'Healthcare',
    description: 'HIPAA-compliant digital solutions',
    icon: Heart,
  },
  {
    id: 3,
    name: 'Fintech',
    description: 'Secure financial technology platforms',
    icon: TrendingUp,
  },
  {
    id: 4,
    name: 'Education',
    description: 'Learning platforms and engagement systems',
    icon: BookOpen,
  },
  {
    id: 5,
    name: 'Real Estate',
    description: 'Property management solutions',
    icon: Home,
  },
  {
    id: 6,
    name: 'Travel & Hospitality',
    description: 'Booking and guest experience systems',
    icon: Plane,
  },
  {
    id: 7,
    name: 'SaaS & Startups',
    description: 'Scalable infrastructure for tech companies',
    icon: Rocket,
  },
  {
    id: 8,
    name: 'Enterprise',
    description: 'Mission-critical enterprise systems',
    icon: Building2,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function HomeIndustriesSection() {
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
              Industries We Serve
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-56 h-1 bg-indigo-600 dark:bg-indigo-500 opacity-60"
                style={{ transformOrigin: 'center' }}
              />
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-6">
            Proven expertise across diverse sectors and business models
          </p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {industries.map((industry) => {
            const IconComponent = industry.icon;
            return (
              <motion.div
                key={industry.id}
                variants={itemVariants}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)' }}
                  className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700 transition-all duration-300 h-full flex flex-col relative overflow-hidden"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50 transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 leading-snug">
                    {industry.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {industry.description}
                  </p>
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
          <Link href="/enterprise#industries">
            <motion.button
              whileHover={{ y: -3, boxShadow: '0 15px 30px rgba(79, 70, 229, 0.15)' }}
              whileTap={{ y: 0 }}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Explore All Industries
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
