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
          CONSULTING
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
          Shubs works directly with companies and investors on clinical leadership, evidence strategy, and market access.
        </p>
        <Link
          href={CONSULTING.url}
          style={{
            color: 'var(--accent-amber)',
            fontWeight: 500,
            fontSize: '0.9375rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          &#8594; Work with Shubs
        </Link>
      </div>
    </div>
  )
}
