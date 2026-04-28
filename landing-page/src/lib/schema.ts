/**
 * Schema & Structured Data Utilities
 * 
 * Generates JSON-LD structured data for SEO optimization.
 * Includes Organization, Article, Breadcrumb, FAQ, and more schemas.
 * 
 * @file /src/lib/schema.ts
 */

/**
 * Organization Schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NEXUS',
    alternateName: 'NEXUS Digital Solutions',
    url: 'https://nexus.agency',
    logo: 'https://nexus.agency/logo.svg',
    sameAs: [
      'https://www.linkedin.com/company/nexus-digital',
      'https://twitter.com/nexus_digital',
      'https://github.com/nexus-digital',
    ],
    description: 'Enterprise-grade digital transformation and growth solutions.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Innovation Drive',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1 (555) 123-4567',
      contactType: 'Customer Support',
      email: 'hello@nexus.agency',
      availableLanguage: ['en'],
    },
    founder: [
      { '@type': 'Person', name: 'John Summit', jobTitle: 'CEO & Co-Founder' },
      { '@type': 'Person', name: 'Sarah Chen', jobTitle: 'Chief Technology Officer' },
    ],
  }
}

/**
 * Article/Blog Post Schema
 */
export function generateArticleSchema({
  title,
  slug,
  excerpt,
  content,
  authorName,
  authorRole,
  publishedAt,
  updatedAt,
  category,
  readingTime,
}: {
  title: string
  slug: string
  excerpt: string
  content: string
  authorName: string
  authorRole: string
  publishedAt: Date
  updatedAt?: Date
  category: string
  readingTime: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt,
    articleBody: content,
    url: `https://nexus.agency/insights/${slug}`,
    datePublished: publishedAt.toISOString(),
    dateModified: updatedAt?.toISOString() || publishedAt.toISOString(),
    articleSection: category,
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: 'NEXUS',
      url: 'https://nexus.agency',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nexus.agency/insights/${slug}`,
    },
    image: {
      '@type': 'ImageObject',
      url: `https://nexus.agency/blog/images/${slug}.jpg`,
      width: 1200,
      height: 630,
    },
    timeRequired: `PT${readingTime}M`,
    wordCount: content.split(' ').length,
  }
}

/**
 * Breadcrumb Schema
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

/**
 * FAQ Schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Product/Service Schema
 */
export function generateServiceSchema({
  name,
  description,
  url,
  image,
  provider = 'NEXUS',
}: {
  name: string
  description: string
  url: string
  image?: string
  provider?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    ...(image && { image }),
    provider: {
      '@type': 'Organization',
      name: provider,
    },
  }
}

/**
 * Review/Case Study Schema
 */
export function generateReviewSchema({
  name,
  description,
  reviewRating,
  author,
  publishedAt,
}: {
  name: string
  description: string
  reviewRating: number
  author: string
  publishedAt: Date
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name,
    reviewBody: description,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: reviewRating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished: publishedAt.toISOString(),
  }
}

/**
 * Local Business Schema (for office locations)
 */
export function generateLocalBusinessSchema({
  name,
  address,
  phone,
  latitude,
  longitude,
}: {
  name: string
  address: string
  phone: string
  latitude: number
  longitude: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    address,
    telephone: phone,
    geo: {
      '@type': 'GeoCoordinates',
      latitude,
      longitude,
    },
  }
}

/**
 * Schema Helper Component
 * Use this in pages to inject structured data
 */
export function Schema({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * Usage Examples:
 * 
 * // In a page component
 * import { generateOrganizationSchema, Schema } from '@/lib/schema'
 * 
 * export default function HomePage() {
 *   return (
 *     <>
 *       <Schema data={generateOrganizationSchema()} />
 *       {/* Page content */}
 *     </>
 *   )
 * }
 * 
 * // For blog posts
 * import { generateArticleSchema, Schema } from '@/lib/schema'
 * import { getBlogPost } from '@/content/blog/posts'
 * 
 * export default function BlogPost({ params }) {
 *   const post = getBlogPost(params.slug)
 *   
 *   return (
 *     <>
 *       <Schema data={generateArticleSchema({
 *         title: post.title,
 *         slug: post.slug,
 *         excerpt: post.excerpt,
 *         content: post.content,
 *         authorName: post.author.name,
 *         authorRole: post.author.role,
 *         publishedAt: post.publishedAt,
 *         category: post.category,
 *         readingTime: post.readingTime,
 *       })} />
 *       {/* Post content */}
 *     </>
 *   )
 * }
 * 
 * // For breadcrumbs
 * <Schema data={generateBreadcrumbSchema([
 *   { name: 'Home', url: 'https://nexus.agency' },
 *   { name: 'Insights', url: 'https://nexus.agency/insights' },
 *   { name: 'Article Title', url: 'https://nexus.agency/insights/article-slug' },
 * ])} />
 */
