/**
 * Content Linking System
 * 
 * Establishes relationships between blog posts, solutions, and case studies
 * for improved navigation and SEO internal linking.
 * 
 * @file /src/lib/content-links.ts
 */

import { blogPosts, type BlogPost } from '@/content/blog/posts'
import { solutionsContent } from '@/content/pages/solutions'
import { caseStudiesContent } from '@/content/pages/case-studies'

/**
 * Relationship between blog post and solutions
 */
export const blogToSolutionLinks: Record<string, string[]> = {
  'enterprise-digital-transformation-roadmap': [
    'digital-strategy',
    'enterprise wide',
  ],
  'cloud-migration-best-practices': [
    'cloud-architecture',
  ],
  'ai-automation-enterprise-operations': [
    'ai-automation',
  ],
}

/**
 * Relationship between solutions and case studies
 */
export const solutionToCaseStudyLinks: Record<string, string[]> = {
  'digital-strategy': ['fintech-series-b'],
  'cloud-architecture': ['healthcare-uptime'],
  'ai-automation': ['retail-ai', 'manufacturing-rpa'],
  'custom-development': ['fintech-series-b'],
  'security-compliance': ['banking-security'],
  'performance-optimization': ['retail-ai'],
}

/**
 * Get related blog posts for a given solution
 */
export function getRelatedBlogPosts(solutionId: string): BlogPost[] {
  return blogPosts.filter(post => {
    const relatedSolutions = blogToSolutionLinks[post.slug] || []
    return relatedSolutions.includes(solutionId)
  })
}

/**
 * Get related case studies for a given solution
 */
export function getRelatedCaseStudies(solutionId: string): any[] {
  const caseStudyIds = solutionToCaseStudyLinks[solutionId] || []
  return caseStudiesContent.casesStudies.filter(cs => 
    caseStudyIds.includes(cs.id)
  )
}

/**
 * Get related blog posts and case studies for a blog post
 */
export function getRelatedContent(blogSlug: string) {
  const relatedSolutions = blogToSolutionLinks[blogSlug] || []
  
  return {
    solutions: solutionsContent.solutions.filter(s =>
      relatedSolutions.includes(s.id)
    ),
    caseStudies: caseStudiesContent.casesStudies.filter(cs => {
      const categories = relatedSolutions
      return categories.some(cat =>
        cs.category.toLowerCase() === cat.replace('-', ' ')
      )
    }),
  }
}

/**
 * Internal linking suggestions for SEO
 * Returns array of URLs that should be linked
 */
export function getInternalLinks(currentPage: 'home' | 'solutions' | 'blog' | 'case-studies' | 'about') {
  const links: Record<string, string[]> = {
    home: [
      '/solutions',
      '/case-studies',
      '/insights',
      '/about',
    ],
    solutions: [
      '/',
      '/case-studies',
      '/insights',
    ],
    blog: [
      '/',
      '/solutions',
      '/case-studies',
    ],
    'case-studies': [
      '/',
      '/solutions',
      '/insights',
    ],
    about: [
      '/',
      '/contact',
    ],
  }
  
  return links[currentPage] || []
}

/**
 * Types for internal linking
 */
export interface InternalLink {
  text: string
  url: string
  ariaLabel?: string
  rel?: 'nofollow' | 'sponsored' | 'ugc'
}

/**
 * Build a complete internal link with context
 */
export function buildInternalLink(
  text: string,
  path: string,
  context?: string
): InternalLink {
  return {
    text,
    url: path,
    ariaLabel: context ? `${text} - ${context}` : text,
  }
}

/**
 * Get contextual recommendations for linking
 */
