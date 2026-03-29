import type { Metadata } from 'next'
import SandiQBridge from '@/components/ui/SandiQBridge'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Resources — GPODH',
  description: 'An ongoing list of great resources from the podcast and beyond — articles, organisations, and tools at the intersection of digital health and underserved communities.',
}

interface Resource {
  label: string
  description: string
  url?: string
}

interface ResourceCategory {
  title: string
  items: Resource[]
}

const resourceCategories: ResourceCategory[] = [
  {
    title: 'Articles and resources from the podcast or otherwise noteworthy',
    items: [
      {
        label: 'Standing Together Initiative',
        description: 'I spoke to Dr Xiao Liu in Episode 1 about what actionable things we can do about health data poverty. This is a great resource.',
      },
      {
        label: "Rowena Luk's Africa Health Ventures",
        description: 'About the digital health investment landscape in Africa. Listen to my discussion with Rowena on Episode 14.',
      },
      {
        label: 'The Agency Fund',
        description: 'I like their view on what needs to change in funding.',
      },
      {
        label: 'The 5 Stages of Regulatory Grief',
        description: 'Regulatory expert Hugh Harvey of Hardian Health, who I spoke to in Episode 13, wrote and spoke about this excellent article on regulatory strategy pitfalls.',
      },
      {
        label: 'Seyi Abimbola: The Foreign Gaze',
        description: 'Seyi writes compellingly about how global health needs to change. He recently published a book called The Foreign Gaze. Read it. Be changed.',
      },
      {
        label: 'Community Health Impact Coalition: Community Health Worker video series',
        description: 'Check out their series on community health workers. Essential viewing.',
      },
    ],
  },
  {
    title: 'For Implementers',
    items: [
      {
        label: 'Geneva Digital Health Hub',
        description: 'GDHD lead a great community called Implementome — for anyone implementing digital health and AI tools across the world. Also a great conference every year. Check out the episode I did with GDHD director Caroline Perrin (episode 15).',
      },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          padding: '8rem var(--gutter) 4rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto' }}>
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
              Resources
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1
              style={{
                fontFamily: 'var(--font-cormorant, var(--font-display))',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
              }}
            >
              Where can I connect to other great work in this space?
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              This is an ongoing list of awesome resources I collect along the way. I&rsquo;ll categorise them as usefully as possible over time. Aside from my own musings on{' '}
              <a
                href="https://shubstack.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent-coral)', textDecoration: 'none' }}
              >
                Shubstack
              </a>
              {' '}where I regularly write about current issues and reflect on podcast conversations, here are some recommended resources.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Resources */}
      <section style={{ padding: '4rem var(--gutter) 5rem' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4rem',
              marginBottom: '4rem',
            }}
          >
            {resourceCategories.map((category, ci) => (
              <ScrollReveal key={category.title} delay={ci * 60}>
                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-cormorant, var(--font-display))',
                      fontSize: '1.625rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '1.5rem',
                      paddingBottom: '0.75rem',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    {category.title}
                  </h2>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {category.items.map((item, i) => (
                      <li
                        key={item.label}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'minmax(min(100%, 240px), 1fr) 2fr',
                          gap: '1.5rem 2.5rem',
                          padding: '1.25rem 0',
                          borderBottom: i < category.items.length - 1 ? '1px solid var(--border)' : 'none',
                          alignItems: 'start',
                        }}
                      >
                        <div>
                          {item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontSize: '0.9375rem',
                                fontWeight: 600,
                                color: 'var(--accent-coral)',
                                textDecoration: 'none',
                                lineHeight: 1.5,
                                fontFamily: 'var(--font-dm-sans, sans-serif)',
                              }}
                              className="resource-link"
                            >
                              {item.label} ↗
                            </a>
                          ) : (
                            <p
                              style={{
                                fontSize: '0.9375rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                lineHeight: 1.5,
                                margin: 0,
                                fontFamily: 'var(--font-dm-sans, sans-serif)',
                              }}
                            >
                              {item.label}
                            </p>
                          )}
                        </div>
                        <p
                          style={{
                            fontSize: '0.9375rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.7,
                            margin: 0,
                          }}
                        >
                          {item.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div
              style={{
                padding: '1.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '3rem',
              }}
            >
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                This list is updated periodically. Got a recommendation?{' '}
                <a href="mailto:hello@shubs.me" style={{ color: 'var(--accent-coral)' }}>hello@shubs.me</a>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <SandiQBridge variant="inline" />
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        .resource-link:hover { opacity: 0.8; }
      `}</style>
    </>
  )
}
