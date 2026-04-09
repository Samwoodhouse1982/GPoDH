'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Episode } from '@/lib/episodes';

interface LatestEpisodesCarouselProps {
  episodes: Episode[];
}

const CARD_WIDTH = 260;
const CARD_GAP = 20;
const SCROLL_AMOUNT = CARD_WIDTH + CARD_GAP;

export default function LatestEpisodesCarousel({ episodes }: LatestEpisodesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;
    const observer = new ResizeObserver(updateArrows);
    observer.observe(el);
    return () => observer.disconnect();
  }, [episodes]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
  };

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
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            style={{
              position: 'absolute',
              left: '-20px',
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
            }}
          >
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
              gap: `${CARD_GAP}px`,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: '4px',
            }}
          >
            {episodes.map((episode) => (
              <Link
                key={episode.id}
                href={`/episodes/${episode.slug}`}
                className="carousel-card"
                style={{
                  flexShrink: 0,
                  width: `${CARD_WIDTH}px`,
                  height: '200px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderTop: '3px solid var(--accent-coral)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                {/* Episode number badge */}
                <span
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.625rem',
                    fontVariant: 'small-caps',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--accent-coral)',
                    lineHeight: 1,
                  }}
                >
                  {episode.episodeNumber != null ? `Ep ${episode.episodeNumber}` : 'Episode'}
                </span>

                {/* Title */}
                <span
                  style={{
                    fontFamily: 'Cormorant, serif',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {episode.title}
                </span>

                {/* Guest name */}
                <span
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {episode.guest}
                </span>

                {/* Date */}
                <span
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.625rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1,
                  }}
                >
                  {episode.date}
                </span>

                {/* Listen CTA */}
                <span
                  style={{
                    marginTop: 'auto',
                    paddingTop: '8px',
                    fontSize: '0.8125rem',
                    color: 'var(--accent-coral)',
                    fontWeight: 500,
                  }}
                >
                  Listen →
                </span>
              </Link>
            ))}
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
          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            style={{
              position: 'absolute',
              right: '-20px',
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
            }}
          >
            →
          </button>
        )}
      </div>
    </>
  );
}
