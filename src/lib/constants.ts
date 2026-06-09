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
// to the custom domain once it's the primary domain, otherwise the *.vercel.app
// URL). To force it, set NEXT_PUBLIC_SITE_URL in Vercel — that wins over both.
// Canonical domain is gpodh.org (the bare apex; www redirects to it).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://gpodh.org')

