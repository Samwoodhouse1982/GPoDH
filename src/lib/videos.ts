import videosData from '@/data/videos.json'

export type VideoCategory = 'talk' | 'panel' | 'explainer' | 'clip' | 'hot-take'

export interface Video {
  id: string
  slug: string
  title: string
  description: string
  youtubeVideoId: string
  date: string
  duration?: string
  category?: VideoCategory
  tags?: string[]
  thumbnailUrl?: string            // override auto-generated YouTube thumbnail if needed
  thumbnailPosition?: string       // CSS objectPosition for thumbnailUrl, e.g. 'center 20%'
  featured?: boolean               // pin as the featured video; otherwise the first entry is used
  transcript?: string              // optional transcript; included in smart search
}

// ─── Video library ────────────────────────────────────────────────────────────
// The list lives in src/data/videos.json (under the "videos" key) so it can be
// edited in the CMS (see public/admin) and by the automated YouTube sync
// (.github/workflows/sync-videos.yml), which opens a pull request whenever the
// channel publishes a video not already listed here. Newest videos go first; the
// first entry is treated as the featured video unless another sets "featured": true.
export const videos: Video[] = (videosData as { videos: unknown[] })
  .videos as unknown as Video[]

// The featured video shown at the top of /videos: an explicitly flagged entry,
// otherwise the first (newest) one.
export const featuredVideo: Video = videos.find((v) => v.featured) ?? videos[0]

export const CATEGORY_LABELS: Record<VideoCategory, string> = {
  talk:      'Talk',
  panel:     'Panel',
  explainer: 'Explainer',
  clip:      'Clip',
  'hot-take': 'Hot take',
}
