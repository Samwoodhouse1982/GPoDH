import type { Metadata } from 'next'
import Link from 'next/link'
import EpisodeFilter from '@/components/sections/EpisodeFilter'
import SpeakerMarquee from '@/components/ui/SpeakerMarquee'
import FaintGlobe from '@/components/ui/FaintGlobe'
import OrgMarquee from '@/components/ui/OrgMarquee'
import { episodes, ALL_THEMES, ALL_COUNTRIES } from '@/lib/episodes'
import { SEO } from '@/lib/constants'

export const metadata: Metadata = {
  title: SEO.episodes.title,
  description: SEO.episodes.description,
}

export default function EpisodesPage() {
  const episodeCount = episodes.length

  const speakers = episodes
    .filter((e) => !!e.artworkUrl || (e.guestFaces?.length ?? 0) > 0)
    .sort((a, b) => (Number(b.episodeNumber) || 0) - (Number(a.episodeNumber) || 0))
    .flatMap((e) => {
      // Multi-guest episodes list individual faces in `guestFaces` (set in the
      // CMS); these replace the single combined photo in the floating cloud.
      if (e.guestFaces?.length) {
        return e.guestFaces.map((g) => ({
          slug: e.slug,
          guest: g.name,
          artworkUrl: g.artworkUrl,
          artworkPosition: g.artworkPosition,
        }))
      }
      return [{ slug: e.slug, guest: e.guest, artworkUrl: e.artworkUrl!, artworkPosition: e.artworkPosition }]
    })

  return (
    <>
      {/* Hero */}
      <section
        style={{
          padding: 'clamp(7rem, 3rem + 11vw, 10rem) var(--gutter) 0',
          overflow: 'hidden',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            paddingBottom: '4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
          }}
        >
          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              className="animate-fade-up"
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.6875rem',
                letterSpacing: '0.15em',
                color: 'var(--accent-coral)',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                animationDelay: '0ms',
              }}
            >
              ALL EPISODES
            </p>

            <h1
              className="animate-fade-up"
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.05,
                marginBottom: '0.25rem',
                animationDelay: '100ms',
              }}
            >
              Every conversation.
            </h1>
            <p
              className="animate-fade-up"
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--accent-coral)',
                lineHeight: 1.05,
                marginBottom: '2rem',
                animationDelay: '160ms',
              }}
            >
              Every continent.
            </p>

            {/* Episode count */}
            <p
              className="animate-fade-up"
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '1.75rem',
                animationDelay: '220ms',
              }}
            >
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{episodeCount}</span>
              {' '}Episodes and counting
            </p>

            <p className="animate-fade-up" style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '36rem', marginBottom: '1.5rem', animationDelay: '280ms' }}>
              Clinicians, founders, researchers, and policy makers are doing the hard work in digital health across under-resourced settings - and the lessons that they&#39;ve learned travel.
            </p>
            <p className="animate-fade-up" style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, animationDelay: '340ms' }}>
              New to the show?{' '}
              <Link
                href="/episodes/health-data-poverty-part-1-with-xiao-liu"
                style={{ color: 'var(--accent-coral)', textDecoration: 'none', fontWeight: 500 }}
              >
                Start with Episode 1 &#8594;
              </Link>
            </p>
          </div>

          {/* Scrolling speaker columns over a faint globe — hidden on mobile */}
          <div className="episodes-marquee animate-fade-up" style={{ flexShrink: 0, position: 'relative', animationDelay: '300ms' }}>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            >
              <FaintGlobe size={400} />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <SpeakerMarquee speakers={speakers} />
            </div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              .episodes-marquee { display: none; }
            }
          `}</style>
        </div>
      </section>

      {/* Org marquee */}
      <div>
        <p style={{
          textAlign: 'center',
          fontFamily: 'var(--font-dm-mono, var(--font-mono))',
          fontSize: '0.625rem',
          letterSpacing: '0.14em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          padding: '1.75rem 0 0.75rem',
        }}>
          Guests represent organisations including
        </p>
        <OrgMarquee />
      </div>

      {/* Search + grid */}
      <section style={{ padding: '3rem var(--gutter) 4rem' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <EpisodeFilter
            episodes={episodes}
            allThemes={ALL_THEMES}
            allCountries={ALL_COUNTRIES}
          />
        </div>
      </section>
    </>
  )
}
