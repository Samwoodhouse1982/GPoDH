import type { Metadata } from 'next'
import ScrollReveal from '@/components/ui/ScrollReveal'
import RichText from '@/components/ui/RichText'
import { withUtm } from '@/lib/utm'
import content from '@/data/site/resources.json'

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
}

interface Resource {
  label: string
  description: string
  url?: string
  subgroup?: string
}

interface ResourceCategory {
  id: string
  title: string
  items: Resource[]
}

const { hero, shubstack, jumpToLabel, footerNote } = content
const resourceCategories = content.categories as ResourceCategory[]
const NAV_LABELS = content.navLabels as Record<string, string>

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          padding: 'clamp(7rem, 3rem + 11vw, 10rem) var(--gutter) 4rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <div style={{ maxWidth: 'var(--content-width)' }}>
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
              {hero.eyebrow}
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
                marginBottom: '1.5rem',
              }}
            >
              {hero.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <RichText style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {hero.intro}
            </RichText>
          </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Shubstack featured callout */}
      <section style={{ padding: '3rem var(--gutter) 0' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <ScrollReveal>
            <a
              href={withUtm(shubstack.url, { campaign: 'resources', content: 'shubstack-card' })}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block' }}
              className="shubstack-card"
            >
              <div
                style={{
                  background: 'var(--bg-dark)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(2rem, 4vw, 3rem)',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '2rem',
                  alignItems: 'center',
                  borderTop: '4px solid var(--accent-amber)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Background watermark */}
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    right: '-0.25rem',
                    bottom: '-1.5rem',
                    fontFamily: 'var(--font-cormorant, var(--font-display))',
                    fontSize: '12rem',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.03)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  S
                </span>

                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                      fontSize: '0.625rem',
                      letterSpacing: '0.14em',
                      color: 'var(--accent-amber)',
                      textTransform: 'uppercase',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {shubstack.eyebrow}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-cormorant, var(--font-display))',
                      fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.15,
                      marginBottom: '1rem',
                    }}
                  >
                    {shubstack.title}
                  </p>
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      color: 'rgba(255,255,255,0.65)',
                      lineHeight: 1.7,
                      maxWidth: '52ch',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {shubstack.body}
                  </p>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 1.5rem',
                      background: 'var(--accent-amber)',
                      color: '#fff',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    {shubstack.ctaText}
                  </span>
                </div>

                {/* Substack wordmark "S" badge */}
                <div
                  className="sub-badge"
                  style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '50%',
                    background: 'var(--accent-amber)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-cormorant, var(--font-display))',
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: '#fff',
                      lineHeight: 1,
                    }}
                  >
                    S
                  </span>
                </div>
              </div>
            </a>
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
                {jumpToLabel}
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
                    {category.items.flatMap((item, i) => {
                      const showSubgroupHeader = item.subgroup && (i === 0 || category.items[i - 1].subgroup !== item.subgroup)
                      const elements = []
                      if (showSubgroupHeader) {
                        elements.push(
                          <li key={`${item.subgroup}-header`} style={{ padding: '1.25rem 0.75rem 0.5rem', borderBottom: '1px solid var(--border)' }}>
                            <p style={{
                              fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                              fontSize: '0.625rem',
                              letterSpacing: '0.12em',
                              color: 'var(--text-muted)',
                              textTransform: 'uppercase',
                              margin: 0,
                            }}>{item.subgroup}</p>
                          </li>
                        )
                      }
                      elements.push(
                        <li
                          key={item.label}
                          className="resource-row"
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
                          <RichText
                            style={{
                              fontSize: '0.9375rem',
                              color: 'var(--text-secondary)',
                              lineHeight: 1.7,
                            }}
                          >
                            {item.description}
                          </RichText>
                        </li>
                      )
                      return elements
                    })}
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
              <RichText style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                {footerNote}
              </RichText>
            </div>
          </ScrollReveal>

        </div>
      </section>

      <style>{`
        /* Resource rows: stack label above description on phones (was a fixed
           2-column grid that forced horizontal page scroll). */
        @media (max-width: 640px) {
          .resource-row { grid-template-columns: 1fr !important; gap: 0.4rem 0 !important; }
        }
        /* Newsletter card: stack and drop the small badge (the watermark "S"
           already brands it) so the copy gets full width. */
        @media (max-width: 560px) {
          .shubstack-card > div { grid-template-columns: 1fr !important; }
          .sub-badge { display: none !important; }
        }
        .shubstack-card:hover > div { opacity: 0.92; }
        .resource-link:hover { opacity: 0.8; }
        .resource-nav-pill:hover {
          border-color: var(--accent-coral) !important;
          color: var(--accent-coral) !important;
        }
      `}</style>
    </>
  )
}
