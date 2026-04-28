import { MetadataRoute } from 'next'

/**
 * SEO Sitemap
 * Automatically generated list of all pages for search engines
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nexus.agency'
  
  const routes = [
    // Main pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Add dynamic blog post routes
  // In production, fetch from your CMS or database
  const blogs = [
    { slug: 'enterprise-digital-transformation-roadmap', lastModified: new Date('2024-01-15') },
    { slug: 'cloud-migration-best-practices', lastModified: new Date('2024-01-10') },
    { slug: 'ai-automation-enterprise-operations', lastModified: new Date('2024-01-05') },
  ]

  const blogRoutes = blogs.map(blog => ({
    url: `${baseUrl}/insights/${blog.slug}`,
    lastModified: blog.lastModified,
    changeFrequency: 'never' as const,
    priority: 0.7,
  }))

  return [...routes, ...blogRoutes]
}
