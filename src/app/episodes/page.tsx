import type { Metadata } from 'next'
import SandiQBridge from '@/components/ui/SandiQBridge'
import EpisodeFilter from '@/components/sections/EpisodeFilter'
import SpeakerMarquee from '@/components/ui/SpeakerMarquee'
import { episodes, ALL_THEMES, ALL_COUNTRIES } from '@/lib/episodes'

export const metadata: Metadata = {
  title: 'Episodes',
  description: 'All conversations from Global Perspectives on Digital Health. Stories of AI and digital health for impact with underserved communities worldwide.',
}

export default function EpisodesPage() {
  const speakers = episodes
    .filter((e) => !!e.artworkUrl)
    .sort((a, b) => (Number(b.episodeNumber) || 0) - (Number(a.episodeNumber) || 0))
    .map((e) => ({ slug: e.slug, guest: e.guest, artworkUrl: e.artworkUrl! }))

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
                marginBottom: '1.25rem',
              }}
            >
              ALL EPISODES
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
              }}
            >
              Every conversation.
            </h1>
            <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '38rem' }}>
              Clinicians, founders, researchers, and policy makers working in digital health across the world's most underserved settings.
            </p>
          </div>

          {/* Scrolling speaker columns */}
          <div style={{ flexShrink: 0 }}>
            <SpeakerMarquee speakers={speakers} />
          </div>
        </div>
      </section>

      {/* Search + grid */}
      <section style={{ padding: '4rem var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <SandiQBridge variant="inline" />
          </div>

          <p style={{
            fontSize: '0.9375rem',
            color: 'var(--text-muted)',
            marginBottom: '1.75rem',
            lineHeight: 1.6,
          }}>
            Hey — we&rsquo;ve got a huge back catalogue. Use the search below to find topics, countries, or guests that are relevant to you.
          </p>

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
