export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.taaranjain.com').replace(/\/$/, '')

export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '918955535949').replace(/[^\d]/g, '')

export const WHATSAPP_GREETING = 'Hi Taaran, I found your portfolio and would like to connect.'

export function whatsappUrl(message = WHATSAPP_GREETING): string | null {
  if (!WHATSAPP_NUMBER) return null
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const SITE = {
  name: 'Taaran Jain',

  alternateNames: ['taaranjain', 'Taaran', 'Taaran Jain Portfolio'],
  title: 'Taaran Jain — AI Engineer',
  description:
    'AI Engineer and Machine Learning Engineer building LLM applications — RAG pipelines with LangGraph and pgvector, fine-tuned transformers, and production ML systems.',
  url: SITE_URL,
  email: 'taaranjain16@gmail.com',
  location: 'Jaipur, Rajasthan, India',
  primaryRole: 'AI Engineer',
  availability: 'Available for AI/ML roles',
  openToRoles: ['AI Engineer', 'Machine Learning Engineer', 'Data Scientist'],
  resumeUrl: 'https://drive.google.com/file/d/1-ckubTF7jTKD8m9k3MNkf8JmydBHCjuy/view?usp=sharing',
  socials: {
    github: 'https://github.com/Taaran18',
    linkedin: 'https://www.linkedin.com/in/taaran-jain/',
  },
} as const
