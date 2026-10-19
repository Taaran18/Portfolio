'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Clock, FileText, Globe, Mail, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { usePathname } from 'next/navigation'
import { Reveal } from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { SOCIAL_LINKS } from '@/content/social'
import { WhatsApp } from '@/components/ui/icons'
import { SITE, whatsappUrl } from '@/lib/site'
import { sectionEyebrow } from '@/content/sections'
import { listWith } from '@/lib/format'

const PROFILE_LINKS = SOCIAL_LINKS.filter((s) => s.id === 'linkedin' || s.id === 'github')

const WHATSAPP_HREF = whatsappUrl()

const DIRECT_LINKS = [
  { label: 'Email', href: `mailto:${SITE.email}`, icon: Mail },
  ...(WHATSAPP_HREF ? [{ label: 'WhatsApp', href: WHATSAPP_HREF, icon: WhatsApp }] : []),
  ...PROFILE_LINKS.map(({ label, href, icon }) => ({ label, href, icon })),
  { label: 'Resume', href: SITE.resumeUrl, icon: FileText },
]

const STEPS = [
  { title: 'Send the Role or the Problem', text: 'A job description, a link or a few lines is enough.' },
  { title: 'A Reply Within a Day', text: 'I confirm fit and availability, and answer anything you need from me.' },
  { title: 'Intro or Technical Call', text: 'Happy to walk through any project on this site in depth, code included.' },
]

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const isHome = usePathname() === '/'
  const { index } = sectionEyebrow('contact', isHome)
  const Heading = isHome ? 'h2' : 'h1'
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          subject: fd.get('subject'),
          message: fd.get('message'),
        }),
      })
      if (res.ok) {
        toast.success("Message sent! I'll get back to you soon.")
        formRef.current?.reset()
      } else toast.error('Something went wrong. Please try again.')
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const inputCls =
    'w-full px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-[var(--surface-border)] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500/60 focus:bg-brand-500/[0.04] focus-visible:ring-2 focus-visible:ring-brand-500/30 transition-colors text-[0.95rem]'
  const labelCls = 'block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2'
  const linkCls =
    'inline-flex items-center gap-3 text-slate-800 dark:text-slate-200 hover:text-brand-700 dark:hover:text-brand-400 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60'

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-padding container-wide">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-20">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-3">
            {index && <span>{index}</span>}
            {index && <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />}
            <span>Contact</span>
          </p>
          <Heading id="contact-title" className="heading-lg mt-4 text-slate-900 dark:text-white text-balance">
            Hiring an AI Engineer? Let&apos;s Talk.
          </Heading>
          <p className="lead mt-6 max-w-lg">
            I&apos;m looking for full-time {listWith(SITE.openToRoles, 'or')} roles. Remote or on-site both work, and
            I&apos;m happy to relocate for the right team.
          </p>

          <ol className="mt-8 flex flex-col border-t border-[var(--surface-border)]">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-5 border-b border-[var(--surface-border)] py-4">
                <span className="font-mono text-xs text-brand-700 dark:text-brand-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block font-semibold text-slate-900 dark:text-white">{step.title}</span>
                  <span className="mt-1 block text-sm text-slate-600 dark:text-slate-400">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-2">
              <Clock size={15} aria-hidden="true" className="text-brand-700 dark:text-brand-400" />
              Replies usually within a day
            </li>
            <li className="flex items-center gap-2">
              <Globe size={15} aria-hidden="true" className="text-brand-700 dark:text-brand-400" />
              {SITE.location} · IST (UTC+5:30)
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="surface shadow-pop rounded-3xl p-6 sm:p-8 xl:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-name" className={labelCls}>
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelCls}>
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-subject" className={labelCls}>
                Role or Topic
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                placeholder="e.g. AI Engineer role at your company"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="contact-message" className={labelCls}>
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                required
                placeholder="A link to the job description, the problem you are solving, or anything you want to ask."
                className={inputCls + ' resize-none'}
              />
            </div>
            <Button type="submit" disabled={sending} variant="primary" className="w-full">
              {sending ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </Button>
            <p className="text-xs text-center text-slate-500 dark:text-slate-500">
              Goes straight to my inbox and is never stored on this site. I usually reply within a day.{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-brand-700 dark:hover:text-brand-400 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
              >
                Privacy
              </Link>
            </p>
          </form>

          <div className="mt-8">
            <p className="eyebrow mb-3">Or reach me directly</p>
            <ul className="flex flex-wrap gap-2.5">
              {DIRECT_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-bg)] px-4 text-sm font-medium text-slate-700 transition-colors hover:border-brand-500/50 hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
                  >
                    <Icon size={15} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
