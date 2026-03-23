interface PlatformBadgeProps {
  platform: 'apple' | 'spotify' | 'youtube'
  href: string
}

const platformLabels: Record<PlatformBadgeProps['platform'], string> = {
  apple: 'Apple Podcasts',
  spotify: 'Spotify',
  youtube: 'YouTube',
}

export default function PlatformBadge({ platform, href }: PlatformBadgeProps) {
  const label = platformLabels[platform]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="platform-badge"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem 1.125rem',
        border: '1px solid var(--accent-coral)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--accent-coral)',
        fontSize: '0.8125rem',
        fontWeight: 500,
        letterSpacing: '0.02em',
        transition: 'var(--transition-base)',
        whiteSpace: 'nowrap',
      }}
    >
      <span aria-hidden="true">{label}</span>
      <span className="sr-only">Listen on {label}</span>
      <style>{`
        .platform-badge:hover {
          background: var(--accent-coral) !important;
          color: var(--bg-primary) !important;
        }
      `}</style>
    </a>
  )
}
