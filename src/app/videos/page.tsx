import type { Metadata } from 'next'
import VideoPageClient from './VideoPageClient'
import EmailSignup from '@/components/sections/EmailSignup'

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Talks, panels, and video content from Global Perspectives on Digital Health.',
}

export default function VideosPage() {
  return (
    <>
      <VideoPageClient />
      <EmailSignup />
    </>
  )
}
