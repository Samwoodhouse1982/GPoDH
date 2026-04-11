'use client'

import { useState } from 'react'
import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import HostModal from '@/components/ui/HostModal'

export default function HostIntroStrip() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <section style={{ padding: '2.5rem var(--gutter)', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <ScrollReveal>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid var(--accent-coral)', position: 'relative' }}>
              <Image src="/shubs.webp" alt="Dr Shubs Upadhyay" fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="80px" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div style={{ flex: 1, minWidth: '220px' }}>
              <p style={{ fontFamily: 'var(--font-dm-mono, var(--font-mono))', fontSize: '0.625rem', letterSpacing: '0.12em', color: 'var(--accent-coral)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Your host</p>
              <p style={{ fontFamily: 'var(--font-cormorant, var(--font-display))', fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>Dr Shubs Upadhyay</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '52ch' }}>Physician, digital health strategist, and Founding Partner of SandiQ Global. He started GPODH because the conversations he was having privately deserved a much wider audience.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <button
              onClick={() => setOpen(true)}
              style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap', transition: 'color var(--transition-fast)', padding: 0 }}
              className="host-intro-link"
            >
              More about Shubs ↗
            </button>
          </ScrollReveal>
        </div>
      </section>
      <style>{`.host-intro-link:hover { color: var(--text-primary) !important; }`}</style>

      <HostModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
