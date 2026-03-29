import Link from 'next/link'
import EpisodeCard from '@/components/ui/EpisodeCard'
import PlatformBadge from '@/components/ui/PlatformBadge'
import SandiQBridge from '@/components/ui/SandiQBridge'
import ScrollReveal from '@/components/ui/ScrollReveal'
import EmailSignup from '@/components/sections/EmailSignup'
import GlobeSection from '@/components/sections/GlobeSection'
import HeroGlobeWrapper from '@/components/ui/HeroGlobeWrapper'
import { episodes } from '@/lib/episodes'
import { PLATFORMS, SOCIAL } from '@/lib/constants'

const testimonials = [
  "It is so valuable to hear insights from people who have already gone through similar challenges.",
  "This perspective is sorely missing from our industry, so glad you are doing this.",
  "No-one else talks about this topic with this level of depth and engagement.",
]

const showCards = [
  {
    eyebrow: 'VISIBILITY',
    text: 'Who is actually building digital health tools in low-resource settings, and what does their work look like?',
  },
  {
    eyebrow: 'LEARNING',
    text: 'What can high-income country health systems learn from the ingenuity and constraint-led innovation happening elsewhere?',
  },
  {
    eyebrow: 'THE BIG PICTURE',
    text: 'How do we build a more equitable global digital health ecosystem, and who needs to be in the room?',
  },
]

const audienceList = [
  'Clinicians curious about digital health beyond their own system',
  'Digital health founders working in or entering emerging markets',
  'Global health professionals navigating digital transformation',
  'Investors looking at health tech in Africa, Asia, and Latin America',
  'Policy makers shaping national digital health strategies',
  'Researchers in global health, implementation science, and HCI',
  'NGO and INGO staff working in health programming',
  'Students and early-career professionals in global health',
]

const youllHear = [
  'Honest accounts of what is working and what is failing',
  'Voices that are rarely on the main stage at major conferences',
  'Practical frameworks for thinking about equity in digital health',
  'Context on specific countries and regions',
  'Conversations about funding, sustainability, and scale',
]

const stats = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    value: '60+',
    label: 'Countries reached',
    detail: undefined as string | undefined,
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0118 0v6"/>
        <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
      </svg>
    ),
    value: 'Thousands',
    label: 'of downloads',
    detail: undefined,
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    value: '3',
    label: 'Focus regions',
    detail: 'Africa · Asia · Latin America',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    value: '4',
    label: 'Audience types',
    detail: 'Clinicians · Founders · Investors · Policy makers',
  },
]

