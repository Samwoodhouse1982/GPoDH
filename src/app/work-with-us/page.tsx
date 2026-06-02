import type { Metadata } from 'next'
import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import RichText from '@/components/ui/RichText'
import content from '@/data/site/work-with-us.json'

export const metadata: Metadata = {
  title: 'Work With Us',
}

export default function WorkWithUsPage() {
  const { partnerships, photos, consulting } = content
  return (
    <>
      {/* ——— Podcast Partnerships ——— */}
      <section style={{ padding: '10rem var(--gutter) 4rem', borderBottom: '1px solid var(--border)' }}>
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
                {partnerships.eyebrow}
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
                {partnerships.title}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <RichText style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                {partnerships.intro}
              </RichText>
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
                {partnerships.stats.map((stat, i) => (
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
                  {partnerships.audienceLabel}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', justifyContent: 'center' }}>
                  {partnerships.audienceTypes.map((type) => (
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
                href={partnerships.primaryCta.url}
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
                {partnerships.primaryCta.text}
              </a>
              <p style={{ marginTop: '0.625rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {partnerships.primaryCta.note}
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
              {partnerships.optionsHeading}
            </h2>
          </ScrollReveal>

          {partnerships.optionGroups.map((section, si) => (
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
                      <RichText style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        {option.description}
                      </RichText>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
          <div style={{ marginBottom: '3rem' }} />

          <ScrollReveal>
            <RichText style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.9375rem' }}>
              {partnerships.closingBody}
            </RichText>
            <a
              href={partnerships.closingCta.url}
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
              {partnerships.closingCta.text}
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
        {photos.map((photo, i) => (
          <div key={photo.src} style={{ position: 'relative', overflow: 'hidden' }}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              style={{ objectFit: 'cover', objectPosition: photo.position }}
              sizes="50vw"
            />
          </div>
        ))}
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
            {content.consultingLabel}
          </span>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--accent-coral)', opacity: 0.4 }} />
        </div>
      </div>

      {/* ——— Consulting Section ——— */}
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
                {consulting.title}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <RichText style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.0625rem', marginBottom: '2rem', maxWidth: '46ch' }}>
                {consulting.body}
              </RichText>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-accent)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                }}
              >
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
                  {consulting.whoLabel}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.75rem' }}>
                  {consulting.who.map((who) => (
                    <div key={who} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <span
                        aria-hidden
                        style={{
                          color: 'var(--accent-coral)',
                          fontWeight: 700,
                          lineHeight: 1.6,
                          flexShrink: 0,
                        }}
                      >
                        &#8594;
                      </span>
                      <span style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.6 }}>
                        {who}
                      </span>
                    </div>
                  ))}
                </div>

                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    marginBottom: '1.75rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--border)',
                  }}
                >
                  {consulting.trustNote}
                </p>

                <a
                  href={consulting.cta.url}
                  style={{
                    display: 'inline-block',
                    padding: '0.7rem 1.5rem',
                    background: 'var(--accent-coral)',
                    color: '#fff',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                    textDecoration: 'none',
                  }}
                >
                  {consulting.cta.text}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
