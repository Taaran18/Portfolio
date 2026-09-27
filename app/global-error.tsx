'use client'

import './globals.css'
import ErrorView from '@/components/ui/ErrorView'

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <html lang="en">
      <body>
        <title>Something Went Wrong | Taaran Jain</title>
        <main id="main-content" className="min-h-screen flex items-center">
          <ErrorView error={error} retry={unstable_retry} />
        </main>
      </body>
    </html>
  )
}
