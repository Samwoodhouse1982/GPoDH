import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import EpisodeCard from '@/components/ui/EpisodeCard'
import SandiQBridge from '@/components/ui/SandiQBridge'
import EmailSignup from '@/components/sections/EmailSignup'
import TranscriptToggle from '@/components/ui/TranscriptToggle'
import { episodes } from '@/lib/episodes'
import { PLATFORMS } from '@/lib/constants'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return episodes.map((ep) => ({ slug: ep.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const episode = episodes.find((e) => e.slug === slug)
  if (!episode) return {}
  return {
    title: `${episode.title} — GPODH`,
    description: episode.description,
  }
}

export default async function EpisodePage({ params }: Props) {
  const { slug } = await params
  const episode = episodes.find((e) => e.slug === slug)
  if (!episode) notFound()

  const related = episodes
    .filter(
      (e) =>
        e.id !== episode.id &&
        e.themes.some((t) => episode.themes.includes(t))
    )
    .slice(0, 2)

  const hasExternalUrl = episode.url !== 'https://gpodh.org'

  const currentIndex = episodes.findIndex((e) => e.id === episode.id)
  const prevEpisode = currentIndex < episodes.length - 1 ? episodes[currentIndex + 1] : null
  const nextEpisode = currentIndex > 0 ? episodes[currentIndex - 1] : null

  return (
    <>
      {/* ——— Hero ——— */}
      <section
        style={{
          padding: '7rem var(--gutter) 4rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Left */}
          <div>
            {/* Breadcrumb + prev/next nav */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              <Link
                href="/episodes"
                style={{
                  fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                &#8592; All episodes
              </Link>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {prevEpisode ? (
                  <Link
                    href={`/episodes/${prevEpisode.slug}`}
                    title={`Ep ${prevEpisode.episodeNumber}: ${prevEpisode.title}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.35rem 0.75rem',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.08em',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                    }}
                    className="ep-nav-link"
                  >
                    &#8592; Ep {prevEpisode.episodeNumber}
                  </Link>
                ) : (
                  <span
                    style={{
                      display: 'inline-flex',
                      padding: '0.35rem 0.75rem',
                      border: '1px solid transparent',
                      fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                      fontSize: '0.6875rem',
                      color: 'transparent',
                      userSelect: 'none',
                    }}
                    aria-hidden="true"
                  >
                    &#8592; Ep 0
                  </span>
                )}

                {nextEpisode ? (
                  <Link
                    href={`/episodes/${nextEpisode.slug}`}
                    title={`Ep ${nextEpisode.episodeNumber}: ${nextEpisode.title}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.35rem 0.75rem',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.08em',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                    }}
                    className="ep-nav-link"
                  >
                    Ep {nextEpisode.episodeNumber} &#8594;
                  </Link>
                ) : (
                  <span
                    style={{
                      display: 'inline-flex',
                      padding: '0.35rem 0.75rem',
                      border: '1px solid transparent',
                      fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                      fontSize: '0.6875rem',
                      color: 'transparent',
                      userSelect: 'none',
                    }}
                    aria-hidden="true"
                  >
                    Ep 0 &#8594;
                  </span>
                )}
              </div>
            </div>

            {/* Eyebrow */}
            <p
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.6875rem',
                letterSpacing: '0.15em',
                color: 'var(--accent-coral)',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              {episode.episodeNumber ? `Episode ${episode.episodeNumber}` : 'Episode'}
              {' · '}{episode.country}
            </p>

            {/* Title */}
            <h1
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
                marginBottom: '1.25rem',
              }}
            >
              {episode.title}
            </h1>

            {/* Guest */}
            <p
              style={{
                fontSize: '1.0625rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.5rem',
              }}
            >
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                {episode.guest}
              </strong>
              {' · '}
              {episode.guestRole}
            </p>

            {/* Meta */}
            <p
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.6875rem',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '2rem',
              }}
            >
              {episode.date}
              {episode.duration && ` · ${episode.duration}`}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              {hasExternalUrl && (
                <a
                  href={episode.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 1.5rem',
                    background: 'var(--accent-coral)',
                    color: '#fff',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                  Listen now
                </a>
              )}
              <a
                href={PLATFORMS.apple}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--accent-coral)', textDecoration: 'none' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4zm0 14a6 6 0 0 0 6-6h2a8 8 0 0 1-7 7.93V20h3v2H8v-2h3v-3.07A8 8 0 0 1 4 10h2a6 6 0 0 0 6 6z"/>
                </svg>
                Apple Podcasts
              </a>
              <a
                href={PLATFORMS.spotify}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--accent-coral)', textDecoration: 'none' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Spotify
              </a>
              <a
                href={PLATFORMS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--accent-coral)', textDecoration: 'none' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube
              </a>
            </div>
          </div>

          {/* Right: artwork */}
          <div
            style={{
              aspectRatio: '1',
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '420px',
              width: '100%',
              margin: '0 auto',
              border: '1px solid var(--border)',
            }}
          >
            {episode.artworkUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={episode.artworkUrl}
                alt={episode.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                    fontSize: '1rem',
                    letterSpacing: '0.15em',
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: '0.75rem',
                  }}
                >
                  GPODH
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-cormorant, var(--font-display))',
                    fontSize: '1.25rem',
                    fontStyle: 'italic',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.4,
                    display: 'block',
                  }}
                >
                  {episode.guest}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ——— Embed player ——— */}
      <section
        style={{
          padding: '3rem var(--gutter) 0',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <p
            style={{
              fontFamily: 'var(--font-dm-mono, var(--font-mono))',
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              color: 'var(--accent-coral)',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            Listen
          </p>

          {episode.transistorEpisodeId ? (
            <iframe
              width="100%"
              height="180"
              frameBorder="no"
              scrolling="no"
              seamless
              src={`https://share.transistor.fm/e/${episode.transistorEpisodeId}`}
              title={`Listen to ${episode.title}`}
              style={{ borderRadius: 'var(--radius-md)', display: 'block' }}
            />
          ) : episode.spotifyEpisodeId ? (
            <iframe
              src={`https://open.spotify.com/embed/episode/${episode.spotifyEpisodeId}?utm_source=generator`}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: 'var(--radius-md)', display: 'block' }}
              title={`Listen to ${episode.title} on Spotify`}
            />
          ) : episode.youtubeVideoId ? (
            <div
              style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${episode.youtubeVideoId}`}
                title={`Watch ${episode.title} on YouTube`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </div>
          ) : (
            /* Placeholder — add transistorEpisodeId to this episode in episodes.ts */
            <div
              style={{
                padding: '2rem',
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px dashed var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                  fontSize: '0.9375rem',
                  color: 'var(--text-muted)',
                  margin: 0,
                }}
              >
                Listen on your preferred platform
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <a href={PLATFORMS.apple} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--accent-coral)', textDecoration: 'none', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4zm0 14a6 6 0 0 0 6-6h2a8 8 0 0 1-7 7.93V20h3v2H8v-2h3v-3.07A8 8 0 0 1 4 10h2a6 6 0 0 0 6 6z"/></svg>
                  Apple Podcasts
                </a>
                <a href={PLATFORMS.spotify} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--accent-coral)', textDecoration: 'none', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                  Spotify
                </a>
                <a href={PLATFORMS.youtube} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--accent-coral)', textDecoration: 'none', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  YouTube
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ——— Overview ——— */}
      <section style={{ padding: '5rem var(--gutter)' }}>
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: '4rem',
          }}
        >
          {/* Description */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                color: 'var(--accent-coral)',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              About this episode
            </p>
            <p
              style={{
                fontSize: '1.0625rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
              }}
            >
              {episode.description}
            </p>

            {/* Theme tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {episode.themes.map((theme) => (
                <Link
                  key={theme}
                  href={`/episodes?theme=${encodeURIComponent(theme)}`}
                  style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: '100px',
                    border: '1px solid var(--border)',
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                    transition: 'all var(--transition-fast)',
                  }}
                  className="theme-tag"
                >
                  {theme}
                </Link>
              ))}
            </div>
          </div>

          {/* Topics */}
          {episode.topics && episode.topics.length > 0 && (
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  color: 'var(--accent-coral)',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                What we cover
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {episode.topics.map((topic, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '0.875rem',
                      alignItems: 'flex-start',
                      fontSize: '0.9375rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--accent-coral)',
                        fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                        fontSize: '0.625rem',
                        marginTop: '0.35rem',
                        flexShrink: 0,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ——— Pull quote ——— */}
      {episode.pullQuote && (
        <section
          style={{
            background: 'var(--accent-coral)',
            padding: '5rem var(--gutter)',
          }}
        >
          <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto', textAlign: 'center' }}>
            <blockquote
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 600,
                fontStyle: 'italic',
                color: '#ffffff',
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              &ldquo;{episode.pullQuote}&rdquo;
            </blockquote>
            <p
              style={{
                marginTop: '1.5rem',
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.65)',
                textTransform: 'uppercase',
              }}
            >
              {episode.guest}
            </p>
          </div>
        </section>
      )}

      {/* ——— Timestamps ——— */}
      {episode.timestamps && episode.timestamps.length > 0 && (
        <section
          style={{
            padding: '5rem var(--gutter)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
            <p
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                color: 'var(--accent-coral)',
                textTransform: 'uppercase',
                marginBottom: '2rem',
              }}
            >
              Chapters
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                gap: '0',
              }}
            >
              {episode.timestamps.map((ts, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'baseline',
                    padding: '0.875rem 0',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                      fontSize: '0.75rem',
                      color: 'var(--accent-coral)',
                      flexShrink: 0,
                      minWidth: '3.5rem',
                    }}
                  >
                    {ts.time}
                  </span>
                  <span
                    style={{
                      fontSize: '0.9375rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                    }}
                  >
                    {ts.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ——— Transcript ——— */}
      <section
        style={{
          padding: '5rem var(--gutter)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <p
            style={{
              fontFamily: 'var(--font-dm-mono, var(--font-mono))',
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              color: 'var(--accent-coral)',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            Transcript
          </p>

          {episode.transcript ? (
            <TranscriptToggle transcript={episode.transcript} guest={episode.guest} />
          ) : (
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--text-muted)',
                fontStyle: 'italic',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
              }}
            >
              Transcript coming soon.
            </p>
          )}
        </div>
      </section>

      {/* ——— About the guest ——— */}
      {episode.bio && (
        <section style={{ padding: '5rem var(--gutter)' }}>
          <div
            style={{
              maxWidth: 'var(--max-width)',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
              gap: '4rem',
              alignItems: 'start',
            }}
          >
            {/* Portrait placeholder */}
            <div
              style={{
                aspectRatio: '4/5',
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '360px',
                border: '1px solid var(--border)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-cormorant, var(--font-display))',
                  fontSize: '3rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                }}
              >
                {episode.guest.split(' ').map((n) => n[0]).join('')}
              </span>
            </div>

            {/* Bio */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  color: 'var(--accent-coral)',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                About the guest
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant, var(--font-display))',
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '1.25rem',
                  lineHeight: 1.2,
                }}
              >
                {episode.guest}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                }}
              >
                {episode.guestRole}
              </p>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  marginBottom: '2rem',
                }}
              >
                {episode.bio}
              </p>

            </div>
          </div>
        </section>
      )}

      {/* ——— SandiQ bridge ——— */}
      <section
        style={{
          background: 'var(--bg-secondary)',
          padding: '5rem var(--gutter)',
          borderTop: '2px solid var(--accent-coral)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                color: 'var(--accent-coral)',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Working in digital health?
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
                marginBottom: '1.25rem',
              }}
            >
              Heard something relevant to your work?
            </h2>
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                maxWidth: '44ch',
              }}
            >
              Shubs consults through SandiQ Global on clinical leadership, evidence strategy, and digital health market access. If this conversation sparked something, it is worth a conversation.
            </p>
          </div>
          <div>
            <SandiQBridge variant="card" />
          </div>
        </div>
      </section>

      {/* ——— Related episodes ——— */}
      {related.length > 0 && (
        <section style={{ padding: '5rem var(--gutter)' }}>
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
            <p
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                color: 'var(--accent-coral)',
                textTransform: 'uppercase',
                marginBottom: '0.625rem',
              }}
            >
              You might also like
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                gap: '1.5rem',
                marginTop: '2rem',
              }}
            >
              {related.map((ep) => (
                <EpisodeCard key={ep.id} episode={ep} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ——— Email signup ——— */}
      <EmailSignup />

      <style>{`
        .theme-tag:hover {
          border-color: var(--accent-coral) !important;
          color: var(--accent-coral) !important;
        }
        .ep-nav-link:hover {
          border-color: var(--accent-coral) !important;
          color: var(--accent-coral) !important;
        }
      `}</style>
    </>
  )
}
