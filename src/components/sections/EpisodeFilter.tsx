'use client'

import { useState, useMemo } from 'react'
import EpisodeCard from '@/components/ui/EpisodeCard'
import { Episode } from '@/lib/episodes'

interface EpisodeFilterProps {
  episodes: Episode[]
  allThemes: string[]
  allCountries: string[]
}

export default function EpisodeFilter({ episodes, allThemes, allCountries }: EpisodeFilterProps) {
  const [query, setQuery] = useState('')
  const [activeTheme, setActiveTheme] = useState<string | null>(null)
  const [activeCountry, setActiveCountry] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return episodes.filter((ep) => {
      if (activeTheme && !ep.themes.includes(activeTheme)) return false
      if (activeCountry && ep.country !== activeCountry) return false
      if (q) {
        const haystack = [
          ep.title,
          ep.guest,
          ep.guestRole,
          ep.description,
          ep.country,
          ...ep.themes,
          ...ep.tags,
        ]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [episodes, query, activeTheme, activeCountry])

  return (
    <div>
      {/* Search + filters */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}
      >
        {/* Text search */}
        <div style={{ position: 'relative' }}>
          <input
            type="search"
            placeholder="Search by keyword, speaker, topic..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.75rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9375rem',
              color: 'var(--text-primary)',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              transition: 'border-color var(--transition-fast)',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-coral)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          >
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Theme pills */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-dm-mono, monospace)',
              fontSize: '0.625rem',
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            Topic
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {allThemes.map((theme) => {
              const active = activeTheme === theme
              return (
                <button
                  key={theme}
                  onClick={() => setActiveTheme(active ? null : theme)}
                  style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: '100px',
                    border: `1px solid ${active ? 'var(--accent-coral)' : 'var(--border)'}`,
                    background: active ? 'var(--accent-coral)' : 'transparent',
                    color: active ? '#fff' : 'var(--text-secondary)',
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                  }}
                >
                  {theme}
                </button>
              )
            })}
          </div>
        </div>

        {/* Country pills */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-dm-mono, monospace)',
              fontSize: '0.625rem',
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            Country
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {allCountries.map((country) => {
              const active = activeCountry === country
              return (
                <button
                  key={country}
                  onClick={() => setActiveCountry(active ? null : country)}
                  style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: '100px',
                    border: `1px solid ${active ? 'var(--accent-coral)' : 'var(--border)'}`,
                    background: active ? 'var(--accent-coral)' : 'transparent',
                    color: active ? '#fff' : 'var(--text-secondary)',
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                  }}
                >
                  {country}
                </button>
              )
            })}
          </div>
        </div>

        {/* Results count + clear */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.25rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-dm-mono, monospace)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
            }}
          >
            {filtered.length} episode{filtered.length !== 1 ? 's' : ''}
            {(query || activeTheme || activeCountry) ? ' found' : ' total'}
          </p>
          {(query || activeTheme || activeCountry) && (
            <button
              onClick={() => { setQuery(''); setActiveTheme(null); setActiveCountry(null) }}
              style={{
                fontSize: '0.8125rem',
                color: 'var(--accent-coral)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'var(--font-dm-sans, sans-serif)',
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {filtered.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 0',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: '1.5rem',
              color: 'var(--text-secondary)',
              marginBottom: '0.75rem',
            }}
          >
            No episodes match your search.
          </p>
          <button
            onClick={() => { setQuery(''); setActiveTheme(null); setActiveCountry(null) }}
            style={{
              fontSize: '0.875rem',
              color: 'var(--accent-coral)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'var(--font-dm-sans, sans-serif)',
            }}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
