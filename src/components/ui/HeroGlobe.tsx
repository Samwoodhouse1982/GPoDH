'use client'

import { useEffect, useRef, useCallback } from 'react'
import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo'
import { feature } from 'topojson-client'

interface Pin {
  name: string
  coords: [number, number]
  label: string
}

const PINS: Pin[] = [
  { name: 'UK',           coords: [ -1.77,  51.23], label: 'AI equity in health'          },
  { name: 'Geneva',       coords: [  6.15,  46.20], label: 'WHO digital health policy'    },
  { name: 'Turkey',       coords: [ 28.98,  41.01], label: 'Refugee digital health'       },
  { name: 'Nigeria',      coords: [  8.68,   9.08], label: 'West Africa healthtech'       },
  { name: 'DR Congo',     coords: [ 15.33,  -4.33], label: 'Newborn care, last mile'      },
  { name: 'Kenya',        coords: [ 36.82,  -1.29], label: 'Community health workers'     },
  { name: 'Rwanda',       coords: [ 29.87,  -1.94], label: 'Mental health & policy'       },
  { name: 'Eswatini',     coords: [ 31.47, -26.52], label: 'Digital health scale-up'      },
  { name: 'Mozambique',   coords: [ 32.57, -25.97], label: 'Impact evaluation'            },
  { name: 'South Africa', coords: [ 18.42, -33.93], label: 'Digital health equity'        },
  { name: 'Pakistan',     coords: [ 69.35,  30.38], label: 'mHealth at scale'             },
  { name: 'India',        coords: [ 78.96,  20.59], label: 'Rural health & AI'            },
  { name: 'Bangladesh',   coords: [ 90.39,  23.68], label: 'Healthtech investment'        },
  { name: 'Philippines',  coords: [121.77,  12.88], label: 'Implementation science'       },
  { name: 'Indonesia',    coords: [113.92,  -0.79], label: 'Last mile delivery'           },
  { name: 'Colombia',     coords: [-74.08,   4.71], label: 'Maternal digital health'      },
  { name: 'Brazil',       coords: [-51.93, -14.24], label: 'Health data poverty'          },
  { name: 'USA',          coords: [-77.04,  38.91], label: 'USAID & global health'        },
]

// Label layout
const PAD_X       = 8
const PAD_Y       = 5
const LINE_H      = 13
const BOX_H       = 2 * LINE_H + PAD_Y * 2
const OUTSET_BASE = 78
const OUTSET_MAX  = 190
const OUTSET_STEP = 10
const ANG_STEPS   = [0, 7, -7, 14, -14, 21, -21, 28, -28]
const BOX_MARGIN  = 8

// Label lifecycle
const MAX_LABELS     = 3
const FADE_IN_SPEED  = 0.022   // per frame ≈ 0.75s to fully appear at 60fps
const FADE_OUT_SPEED = 0.018   // per frame ≈ 0.9s to fully disappear
const HOLD_MIN_MS    = 4500
const HOLD_RANGE_MS  = 3000    // hold for 4.5 – 7.5 s before swapping out
const ADD_COOLDOWN   = 600     // ms between adding new labels (staggers the intro)
const MIN_FACING     = 0.25    // pin must be this well-facing to be a candidate

type LabelSlot = {
  idx:          number
  alpha:        number
  phase:        'in' | 'hold' | 'out'
  holdStartMs:  number
  holdDuration: number
  // Locked at placement — defines label position relative to the pin direction
  placed:       boolean
  angOffset:    number   // angle offset from pin→center direction (radians)
  outset:       number   // distance beyond sphere radius
  boxW:         number   // box width (fixed at placement)
}

function rectsOverlap(
  ax: number, ay: number, aw: number, ah: number,
  bx: number, by: number, bw: number, bh: number,
): boolean {
  return (
    ax < bx + bw + BOX_MARGIN && ax + aw + BOX_MARGIN > bx &&
    ay < by + bh + BOX_MARGIN && ay + ah + BOX_MARGIN > by
  )
}

function dotProduct(coord: [number, number], lon: number, lat: number): number {
  const R = Math.PI / 180
  return (
    Math.cos(coord[1] * R) * Math.cos(lat * R) * Math.cos((coord[0] - lon) * R) +
    Math.sin(coord[1] * R) * Math.sin(lat * R)
  )
}

