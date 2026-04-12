'use client'

import { useRef, useEffect, useState } from 'react'

export default function AnimatedRule() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        fontFamily: "ui-monospace,'SF Mono',monospace",
        fontSize: '0.85rem',
        color: '#ccc',
        overflow: 'hidden',
        clipPath: visible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
        transition: 'clip-path 0.9s cubic-bezier(0.4,0,0.2,1)',
        margin: '2lh 0',
        whiteSpace: 'nowrap',
      }}
    >
      {'─'.repeat(100)}
    </div>
  )
}
