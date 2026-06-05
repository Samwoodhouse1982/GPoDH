import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

// Served at /robots.txt. Allows crawling of all content, keeps the CMS admin and
// API routes out of the index, and points crawlers at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
