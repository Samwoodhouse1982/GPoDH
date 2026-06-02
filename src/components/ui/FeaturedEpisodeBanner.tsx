import Link from 'next/link'
import Image from 'next/image'
import { Episode } from '@/lib/episodes'

interface FeaturedEpisodeBannerProps {
  episode: Episode
}

export default function FeaturedEpisodeBanner({ episode }: FeaturedEpisodeBannerProps) {
  return (
    <section
      style={{
        padding: '2.5rem var(--gutter)',
        background: 'radial-gradient(ellipse at 100% 50%, rgba(212,97,74,0.08) 0%, transparent 60%), var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        <Link
          href={`/episodes/${episode.slug}`}
          className="featured-banner"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(1.25rem, 3vw, 2.5rem)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderLeft: '4px solid var(--accent-coral)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            textDecoration: 'none',
            color: 'inherit',
            boxShadow: 'var(--shadow-card)',
            transition: 'var(--transition-slow)',
            flexWrap: 'wrap',
          }}
        >
          {/* Artwork */}
          <div
            style={{
              position: 'relative',
              width: 'clamp(96px, 18vw, 132px)',
              aspectRatio: '1',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: 'var(--bg-surface)',
              flexShrink: 0,
            }}
          >
            {episode.artworkUrl && (
              <Image
                src={episode.artworkUrl}
                alt=""
                fill
                sizes="132px"
                style={{ objectFit: 'cover' }}
              />
            )}
          </div>

          {/* Text */}
          <div style={{ flex: '1 1 280px', minWidth: 0 }}>
            <p
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.6875rem',
                letterSpacing: '0.15em',
                color: 'var(--accent-coral)',
                textTransform: 'uppercase',
                marginBottom: '0.625rem',
              }}
            >
              Latest Episode &middot; #{episode.episodeNumber} &middot; {episode.date}
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: 'clamp(1.375rem, 2.6vw, 1.875rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
              }}
            >
              {episode.title}
            </h2>
            <p
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}
            >
              {episode.guest} &middot; {episode.guestRole}
            </p>
          </div>

          {/* CTA */}
          <span
            className="featured-banner-cta"
            style={{
              flexShrink: 0,
              padding: '0.75rem 1.5rem',
              background: 'var(--accent-coral)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9375rem',
              fontWeight: 500,
              transition: 'background var(--transition-fast)',
              whiteSpace: 'nowrap',
            }}
          >
            Listen now &#8594;
          </span>
        </Link>
      </div>

      <style>{`
        .featured-banner:hover {
          transform: translateY(-3px);
          border-color: var(--border-accent) !important;
          box-shadow: var(--shadow-elevated) !important;
        }
        .featured-banner:hover .featured-banner-cta {
          background: var(--accent-coral-dim) !important;
        }
      `}</style>
    </section>
  )
}
