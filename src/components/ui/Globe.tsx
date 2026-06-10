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
  /** Called with the active leg index (0 = intro, 1..6 = each route) as the
   *  animation advances, so the caption alongside can follow along. */
  onStage?: (index: number) => void
}

// Each city anchors a real episode/video story; the route below traces how
// insights travel between them. London (UK eps) → Nairobi (Global Digital
// Health Forum) → Bengaluru (Remidio AI diagnostics) → Jakarta (Indonesia,
// WHO first-mover) → São Paulo (health data poverty, Ep2) → Lagos (ICRC
// humanitarian AI, Ep24) → Geneva (WHO policy, Ep16).
const CITIES = [
  { name: 'London',    coords: [-0.13,  51.51] as [number, number], link: '/episodes' },
  { name: 'Nairobi',   coords: [36.82,  -1.29] as [number, number], link: '/episodes' },
  { name: 'Bengaluru', coords: [77.59,  12.97] as [number, number], link: '/episodes' },
  { name: 'Jakarta',   coords: [106.87, -6.21] as [number, number], link: '/episodes' },
  { name: 'Sao Paulo', coords: [-46.63,-23.55] as [number, number], link: '/episodes' },
  { name: 'Lagos',     coords: [3.41,    6.52] as [number, number], link: '/episodes' },
  { name: 'Geneva',    coords: [6.15,   46.20] as [number, number], link: '/episodes' },
]

// Progress windows (0..1) for each leg, matched to the caption thresholds in
// GlobeSection. The whole sequence runs, fades out, then rebuilds every cycle.
const ROUTES = [
  { from: 0, to: 1, startAt: 0.10, endAt: 0.26 },
  { from: 1, to: 2, startAt: 0.28, endAt: 0.42 },
  { from: 2, to: 3, startAt: 0.44, endAt: 0.54 },
  { from: 3, to: 4, startAt: 0.54, endAt: 0.72 },
  { from: 4, to: 5, startAt: 0.72, endAt: 0.85 },
  { from: 5, to: 6, startAt: 0.85, endAt: 0.97 },
]

const JOURNEY_MS = 32000        // one full lap; the journey loops continuously
// Each drawn line (and city) fades out over ~this fraction of a lap after it's
// completed, so by the time the lap comes back around to it, it's almost gone —
// a perpetual trailing ribbon, never a hold-then-reset.
const FADE_SPAN = 0.9
const REDUCED_PROGRESS = 0.6    // a representative frozen frame under reduced-motion
// Begin part-way through the lap so the first sight (e.g. scrolling to it)
// already shows lines criss-crossing, never the empty opening beat.
const INITIAL_PROGRESS = 0.34

const ROTATION_KEYFRAMES = [
  { at: 0.00, lon:  15, lat:  20 },
  { at: 0.12, lon:  20, lat:   5 },
  { at: 0.28, lon:  55, lat:   3 },
  { at: 0.44, lon:  90, lat:   0 },
  { at: 0.56, lon: 150, lat:  -8 },
  { at: 0.65, lon: 220, lat: -12 },
  { at: 0.72, lon: 313, lat: -10 },
  { at: 0.80, lon: 343, lat:  -3 },
  { at: 0.90, lon: 362, lat:   8 },
  { at: 1.00, lon: 375, lat:  12 },  // 375 ≈ 15 (mod 360) → near-seamless wrap to start
]

