import type { ReactNode, CSSProperties } from 'react'

// Shared shell + typography for the legal pages (Privacy, Legal Notice, Terms),
// so they all read consistently. Plain content components; no client JS.

const h2Style: CSSProperties = {
  fontFamily: 'var(--font-cormorant, var(--font-display))',
  fontSize: '1.5rem',
  fontWeight: 600,
  color: 'var(--text-primary)',
  marginBottom: '0.75rem',
}

const pStyle: CSSProperties = {
  color: 'var(--text-secondary)',
  lineHeight: 1.8,
  fontSize: '0.9375rem',
  marginBottom: '0.75rem',
}

export const legalLinkStyle: CSSProperties = {
  color: 'var(--accent-coral)',
  textDecoration: 'none',
  fontWeight: 500,
}

export const legalListStyle: CSSProperties = {
  ...pStyle,
  paddingLeft: '1.25rem',
  listStyle: 'disc',
}

export function LegalP({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <p style={{ ...pStyle, ...style }}>{children}</p>
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <h2 style={h2Style}>{title}</h2>
      {children}
    </div>
  )
}

export function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  lastUpdated?: string
  intro?: ReactNode
  children: ReactNode
}) {
  return (
    <section style={{ padding: '10rem var(--gutter) 5rem' }}>
      <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto' }}>
        <p
          style={{
            fontFamily: 'var(--font-dm-mono, var(--font-mono))',
            fontSize: '0.6875rem',
            letterSpacing: '0.15em',
            color: 'var(--accent-coral)',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          {eyebrow}
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-cormorant, var(--font-display))',
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            marginBottom: lastUpdated ? '0.5rem' : '1.5rem',
          }}
        >
          {title}
        </h1>
        {lastUpdated && (
          <p
            style={{
              fontFamily: 'var(--font-dm-mono, var(--font-mono))',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              marginBottom: '2.5rem',
            }}
          >
            {lastUpdated}
          </p>
        )}
        {intro && <div style={{ marginBottom: '2.5rem' }}>{intro}</div>}
        {children}
      </div>
    </section>
  )
}
