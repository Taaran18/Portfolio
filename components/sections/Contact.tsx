'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Briefcase, Mail, MapPin, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { SOCIAL_LINKS } from '@/content/social'
import { WhatsApp } from '@/components/ui/icons'
import { SITE, whatsappUrl } from '@/lib/site'
import { slideIn } from '@/lib/motion'

const PROFILE_LINKS = SOCIAL_LINKS.filter((s) => s.id === 'github' || s.id === 'linkedin')

const WHATSAPP_HREF = whatsappUrl()

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
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
    'w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-brand-500/50 focus:bg-brand-500/5 focus-visible:ring-2 focus-visible:ring-brand-400 transition-all text-sm'
  const labelCls = 'block text-xs font-mono text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider'

  return (
    <section id="contact" className="section-padding container-wide">
      <SectionHeader
        sectionId="contact"
        title="Get in Touch"
        subtitle="Have a role, a product, or a research problem in mind? I reply to every message."
      />

      <div className="grid lg:grid-cols-5 gap-12">
        <motion.div {...slideIn('left')} className="lg:col-span-2 flex flex-col gap-8">
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-4">
              Let&apos;s Build Something Intelligent
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              I&apos;m open to full-time{' '}
              <span className="text-slate-900 dark:text-white font-medium">{SITE.openToRoles.join(', ')}</span> roles,
              plus freelance projects and research collaborations. If you have a problem involving data or intelligence,
              tell me about it.
            </p>
          </div>

          <a
            href={SITE.freelanceUrl}
            target="_blank"
            rel="noopener"
            className="group surface rounded-2xl p-5 flex items-start gap-4 border border-brand-500/20 hover:border-brand-500/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
          >
            <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center shrink-0">
              <Briefcase size={18} className="text-brand-700 dark:text-brand-400" />
            </div>
            <div className="min-w-0">
              <p className="text-slate-900 dark:text-white font-semibold text-sm inline-flex items-center gap-1">
                Hiring for a project?
                <ArrowUpRight
                  size={14}
                  className="text-brand-700 dark:text-brand-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-1">
                I freelance too: websites, web and mobile apps, AI integrations and automation. See services and past
                client work at{' '}
                <span className="text-brand-700 dark:text-brand-400 font-medium">studio.taaranjain.com</span>.
              </p>
            </div>
          </a>

          <div className="space-y-4">
            {[
              { icon: Mail, color: 'text-brand-700', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
              ...(WHATSAPP_HREF
                ? [
                    {
                      icon: WhatsApp,
                      color: 'text-green-600 dark:text-green-500',
                      label: 'WhatsApp',
                      value: 'Start a chat',
                      href: WHATSAPP_HREF,
                    },
                  ]
                : []),
              { icon: MapPin, color: 'text-accent-600', label: 'Location', value: SITE.location, href: null },
            ].map(({ icon: Icon, color, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
                <div className="w-10 h-10 rounded-full surface flex items-center justify-center shrink-0">
                  <Icon size={18} className={color} />
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">{label}</p>
                  {href ? (
                    <a href={href} className="hover:text-brand-700 dark:hover:text-brand-400 transition-colors text-sm">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:mt-auto">
            <p className="text-slate-600 dark:text-slate-400 text-xs font-mono uppercase tracking-widest mb-4">
              Find me on
            </p>
            <div className="space-y-3">
              {PROFILE_LINKS.map(({ icon: Icon, label, href, username }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 rounded"
                >
                  <Icon size={16} className="group-hover:text-brand-600 transition-colors" />
                  <span className="text-sm">{username}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div {...slideIn('right', { delay: 0.1 })} className="lg:col-span-3">
          <form ref={formRef} onSubmit={handleSubmit} className="surface rounded-3xl p-8 space-y-5">
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
                  placeholder="your@email.com"
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-subject" className={labelCls}>
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                placeholder="What's this about?"
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
                rows={5}
                required
                placeholder="Tell me about your project or idea..."
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
              Your message is emailed to me and isn&apos;t stored on this site.{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-brand-700 dark:hover:text-brand-400 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
              >
                Privacy
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
