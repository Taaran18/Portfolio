'use client'

import { useEffect, useTransition } from 'react'
import { Home, Mail, RotateCw } from 'lucide-react'
import Button from '@/components/ui/Button'
import StatusPage from '@/components/ui/StatusPage'
import { SITE } from '@/lib/site'

interface Props {
  error: Error & { digest?: string }
  retry: () => void
  className?: string
}

export default function ErrorView({ error, retry, className }: Props) {
  const [retrying, startTransition] = useTransition()

  useEffect(() => {
    console.error(error)
  }, [error])

  const reference = error.digest
  const mailSubject = `Error on ${SITE.url.replace(/^https?:\/\//, '')}${reference ? ` (ref ${reference})` : ''}`

  return (
    <StatusPage
      className={className}
      code="Error"
      eyebrow="Something went wrong"
      title="This Page Couldn't Load"
      description={
        <>
          <p>
            An unexpected error stopped it from rendering. It's a problem on the site, not something you did. Trying
            again usually fixes it.
          </p>
          {reference && (
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-500">
              Error reference: <code className="font-mono select-all">{reference}</code>
            </p>
          )}
        </>
      }
      actions={
        <>
          <Button
            variant="primary"
            onClick={() => startTransition(() => retry())}
            disabled={retrying}
            aria-live="polite"
          >
            <RotateCw size={16} className={retrying ? 'animate-spin motion-reduce:animate-none' : undefined} />
            {retrying ? 'Trying Again…' : 'Try Again'}
          </Button>
          <Button as="link" href="/" variant="secondary">
            <Home size={16} /> Go to Homepage
          </Button>
        </>
      }
    >
      <p className="text-center text-sm text-slate-500 dark:text-slate-500">
        Still broken?{' '}
        <a
          href={`mailto:${SITE.email}?subject=${encodeURIComponent(mailSubject)}`}
          className="inline-flex items-center gap-1 font-medium text-brand-700 dark:text-brand-400 hover:underline underline-offset-4 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          <Mail size={14} aria-hidden="true" /> Email me about it
        </a>
        {reference ? ' — the reference is filled in for you.' : '.'}
      </p>
    </StatusPage>
  )
}
