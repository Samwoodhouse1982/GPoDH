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
            {/* Breadcrumb */}
            <p style={{ marginBottom: '1.5rem' }}>
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
            </p>

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
                style={{ fontSize: '0.8125rem', color: 'var(--accent-coral)', textDecoration: 'none' }}
              >
                Apple Podcasts ↗
              </a>
              <a
                href={PLATFORMS.spotify}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.8125rem', color: 'var(--accent-coral)', textDecoration: 'none' }}
              >
                Spotify ↗
              </a>
              <a
                href={PLATFORMS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.8125rem', color: 'var(--accent-coral)', textDecoration: 'none' }}
              >
                YouTube ↗
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
                {hasExternalUrl && (
                  <a
                    href={episode.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.875rem', color: 'var(--accent-coral)', textDecoration: 'none', fontFamily: 'var(--font-dm-sans, sans-serif)' }}
                  >
                    Episode page ↗
                  </a>
                )}
                <a href={PLATFORMS.apple} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: 'var(--accent-coral)', textDecoration: 'none', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>Apple Podcasts ↗</a>
                <a href={PLATFORMS.spotify} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: 'var(--accent-coral)', textDecoration: 'none', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>Spotify ↗</a>
                <a href={PLATFORMS.youtube} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: 'var(--accent-coral)', textDecoration: 'none', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>YouTube ↗</a>
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

              {hasExternalUrl && (
                <a
                  href={episode.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 1.25rem',
                    border: '1px solid var(--accent-coral)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--accent-coral)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                  }}
                >
                  Listen to the episode ↗
                </a>
              )}
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
      `}</style>
    </>
  )
}
