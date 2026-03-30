'use client'
import { useState, useMemo } from 'react'
import { episodes as allEpisodes } from '@/lib/episodes'
import type { Episode } from '@/lib/episodes'
import EpisodeCard from '@/components/ui/EpisodeCard'

export default function RelatedEpisodes({ episode }: { episode: Episode }) {
  const [seed, setSeed] = useState(0)

  const pool = useMemo(() => {
    const themed = allEpisodes.filter(
      (e) => e.id !== episode.id && e.themes.some((t) => episode.themes.includes(t))
    )
    return themed.length >= 2
      ? themed
      : allEpisodes.filter((e) => e.id !== episode.id)
  }, [episode])

  const shown = useMemo(() => {
    if (pool.length <= 2) return pool
    const start = (seed * 2) % pool.length
    return [pool[start % pool.length], pool[(start + 1) % pool.length]]
  }, [pool, seed])

  if (pool.length === 0) return null

  return (
    <section style={{ padding: '5rem var(--gutter)' }}>
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-dm-mono, var(--font-mono))',
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              color: 'var(--accent-coral)',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            You might also like
          </p>
          {pool.length > 2 && (
            <button
              onClick={() => setSeed((s) => s + 1)}
              className="surprise-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.35rem 0.875rem',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                background: 'transparent',
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.625rem',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              ↻ Surprise me
            </button>
          )}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {shown.map((ep) => (
            <EpisodeCard key={ep.id} episode={ep} />
          ))}
        </div>
      </div>
      <style>{`
        .surprise-btn:hover {
          border-color: var(--accent-coral) !important;
          color: var(--accent-coral) !important;
        }
      `}</style>
    </section>
  )
}
