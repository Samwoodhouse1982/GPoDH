'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SubscribeModal from '@/components/ui/SubscribeModal'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/episodes', label: 'Episodes' },
  { href: '/videos', label: 'Videos' },
  { href: '/work-with-us', label: 'Work With Us' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [subscribeOpen, setSubscribeOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      {/* Top bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 51,
          height: 'var(--topbar-height)',
          background: 'var(--bg-dark)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 var(--gutter)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-mono, var(--font-mono))',
            fontSize: '0.625rem',
            letterSpacing: '0.14em',
            color: 'rgba(255,255,255,0.88)',
            textTransform: 'uppercase',
          }}
        >
          AI &amp; digital health in underserved communities
        </p>
      </div>

      <header
        style={{
          position: 'fixed',
          top: 'var(--topbar-height)',
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background var(--transition-base), backdrop-filter var(--transition-base)',
          background: scrolled ? 'rgba(245, 240, 232, 0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            padding: '0 var(--gutter)',
            height: '4.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0, display: 'block' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-gpodh.png"
              alt="GPODH: Global Perspectives on Digital Health"
              style={{ height: '48px', width: 'auto', display: 'block' }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  transition: 'color var(--transition-fast)',
                  textDecoration: 'none',
                }}
                className="nav-link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Subscribe Button (desktop) */}
          <button
            onClick={() => setSubscribeOpen(true)}
            className="subscribe-btn desktop-nav"
            style={{
              flexShrink: 0,
              padding: '0.5rem 1.25rem',
              background: 'var(--accent-coral)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'background var(--transition-fast)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Subscribe
          </button>

          {/* Hamburger (mobile) */}
          <button
            className="mobile-nav"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '0.25rem',
            }}
          >
            {mobileOpen ? (
              <>
                <span style={{ width: 24, height: 2, background: 'var(--text-primary)', display: 'block', transform: 'rotate(45deg) translate(5px, 5px)', transition: 'var(--transition-base)' }} />
                <span style={{ width: 24, height: 2, background: 'var(--text-primary)', display: 'block', opacity: 0, transition: 'var(--transition-base)' }} />
                <span style={{ width: 24, height: 2, background: 'var(--text-primary)', display: 'block', transform: 'rotate(-45deg) translate(5px, -5px)', transition: 'var(--transition-base)' }} />
              </>
            ) : (
              <>
                <span style={{ width: 24, height: 2, background: 'var(--text-primary)', display: 'block', transition: 'var(--transition-base)' }} />
                <span style={{ width: 24, height: 2, background: 'var(--text-primary)', display: 'block', transition: 'var(--transition-base)' }} />
                <span style={{ width: 24, height: 2, background: 'var(--text-primary)', display: 'block', transition: 'var(--transition-base)' }} />
              </>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            background: 'var(--bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-cormorant, var(--font-display))',
                  fontSize: '2.5rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="https://podcasts.apple.com/us/podcast/id1744026517?mt=2&ls=1" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-coral)', fontSize: '0.875rem' }}>Apple Podcasts</a>
            <a href="https://open.spotify.com/show/15zbPaJeOknH1qZNL4Spau" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-coral)', fontSize: '0.875rem' }}>Spotify</a>
            <a href="https://www.youtube.com/@globalpdhpodcast" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-coral)', fontSize: '0.875rem' }}>YouTube</a>
          </div>
        </div>
      )}

      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />

      <style>{`
        .nav-link:hover {
          color: var(--text-primary) !important;
        }
        .subscribe-btn:hover {
          background: var(--accent-coral-dim) !important;
        }
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav { display: none !important; }
        }
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </>
  )
}
