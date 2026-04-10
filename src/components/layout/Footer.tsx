import Link from 'next/link'
import Image from 'next/image'
import SandiQBridge from '@/components/ui/SandiQBridge'
import PlatformBadge from '@/components/ui/PlatformBadge'
import { SITE, PLATFORMS, SOCIAL } from '@/lib/constants'

const navLinks = [
  { href: '/episodes', label: 'Episodes' },
  { href: '/about', label: 'About' },
  { href: '/work-with-us', label: 'Work With Us' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)' }}>
      <SandiQBridge variant="footer-strip" />

      {/* Main footer grid */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          padding: '3rem var(--gutter) 2rem',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {/* Left: wordmark + tagline */}
          <div>
            <Image
              src="/logo-gpodh-icon.png"
              alt="GPODH"
              width={56}
              height={56}
              style={{ height: '52px', width: 'auto', display: 'block', marginBottom: '0.75rem' }}
            />
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '18rem',
              }}
            >
              {SITE.description}
            </p>
          </div>

          {/* Center: nav links */}
          <nav>
            <p
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.6875rem',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Pages
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'color var(--transition-fast)',
                    }}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: platforms + social */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.6875rem',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Listen
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <PlatformBadge platform="apple" href={PLATFORMS.apple} />
              <PlatformBadge platform="spotify" href={PLATFORMS.spotify} />
              <PlatformBadge platform="youtube" href={PLATFORMS.youtube} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a
                href={`mailto:${SITE.email}`}
                style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}
                className="footer-link"
              >
                {SITE.email}
              </a>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}
                className="footer-link"
              >
                LinkedIn
              </a>
              <a
                href={SOCIAL.substack}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}
                className="footer-link"
              >
                Substack
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border)',
          padding: '1.25rem var(--gutter)',
        }}
      >
        <p
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          &copy; 2026 Global Perspectives on Digital Health &middot; Hosted by Dr Shubs Upadhyay &middot;{' '}
          Consulting:{' '}
          <a
            href="https://sandiq.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)' }}
            className="footer-link"
          >
            sandiq.com &#8599;
          </a>
        </p>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--text-primary) !important;
        }
      `}</style>
    </footer>
  )
}
