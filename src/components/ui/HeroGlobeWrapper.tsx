'use client'

import dynamic from 'next/dynamic'

const HeroGlobe = dynamic(() => import('./HeroGlobe'), { ssr: false })

export default function HeroGlobeWrapper() {
  return <HeroGlobe />
}
