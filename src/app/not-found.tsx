import Link from 'next/link'

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8rem var(--gutter) 6rem',
        gap: '1rem',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-dm-mono, var(--font-mono))',
          fontSize: '0.6875rem',
          letterSpacing: '0.15em',
          color: 'var(--accent-coral)',
          textTransform: 'uppercase',
        }}
      >
        404 — Page not found
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-cormorant, var(--font-display))',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        This one got away.
      </h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '42ch', lineHeight: 1.6 }}>
        The page you were after doesn&rsquo;t exist or has moved. Let&rsquo;s get you back to the
        conversations.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
        <Link
          href="/"
          style={{
            padding: '0.875rem 1.75rem',
            background: 'var(--accent-coral)',
            color: '#fff',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.9375rem',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Back to home
        </Link>
        <Link
          href="/episodes"
          style={{
            padding: '0.875rem 1.75rem',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            fontSize: '0.9375rem',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Browse episodes
        </Link>
      </div>
    </section>
  )
}
