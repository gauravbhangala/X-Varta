import React from 'react';
import { Metadata } from 'next';
import SolutionsClient from './client';

export const metadata: Metadata = {
  title: 'Technology & Growth Solutions - X Varta',
  description: 'Comprehensive IT and growth solutions for enterprise companies. Software development, web platforms, mobile apps, growth systems, and AI integration.',
  keywords: ['solutions', 'software development', 'web platforms', 'mobile apps', 'growth marketing', 'AI solutions', 'enterprise IT'],
};

export default function SolutionsPage() {
  return <SolutionsClient />;
}
