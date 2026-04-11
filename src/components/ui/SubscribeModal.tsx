'use client'

import { useState, useEffect, useRef } from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

export default function SubscribeModal({ open, onClose }: Props) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 80)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setLoading(false)
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'rgba(10,16,14,0.55)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Subscribe"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 201,
          width: 'min(92vw, 440px)',
          background: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.25rem',
          boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            fontSize: '1.25rem',
            lineHeight: 1,
            padding: '0.25rem',
          }}
        >
          ✕
        </button>

        {submitted ? (
          <>
            <p
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '0.625rem',
              }}
            >
              You&rsquo;re in.
            </p>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              New episodes will land in your inbox when they drop. No spam, ever.
            </p>
          </>
        ) : (
          <>
            <p
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.625rem',
                letterSpacing: '0.12em',
                color: 'var(--accent-coral)',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              Join the conversation
            </p>
            <p
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
                marginBottom: '1.5rem',
              }}
            >
              Get new episodes direct to your inbox.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'var(--accent-coral)',
                  color: '#fff',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  cursor: loading ? 'wait' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  border: 'none',
                  transition: 'background var(--transition-fast)',
                }}
              >
                {loading ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.875rem' }}>
              No spam. Unsubscribe at any time.
            </p>
          </>
        )}
      </div>
    </>
  )
}
