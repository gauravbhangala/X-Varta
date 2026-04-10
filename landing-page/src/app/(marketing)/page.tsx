import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'NEXUS — Enterprise Digital Solutions',
  description: 'Enterprise-grade digital transformation, scalable systems, and measurable growth outcomes.',
  keywords: 'digital agency, enterprise solutions, web development, digital transformation',
  openGraph: {
    title: 'NEXUS — Enterprise Digital Solutions',
    description: 'Enterprise-grade digital transformation, scalable systems, and measurable growth outcomes.',
    type: 'website',
    url: 'https://nexus.agency',
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

export default function Home() {
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
