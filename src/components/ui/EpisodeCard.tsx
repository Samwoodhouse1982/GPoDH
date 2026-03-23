import Link from 'next/link'
import { Episode } from '@/lib/episodes'

interface EpisodeCardProps {
  episode: Episode
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className="episode-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        transition: 'var(--transition-slow)',
        boxShadow: 'var(--shadow-card)',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {/* Artwork */}
      <div
        style={{
          aspectRatio: '1',
          background: 'var(--bg-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {episode.artworkUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={episode.artworkUrl}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span
            style={{
              fontFamily: 'var(--font-dm-mono, var(--font-mono))',
              fontSize: '1rem',
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              fontWeight: 400,
            }}
          >
            GPODH
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', flex: 1 }}>
        {/* Date */}
        <p
          style={{
            fontFamily: 'var(--font-dm-mono, var(--font-mono))',
            fontSize: '0.6875rem',
            letterSpacing: '0.1em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
          }}
        >
          {episode.date}
        </p>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-cormorant, var(--font-display))',
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.3,
            color: 'var(--text-primary)',
          }}
        >
          {episode.title}
        </h3>

        {/* Guest */}
        <p
          style={{
            fontSize: '0.8125rem',
            color: 'var(--text-secondary)',
          }}
        >
          {episode.guest} &middot; {episode.guestRole}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flex: 1,
          }}
        >
          {episode.description}
        </p>

        {/* CTA */}
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--accent-coral)',
            fontWeight: 500,
            marginTop: '0.25rem',
          }}
        >
          &#8594; Listen
        </p>
      </div>

      <style>{`
        .episode-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-accent) !important;
          box-shadow: var(--shadow-elevated) !important;
        }
      `}</style>
    </Link>
  )
}
