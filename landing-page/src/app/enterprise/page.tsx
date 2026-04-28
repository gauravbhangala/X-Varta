import './globals.css'
import { Hero } from '@/components/Hero'
import { SolutionsSection } from '@/components/SolutionsSection'
import { IndustriesSection } from '@/components/IndustriesSection'
import { TechnologiesSection } from '@/components/TechnologiesSection'
import { CTASection } from '@/components/CTASection'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'X Varta - Enterprise Solutions',
  description: 'Transform your business with cutting-edge technology and intelligent solutions designed for enterprise leaders.',
  keywords: 'enterprise, solutions, software, digital transformation',
}

export default function Home() {
  return (
    <main className="bg-white dark:bg-slate-950">
      <Hero />
      <SolutionsSection />
      <IndustriesSection />
      <TechnologiesSection />
      <CTASection />
      <Footer />
    </main>
  )
}
