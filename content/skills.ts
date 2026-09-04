import type { Skill, SkillTier } from '@/types'

export const SKILLS: Skill[] = [
  { _id: 's1', name: 'Python', category: 'languages', tier: 'core' },
  { _id: 's2', name: 'SQL', category: 'languages', tier: 'production' },

  { _id: 's3', name: 'LangChain', category: 'llm', tier: 'core' },
  { _id: 's4', name: 'RAG', category: 'llm', tier: 'core' },
  { _id: 's5', name: 'Prompt Engineering', category: 'llm', tier: 'core' },
  { _id: 's6', name: 'LLMs', category: 'llm', tier: 'core' },
  { _id: 's7', name: 'HuggingFace', category: 'llm', tier: 'production' },
  { _id: 's8', name: 'NLP', category: 'llm', tier: 'production' },
  { _id: 's29', name: 'LangGraph', category: 'llm', tier: 'production' },
  { _id: 's30', name: 'Agentic Workflows', category: 'llm', tier: 'production' },

  { _id: 's9', name: 'Pandas', category: 'ml', tier: 'core' },
  { _id: 's10', name: 'NumPy', category: 'ml', tier: 'core' },
  { _id: 's11', name: 'Scikit-learn', category: 'ml', tier: 'core' },
  { _id: 's12', name: 'Anomaly Detection', category: 'ml', tier: 'production' },
  { _id: 's13', name: 'Time-Series Analysis', category: 'ml', tier: 'working' },

  { _id: 's14', name: 'PyTorch', category: 'dl', tier: 'production' },
  { _id: 's15', name: 'TensorFlow / Keras', category: 'dl', tier: 'production' },
  { _id: 's16', name: 'OpenCV', category: 'dl', tier: 'production' },

  { _id: 's17', name: 'FastAPI', category: 'fullstack', tier: 'core' },
  { _id: 's18', name: 'REST APIs', category: 'fullstack', tier: 'production' },
  { _id: 's19', name: 'Next.js', category: 'fullstack', tier: 'production' },
  { _id: 's20', name: 'n8n', category: 'fullstack', tier: 'working' },

  { _id: 's21', name: 'PostgreSQL', category: 'data', tier: 'production' },
  { _id: 's22', name: 'MongoDB', category: 'data', tier: 'working' },
  { _id: 's31', name: 'pgvector / Vector DBs', category: 'data', tier: 'production' },
  { _id: 's32', name: 'Supabase', category: 'data', tier: 'production' },

  { _id: 's23', name: 'Docker', category: 'cloud', tier: 'production' },
  { _id: 's24', name: 'GCP', category: 'cloud', tier: 'production' },
  { _id: 's25', name: 'Azure', category: 'cloud', tier: 'working' },

  { _id: 's26', name: 'Matplotlib / Seaborn', category: 'viz', tier: 'core' },
  { _id: 's27', name: 'Plotly', category: 'viz', tier: 'production' },
  { _id: 's28', name: 'Power BI', category: 'viz', tier: 'working' },
]

export const SKILL_TIER_LABELS: Record<SkillTier, string> = {
  core: 'Daily driver',
  production: 'Shipped in production',
  working: 'Working knowledge',
}

export const SKILL_TIER_ORDER: SkillTier[] = ['core', 'production', 'working']

export const SKILL_TIER_STYLES: Record<SkillTier, string> = {
  core: 'bg-indigo-600 border-indigo-600 text-white',
  production: 'bg-indigo-500/10 border-indigo-500/35 text-indigo-700 dark:text-indigo-300',
  working: 'bg-transparent border-[var(--surface-border)] text-[var(--text-muted)]',
}

export const SKILL_CATEGORY_LABELS: Record<string, string> = {
  llm: 'LLM / NLP',
  ml: 'Machine Learning',
  dl: 'Deep Learning',
  languages: 'Languages',
  fullstack: 'Backend & APIs',
  data: 'Databases',
  cloud: 'Cloud & DevOps',
  viz: 'Data Visualisation',
}

export const SKILL_CATEGORY_COLORS: Record<string, { dot: string }> = {
  llm: { dot: 'bg-violet-500' },
  ml: { dot: 'bg-orange-500' },
  dl: { dot: 'bg-pink-500' },
  languages: { dot: 'bg-indigo-500' },
  fullstack: { dot: 'bg-sky-500' },
  data: { dot: 'bg-amber-500' },
  cloud: { dot: 'bg-emerald-500' },
  viz: { dot: 'bg-blue-500' },
}

export const SKILL_CATEGORIES = ['all', 'llm', 'ml', 'dl', 'languages', 'fullstack', 'data', 'cloud', 'viz'] as const
export type SkillCategory = (typeof SKILL_CATEGORIES)[number]
