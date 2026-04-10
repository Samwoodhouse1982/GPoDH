'use client'

import Image from 'next/image'
import Link from 'next/link'

interface Speaker {
  slug: string
  guest: string
  artworkUrl: string
}

interface Props {
  speakers: Speaker[]
  reverse?: boolean
}

export default function SpeakerMarquee({ speakers, reverse = false }: Props) {
  const doubled = [...speakers, ...speakers]

  return (
    <div
      style={{
        height: '220px',
        overflow: 'hidden',
        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
      }}
    >
      <style>{`
        @keyframes speaker-scroll-up {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes speaker-scroll-down {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }
        .speaker-scroll-track {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: max-content;
        }
        .speaker-scroll-track:hover {
          animation-play-state: paused;
        }
        .speaker-avatar-btn {
          transition: transform 0.2s ease;
          display: block;
        }
        .speaker-avatar-btn:hover {
          transform: scale(1.1);
        }
      `}</style>

      <div
        className="speaker-scroll-track"
        style={{ animation: `${reverse ? 'speaker-scroll-down' : 'speaker-scroll-up'} 20s linear infinite` }}
      >
        {doubled.map((s, i) => (
          <Link
            key={`${s.slug}-${i}`}
            href={`/episodes/${s.slug}`}
            title={s.guest}
            className="speaker-avatar-btn"
            style={{ textDecoration: 'none', flexShrink: 0 }}
          >
            <Image
              src={s.artworkUrl}
              alt={s.guest}
              width={64}
              height={64}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                objectFit: 'cover',
                display: 'block',
                border: '2px solid var(--border)',
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
