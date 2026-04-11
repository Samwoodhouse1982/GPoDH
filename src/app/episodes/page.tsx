import type { Metadata } from 'next'
import EpisodeFilter from '@/components/sections/EpisodeFilter'
import SpeakerMarquee from '@/components/ui/SpeakerMarquee'
import OrgMarquee from '@/components/ui/OrgMarquee'
import { episodes, ALL_THEMES, ALL_COUNTRIES } from '@/lib/episodes'

export const metadata: Metadata = {
  title: 'Episodes',
  description: 'All conversations from Global Perspectives on Digital Health. Stories of AI and digital health for impact with underserved communities worldwide.',
}

export default function EpisodesPage() {
  const episodeCount = episodes.length

  const speakers = episodes
    .filter((e) => !!e.artworkUrl)
    .sort((a, b) => (Number(b.episodeNumber) || 0) - (Number(a.episodeNumber) || 0))
    .flatMap((e) => {
      // Episode 9 has a combined photo — expand into individual entries
      if (e.slug === 'policy-insights-from-the-rwanda-ministry-of-health-and-find') {
        return [
          { slug: e.slug, guest: 'Rigveda Kadam', artworkUrl: '/guests/rigveda-kadam.jpg' },
          { slug: e.slug, guest: 'Andrew Muhire', artworkUrl: '/guests/andrew-muhire.jpg' },
        ]
      }
      return [{ slug: e.slug, guest: e.guest, artworkUrl: e.artworkUrl! }]
    })

  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: '8rem',
          paddingBottom: '0',
          overflow: 'hidden',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            padding: '0 var(--gutter) 4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
          }}
        >
          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                color: 'var(--accent-coral)',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              ALL EPISODES
            </p>

            <h1
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.05,
                marginBottom: '0.25rem',
                whiteSpace: 'nowrap',
              }}
            >
              Every conversation.
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--accent-coral)',
                lineHeight: 1.05,
                marginBottom: '2rem',
              }}
            >
              Every continent.
            </p>

            {/* Episode count */}
            <p
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '1.75rem',
              }}
            >
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{episodeCount}</span>
              {' '}Episodes and counting
            </p>

            <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '36rem', marginBottom: '1.5rem' }}>
              Clinicians, founders, researchers, and policy makers doing the hard work in digital health across under-resourced settings. The lessons travel.
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              New to the show?{' '}
              <a
                href="/episodes/health-data-poverty-part-1-with-xiao-liu"
                style={{ color: 'var(--accent-coral)', textDecoration: 'none', fontWeight: 500 }}
              >
                Start with Episode 1 &#8594;
              </a>
            </p>
          </div>

          {/* Scrolling speaker columns */}
          <div style={{ flexShrink: 0 }}>
            <SpeakerMarquee speakers={speakers} />
          </div>
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
