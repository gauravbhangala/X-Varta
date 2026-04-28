import React from 'react';
import { Metadata } from 'next';
import HomeHeroSection from '@/components/home/HeroSection';
import HomeTrustSection from '@/components/home/TrustSection';
import HomeSolutionsSection from '@/components/home/SolutionsSection';
import HomeIndustriesSection from '@/components/home/IndustriesSection';
import HomeCaseStudiesSection from '@/components/home/CaseStudiesSection';
import HomeWhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import HomeFinalCTASection from '@/components/home/FinalCTASection';
import { Footer } from '@/components/enterprise/Footer';

export const metadata: Metadata = {
  title: 'X Varta - Engineering Scalable Digital Solutions',
  description: 'Transform your business with cutting-edge technology, scalable platforms, and growth systems designed for enterprise leaders.',
  keywords: ['enterprise software', 'digital solutions', 'software development', 'AI solutions', 'web platforms', 'digital transformation'],
  openGraph: {
    title: 'X Varta - Enterprise Digital Solutions',
    description: 'Build scalable digital solutions with expert engineering and growth strategies',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="bg-white dark:bg-slate-950">
      <HomeHeroSection />
      <HomeTrustSection />
      <HomeSolutionsSection />
      <HomeIndustriesSection />
      <HomeCaseStudiesSection />
      <HomeWhyChooseUsSection />
      <HomeFinalCTASection />
      <Footer />
    </main>
  );
}