export default function HomePage() {
  const latestEpisodes = episodes.slice(0, 4)

  return (
    <>
      {/* ——— Hero ——— */}
      <section
        style={{
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
          padding: '8rem var(--gutter) 4rem',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Left */}
          <div>
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
              GLOBAL PERSPECTIVES ON DIGITAL HEALTH
            </p>
            <h1
              className="animate-fade-up"
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                animationDelay: '100ms',
              }}
            >
              Break out of your bubble.
            </h1>
            <p
              className="animate-fade-up"
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--text-secondary)',
                marginBottom: '1.75rem',
                lineHeight: 1.4,
                animationDelay: '160ms',
              }}
            >
              The podcast about AI and digital health in underserved communities globally.
            </p>
            <p
              className="animate-fade-up"
              style={{
                fontSize: '1.125rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                maxWidth: '38rem',
                marginBottom: '2.5rem',
                animationDelay: '200ms',
              }}
            >
              Real conversations on AI and digital health where it matters most: with the communities and innovators working in underserved settings around the world.
            </p>
            <div
              className="animate-fade-up"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginBottom: '1.75rem',
                animationDelay: '350ms',
              }}
            >
              <PlatformBadge platform="apple" href={PLATFORMS.apple} />
              <PlatformBadge platform="spotify" href={PLATFORMS.spotify} />
              <PlatformBadge platform="youtube" href={PLATFORMS.youtube} />
            </div>
            <a
              href="#about-section"
              className="animate-fade-up"
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                animationDelay: '350ms',
                transition: 'color var(--transition-fast)',
              }}
            >
              What is this podcast? &#8595;
            </a>
          </div>

          {/* Right: animated hero globe */}
          <div
            className="animate-fade-up"
            style={{
              aspectRatio: '1',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              maxWidth: '480px',
              width: '100%',
              margin: '0 auto',
              background: 'linear-gradient(145deg, #0D1E1C 0%, #1A3B37 45%, #2A6B62 100%)',
              position: 'relative',
              animationDelay: '300ms',
            }}
          >
            {/* Subtle coral radial accent */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 75% 20%, rgba(212,97,74,0.18) 0%, transparent 55%)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />
            <HeroGlobeWrapper />
          </div>
        </div>
      </section>

      {/* ——— About the Show ——— */}
      <section
        id="about-section"
        style={{ padding: '5rem var(--gutter)', borderTop: '1px solid var(--border)' }}
      >
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <div style={{ maxWidth: 'var(--content-width)', marginBottom: '3rem' }}>
            <ScrollReveal>
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
                The Show
              </p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant, var(--font-display))',
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                  marginBottom: '2rem',
                }}
              >
                The perspectives of those innovating in underserved settings are sorely missing from digital health.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={130}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
                GPODH exists to change that. The show brings together clinicians, founders, researchers, and policy makers who are doing real work in digital health in contexts that rarely make it onto the main stage.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Every episode asks a version of the same question: what does it actually take to make digital health work for the communities that need it most?
              </p>
            </ScrollReveal>
          </div>

          {/* Three question cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {showCards.map((card, i) => (
              <ScrollReveal key={card.eyebrow} delay={i * 80}>
                <div
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.75rem',
                    height: '100%',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.12em',
                      color: 'var(--accent-coral)',
                      textTransform: 'uppercase',
                      marginBottom: '0.875rem',
                    }}
                  >
                    {card.eyebrow}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9375rem' }}>
                    {card.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Who listens / You will hear ——— */}
      <section
        style={{
          background: 'var(--bg-secondary)',
          padding: '5rem var(--gutter)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '3rem',
          }}
        >
          <ScrollReveal>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant, var(--font-display))',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '1.5rem',
                }}
              >
                Who listens
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {audienceList.map((item) => (
                  <li key={item} style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.625rem' }}>
                    <span style={{ color: 'var(--accent-coral)', flexShrink: 0 }}>&#8594;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant, var(--font-display))',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '1.5rem',
                }}
              >
                You will hear
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {youllHear.map((item) => (
                  <li key={item} style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.625rem' }}>
                    <span style={{ color: 'var(--accent-coral)', flexShrink: 0 }}>&#8594;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ——— Stats Band ——— */}
      <ScrollReveal>
        <section
          style={{
            background: 'var(--accent-coral)',
            padding: '4rem var(--gutter)',
          }}
        >
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
            <p
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.5875rem',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginBottom: '3rem',
              }}
            >
              By the numbers
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '2.5rem 1rem',
              }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '0.75rem',
                  }}
                >
                  {/* Icon */}
                  <div style={{ color: 'rgba(255,255,255,0.85)' }}>
                    {stat.icon}
                  </div>

                  {/* Value */}
                  <p
                    style={{
                      fontFamily: 'var(--font-cormorant, var(--font-display))',
                      fontSize: 'clamp(2.5rem, 4vw, 3.75rem)',
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </p>

                  {/* Label */}
                  <p
                    style={{
                      fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                      fontSize: '0.625rem',
                      letterSpacing: '0.14em',
                      color: 'rgba(255,255,255,0.6)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {stat.label}
                  </p>

                  {/* Detail */}
                  {stat.detail && (
                    <p
                      style={{
                        fontSize: '0.8125rem',
                        color: 'rgba(255,255,255,0.55)',
                        lineHeight: 1.55,
                        maxWidth: '18ch',
                      }}
                    >
                      {stat.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ——— Globe ——— */}
      <GlobeSection />

      {/* ——— Latest Episodes ——— */}
      <section style={{ padding: '5rem var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '2.5rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <ScrollReveal>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.12em',
                    color: 'var(--accent-coral)',
                    textTransform: 'uppercase',
                    marginBottom: '0.625rem',
                  }}
                >
                  LATEST EPISODES
                </p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2
                  style={{
                    fontFamily: 'var(--font-cormorant, var(--font-display))',
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}
                >
                  Recent conversations
                </h2>
              </ScrollReveal>
            </div>
            <Link
              href="/episodes"
              style={{
                fontSize: '0.875rem',
                color: 'var(--accent-coral)',
                textDecoration: 'none',
              }}
            >
              View all episodes &#8594;
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
              gap: '1.5rem',
            }}
          >
            {latestEpisodes.map((episode, i) => (
              <ScrollReveal key={episode.id} delay={i * 80}>
                <EpisodeCard episode={episode} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Testimonials ——— */}
      <section
        style={{
          background: 'var(--bg-secondary)',
          padding: '5rem var(--gutter)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '2rem',
          }}
        >
          {testimonials.map((quote, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <blockquote
                style={{
                  borderLeft: '3px solid var(--accent-coral)',
                  paddingLeft: '1.5rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant, var(--font-display))',
                    fontSize: '1.25rem',
                    fontStyle: 'italic',
                    color: 'var(--text-primary)',
                    lineHeight: 1.6,
                  }}
                >
                  &ldquo;{quote}&rdquo;
                </p>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ——— Email Subscribe ——— */}
      <EmailSignup />

      {/* ——— Meet the Host ——— */}
      <section style={{ padding: '5rem var(--gutter)' }}>
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Left: text */}
          <div>
            <ScrollReveal>
              <p
                style={{
                  fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  color: 'var(--accent-coral)',
                  textTransform: 'uppercase',
                  marginBottom: '0.625rem',
                }}
              >
                Your Host
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant, var(--font-display))',
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.2,
                }}
              >
                Dr Shubs Upadhyay
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  Shubs is a physician, digital health strategist, and the founder of this podcast. He trained in medicine in the UK and has spent the past decade working at the intersection of clinical practice, health technology, and global health systems.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  His consulting work through SandiQ Global takes him across health systems in Sub-Saharan Africa, South Asia, the Middle East, and beyond. He has advised health ministries, large NGOs, digital health startups, and institutional investors on strategy, evidence, and implementation.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  He started GPODH because the conversations he was having privately deserved a much wider audience. He noticed that the same founders, the same researchers, the same clinicians kept saying the same thing: nobody is talking about this publicly, and nobody outside our region seems to care.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  This podcast is his attempt to fix that.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.625rem',
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                }}
              >
                {['Physician', 'Digital Health Strategist', 'Founding Partner, SandiQ Global', 'Podcast Host'].map((cred) => (
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
            </ScrollReveal>
            <ScrollReveal delay={230}>
              <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '2rem' }}>
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.875rem', color: 'var(--accent-coral)', textDecoration: 'none' }}
                >
                  LinkedIn &#8599;
                </a>
                <a
                  href={SOCIAL.substack}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.875rem', color: 'var(--accent-coral)', textDecoration: 'none' }}
                >
                  Substack &#8599;
                </a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={260}>
              <SandiQBridge variant="card" />
            </ScrollReveal>
          </div>

          {/* Right: portrait placeholder */}
          <div
            style={{
              aspectRatio: '1',
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '400px',
              width: '100%',
              margin: '0 auto',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: '3rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
              }}
            >
              SU
            </span>
          </div>
        </div>
      </section>

      {/* ——— Platform Follow ——— */}
      <section
        style={{
          padding: '3.5rem var(--gutter)',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
        }}
      >
        <ScrollReveal>
          <p
            style={{
              fontFamily: 'var(--font-dm-mono, var(--font-mono))',
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            LISTEN AND FOLLOW ON
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <PlatformBadge platform="apple" href={PLATFORMS.apple} />
            <PlatformBadge platform="spotify" href={PLATFORMS.spotify} />
            <PlatformBadge platform="youtube" href={PLATFORMS.youtube} />
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
