import { PROJECTS } from '@/content/projects'

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
  "I'm an AI Engineer at e-Marketing.io and I've been shipping ML and LLM work for two years. " +
  'I build the whole app myself, from the LangGraph agent to the FastAPI backend and the Next.js front end. ' +
  `All ${PROJECTS.length} projects below are live, so you can try them.`

export const HERO_STATS = [
  { value: String(PROJECTS.length), label: 'Live products to try' },
  { value: '2+', label: 'Years shipping AI/ML' },
  { value: '260+', label: 'Backend tests written' },
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
