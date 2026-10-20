import { PROJECTS } from '@/content/projects'
import { PUBLISHED_PAPERS } from '@/content/research'

export const HERO_ROLE_LINE = 'AI Engineer · Full-Stack · Jaipur, India'

export const HERO_NAME = ['Taaran', 'Jain']

export const HERO_HEADLINE: { text: string; accent?: boolean }[] = [
  { text: 'I' },
  { text: 'build' },
  { text: 'RAG' },
  { text: 'and' },
  { text: 'agentic' },
  { text: 'AI' },
  { text: 'apps,' },
  { text: 'from', accent: true },
  { text: 'model', accent: true },
  { text: 'to', accent: true },
  { text: 'screen.', accent: true },
]

export const HERO_DESCRIPTION =
  "I'm an AI Engineer at e-Marketing.io, where the AI tools I build are used by clients every day. " +
  `On my own I've launched ${PROJECTS.length} products, including a churn model that spots 85.6% of customers who are about to leave. ` +
  'Every one is live below, so you can try them yourself.'

export const HERO_STATS = [
  { value: String(PROJECTS.length), label: 'Live products to try' },
  { value: '2+', label: 'Years in ML & deep learning' },
  { value: String(PUBLISHED_PAPERS.length), label: 'Research papers published' },
]

export const HERO_STACK = [
  'Python',
  'LangGraph',
  'LangChain',
  'RAG',
  'PyTorch',
  'scikit-learn',
  'FastAPI',
  'Next.js',
  'TypeScript',
  'pgvector',
  'Hugging Face',
  'Groq',
  'Docker',
]
