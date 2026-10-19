export const EASE_OUT = [0.16, 1, 0.3, 1] as const

export const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' } as const

interface RevealOptions {
  delay?: number
  duration?: number
  margin?: string
  y?: number
}

export function fadeInScale({ delay = 0, duration = 0.8, margin = VIEWPORT.margin, y = 24 }: RevealOptions = {}) {
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin },
    transition: { duration, delay, ease: EASE_OUT },
  }
}

export function slideIn(
  direction: 'left' | 'right',
  { delay = 0, duration = 0.8, margin = VIEWPORT.margin }: RevealOptions = {}
) {
  return {
    initial: { opacity: 0, x: direction === 'left' ? -20 : 20, y: 12 },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin },
    transition: { duration, delay, ease: EASE_OUT },
  }
}

export function fadeUp(delay: number, active = true) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: active ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, ease: EASE_OUT, delay },
  }
}
