'use client'

import { useRef, useState, useEffect } from 'react'

const CX = 200, CY = 200
const R = { outer: 176, mid: 130, inner: 84, knob: 46 }

function toRad(deg: number) { return (deg - 90) * Math.PI / 180 }

function pt(r: number, deg: number): [number, number] {
  return [CX + r * Math.cos(toRad(deg)), CY + r * Math.sin(toRad(deg))]
}

function arc(r1: number, r2: number, a1: number, a2: number): string {
  const [x1, y1] = pt(r1, a1), [x2, y2] = pt(r1, a2)
  const [x3, y3] = pt(r2, a2), [x4, y4] = pt(r2, a1)
  const lg = ((a2 - a1) + 360) % 360 > 180 ? 1 : 0
  return `M${x1},${y1} A${r1},${r1} 0 ${lg} 1 ${x2},${y2} L${x3},${y3} A${r2},${r2} 0 ${lg} 0 ${x4},${y4}Z`
}

type Fill = 'hatch' | 'dots' | 'dense' | 'cross' | 'empty'

const OUTER: [number, number, Fill, string][] = [
  [1,   16,  'hatch', 'input read / output write'],
  [16,  26,  'dots',  'telemetry'],
  [27,  40,  'empty', 'wait state'],
  [40,  55,  'dense', 'slow loop'],
  [55,  63,  'cross', 'self test'],
  [64,  78,  'hatch', 'input read / output write'],
  [79,  91,  'empty', 'wait state'],
  [91,  105, 'dots',  'telemetry'],
  [106, 118, 'dense', 'slow loop'],
  [119, 133, 'hatch', 'input read / output write'],
  [133, 144, 'cross', 'self test'],
  [145, 159, 'empty', 'wait state'],
  [159, 173, 'dots',  'telemetry'],
  [174, 189, 'hatch', 'input read / output write'],
  [189, 205, 'dense', 'slow loop'],
  [206, 219, 'empty', 'wait state'],
  [220, 233, 'cross', 'self test'],
  [234, 249, 'hatch', 'input read / output write'],
  [250, 263, 'dots',  'telemetry'],
  [264, 278, 'empty', 'wait state'],
  [279, 294, 'dense', 'slow loop'],
  [294, 307, 'hatch', 'input read / output write'],
  [307, 319, 'cross', 'self test'],
  [320, 336, 'dots',  'telemetry'],
  [337, 358, 'empty', 'wait state'],
]

const INNER: [number, number, Fill, string][] = [
  [2,   43,  'dense', 'integration loop'],
  [43,  83,  'hatch', 'perception'],
  [83,  119, 'empty', 'latency'],
  [121, 163, 'dots',  'signal processing'],
  [163, 201, 'cross', 'self calibration'],
  [202, 242, 'dense', 'integration loop'],
  [242, 283, 'hatch', 'perception'],
  [284, 319, 'empty', 'latency'],
  [321, 358, 'dots',  'signal processing'],
]

const TICKS = [0, 72, 144, 216, 288].map((a, i) => ({ a, label: `0.${i * 2}` }))
const SPOKES = [0, 120, 240]

