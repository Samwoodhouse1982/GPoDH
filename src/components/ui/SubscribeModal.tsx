'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { subscribeEmail } from '@/lib/web3forms'
import { PLATFORMS } from '@/lib/constants'
import reusable from '@/data/site/reusable.json'

const copy = reusable.subscribeModal

interface Props {
  open: boolean
  onClose: () => void
}

// Apple/Spotify/YouTube deep-link straight into the listener's app, where
// following is a single tap. RSS is handled separately (copy-to-clipboard)
// so people never hit a raw XML page.
const PLATFORM_LINKS: { label: string; href: string }[] = [
  { label: 'Apple Podcasts', href: PLATFORMS.apple },
  { label: 'Spotify', href: PLATFORMS.spotify },
  { label: 'YouTube', href: PLATFORMS.youtube },
]

export default function SubscribeModal({ open, onClose }: Props) {
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [botField, setBotField] = useState('')
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  // The element that had focus before the modal opened, so we can return
  // keyboard users to it on close.
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement | null
      document.body.style.overflow = 'hidden'
      setTimeout(() => firstLinkRef.current?.focus(), 80)
    } else {
      document.body.style.overflow = ''
      previousFocusRef.current?.focus()
      previousFocusRef.current = null
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Reset transient state on close so reopening starts fresh.
  const handleClose = useCallback(() => {
    setSubmitted(false)
    setEmail('')
    setError('')
    setCopied(false)
    onClose()
  }, [onClose])

  const copyFeed = async () => {
    try {
      await navigator.clipboard.writeText(PLATFORMS.rss)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Clipboard unavailable (old browser / insecure context) — fall back to
      // opening the feed so the user can copy it from the address bar.
      window.open(PLATFORMS.rss, '_blank', 'noopener,noreferrer')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    if (botField) { setSubmitted(true); return }
    setLoading(true)
    setError('')
    try {
      await subscribeEmail(email, 'Subscribe pop-up (top nav)')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, handleClose])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
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
        aria-label="Subscribe to the podcast"
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
          onClick={handleClose}
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
          {copy.eyebrow}
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
          {copy.heading}
        </p>

        {/* Podcast platforms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {PLATFORM_LINKS.map((p, i) => (
            <a
              key={p.label}
              ref={i === 0 ? firstLinkRef : undefined}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="sub-platform"
            >
              {p.label}
              <span aria-hidden="true">&#8599;</span>
            </a>
          ))}

          {/* RSS — copy the feed URL instead of opening raw XML, so people
              can paste it into any podcast app without leaving the site. */}
          <button type="button" onClick={copyFeed} className="sub-platform sub-rss" aria-live="polite">
            {copied ? 'Feed URL copied — paste it into your app' : 'Copy RSS feed (any app)'}
            <span aria-hidden="true">{copied ? '✓' : '⧉'}</span>
          </button>
        </div>

        {/* Secondary: email capture, inline */}
        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
          {submitted ? (
            <div role="status" aria-live="polite">
              <p
                style={{
                  fontFamily: 'var(--font-cormorant, var(--font-display))',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.375rem',
                }}
              >
                {copy.success.heading}
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {copy.success.body}
              </p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.625rem' }}>
                Prefer email? Get new episodes in your inbox.
              </p>
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
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <input
                    type="email"
                    aria-label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={copy.placeholder}
                    required
                    style={{
                      flex: '1 1 12rem',
                      minWidth: 0,
                      padding: '0.6rem 0.85rem',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9375rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: '0.6rem 1.1rem',
                      background: 'var(--accent-coral)',
                      color: '#fff',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      cursor: loading ? 'wait' : 'pointer',
                      opacity: loading ? 0.7 : 1,
                      border: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'background var(--transition-fast)',
                    }}
                  >
                    {loading ? copy.submittingLabel : copy.submitLabel}
                  </button>
                </div>
              </form>
              {error && (
                <p role="alert" style={{ fontSize: '0.8125rem', color: 'var(--accent-coral)', marginTop: '0.5rem' }}>
                  {error}
                </p>
              )}
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                {copy.note}
              </p>
            </>
          )}
        </div>

        <style>{`
          .sub-platform {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 0.75rem 1.1rem;
            border: 1px solid var(--accent-coral);
            border-radius: var(--radius-md);
            background: none;
            color: var(--accent-coral);
            font-family: inherit;
            font-size: 0.9375rem;
            font-weight: 500;
            text-align: left;
            text-decoration: none;
            cursor: pointer;
            transition: var(--transition-base);
          }
          .sub-platform:hover { background: var(--accent-coral); color: var(--bg-primary); }
          .sub-rss { gap: 0.75rem; }
        `}</style>
      </div>
    </>
  )
}
