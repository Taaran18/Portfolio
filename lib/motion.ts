export const EASE_OUT = [0.16, 1, 0.3, 1] as const

interface RevealOptions {
  delay?: number
  duration?: number
  margin?: string
  y?: number
}

export function fadeInScale({ delay = 0, duration = 0.6, margin = '-40px', y = 20 }: RevealOptions = {}) {
  return {
    initial: { opacity: 0, scale: 0.88, y },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true, margin },
    transition: { duration, delay, ease: EASE_OUT },
  }
}

export function slideIn(
  direction: 'left' | 'right',
  { delay = 0, duration = 0.65, margin = '-60px' }: RevealOptions = {}
) {
  return {
    initial: { opacity: 0, scale: 0.88, x: direction === 'left' ? -60 : 60 },
    whileInView: { opacity: 1, scale: 1, x: 0 },
    viewport: { once: true, margin },
    transition: { duration, delay, ease: EASE_OUT },
  }
}
