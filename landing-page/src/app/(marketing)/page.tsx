import type { Metadata } from 'next'
import { homeContent } from '@/content/pages/home'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import ClientMetrics from '@/components/ClientMetrics'
import Services from '@/components/Services'
import CaseStudy from '@/components/CaseStudy'
import EngagementModel from '@/components/EngagementModel'
import Leadership from '@/components/Leadership'
import WhyUs from '@/components/WhyUs'
import Process from '@/components/Process'
import CTA from '@/components/CTA'

/**
 * Home Page - Server Component
 * 
 * Content strategy:
 * - Metadata imported from /content/pages/home.ts
 * - Components organized in /components with semantic sections
 * - Server-rendered for optimal SEO and performance
 * - Client-side animations handled within components
 */

export const metadata: Metadata = {
  title: homeContent.meta.title,
  description: homeContent.meta.description,
  keywords: homeContent.meta.keywords.join(', '),
  alternates: {
    canonical: homeContent.meta.canonical,
  },
  openGraph: {
    title: homeContent.meta.ogTitle,
    description: homeContent.meta.ogDescription,
    url: homeContent.meta.ogUrl,
    type: 'website',
    images: [
      {
        url: homeContent.meta.ogImage,
        width: 1200,
        height: 630,
        alt: homeContent.meta.ogTitle,
      },
    ],
  },
  twitter: {
    card: homeContent.meta.twitterCard as 'summary_large_image',
    title: homeContent.meta.twitterTitle,
    description: homeContent.meta.twitterDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function HomePage() {
  return (
    <main className="bg-black overflow-x-hidden" role="main">
      {/* Hero Section */}
      <section aria-label="Hero">
        <Hero />
      </section>

      {/* Marquee Section */}
      <section aria-label="Services Marquee">
        <Marquee />
      </section>

      {/* Client Metrics & Industries */}
      <section aria-label="Enterprise Metrics">
        <ClientMetrics />
      </section>

      {/* Services/Solutions Section */}
      <section aria-label="Our Solutions">
        <Services />
      </section>

      {/* Case Study Section */}
      <section aria-label="Case Studies">
        <CaseStudy />
      </section>

      {/* Engagement Models */}
      <section aria-label="Engagement Models">
        <EngagementModel />
      </section>

      {/* Leadership & Expertise */}
      <section aria-label="Leadership">
        <Leadership />
      </section>

      {/* Why Us Section */}
      <section aria-label="Why Partner With Us">
        <WhyUs />
      </section>

      {/* Process Section */}
      <section aria-label="Our Process">
        <Process />
      </section>

      {/* CTA Section */}
      <section aria-label="Call To Action">
        <CTA />
      </section>
    </main>
  )
}