function drawMedCross(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.moveTo(x - size, y); ctx.lineTo(x + size, y)
  ctx.moveTo(x, y - size); ctx.lineTo(x, y + size)
}

export default function HeroGlobe() {
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const worldRef      = useRef<unknown>(null)
  const lonRef        = useRef(10)
  const rafRef        = useRef<number>(0)
  const slotsRef      = useRef<LabelSlot[]>([])
  const lastAddRef    = useRef<number>(0)

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

    lonRef.current += 0.04
    const lon = lonRef.current
    const lat = 18

    const rect = canvas.getBoundingClientRect()
    const W = rect.width, H = rect.height
    const cx = W / 2, cy = H / 2
    const radius = Math.min(W, H) * 0.41

    ctx.clearRect(0, 0, W, H)

    const projection = geoOrthographic()
      .scale(radius).translate([cx, cy]).rotate([-lon, -lat]).clipAngle(90)
    const pathGen = geoPath(projection, ctx as Parameters<typeof geoPath>[1])

    // Atmosphere
    const atmoGrad = ctx.createRadialGradient(cx, cy, radius * 0.88, cx, cy, radius * 1.16)
    atmoGrad.addColorStop(0, 'rgba(58,104,96,0.20)'); atmoGrad.addColorStop(1, 'rgba(58,104,96,0)')
    ctx.beginPath(); ctx.arc(cx, cy, radius * 1.16, 0, Math.PI * 2)
    ctx.fillStyle = atmoGrad; ctx.fill()

    // Sphere base
    const sphGrad = ctx.createRadialGradient(cx - radius * 0.28, cy - radius * 0.28, 0, cx, cy, radius)
    sphGrad.addColorStop(0, 'rgba(80,140,130,0.14)'); sphGrad.addColorStop(1, 'rgba(40,90,82,0.06)')
    ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fillStyle = sphGrad; ctx.fill()

    // Graticule
    ctx.beginPath(); pathGen(geoGraticule()())
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 0.4; ctx.stroke()

    // Countries
    if (worldRef.current) {
      ctx.beginPath(); pathGen(worldRef.current as Parameters<typeof pathGen>[0])
      ctx.fillStyle = 'rgba(58,130,118,0.18)'; ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.10)'; ctx.lineWidth = 0.5; ctx.stroke()
    }

    // Sphere outline
    ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1.2; ctx.stroke()

    // ── Build visibility map ───────────────────────────────────────────────
    const facingMap: Record<number, number> = {}
    PINS.forEach((pin, idx) => { facingMap[idx] = dotProduct(pin.coords, lon, lat) })

    // ── Update label slots ─────────────────────────────────────────────────
    const slots = slotsRef.current

    for (const slot of slots) {
      if (slot.phase === 'in') {
        slot.alpha += FADE_IN_SPEED
        if (slot.alpha >= 1) {
          slot.alpha = 1
          slot.phase = 'hold'
          slot.holdStartMs = timestamp
          slot.holdDuration = HOLD_MIN_MS + Math.random() * HOLD_RANGE_MS
        }
      } else if (slot.phase === 'hold') {
        // Force out if pin has rotated to back of globe
        if (facingMap[slot.idx] <= 0) {
          slot.phase = 'out'
        } else if (timestamp - slot.holdStartMs >= slot.holdDuration) {
          slot.phase = 'out'
        }
      } else {
        // 'out'
        slot.alpha -= FADE_OUT_SPEED
      }
    }

    // Remove fully faded slots
    slotsRef.current = slots.filter(s => !(s.phase === 'out' && s.alpha <= 0))

    // Add a new label if we have room and the cooldown has passed
    const activeCount = slotsRef.current.filter(s => s.phase !== 'out').length
    if (activeCount < MAX_LABELS && timestamp - lastAddRef.current >= ADD_COOLDOWN) {
      const usedIndices = new Set(slotsRef.current.map(s => s.idx))
      const candidates = PINS
        .map((_, idx) => idx)
        .filter(idx => !usedIndices.has(idx) && facingMap[idx] >= MIN_FACING)

      if (candidates.length > 0) {
        // Pick randomly from up to 8 best-facing candidates to add variety
        const pool = candidates
          .sort((a, b) => facingMap[b] - facingMap[a])
          .slice(0, 8)
        const pick = pool[Math.floor(Math.random() * pool.length)]
        slotsRef.current.push({
          idx: pick,
          alpha: 0,
          phase: 'in',
          holdStartMs: 0,
          holdDuration: HOLD_MIN_MS + Math.random() * HOLD_RANGE_MS,
          placed: false,
          angOffset: 0, outset: OUTSET_BASE, boxW: 0,
        })
        lastAddRef.current = timestamp
      }
    }

    // ── Draw all pin dots (no labels yet) ─────────────────────────────────
    PINS.forEach((pin, idx) => {
      const facing = facingMap[idx]
      if (facing <= 0) return
      const p = projection(pin.coords)
      if (!p) return
      const pulse = 0.5 + 0.5 * Math.sin(timestamp * 0.0014 + idx * 0.85)
      const alpha = 0.45 + facing * 0.55

      ctx.beginPath(); ctx.arc(p[0], p[1], 10 + pulse * 7, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(212,97,74,${(0.07 + pulse * 0.10) * alpha})`
      ctx.lineWidth = 0.8; ctx.stroke()

      ctx.beginPath(); ctx.arc(p[0], p[1], 5.5, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(212,97,74,${0.55 * alpha})`
      ctx.lineWidth = 1; ctx.stroke()

      ctx.save()
      ctx.shadowBlur = 10; ctx.shadowColor = `rgba(212,97,74,${0.75 * alpha})`
      ctx.beginPath(); ctx.arc(p[0], p[1], 3.2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(212,97,74,${alpha})`; ctx.fill()
      ctx.restore()

      ctx.save(); ctx.globalAlpha = alpha * 0.85
      ctx.beginPath(); drawMedCross(ctx, p[0], p[1], 1.6)
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.1; ctx.lineCap = 'round'; ctx.stroke()
      ctx.restore()
    })

    // ── Step 1: lock angOffset + outset for newly added slots ─────────────
    // Existing placed slots contribute their current screen rect for overlap checks.
    type ActiveLabel = { slot: LabelSlot; pin: Pin; px: number; py: number; bx: number; by: number }
    const activeLabels: ActiveLabel[] = []

    // First compute current screen positions for already-placed slots
    for (const slot of slotsRef.current) {
      if (!slot.placed) continue
      const pin = PINS[slot.idx]
      const p = projection(pin.coords) as [number, number] | null
      if (!p) continue
      const pinAngle = Math.atan2(p[1] - cy, p[0] - cx)
      const labelAngle = pinAngle + slot.angOffset
      const lx = cx + Math.cos(labelAngle) * (radius + slot.outset)
      const ly = cy + Math.sin(labelAngle) * (radius + slot.outset)
      const bx = Math.max(3, Math.min(W - slot.boxW - 3, lx - slot.boxW / 2))
      const by = Math.max(3, Math.min(H - BOX_H - 3, ly - BOX_H / 2))
      activeLabels.push({ slot, pin, px: p[0], py: p[1], bx, by })
    }

    // Now place any new slots, avoiding current rects of already-active labels
    for (const slot of slotsRef.current) {
      if (slot.placed) continue
      const pin = PINS[slot.idx]
      const p = projection(pin.coords) as [number, number] | null
      if (!p) continue

      ctx.font = '600 10px "DM Sans", sans-serif'
      const nameW = ctx.measureText(pin.name).width
      ctx.font = '400 10px "DM Sans", sans-serif'
      const labelW = ctx.measureText(pin.label).width
      const boxW = Math.max(nameW, labelW) + PAD_X * 2

      const pinAngle = Math.atan2(p[1] - cy, p[0] - cx)
      let foundAngOffset = 0, foundOutset = OUTSET_BASE

      outerSearch:
      for (const angDeg of ANG_STEPS) {
        const angOffset = angDeg * (Math.PI / 180)
        for (let extra = 0; extra <= OUTSET_MAX - OUTSET_BASE; extra += OUTSET_STEP) {
          const outset = OUTSET_BASE + extra
          const labelAngle = pinAngle + angOffset
          const lx = cx + Math.cos(labelAngle) * (radius + outset)
          const ly = cy + Math.sin(labelAngle) * (radius + outset)
          const bx = Math.max(3, Math.min(W - boxW - 3, lx - boxW / 2))
          const by = Math.max(3, Math.min(H - BOX_H - 3, ly - BOX_H / 2))
          let overlaps = false
          for (const al of activeLabels) {
            if (rectsOverlap(bx, by, boxW, BOX_H, al.bx, al.by, al.slot.boxW, BOX_H)) {
              overlaps = true; break
            }
          }
          if (!overlaps) { foundAngOffset = angOffset; foundOutset = outset; break outerSearch }
        }
      }

      slot.angOffset = foundAngOffset
      slot.outset    = foundOutset
      slot.boxW      = boxW
      slot.placed    = true

      // Compute its current position and add to activeLabels for sibling overlap checks
      const labelAngle = pinAngle + foundAngOffset
      const lx = cx + Math.cos(labelAngle) * (radius + foundOutset)
      const ly = cy + Math.sin(labelAngle) * (radius + foundOutset)
      const bx = Math.max(3, Math.min(W - boxW - 3, lx - boxW / 2))
      const by = Math.max(3, Math.min(H - BOX_H - 3, ly - BOX_H / 2))
      activeLabels.push({ slot, pin, px: p[0], py: p[1], bx, by })
    }

    // ── Step 2: dynamic overlap guard — fade out newer label if they collide ──
    for (let i = 0; i < activeLabels.length; i++) {
      for (let j = i + 1; j < activeLabels.length; j++) {
        const a = activeLabels[i], b = activeLabels[j]
        if (rectsOverlap(a.bx, a.by, a.slot.boxW, BOX_H, b.bx, b.by, b.slot.boxW, BOX_H)) {
          if (b.slot.phase !== 'out') b.slot.phase = 'out'
        }
      }
    }

    // ── Draw connector lines — pin dot moves live, box follows via angOffset ──
    for (const { slot, px, py, bx, by } of activeLabels) {
      const a = slot.alpha
      const boxCx = bx + slot.boxW / 2, boxCy = by + BOX_H / 2
      const angle = Math.atan2(boxCy - py, boxCx - px)
      ctx.save()
      ctx.globalAlpha = a * 0.55
      ctx.beginPath()
      ctx.moveTo(px + Math.cos(angle) * 7, py + Math.sin(angle) * 7)
      ctx.lineTo(boxCx - Math.cos(angle) * (slot.boxW / 2 + 2), boxCy - Math.sin(angle) * (BOX_H / 2 + 2))
      ctx.strokeStyle = 'rgba(212,97,74,0.9)'; ctx.lineWidth = 0.9
      ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([])
      ctx.globalAlpha = a
      ctx.beginPath()
      ctx.arc(boxCx - Math.cos(angle) * (slot.boxW / 2 + 2), boxCy - Math.sin(angle) * (BOX_H / 2 + 2), 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(212,97,74,0.9)'; ctx.fill()
      ctx.restore()
    }

    // ── Draw label cards ───────────────────────────────────────────────────
    for (const { slot, pin, bx, by } of activeLabels) {
      const a = slot.alpha
      const boxW = slot.boxW
      ctx.save()
      ctx.globalAlpha = a * 0.92
      ctx.fillStyle = 'rgba(10,24,22,0.82)'
      ctx.beginPath(); ctx.roundRect(bx, by, boxW, BOX_H, 4); ctx.fill()
      ctx.strokeStyle = 'rgba(212,97,74,0.35)'; ctx.lineWidth = 0.8; ctx.stroke()

      ctx.globalAlpha = a
      ctx.font = '600 10px "DM Sans", sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.92)'
      ctx.fillText(pin.name, bx + PAD_X, by + PAD_Y + 8)
      ctx.font = '400 10px "DM Sans", sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.7)'
      ctx.fillText(pin.label, bx + PAD_X, by + PAD_Y + LINE_H + 8)
      ctx.restore()
    }

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
      canvas.width = r.width * dpr; canvas.height = r.height * dpr
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
