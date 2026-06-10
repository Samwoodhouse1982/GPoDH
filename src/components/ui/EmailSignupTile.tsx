'use client'

import { useState } from 'react'
import { subscribeEmail } from '@/lib/web3forms'

interface EmailSignupTileProps {
  /** Heading shown on the tile. */
  title?: string
  /** Small eyebrow label above the heading. */
  eyebrow?: string
}

export default function EmailSignupTile({
  title = 'Get new episodes direct to your inbox.',
  eyebrow = 'Stay in the loop',
}: EmailSignupTileProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [botField, setBotField] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    if (botField) { setSubmitted(true); return }
    setLoading(true)
    setError('')
    try {
      await subscribeEmail(email, 'Inline grid tile')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '0.875rem',
        background: 'linear-gradient(135deg, #C4522A 0%, #D4614A 45%, #C9933A 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-card)',
        minHeight: '260px',
        height: '100%',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-dm-mono, var(--font-mono))',
          fontSize: '0.625rem',
          letterSpacing: '0.14em',
          color: 'rgba(255,255,255,0.78)',
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        {eyebrow}
      </p>

      <h3
        style={{
          fontFamily: 'var(--font-cormorant, var(--font-display))',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {title}
      </h3>

      {submitted ? (
        <div
          role="status"
          aria-live="polite"
          style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
          }}
        >
          <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 0.25rem' }}>
            You are subscribed.
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
            New episodes will land in your inbox when they drop.
          </p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <input
              type="text"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              aria-label="Email address"
              style={{
                width: '100%',
                padding: '0.7rem 0.875rem',
                background: 'var(--bg-card)',
                border: '1px solid transparent',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '0.9375rem',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="signup-tile-btn"
              style={{
                width: '100%',
                padding: '0.7rem 1rem',
                background: 'var(--bg-dark)',
                color: '#ffffff',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9375rem',
                fontWeight: 500,
                cursor: loading ? 'wait' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'opacity var(--transition-fast)',
                border: 'none',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
              }}
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {error && (
            <p role="alert" style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 500, margin: 0 }}>
              {error}
            </p>
          )}
          <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
            No spam. Unsubscribe any time.
          </p>
        </>
      )}

      <style>{`
        .signup-tile-btn:hover { opacity: 0.88 !important; }
      `}</style>
    </div>
  )
}
