import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { SEO, SITE, SITE_URL, PLATFORMS, SOCIAL } from '@/lib/constants'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: SEO.titleTemplate,
    default: SEO.defaultTitle,
  },
  description: SEO.description,
  applicationName: SITE.name,
  icons: {
    icon: '/logo-gpodh-icon.png',
    apple: '/logo-gpodh-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: SEO.defaultTitle,
    description: SEO.description,
    url: SITE_URL,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.defaultTitle,
    description: SEO.description,
    images: ['/og-image.jpg'],
  },
}

// Site-wide structured data: the podcast series + the organisation behind it.
// Helps Google show rich podcast results and links the social/listening profiles.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'PodcastSeries',
      '@id': `${SITE_URL}/#podcast`,
      name: SITE.name,
      alternateName: SITE.shortName,
      description: SEO.description,
      url: SITE_URL,
      image: `${SITE_URL}/og-image.jpg`,
      webFeed: PLATFORMS.apple,
      author: { '@type': 'Person', name: 'Dr Shubs Upadhyay' },
      sameAs: [PLATFORMS.apple, PLATFORMS.spotify, PLATFORMS.youtube, SOCIAL.linkedinCompany].filter(Boolean),
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: SITE.name,
      url: SITE_URL,
      logo: `${SITE_URL}/logo-gpodh.png`,
      sameAs: [SOCIAL.linkedinCompany, SOCIAL.substack, PLATFORMS.youtube].filter(Boolean),
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        {/* Vercel Web Analytics — privacy-friendly, cookieless page-view stats.
            Renders nothing; data only flows once Analytics is enabled in the
            Vercel dashboard (Project → Analytics → Enable). */}
        <Analytics />
        {/* Vercel Speed Insights — real-user performance (Core Web Vitals).
            Renders nothing; enable it in the Vercel dashboard
            (Project → Speed Insights → Enable) for data to flow. */}
        <SpeedInsights />
      </body>
    </html>
  )
}