export default function CycleWheel() {
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [activeLabel, setActiveLabel] = useState('wait state')
  const svgRef = useRef<SVGSVGElement>(null)
  const prevAngle = useRef(0)
  const prevTime = useRef(0)
  const rafRef = useRef<number | undefined>(undefined)

  // Auto-rotate when idle
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

  // Track which segment is at the sweep indicator (top, 0°)
  useEffect(() => {
    const segAngle = ((-offset % 360) + 360) % 360
    const seg = OUTER.find(([s, e]) => segAngle >= s && segAngle < e)
    if (seg) setActiveLabel(seg[3])
  }, [offset])

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

  const [indX, indY] = pt(R.knob - 10, offset)

  return (
    <figure style={{ margin: '3lh 0 2lh', textAlign: 'center' }}>
      <p style={{
        fontFamily: "ui-monospace,'SF Mono',monospace",
        fontSize: '0.7rem',
        color: '#bbb',
        marginBottom: '1.5lh',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        cognitive cycle monitor
      </p>

      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        width="100%"
        style={{ maxWidth: 380, display: 'block', margin: '0 auto', userSelect: 'none' }}
        onPointerMove={onPointerMove}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
      >
        <defs>
          <pattern id="cw-hatch" patternUnits="userSpaceOnUse" width="5" height="5">
            <path d="M-1,1 l2,-2 M0,5 l5,-5 M4,6 l2,-2" stroke="#222" strokeWidth="0.7"/>
          </pattern>
          <pattern id="cw-dots" patternUnits="userSpaceOnUse" width="5" height="5">
            <circle cx="2.5" cy="2.5" r="0.95" fill="#222"/>
          </pattern>
          <pattern id="cw-dense" patternUnits="userSpaceOnUse" width="4" height="2.5">
            <line x1="0" y1="1.25" x2="4" y2="1.25" stroke="#222" strokeWidth="0.5"/>
          </pattern>
          <pattern id="cw-cross" patternUnits="userSpaceOnUse" width="5" height="5">
            <path d="M-1,1 l2,-2 M0,5 l5,-5 M4,6 l2,-2 M1,-1 l-2,2 M5,0 l-5,5 M6,4 l-2,2"
              stroke="#222" strokeWidth="0.5"/>
          </pattern>
        </defs>

        {/* Ring borders */}
        <circle cx={CX} cy={CY} r={R.outer} fill="none" stroke="#111" strokeWidth="0.75"/>
        <circle cx={CX} cy={CY} r={R.mid}   fill="none" stroke="#111" strokeWidth="0.4"/>
        <circle cx={CX} cy={CY} r={R.inner} fill="none" stroke="#111" strokeWidth="0.4"/>

        {/* Rotating segment rings */}
        <g transform={`rotate(${offset},${CX},${CY})`}>
          {OUTER.map(([s, e, f], i) => (
            <path key={`o${i}`}
              d={arc(R.outer - 1, R.mid + 1, s, e)}
              fill={f === 'empty' ? '#fff' : `url(#cw-${f})`}
              stroke="#111" strokeWidth="0.35"/>
          ))}
          {INNER.map(([s, e, f], i) => (
            <path key={`i${i}`}
              d={arc(R.mid - 1, R.inner + 1, s, e)}
              fill={f === 'empty' ? '#fff' : `url(#cw-${f})`}
              stroke="#111" strokeWidth="0.35"/>
          ))}
        </g>

        {/* Fixed sector spokes */}
        {SPOKES.map(a => {
          const [x, y] = pt(R.outer, a)
          return <line key={a} x1={CX} y1={CY} x2={x} y2={y} stroke="#111" strokeWidth="0.6"/>
        })}

        {/* Fixed tick marks */}
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

        {/* Fixed sweep indicator at top (0°) */}
        {(() => {
          const [x, y] = pt(R.outer - 2, 0)
          return <line x1={CX} y1={CY} x2={x} y2={y} stroke="#111" strokeWidth="0.9"/>
        })()}

        {/* Draggable knob */}
        <circle cx={CX} cy={CY} r={R.knob}
          fill="#fff" stroke="#111" strokeWidth="0.75"
          style={{ cursor: dragging ? 'grabbing' : 'grab' }}
          onPointerDown={onPointerDown}
        />
        {/* Grip lines */}
        {[-10, -3, 4, 11].map(yOff => (
          <line key={yOff}
            x1={CX - 14} y1={CY + yOff} x2={CX + 14} y2={CY + yOff}
            stroke="#ddd" strokeWidth="0.5" style={{ pointerEvents: 'none' }}/>
        ))}
        {/* Rotation indicator dot */}
        <circle cx={indX} cy={indY} r={2.5} fill="#111"
          style={{ pointerEvents: 'none' }}/>
      </svg>

      {/* State readout */}
      <figcaption style={{
        fontFamily: "ui-monospace,'SF Mono',monospace",
        fontSize: '0.7rem',
        color: '#aaa',
        marginTop: '1.5lh',
        letterSpacing: '0.04em',
      }}>
        state → <span style={{ color: '#111' }}>{activeLabel}</span>
      </figcaption>

      {/* Legend */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5lh 2ch',
        justifyContent: 'center',
        marginTop: '1.5lh',
        fontFamily: "ui-monospace,'SF Mono',monospace",
        fontSize: '0.65rem',
        color: '#aaa',
      }}>
        {[
          ['hatch', 'input read / output write'],
          ['dots',  'telemetry'],
          ['cross', 'self test'],
          ['dense', 'integration loop'],
          ['empty', 'wait state'],
        ].map(([fill, label]) => (
          <span key={fill} style={{ display: 'flex', alignItems: 'center', gap: '0.5ch' }}>
            <svg width="10" height="10" viewBox="0 0 10 10">
              <defs>
                <pattern id={`leg-${fill}`} patternUnits="userSpaceOnUse" width="5" height="5">
                  {fill === 'hatch' && <path d="M-1,1 l2,-2 M0,5 l5,-5 M4,6 l2,-2" stroke="#222" strokeWidth="0.7"/>}
                  {fill === 'dots'  && <circle cx="2.5" cy="2.5" r="0.95" fill="#222"/>}
                  {fill === 'dense' && <line x1="0" y1="1.25" x2="5" y2="1.25" stroke="#222" strokeWidth="0.5"/>}
                  {fill === 'cross' && <path d="M-1,1 l2,-2 M0,5 l5,-5 M4,6 l2,-2 M1,-1 l-2,2 M5,0 l-5,5 M6,4 l-2,2" stroke="#222" strokeWidth="0.5"/>}
                </pattern>
              </defs>
              <rect width="10" height="10"
                fill={fill === 'empty' ? '#fff' : `url(#leg-${fill})`}
                stroke="#aaa" strokeWidth="0.5"/>
            </svg>
            {label}
          </span>
        ))}
      </div>
    </figure>
  )
}
