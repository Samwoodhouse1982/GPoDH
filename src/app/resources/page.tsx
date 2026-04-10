import type { Metadata } from 'next'
import SandiQBridge from '@/components/ui/SandiQBridge'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { withUtm } from '@/lib/utm'

export const metadata: Metadata = {
  title: 'Resources | GPODH',
  description: 'An ongoing list of great resources from the podcast and beyond: articles, organisations, and tools at the intersection of digital health and underserved communities.',
}

interface Resource {
  label: string
  description: string
  url?: string
}

interface ResourceCategory {
  id: string
  title: string
  items: Resource[]
}

const resourceCategories: ResourceCategory[] = [
  {
    id: 'writing',
    title: 'Writing & insights from the show',
    items: [
      {
        label: 'Shubstack, Shubs\' newsletter',
        description: 'Our ongoing newsletter where we write about current issues in digital health, reflect on podcast conversations, and share perspectives on what\'s happening in the field. A good companion to the podcast.',
        url: 'https://shubstack.substack.com/',
      },
    ],
  },
  {
    id: 'articles',
    title: 'Articles and resources from the podcast or otherwise noteworthy',
    items: [
      {
        label: 'Standing Together Initiative',
        description: 'We spoke to Dr Xiao Liu in Episode 1 about what actionable things we can do about health data poverty. This is a great resource.',
      },
      {
        label: "Rowena Luk's Africa Health Ventures",
        description: 'About the digital health investment landscape in Africa. Listen to our discussion with Rowena on Episode 14.',
      },
      {
        label: 'The Agency Fund',
        description: 'We like their view on what needs to change in funding.',
      },
      {
        label: 'The 5 Stages of Regulatory Grief',
        description: 'Regulatory expert Hugh Harvey of Hardian Health, who we spoke to in Episode 13, wrote and spoke about this excellent article on regulatory strategy pitfalls.',
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
    id: 'implementers',
    title: 'For Implementers',
    items: [
      {
        label: 'Geneva Digital Health Hub',
        description: 'GDHD lead a great community called Implementome, for anyone implementing digital health and AI tools across the world. Also a great conference every year. Check out the episode we did with GDHD director Caroline Perrin (episode 15).',
      },
    ],
  },
  {
    id: 'evidence',
    title: 'Evidence and Evaluation',
    items: [
      {
        label: 'MAPS Toolkit',
        description: 'WHO framework for mHealth assessment and planning.',
        url: 'https://www.who.int/reproductivehealth/topics/mhealth/maps-toolkit/en/',
      },
      {
        label: 'GRADE Approach',
        description: 'Grading the quality of evidence for clinical decision making.',
        url: 'https://www.gradeworkinggroup.org/',
      },
      {
        label: 'Digital Health Monitor (WHO)',
        description: 'Tracking digital health policy progress globally.',
        url: 'https://digitalhealthmonitor.org/',
      },
    ],
  },
  {
    id: 'frameworks',
    title: 'Global Health Frameworks',
    items: [
      {
        label: 'WHO Global Strategy on Digital Health 2020–2025',
        description: 'The foundational WHO framework for digital health.',
        url: 'https://www.who.int/docs/default-source/documents/gs4dhdaa2a9f352b0445bafbc79ca03c2d.pdf',
      },
      {
        label: 'ITU Digital Inclusion Framework',
        description: 'Addressing connectivity and access as prerequisites for digital health.',
        url: 'https://www.itu.int/en/ITU-D/Digital-Inclusion/Pages/default.aspx',
      },
      {
        label: 'PHCPI Primary Health Care Framework',
        description: 'How digital tools fit into primary care strengthening.',
        url: 'https://improvingphc.org/',
      },
    ],
  },
  {
    id: 'who-itu',
    title: 'WHO and ITU Publications',
    items: [
      {
        label: 'Classification of Digital Health Interventions (WHO)',
        description: 'The taxonomy for understanding what digital health tools do.',
        url: 'https://www.who.int/reproductivehealth/publications/mhealth/classification-digital-health-interventions/en/',
      },
      {
        label: 'Consolidated Telemedicine Implementation Guide (WHO)',
        description: 'Practical guidance for telemedicine deployment.',
        url: 'https://www.who.int/publications/i/item/9789240050709',
      },
      {
        label: 'Digital Health Country Assessments (ITU/WHO)',
        description: 'Country-level readiness and capacity assessments.',
        url: 'https://www.itu.int/en/ITU-D/ICT-Applications/eHEALTH/Pages/default.aspx',
      },
    ],
  },
  {
    id: 'reading',
    title: 'Recommended Reading',
    items: [
      {
        label: 'Lancet Digital Health',
        description: 'Peer-reviewed research on digital health interventions, including extensive coverage of LMICs.',
        url: 'https://www.thelancet.com/journals/landig/home',
      },
      {
        label: 'The Digital Health Atlas',
        description: 'Mapping digital health implementations across the world.',
        url: 'https://digitalhealthatlas.org/',
      },
      {
        label: 'GSMA Mobile for Development Insights',
        description: 'How mobile technology is being used in emerging markets.',
        url: 'https://www.gsma.com/mobilefordevelopment/',
      },
    ],
  },
  {
    id: 'organisations',
    title: 'Organisations Doing Good Work',
    items: [
      {
        label: 'Digital Square',
        description: 'A PATH-led initiative to strengthen global goods for digital health.',
        url: 'https://digitalsquare.org/',
      },
      {
        label: 'Access Health International',
        description: 'Advisory on health reform and systems strengthening.',
        url: 'https://accessh.org/',
      },
      {
        label: 'Resolve to Save Lives',
        description: 'Cardiovascular disease prevention at scale in LMICs.',
        url: 'https://resolvetosavelives.org/',
      },
    ],
  },
  {
    id: 'funding',
    title: 'Accessing funding for LMIC digital health and AI projects: useful links',
    items: [
      {
        label: 'Grand Challenges Canada',
        description: 'Funds bold ideas with the potential to save and improve lives in LMICs, including digital health and AI applications. The Stars in Global Health programme is particularly relevant.',
        url: 'https://www.grandchallenges.ca/',
      },
      {
        label: 'Grand Challenges (Gates Foundation)',
        description: 'Open calls for innovation addressing health challenges in the developing world. Regularly funds digital health, diagnostics, and AI in global health.',
        url: 'https://gcgh.grandchallenges.org/',
      },
      {
        label: 'Wellcome Trust: Discovery Research and Innovations',
        description: 'Funds research across global health including digital and data science applications. Their health inequities and infectious disease portfolios are relevant to LMIC digital health.',
        url: 'https://wellcome.org/grant-funding',
      },
      {
        label: 'USAID Digital Development',
        description: "USAID's digital development team funds and supports digital tools and infrastructure in developing countries. Their Digital Strategy sets the framework.",
        url: 'https://www.usaid.gov/digital-development',
      },
      {
        label: 'IDRC: International Development Research Centre',
        description: 'Canadian public funder supporting research-based solutions in developing countries. Strong portfolio in digital health, AI for development, and data systems.',
        url: 'https://idrc.ca/',
      },
      {
        label: 'The Skoll Foundation',
        description: 'Supports social entrepreneurs tackling systemic global challenges. Several Skoll awardees work in digital health and health equity.',
        url: 'https://skoll.org/',
      },
      {
        label: 'Omidyar Network',
        description: 'Invests in market-based and policy approaches to increase inclusion and opportunity. Relevant for digital health ventures addressing underserved populations.',
        url: 'https://omidyar.com/',
      },
      {
        label: 'Google.org',
        description: "Google's philanthropic arm funds nonprofits and social enterprises using technology for social impact, including AI for health in underserved settings.",
        url: 'https://www.google.org/',
      },
      {
        label: 'Rockefeller Foundation: Health Initiative',
        description: 'Long-standing funder of global health innovation, with a focus on health system strengthening and equity. Active in digital health and AI.',
        url: 'https://www.rockefellerfoundation.org/initiative/health/',
      },
      {
        label: 'World Bank Digital Development Partnership',
        description: 'A multi-donor trust fund supporting countries in developing digital infrastructure and policies. Useful for government and systems-level digital health projects.',
        url: 'https://www.worldbank.org/en/programs/digital-development-partnership',
      },
      {
        label: 'The Global Fund',
        description: 'Primary funder of HIV, TB, and malaria programmes globally. Increasingly funds digital health components including surveillance, supply chain, and community health systems.',
        url: 'https://www.theglobalfund.org/',
      },
      {
        label: 'The Fleming Fund',
        description: 'UK-funded programme supporting countries in generating and using data to tackle antimicrobial resistance. A useful model for health data funding in LMICs.',
        url: 'https://www.flemingfund.org/',
      },
    ],
  },
]

// Short labels for quick nav
const NAV_LABELS: Record<string, string> = {
  writing: 'Writing',
  articles: 'Articles',
  implementers: 'Implementers',
  evidence: 'Evidence',
  frameworks: 'Frameworks',
  'who-itu': 'WHO / ITU',
  reading: 'Reading',
  organisations: 'Organisations',
  funding: 'Funding',
}

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
              Where can we connect to other great work in this space?
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              An ongoing list of resources we collect along the way. We&rsquo;ll add to it and categorise as usefully as possible over time. Alongside our writing on{' '}
              <a
                href={withUtm('https://shubstack.substack.com/', { campaign: 'resources', content: 'intro-shubstack' })}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent-coral)', textDecoration: 'none', fontWeight: 500 }}
              >
                Shubstack ↗
              </a>
              {' '}(where we regularly write about current issues and reflect on podcast conversations), here are our recommended resources.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Resources */}
      <section style={{ padding: '4rem var(--gutter) 5rem' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>

          {/* Quick navigation */}
          <ScrollReveal>
            <div style={{ marginBottom: '3rem' }}>
              <p style={{
                fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                fontSize: '0.625rem',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}>
                Jump to
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {resourceCategories.map(cat => (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: '100px',
                      border: '1px solid var(--border)',
                      fontSize: '0.8125rem',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                      background: 'var(--bg-card)',
                      transition: 'all 0.15s ease',
                    }}
                    className="resource-nav-pill"
                  >
                    {NAV_LABELS[cat.id] ?? cat.title}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4rem',
              marginBottom: '4rem',
            }}
          >
            {resourceCategories.map((category, ci) => (
              <ScrollReveal key={category.id} delay={ci * 40}>
                <div id={category.id}>
                  <h2
                    style={{
                      fontFamily: 'var(--font-cormorant, var(--font-display))',
                      fontSize: '1.625rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '1.5rem',
                      paddingBottom: '0.75rem',
                      borderBottom: '2px solid var(--accent-coral)',
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.75rem',
                    }}
                  >
                    {category.title}
                    <span style={{
                      fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                      fontSize: '0.625rem',
                      letterSpacing: '0.1em',
                      color: 'var(--accent-coral)',
                      textTransform: 'uppercase',
                      fontWeight: 400,
                    }}>
                      {category.items.length} {category.items.length === 1 ? 'item' : 'items'}
                    </span>
                  </h2>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {category.items.map((item, i) => (
                      <li
                        key={item.label}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'minmax(min(100%, 240px), 1fr) 2fr',
                          gap: '1.5rem 2.5rem',
                          padding: '1.25rem 0.75rem',
                          borderBottom: i < category.items.length - 1 ? '1px solid var(--border)' : 'none',
                          alignItems: 'start',
                          borderRadius: 'var(--radius-sm)',
                          background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)',
                        }}
                      >
                        <div>
                          {item.url ? (
                            <a
                              href={withUtm(item.url!, { campaign: 'resources', content: item.label.toLowerCase().replace(/\s+/g, '-').slice(0, 40) })}
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
                <a href="/contact" style={{ color: 'var(--accent-coral)' }}>Let us know</a>
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
        .resource-nav-pill:hover {
          border-color: var(--accent-coral) !important;
          color: var(--accent-coral) !important;
        }
      `}</style>
    </>
  )
}
