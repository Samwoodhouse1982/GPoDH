import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { episodes } from '@/lib/episodes'
import { videos } from '@/lib/videos'

// Auto-generated sitemap covering the static pages plus every episode and video
// detail page, so search engines can discover all content. Served at /sitemap.xml.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages = ['', '/episodes', '/videos', '/work-with-us', '/resources', '/contact'].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7,
    })
  )

  const episodePages = episodes.map((ep) => ({
    url: `${SITE_URL}/episodes/${ep.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const videoPages = videos.map((v) => ({
    url: `${SITE_URL}/videos/${v.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...episodePages, ...videoPages]
}
