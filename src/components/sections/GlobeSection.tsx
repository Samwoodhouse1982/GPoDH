'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import globeData from '@/data/site/globe.json'

const Globe = dynamic(() => import('@/components/ui/Globe'), { ssr: false })

// Scroll thresholds + the city the globe is flying toward are choreographed in
// code (and must stay in sync with ROUTES/ROTATION_KEYFRAMES in Globe.tsx). Only
// the caption + route-heading TEXT is editable in the CMS, via globe.json's
// `journey`. Legs map to: London→Nairobi (Ep20/Ep23, Nairobi GDHF),
// Nairobi→Bengaluru (Remidio AI diagnostics), Bengaluru→Jakarta (Ep16 WHO
// first-mover), Jakarta→São Paulo (transition), São Paulo→Lagos (Ep2 + Ep24),
// Lagos→Geneva (Ep16 WHO policy).
const THRESHOLDS = [0.0, 0.1, 0.28, 0.44, 0.54, 0.72, 0.85]

const STAGES = THRESHOLDS.map((threshold, i) => {
  if (i === 0) {
    return { threshold, caption: globeData.journey.intro, route: null as string | null }
  }
  const leg = globeData.journey.legs[i - 1]
  return { threshold, caption: leg?.caption ?? '', route: (leg?.route ?? null) as string | null }
})


export default function GlobeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [stageIdx, setStageIdx] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const totalScroll = el.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll))
      setScrollProgress(progress)

      let idx = 0
      for (let i = 0; i < STAGES.length; i++) {
        if (progress >= STAGES[i].threshold) idx = i
      }
      setStageIdx(idx)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const stage = STAGES[stageIdx]
  const showHint = scrollProgress < 0.04

  return (
    <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at 15% 50%, rgba(212,97,74,0.07) 0%, transparent 50%), radial-gradient(ellipse at 85% 50%, rgba(62,201,167,0.07) 0%, transparent 50%), var(--bg-primary)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            width: '100%',
            padding: '5rem var(--gutter) 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: '3rem',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {/* Left: scrolling insight text */}
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

            {/* Changing route + caption — fixed height prevents layout shift */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '130px' }}>
              {stage.route ? (
                <p
                  key={stage.route}
                  style={{
                    fontFamily: 'var(--font-cormorant, serif)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    lineHeight: 1.15,
                    animation: 'fadeUp 0.4s ease forwards',
                  }}
                >
                  {stage.route}
                </p>
              ) : (
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant, serif)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    lineHeight: 1.15,
                  }}
                >
                  Scroll to explore
                </p>
              )}

              <p
                key={stage.caption}
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  color: 'var(--text-secondary)',
                  maxWidth: '32ch',
                  fontStyle: 'italic',
                  animation: 'fadeUp 0.4s ease forwards',
                }}
              >
                {stage.caption}
              </p>
            </div>

            {/* Progress pills */}
            <div style={{ display: 'flex', gap: '0.375rem' }}>
              {STAGES.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === stageIdx ? 22 : 6,
                    height: 5,
                    borderRadius: 3,
                    background: i <= stageIdx ? 'var(--accent-coral)' : 'rgba(58,104,96,0.2)',
                    transition: 'width 0.35s ease, background 0.35s ease',
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

          {/* Right: globe */}
          <div
            style={{
              width: '100%',
              aspectRatio: '1',
              maxWidth: 'min(540px, calc(100vh - 10rem))',
              margin: '0 auto',
            }}
          >
            <Globe scrollProgress={scrollProgress} />
          </div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.75rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            opacity: showHint ? 1 : 0,
            transition: 'opacity 0.5s ease',
            pointerEvents: 'none',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-dm-mono, monospace)',
              fontSize: '0.625rem',
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            Scroll to explore
          </p>
          <div
            style={{
              width: 1,
              height: 26,
              background: 'linear-gradient(to bottom, var(--accent-coral), transparent)',
              animation: 'scrollPulse 1.6s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
