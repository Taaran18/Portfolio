'use client'

import ErrorView from '@/components/ui/ErrorView'

export default function RootError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <main id="main-content" className="min-h-screen flex items-center">
      <title>Something Went Wrong | Taaran Jain</title>
      <ErrorView error={error} retry={unstable_retry} />
    </main>
  )
}
