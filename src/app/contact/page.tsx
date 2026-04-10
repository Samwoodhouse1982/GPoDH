'use client'

import { useState } from 'react'
import PlatformBadge from '@/components/ui/PlatformBadge'
import { PLATFORMS, SOCIAL } from '@/lib/constants'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organisation: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setSubmitted(true)
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)',
    fontSize: '0.9375rem',
    outline: 'none',
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
      <section style={{ padding: '8rem var(--gutter) 5rem' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                color: 'var(--accent-coral)',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              CONTACT
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}
            >
              Get in touch.
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
                    Message received.
                  </p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    Shubs will get back to you directly. Usually within a few days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label htmlFor="name" style={labelStyle}>Name</label>
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
                    <label htmlFor="email" style={labelStyle}>Email</label>
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
                    <label htmlFor="organisation" style={labelStyle}>Organisation (optional)</label>
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
                    <label htmlFor="message" style={labelStyle}>Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
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
                    {loading ? 'Sending...' : 'Send message'}
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
                  Response time
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  We aim to respond to all messages within a few days.
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
                  Listen on
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <PlatformBadge platform="apple" href={PLATFORMS.apple} />
                  <PlatformBadge platform="spotify" href={PLATFORMS.spotify} />
                  <PlatformBadge platform="youtube" href={PLATFORMS.youtube} />
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
                  Follow
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <a
                    href={SOCIAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}
                    className="contact-link"
                  >
                    LinkedIn &#8599;
                  </a>
                  <a
                    href={SOCIAL.substack}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}
                    className="contact-link"
                  >
                    Substack &#8599;
                  </a>
                </div>
              </div>

              {/* Consulting / SandiQ inline */}
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
                  Consulting
                </p>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                  Shubs is Founding Partner of SandiQ Global. For consulting enquiries around clinical strategy, evidence, or market access in digital health, visit SandiQ directly.
                </p>
                <a
                  href="https://sandiq.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--accent-amber)',
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                  }}
                >
                  sandiq.com &#8599;
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