function easeInOut(t: number): number {
  const c = Math.max(0, Math.min(1, t))
  return c < 0.5 ? 2 * c * c : -1 + (4 - 2 * c) * c
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

// How front-facing a point is: 1 at the globe's centre, 0 at the limb (edge),
// negative on the far side.
function facing(coord: [number, number], centerLon: number, centerLat: number): number {
  const R = Math.PI / 180
  const λ = coord[0] * R, φ = coord[1] * R
  const λ0 = centerLon * R, φ0 = centerLat * R
  return Math.cos(φ) * Math.cos(φ0) * Math.cos(λ - λ0) + Math.sin(φ) * Math.sin(φ0)
}

function isVisible(coord: [number, number], centerLon: number, centerLat: number): boolean {
  return facing(coord, centerLon, centerLat) >= 0
}

// Smooth 0→1 opacity for city markers/labels as they approach the limb, so they
// fade in/out instead of popping when the globe rotates them past the edge.
const LIMB_FADE = 0.16
function limbFade(coord: [number, number], centerLon: number, centerLat: number): number {
  const f = facing(coord, centerLon, centerLat)
  if (f <= 0) return 0
  return easeInOut(Math.min(1, f / LIMB_FADE))
}

// Progress span over which a city's dot + name eases in once the journey
// reaches it (~0.03 of the journey ≈ a second), so names never pop.
const LIT_FADE_IN = 0.03

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

// A clean curved arc that runs EAST from `from` to `to` (longitude advances
// monotonically eastward), bulging toward the equator in the middle via a
// smooth sine term. Used for the trans-Pacific Jakarta→São Paulo leg so it
// sweeps across the middle of the ocean rather than under the Antarctic.
function getEastwardArc(from: [number, number], to: [number, number], bulge: number, n = 140): [number, number][] {
  let dLon = to[0] - from[0]
  while (dLon <= 0) dLon += 360 // force the eastward direction
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1)
    let lon = from[0] + dLon * t
    lon = ((lon + 180) % 360 + 360) % 360 - 180 // wrap to [-180, 180)
    const lat = from[1] + (to[1] - from[1]) * t + Math.sin(Math.PI * t) * bulge
    return [lon, lat] as [number, number]
  })
}

