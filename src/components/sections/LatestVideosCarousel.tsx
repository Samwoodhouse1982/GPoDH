import VideoCard from '@/components/ui/VideoCard'
import type { Video } from '@/lib/videos'
import CardCarousel from '@/components/ui/CardCarousel'

interface LatestVideosCarouselProps {
  videos: Video[]
}

const CARD_WIDTH = 320

export default function LatestVideosCarousel({ videos }: LatestVideosCarouselProps) {
  return (
    <CardCarousel
      cardWidth={CARD_WIDTH}
      browseHref="/videos"
      browseLabel="Browse all videos"
      browseSubtitle="The full collection"
    >
      {videos.map((video, i) => (
        <div key={video.id} style={{ flex: `0 0 ${CARD_WIDTH}px`, display: 'flex' }}>
          <VideoCard video={video} index={i} />
        </div>
      ))}
    </CardCarousel>
  )
}
