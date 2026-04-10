'use client'

import Image from 'next/image'
import Link from 'next/link'

interface Speaker {
  slug: string
  guest: string
  artworkUrl: string
}

interface Props {
  speakers: Speaker[]
}

// Deterministic pseudo-random from a seed
function seededRand(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

export default function SpeakerMarquee({ speakers }: Props) {
  // With ~24 speakers at ~80px avg each, total track = ~1920px.
  // Viewport is 260px — duplicates are ~1920px apart, never both visible.
  const doubled = [...speakers, ...speakers]

  // Assign each item a deterministic size, horizontal offset, and animation params
  const items = doubled.map((s, i) => {
    const rand = seededRand(i * 7919 + 31337)
    const size   = Math.round(44 + rand() * 44)        // 44–88px
    const left   = Math.round(rand() * 32)              // 0–32px horizontal scatter
    const gap    = Math.round(8 + rand() * 20)          // 8–28px gap above
    const floatX = (rand() - 0.5) * 14                  // ±7px drift amplitude
    const floatDur = 3 + rand() * 4                      // 3–7s float cycle
    const floatDelay = -(rand() * floatDur)              // staggered start
    return { ...s, size, left, gap, floatX, floatDur, floatDelay }
  })

  return (
    <div
      style={{
        width: '110px',
        height: '260px',
        overflow: 'hidden',
        maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
        flexShrink: 0,
      }}
    >
      <style>{`
        @keyframes smq-scroll {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        .smq-track {
          display: flex;
          flex-direction: column;
          animation: smq-scroll 65s linear infinite;
        }
        .smq-track:hover { animation-play-state: paused; }
        @keyframes smq-float {
          0%, 100% { transform: translateX(var(--fx)); }
          50%       { transform: translateX(calc(var(--fx) * -1)); }
        }
        .smq-img {
          border-radius: 50%;
          object-fit: cover;
          display: block;
          border: 2px solid var(--border);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          animation: smq-float var(--fd) ease-in-out var(--fdelay) infinite;
        }
        .smq-img:hover {
          transform: scale(1.14) !important;
          box-shadow: 0 6px 20px rgba(0,0,0,0.22);
          animation-play-state: paused;
        }
      `}</style>

      <div className="smq-track">
        {items.map((item, i) => (
          <Link
            key={`${item.slug}-${i}`}
            href={`/episodes/${item.slug}`}
            title={item.guest}
            style={{
              textDecoration: 'none',
              flexShrink: 0,
              marginTop: `${item.gap}px`,
              marginLeft: `${item.left}px`,
              display: 'block',
              width: 'fit-content',
            }}
          >
            <Image
              src={item.artworkUrl}
              alt={item.guest}
              width={item.size}
              height={item.size}
              className="smq-img"
              style={{
                width: `${item.size}px`,
                height: `${item.size}px`,
                '--fx': `${item.floatX}px`,
                '--fd': `${item.floatDur.toFixed(1)}s`,
                '--fdelay': `${item.floatDelay.toFixed(1)}s`,
              } as React.CSSProperties}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
