'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import clsx from 'clsx'

type CardPadding = 'none' | 'sm' | 'md'
type CardHover = 'none' | 'subtle' | 'lift'

const PADDING: Record<CardPadding, string> = {
  none: '',
  sm: 'p-5',
  md: 'p-6',
}

const HOVER: Record<CardHover, string> = {
  none: '',
  subtle: 'hover:border-indigo-500/40 transition-all',
  lift: 'surface-raise hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300',
}

interface CardOwnProps {
  as?: 'div' | 'a'
  padding?: CardPadding
  hover?: CardHover

  borderGradient?: boolean
  group?: boolean
  className?: string
  children: React.ReactNode
}

type CardProps = CardOwnProps &
  Omit<HTMLMotionProps<'div'> & HTMLMotionProps<'a'>, keyof CardOwnProps>

export default function Card({
  as = 'div',
  padding = 'md',
  hover = 'lift',
  borderGradient = false,
  group = true,
  className,
  children,
  ...motionProps
}: CardProps) {
  const classes = clsx(
    'surface rounded-3xl',
    PADDING[padding],
    borderGradient && 'border-gradient',
    HOVER[hover],
    group && 'group',
    className
  )

  if (as === 'a') {
    return (
      <motion.a className={classes} {...(motionProps as HTMLMotionProps<'a'>)}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.div className={classes} {...(motionProps as HTMLMotionProps<'div'>)}>
      {children}
    </motion.div>
  )
}
