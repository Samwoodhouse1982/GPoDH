import type { Metadata } from 'next'
import SandiQBridge from '@/components/ui/SandiQBridge'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { SOCIAL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About',
}

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

const testimonials = [
  "It is so valuable to hear insights from people who have already gone through similar challenges.",
  "This perspective is sorely missing from our industry, so glad you are doing this.",
]

export default function AboutPage() {
  return (
    <>
      {/* ——— About the Show ——— */}
      <section style={{ padding: '8rem var(--gutter) 5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <div style={{ maxWidth: 'var(--content-width)', marginBottom: '3rem' }}>
            <ScrollReveal>
              <h1
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
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
                GPODH exists to change that. The show brings together clinicians, founders, researchers, and policy makers who are doing real work in digital health in contexts that rarely make it onto the main stage.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Every episode asks a version of the same question: what does it actually take to make digital health work for the communities that need it most?
              </p>
            </ScrollReveal>
          </div>

          {/* Three card questions */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '1.25rem',
              marginBottom: '4rem',
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

          {/* Who listens */}
          <div
            style={{
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
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '1.25rem',
                  }}
                >
                  Who listens
                </h2>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
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
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '1.25rem',
                  }}
                >
                  You will hear
                </h2>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
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
        </div>
      </section>

      {/* ——— About the Host ——— */}
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
                  marginBottom: '0.625rem',
                }}
              >
                YOUR HOST
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

            {/* Credentials */}
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

            <ScrollReveal delay={250}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
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

            <ScrollReveal delay={300}>
              <SandiQBridge variant="inline" />
            </ScrollReveal>
          </div>

          {/* Portrait placeholder */}
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

      {/* ——— Testimonials ——— */}
      <section
        style={{
          background: 'var(--bg-secondary)',
          padding: '5rem var(--gutter)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '2.5rem',
          }}
        >
          {testimonials.map((quote, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <blockquote style={{ borderLeft: '3px solid var(--accent-coral)', paddingLeft: '1.5rem' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant, var(--font-display))',
                    fontSize: '1.375rem',
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
    </>
  )
}
