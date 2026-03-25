'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, Github, Linkedin } from 'lucide-react'
import toast from 'react-hot-toast'
import SectionHeader from '@/components/ui/SectionHeader'

const SOCIAL_LINKS = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Taaran18', username: '@Taaran18' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/taaran-jain/', username: 'Taaran Jain' },
]

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        toast.success("Message sent! I'll get back to you soon.")
        formRef.current?.reset()
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const inputCls = 'w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all text-sm'

  return (
    <section id="contact" className="section-padding max-w-7xl mx-auto">
      <SectionHeader
        label="05 / Contact"
        title="Get In Touch"
        subtitle="Have a project in mind, want to collaborate on AI research, or just want to say hi?"
      />

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Left — info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-8"
        >
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-4">Let&apos;s build something intelligent</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              I&apos;m open to full-time AI/ML engineering roles, freelance projects, and research collaborations.
              If you have an interesting problem involving data or intelligence, I&apos;d love to hear about it.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0">
                <Mail size={18} className="text-cyan-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">Email</p>
                <a href="mailto:taaranjain16@gmail.com" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-sm">
                  taaranjain16@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">Location</p>
                <p className="text-sm">India</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-4">Find me on</p>
            <div className="space-y-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href, username }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group">
                  <Icon size={16} className="group-hover:text-cyan-500 transition-colors" />
                  <span className="text-sm">{username}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-3"
        >
          <form ref={formRef} onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 border border-black/5 dark:border-white/5 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">Name</label>
                <input id="name" name="name" type="text" required placeholder="Your name" className={inputCls} />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">Email</label>
                <input id="email" name="email" type="email" required placeholder="your@email.com" className={inputCls} />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">Subject</label>
              <input id="subject" name="subject" type="text" required placeholder="What's this about?" className={inputCls} />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">Message</label>
              <textarea id="message" name="message" rows={5} required placeholder="Tell me about your project or idea..." className={inputCls + ' resize-none'} />
            </div>
            <button type="submit" disabled={sending}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/20">
              {sending ? (
                <><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />Sending...</>
              ) : (
                <>Send Message <Send size={16} /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
