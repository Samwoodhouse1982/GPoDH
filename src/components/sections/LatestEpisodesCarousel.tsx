import Link from 'next/link'
import Image from 'next/image'
import { Episode } from '@/lib/episodes'
import CardCarousel from '@/components/ui/CardCarousel'

interface LatestEpisodesCarouselProps {
  episodes: Episode[]
}

const CARD_WIDTH = 260

export default function LatestEpisodesCarousel({ episodes }: LatestEpisodesCarouselProps) {
  return (
    <CardCarousel
      cardWidth={CARD_WIDTH}
      browseHref="/episodes"
      browseLabel="Browse all episodes"
      browseSubtitle="See the full series"
    >
      {episodes.map((episode) => (
        <Link
          key={episode.id}
          href={`/episodes/${episode.slug}`}
          className="carousel-card"
          style={{
            flexShrink: 0,
            width: `${CARD_WIDTH}px`,
            height: '220px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderTop: '3px solid var(--accent-coral)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          {/* Thumbnail + episode badge row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {episode.artworkUrl ? (
              <Image
                src={episode.artworkUrl}
                alt={episode.guest}
                width={40}
                height={40}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
              />
            ) : (
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                background: 'var(--accent-coral)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#fff',
              }}>
                {episode.guest.charAt(0)}
              </div>
            )}
            <span
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.625rem',
                fontVariant: 'small-caps',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--accent-coral)',
                lineHeight: 1,
              }}
            >
              {episode.episodeNumber != null ? `Ep ${episode.episodeNumber}` : 'Episode'}
            </span>
          </div>

          {/* Title */}
          <span
            style={{
              fontFamily: 'Cormorant, serif',
              fontSize: '1.125rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {episode.title}
          </span>

          {/* Guest name */}
          <span
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {episode.guest}
          </span>

          {/* Date */}
          <span
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.625rem',
              color: 'var(--text-muted)',
              lineHeight: 1,
            }}
          >
            {episode.date}
          </span>

          {/* Listen CTA */}
          <span
            style={{
              marginTop: 'auto',
              paddingTop: '8px',
              fontSize: '0.8125rem',
              color: 'var(--accent-coral)',
              fontWeight: 500,
            }}
          >
            Listen →
          </span>
        </Link>
      ))}
    </CardCarousel>
  )
}
