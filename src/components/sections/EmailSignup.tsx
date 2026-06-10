'use client'

import { useState } from 'react'
import { subscribeEmail } from '@/lib/web3forms'
import reusable from '@/data/site/reusable.json'

const copy = reusable.emailSignup

export default function EmailSignup() {
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
      await subscribeEmail(email, 'Page-bottom signup section')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="subscribe"
      style={{
        background: 'linear-gradient(135deg, #C4522A 0%, #D4614A 40%, #C9933A 100%)',
        padding: '5rem var(--gutter)',
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
            color: 'rgba(255,255,255,0.75)',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          {copy.eyebrow}
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant, var(--font-display))',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 600,
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
          }}
        >
          {copy.heading}
        </h2>

        {submitted ? (
          <div
            role="status"
            aria-live="polite"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-accent)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              color: 'var(--text-secondary)',
            }}
          >
            <p style={{ fontSize: '1.125rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {copy.success.heading}
            </p>
            <p style={{ fontSize: '0.875rem' }}>
              {copy.success.body}
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
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={copy.placeholder}
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
              {loading ? copy.submittingLabel : copy.submitLabel}
            </button>
          </form>
        )}

        {error && (
          <p role="alert" style={{ fontSize: '0.8125rem', color: '#fff', fontWeight: 500, marginBottom: '0.5rem' }}>
            {error}
          </p>
        )}

        {!submitted && (
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
            {copy.note}
          </p>
        )}
      </div>
    </section>
  )
}
