'use client'

import { useState } from 'react'
import { withUtm } from '@/lib/utm'

interface Props {
  transistorUrl?: string
  spotifyEpisodeId?: string
  youtubeVideoId?: string
  title: string
  applePodcastsUrl: string
  spotifyShowUrl: string
  youtubeShowUrl: string
}

type Channel = 'transistor' | 'spotify' | 'youtube'

const CHANNEL_LABELS: Record<Channel, string> = {
  transistor: 'Web Player',
  spotify: 'Spotify',
  youtube: 'YouTube',
}

const CHANNEL_ICONS: Record<Channel, React.ReactNode> = {
  transistor: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  ),
  spotify: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  ),
  youtube: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
}

export default function EpisodePlayer({
  transistorUrl,
  spotifyEpisodeId,
  youtubeVideoId,
  title,
  applePodcastsUrl,
  spotifyShowUrl,
  youtubeShowUrl,
}: Props) {
  const tabs: Channel[] = [
    ...(transistorUrl ? ['transistor' as Channel] : []),
    ...(spotifyEpisodeId ? ['spotify' as Channel] : []),
    ...(youtubeVideoId ? ['youtube' as Channel] : []),
  ]

  const [active, setActive] = useState<Channel | null>(() => tabs[0] ?? null)

  // No embeds available — link to the show on each platform
  if (tabs.length === 0) {
    return (
      <div
        style={{
          padding: '1.5rem 2rem',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {[
            { href: withUtm(applePodcastsUrl, { campaign: 'episode-player', content: 'platform-apple' }), label: 'Apple Podcasts', icon: CHANNEL_ICONS.transistor },
            { href: withUtm(spotifyShowUrl, { campaign: 'episode-player', content: 'platform-spotify' }), label: 'Spotify', icon: CHANNEL_ICONS.spotify },
            { href: withUtm(youtubeShowUrl, { campaign: 'episode-player', content: 'platform-youtube' }), label: 'YouTube', icon: CHANNEL_ICONS.youtube },
          ].map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontSize: '0.875rem',
                color: 'var(--accent-coral)',
                textDecoration: 'none',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
              }}
            >
              {icon}
              {label}
            </a>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Tab bar — only shown when multiple options exist */}
      {tabs.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '0.25rem',
            marginBottom: '1rem',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '0',
          }}
        >
          {tabs.map((tab) => {
            const isActive = tab === active
            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.5rem 1rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--accent-coral)' : '2px solid transparent',
                  marginBottom: '-1px',
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                  fontSize: '0.8125rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--accent-coral)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
              >
                {CHANNEL_ICONS[tab]}
                {CHANNEL_LABELS[tab]}
              </button>
            )
          })}
        </div>
      )}

      {/* Embeds */}
      {active === 'transistor' && transistorUrl && (
        <iframe
          width="100%"
          height="180"
          frameBorder="no"
          scrolling="no"
          seamless
          src={transistorUrl}
          title={`Listen to ${title}`}
          style={{ borderRadius: 'var(--radius-md)', display: 'block' }}
        />
      )}

      {active === 'spotify' && spotifyEpisodeId && (
        <iframe
          src={`https://open.spotify.com/embed/episode/${spotifyEpisodeId}?utm_source=generator`}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ borderRadius: 'var(--radius-md)', display: 'block' }}
          title={`Listen to ${title} on Spotify`}
        />
      )}

      {active === 'youtube' && youtubeVideoId && (
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
            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
            title={`Watch ${title} on YouTube`}
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
      )}
    </div>
  )
}
