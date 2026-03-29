'use client'

import { useState } from 'react'

interface Props {
  transcript: string
  guest: string
}

export default function TranscriptToggle({ transcript, guest }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'none',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.6rem 1.25rem',
          fontFamily: 'var(--font-dm-sans, sans-serif)',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
        }}
        aria-expanded={open}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform var(--transition-fast)',
            flexShrink: 0,
          }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        {open ? 'Hide transcript' : 'Read transcript'}
      </button>

      {open && (
        <div
          style={{
            marginTop: '2rem',
            padding: '2rem',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-dm-mono, var(--font-mono))',
              fontSize: '0.625rem',
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            Transcript · {guest}
          </p>
          <div
            style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.9,
              whiteSpace: 'pre-wrap',
              maxHeight: '60vh',
              overflowY: 'auto',
            }}
          >
            {transcript}
          </div>
        </div>
      )}
    </div>
  )
}
