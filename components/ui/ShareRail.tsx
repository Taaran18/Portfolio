'use client'

import { useState } from 'react'
import { Check, Link2, Linkedin, Mail, Twitter } from 'lucide-react'
import { WhatsApp } from '@/components/ui/icons'
import { SOCIAL_LINKS } from '@/content/social'
import { SITE, SITE_URL } from '@/lib/site'

const PROFILE_LINKS = SOCIAL_LINKS.filter((s) => s.id !== 'email')

const railLink =
  'inline-flex items-center gap-2.5 text-[13px] text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60'

const iconButton =
  'w-9 h-9 rounded-full border border-[var(--surface-border)] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60'

const heading = 'text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-3'

export default function ShareRail({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false)
  const url = `${SITE_URL}${path}`

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const shareTargets = [
    {
      label: 'Share on X',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      label: 'Share on LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: 'Share on WhatsApp',
      icon: WhatsApp,
      href: `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`,
    },
    {
      label: 'Share by email',
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Thought this might interest you:\n\n${url}`)}`,
    },
  ]

  return (
    <div className="sticky top-28 space-y-8">
      <div>
        <p className={heading}>Share</p>
        <div className="flex flex-wrap gap-2">
          {shareTargets.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className={iconButton}
            >
              <Icon size={15} />
            </a>
          ))}
          <button onClick={copyLink} aria-label="Copy link" title="Copy link" className={iconButton}>
            {copied ? <Check size={15} className="text-green-600 dark:text-green-500" /> : <Link2 size={15} />}
          </button>
        </div>
        {copied && <p className="text-[11px] text-green-600 dark:text-green-500 mt-2">Link copied</p>}
      </div>

      <div>
        <p className={heading}>Written by</p>
        <p className="text-sm font-medium text-slate-900 dark:text-white">{SITE.name}</p>
        <p className="text-[13px] text-slate-600 dark:text-slate-400 mb-4">{SITE.primaryRole}</p>

        <ul className="space-y-2.5">
          {PROFILE_LINKS.map(({ id, label, href, icon: Icon }) => (
            <li key={id}>
              <a href={href} target="_blank" rel="noopener noreferrer" className={railLink}>
                <Icon size={14} className="shrink-0" />
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${SITE.email}`} className={railLink}>
              <Mail size={14} className="shrink-0" />
              Email
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
