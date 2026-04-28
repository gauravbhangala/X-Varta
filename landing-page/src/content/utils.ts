/**
 * Content System Utilities
 * 
 * Helper functions for content management and dynamic imports
 */

import { homeContent } from './pages/home'
import { solutionsContent } from './pages/solutions'
import { caseStudiesContent } from './pages/case-studies'
import { aboutContent } from './pages/about'
import { contactContent } from './pages/contact'
import { insightsContent } from './pages/insights'

/**
 * Type definitions for content structure
 */
export interface ContentMeta {
  title: string
  description: string
  keywords: string[]
  canonical: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
}

/**
 * Get content for a specific page
 * @param pageName - Name of the page (home, solutions, etc.)
 * @returns Content object for that page
 */
export function getPageContent(pageName: string): any {
  const pages: Record<string, any> = {
    home: homeContent,
    solutions: solutionsContent,
    'case-studies': caseStudiesContent,
    about: aboutContent,
    contact: contactContent,
    insights: insightsContent,
  }
  
  return pages[pageName] || null
}

/**
 * Get metadata for a specific page
 * @param pageName - Name of the page
 * @returns Metadata object for that page
 */
export function getPageMetadata(pageName: string): ContentMeta | null {
  const content = getPageContent(pageName)
  return content?.meta || null
}

/**
 * Get all page names
 * @returns Array of available page names
 */
export function getPageNames(): string[] {
  return ['home', 'solutions', 'case-studies', 'about', 'contact', 'insights']
}

/**
 * Generate canonical URL
 * @param pageName - Name of the page
 * @param baseUrl - Base URL of the site
 * @returns Full canonical URL
 */
export function getCanonicalUrl(pageName: string, baseUrl: string = 'https://nexus.agency'): string {
  const paths: Record<string, string> = {
    home: '/',
    solutions: '/solutions',
    'case-studies': '/case-studies',
    about: '/about',
    contact: '/contact',
    insights: '/insights',
  }
  
  const path = paths[pageName] || '/'
  return `${baseUrl}${path === '/' ? '' : path}`
}

/**
 * Format metadata for Next.js Metadata type
 * @param content - Content object with meta property
 * @returns Formatted Metadata object
 */
export function formatMetadata(content: any) {
  const meta = content?.meta
  if (!meta) return {}

  return {
    title: meta.title,
    description: meta.description,
    keywords: Array.isArray(meta.keywords) ? meta.keywords.join(', ') : meta.keywords,
    alternates: {
      canonical: meta.canonical,
    },
    openGraph: {
      title: meta.ogTitle || meta.title,
      description: meta.ogDescription || meta.description,
      url: meta.ogUrl || meta.canonical,
      type: 'website' as const,
      ...(meta.ogImage && {
        images: [
          {
            url: meta.ogImage,
            width: 1200,
            height: 630,
            alt: meta.ogTitle || meta.title,
          },
        ],
      }),
    },
    ...(meta.twitterCard && {
      twitter: {
        card: meta.twitterCard as 'summary_large_image',
        title: meta.twitterTitle || meta.title,
        description: meta.twitterDescription || meta.description,
      },
    }),
  }
}

/**
 * Get all available content
 * @returns Object with all page contents
 */
export function getAllPageContents() {
  return {
    home: homeContent,
    solutions: solutionsContent,
    caseStudies: caseStudiesContent,
    about: aboutContent,
    contact: contactContent,
    insights: insightsContent,
  }
}

/**
 * Export all content for bulk operations
 */
export const ALL_CONTENT = getAllPageContents()

/**
 * Content validation helpers
 */

/**
 * Validate that content has required meta fields
 */
export function validateContentMeta(content: any): boolean {
  const meta = content?.meta
  if (!meta) return false

  return (
    typeof meta.title === 'string' &&
    typeof meta.description === 'string' &&
    Array.isArray(meta.keywords) &&
    typeof meta.canonical === 'string'
  )
}

/**
 * Check if all page contents have valid metadata
 */
export function validateAllPageMetadata(): string[] {
  const invalidPages: string[] = []
  const allContent = getAllPageContents()

  Object.entries(allContent).forEach(([pageName, content]) => {
    if (!validateContentMeta(content)) {
      invalidPages.push(pageName)
    }
  })

  return invalidPages
}

/**
 * Export individual content objects for convenience
 */
export {
  homeContent,
  solutionsContent,
  caseStudiesContent,
  aboutContent,
  contactContent,
  insightsContent,
}
