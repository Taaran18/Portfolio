import { BrainCircuit, Rocket, Database, BookOpen } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PROJECTS } from '@/content/projects'
import { EXPERIENCES } from '@/content/experience'
import { PUBLISHED_PAPERS } from '@/content/research'

const liveWithSource = PROJECTS.filter((p) => p.liveUrl && p.githubUrl).length

export const ABOUT_STATS = [
  { value: String(PROJECTS.length), label: 'Products Shipped Live' },
  { value: `${Math.round((liveWithSource / PROJECTS.length) * 100)}%`, label: 'With Demo & Source' },
  { value: String(EXPERIENCES.length), label: 'Companies Shipped For' },
  { value: String(PUBLISHED_PAPERS.length), label: 'Papers Published' },
]

export interface AboutTrait {
  icon: LucideIcon
  title: string
  desc: string
}

export const ABOUT_TRAITS: AboutTrait[] = [
  { icon: BrainCircuit, title: 'LLM Engineering', desc: 'Building RAG pipelines, fine-tuning transformers, and deploying production-grade LLM applications.' },
  { icon: Database, title: 'Data Science', desc: 'End-to-end ML pipelines — from raw data ingestion and feature engineering to model evaluation.' },
  { icon: Rocket, title: 'MLOps & Deployment', desc: 'Taking models from notebook to production with robust CI/CD, monitoring, and scalability.' },
  { icon: BookOpen, title: 'Research-Driven', desc: 'Staying close to SOTA research and translating cutting-edge ideas into practical systems.' },
]

export const ABOUT_TECH_STACK = [
  'Python', 'PyTorch', 'TensorFlow', 'Scikit-learn',
  'LangChain', 'HuggingFace', 'OpenAI API', 'RAG',
  'Prompt Engineering', 'Pandas', 'OpenCV',
  'FastAPI', 'Docker', 'GCP', 'MLflow',
]
