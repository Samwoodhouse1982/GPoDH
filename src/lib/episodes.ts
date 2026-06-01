import episodesData from '@/data/episodes.json'

export interface Timestamp {
  time: string
  label: string
}

export interface Episode {
  id: string
  slug: string
  episodeNumber?: number | string
  title: string
  guest: string
  guestRole: string
  date: string
  duration?: string
  description: string
  url: string
  artworkUrl?: string
  themes: string[]
  country: string
  tags: string[]
  // Embed player URLs - paste the full share/embed URL from each platform:
  //   Transistor: copy the share link from share.transistor.fm/e/... and paste as-is
  //   Spotify episode:    open.spotify.com/episode/{spotifyEpisodeId}
  //   YouTube video:      youtube.com/watch?v={youtubeVideoId}
  transistorUrl?: string      // full URL e.g. "https://share.transistor.fm/e/abc12345"
  audioUrl?: string           // direct MP3 URL for og:audio meta tag
  spotifyEpisodeId?: string
  youtubeVideoId?: string
  teaserVideoUrl?: string     // short teaser/clip — direct .mp4 URL or embeddable iframe URL
  // Rich content for episode landing pages
  bio?: string
  topics?: string[]
  timestamps?: Timestamp[]
  pullQuote?: string
  transcript?: string
  guestLinkedIn?: string
  featured?: boolean          // pin as the featured episode; otherwise the newest is used
}

// ─── Episode library ──────────────────────────────────────────────────────────
// The list lives in src/data/episodes.json so it can be edited in the CMS
// (see public/admin) and by hand. Order is preserved as authored; newest first.
export const episodes: Episode[] = episodesData as unknown as Episode[]

export const ALL_THEMES = [...new Set(episodes.flatMap((e) => e.themes))].sort()
export const ALL_COUNTRIES = [...new Set(episodes.map((e) => e.country))].sort()
