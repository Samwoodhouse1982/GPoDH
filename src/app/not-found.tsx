'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

// On-brand 404 microcopy — gentle in-jokes about global health, digital
// health, outcomes and ethical investment. One is picked at random per
// visit (client-side, so static generation stays hydration-safe).
const MESSAGES = [
  {
    heading: 'This page was a pilot. It never scaled.',
    body: 'Like too much in digital health, it showed early promise and then quietly disappeared. The episodes, happily, are still going.',
  },
  {
    heading: '404: outputs, but no outcomes.',
    body: 'Something was delivered here once — there’s just no evidence it worked. Let’s get you back to measuring what matters.',
  },
  {
    heading: 'This link didn’t survive the last mile.',
    body: 'Delivery is always hardest at the very end. Fortunately, the conversations you came for are still fully stocked.',
  },
  {
    heading: 'No data found. A textbook case of page poverty.',
    body: 'We talk a lot about health data poverty on the show. This page is a live demonstration.',
  },
  {
    heading: 'We did our due diligence. This page has no impact.',
    body: 'No theory of change, no measurable outcomes, no equity lens. We’re divesting — and taking you somewhere with better returns.',
  },
  {
    heading: 'This page was not co-designed with its users.',
    body: 'Nobody asked anyone what they actually needed here — and now look at it. The episodes were made with a little more listening.',
  },
]

export default function NotFound() {
  // Render the first message on the server/static pass, then swap to a random
  // one on the client so repeat visitors get variety without hydration issues.
  // (Deferred a frame: picking randomness must happen client-side only.)
  const [msg, setMsg] = useState(MESSAGES[0])
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMsg(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
    })
    return () => cancelAnimationFrame(id)
  }, [])

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
          maxWidth: '24ch',
        }}
      >
        {msg.heading}
      </h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '46ch', lineHeight: 1.6 }}>
        {msg.body}
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
