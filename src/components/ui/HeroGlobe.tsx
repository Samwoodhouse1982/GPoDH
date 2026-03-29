'use client'

import { useEffect, useRef, useCallback } from 'react'
import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo'
import { feature } from 'topojson-client'

interface Pin {
  name: string
  coords: [number, number]
  label: string
}

// Countries and topics drawn from podcast episodes
const PINS: Pin[] = [
  { name: 'Kenya',       coords: [36.82,  -1.29],  label: 'CHW innovation' },
  { name: 'Nigeria',     coords: [8.68,    9.08],  label: 'Digital identity' },
  { name: 'Ghana',       coords: [-1.02,   7.95],  label: 'Community health' },
  { name: 'Rwanda',      coords: [29.87,  -1.94],  label: 'Drone delivery' },
  { name: 'Ethiopia',    coords: [40.49,   9.15],  label: 'Vaccination tech' },
  { name: 'Uganda',      coords: [32.29,   1.37],  label: 'Health data' },
  { name: 'Jordan',      coords: [37.98,  31.24],  label: 'Refugee health' },
  { name: 'Pakistan',    coords: [69.35,  30.38],  label: 'mHealth access' },
  { name: 'India',       coords: [78.96,  20.59],  label: 'AI diagnostics' },
  { name: 'Bangladesh',  coords: [90.39,  23.68],  label: 'mHealth at scale' },
  { name: 'Philippines', coords: [121.77, 12.88],  label: 'Implementation' },
  { name: 'Indonesia',   coords: [113.92, -0.79],  label: 'Digital health' },
  { name: 'Colombia',    coords: [-74.08,  4.71],  label: 'Maternal health' },
  { name: 'Brazil',      coords: [-51.93,-14.24],  label: 'Equity in AI' },
  { name: 'UK',          coords: [-1.77,  51.23],  label: 'Global strategy' },
  { name: 'Geneva',      coords: [6.15,   46.20],  label: 'WHO policy' },
]

function dotProduct(coord: [number, number], lon: number, lat: number): number {
  const R = Math.PI / 180
  return (
    Math.cos(coord[1] * R) * Math.cos(lat * R) * Math.cos((coord[0] - lon) * R) +
    Math.sin(coord[1] * R) * Math.sin(lat * R)
  )
}

function drawMedCross(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.moveTo(x - size, y)
  ctx.lineTo(x + size, y)
  ctx.moveTo(x, y - size)
  ctx.lineTo(x, y + size)
}

