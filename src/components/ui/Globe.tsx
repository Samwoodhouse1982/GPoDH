'use client'

import { useEffect, useRef, useCallback } from 'react'
import {
  geoOrthographic,
  geoPath,
  geoGraticule,
  geoInterpolate,
} from 'd3-geo'
import { feature } from 'topojson-client'

interface GlobeProps {
  scrollProgress: number
}

const CITIES = [
  { name: 'London',    coords: [-0.13,  51.51] as [number, number], link: '/episodes' },
  { name: 'Nairobi',   coords: [36.82,  -1.29] as [number, number], link: '/episodes' },
  { name: 'Mumbai',    coords: [72.88,  19.08] as [number, number], link: '/episodes' },
  { name: 'Jakarta',   coords: [106.87, -6.21] as [number, number], link: '/episodes' },
  { name: 'Sao Paulo', coords: [-46.63,-23.55] as [number, number], link: '/episodes' },
  { name: 'Accra',     coords: [-0.21,   5.60] as [number, number], link: '/episodes' },
  { name: 'Geneva',    coords: [6.15,   46.20] as [number, number], link: '/episodes' },
]

const ROUTES = [
  { from: 0, to: 1, startAt: 0.10, endAt: 0.26 },
  { from: 1, to: 2, startAt: 0.28, endAt: 0.42 },
  { from: 2, to: 3, startAt: 0.44, endAt: 0.54 },
  { from: 3, to: 4, startAt: 0.54, endAt: 0.72 },
  { from: 4, to: 5, startAt: 0.72, endAt: 0.85 },
  { from: 5, to: 6, startAt: 0.85, endAt: 0.97 },
]

const ROTATION_KEYFRAMES = [
  { at: 0.00, lon:  10, lat:  20 },
  { at: 0.12, lon:  20, lat:   5 },
  { at: 0.28, lon:  55, lat:   3 },
  { at: 0.44, lon:  90, lat:   0 },
  { at: 0.56, lon: 150, lat:  -8 },
  { at: 0.65, lon: 220, lat: -12 },
  { at: 0.72, lon: 313, lat: -10 },
  { at: 0.80, lon: 343, lat:  -3 },
  { at: 0.90, lon: 362, lat:   8 },
  { at: 1.00, lon: 375, lat:  12 },
]

