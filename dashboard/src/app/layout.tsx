import type { Metadata, Viewport } from 'next'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Dashboard — X Varta',
  description: 'Client dashboard for X Varta services',
  robots: 'noindex, nofollow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}
