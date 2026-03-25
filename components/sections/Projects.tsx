'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Star } from 'lucide-react'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Project } from '@/types'

const SEED_PROJECTS: Project[] = [
  {
    _id: '1',
    title: 'DocuMind — Enterprise RAG Platform',
    description: 'Multi-tenant RAG system that lets enterprises chat with their internal documents using GPT-4 + Pinecone.',
    technologies: ['Python', 'LangChain', 'FastAPI', 'Pinecone', 'OpenAI', 'Next.js'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/Taaran18',
    imageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop',
    featured: true,
    order: 1,
  },
  {
    _id: '2',
    title: 'NeuralSense — Real-Time CV Pipeline',
    description: 'Real-time object detection & segmentation system achieving 30 FPS on edge devices using YOLO v9.',
    technologies: ['Python', 'PyTorch', 'YOLO', 'OpenCV', 'TensorRT', 'ONNX'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/Taaran18',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop',
    featured: true,
    order: 2,
  },
  {
    _id: '3',
    title: 'FinSight — Market Prediction Engine',
    description: 'Transformer-based time-series forecasting for equity markets with explainable AI (SHAP) dashboard.',
    technologies: ['Python', 'PyTorch', 'Transformers', 'SHAP', 'Plotly', 'FastAPI'],
    githubUrl: 'https://github.com/Taaran18',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
    featured: true,
    order: 3,
  },
  {
    _id: '4',
    title: 'AutoTrain CLI',
    description: 'Open-source CLI to fine-tune LLMs with QLoRA in 3 commands. 500+ GitHub stars.',
    technologies: ['Python', 'HuggingFace', 'PEFT', 'QLoRA', 'CLI', 'CUDA'],
    githubUrl: 'https://github.com/Taaran18',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop',
    featured: false,
    order: 4,
  },
  {
    _id: '5',
    title: 'SentimentScope',
    description: 'Multi-lingual sentiment analysis API supporting 15 languages, serving 1M+ requests/month.',
    technologies: ['Python', 'XLM-R', 'FastAPI', 'Docker', 'Kubernetes', 'Redis'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/Taaran18',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    featured: false,
    order: 5,
  },
  {
    _id: '6',
    title: 'ML Experiment Tracker',
    description: 'Lightweight MLflow alternative with a beautiful UI — track runs, compare metrics, version datasets.',
    technologies: ['Python', 'FastAPI', 'SQLite', 'Next.js', 'Recharts'],
    githubUrl: 'https://github.com/Taaran18',
    imageUrl: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&auto=format&fit=crop',
    featured: false,
    order: 6,
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative glass rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 hover:border-cyan-500/30 dark:hover:border-cyan-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1"
    >
      {project.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 dark:opacity-60 group-hover:opacity-80"
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

      <div className="p-6">
        <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.slice(0, 4).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded text-xs font-mono text-cyan-600 dark:text-cyan-300/80 bg-cyan-500/5 border border-cyan-500/10">
              {t}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 rounded text-xs font-mono text-slate-400">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors">
              <Github size={15} /> Code
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 text-sm transition-colors ml-auto">
              Live Demo <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(SEED_PROJECTS)
  const [filter, setFilter] = useState<'all' | 'featured'>('all')

  useEffect(() => {
    fetch('/api/projects').then((r) => r.json()).then((data) => { if (data?.length) setProjects(data) }).catch(() => {})
  }, [])

  const filtered = filter === 'featured' ? projects.filter((p) => p.featured) : projects

  return (
    <section id="projects" className="section-padding max-w-7xl mx-auto">
      <SectionHeader
        label="03 / Projects"
        title="Selected Work"
        subtitle="AI/ML projects I've built — from LLM applications to production-grade ML systems."
      />

      <div className="flex justify-center gap-3 mb-12">
        {(['all', 'featured'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === f
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20'
                : 'glass text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-black/5 dark:border-white/5'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <ProjectCard key={project._id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