function easeInOut(t: number): number {
  const c = Math.max(0, Math.min(1, t))
  return c < 0.5 ? 2 * c * c : -1 + (4 - 2 * c) * c
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function isVisible(coord: [number, number], centerLon: number, centerLat: number): boolean {
  const R = Math.PI / 180
  const λ = coord[0] * R, φ = coord[1] * R
  const λ0 = centerLon * R, φ0 = centerLat * R
  return Math.cos(φ) * Math.cos(φ0) * Math.cos(λ - λ0) + Math.sin(φ) * Math.sin(φ0) >= 0
}

function getRotation(progress: number): [number, number] {
  const kf = ROTATION_KEYFRAMES
  let prev = kf[0]
  let next = kf[kf.length - 1]
  for (let i = 0; i < kf.length - 1; i++) {
    if (progress >= kf[i].at && progress <= kf[i + 1].at) {
      prev = kf[i]; next = kf[i + 1]; break
    }
  }
  const span = next.at - prev.at
  const t = span === 0 ? 1 : (progress - prev.at) / span
  const e = easeInOut(t)
  return [lerp(prev.lon, next.lon, e), lerp(prev.lat, next.lat, e)]
}

function getArcPoints(from: [number, number], to: [number, number], n = 120): [number, number][] {
  const interp = geoInterpolate(from, to)
  return Array.from({ length: n }, (_, i) => interp(i / (n - 1)) as [number, number])
}

function getArcPointsViaMid(
  from: [number, number], mid: [number, number], to: [number, number], n = 120
): [number, number][] {
  const half = Math.floor(n / 2)
  const seg1 = Array.from({ length: half }, (_, i) =>
    geoInterpolate(from, mid)(i / (half - 1)) as [number, number])
  const seg2 = Array.from({ length: n - half }, (_, i) =>
    geoInterpolate(mid, to)((i + 1) / (n - half)) as [number, number])
  return [...seg1, ...seg2]
}

export default function Globe({ scrollProgress }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const worldRef = useRef<any>(null)
  const arcCacheRef = useRef<Map<string, [number, number][]>>(new Map())
  const rafRef = useRef<number>(0)
  const scrollRef = useRef(scrollProgress)

  // Interaction state
  const isDraggingRef = useRef(false)
  const lastPosRef = useRef<[number, number]>([0, 0])
  const startPosRef = useRef<[number, number]>([0, 0])
  const userOffsetRef = useRef<[number, number]>([0, 0]) // [lonOffset, latOffset]
  const zoomRef = useRef(1)
  const lastRotationRef = useRef<[number, number]>([10, 20])

  useEffect(() => { scrollRef.current = scrollProgress }, [scrollProgress])

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(r => r.json())
      .then((topo: any) => { worldRef.current = feature(topo, topo.objects.countries) })
      .catch(() => {})
  }, [])

  const getArcs = useCallback(() => {
    return ROUTES.map((route) => {
      const key = `${route.from}-${route.to}`
      if (!arcCacheRef.current.has(key)) {
        const pts = (route.from === 3 && route.to === 4)
          ? getArcPointsViaMid(CITIES[3].coords, [178, -15], CITIES[4].coords)
          : getArcPoints(CITIES[route.from].coords, CITIES[route.to].coords)
        arcCacheRef.current.set(key, pts)
      }
      return arcCacheRef.current.get(key)!
    })
  }, [])

  // Hit-test canvas position against visible city dots
  const hitTestCity = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return -1
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    const W = rect.width, H = rect.height
    const [lon, lat] = lastRotationRef.current
    const radius = Math.min(W, H) * 0.38 * zoomRef.current
    const projection = geoOrthographic()
      .scale(radius).translate([W / 2, H / 2]).rotate([-lon, -lat]).clipAngle(90)
    for (let i = 0; i < CITIES.length; i++) {
      if (!isVisible(CITIES[i].coords, lon, lat)) continue
      const p = projection(CITIES[i].coords)
      if (!p) continue
      if (Math.hypot(p[0] - x, p[1] - y) < 16) return i
    }
    return -1
  }, [])

  // Pointer handlers
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true
    lastPosRef.current = [e.clientX, e.clientY]
    startPosRef.current = [e.clientX, e.clientY]
    ;(e.target as HTMLCanvasElement).setPointerCapture(e.pointerId)
    ;(e.target as HTMLCanvasElement).style.cursor = 'grabbing'
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDraggingRef.current) {
      const dx = e.clientX - lastPosRef.current[0]
      const dy = e.clientY - lastPosRef.current[1]
      lastPosRef.current = [e.clientX, e.clientY]
      userOffsetRef.current[0] += dx * 0.45
      userOffsetRef.current[1] = Math.max(-75, Math.min(75, userOffsetRef.current[1] - dy * 0.45))
    } else {
      const hit = hitTestCity(e.clientX, e.clientY)
      ;(e.target as HTMLCanvasElement).style.cursor = hit >= 0 ? 'pointer' : 'grab'
    }
  }, [hitTestCity])

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    ;(e.target as HTMLCanvasElement).style.cursor = 'grab'
    // Click if barely moved
    const dx = e.clientX - startPosRef.current[0]
    const dy = e.clientY - startPosRef.current[1]
    if (Math.hypot(dx, dy) < 8) {
      const hit = hitTestCity(e.clientX, e.clientY)
      if (hit >= 0) window.location.href = CITIES[hit].link
    }
  }, [hitTestCity])

  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    zoomRef.current = Math.max(0.5, Math.min(2.5, zoomRef.current - e.deltaY * 0.001))
  }, [])

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const progress = scrollRef.current
    const rect = canvas.getBoundingClientRect()
    const W = rect.width, H = rect.height
    const cx = W / 2, cy = H / 2
    const radius = Math.min(W, H) * 0.38 * zoomRef.current

    ctx.clearRect(0, 0, W, H)

    const [baseLon, baseLat] = getRotation(progress)
    const lon = baseLon + userOffsetRef.current[0]
    const lat = Math.max(-85, Math.min(85, baseLat + userOffsetRef.current[1]))
    lastRotationRef.current = [lon, lat]

    const projection = geoOrthographic()
      .scale(radius).translate([cx, cy]).rotate([-lon, -lat]).clipAngle(90)
    const pathGen = geoPath(projection, ctx as any)

    // Atmosphere glow
    const atmoGrad = ctx.createRadialGradient(cx, cy, radius * 0.92, cx, cy, radius * 1.1)
    atmoGrad.addColorStop(0, 'rgba(58, 104, 96, 0.22)')
    atmoGrad.addColorStop(1, 'rgba(58, 104, 96, 0)')
    ctx.beginPath(); ctx.arc(cx, cy, radius * 1.1, 0, Math.PI * 2)
    ctx.fillStyle = atmoGrad; ctx.fill()

    // Sphere fill
    const sphereGrad = ctx.createRadialGradient(cx - radius * 0.2, cy - radius * 0.2, 0, cx, cy, radius)
    sphereGrad.addColorStop(0, 'rgba(58, 104, 96, 0.12)')
    sphereGrad.addColorStop(1, 'rgba(58, 104, 96, 0.05)')
    ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fillStyle = sphereGrad; ctx.fill()

    // Graticule
    ctx.beginPath(); pathGen(geoGraticule()())
    ctx.strokeStyle = 'rgba(58, 104, 96, 0.13)'; ctx.lineWidth = 0.5; ctx.stroke()

    // Country borders
    if (worldRef.current) {
      ctx.beginPath(); pathGen(worldRef.current)
      ctx.strokeStyle = 'rgba(58, 104, 96, 0.5)'; ctx.lineWidth = 0.8; ctx.stroke()
    }

    // Sphere border
    ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(58, 104, 96, 0.3)'; ctx.lineWidth = 1.5; ctx.stroke()

    // Arcs
    const arcPoints = getArcs()
    ROUTES.forEach((route, i) => {
      if (progress < route.startAt) return
      const arcProg = progress < route.endAt
        ? (progress - route.startAt) / (route.endAt - route.startAt) : 1
      const isComplete = arcProg >= 1
      const points = arcPoints[i]
      const numPoints = Math.max(2, Math.floor(easeInOut(arcProg) * points.length))

      ctx.save()
      ctx.shadowBlur = 12; ctx.shadowColor = 'rgba(212, 97, 74, 0.55)'
      ctx.beginPath()
      let penDown = false
      for (let j = 0; j < numPoints; j++) {
        if (!isVisible(points[j], lon, lat)) { penDown = false; continue }
        const p = projection(points[j])
        if (!p) { penDown = false; continue }
        if (!penDown) { ctx.moveTo(p[0], p[1]); penDown = true }
        else ctx.lineTo(p[0], p[1])
      }
      ctx.strokeStyle = isComplete ? 'rgba(212, 97, 74, 0.4)' : 'rgba(212, 97, 74, 0.9)'
      ctx.lineWidth = isComplete ? 1.5 : 2.2
      ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore()

      if (!isComplete) {
        const tip = projection(points[numPoints - 1])
        if (tip) {
          ctx.save()
          ctx.shadowBlur = 18; ctx.shadowColor = 'rgba(212, 97, 74, 0.9)'
          ctx.beginPath(); ctx.arc(tip[0], tip[1], 5.5, 0, Math.PI * 2)
          ctx.fillStyle = '#D4614A'; ctx.fill(); ctx.restore()
        }
      }
    })

    // City dots
    const activated = new Set<number>()
    if (progress >= 0.05) activated.add(ROUTES[0].from)
    ROUTES.forEach((route) => {
      if (progress >= route.startAt) activated.add(route.from)
      if (progress >= route.endAt) activated.add(route.to)
    })

    activated.forEach((idx) => {
      const city = CITIES[idx]
      const p = projection(city.coords)
      if (!p) return
      const pulse = 0.5 + 0.5 * Math.sin(timestamp * 0.002 + idx * 1.3)

      ctx.beginPath(); ctx.arc(p[0], p[1], 11 + pulse * 5, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(212, 97, 74, ${0.12 + pulse * 0.1})`; ctx.lineWidth = 1; ctx.stroke()

      ctx.beginPath(); ctx.arc(p[0], p[1], 6, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(212, 97, 74, 0.55)'; ctx.lineWidth = 1.2; ctx.stroke()

      ctx.save()
      ctx.shadowBlur = 10; ctx.shadowColor = 'rgba(212, 97, 74, 0.7)'
      ctx.beginPath(); ctx.arc(p[0], p[1], 3.5, 0, Math.PI * 2)
      ctx.fillStyle = '#D4614A'; ctx.fill(); ctx.restore()

      ctx.font = '500 11px "DM Sans", sans-serif'
      ctx.fillStyle = 'rgba(13, 30, 28, 0.8)'
      const textW = ctx.measureText(city.name).width
      const labelX = p[0] + 9 + textW > W - 4 ? p[0] - 9 - textW : p[0] + 9
      ctx.fillText(city.name, labelX, p[1] + 4)
    })

    rafRef.current = requestAnimationFrame(draw)
  }, [getArcs])

  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [draw])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.scale(dpr, dpr)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab', touchAction: 'none' }}
      aria-label="Interactive globe — drag to spin, scroll to zoom, click a city dot to explore episodes"
      role="img"
    />
  )
}
