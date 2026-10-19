import { BrainCircuit, Rocket, LineChart, Gauge } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { EXPERIENCES } from '@/content/experience'
import { PROJECTS } from '@/content/projects'
import { PUBLISHED_PAPERS } from '@/content/research'

export const ABOUT_STATS = [
  { value: String(PROJECTS.length), label: 'AI products live with demos' },
  { value: String(EXPERIENCES.length), label: 'Companies shipped for' },
  { value: '260+', label: 'Backend tests across projects' },
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
    title: 'Machine Learning',
    desc: 'Anomaly detection on production logs, churn models with calibrated probabilities, and a workbench that compares 68 algorithms on your data.',
  },
  {
    icon: Rocket,
    title: 'Full-Stack Engineering',
    desc: 'FastAPI backends, Next.js and TypeScript front ends, Docker deploys, rate limits and quotas, plus the tests that keep it all working after launch.',
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
