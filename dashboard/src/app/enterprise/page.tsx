import { Hero } from '@/components/enterprise/Hero'
import { SolutionsSection } from '@/components/enterprise/SolutionsSection'
import { IndustriesSection } from '@/components/enterprise/IndustriesSection'
import { TechnologiesSection } from '@/components/enterprise/TechnologiesSection'
import CaseStudiesSection from '@/components/enterprise/CaseStudiesSection'
import WhyChooseUsSection from '@/components/enterprise/WhyChooseUsSection'
import { CTASection } from '@/components/enterprise/CTASection'
import FinalCTASection from '@/components/enterprise/FinalCTASection'
import { Footer } from '@/components/enterprise/Footer'

export const metadata = {
  title: 'X Varta - Enterprise Solutions',
  description: 'Transform your business with cutting-edge technology and intelligent solutions designed for enterprise leaders.',
  keywords: 'enterprise, solutions, software, digital transformation',
}

export default function Enterprise() {
  return (
    <main className="bg-white dark:bg-slate-950">
      <Hero />
      <SolutionsSection />
      <IndustriesSection />
      <TechnologiesSection />
      <CaseStudiesSection />
      <WhyChooseUsSection />
      <CTASection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}
