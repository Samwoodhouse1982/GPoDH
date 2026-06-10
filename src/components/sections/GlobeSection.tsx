'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import globeData from '@/data/site/globe.json'

const Globe = dynamic(() => import('@/components/ui/Globe'), { ssr: false })

// The globe runs its own looping animation and reports which leg is active via
// onStage; the caption here just follows along. Stage 0 is the intro line,
// stages 1..6 map to the journey legs in globe.json. The legs map to: London→
// Nairobi (Ep20/Ep23, Nairobi GDHF), Nairobi→Bengaluru (Remidio AI diagnostics),
// Bengaluru→Jakarta (Ep16 WHO first-mover), Jakarta→São Paulo (transition),
// São Paulo→Lagos (Ep2 + Ep24), Lagos→Geneva (Ep16 WHO policy).
const STAGES = [
  { caption: globeData.journey.intro, route: null as string | null },
  ...globeData.journey.legs.map((leg) => ({
    caption: leg?.caption ?? '',
    route: (leg?.route ?? null) as string | null,
  })),
]

export default function GlobeSection() {
  const [stageIdx, setStageIdx] = useState(0)
  const stage = STAGES[stageIdx] ?? STAGES[0]

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background:
          'radial-gradient(ellipse at 15% 50%, rgba(212,97,74,0.07) 0%, transparent 50%), radial-gradient(ellipse at 85% 50%, rgba(62,201,167,0.07) 0%, transparent 50%), var(--bg-primary)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          width: '100%',
          padding: 'clamp(4rem, 8vw, 7rem) var(--gutter)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}
      >
        {/* Left: the insight text, following the globe */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: 'var(--font-dm-mono, monospace)',
              fontSize: '0.6875rem',
              letterSpacing: '0.15em',
              color: 'var(--accent-coral)',
              textTransform: 'uppercase',
            }}
          >
            Insights in motion
          </p>

          {/* Changing route + caption — fixed min-height prevents layout shift */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '150px' }}>
            <p
              key={stage.route ?? 'intro-heading'}
              style={{
                fontFamily: 'var(--font-cormorant, serif)',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 600,
                color: stage.route ? 'var(--text-primary)' : 'var(--text-muted)',
                lineHeight: 1.15,
                animation: 'fadeUp 0.5s ease forwards',
              }}
            >
              {stage.route ?? 'Stories from across the globe'}
            </p>

            <p
              key={stage.caption}
              style={{
                fontSize: '1rem',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                maxWidth: '34ch',
                fontStyle: 'italic',
                animation: 'fadeUp 0.5s ease forwards',
              }}
            >
              {stage.caption}
            </p>
          </div>

          {/* Progress pills — reflect the leg the globe is currently tracing */}
          <div style={{ display: 'flex', gap: '0.375rem' }} aria-hidden="true">
            {STAGES.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === stageIdx ? 22 : 6,
                  height: 5,
                  borderRadius: 3,
                  background: i === stageIdx ? 'var(--accent-coral)' : 'rgba(58,104,96,0.2)',
                  transition: 'width 0.45s ease, background 0.45s ease',
                }}
              />
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/episodes"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.875rem',
              color: 'var(--accent-coral)',
              textDecoration: 'none',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              fontWeight: 500,
            }}
          >
            Browse all episodes
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Right: the self-animating globe */}
        <div
          style={{
            width: '100%',
            aspectRatio: '1',
            maxWidth: 'min(540px, 80vw)',
            margin: '0 auto',
          }}
        >
          <Globe onStage={setStageIdx} />
        </div>
      </div>
    </section>
  )
}
