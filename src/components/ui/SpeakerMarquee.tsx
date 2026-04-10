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

// Deterministic pseudo-random (mulberry32)
function makeRand(seed: number) {
  let s = seed | 0
  return () => {
    s = (s + 0x6D2B79F5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const W = 600
const H = 380

function getSizeForIndex(i: number, total: number): number {
  const frac = i / total
  if (frac < 0.28) return 70   // ~8 large
  if (frac < 0.62) return 52   // ~9 medium
  return 36                     // rest small
}

interface ItemLayout {
  x: number; y: number; size: number
  dx1: number; dy1: number; s1: number
  dx2: number; dy2: number; s2: number
  dur: number; delay: number
}

function computeLayout(n: number): ItemLayout[] {
  const posRand  = makeRand(42)
  const animRand = makeRand(77)
  const placed: { x: number; y: number; r: number }[] = []
  const items: ItemLayout[] = []
  const PAD = 5
  // Edge buffer accounts for max animation drift (±10px) so faces never clip
  const EDGE = 28

  for (let i = 0; i < n; i++) {
    const size = getSizeForIndex(i, n)
    const r = size / 2
    // Default: random position (allows overlap as last resort, better than corner stacking)
    let x = EDGE + r + posRand() * (W - size - EDGE * 2)
    let y = EDGE + r + posRand() * (H - size - EDGE * 2)

    for (let attempt = 0; attempt < 800; attempt++) {
      const cx = EDGE + r + posRand() * (W - size - EDGE * 2)
      const cy = EDGE + r + posRand() * (H - size - EDGE * 2)
      let ok = true
      for (const p of placed) {
        const ddx = cx - p.x, ddy = cy - p.y
        if (ddx * ddx + ddy * ddy < (r + p.r + PAD) ** 2) { ok = false; break }
      }
      if (ok) { x = cx; y = cy; break }
    }

    placed.push({ x, y, r })
    items.push({
      x, y, size,
      dx1: (animRand() - 0.5) * 14,
      dy1: (animRand() - 0.5) * 10,
      s1:  0.82 + animRand() * 0.42,   // 0.82–1.24
      dx2: (animRand() - 0.5) * 14,
      dy2: (animRand() - 0.5) * 10,
      s2:  0.82 + animRand() * 0.42,   // 0.82–1.24
      dur:   6 + animRand() * 7,
      delay: animRand() * -12,
    })
  }

  return items
}

export default function SpeakerMarquee({ speakers }: Props) {
  const layout = computeLayout(speakers.length)

  const floatKfs = layout.map((it, i) => `
@keyframes smq-float-${i} {
  0%   { transform: translate(0px, 0px) scale(1); }
  33%  { transform: translate(${it.dx1.toFixed(1)}px, ${it.dy1.toFixed(1)}px) scale(${it.s1.toFixed(3)}); }
  66%  { transform: translate(${it.dx2.toFixed(1)}px, ${it.dy2.toFixed(1)}px) scale(${it.s2.toFixed(3)}); }
  100% { transform: translate(0px, 0px) scale(1); }
}`).join('\n')

  return (
    <div
      style={{
        position: 'relative',
        width: `${W}px`,
        height: `${H}px`,
        flexShrink: 0,
        overflow: 'hidden',
        maskImage:
          'radial-gradient(ellipse 90% 84% at 50% 50%, black 42%, transparent 100%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 90% 84% at 50% 50%, black 42%, transparent 100%)',
      }}
    >
      <style>{`
        ${floatKfs}

        /* Wrapper: handles absolute position + float animation */
        .smq-wrapper {
          position: absolute;
        }
        .smq-wrapper:hover {
          z-index: 10;
        }

        /* Face: the visible circle */
        .smq-face {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(255,255,255,0.28);
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
          text-decoration: none;
          cursor: pointer;
        }
        .smq-face:hover {
          transform: scale(1.2);
          box-shadow: 0 0 0 3px var(--accent-coral), 0 8px 28px rgba(0,0,0,0.28);
          border-color: var(--accent-coral);
        }
        .smq-face:hover .smq-overlay {
          opacity: 1;
        }

        /* Name overlay fades in on hover */
        .smq-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 44%;
          background: linear-gradient(transparent, rgba(0,0,0,0.78));
          border-radius: 0 0 50% 50%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 5px;
          opacity: 0;
          transition: opacity 0.22s ease;
          pointer-events: none;
        }
        .smq-overlay span {
          font-size: 0.5rem;
          font-family: var(--font-dm-mono, var(--font-mono));
          letter-spacing: 0.04em;
          color: #fff;
          text-align: center;
          line-height: 1.2;
          padding: 0 3px;
        }

        .smq-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
        }
      `}</style>

      {layout.map((it, i) => {
        const s = speakers[i]
        const NICK: Record<string, string> = { Alexandre: 'Alex' }
        const firstName = s.guest.replace(/^(Dr\.?|Prof\.?)\s*/i, '').split(' ')[0]
        const shortName = NICK[firstName] ?? firstName

        return (
          <div
            key={s.slug}
            className="smq-wrapper"
            style={{
              width:  `${it.size}px`,
              height: `${it.size}px`,
              left:   `${it.x - it.size / 2}px`,
              top:    `${it.y - it.size / 2}px`,
              animation: `smq-float-${i} ${it.dur.toFixed(1)}s ease-in-out ${it.delay.toFixed(1)}s infinite`,
            }}
          >
            <Link
              href={`/episodes/${s.slug}`}
              title={s.guest}
              className="smq-face"
            >
              <Image
                src={s.artworkUrl}
                alt={s.guest}
                width={it.size * 3}
                height={it.size * 3}
                className="smq-img"
                sizes={`${it.size}px`}
              />
              <div className="smq-overlay">
                <span>{shortName}</span>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
