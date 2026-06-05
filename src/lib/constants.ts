// Shared site copy and links. The values live in src/data/site/settings.json
// so they can be edited in the CMS ("Site settings") without touching code.
import settings from '@/data/site/settings.json'

export const SITE = settings.site
export const CONSULTING = settings.consulting
export const PLATFORMS = settings.platforms
export const SOCIAL = settings.social
export const SEO = settings.seo

// Absolute base URL for metadata, sitemap, robots and JSON-LD. Resolves to the
// live production domain automatically (Vercel sets VERCEL_PROJECT_PRODUCTION_URL
// to the custom domain once attached, otherwise the *.vercel.app URL). Override
// with NEXT_PUBLIC_SITE_URL when the custom domain is live.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://g-po-dh.vercel.app')

