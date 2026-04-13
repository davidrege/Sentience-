'use client'

import { useRef, useState, useEffect } from 'react'

const CX = 200, CY = 200
const R = { outer: 176, mid: 130, inner: 84, knob: 46 }

function toRad(deg: number) { return (deg - 90) * Math.PI / 180 }

function pt(r: number, deg: number): [number, number] {
  return [CX + r * Math.cos(toRad(deg)), CY + r * Math.sin(toRad(deg))]
}

const TICKS = [0, 72, 144, 216, 288].map((a, i) => ({ a, label: `0.${i * 2}` }))

export default function CycleWheel() {
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const prevAngle = useRef(0)
  const prevTime = useRef(0)
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (dragging) return
    prevTime.current = 0
    function tick(t: number) {
      if (prevTime.current) {
        setOffset(o => (o + (t - prevTime.current) * 0.008) % 360)
      }
      prevTime.current = t
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [dragging])

  function getPointerAngle(e: React.PointerEvent): number {
    const rect = svgRef.current!.getBoundingClientRect()
    const scale = 400 / rect.width
    const x = (e.clientX - rect.left) * scale - CX
    const y = (e.clientY - rect.top) * scale - CY
    return (Math.atan2(y, x) * 180 / Math.PI + 90 + 360) % 360
  }

  function onPointerDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId)
    prevAngle.current = getPointerAngle(e)
    setDragging(true)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging) return
    const a = getPointerAngle(e)
    let d = a - prevAngle.current
    if (d > 180) d -= 360
    if (d < -180) d += 360
    prevAngle.current = a
    setOffset(o => (o + d + 360) % 360)
  }

  const [sweepX, sweepY] = pt(R.outer - 2, 0)

  return (
    <figure style={{ margin: '3lh 0 2lh', textAlign: 'center' }}>
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        width="100%"
        style={{ maxWidth: 380, display: 'block', margin: '0 auto', userSelect: 'none' }}
        onPointerMove={onPointerMove}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
      >
        {/* Concentric rings */}
        <circle cx={CX} cy={CY} r={R.outer} fill="none" stroke="#111" strokeWidth="0.75"/>
        <circle cx={CX} cy={CY} r={R.mid}   fill="none" stroke="#111" strokeWidth="0.4"/>
        <circle cx={CX} cy={CY} r={R.inner} fill="none" stroke="#111" strokeWidth="0.4"/>

        {/* Tick marks */}
        {TICKS.map(({ a, label }) => {
          const [ix, iy] = pt(R.outer + 4, a)
          const [ox, oy] = pt(R.outer + 10, a)
          const [tx, ty] = pt(R.outer + 20, a)
          return (
            <g key={a}>
              <line x1={ix} y1={iy} x2={ox} y2={oy} stroke="#111" strokeWidth="0.6"/>
              <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle"
                fontSize="8" fontFamily="ui-monospace,'SF Mono',monospace" fill="#111">
                {label}
              </text>
            </g>
          )
        })}

        {/* Fixed sweep indicator */}
        <line x1={CX} y1={CY} x2={sweepX} y2={sweepY} stroke="#111" strokeWidth="0.9"/>

        {/* Draggable knob */}
        <circle cx={CX} cy={CY} r={R.knob}
          fill="#fff" stroke="#111" strokeWidth="0.75"
          style={{ cursor: dragging ? 'grabbing' : 'grab' }}
          onPointerDown={onPointerDown}
        />
        {/* Crosshair */}
        <line x1={CX - 10} y1={CY} x2={CX + 10} y2={CY}
          stroke="#bbb" strokeWidth="0.6" style={{ pointerEvents: 'none' }}/>
        <line x1={CX} y1={CY - 10} x2={CX} y2={CY + 10}
          stroke="#bbb" strokeWidth="0.6" style={{ pointerEvents: 'none' }}/>
      </svg>
    </figure>
  )
}
