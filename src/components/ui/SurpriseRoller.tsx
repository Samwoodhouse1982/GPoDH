'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  /** Titles to flicker through, slot-machine style, while "choosing". */
  labels: string[]
  /** Small caption under the die, e.g. "Picking an episode…". */
  caption?: string
}

/**
 * The "Surprise me" rolling animation: a big 3D die tumbles while the title
 * line flickers through random options, as if the site is rolling to pick one.
 * Shown for a brief beat before the chosen episode/video is revealed. Honours
 * prefers-reduced-motion (no spin, no flicker).
 */
export default function SurpriseRoller({ labels, caption = 'Rolling the dice…' }: Props) {
  const [label, setLabel] = useState(labels[0] ?? '')
  const reduceRef = useRef(false)

  useEffect(() => {
    reduceRef.current =
      typeof window !== 'undefined' &&
      !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduceRef.current || labels.length < 2) return
    const id = setInterval(() => {
      setLabel(labels[Math.floor(Math.random() * labels.length)])
    }, 85)
    return () => clearInterval(id)
  }, [labels])

  return (
    <div className="sr-stage">
      <style>{`
        .sr-stage {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 1.4rem; padding: 3.75rem 2rem; text-align: center; min-height: 200px;
        }
        .sr-scene { perspective: 340px; width: 64px; height: 64px; }
        .sr-cube {
          position: relative; width: 64px; height: 64px;
          transform-style: preserve-3d;
          animation: sr-tumble 0.72s linear infinite;
          /* No filter/opacity/clip-path here: those collapse a preserve-3d
             context, flattening the cube into a 2D panel that just flaps. */
        }
        .sr-face {
          position: absolute; width: 64px; height: 64px; box-sizing: border-box;
          background: #fff; border: 1.5px solid rgba(0,0,0,0.16); border-radius: 11px;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.06);
        }
        .sr-dot {
          position: absolute; width: 11px; height: 11px; border-radius: 50%;
          background: var(--accent-coral, #D4614A); transform: translate(-50%, -50%);
        }
        .sr-f1 { transform: translateZ(32px); }
        .sr-f2 { transform: rotateY(180deg) translateZ(32px); }
        .sr-f3 { transform: rotateY(90deg)  translateZ(32px); }
        .sr-f4 { transform: rotateY(-90deg) translateZ(32px); }
        .sr-f5 { transform: rotateX(90deg)  translateZ(32px); }
        .sr-f6 { transform: rotateX(-90deg) translateZ(32px); }
        /* End-over-end tumble: X flips twice, Y once, per loop — seamless
           because both end on a multiple of 360deg (a cube face repeats). */
        @keyframes sr-tumble {
          from { transform: rotateX(0deg)   rotateY(0deg); }
          to   { transform: rotateX(720deg) rotateY(360deg); }
        }
        .sr-caption {
          margin: 0;
          font-family: var(--font-dm-mono, monospace); font-size: 0.625rem;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent-coral);
        }
        .sr-label {
          margin: 0; min-height: 1.4em; max-width: 28ch;
          font-family: var(--font-cormorant, serif); font-size: 1.1rem; line-height: 1.3;
          color: var(--text-secondary);
          display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;
        }
        @media (prefers-reduced-motion: reduce) {
          .sr-cube { animation: none; transform: rotateX(-20deg) rotateY(22deg); }
        }
      `}</style>

      <div className="sr-scene">
        <div className="sr-cube">
          {/* 1 */}
          <span className="sr-face sr-f1">
            <span className="sr-dot" style={{ left: '50%', top: '50%' }} />
          </span>
          {/* 6 */}
          <span className="sr-face sr-f2">
            <span className="sr-dot" style={{ left: '30%', top: '26%' }} />
            <span className="sr-dot" style={{ left: '70%', top: '26%' }} />
            <span className="sr-dot" style={{ left: '30%', top: '50%' }} />
            <span className="sr-dot" style={{ left: '70%', top: '50%' }} />
            <span className="sr-dot" style={{ left: '30%', top: '74%' }} />
            <span className="sr-dot" style={{ left: '70%', top: '74%' }} />
          </span>
          {/* 3 */}
          <span className="sr-face sr-f3">
            <span className="sr-dot" style={{ left: '28%', top: '28%' }} />
            <span className="sr-dot" style={{ left: '50%', top: '50%' }} />
            <span className="sr-dot" style={{ left: '72%', top: '72%' }} />
          </span>
          {/* 4 */}
          <span className="sr-face sr-f4">
            <span className="sr-dot" style={{ left: '30%', top: '30%' }} />
            <span className="sr-dot" style={{ left: '70%', top: '30%' }} />
            <span className="sr-dot" style={{ left: '30%', top: '70%' }} />
            <span className="sr-dot" style={{ left: '70%', top: '70%' }} />
          </span>
          {/* 5 */}
          <span className="sr-face sr-f5">
            <span className="sr-dot" style={{ left: '28%', top: '28%' }} />
            <span className="sr-dot" style={{ left: '72%', top: '28%' }} />
            <span className="sr-dot" style={{ left: '50%', top: '50%' }} />
            <span className="sr-dot" style={{ left: '28%', top: '72%' }} />
            <span className="sr-dot" style={{ left: '72%', top: '72%' }} />
          </span>
          {/* 2 */}
          <span className="sr-face sr-f6">
            <span className="sr-dot" style={{ left: '30%', top: '30%' }} />
            <span className="sr-dot" style={{ left: '70%', top: '70%' }} />
          </span>
        </div>
      </div>

      <p className="sr-caption">{caption}</p>
      <p className="sr-label">{label || ' '}</p>
    </div>
  )
}
