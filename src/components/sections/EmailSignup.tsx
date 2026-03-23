'use client'

import { useState } from 'react'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // Simulate submission
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section
      id="subscribe"
      style={{
        background: 'var(--bg-secondary)',
        padding: '5rem var(--gutter)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--content-width)',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-mono, var(--font-mono))',
            fontSize: '0.6875rem',
            letterSpacing: '0.12em',
            color: 'var(--accent-coral)',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          JOIN THE CONVERSATION
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant, var(--font-display))',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
          }}
        >
          Get new episodes direct to your inbox.
        </h2>

        {submitted ? (
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-accent)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              color: 'var(--text-secondary)',
            }}
          >
            <p style={{ fontSize: '1.125rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              You are subscribed.
            </p>
            <p style={{ fontSize: '0.875rem' }}>
              New episodes will arrive in your inbox when they drop.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: '1 1 280px',
                maxWidth: '360px',
                padding: '0.75rem 1rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '0.9375rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--accent-coral)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9375rem',
                fontWeight: 500,
                cursor: loading ? 'wait' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'background var(--transition-fast)',
                border: 'none',
                flexShrink: 0,
              }}
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}

        {!submitted && (
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            No spam. Unsubscribe at any time.
          </p>
        )}
      </div>
    </section>
  )
}
