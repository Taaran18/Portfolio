'use client'

import { useState, useEffect } from 'react'
import type { MousePosition } from '@/types'

/**
 * Tracks the mouse cursor position relative to the viewport.
 * Returns normalized coordinates (x, y) as well as raw pixel values.
 */
export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [normalised, setNormalised] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setNormalised({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return { position, normalised }
}
