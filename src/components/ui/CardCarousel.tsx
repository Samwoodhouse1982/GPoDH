'use client'

import { useRef, useState, useEffect, type ReactNode } from 'react'
import Link from 'next/link'

const CARD_GAP = 20

interface Props {
  /** The cards. Each should be a fixed-width, non-shrinking flex item. */
  children: ReactNode
  /** Card width in px — used for the scroll step and the browse-tile width. */
  cardWidth: number
  browseHref: string
  browseLabel: string
  browseSubtitle: string
}

/**
 * Horizontal, scroll-snapping card rail with prev/next arrows, a right-edge
 * fade, and a dashed "browse more" tile appended as the final card. The cards
 * themselves are passed in as children, so the same shell powers the episodes
 * and videos rails on the home page.
 */
export default function CardCarousel({
  children,
  cardWidth,
  browseHref,
  browseLabel,
  browseSubtitle,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateArrows = () => {
    const el = scrollRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 0)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1)
  }

  useEffect(() => {
    updateArrows()
    const el = scrollRef.current
    if (!el) return
    const observer = new ResizeObserver(updateArrows)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scrollByStep = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * (cardWidth + CARD_GAP), behavior: 'smooth' })
  }

  const arrowStyle = (side: 'left' | 'right'): React.CSSProperties => ({
    position: 'absolute',
    [side]: '-20px',
    zIndex: 2,
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'var(--accent-coral)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  })

  return (
    <>
      <style>{`
        .carousel-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }
        .carousel-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Left arrow */}
        {!atStart && (
          <button onClick={() => scrollByStep(-1)} aria-label="Scroll left" style={arrowStyle('left')}>
            ←
          </button>
        )}

        {/* Scroll container with right-edge fade */}
        <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
          <div
            ref={scrollRef}
            className="carousel-scroll"
            onScroll={updateArrows}
            style={{
              display: 'flex',
              alignItems: 'stretch',
              gap: `${CARD_GAP}px`,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: '4px',
            }}
          >
            {children}

            {/* Browse-more tile — always the last card in the rail */}
            <Link
              href={browseHref}
              className="carousel-card carousel-browse"
              aria-label={browseLabel}
              style={{
                flexShrink: 0,
                width: `${cardWidth}px`,
                alignSelf: 'stretch',
                minHeight: '220px',
                background: 'var(--bg-card)',
                border: '1px dashed var(--border-accent)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'var(--accent-coral)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <span
                style={{
                  fontFamily: 'Cormorant, serif',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}
              >
                {browseLabel}
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {browseSubtitle}
              </span>
            </Link>
          </div>

          {/* Right-edge gradient fade */}
          {!atEnd && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: '4px',
                width: '80px',
                background: 'linear-gradient(to right, transparent, var(--bg-primary))',
                pointerEvents: 'none',
              }}
            />
          )}
        </div>

        {/* Right arrow */}
        {!atEnd && (
          <button onClick={() => scrollByStep(1)} aria-label="Scroll right" style={arrowStyle('right')}>
            →
          </button>
        )}
      </div>
    </>
  )
}
