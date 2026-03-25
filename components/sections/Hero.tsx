'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, FileText } from 'lucide-react'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false })

const ROLES = [
  'AI Engineer',
  'Machine Learning Engineer',
  'Data Scientist',
  'LLM Developer',
  'Deep Learning Researcher',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIndex]
    const speed = isDeleting ? 40 : 80

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1))
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800)
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1))
        if (displayed.length === 0) {
          setIsDeleting(false)
          setRoleIndex((i) => (i + 1) % ROLES.length)
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene />

      {/* Vignette — different per theme */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[var(--bg-primary)] pointer-events-none opacity-80" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-slate-600 dark:text-slate-300 font-mono">Open to opportunities</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="heading-xl mb-4 text-slate-900 dark:text-white"
        >
          Hi, I&apos;m{' '}
          <span className="text-gradient">Taaran Jain</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 font-light mb-6 h-10"
        >
          <span>{displayed}</span>
          <span className="inline-block w-0.5 h-7 bg-cyan-500 ml-1 animate-blink" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          I build intelligent systems — from fine-tuned LLMs and RAG pipelines to
          computer vision models and end-to-end ML platforms. Turning data into
          decisions, and research into real-world products.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/25 glow-cyan"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-xl border border-slate-300 dark:border-white/10 glass text-slate-700 dark:text-slate-200 font-semibold hover:border-cyan-500/40 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex items-center justify-center gap-6 mb-20"
        >
          {[
            { icon: Github, href: 'https://github.com/Taaran18', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/taaran-jain/', label: 'LinkedIn' },
            { icon: FileText, href: 'https://drive.google.com/file/d/1-ckubTF7jTKD8m9k3MNkf8JmydBHCjuy/view?usp=sharing', label: 'Resume' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-sm"
            >
              <Icon size={18} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
