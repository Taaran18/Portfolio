'use client'

import { ThemeProvider } from 'next-themes'
import { MotionConfig } from 'framer-motion'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      themes={['light', 'dark']}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  )
}
