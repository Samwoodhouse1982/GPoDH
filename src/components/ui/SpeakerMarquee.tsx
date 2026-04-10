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

export default function SpeakerMarquee({ speakers }: Props) {
  const N = speakers.length
  const ITEM = 72
  const R = Math.round(ITEM / (2 * Math.tan(Math.PI / N)))
  const W = 420
  const H = 180
  const ringLeft = Math.round((W - ITEM) / 2)
  const ringTop  = Math.round((H - ITEM) / 2)

  const holdFrac = 0.75
  const stepDur  = 4
  const totalDur = N * stepDur
  const easing   = 'cubic-bezier(0.4, 0, 0.2, 1)'

  // Ring stepped animation
  let spinKf = `@keyframes smq-spin {\n`
  for (let i = 0; i < N; i++) {
    const tStart = ((i / N) * 100).toFixed(3)
    const tHold  = (((i + holdFrac) / N) * 100).toFixed(3)
    const angle  = -(360 / N) * i
    spinKf += `  ${tStart}% { transform: rotateY(${angle}deg); animation-timing-function: linear; }\n`
    spinKf += `  ${tHold}%  { transform: rotateY(${angle}deg); animation-timing-function: ${easing}; }\n`
  }
  spinKf += `  100% { transform: rotateY(-360deg); }\n}`

  // Per-item billboard counter-rotation: exactly cancels ring + cell rotation
  // so each image always faces the viewer flat-on (no skew).
  // When ring is at step k and cell is fixed at θ_i, billboard adds (k−i)·360/N.
  // Math: ring(−k·α) + cell(i·α) + billboard((k−i)·α) = 0 for all k, any easing. ✓
  const counterKfs = Array.from({ length: N }, (_, i) => {
    const α = 360 / N
    let kf = `@keyframes smq-counter-${i} {\n`
    for (let k = 0; k < N; k++) {
      const tStart = ((k / N) * 100).toFixed(3)
      const tHold  = (((k + holdFrac) / N) * 100).toFixed(3)
      const angle  = α * (k - i)
      kf += `  ${tStart}% { transform: rotateY(${angle.toFixed(3)}deg); animation-timing-function: linear; }\n`
      kf += `  ${tHold}%  { transform: rotateY(${angle.toFixed(3)}deg); animation-timing-function: ${easing}; }\n`
    }
    kf += `  100% { transform: rotateY(${(360 - α * i).toFixed(3)}deg); }\n}`
    return kf
  }).join('\n')

  return (
    <div
      style={{
        width: `${W}px`,
        height: `${H}px`,
        overflow: 'hidden',
        perspective: '300px',
        perspectiveOrigin: '50% 50%',
        flexShrink: 0,
        maskImage:
          'linear-gradient(to right, transparent, black 25%, black 75%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 25%, black 75%, transparent)',
      }}
    >
      <style>{`
        ${spinKf}
        ${counterKfs}
        .smq-ring {
          width: ${ITEM}px;
          height: ${ITEM}px;
          position: absolute;
          top: ${ringTop}px;
          left: ${ringLeft}px;
          transform-style: preserve-3d;
          animation: smq-spin ${totalDur}s infinite;
        }
        .smq-cell {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          text-decoration: none;
        }
        .smq-billboard {
          position: absolute;
          inset: 0;
        }
        .smq-img {
          border-radius: 50%;
          object-fit: cover;
          object-position: top center;
          width: 100%;
          height: 100%;
          display: block;
          border: 2px solid rgba(255,255,255,0.35);
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
      `}</style>

      <div className="smq-ring">
        {speakers.map((s, i) => (
          <Link
            key={s.slug}
            href={`/episodes/${s.slug}`}
            title={s.guest}
            className="smq-cell"
            style={{
              transform: `rotateY(${(360 / N) * i}deg) translateZ(${R}px)`,
            }}
          >
            <div
              className="smq-billboard"
              style={{ animation: `smq-counter-${i} ${totalDur}s infinite` }}
            >
              <Image
                src={s.artworkUrl}
                alt={s.guest}
                width={ITEM * 4}
                height={ITEM * 4}
                className="smq-img"
                sizes={`${ITEM}px`}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
