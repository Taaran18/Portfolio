'use client'

import ErrorView from '@/components/ui/ErrorView'

export default function SiteError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen pt-24 md:pt-28 focus:outline-none">
      <title>Something Went Wrong | Taaran Jain</title>
      <ErrorView error={error} retry={unstable_retry} />
    </main>
  )
}
