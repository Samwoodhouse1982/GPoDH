import Link from 'next/link'
import Image from 'next/image'
import VideoCard from '@/components/ui/VideoCard'
import LatestEpisodesCarousel from '@/components/sections/LatestEpisodesCarousel'
import ScrollReveal from '@/components/ui/ScrollReveal'
import EmailSignup from '@/components/sections/EmailSignup'
import GlobeSection from '@/components/sections/GlobeSection'
import HeroGlobeWrapper from '@/components/ui/HeroGlobeWrapper'
import OrgMarquee from '@/components/ui/OrgMarquee'
import HostIntroStrip from '@/components/ui/HostIntroStrip'
import TrailerModal from '@/components/ui/TrailerModal'
import { episodes } from '@/lib/episodes'
import { videos } from '@/lib/videos'

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
    accent: '#3EC9A7',
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
    borderColor: 'rgba(212,97,74,0.35)',
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
    borderColor: 'rgba(224,156,42,0.35)',
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
    accent: '#3EC9A7',
    borderColor: 'rgba(62,201,167,0.35)',
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
    accent: '#5BB8D4',
    borderColor: 'rgba(91,184,212,0.35)',
    motionClass: 'icon-float',
  },
]

export default function HomePage() {
  const latestEpisodes = [...episodes]
    .sort((a, b) => (Number(b.episodeNumber) || 0) - (Number(a.episodeNumber) || 0))
    .slice(0, 6)


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
              The podcast that shares stories from people doing AI and digital health in low-resourced settings, because health inequalities are everywhere and the lessons travel.
            </p>
            <div
              className="animate-fade-up"
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', animationDelay: '350ms' }}
            >
              <Link
                href="/episodes"
                style={{
                  display: 'inline-block',
                  padding: '0.875rem 1.75rem',
                  background: 'var(--accent-coral)',
                  color: '#fff',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Listen to episodes &#8594;
              </Link>
              <a
                href="#about-section"
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  transition: 'color var(--transition-fast)',
                }}
              >
                What is this podcast? &#8595;
              </a>
            </div>
          </div>

          {/* Right: animated hero globe */}
          <div
            className="animate-fade-up"
            style={{
              aspectRatio: '1',
              maxWidth: '480px',
              width: '100%',
              margin: '0 auto',
              animationDelay: '300ms',
            }}
          >
            <HeroGlobeWrapper />
          </div>
        </div>
      </section>

      {/* ——— Gradient divider ——— */}
      <div style={{ height: '3px', background: 'linear-gradient(to right, var(--accent-coral), #3EC9A7, var(--accent-coral))' }} />

      {/* ——— About the Show ——— */}
      <section
        id="about-section"
        style={{
          padding: '5rem var(--gutter)',
          background: 'radial-gradient(ellipse at 0% 80%, rgba(212,97,74,0.06) 0%, transparent 55%), var(--bg-primary)',
        }}
      >
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
              marginBottom: '3rem',
            }}
          >
            {/* Text */}
            <div>
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
                  The dominant narrative in digital health flows outward from the Global North. But the unmet need, and the extraordinary work being done to meet it, exists everywhere. GPODH exists to change that. The show brings together clinicians, founders, researchers, and policy makers who are doing real work in digital health in contexts that rarely make it onto the main stage.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  Every episode asks a version of the same question: what does it actually take to make digital health work for the communities that need it most?
                </p>
              </ScrollReveal>
            </div>

            {/* Trailer video */}
            <ScrollReveal delay={200}>
              <p
                style={{
                  fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                  fontSize: '0.6rem',
                  letterSpacing: '0.14em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                Watch the trailer
              </p>
              <TrailerModal />
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

      {/* ——— Compact host intro ——— */}
      <HostIntroStrip />

      {/* ——— Promo photo strip ——— */}
      <section style={{ position: 'relative', overflow: 'hidden', height: 'clamp(280px, 35vw, 440px)' }}>
        <Image
          src="/shubs-interview.jpg"
          alt="Shubs Upadhyay interviewing a guest at HLTH Conference"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 42%' }}
          sizes="100vw"
        />
        {/* Right-side gradient — Shubs is on the left, text sits on the darkened right */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to left, rgba(15,12,10,0.82) 0%, rgba(15,12,10,0.6) 40%, rgba(15,12,10,0.08) 68%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          padding: '0 var(--gutter)',
        }}>
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ maxWidth: '460px', textAlign: 'right' }}>
              <p style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.625rem',
                letterSpacing: '0.16em',
                color: 'var(--accent-coral)',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}>
                In the room
              </p>
              <blockquote style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)',
                fontWeight: 700,
                fontStyle: 'italic',
                color: '#fff',
                lineHeight: 1.2,
                margin: '0 0 1.25rem',
              }}>
                &ldquo;Getting the conversations that never make it onto the main stage.&rdquo;
              </blockquote>
              <p style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.625rem',
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
              }}>
                Dr Shubs Upadhyay &middot; HLTH Conference
              </p>
            </div>
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
                    border: `1px solid ${persona.borderColor}`,
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

        </div>
      </section>

      {/* ——— Testimonials ——— */}
      <section style={{ background: 'linear-gradient(120deg, #C4522A 0%, #D4614A 40%, #C9933A 100%)', padding: '4rem var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <ScrollReveal>
            <p style={{
              fontFamily: 'var(--font-dm-mono, var(--font-mono))',
              fontSize: '0.625rem',
              letterSpacing: '0.16em',
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
              marginBottom: '2.5rem',
              textAlign: 'center',
            }}>
              What listeners say
            </p>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem' }}>
            {testimonials.map((quote, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <blockquote style={{ borderLeft: '3px solid rgba(255,255,255,0.4)', paddingLeft: '1.5rem' }}>
                  <p style={{
                    fontFamily: 'var(--font-cormorant, var(--font-display))',
                    fontSize: '1.25rem',
                    fontStyle: 'italic',
                    color: '#ffffff',
                    lineHeight: 1.6,
                  }}>
                    &ldquo;{quote}&rdquo;
                  </p>
                </blockquote>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Globe ——— */}
      <GlobeSection />

      {/* ——— Org Marquee ——— */}
      <div>
        <p style={{
          textAlign: 'center',
          fontFamily: 'var(--font-dm-mono, var(--font-mono))',
          fontSize: '0.625rem',
          letterSpacing: '0.14em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          padding: '2rem 0 0.75rem',
        }}>
          Guests represent organisations including
        </p>
        <OrgMarquee />
      </div>

      {/* ——— Latest Episodes ——— */}
      <section style={{ padding: '5rem var(--gutter)', background: 'radial-gradient(ellipse at 100% 0%, rgba(62,201,167,0.06) 0%, transparent 55%), var(--bg-primary)' }}>
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

      {/* ——— Email Subscribe ——— */}
      <EmailSignup />

      {/* ——— Platform Follow ——— */}
      <section
        style={{
          padding: '5rem var(--gutter)',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
          background: 'var(--bg-secondary)',
        }}
      >
        <ScrollReveal>
          <p
            style={{
              fontFamily: 'var(--font-cormorant, var(--font-display))',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem',
              lineHeight: 1.2,
            }}
          >
            Ready to listen?
          </p>
          <p
            style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              marginBottom: '2rem',
            }}
          >
            Browse all episodes and find where to start.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <Link
              href="/episodes"
              style={{
                display: 'inline-block',
                padding: '0.875rem 1.75rem',
                background: 'var(--accent-coral)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9375rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Browse all episodes &#8594;
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
