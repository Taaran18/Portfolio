'use client'

import { m, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_OUT, VIEWPORT } from '@/lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.85, ease: EASE_OUT, delay }}
    >
      {children}
    </m.div>
  )
}

const containerVariants = (gap: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT } },
}

interface StaggerProps {
  children: ReactNode
  className?: string
  gap?: number
  delay?: number
  as?: 'div' | 'ul' | 'ol' | 'dl'
}

export function Stagger({ children, className, gap = 0.07, delay = 0, as = 'div' }: StaggerProps) {
  const Component = as === 'ul' ? m.ul : as === 'ol' ? m.ol : as === 'dl' ? m.dl : m.div
  return (
    <Component
      className={className}
      variants={containerVariants(gap, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li'
}) {
  const Component = as === 'li' ? m.li : m.div
  return (
    <Component className={className} variants={itemVariants}>
      {children}
    </Component>
  )
}
