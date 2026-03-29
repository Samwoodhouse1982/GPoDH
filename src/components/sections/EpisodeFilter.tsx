'use client'

import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import EpisodeCard from '@/components/ui/EpisodeCard'
import { Episode } from '@/lib/episodes'

interface EpisodeFilterProps {
  episodes: Episode[]
  allThemes: string[]
  allCountries: string[]
}

// ─── Semantic concept map ────────────────────────────────────────────────────
// Maps search terms/concepts to related keywords in the episode corpus.
// When a user's query matches a concept key, its synonyms are added to the
// search — giving "AI" results for "machine learning", "Africa" results for
// individual countries, etc.
const CONCEPT_MAP: [string[], string[]][] = [
  [
    ['ai', 'artificial intelligence', 'machine learning', 'ml', 'algorithm'],
    ['machine learning', 'artificial intelligence', 'ai', 'algorithm', 'diagnostic', 'prediction', 'model', 'data science'],
  ],
  [
    ['equity', 'inequality', 'disparities', 'underserved', 'marginalised', 'marginalized'],
    ['equity', 'underserved', 'disparities', 'marginalised', 'low-income', 'lmic', 'excluded', 'vulnerable'],
  ],
  [
    ['africa', 'sub-saharan', 'subsaharan'],
    ['africa', 'kenya', 'nigeria', 'ghana', 'rwanda', 'ethiopia', 'uganda', 'malawi', 'mozambique', 'sierra leone', 'south africa', 'tanzania', 'drc', 'senegal', 'accra', 'nairobi', 'lagos'],
  ],
  [
    ['asia', 'south asia', 'southeast asia'],
    ['india', 'bangladesh', 'pakistan', 'philippines', 'indonesia', 'myanmar', 'cambodia', 'nepal', 'sri lanka', 'mumbai', 'dhaka'],
  ],
  [
    ['latin america', 'latam', 'south america'],
    ['colombia', 'brazil', 'peru', 'bolivia', 'mexico', 'bogota', 'sao paulo'],
  ],
  [
    ['middle east', 'mena'],
    ['jordan', 'lebanon', 'syria', 'palestine', 'iraq', 'amman'],
  ],
  [
    ['funding', 'grants', 'investment', 'finance', 'donors'],
    ['funding', 'investment', 'grant', 'finance', 'donor', 'usaid', 'wellcome', 'gates', 'philanthropy', 'venture'],
  ],
  [
    ['community health', 'chw', 'community health worker', 'last mile'],
    ['community health worker', 'chw', 'primary care', 'last mile', 'grassroots', 'village', 'frontline'],
  ],
  [
    ['implementation', 'scale', 'scaling', 'deploy', 'rollout'],
    ['implementation', 'deploy', 'scale', 'rollout', 'adoption', 'operationalise', 'pilot'],
  ],
  [
    ['data', 'health data', 'health records', 'ehr'],
    ['health data', 'electronic health record', 'ehr', 'surveillance', 'analytics', 'interoperability', 'data poverty'],
  ],
  [
    ['refugee', 'refugees', 'displaced', 'humanitarian'],
    ['refugee', 'displaced', 'humanitarian', 'forced migration', 'asylum', 'camp', 'crisis'],
  ],
  [
    ['maternal', 'maternal health', 'pregnancy', 'antenatal'],
    ['maternal', 'pregnancy', 'antenatal', 'postnatal', 'birth', 'mother', 'obstetric', 'midwife'],
  ],
  [
    ['regulation', 'regulatory', 'governance'],
    ['regulatory', 'regulation', 'approval', 'compliance', 'policy', 'governance', 'legislation'],
  ],
  [
    ['identity', 'digital identity', 'id'],
    ['digital identity', 'id', 'verification', 'credentials', 'biometric', 'authentication'],
  ],
  [
    ['usaid', 'aid cuts', 'funding cuts'],
    ['usaid', 'aid', 'cuts', 'funding withdrawal', 'us government', 'foreign aid'],
  ],
  [
    ['who', 'world health organization', 'world health organisation'],
    ['who', 'world health', 'global health', 'geneva', 'un', 'multilateral'],
  ],
  [
    ['telehealth', 'telemedicine', 'remote'],
    ['telehealth', 'telemedicine', 'remote care', 'virtual', 'mhealth', 'mobile health'],
  ],
  [
    ['mental health', 'psychology', 'wellbeing'],
    ['mental health', 'psychology', 'wellbeing', 'depression', 'anxiety', 'psychosocial'],
  ],
  [
    ['diagnostics', 'diagnosis', 'testing'],
    ['diagnostic', 'diagnosis', 'test', 'screening', 'point-of-care', 'rapid test'],
  ],
]

