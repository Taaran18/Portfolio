'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { useMousePosition } from '@/hooks/useMousePosition'

export default function CursorGlow() {
  const { resolvedTheme } = useTheme()
  const { position } = useMousePosition()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  const isDark = resolvedTheme === 'dark'

  // Animate the lagging outer ring
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, position.x, 0.1)
      ringPos.current.y = lerp(ringPos.current.y, position.y, 0.1)

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [position])

  // Update cursor colors live when theme changes
  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return

    if (isDark) {
      dotRef.current.style.background = '#22d3ee'
      dotRef.current.style.boxShadow = '0 0 6px #22d3ee, 0 0 12px #22d3ee'
      ringRef.current.style.border = '1.5px solid rgba(34, 211, 238, 0.55)'
      ringRef.current.style.boxShadow = '0 0 10px rgba(34, 211, 238, 0.2)'
    } else {
      dotRef.current.style.background = '#0f172a'
      dotRef.current.style.boxShadow = '0 0 6px rgba(15,23,42,0.4)'
      ringRef.current.style.border = '1.5px solid rgba(15, 23, 42, 0.45)'
      ringRef.current.style.boxShadow = 'none'
    }
  }, [isDark])

  return (
    <>
      {/* Dot — snaps to cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          background: '#22d3ee',
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
          boxShadow: '0 0 6px #22d3ee, 0 0 12px #22d3ee',
          transition: 'transform 0.05s linear, background 0.3s, box-shadow 0.3s',
        }}
      />
      {/* Ring — trails behind */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998]"
        style={{
          border: '1.5px solid rgba(34, 211, 238, 0.55)',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
      />
    </>
  )
}
