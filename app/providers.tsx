'use client'

import { ThemeProvider } from 'next-themes'
import { LazyMotion, MotionConfig } from 'framer-motion'

const loadMotionFeatures = () => import('@/lib/motion-features').then((mod) => mod.default)

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false} themes={['light', 'dark']}>
      <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  )
}
