'use client'

import orgLogos from '@/data/org-logos.json'

interface Org {
  name: string
  file: string       // local filename under /public/logos (preferred source)
  remote: string     // external URL — fallback until logos are self-hosted
  h: number          // display height in px — tune per logo for visual balance
  invert?: boolean   // true for white-on-transparent logos (flips to dark)
  multiply?: boolean // true for logos with white backgrounds (blends them away)
}

// Logos are served from /public/logos when present (run scripts/fetch-org-logos.mjs
// to download them), and fall back to the remote URL on error so the marquee keeps
// working before the files are self-hosted. See src/data/org-logos.json.
const ORGS = orgLogos as Org[]

export default function OrgMarquee() {
  const items = [...ORGS, ...ORGS]

  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
        padding: '1.25rem 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Fade edges */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to right, var(--bg-secondary) 0%, transparent 6%, transparent 94%, var(--bg-secondary) 100%)',
      }} />

      <div className="org-marquee-track">
        {items.map((org, i) => (
          <div
            key={i}
            className="org-marquee-item"
            title={org.name}
            style={org.multiply ? { mixBlendMode: 'multiply' } : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/logos/${org.file}`}
              alt={org.name}
              height={org.h}
              loading="lazy"
              // Prefer the self-hosted file; if it's missing, fall back to the
              // remote URL once; if that also fails, hide the tile so a broken
              // image can't sit in the marquee.
              onError={(e) => {
                const img = e.currentTarget
                if (org.remote && img.src !== org.remote && !img.dataset.fallback) {
                  img.dataset.fallback = '1'
                  img.src = org.remote
                  return
                }
                const item = img.closest('.org-marquee-item')
                if (item instanceof HTMLElement) item.style.display = 'none'
              }}
              style={{
                height: `${org.h}px`,
                width: 'auto',
                display: 'block',
                filter: org.invert ? 'invert(1)' : undefined,
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        .org-marquee-track {
          display: flex;
          align-items: center;
          gap: 0;
          width: max-content;
          animation: org-scroll 60s linear infinite;
        }
        .org-marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes org-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .org-marquee-item {
          display: flex;
          align-items: center;
          padding: 0 2.5rem;
          opacity: 0.45;
          filter: grayscale(100%);
          transition: opacity 0.25s ease, filter 0.25s ease;
        }
        .org-marquee-item:hover {
          opacity: 1;
          filter: grayscale(0%);
        }
      `}</style>
    </div>
  )
}
