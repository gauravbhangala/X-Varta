'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  category: string;
  slug: string;
}

interface BlogClientProps {
  posts: BlogPost[];
}

const getCategoryColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    'AI & Technology': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'SEO': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Backend Development': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'Growth Strategy': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    'Performance': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    'Security': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };
  return colors[category] || 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400';
};

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
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export default function BlogClient({ posts }: BlogClientProps) {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header Section */}
      <section className="relative w-full pt-20 md:pt-28 pb-12 md:pb-16 bg-gradient-to-b from-slate-50 to-transparent dark:from-slate-900 dark:to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Insights & Resources
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Explore our latest insights on technology, SEO, AI, and digital growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="w-full py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {posts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="group h-full"
              >
                {/* Card Container */}
                <div className="h-full flex flex-col bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-slate-900/50">
                  {/* Content Area */}
                  <div className="flex-grow p-6 md:p-8 flex flex-col">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-3">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-col space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={16} className="text-blue-600 dark:text-blue-400" />
                          <time dateTime={post.date}>
                            {post.date}
                          </time>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={16} className="text-emerald-600 dark:text-emerald-400" />
                          <span>{post.readingTime} min read</span>
                        </div>
                      </div>

                      {/* Read More Button */}
                      <motion.a
                        href={`/blog/${post.slug}`}
                        whileHover={{ x: 4 }}
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors w-fit"
                      >
                        Read Article
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Pagination or Load More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center mt-12 md:mt-16"
          >
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
              Load More Articles
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Weekly Insights
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter and get the latest insights on technology, growth, and digital transformation delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
