'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { SOCIAL } from '@/lib/constants'
import RichText from '@/components/ui/RichText'
import reusable from '@/data/site/reusable.json'

const copy = reusable.hostModal

interface Props {
  /** Path to the intro video — leave empty until video is ready */
  videoSrc?: string
  /** Controlled mode: pass open + onClose to suppress the built-in trigger */
  open?: boolean
  onClose?: () => void
}

export default function HostModal({ videoSrc, open: controlledOpen, onClose }: Props) {
  const isControlled = controlledOpen !== undefined
  const [internalOpen, setInternalOpen] = useState(false)
  const open = isControlled ? controlledOpen : internalOpen
  const setOpen = isControlled ? (v: boolean) => { if (!v) onClose?.() } : setInternalOpen
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (open) {
      el.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      el.close()
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Sync React state when native dialog closes via Escape key
  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    const onCancel = () => setOpen(false)
    el.addEventListener('cancel', onCancel)
    return () => el.removeEventListener('cancel', onCancel)
  }, [])

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) setOpen(false)
  }

  return (
    <>
      {/* ── Trigger strip (standalone mode only) ──────── */}
      {!isControlled && <button
        onClick={() => setOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.875rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '0.75rem 1.25rem',
          cursor: 'pointer',
          textAlign: 'left',
          width: '100%',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent-coral)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'
        }}
        onMouseLeave={e => {
          ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
        }}
      >
        <div style={{ flexShrink: 0, position: 'relative' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid var(--border)',
            }}
          >
            <Image
              src={reusable.hostIntro.image}
              alt={copy.name}
              width={48}
              height={48}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
          {/* Play badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: 'var(--accent-coral)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--bg-primary)',
            }}
          >
            <svg width="7" height="8" viewBox="0 0 7 8" fill="white">
              <path d="M0 0.5L7 4L0 7.5V0.5Z" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: 'var(--font-dm-mono, var(--font-mono))',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              color: 'var(--accent-coral)',
              textTransform: 'uppercase',
              marginBottom: '0.2rem',
            }}
          >
            {copy.triggerEyebrow}
          </p>
          <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
            {copy.name}
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.4, marginTop: '0.15rem' }}>
            {copy.triggerSubtitle}
          </p>
        </div>

        {/* Arrow */}
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', flexShrink: 0 }}>
          {copy.triggerLinkText}
        </span>
      </button>}

      {/* ── Modal ─────────────────────────────────────── */}
      <style>{`
        dialog.host-modal {
          border: none;
          border-radius: var(--radius-lg);
          background: var(--bg-primary);
          padding: 0;
          width: min(860px, 94vw);
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 24px 64px rgba(0,0,0,0.25);
          position: fixed;
          inset: 0;
          margin: auto;
        }
        dialog.host-modal::backdrop {
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px);
        }
        @media (max-width: 640px) {
          dialog.host-modal { width: 98vw; }
        }
      `}</style>

      <dialog
        ref={dialogRef}
        className="host-modal"
        onClick={handleBackdropClick}
      >
        {/* Hero photo */}
        <div style={{ position: 'relative', height: '260px', overflow: 'hidden', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
          <Image
            src={copy.heroImage}
            alt={copy.heroAlt}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
            sizes="860px"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 55%, rgba(245,240,232,0.6) 82%, rgba(245,240,232,0.97) 100%)',
          }} />
        </div>

        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.4)',
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(6px)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            color: '#fff',
            zIndex: 1,
          }}
        >
          ×
        </button>

        <div style={{ padding: '1.5rem 2rem 2rem' }}>
            {/* Video slot — shown only when src is provided */}
          {videoSrc && (
            <div
              style={{
                position: 'relative',
                paddingBottom: '56.25%',
                marginBottom: '2rem',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: '#000',
              }}
            >
              <iframe
                src={videoSrc}
                title="Dr Shubs Upadhyay — introduction"
                allow="autoplay; fullscreen"
                allowFullScreen
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </div>
          )}

          {/* Bio */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Headshot column */}
            <div style={{ flexShrink: 0 }}>
              <div
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid var(--border)',
                }}
              >
                <Image
                  src={reusable.hostIntro.image}
                  alt={copy.name}
                  width={96}
                  height={96}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>
            </div>

            {/* Text column */}
            <div style={{ flex: 1, minWidth: '240px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  color: 'var(--accent-coral)',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}
              >
                {copy.eyebrow}
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant, var(--font-display))',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '1.25rem',
                  lineHeight: 1.2,
                }}
              >
                {copy.name}
              </h2>

              <RichText style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                {copy.bio}
              </RichText>

              {/* Credentials */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1.25rem',
                  padding: '0.875rem',
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                }}
              >
                {copy.credentials.map((cred) => (
                  <span
                    key={cred}
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                    }}
                  >
                    {cred}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <a
                  href={copy.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '0.55rem 1.25rem',
                    background: 'var(--accent-coral)',
                    color: '#fff',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  {copy.siteLinkText}
                </a>
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.875rem', color: 'var(--accent-coral)', textDecoration: 'none' }}
                >
                  {copy.linkedinLabel}
                </a>
                <a
                  href={SOCIAL.substack}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.875rem', color: 'var(--accent-coral)', textDecoration: 'none' }}
                >
                  {copy.substackLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
