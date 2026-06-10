'use client'

import { useEffect, useRef, useCallback } from 'react'
import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo'
import { feature } from 'topojson-client'

/**
 * Faint, decorative wireframe globe — sphere, graticule and country outlines
 * only (no pins or labels). Designed to sit *behind* other content as a quiet
 * backdrop. Rotates slowly, honours prefers-reduced-motion, and is inert to
 * pointer/AT (aria-hidden).
 */
export default function FaintGlobe({ size = 400 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const worldRef = useRef<unknown>(null)
  const lonRef = useRef(20)
  const reducedRef = useRef(false)
  const drawnStaticRef = useRef(false)

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((r) => r.json())
      .then((topo: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const t = topo as any
        worldRef.current = feature(t, t.objects.countries)
        drawnStaticRef.current = false // force a repaint once land has loaded
      })
      .catch(() => {})
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (!reducedRef.current) lonRef.current += 0.02
    const lon = lonRef.current
    const lat = 16
    const cx = size / 2
    const cy = size / 2
    const radius = size * 0.4

    ctx.clearRect(0, 0, size, size)

    const projection = geoOrthographic()
      .scale(radius).translate([cx, cy]).rotate([-lon, -lat]).clipAngle(90)
    const pathGen = geoPath(projection, ctx as Parameters<typeof geoPath>[1])

    // Sphere fill — barely-there
    ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(58,104,96,0.045)'; ctx.fill()

    // Graticule
    ctx.beginPath(); pathGen(geoGraticule()())
    ctx.strokeStyle = 'rgba(58,104,96,0.10)'; ctx.lineWidth = 0.5; ctx.stroke()

    // Country outlines
    if (worldRef.current) {
      ctx.beginPath(); pathGen(worldRef.current as Parameters<typeof pathGen>[0])
      ctx.strokeStyle = 'rgba(58,104,96,0.20)'; ctx.lineWidth = 0.6; ctx.stroke()
    }

    // Sphere edge
    ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(58,104,96,0.16)'; ctx.lineWidth = 1; ctx.stroke()
  }, [size])

  // Render loop. Under reduced motion we paint once (and again when land loads)
  // rather than spinning a RAF loop forever.
  useEffect(() => {
    let raf = 0
    const loop = () => {
      if (reducedRef.current) {
        if (!drawnStaticRef.current) {
          draw()
          drawnStaticRef.current = !!worldRef.current
        }
      } else {
        draw()
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [draw])

  // Crisp rendering on high-DPI screens.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.scale(dpr, dpr)
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: `${size}px`, height: `${size}px`, display: 'block', pointerEvents: 'none' }}
    />
  )
}
