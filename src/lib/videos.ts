export type VideoCategory = 'talk' | 'panel' | 'explainer' | 'clip'

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
  thumbnailUrl?: string   // override auto-generated YouTube thumbnail if needed
}

// ─── Video library ────────────────────────────────────────────────────────────
// To add a video, copy the YouTube URL (youtube.com/watch?v=XXXXXXXXXXX),
// take the ID after ?v= and paste it as youtubeVideoId.
// Thumbnail is auto-generated from YouTube; set thumbnailUrl to override.

export const videos: Video[] = [
  {
    id: '1',
    slug: 'digital-innovation-in-humanitarian-settings',
    title: 'Digital innovation in humanitarian settings',
    description: 'How does an organisation like the ICRC - working in conflict zones, disasters, and last-mile settings - approach digital transformation? Javier Elkin spent three years building the ICRC\'s digital health unit from scratch, covering prioritisation frameworks, DHIS2 implementation, and the MOOVE/Medotron initiative to validate LLMs for humanitarian settings.',
    youtubeVideoId: 'LjbXiGTCtDs',
    date: 'Feb 2026',
    category: 'talk',
    tags: ['Humanitarian Health', 'AI', 'Implementation', 'Open Source', 'LLMs', 'ICRC'],
  },
]

export const CATEGORY_LABELS: Record<VideoCategory, string> = {
  talk:      'Talk',
  panel:     'Panel',
  explainer: 'Explainer',
  clip:      'Clip',
}
