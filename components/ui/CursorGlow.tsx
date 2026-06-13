'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

/** Media query that is only true for real mouse/trackpad devices (desktop). */
const FINE_POINTER = '(hover: hover) and (pointer: fine)'

export default function CursorGlow() {
  const { resolvedTheme } = useTheme()
  const [enabled, setEnabled] = useState(false)

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: -100, y: -100 })
  const dot = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)

  const isDark = resolvedTheme === 'dark'

  // Only enable the custom cursor on desktop (fine pointer + hover).
  // On mobile / tablet (touch) it never renders, so there's no stray dot.
  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER)
    const apply = () => setEnabled(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // Track the pointer in a ref (no React re-render) and ease toward it via RAF
  // for a buttery-smooth trail. Dot follows fast, ring lags behind.
  useEffect(() => {
    if (!enabled) return

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      dot.current.x = lerp(dot.current.x, target.current.x, 0.35)
      dot.current.y = lerp(dot.current.y, target.current.y, 0.35)
      ring.current.x = lerp(ring.current.x, target.current.x, 0.16)
      ring.current.y = lerp(ring.current.y, target.current.y, 0.16)

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${dot.current.x - 4}px, ${dot.current.y - 4}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ring.current.x - 20}px, ${ring.current.y - 20}px, 0)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      {/* Dot — eases quickly to the cursor */}
      <div
        ref={dotRef}
        data-cursor="dot"
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{
          background: isDark ? '#22d3ee' : '#0f172a',
          boxShadow: isDark
            ? '0 0 6px #22d3ee, 0 0 12px #22d3ee'
            : '0 0 6px rgba(15,23,42,0.4)',
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
      />
      {/* Ring — trails behind for a smooth lag effect */}
      <div
        ref={ringRef}
        data-cursor="ring"
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] will-change-transform"
        style={{
          border: isDark
            ? '1.5px solid rgba(34, 211, 238, 0.55)'
            : '1.5px solid rgba(15, 23, 42, 0.45)',
          boxShadow: isDark ? '0 0 10px rgba(34, 211, 238, 0.2)' : 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
      />
    </>
  )
}