function expandQuery(raw: string): { terms: string[]; concepts: string[] } {
  const q = raw.toLowerCase().trim()
  if (!q) return { terms: [], concepts: [] }

  const extraTerms = new Set<string>()
  const matchedConcepts: string[] = []

  for (const [triggers, synonyms] of CONCEPT_MAP) {
    const hit = triggers.some((t) => q.includes(t) || t.includes(q))
    const synHit = !hit && synonyms.some((s) => q.includes(s) || (s.length > 3 && s.startsWith(q)))
    if (hit || synHit) {
      matchedConcepts.push(triggers[0])
      synonyms.forEach((s) => extraTerms.add(s))
    }
  }

  return {
    terms: [q, ...Array.from(extraTerms)],
    concepts: matchedConcepts,
  }
}

// ─── Suggestion types ────────────────────────────────────────────────────────
interface Suggestion {
  type: 'episode' | 'theme' | 'concept'
  label: string
  sublabel?: string
  episode?: Episode
  theme?: string
}

export default function EpisodeFilter({ episodes, allThemes, allCountries }: EpisodeFilterProps) {
  const [query, setQuery] = useState('')
  const [activeTheme, setActiveTheme] = useState<string | null>(null)
  const [activeCountry, setActiveCountry] = useState<string | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIdx, setHighlightedIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // ── Fuse instance (memoised — rebuilt only when episodes change) ─────────
  const fuse = useMemo(
    () =>
      new Fuse(episodes, {
        keys: [
          { name: 'title',       weight: 0.35 },
          { name: 'guest',       weight: 0.28 },
          { name: 'description', weight: 0.18 },
          { name: 'themes',      weight: 0.22 },
          { name: 'topics',      weight: 0.18 },
          { name: 'tags',        weight: 0.12 },
          { name: 'guestRole',   weight: 0.12 },
          { name: 'country',     weight: 0.12 },
        ],
        threshold: 0.38,
        includeScore: true,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [episodes]
  )

  // ── Semantic expansion for current query ─────────────────────────────────
  const { terms: expandedTerms, concepts: matchedConcepts } = useMemo(
    () => expandQuery(query),
    [query]
  )

  // ── Full filtered results (used for the episode grid) ────────────────────
  const filtered = useMemo(() => {
    // Theme/country filters apply regardless
    const base = episodes.filter((ep) => {
      if (activeTheme && !ep.themes.includes(activeTheme)) return false
      if (activeCountry && ep.country !== activeCountry) return false
      return true
    })

    if (!query.trim()) return base

    // Run a Fuse search for each expanded term, collect scored ids
    const scoreMap = new Map<string, number>()
    expandedTerms.forEach((term, i) => {
      const results = fuse.search(term)
      results.forEach(({ item, score }) => {
        const s = 1 - (score ?? 1)
        // Decay bonus for synonym terms so original query terms rank higher
        const weight = i === 0 ? 1 : 0.55
        const existing = scoreMap.get(item.id) ?? 0
        scoreMap.set(item.id, Math.max(existing, s * weight))
      })
    })

    return base
      .filter((ep) => scoreMap.has(ep.id))
      .sort((a, b) => (scoreMap.get(b.id) ?? 0) - (scoreMap.get(a.id) ?? 0))
  }, [episodes, query, expandedTerms, fuse, activeTheme, activeCountry])

  // ── Live suggestions (for dropdown) ──────────────────────────────────────
  const suggestions = useMemo((): Suggestion[] => {
    if (!query.trim() || query.trim().length < 2) return []

    const sugs: Suggestion[] = []

    // Concept suggestions first
    matchedConcepts.forEach((c) => {
      sugs.push({ type: 'concept', label: `Search by concept: ${c}` })
    })

    // Top episode matches
    const topEps = filtered.slice(0, 4)
    topEps.forEach((ep) => {
      sugs.push({
        type: 'episode',
        label: ep.title,
        sublabel: `Ep ${ep.episodeNumber} · ${ep.guest}`,
        episode: ep,
      })
    })

    // Matching themes
    const q = query.toLowerCase()
    allThemes
      .filter((t) => t.toLowerCase().includes(q) && t !== activeTheme)
      .slice(0, 3)
      .forEach((t) => {
        sugs.push({ type: 'theme', label: t, theme: t })
      })

    return sugs.slice(0, 7)
  }, [query, filtered, matchedConcepts, allThemes, activeTheme])

  // ── Close dropdown on outside click ──────────────────────────────────────
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showSuggestions || suggestions.length === 0) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightedIdx((i) => (i + 1) % suggestions.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIdx((i) => (i - 1 + suggestions.length) % suggestions.length)
      } else if (e.key === 'Escape') {
        setShowSuggestions(false)
        setHighlightedIdx(-1)
      } else if (e.key === 'Enter' && highlightedIdx >= 0) {
        e.preventDefault()
        const sug = suggestions[highlightedIdx]
        if (sug.type === 'theme' && sug.theme) {
          setActiveTheme(sug.theme)
          setQuery('')
        } else if (sug.type === 'concept') {
          // keep query, just close
        }
        setShowSuggestions(false)
        setHighlightedIdx(-1)
      }
    },
    [showSuggestions, suggestions, highlightedIdx]
  )

  const hasFilters = query || activeTheme || activeCountry

  return (
    <div>
      {/* ── Search + filters ───────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>

        {/* Smart search input */}
        <div style={{ position: 'relative' }}>
          {/* Search icon */}
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none', zIndex: 1 }}
          >
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          <input
            ref={inputRef}
            type="search"
            placeholder="Search by meaning — try 'AI in Africa' or 'funding'"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowSuggestions(true)
              setHighlightedIdx(-1)
            }}
            onFocus={() => { setShowSuggestions(true); (inputRef.current as HTMLInputElement & { style: CSSStyleDeclaration }).style.borderColor = 'var(--accent-coral)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            style={{
              width: '100%',
              padding: '0.8rem 7rem 0.8rem 2.75rem',
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
          />

          {/* "Smart search" badge */}
          <div
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.25rem 0.6rem',
              background: 'linear-gradient(120deg, var(--accent-coral), var(--accent-amber))',
              borderRadius: '100px',
              pointerEvents: 'none',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
              <path d="M12 2L9.19 9.19 2 12l7.19 2.81L12 22l2.81-7.19L22 12l-7.19-2.81z" />
            </svg>
            <span style={{ fontFamily: 'var(--font-dm-mono, monospace)', fontSize: '0.5625rem', letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase' }}>
              Smart
            </span>
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={dropdownRef}
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                right: 0,
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-elevated)',
                zIndex: 50,
                overflow: 'hidden',
              }}
            >
              {/* Semantic expansion notice */}
              {matchedConcepts.length > 0 && (
                <div style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(90deg, rgba(212,97,74,0.06), rgba(224,156,42,0.04))',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--accent-coral)" aria-hidden="true">
                    <path d="M12 2L9.19 9.19 2 12l7.19 2.81L12 22l2.81-7.19L22 12l-7.19-2.81z" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-dm-mono, monospace)', fontSize: '0.5625rem', letterSpacing: '0.1em', color: 'var(--accent-coral)', textTransform: 'uppercase' }}>
                    Expanding search to include: {matchedConcepts.join(', ')} and related terms
                  </span>
                </div>
              )}

              {suggestions.map((sug, i) => {
                const isHighlighted = i === highlightedIdx
                if (sug.type === 'episode' && sug.episode) {
                  return (
                    <Link
                      key={`ep-${sug.episode.id}`}
                      href={`/episodes/${sug.episode.slug}`}
                      onMouseEnter={() => setHighlightedIdx(i)}
                      onClick={() => setShowSuggestions(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.625rem 1rem',
                        textDecoration: 'none',
                        background: isHighlighted ? 'var(--bg-surface)' : 'transparent',
                        transition: 'background var(--transition-fast)',
                        borderBottom: i < suggestions.length - 1 ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                      </svg>
                      <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                          {sug.label}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-dm-mono, monospace)' }}>
                          {sug.sublabel}
                        </p>
                      </div>
                    </Link>
                  )
                }
                if (sug.type === 'theme' && sug.theme) {
                  return (
                    <button
                      key={`theme-${sug.theme}`}
                      onMouseEnter={() => setHighlightedIdx(i)}
                      onClick={() => {
                        setActiveTheme(sug.theme!)
                        setQuery('')
                        setShowSuggestions(false)
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.625rem 1rem',
                        width: '100%',
                        textAlign: 'left',
                        background: isHighlighted ? 'var(--bg-surface)' : 'transparent',
                        border: 'none',
                        borderBottom: i < suggestions.length - 1 ? '1px solid var(--border)' : 'none',
                        cursor: 'pointer',
                        transition: 'background var(--transition-fast)',
                        fontFamily: 'var(--font-dm-sans, sans-serif)',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-coral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
                      </svg>
                      <span style={{ fontSize: '0.875rem', color: 'var(--accent-coral)' }}>
                        Filter by topic: <strong>{sug.label}</strong>
                      </span>
                    </button>
                  )
                }
                if (sug.type === 'concept') {
                  return (
                    <div
                      key={`concept-${i}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.5rem 1rem',
                        borderBottom: i < suggestions.length - 1 ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--accent-amber)" aria-hidden="true">
                        <path d="M12 2L9.19 9.19 2 12l7.19 2.81L12 22l2.81-7.19L22 12l-7.19-2.81z" />
                      </svg>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-dm-mono, monospace)', fontStyle: 'italic' }}>
                        {sug.label}
                      </span>
                    </div>
                  )
                }
                return null
              })}
            </div>
          )}
        </div>

        {/* Theme pills */}
        <div>
          <p style={{ fontFamily: 'var(--font-dm-mono, monospace)', fontSize: '0.625rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
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
          <p style={{ fontFamily: 'var(--font-dm-mono, monospace)', fontSize: '0.625rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.25rem' }}>
          <p style={{ fontFamily: 'var(--font-dm-mono, monospace)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {filtered.length} episode{filtered.length !== 1 ? 's' : ''}
            {hasFilters ? ' found' : ' total'}
          </p>
          {hasFilters && (
            <button
              onClick={() => { setQuery(''); setActiveTheme(null); setActiveCountry(null) }}
              style={{ fontSize: '0.8125rem', color: 'var(--accent-coral)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-dm-sans, sans-serif)' }}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* ── Episode grid ────────────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
          {filtered.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p style={{ fontFamily: 'var(--font-cormorant, serif)', fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            No episodes match your search.
          </p>
          <button
            onClick={() => { setQuery(''); setActiveTheme(null); setActiveCountry(null) }}
            style={{ fontSize: '0.875rem', color: 'var(--accent-coral)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-dm-sans, sans-serif)' }}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
