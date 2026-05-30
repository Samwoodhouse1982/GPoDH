import Link from 'next/link'
import { CONSULTING } from '@/lib/constants'

interface ConsultingBridgeProps {
  variant: 'inline' | 'card' | 'footer-strip'
}

export default function ConsultingBridge({ variant }: ConsultingBridgeProps) {
  if (variant === 'inline') {
    return (
      <p
        style={{
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-dm-sans, var(--font-body))',
          fontSize: '0.875rem',
        }}
      >
        {CONSULTING.ctaText}{' '}
        <Link
          href={CONSULTING.url}
          style={{ color: 'var(--accent-coral)', fontWeight: 500 }}
        >
          {CONSULTING.ctaLinkText} &#8594;
        </Link>
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
          {CONSULTING.description}
        </p>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            marginBottom: '0.5rem',
          }}
        >
          {CONSULTING.ctaText}
        </p>
        <Link
          href={CONSULTING.url}
          style={{
            color: 'var(--accent-coral)',
            fontWeight: 500,
            fontSize: '0.9375rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          &#8594; {CONSULTING.ctaLinkText}
        </Link>
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
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-dm-mono, var(--font-mono))',
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              color: 'var(--accent-amber)',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            Consulting
          </p>
          <p
            style={{
              fontFamily: 'var(--font-cormorant, var(--font-display))',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              margin: '0 0 0.4rem',
            }}
          >
            From promising to proven.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', margin: 0 }}>
            Senior clinical &amp; product counsel for clinical AI.
          </p>
        </div>
        <a
          href="https://www.shubs.me"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flexShrink: 0,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.75rem 1.5rem',
            background: 'var(--accent-amber)',
            color: 'var(--bg-dark)',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            fontSize: '0.9375rem',
            textDecoration: 'none',
          }}
        >
          Work with Shubs &#8594;
        </a>
      </div>
    </div>
  )
}
