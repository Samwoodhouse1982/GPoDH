import type { Metadata } from 'next'
import VideoPageClient from './VideoPageClient'
import EmailSignup from '@/components/sections/EmailSignup'
import { SEO } from '@/lib/constants'

export const metadata: Metadata = {
  title: SEO.videos.title,
  description: SEO.videos.description,
}

export default function VideosPage() {
  return (
    <>
      <VideoPageClient />
      <EmailSignup />
    </>
  )
}
