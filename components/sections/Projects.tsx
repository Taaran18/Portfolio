'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Star } from 'lucide-react'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Project } from '@/types'

const PROJECTS: Project[] = [
  {
    _id: '1',
    title: 'WhatsApp Lead Automation',
    description: 'A full-stack platform for large-scale WhatsApp outreach — dual-mode connectivity (QR or Meta Business API), scheduled campaigns, lead management with tagging, and real-time delivery analytics, all from a single dashboard.',
    technologies: ['Next.js', 'FastAPI', 'PostgreSQL', 'Node.js', 'WhatsApp API', 'Supabase'],
    liveUrl: 'https://one-to-many-automation.vercel.app',
    githubUrl: 'https://github.com/Taaran18/one-to-many-automation',
    imageUrl: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&auto=format&fit=crop',
    featured: true,
    order: 1,
  },
  {
    _id: '2',
    title: 'OmniChat Pro',
    description: 'A high-performance conversational AI platform with RAG-lite document processing, real-time response streaming, live token cost tracking, and a premium adaptive UI — all in a strictly modular Streamlit architecture.',
    technologies: ['Python', 'Streamlit', 'OpenAI API', 'PyPDF', 'CSS'],
    liveUrl: 'https://omnichat-pro.streamlit.app/',
    githubUrl: 'https://github.com/Taaran18/OmniChat-Pro',
    imageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop',
    featured: true,
    order: 2,
  },
  {
    _id: '3',
    title: 'Self-Driven Car',
    description: 'A neuroevolution simulator where AI learns to drive using NEAT — evolving neural networks across generations through mutation, crossover, and speciation. A 9-input network (8 ray-cast sensors + velocity) learns steering and acceleration with zero explicit rules.',
    technologies: ['Python', 'NEAT', 'Pygame', 'Streamlit', 'Neuroevolution'],
    liveUrl: 'https://self-driven-car-neat.streamlit.app/',
    githubUrl: 'https://github.com/Taaran18/Self-Driven-Car',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
    featured: true,
    order: 3,
  },
  {
    _id: '4',
    title: 'MLInsights',
    description: 'Upload a dataset, get a trained ML model — no code needed. Auto-trains 30+ classification, regression, and clustering models, compares performance side-by-side, and exports cleaned data, model files, and PDF reports.',
    technologies: ['Next.js', 'FastAPI', 'Scikit-learn', 'XGBoost', 'LightGBM', 'CatBoost'],
    liveUrl: 'https://ml-insights-flax.vercel.app',
    githubUrl: 'https://github.com/Taaran18/MLInsights',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    featured: true,
    order: 4,
  },
  {
    _id: '5',
    title: 'AlgoVisualiser',
    description: 'An interactive DSA learning platform that animates 70+ algorithms step-by-step — with playback controls, adjustable speed, and dark/light mode. Covers everything from sorting and graphs to dynamic programming and backtracking.',
    technologies: ['Next.js', 'TypeScript', 'FastAPI', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://algo-visualiser-mu.vercel.app',
    githubUrl: 'https://github.com/Taaran18/AlgoVisualiser',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop',
    featured: false,
    order: 5,
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative glass rounded-2xl overflow-hidden border border-black/5 dark:border-white/5
        hover:border-cyan-500/30 dark:hover:border-cyan-400/30
        hover:shadow-xl hover:shadow-cyan-500/10
        hover:scale-[1.03]
        transition-all duration-300 flex flex-col h-full"
    >
      {project.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-85"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
          {project.featured && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-600 dark:text-yellow-400 text-xs font-medium">
              <Star size={10} fill="currentColor" /> Featured
            </div>
          )}
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 text-justify">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.slice(0, 4).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded text-xs font-mono text-cyan-600 dark:text-cyan-300/80 bg-cyan-500/5 border border-cyan-500/10">
              {t}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 rounded text-xs font-mono text-slate-400">+{project.technologies.length - 4}</span>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors">
              <Github size={15} /> Code
            </a>
          ) : <span />}
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 text-sm transition-colors">
              Live Demo <ExternalLink size={13} />
            </a>
          ) : <span />}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'featured'>('all')
  const filtered = filter === 'featured' ? PROJECTS.filter((p) => p.featured) : PROJECTS

  return (
    <section id="projects" className="section-padding max-w-screen-2xl mx-auto">
      <SectionHeader
        label="04 / Projects"
        title="Selected Work"
        subtitle="AI/ML projects I've built — from LLM applications to production-grade ML systems."
      />

      <div className="flex justify-center gap-3 mb-12">
        {(['all', 'featured'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
              filter === f
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20'
                : 'glass text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-black/5 dark:border-white/5'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {filtered.map((project, i) => (
          <ProjectCard key={project._id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