export default function Globe({ onStage }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const worldRef = useRef<unknown>(null)
  const arcCacheRef = useRef<Map<string, [number, number][]>>(new Map())
  const reducedMotionRef = useRef(false)
  const startRef = useRef<number | null>(null)
  const lastStageRef = useRef<number>(-1)
  const onStageRef = useRef<GlobeProps['onStage']>(onStage)
  useEffect(() => { onStageRef.current = onStage }, [onStage])

  // Interaction state — lets a curious visitor nudge the globe without
  // hijacking page scroll (touch vertical pans still scroll the page).
  const isDraggingRef = useRef(false)
  const lastPosRef = useRef<[number, number]>([0, 0])
  const startPosRef = useRef<[number, number]>([0, 0])
  const userOffsetRef = useRef<[number, number]>([0, 0]) // [lonOffset, latOffset]
  const lastRotationRef = useRef<[number, number]>([10, 20])

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(r => r.json())
      .then((topo: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const t = topo as any
        worldRef.current = feature(t, t.objects.countries)
      })
      .catch(() => {})
  }, [])

  const getArcs = useCallback(() => {
    return ROUTES.map((route) => {
      const key = `${route.from}-${route.to}`
      if (!arcCacheRef.current.has(key)) {
        // Most legs are a single great-circle arc; the trans-Pacific
        // Jakarta→São Paulo leg is a smooth eastward bow across the ocean.
        const pts = (route.from === 3 && route.to === 4)
          ? getEastwardArc(CITIES[3].coords, CITIES[4].coords, 20)
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
    const radius = Math.min(W, H) * 0.38
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
      // Grab-and-drag: the surface follows the cursor (drag right → spins right,
      // drag down → tilts down), so subtract dx and add dy to the rotation.
      userOffsetRef.current[0] -= dx * 0.45
      userOffsetRef.current[1] = Math.max(-75, Math.min(75, userOffsetRef.current[1] + dy * 0.45))
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

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Continuously looping, time-driven position along the lap (no scroll, no
    // hold). Frozen under reduced-motion to a single representative frame.
    let progress: number
    if (reducedMotionRef.current) {
      progress = REDUCED_PROGRESS
    } else {
      if (startRef.current === null) startRef.current = timestamp - INITIAL_PROGRESS * JOURNEY_MS
      progress = ((timestamp - startRef.current) % JOURNEY_MS) / JOURNEY_MS
    }

    const rect = canvas.getBoundingClientRect()
    const W = rect.width, H = rect.height
    const cx = W / 2, cy = H / 2
    const radius = Math.min(W, H) * 0.38
    ctx.clearRect(0, 0, W, H)

    const [baseLon, baseLat] = getRotation(progress)
    const lon = baseLon + userOffsetRef.current[0]
    const lat = Math.max(-85, Math.min(85, baseLat + userOffsetRef.current[1]))
    lastRotationRef.current = [lon, lat]

    const projection = geoOrthographic()
      .scale(radius).translate([cx, cy]).rotate([-lon, -lat]).clipAngle(90)
    const pathGen = geoPath(projection, ctx as Parameters<typeof geoPath>[1])

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
      ctx.beginPath(); pathGen(worldRef.current as Parameters<typeof pathGen>[0])
      ctx.strokeStyle = 'rgba(58, 104, 96, 0.5)'; ctx.lineWidth = 0.8; ctx.stroke()
    }

    // Sphere border
    ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(58, 104, 96, 0.3)'; ctx.lineWidth = 1.5; ctx.stroke()

    const arcPoints = getArcs()

    // Helper: stroke the visible part of an arc, up to `frac` (0..1) of its length.
    const strokeArc = (points: [number, number][], frac: number) => {
      const numPoints = Math.max(2, Math.floor(frac * points.length))
      ctx.beginPath()
      let penDown = false
      for (let j = 0; j < numPoints; j++) {
        if (!isVisible(points[j], lon, lat)) { penDown = false; continue }
        const p = projection(points[j])
        if (!p) { penDown = false; continue }
        if (!penDown) { ctx.moveTo(p[0], p[1]); penDown = true }
        else ctx.lineTo(p[0], p[1])
      }
      ctx.stroke()
      return numPoints
    }

    // Looping "age" of a moment in the lap: 0 just after it happened, climbing
    // to 1 just before the lap comes back around to it.
    const wrapAge = (phase: number) => ((progress - phase) % 1 + 1) % 1
    // A completed line/city fades out as it ages, almost gone by ~FADE_SPAN.
    const ageFade = (age: number) => {
      const a = 1 - age / FADE_SPAN
      return a <= 0 ? 0 : easeInOut(Math.min(1, a))
    }

    // ── Faint baseline of the full network — always present, never snaps ────
    arcPoints.forEach((points) => {
      ctx.save()
      ctx.strokeStyle = 'rgba(212, 97, 74, 0.12)'
      ctx.lineWidth = 1; ctx.lineJoin = 'round'; ctx.lineCap = 'round'
      strokeArc(points, 1)
      ctx.restore()
    })

    // Which leg is being traced right now (if any).
    let activeIdx = -1
    let tipScreen: [number, number] | null = null

    // ── Lines: the active leg grows bright; completed legs persist then fade
    // with age, so the trace is a perpetual ribbon trailing the comet. ───────
    ROUTES.forEach((route, i) => {
      let frac: number
      let legAlpha: number
      if (progress >= route.startAt && progress < route.endAt) {
        frac = easeInOut((progress - route.startAt) / (route.endAt - route.startAt))
        legAlpha = 1
        activeIdx = i
      } else {
        frac = 1
        legAlpha = ageFade(wrapAge(route.endAt))
      }
      if (legAlpha <= 0.01) return
      ctx.save()
      ctx.globalAlpha = legAlpha
      ctx.shadowBlur = 12; ctx.shadowColor = 'rgba(212, 97, 74, 0.55)'
      ctx.strokeStyle = 'rgba(212, 97, 74, 0.9)'
      ctx.lineWidth = 2.2; ctx.lineJoin = 'round'; ctx.lineCap = 'round'
      const n = strokeArc(arcPoints[i], frac)
      ctx.restore()
      if (i === activeIdx) {
        const tipPt = arcPoints[i][n - 1]
        if (isVisible(tipPt, lon, lat)) tipScreen = projection(tipPt) as [number, number] | null
      }
    })

    // Travelling comet on the active leg's leading edge
    if (activeIdx >= 0 && tipScreen) {
      const t = tipScreen as [number, number]
      ctx.save()
      ctx.shadowBlur = 18; ctx.shadowColor = 'rgba(212, 97, 74, 0.9)'
      ctx.beginPath(); ctx.arc(t[0], t[1], 5.5, 0, Math.PI * 2)
      ctx.fillStyle = '#D4614A'; ctx.fill()
      ctx.restore()
    }

    // ── Cities + names: fade in when reached, linger, then fade with age ────
    const pulsing = new Set<number>(
      activeIdx >= 0 ? [ROUTES[activeIdx].from, ROUTES[activeIdx].to] : []
    )
    CITIES.forEach((city, idx) => {
      const limb = limbFade(city.coords, lon, lat)
      if (limb <= 0) return
      const pt = projection(city.coords)
      if (!pt) return

      // Quiet constant marker so the globe is never bare
      ctx.save()
      ctx.globalAlpha = limb
      ctx.beginPath(); ctx.arc(pt[0], pt[1], 2.5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(212, 97, 74, 0.4)'; ctx.fill()
      ctx.restore()

      // Age = time since this city was most recently reached (any of its legs)
      let age = Infinity
      ROUTES.forEach((route) => {
        if (route.from === idx) age = Math.min(age, wrapAge(route.startAt))
        if (route.to === idx) age = Math.min(age, wrapAge(route.endAt))
      })
      if (!isFinite(age)) return
      const appear = easeInOut(Math.min(1, age / LIT_FADE_IN)) // ease in when reached
      const a = limb * appear * ageFade(age)
      if (a <= 0.01) return

      ctx.save()
      ctx.globalAlpha = a
      if (pulsing.has(idx)) {
        const pulse = reducedMotionRef.current ? 0.5 : 0.5 + 0.5 * Math.sin(timestamp * 0.002 + idx * 1.3)
        ctx.beginPath(); ctx.arc(pt[0], pt[1], 11 + pulse * 5, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(212, 97, 74, ${0.12 + pulse * 0.1})`; ctx.lineWidth = 1; ctx.stroke()
        ctx.beginPath(); ctx.arc(pt[0], pt[1], 6, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(212, 97, 74, 0.55)'; ctx.lineWidth = 1.2; ctx.stroke()
      }
      ctx.shadowBlur = 10; ctx.shadowColor = 'rgba(212, 97, 74, 0.7)'
      ctx.beginPath(); ctx.arc(pt[0], pt[1], 3.5, 0, Math.PI * 2)
      ctx.fillStyle = '#D4614A'; ctx.fill()
      ctx.shadowBlur = 0
      ctx.font = '500 11px "DM Sans", sans-serif'
      ctx.fillStyle = 'rgba(13, 30, 28, 0.8)'
      const textW = ctx.measureText(city.name).width
      const labelX = pt[0] + 9 + textW > W - 4 ? pt[0] - 9 - textW : pt[0] + 9
      ctx.fillText(city.name, labelX, pt[1] + 4)
      ctx.restore()
    })

    // ── Report the active stage so the caption can follow ───────────────────
    let curRoute = 0
    for (let i = 0; i < ROUTES.length; i++) if (progress >= ROUTES[i].startAt) curRoute = i
    const stage = progress < ROUTES[0].startAt ? 0 : curRoute + 1
    if (stage !== lastStageRef.current) {
      lastStageRef.current = stage
      onStageRef.current?.(stage)
    }
  }, [getArcs])

  // The effect owns the render loop (draw stays a pure per-frame function).
  useEffect(() => {
    let raf = 0
    const loop = (timestamp: number) => {
      draw(timestamp)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
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
      // pan-y: vertical touch gestures keep scrolling the page; horizontal
      // drags spin the globe. So it never blocks the content beneath it.
      style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab', touchAction: 'pan-y' }}
      aria-label="Animated globe tracing how insights travel between episode locations. Drag to spin; tap a city to browse episodes."
      role="img"
    />
  )
}
