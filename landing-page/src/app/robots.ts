import { MetadataRoute } from 'next'

/**
 * Robots.txt
 * Directives for search engine crawlers
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api',
          '/.next',
          '/_next',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
    ],
    sitemap: 'https://nexus.agency/sitemap.xml',
    host: 'https://nexus.agency',
  }
}
