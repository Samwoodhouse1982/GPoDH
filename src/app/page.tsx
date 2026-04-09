import Link from 'next/link'
import VideoCard from '@/components/ui/VideoCard'
import LatestEpisodesCarousel from '@/components/sections/LatestEpisodesCarousel'
import PlatformBadge from '@/components/ui/PlatformBadge'
import SandiQBridge from '@/components/ui/SandiQBridge'
import ScrollReveal from '@/components/ui/ScrollReveal'
import EmailSignup from '@/components/sections/EmailSignup'
import GlobeSection from '@/components/sections/GlobeSection'
import HeroGlobeWrapper from '@/components/ui/HeroGlobeWrapper'
import { episodes } from '@/lib/episodes'
import { videos } from '@/lib/videos'
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
    accent: 'var(--accent-coral)',
  },
  {
    eyebrow: 'LEARNING',
    text: 'What can high-income country health systems learn from the ingenuity and constraint-led innovation happening elsewhere?',
    accent: 'var(--accent-amber)',
  },
  {
    eyebrow: 'THE BIG PICTURE',
    text: 'How do we build a more equitable global digital health ecosystem, and who needs to be in the room?',
    accent: 'var(--accent-teal)',
  },
]

const listenerPersonas = [
  {
    label: 'Clinicians',
    description: 'Curious about digital health beyond your own system',
    tags: ['Physicians', 'Nurses', 'Allied Health'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v8M8 12h8"/>
      </svg>
    ),
    accent: 'var(--accent-coral)',
    motionClass: 'icon-heartbeat',
  },
  {
    label: 'Digital Health',
    description: 'Building tools for or entering emerging markets',
    tags: ['Founders', 'Product', 'Consultants'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21h6M12 3C8.686 3 6 5.686 6 9c0 2.21 1.197 4.14 3 5.197V17a1 1 0 001 1h4a1 1 0 001-1v-2.803C16.803 13.14 18 11.21 18 9c0-3.314-2.686-6-6-6z"/>
      </svg>
    ),
    accent: 'var(--accent-amber)',
    motionClass: 'icon-glow',
  },
  {
    label: 'Global Health',
    description: 'Navigating digital transformation on the ground',
    tags: ['NGOs', 'Policy', 'Researchers'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    accent: 'var(--accent-teal)',
    motionClass: 'icon-spin',
  },
  {
    label: 'Funders',
    description: 'Tracking where health tech is heading in emerging markets',
    tags: ['Investors', 'Philanthropy', 'Development Funds'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    accent: '#2A6B8A',
    motionClass: 'icon-float',
  },
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
]

export default function HomePage() {
  const latestEpisodes = episodes.slice(0, 6)

  return (
    <>
      {/* ——— Hero ——— */}
      <section
        style={{
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
          padding: '8rem var(--gutter) 4rem',
          background: 'radial-gradient(ellipse at 90% 10%, rgba(212,97,74,0.07) 0%, transparent 55%), radial-gradient(ellipse at 5% 85%, rgba(224,156,42,0.05) 0%, transparent 50%), var(--bg-primary)',
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '1.5rem',
            }}
          >
            {showCards.map((card, i) => (
              <ScrollReveal key={card.eyebrow} delay={i * 80}>
                <div
                  style={{
                    position: 'relative',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderTop: `4px solid ${card.accent}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.25rem',
                    height: '100%',
                    overflow: 'hidden',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                  }}
                >
                  <span aria-hidden style={{
                    position: 'absolute',
                    bottom: '-0.75rem',
                    right: '1.25rem',
                    fontSize: '9rem',
                    fontFamily: 'var(--font-cormorant, serif)',
                    fontWeight: 700,
                    color: card.accent,
                    opacity: 0.07,
                    lineHeight: 1,
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}>?</span>
                  <p
                    style={{
                      fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.15em',
                      color: card.accent,
                      textTransform: 'uppercase',
                      marginBottom: '1rem',
                    }}
                  >
                    {card.eyebrow}
                  </p>
                  <p style={{
                    color: 'var(--text-primary)',
                    lineHeight: 1.65,
                    fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                    fontWeight: 500,
                    position: 'relative',
                  }}>
                    {card.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Who listens ——— */}
      <style>{`
        @keyframes heartbeat {
          0%, 60%, 100% { transform: scale(1); }
          50%            { transform: scale(1.22); }
          55%            { transform: scale(1.1); }
        }
        .icon-heartbeat { animation: heartbeat 2.2s ease-in-out infinite; }

        @keyframes bulb-blink {
          0%, 3%    { opacity: 0.15; filter: none; }
          12%, 62%  { opacity: 1; filter: drop-shadow(0 0 8px rgba(224,156,42,0.9)) drop-shadow(0 0 20px rgba(224,156,42,0.35)); }
          67%       { opacity: 0.08; filter: none; }
          70%       { opacity: 0.85; filter: drop-shadow(0 0 5px rgba(224,156,42,0.6)); }
          73%       { opacity: 0.08; filter: none; }
          78%, 97%  { opacity: 1; filter: drop-shadow(0 0 8px rgba(224,156,42,0.9)) drop-shadow(0 0 20px rgba(224,156,42,0.35)); }
          100%      { opacity: 0.15; filter: none; }
        }
        .icon-glow { animation: bulb-blink 5s ease-in-out infinite; }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .icon-spin { animation: spin-slow 14s linear infinite; }

        @keyframes draw-main {
          0%, 5%    { stroke-dashoffset: 40; }
          40%, 75%  { stroke-dashoffset: 0; }
          90%, 100% { stroke-dashoffset: 40; }
        }
        @keyframes draw-arrow {
          0%, 18%   { stroke-dashoffset: 15; }
          50%, 75%  { stroke-dashoffset: 0; }
          90%, 100% { stroke-dashoffset: 15; }
        }
        .icon-float svg polyline:first-child {
          stroke-dasharray: 40;
          animation: draw-main 3.5s ease-in-out infinite;
        }
        .icon-float svg polyline:last-child {
          stroke-dasharray: 15;
          animation: draw-arrow 3.5s ease-in-out infinite;
        }
      `}</style>
      <section
        style={{
          background: 'var(--bg-dark)',
          padding: '6rem var(--gutter)',
        }}
      >
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>

          <ScrollReveal>
            <div style={{ marginBottom: '3.5rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.15em',
                  color: 'var(--accent-coral)',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                Who listens
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant, var(--font-display))',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.2,
                  maxWidth: '36rem',
                }}
              >
                Find your place in this conversation.
              </h2>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap: '1.25rem',
              marginBottom: '4rem',
            }}
          >
            {listenerPersonas.map((persona, i) => (
              <ScrollReveal key={persona.label} delay={i * 70}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '2.25rem 1.5rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 'var(--radius-lg)',
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      border: `2px solid ${persona.accent}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                      color: persona.accent,
                      flexShrink: 0,
                    }}
                  >
                    <div className={persona.motionClass} style={{ display: 'flex' }}>
                      {persona.icon}
                    </div>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant, var(--font-display))',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      marginBottom: '0.5rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {persona.label}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.58)', lineHeight: 1.6 }}>
                    {persona.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', justifyContent: 'center', marginTop: '0.875rem' }}>
                    {persona.tags.map(tag => (
                      <span key={tag} style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '100px',
                        border: `1px solid ${persona.accent}`,
                        fontSize: '0.6875rem',
                        color: persona.accent,
                        fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                        letterSpacing: '0.05em',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={200}>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.45)',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                You will hear
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                {youllHear.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.72)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '100px',
                      padding: '0.5rem 1rem',
                    }}
                  >
                    <span style={{ color: 'var(--accent-coral)', fontSize: '0.75rem' }}>&#8594;</span>
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
            background: 'linear-gradient(120deg, #C4522A 0%, #D4614A 40%, #C9933A 100%)',
            padding: '4rem var(--gutter)',
          }}
        >
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
            <p
              style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.82)',
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
                      fontSize: '0.75rem',
                      letterSpacing: '0.14em',
                      color: 'rgba(255,255,255,0.88)',
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
                        color: 'rgba(255,255,255,0.85)',
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

          <LatestEpisodesCarousel episodes={latestEpisodes} />
        </div>
      </section>

      {/* ——— Featured Videos ——— */}
      {videos.length > 0 && (
        <section
          style={{
            padding: '5rem var(--gutter)',
            borderTop: '1px solid var(--border)',
          }}
        >
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
                    Watch
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
                    From the GPODH archive
                  </h2>
                </ScrollReveal>
              </div>
              <Link
                href="/videos"
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--accent-coral)',
                  textDecoration: 'none',
                }}
              >
                View all videos &#8594;
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                gap: '1.5rem',
              }}
            >
              {videos.slice(0, 3).map((video, i) => (
                <ScrollReveal key={video.id} delay={i * 80}>
                  <VideoCard video={video} index={i} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

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
