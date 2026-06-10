import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy & Cookies',
  description:
    'How Global Perspectives on Digital Health handles your data: what we collect, what we don’t, and your rights.',
}

// ⚠️ This is a plain-English draft written to honestly reflect how the site
// works today (see the inline notes). Have it reviewed by a qualified person
// before relying on it for legal compliance, and keep it in sync if the
// site's data practices change (new analytics, embeds, newsletter tools…).

const SECTION_STYLE: React.CSSProperties = {
  marginBottom: '2.5rem',
}

const H2_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, var(--font-display))',
  fontSize: '1.5rem',
  fontWeight: 600,
  color: 'var(--text-primary)',
  marginBottom: '0.75rem',
}

const P_STYLE: React.CSSProperties = {
  color: 'var(--text-secondary)',
  lineHeight: 1.8,
  fontSize: '0.9375rem',
  marginBottom: '0.75rem',
}

export default function PrivacyPage() {
  return (
    <section style={{ padding: '10rem var(--gutter) 5rem' }}>
      <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto' }}>
        <p
          style={{
            fontFamily: 'var(--font-dm-mono, var(--font-mono))',
            fontSize: '0.6875rem',
            letterSpacing: '0.15em',
            color: 'var(--accent-coral)',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          The small print
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-cormorant, var(--font-display))',
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}
        >
          Privacy &amp; cookies
        </h1>
        <p style={{ ...P_STYLE, marginBottom: '3rem' }}>
          Last updated: June 2026. We make a podcast about doing digital health
          ethically, so we try to practise what we preach: this site collects as
          little data about you as we can get away with.
        </p>

        <div style={SECTION_STYLE}>
          <h2 style={H2_STYLE}>What we collect</h2>
          <p style={P_STYLE}>
            <strong>Forms.</strong> If you use the contact form or subscribe with
            your email address, we receive what you typed (name, email,
            organisation, message) by email, delivered via Web3Forms, a form
            relay service. We use it to reply to you or to send you new-episode
            updates, and for nothing else. We never sell or share it.
          </p>
          <p style={P_STYLE}>
            <strong>Analytics.</strong> We use Vercel Web Analytics, which is
            cookieless and does not track you across sites. It gives us
            anonymous, aggregated page-view counts so we know which episodes
            people find useful.
          </p>
        </div>

        <div style={SECTION_STYLE}>
          <h2 style={H2_STYLE}>Cookies</h2>
          <p style={P_STYLE}>
            This site sets <strong>no cookies of its own</strong> — no tracking
            pixels, no advertising identifiers, no fingerprinting.
          </p>
          <p style={P_STYLE}>
            Some pages embed third-party players: YouTube (in privacy-enhanced
            &ldquo;no-cookie&rdquo; mode, which only sets cookies if you choose
            to play a video) and Transistor (our podcast audio host). When you
            interact with those players, the respective provider&rsquo;s privacy
            policy applies. That&rsquo;s why we don&rsquo;t show you a cookie
            banner: until you press play, there&rsquo;s nothing to consent to.
          </p>
        </div>

        <div style={SECTION_STYLE}>
          <h2 style={H2_STYLE}>Where your data lives</h2>
          <p style={P_STYLE}>
            The site is hosted on Vercel. Form submissions are relayed by
            Web3Forms to our email inbox. Podcast audio is served by Transistor,
            and video by YouTube. Each of these processors has its own privacy
            policy and safeguards.
          </p>
        </div>

        <div style={SECTION_STYLE}>
          <h2 style={H2_STYLE}>Your rights</h2>
          <p style={P_STYLE}>
            Under UK and EU data-protection law (GDPR), you can ask us what
            personal data we hold about you, ask us to correct it, or ask us to
            delete it — for example, to be removed from the episode-update list.
            Email us and we will sort it out, usually within a few days.
          </p>
        </div>

        <div style={SECTION_STYLE}>
          <h2 style={H2_STYLE}>Contact</h2>
          <p style={P_STYLE}>
            Anything unclear, or want your data corrected or deleted? Email{' '}
            <a
              href={`mailto:${SITE.email}`}
              style={{ color: 'var(--accent-coral)', textDecoration: 'none', fontWeight: 500 }}
            >
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
