import { SANDIQ } from '@/lib/constants'

interface SandiQBridgeProps {
  variant: 'inline' | 'card' | 'footer-strip'
}

export default function SandiQBridge({ variant }: SandiQBridgeProps) {
  if (variant === 'inline') {
    return (
      <p
        style={{
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-dm-sans, var(--font-body))',
          fontSize: '0.875rem',
        }}
      >
        {SANDIQ.ctaText}{' '}
        <a
          href={SANDIQ.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--accent-coral)', fontWeight: 500 }}
        >
          {SANDIQ.ctaLinkText} &#8599;
        </a>
        {' '}
        <span style={{ color: 'var(--text-muted)' }}>sandiq.com</span>
      </p>
    )
  }

  if (variant === 'card') {
    return (
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
        }}
      >
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            marginBottom: '1rem',
          }}
        >
          {SANDIQ.description}
        </p>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            marginBottom: '0.5rem',
          }}
        >
          {SANDIQ.ctaText}
        </p>
        <a
          href={SANDIQ.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--accent-coral)',
            fontWeight: 500,
            fontSize: '0.9375rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          &#8594; {SANDIQ.ctaLinkText}{' '}
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
            sandiq.com &#8599;
          </span>
        </a>
      </div>
    )
  }

  // footer-strip
  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '2px solid var(--accent-amber)',
        padding: '2.5rem var(--gutter)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-mono, var(--font-mono))',
            fontSize: '0.6875rem',
            letterSpacing: '0.12em',
            color: 'var(--accent-amber)',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          CONSULTING &middot; sandiq.com
        </p>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            maxWidth: '48rem',
            marginBottom: '1.25rem',
          }}
        >
          Shubs and the SandiQ network work directly with companies and investors on clinical leadership, evidence strategy, and market access.
        </p>
        <a
          href={SANDIQ.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--accent-amber)',
            fontWeight: 500,
            fontSize: '0.9375rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          &#8594; Work with SandiQ{' '}
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
            sandiq.com &#8599;
          </span>
        </a>
      </div>
    </div>
  )
}
