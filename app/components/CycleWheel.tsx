'use client'

import { useRef, useState } from 'react'

const CX = 200, CY = 200
const R = { outer: 176, mid: 130, inner: 84, knob: 46 }

function toRad(deg: number) { return (deg - 90) * Math.PI / 180 }
function pt(r: number, deg: number): [number, number] {
  return [CX + r * Math.cos(toRad(deg)), CY + r * Math.sin(toRad(deg))]
}

const STATIONS = [
  { angle: 0,   label: 'Perception', desc: 'How systems develop awareness of context.' },
  { angle: 72,  label: 'Memory',     desc: 'How intelligence retains and forgets.' },
  { angle: 144, label: 'Emergence',  desc: 'Behaviour that arises without being designed.' },
  { angle: 216, label: 'Evolution',  desc: 'How systems reshape themselves under pressure.' },
  { angle: 288, label: 'Latency',    desc: 'The space between input and response, where cognition lives.' },
]

function nearestStation(a: number): number {
  let best = 0, bestDist = Infinity
  STATIONS.forEach((s, i) => {
    const d = Math.abs(((a - s.angle + 540) % 360) - 180)
    if (d < bestDist) { bestDist = d; best = i }
  })
  return best
}

export default function CycleWheel() {
  const [angle, setAngle] = useState(0)
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const prevPointer = useRef(0)

  function getPointerAngle(e: React.PointerEvent): number {
    const rect = svgRef.current!.getBoundingClientRect()
    const scale = 400 / rect.width
    const x = (e.clientX - rect.left) * scale - CX
    const y = (e.clientY - rect.top) * scale - CY
    return (Math.atan2(y, x) * 180 / Math.PI + 90 + 360) % 360
  }

  function snap(a: number) {
    const i = nearestStation(a)
    // Find the equivalent target angle closest to current to avoid wrap-around animation
    const diff = ((a - STATIONS[i].angle + 540) % 360) - 180
    setAngle(a - diff)
    setActive(i)
  }

  function onPointerDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId)
    prevPointer.current = getPointerAngle(e)
    setDragging(true)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging) return
    const a = getPointerAngle(e)
    let d = a - prevPointer.current
    if (d > 180) d -= 360
    if (d < -180) d += 360
    prevPointer.current = a
    setAngle(prev => prev + d)
  }

  function onPointerUp() {
    setDragging(false)
    snap(angle)
  }

  function onTickClick(stationIndex: number) {
    setActive(stationIndex)
    setAngle(STATIONS[stationIndex].angle)
  }

  const station = STATIONS[active]

  return (
    <figure style={{ margin: '3lh 0 2lh', textAlign: 'left' }}>
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        width="100%"
        style={{ maxWidth: 380, display: 'block', margin: '0 auto', userSelect: 'none' }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={() => { if (dragging) { setDragging(false); snap(angle) } }}
      >
        {/* Concentric rings */}
        <circle cx={CX} cy={CY} r={R.outer} fill="none" stroke="#111" strokeWidth="0.75"/>
        <circle cx={CX} cy={CY} r={R.mid}   fill="none" stroke="#111" strokeWidth="0.4"/>
        <circle cx={CX} cy={CY} r={R.inner} fill="none" stroke="#111" strokeWidth="0.4"/>

        {/* Tick marks — clickable */}
        {STATIONS.map((s, i) => {
          const [ix, iy] = pt(R.outer + 4,  s.angle)
          const [ox, oy] = pt(R.outer + 12, s.angle)
          const [tx, ty] = pt(R.outer + 22, s.angle)
          const isActive = i === active
          return (
            <g key={i} onClick={() => onTickClick(i)} style={{ cursor: 'pointer' }}>
              {/* Invisible hit area */}
              <circle cx={tx} cy={ty} r={14} fill="transparent"/>
              <line x1={ix} y1={iy} x2={ox} y2={oy}
                stroke={isActive ? '#111' : '#bbb'} strokeWidth={isActive ? 1 : 0.6}/>
              <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle"
                fontSize="8" fontFamily="ui-monospace,'SF Mono',monospace"
                fill={isActive ? '#111' : '#bbb'}>
                {`0.${i * 2}`}
              </text>
            </g>
          )
        })}

        {/* Sweep indicator — rotates with angle */}
        <g style={{
          transformOrigin: `${CX}px ${CY}px`,
          transform: `rotate(${angle}deg)`,
          transition: dragging ? 'none' : 'transform 0.5s cubic-bezier(0.34,1.2,0.64,1)',
        }}>
          <line x1={CX} y1={CY} x2={CX} y2={CY - R.outer + 2}
            stroke="#111" strokeWidth="0.9"/>
        </g>

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

      {/* Active station readout */}
      <div style={{
        fontFamily: "ui-monospace,'SF Mono',monospace",
        fontSize: '0.75rem',
        marginTop: '2lh',
        maxWidth: 380,
        margin: '2lh auto 0',
      }}>
        <span style={{ color: '#111', fontWeight: 500 }}>{station.label.toLowerCase()}</span>
        <span style={{ color: '#aaa', marginLeft: '1.5ch' }}>— {station.desc}</span>
      </div>
    </figure>
  )
}
