import type { Metadata } from 'next'
import SandiQBridge from '@/components/ui/SandiQBridge'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Resources',
}

const resourceCategories = [
  {
    title: 'Evidence and Evaluation',
    items: [
      { label: 'MAPS Toolkit', description: 'WHO framework for mHealth assessment and planning.' },
      { label: 'GRADE Approach', description: 'Grading the quality of evidence for clinical decision making.' },
      { label: 'Digital Health Monitor', description: 'Tracking digital health policy progress globally.' },
    ],
  },
  {
    title: 'Global Health Frameworks',
    items: [
      { label: 'WHO Global Strategy on Digital Health 2020-2025', description: 'The foundational WHO framework for digital health.' },
      { label: 'ITU Digital Inclusion Framework', description: 'Addressing connectivity and access as prerequisites for digital health.' },
      { label: 'PHCPI Primary Health Care Framework', description: 'How digital tools fit into primary care strengthening.' },
    ],
  },
  {
    title: 'WHO and ITU Publications',
    items: [
      { label: 'Classification of Digital Health Interventions (WHO)', description: 'The taxonomy for understanding what digital health tools do.' },
      { label: 'Consolidated Telemedicine Implementation Guide (WHO)', description: 'Practical guidance for telemedicine deployment.' },
      { label: 'Digital Health Country Assessments (ITU/WHO)', description: 'Country-level readiness and capacity assessments.' },
    ],
  },
  {
    title: 'Recommended Reading',
    items: [
      { label: 'Innovations in Global Health Technology (Lancet Digital Health)', description: 'Peer-reviewed research on digital health in LMICs.' },
      { label: 'The Digital Health Atlas', description: 'Mapping digital health implementations across the world.' },
      { label: 'GSMA Mobile for Development Insights', description: 'How mobile technology is being used in emerging markets.' },
    ],
  },
  {
    title: 'Organisations Doing Good Work',
    items: [
      { label: 'Digital Square', description: 'A PATH-led initiative to strengthen global goods for digital health.' },
      { label: 'Access Health International', description: 'Advisory on health reform and systems strengthening.' },
      { label: 'Resolve to Save Lives', description: 'Cardiovascular disease prevention at scale in LMICs.' },
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
              RESOURCES
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
              Useful tools, frameworks, and reading.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              A curated list of resources relevant to the topics covered on the podcast. Frameworks, publications, and organisations working at the intersection of digital health and underserved communities.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Resources grid */}
      <section style={{ padding: '4rem var(--gutter) 5rem' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
              gap: '3rem',
              marginBottom: '4rem',
            }}
          >
            {resourceCategories.map((category, ci) => (
              <ScrollReveal key={category.title} delay={ci * 60}>
                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-cormorant, var(--font-display))',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '1.25rem',
                      paddingBottom: '0.75rem',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    {category.title}
                  </h2>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {category.items.map((item) => (
                      <li key={item.label}>
                        <p
                          style={{
                            fontSize: '0.9375rem',
                            fontWeight: 500,
                            color: 'var(--text-primary)',
                            marginBottom: '0.25rem',
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'flex-start',
                          }}
                        >
                          <span style={{ color: 'var(--accent-coral)', flexShrink: 0 }}>&#8594;</span>
                          {item.label}
                        </p>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6, paddingLeft: '1.25rem' }}>
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
                marginBottom: '2rem',
              }}
            >
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                This list is updated periodically. If you have a recommendation for a resource that should be here, send a note to{' '}
                <a href="mailto:hello@shubs.me" style={{ color: 'var(--accent-coral)' }}>hello@shubs.me</a>.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <SandiQBridge variant="inline" />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