export default function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const worldRef = useRef<unknown>(null)
  const lonRef = useRef(10)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((r) => r.json())
      .then((topo: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const t = topo as any
        worldRef.current = feature(t, t.objects.countries)
      })
      .catch(() => {})
  }, [])

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    lonRef.current += 0.04 // ~2.4 deg/sec — one full rotation every ~2.5 min

    const lon = lonRef.current
    const lat = 18 // slight downward tilt reveals Africa / South Asia well

    const rect = canvas.getBoundingClientRect()
    const W = rect.width
    const H = rect.height
    const cx = W / 2
    const cy = H / 2
    const radius = Math.min(W, H) * 0.41

    ctx.clearRect(0, 0, W, H)

    const projection = geoOrthographic()
      .scale(radius)
      .translate([cx, cy])
      .rotate([-lon, -lat])
      .clipAngle(90)

    const pathGen = geoPath(projection, ctx as Parameters<typeof geoPath>[1])

    // ── Atmosphere glow ──────────────────────────────────────────────────────
    const atmoGrad = ctx.createRadialGradient(cx, cy, radius * 0.88, cx, cy, radius * 1.16)
    atmoGrad.addColorStop(0, 'rgba(58, 104, 96, 0.20)')
    atmoGrad.addColorStop(1, 'rgba(58, 104, 96, 0)')
    ctx.beginPath()
    ctx.arc(cx, cy, radius * 1.16, 0, Math.PI * 2)
    ctx.fillStyle = atmoGrad
    ctx.fill()

    // ── Sphere base ──────────────────────────────────────────────────────────
    const sphereGrad = ctx.createRadialGradient(
      cx - radius * 0.28, cy - radius * 0.28, 0,
      cx, cy, radius
    )
    sphereGrad.addColorStop(0, 'rgba(80, 140, 130, 0.14)')
    sphereGrad.addColorStop(1, 'rgba(40, 90, 82, 0.06)')
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fillStyle = sphereGrad
    ctx.fill()

    // ── Graticule ────────────────────────────────────────────────────────────
    ctx.beginPath()
    pathGen(geoGraticule()())
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
    ctx.lineWidth = 0.4
    ctx.stroke()

    // ── Country fills & borders ──────────────────────────────────────────────
    if (worldRef.current) {
      ctx.beginPath()
      pathGen(worldRef.current as Parameters<typeof pathGen>[0])
      ctx.fillStyle = 'rgba(58, 130, 118, 0.18)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.10)'
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    // ── Sphere outline ───────────────────────────────────────────────────────
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
    ctx.lineWidth = 1.2
    ctx.stroke()

    // ── Compute facing values for all pins, sort for label priority ──────────
    type PinEntry = { pin: Pin; p: [number, number]; facing: number; idx: number }
    const visible: PinEntry[] = []

    PINS.forEach((pin, idx) => {
      const facing = dotProduct(pin.coords, lon, lat)
      if (facing <= 0) return
      const p = projection(pin.coords)
      if (!p) return
      visible.push({ pin, p: p as [number, number], facing, idx })
    })

    // Show label cards only for the top 5 best-facing pins
    const labelCandidates = [...visible]
      .sort((a, b) => b.facing - a.facing)
      .slice(0, 5)
      .map((e) => e.idx)

    // ── Draw pins ────────────────────────────────────────────────────────────
    visible.forEach(({ pin, p, facing, idx }) => {
      const pulse = 0.5 + 0.5 * Math.sin(timestamp * 0.0014 + idx * 0.85)
      const alpha = 0.45 + facing * 0.55

      const showLabel = labelCandidates.includes(idx) && facing > 0.25
      const labelAlpha = showLabel ? Math.min(1, (facing - 0.25) / 0.35) : 0

      // ── Story extraction line & card ─────────────────────────────────────
      if (showLabel) {
        // Direction: upper-right if in left half, upper-left if in right half
        const goRight = p[0] < cx
        const lineLen = 26 + facing * 14
        const angle = goRight ? -Math.PI * 0.35 : -Math.PI * 0.65
        const lineEndX = p[0] + Math.cos(angle) * lineLen
        const lineEndY = p[1] + Math.sin(angle) * lineLen

        // Extraction line (dashed feel via low opacity segments)
        ctx.save()
        ctx.globalAlpha = labelAlpha * 0.55
        ctx.beginPath()
        ctx.moveTo(p[0], p[1])
        ctx.lineTo(lineEndX, lineEndY)
        ctx.strokeStyle = 'rgba(212, 97, 74, 0.9)'
        ctx.lineWidth = 0.9
        ctx.setLineDash([3, 3])
        ctx.stroke()
        ctx.setLineDash([])
        ctx.restore()

        // Dot at line tip
        ctx.save()
        ctx.globalAlpha = labelAlpha
        ctx.beginPath()
        ctx.arc(lineEndX, lineEndY, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(212, 97, 74, 0.9)'
        ctx.fill()
        ctx.restore()

        // Label card
        ctx.font = '600 10px "DM Sans", sans-serif'
        const nameW = ctx.measureText(pin.name).width
        ctx.font = '400 9px "DM Sans", sans-serif'
        const labelW = ctx.measureText(pin.label).width
        const cardW = Math.max(nameW, labelW) + 16
        const cardH = 34

        let cardX = goRight ? lineEndX + 4 : lineEndX - cardW - 4
        // Keep on screen
        cardX = Math.max(2, Math.min(W - cardW - 2, cardX))
        const cardY = lineEndY - cardH / 2

        ctx.save()
        ctx.globalAlpha = labelAlpha * 0.92
        ctx.fillStyle = 'rgba(10, 24, 22, 0.82)'
        ctx.beginPath()
        ctx.roundRect(cardX, cardY, cardW, cardH, 4)
        ctx.fill()
        ctx.strokeStyle = 'rgba(212, 97, 74, 0.35)'
        ctx.lineWidth = 0.8
        ctx.stroke()

        ctx.font = '600 10px "DM Sans", sans-serif'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.92)'
        ctx.fillText(pin.name, cardX + 8, cardY + 13)

        ctx.font = '400 9px "DM Sans", sans-serif'
        ctx.fillStyle = 'rgba(212, 97, 74, 0.85)'
        ctx.fillText(pin.label, cardX + 8, cardY + 25)

        ctx.restore()
      }

      // ── Outer pulse ring ─────────────────────────────────────────────────
      ctx.beginPath()
      ctx.arc(p[0], p[1], 10 + pulse * 7, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(212, 97, 74, ${(0.07 + pulse * 0.10) * alpha})`
      ctx.lineWidth = 0.8
      ctx.stroke()

      // ── Inner ring ───────────────────────────────────────────────────────
      ctx.beginPath()
      ctx.arc(p[0], p[1], 5.5, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(212, 97, 74, ${0.55 * alpha})`
      ctx.lineWidth = 1
      ctx.stroke()

      // ── Pin dot ──────────────────────────────────────────────────────────
      ctx.save()
      ctx.shadowBlur = 10
      ctx.shadowColor = `rgba(212, 97, 74, ${0.75 * alpha})`
      ctx.beginPath()
      ctx.arc(p[0], p[1], 3.2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(212, 97, 74, ${alpha})`
      ctx.fill()
      ctx.restore()

      // ── Medical cross inside pin ─────────────────────────────────────────
      ctx.save()
      ctx.globalAlpha = alpha * 0.85
      ctx.beginPath()
      drawMedCross(ctx, p[0], p[1], 1.6)
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1.1
      ctx.lineCap = 'round'
      ctx.stroke()
      ctx.restore()
    })

    rafRef.current = requestAnimationFrame(draw)
  }, [])

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
      const r = canvas.getBoundingClientRect()
      canvas.width = r.width * dpr
      canvas.height = r.height * dpr
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
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-label="Animated globe showing global podcast locations"
      role="img"
    />
  )
}
