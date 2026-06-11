'use client'

import { useState } from 'react'
import PlatformBadge from '@/components/ui/PlatformBadge'
import { PLATFORMS, SOCIAL } from '@/lib/constants'
import { submitToWeb3Forms } from '@/lib/web3forms'
import content from '@/data/site/contact.json'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organisation: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  // Honeypot: real people leave this blank; bots tend to fill every field.
  const [botField, setBotField] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (botField) { setSubmitted(true); return } // silently drop bot submissions
    setLoading(true)
    setError('')
    try {
      await submitToWeb3Forms({
        subject: 'New GPODH contact message',
        name: form.name,
        email: form.email,
        organisation: form.organisation,
        message: form.message,
      })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)',
    fontSize: '0.9375rem',
    fontFamily: 'inherit',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8125rem',
    color: 'var(--text-muted)',
    marginBottom: '0.375rem',
    fontFamily: 'var(--font-dm-mono, var(--font-mono))',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  }

  return (
    <>
      <section style={{ padding: '10rem var(--gutter) 4rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <p
              className="animate-fade-up"
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.6875rem',
                letterSpacing: '0.15em',
                color: 'var(--accent-coral)',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                animationDelay: '0ms',
              }}
            >
              {content.eyebrow}
            </p>
            <h1
              className="animate-fade-up"
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.1,
                marginBottom: '1rem',
                animationDelay: '100ms',
              }}
            >
              {content.title}
            </h1>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
              gap: '4rem',
              alignItems: 'start',
            }}
          >
            {/* Form */}
            <div>
              {submitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-accent)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.5rem',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-cormorant, var(--font-display))',
                      fontSize: '1.75rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {content.success.heading}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {content.success.body}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Honeypot — visually hidden, off-screen, skipped by tab/AT. */}
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
                  <div>
                    <label htmlFor="name" style={labelStyle}>{content.form.nameLabel}</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>{content.form.emailLabel}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label htmlFor="organisation" style={labelStyle}>{content.form.organisationLabel}</label>
                    <input
                      id="organisation"
                      name="organisation"
                      type="text"
                      value={form.organisation}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" style={labelStyle}>{content.form.messageLabel}</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={content.form.messagePlaceholder}
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                    />
                  </div>
                  {error && (
                    <p role="alert" style={{ color: 'var(--accent-coral)', fontSize: '0.875rem', margin: 0 }}>
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    style={{
                      padding: '0.875rem 1.75rem',
                      background: 'var(--accent-coral)',
                      color: 'var(--text-primary)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      cursor: loading ? 'wait' : 'pointer',
                      opacity: loading ? 0.7 : 1,
                      border: 'none',
                      transition: 'background var(--transition-fast)',
                      alignSelf: 'flex-start',
                    }}
                  >
                    {loading ? content.form.submittingLabel : content.form.submitLabel}
                  </button>
                </form>
              )}
            </div>

            {/* Right column context */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {/* Response note */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  {content.responseTime.heading}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  {content.responseTime.body}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  {content.responseTime.note}
                </p>
              </div>

              {/* Listen */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  {content.listenHeading}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <PlatformBadge platform="apple" href={PLATFORMS.apple} />
                  <PlatformBadge platform="spotify" href={PLATFORMS.spotify} />
                  <PlatformBadge platform="youtube" href={PLATFORMS.youtube} />
                  <PlatformBadge platform="rss" href={PLATFORMS.rss} />
                </div>
              </div>

              {/* Social */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  {content.followHeading}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <a
                    href={SOCIAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}
                    className="contact-link"
                  >
                    {content.followLinks.linkedinPersonal} &#8599;
                  </a>
                  <a
                    href={SOCIAL.linkedinCompany}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}
                    className="contact-link"
                  >
                    {content.followLinks.linkedinCompany} &#8599;
                  </a>
                  <a
                    href={SOCIAL.substack}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}
                    className="contact-link"
                  >
                    {content.followLinks.substack} &#8599;
                  </a>
                </div>
              </div>

              {/* Consulting inline */}
              <div
                style={{
                  padding: '1.5rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.1em',
                    color: 'var(--accent-amber)',
                    textTransform: 'uppercase',
                    marginBottom: '0.625rem',
                  }}
                >
                  {content.consulting.eyebrow}
                </p>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 1rem' }}>
                  {content.consulting.body}
                </p>
                <a
                  href={content.consulting.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    color: 'var(--accent-amber)',
                    textDecoration: 'none',
                  }}
                >
                  {content.consulting.linkText} &#8599;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-link:hover {
          color: var(--text-primary) !important;
        }
      `}</style>
    </>
  )
}
