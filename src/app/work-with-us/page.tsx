import type { Metadata } from 'next'
import SandiQBridge from '@/components/ui/SandiQBridge'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Work With Us',
}

const collaborationOptions = [
  {
    title: 'Propose a Session or Nominate a Speaker',
    description: 'Want us to explore a great story or talk to an incredible individual? Know someone doing fascinating work in digital health? Let us know — we\'re always looking for the next compelling conversation.',
  },
  {
    title: 'Sponsored Episodes',
    description: 'Align your organisation with a specific episode or series. Your message reaches an engaged, specialist audience in the right context.',
  },
  {
    title: 'Mini-Series',
    description: 'Commission a short series of episodes around a theme relevant to your work. Ideal for investors and donors who want to build thought leadership.',
  },
  {
    title: 'Webinar Hosting',
    description: 'We host and moderate expert panels and webinars for organisations working in digital health. Structured, substantive, globally minded.',
  },
  {
    title: 'Event Coverage',
    description: 'On the ground at conferences and summits, capturing conversations and producing content that extends the life of the event.',
  },
  {
    title: 'Video Conversations',
    description: 'Long-form recorded conversations for your own channels. Shubs brings his clinical and strategic lens to interview your team or partners.',
  },
]

const audienceStats = [
  { value: '60+', label: 'Countries represented' },
  { value: 'Thousands', label: 'of specialist listeners' },
  { value: 'Clinicians, Founders, Investors', label: 'Core audience types' },
]

export default function WorkWithUsPage() {
  return (
    <>
      {/* ——— Podcast Partnerships ——— */}
      <section style={{ padding: '8rem var(--gutter) 5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <div style={{ maxWidth: 'var(--content-width)', marginBottom: '3.5rem' }}>
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
                COLLABORATE WITH THE PODCAST
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1
                style={{
                  fontFamily: 'var(--font-cormorant, var(--font-display))',
                  fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1.1,
                  marginBottom: '1.5rem',
                }}
              >
                Work with an audience that actually cares.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                GPODH reaches a specialist global audience of clinicians, digital health founders, global health professionals, and investors. They are not passive listeners. They are practitioners who are actively building and funding the future of digital health in underserved settings.
              </p>
            </ScrollReveal>
          </div>

          {/* Audience stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3.5rem',
              padding: '2rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
            }}
          >
            {audienceStats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 80}>
                <div style={{ textAlign: 'center' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-cormorant, var(--font-display))',
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      lineHeight: 1.1,
                      marginBottom: '0.375rem',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Collaboration options */}
          <ScrollReveal>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
              }}
            >
              How to get involved
            </h2>
          </ScrollReveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap: '1.25rem',
              marginBottom: '3rem',
            }}
          >
            {collaborationOptions.map((option, i) => (
              <ScrollReveal key={option.title} delay={i * 60}>
                <div
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.75rem',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant, var(--font-display))',
                      fontSize: '1.375rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {option.title}
                  </h3>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {option.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9375rem' }}>
              To discuss a partnership, get in touch directly:
            </p>
            <a
              href={`mailto:${SITE.email}`}
              style={{
                color: 'var(--accent-coral)',
                fontWeight: 500,
                fontSize: '1rem',
              }}
            >
              {SITE.email}
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Coral divider with CONSULTING label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '0 var(--gutter)',
          margin: '3rem 0 0',
        }}
      >
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--accent-coral)', opacity: 0.4 }} />
          <span
            style={{
              fontFamily: 'var(--font-dm-mono, var(--font-mono))',
              fontSize: '0.6875rem',
              letterSpacing: '0.15em',
              color: 'var(--accent-coral)',
              textTransform: 'uppercase',
              flexShrink: 0,
            }}
          >
            CONSULTING
          </span>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--accent-coral)', opacity: 0.4 }} />
        </div>
      </div>

      {/* ——— SandiQ Bridge Section ——— */}
      <section style={{ padding: '3.5rem var(--gutter) 5rem' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <div style={{ maxWidth: 'var(--content-width)' }}>
            <ScrollReveal>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant, var(--font-display))',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '1.25rem',
                  lineHeight: 1.2,
                }}
              >
                Need more than a podcast appearance?
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                Through SandiQ Global, Shubs and the broader SandiQ network provide strategic consulting to companies, investors, and global organisations working in digital health. If you need clinical leadership, evidence strategy, market access support, or help navigating a specific health system context, that is the right conversation to have.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <SandiQBridge variant="card" />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
