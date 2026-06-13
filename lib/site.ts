/**
 * Central site config — single source of truth for SEO / metadata.
 * Override the URL per-environment with NEXT_PUBLIC_SITE_URL if needed.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.taaranjain.com'
).replace(/\/$/, '')

export const SITE = {
  name: 'Taaran Jain',
  // Alternate spellings people search for — helps Google connect them to you.
  alternateNames: ['taaranjain', 'Taaran', 'Taaran Jain Portfolio'],
  title: 'Taaran Jain — AI Engineer',
  description:
    'AI Engineer & Data Scientist specialising in LLMs, deep learning, and production ML systems — RAG pipelines, fine-tuned transformers, and end-to-end ML platforms.',
  url: SITE_URL,
  email: 'taaranjain16@gmail.com',
  location: 'Jaipur, Rajasthan, India',
  socials: {
    github: 'https://github.com/Taaran18',
    linkedin: 'https://www.linkedin.com/in/taaran-jain/',
  },
} as const
