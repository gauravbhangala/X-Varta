import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import FloatingCTA from '@/components/FloatingCTA'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Cursor />
      <Navigation />
      <FloatingCTA />
      {children}
      <Footer />
    </>
  )
}
