/**
 * Content System Index
 * 
 * Central location to understand all content organization
 * 
 * @file /src/content/index.ts
 * @description Exports all content for easy imports and organization
 */

// ============================================
// PAGE CONTENTS - Organized by page
// ============================================

export {
  homeContent,
  type HomeContent,
} from './pages/home'

export {
  solutionsContent,
  type SolutionsContent,
} from './pages/solutions'

export {
  caseStudiesContent,
  type CaseStudiesContent,
} from './pages/case-studies'

export {
  aboutContent,
  type AboutContent,
} from './pages/about'

export {
  contactContent,
  type ContactContent,
} from './pages/contact'

export {
  insightsContent,
  type InsightsContent,
} from './pages/insights'

// ============================================
// BLOG SYSTEM
// ============================================

export {
  blogPosts,
  getBlogPost,
  getBlogPosts,
  getBlogCategories,
  type BlogPost,
} from './blog/posts'

// ============================================
// CONTENT UTILITIES
// ============================================

export {
  getPageContent,
  getPageMetadata,
  getPageNames,
  getCanonicalUrl,
  formatMetadata,
  getAllPageContents,
  ALL_CONTENT,
  validateContentMeta,
  validateAllPageMetadata,
  type ContentMeta,
} from './utils'

/**
 * STRUCTURE GUIDE
 * 
 * Content Organization:
 * 
 * /src/content/
 *   ├── pages/
 *   │   ├── home.ts              - Homepage content
 *   │   ├── solutions.ts         - Solutions page content
 *   │   ├── case-studies.ts      - Case studies page content
 *   │   ├── about.ts             - About page content
 *   │   ├── contact.ts           - Contact page content
 *   │   └── insights.ts          - Blog listing page content
 *   │
 *   ├── blog/
 *   │   └── posts.ts             - All blog posts + utilities
 *   │
 *   ├── utils.ts                 - Utility functions
 *   └── index.ts                 - This file (central export)
 * 
 * USAGE EXAMPLES
 * ==============
 * 
 * // Import entire content object
 * import { homeContent } from '@/content'
 * 
 * // Use specific content
 * const { hero, services } = homeContent
 * 
 * // Get metadata
 * const { meta } = homeContent
 * 
 * // Blog posts
 * import { getBlogPosts, getBlogPost } from '@/content'
 * const posts = getBlogPosts()
 * const post = getBlogPost('my-post-slug')
 * 
 * // Utilities
 * import { formatMetadata, getPageContent } from '@/content'
 * const metadata = formatMetadata(homeContent)
 * const allContent = getAllPageContents()
 * 
 * CONTENT STRUCTURE
 * =================
 * 
 * Each page content follows this pattern:
 * 
 * export const [pageName]Content = {
 *   meta: {
 *     title: string              // 50-60 chars
 *     description: string        // 150-160 chars
 *     keywords: string[]         // 5-8 keywords
 *     canonical: string          // Full URL
 *     ogTitle?: string           // Social media
 *     ogDescription?: string
 *     ogImage?: string
 *     ogUrl?: string
 *     twitterCard?: string
 *     // ... other social metadata
 *   },
 *   hero: {
 *     headline: string
 *     subheadline: string
 *     // ... other hero content
 *   },
 *   // ... more sections
 *   cta: {
 *     headline: string
 *     description: string
 *     buttonText: string
 *   },
 *   faq?: {
 *     items: Array<{
 *       question: string
 *       answer: string
 *     }>
 *   }
 * }
 * 
 * BLOG POST STRUCTURE
 * ===================
 * 
 * interface BlogPost {
 *   id: string                    // Unique identifier
 *   slug: string                  // URL-friendly identifier
 *   title: string                 // Post title
 *   excerpt: string              // Short summary
 *   content: string              // Full post content (markdown)
 *   author: {
 *     name: string
 *     role: string
 *     image?: string
 *   }
 *   publishedAt: Date             // Publication date
 *   updatedAt?: Date              // Last update
 *   category: string              // Post category
 *   tags: string[]                // Search tags
 *   image: string                 // Featured image
 *   readingTime: number           // Minutes to read
 *   seo: {
 *     title: string               // SEO title
 *     description: string         // SEO description
 *     keywords: string[]          // SEO keywords
 *   }
 * }
 * 
 * ADDING NEW CONTENT
 * ==================
 * 
 * 1. Create new content file in /pages/
 * 2. Export const [name]Content = { ... }
 * 3. Add export to this index.ts
 * 4. Create page component that imports the content
 * 5. Use content to populate metadata and render
 * 
 * ROADMAP
 * =======
 * 
 * Phase 1 (Done):      Mock data content system
 * Phase 2 (Next):      CMS integration via API
 * Phase 3 (Future):    Real-time content updates (ISR)
 * Phase 4 (Future):    Advanced schema markup
 * Phase 5 (Future):    Multi-language content
 */