export function getContextualLinks(currentContent: {
  type: 'blog' | 'solution' | 'case-study'
  id: string
}): InternalLink[] {
  const links: InternalLink[] = []

  if (currentContent.type === 'blog') {
    const related = getRelatedContent(currentContent.id)
    
    // Add solution links
    related.solutions.forEach(solution => {
      links.push(
        buildInternalLink(
          solution.title,
          `/solutions#${solution.id}`,
          'Related solution'
        )
      )
    })

    // Add case study links
    related.caseStudies.forEach(study => {
      links.push(
        buildInternalLink(
          study.title,
          `/case-studies#${study.id}`,
          'Related case study'
        )
      )
    })
  }

  if (currentContent.type === 'solution') {
    const caseStudies = getRelatedCaseStudies(currentContent.id)

    caseStudies.forEach(study => {
      links.push(
        buildInternalLink(
          study.title,
          `/case-studies#${study.id}`,
          'Real-world example'
        )
      )
    })

    const relatedPosts = getRelatedBlogPosts(currentContent.id)
    relatedPosts.forEach(post => {
      links.push(
        buildInternalLink(
          post.title,
          `/insights/${post.slug}`,
          'Learn more'
        )
      )
    })
  }

  if (currentContent.type === 'case-study') {
    // Add relevant solution links
    links.push(
      buildInternalLink(
        'Explore similar solutions',
        '/solutions',
        'View all solutions'
      )
    )
  }

  return links
}

/**
 * Generate SEO-optimized anchor text for internal links
 */
export function generateAnchorText(
  baseText: string,
  keyword?: string,
  variation?: 'long' | 'short'
): string {
  const variations: Record<string, { long: string; short: string }> = {
    'digital transformation': {
      long: 'enterprise digital transformation',
      short: 'digital transformation',
    },
    'cloud migration': {
      long: 'cloud migration best practices',
      short: 'cloud migration',
    },
    'AI automation': {
      long: 'AI and RPA automation',
      short: 'AI automation',
    },
  }

  if (keyword && variations[keyword]) {
    return variation === 'long' 
      ? variations[keyword].long 
      : variations[keyword].short
  }

  return baseText
}

/**
 * Internal Link Component (Ready to use in pages)
 */
export interface InternalLinkProps extends InternalLink {
  className?: string
}

/**
 * Usage Examples:
 * 
 * // Get related blog posts for a solution
 * const relatedPosts = getRelatedBlogPosts('cloud-architecture')
 * 
 * // Get related case studies for a solution
 * const relatedCases = getRelatedCaseStudies('ai-automation')
 * 
 * // Get all related content for a blog post
 * const related = getRelatedContent('cloud-migration-best-practices')
 * 
 * // Generate contextual links
 * const links = getContextualLinks({
 *   type: 'blog',
 *   id: 'enterprise-digital-transformation-roadmap'
 * })
 * 
 * // Build optimized anchor text
 * const anchorText = generateAnchorText(
 *   'Learn more about digital transformation',
 *   'digital transformation',
 *   'long'
 * )
 * 
 * // Usage in a React component:
 * 
 * export function BlogPostLinks({ blogSlug }: { blogSlug: string }) {
 *   const related = getRelatedContent(blogSlug)
 *   const contextualLinks = getContextualLinks({ type: 'blog', id: blogSlug })
 *   
 *   return (
 *     <section className="mt-12 pt-12 border-t border-gray-700">
 *       <h3 className="text-2xl font-bold text-white mb-8">Related Content</h3>
 *       
 *       {related.solutions.length > 0 && (
 *         <div className="mb-8">
 *           <h4 className="text-lg font-semibold text-white mb-4">
 *             Explore Related Solutions
 *           </h4>
 *           <ul className="space-y-2">
 *             {related.solutions.map(solution => (
 *               <li key={solution.id}>
 *                 <a 
 *                   href={`/solutions#${solution.id}`}
 *                   className="text-blue-400 hover:text-blue-300 transition"
 *                 >
 *                   → {solution.title}
 *                 </a>
 *               </li>
 *             ))}
 *           </ul>
 *         </div>
 *       )}
 *       
 *       {related.caseStudies.length > 0 && (
 *         <div>
 *           <h4 className="text-lg font-semibold text-white mb-4">
 *             See it in Action
 *           </h4>
 *           <ul className="space-y-2">
 *             {related.caseStudies.map(study => (
 *               <li key={study.id}>
 *                 <a 
 *                   href={`/case-studies#${study.id}`}
 *                   className="text-blue-400 hover:text-blue-300 transition"
 *                 >
 *                   → {study.title}
 *                 </a>
 *               </li>
 *             ))}
 *           </ul>
 *         </div>
 *       )}
 *     </section>
 *   )
 * }
 */
