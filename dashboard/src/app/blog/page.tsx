import React from 'react';
import { Metadata } from 'next';
import BlogClient from './client';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  category: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of AI in Digital Product Development',
    excerpt: 'Explore how artificial intelligence is transforming the way we build digital products and revolutionizing customer experiences across industries.',
    date: 'April 15, 2026',
    readingTime: 8,
    category: 'AI & Technology',
    slug: 'future-of-ai-digital-products'
  },
  {
    id: 2,
    title: 'SEO Best Practices for Next.js Applications',
    excerpt: 'Learn how to optimize your Next.js applications for search engines without compromising performance or user experience.',
    date: 'April 10, 2026',
    readingTime: 12,
    category: 'SEO',
    slug: 'seo-nextjs-best-practices'
  },
  {
    id: 3,
    title: 'Building Scalable APIs with Node.js and Express',
    excerpt: 'Discover proven patterns and best practices for building robust, scalable backend APIs that can handle millions of requests.',
    date: 'April 5, 2026',
    readingTime: 15,
    category: 'Backend Development',
    slug: 'scalable-apis-nodejs'
  },
  {
    id: 4,
    title: 'Digital Growth Strategies for B2B SaaS Companies',
    excerpt: 'A comprehensive guide to scaling your B2B SaaS business through strategic marketing, product optimization, and customer retention.',
    date: 'March 28, 2026',
    readingTime: 10,
    category: 'Growth Strategy',
    slug: 'b2b-saas-growth-strategies'
  },
  {
    id: 5,
    title: 'The Impact of Web Performance on User Experience',
    excerpt: 'Understand why web performance matters and how optimizing your site speed can dramatically improve conversions and user satisfaction.',
    date: 'March 22, 2026',
    readingTime: 9,
    category: 'Performance',
    slug: 'web-performance-ux'
  },
  {
    id: 6,
    title: 'Enterprise Security: Protecting Your Digital Assets',
    excerpt: 'A deep dive into modern security practices, compliance requirements, and strategies to protect your enterprise systems and data.',
    date: 'March 15, 2026',
    readingTime: 14,
    category: 'Security',
    slug: 'enterprise-security-protection'
  }
];

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

export const metadata: Metadata = {
  title: 'Blog & Insights - X Varta',
  description: 'Explore our latest insights on technology, SEO, AI, and digital growth strategies.',
  keywords: ['blog', 'insights', 'technology', 'SEO', 'AI', 'digital transformation'],
};

export default function BlogPage() {
  return <BlogClient posts={blogPosts} />;
}
