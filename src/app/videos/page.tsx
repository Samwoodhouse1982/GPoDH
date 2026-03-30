import type { Metadata } from 'next'
import VideoCard from '@/components/ui/VideoCard'
import EmailSignup from '@/components/sections/EmailSignup'
import { videos } from '@/lib/videos'

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Talks, panels, and video content from Global Perspectives on Digital Health.',
}

export default function VideosPage() {
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
            Watch
          </p>
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
            Video content.
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Talks, panels, and video content from GPODH and Dr Shubs Upadhyay on AI and digital health in underserved settings.
          </p>
        </div>
      </section>

      {/* Video grid */}
      <section style={{ padding: '4rem var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          {videos.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                gap: '1.75rem',
              }}
            >
              {videos.map((video, i) => (
                <VideoCard key={video.id} video={video} index={i} />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div
              style={{
                textAlign: 'center',
                padding: '6rem 0',
                maxWidth: '40ch',
                margin: '0 auto',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-dm-mono, var(--font-mono))',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  color: 'var(--accent-coral)',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                Coming soon
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-cormorant, var(--font-display))',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  marginBottom: '1.5rem',
                }}
              >
                Video content from GPODH is on its way.
              </p>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Talks, panels, and video conversations will appear here. Subscribe to be notified.
              </p>
            </div>
          )}
        </div>
      </section>

      <EmailSignup />
    </>
  )
}
