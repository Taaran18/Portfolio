'use client'

import { m, useScroll, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'

// Drifts its children down as the page scrolls past the first screen. Used by the hero.
export default function ParallaxLayer({
  children,
  distance,
  className,
}: {
  children: ReactNode
  distance: number
  className?: string
}) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 900], [0, distance])
  return (
    <m.div style={{ y }} className={className}>
      {children}
    </m.div>
  )
}
