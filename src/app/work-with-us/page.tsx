import type { Metadata } from 'next'
import Image from 'next/image'
import SandiQBridge from '@/components/ui/SandiQBridge'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Work With Us',
}

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
          <ScrollReveal delay={180}>
            <div
              style={{
                marginBottom: '3.5rem',
                background: 'var(--bg-dark)',
                borderRadius: 'var(--radius-lg)',
                borderTop: '4px solid var(--accent-coral)',
                padding: 'clamp(2rem, 4vw, 3rem)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Big numbers row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '0',
                  marginBottom: '2.25rem',
                }}
              >
                {[
                  { value: '60+', label: 'Countries reached' },
                  { value: 'Thousands', label: 'of specialist listeners' },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    style={{
                      textAlign: 'center',
                      padding: '0.5rem 2rem',
                      borderRight: i === 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-cormorant, var(--font-display))',
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        fontWeight: 700,
                        color: 'var(--accent-coral)',
                        lineHeight: 1,
                        marginBottom: '0.5rem',
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                        fontSize: '0.625rem',
                        letterSpacing: '0.13em',
                        color: 'rgba(255,255,255,0.55)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem' }} />

              {/* Audience type pills */}
              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                    fontSize: '0.625rem',
                    letterSpacing: '0.13em',
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  Core audience
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', justifyContent: 'center' }}>
                  {['Clinicians', 'Founders', 'NGOs & Policy', 'Investors'].map((type) => (
                    <span
                      key={type}
                      style={{
                        fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                        fontSize: '0.8125rem',
                        letterSpacing: '0.04em',
                        color: 'rgba(255,255,255,0.85)',
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.14)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.4rem 1rem',
                      }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div style={{ marginBottom: '2rem' }}>
              <a
                href="/contact"
                style={{
                  display: 'inline-block',
                  padding: '0.6rem 1.5rem',
                  background: 'var(--accent-coral)',
                  color: '#fff',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 500,
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                }}
              >
                Get in touch ›
              </a>
              <p style={{ marginTop: '0.625rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Get in touch for a conversation about fit and pricing.
              </p>
            </div>
          </ScrollReveal>

          {/* Collaboration options */}
          <ScrollReveal>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '2rem',
              }}
            >
              How to get involved
            </h2>
          </ScrollReveal>

          {[
            {
              group: 'Content Partnerships',
              options: [
                {
                  title: 'Sponsored Episodes',
                  description: 'Align your organisation with a specific episode or series. Your message reaches an engaged, specialist audience in the right context.',
                },
                {
                  title: 'Mini-Series',
                  description: 'Commission a short series of episodes around a theme relevant to your work. Ideal for investors and donors who want to build thought leadership.',
                },
                {
                  title: 'Video Conversations',
                  description: 'Long-form recorded conversations for your own channels. Shubs brings his clinical and strategic lens to interview your team or partners.',
                },
              ],
            },
            {
              group: 'Live & Events',
              options: [
                {
                  title: 'Webinar Hosting',
                  description: 'We host and moderate expert panels and webinars for organisations working in digital health. Structured, substantive, globally minded.',
                },
                {
                  title: 'Event Coverage',
                  description: 'On the ground at conferences and summits, capturing conversations and producing content that extends the life of the event.',
                },
              ],
            },
            {
              group: 'Community',
              options: [
                {
                  title: 'Propose a Session or Speaker',
                  description: 'Want us to explore a great story or talk to an incredible individual? Know someone doing fascinating work in digital health? Let us know. We\'re always looking for the next compelling conversation.',
                },
              ],
            },
          ].map((section, si) => (
            <div key={section.group} style={{ marginBottom: '2.5rem' }}>
              <ScrollReveal delay={si * 40}>
                <p style={{
                  fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}>
                  {section.group}
                </p>
              </ScrollReveal>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                  gap: '1.25rem',
                }}
              >
                {section.options.map((option, i) => (
                  <ScrollReveal key={option.title} delay={si * 40 + i * 60}>
                    <div
                      style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.75rem',
                        height: '100%',
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
            </div>
          ))}
          <div style={{ marginBottom: '3rem' }} />

          <ScrollReveal>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.9375rem' }}>
              To discuss a partnership, use the contact form and tell us what you have in mind.
            </p>
            <a
              href="/contact"
              style={{
                display: 'inline-block',
                padding: '0.6rem 1.5rem',
                background: 'var(--accent-coral)',
                color: '#fff',
                borderRadius: 'var(--radius-md)',
                fontWeight: 500,
                fontSize: '0.9375rem',
                textDecoration: 'none',
              }}
            >
              Get in touch ›
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ——— Photo strip ——— */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0',
          height: 'clamp(260px, 32vw, 420px)',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            src="/shubs-presenting.jpg"
            alt="Shubs presenting to an audience"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
            sizes="50vw"
          />
        </div>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            src="/shubs-hosting.jpg"
            alt="Shubs hosting a panel at IBIS Capital"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
            sizes="50vw"
          />
        </div>
      </div>

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
