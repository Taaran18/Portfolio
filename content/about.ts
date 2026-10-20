import { BrainCircuit, Rocket, LineChart, Gauge } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { EXPERIENCES } from '@/content/experience'
import { PROJECTS } from '@/content/projects'
import { PUBLISHED_PAPERS } from '@/content/research'

export const ABOUT_STATS = [
  { value: String(PROJECTS.length), label: 'AI products live with demos' },
  { value: String(EXPERIENCES.length), label: 'Companies shipped for' },
  { value: '10+', label: 'Industries served' },
  { value: String(PUBLISHED_PAPERS.length), label: 'Research papers published' },
]

interface AboutTrait {
  icon: LucideIcon
  title: string
  desc: string
}

export const ABOUT_TRAITS: AboutTrait[] = [
  {
    icon: BrainCircuit,
    title: 'LLM & RAG Engineering',
    desc: 'RAG pipelines that cite the exact page and line, LangGraph agents that pick which tool to call, and one app that runs on 8 LLM providers.',
  },
  {
    icon: LineChart,
    title: 'Machine & Deep Learning',
    desc: 'ML and deep learning anomaly detection on production logs, neural networks that learn to drive, calibrated churn models, and a workbench comparing 68 algorithms.',
  },
  {
    icon: Rocket,
    title: 'Full-Stack Engineering',
    desc: 'FastAPI backends, Next.js and TypeScript front ends, Docker deploys, and the rate limits and quotas that let strangers use a free demo safely.',
  },
  {
    icon: Gauge,
    title: 'Numbers Over Adjectives',
    desc: 'Held-out evaluation, calibration error, and latency and token cost per request. The case studies also cover what failed the first time.',
  },
]

export const ABOUT_TECH_STACK = [
  'Python',
  'LangGraph',
  'LangChain',
  'RAG',
  'pgvector',
  'Hugging Face',
  'PyTorch',
  'scikit-learn',
  'FastAPI',
  'Next.js',
  'TypeScript',
  'Docker',
  'GCP',
]
