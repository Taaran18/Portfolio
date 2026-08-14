import type { LucideIcon } from 'lucide-react'

export interface Project {
  _id?: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  imageUrl?: string
  featured: boolean
  order: number
  createdAt?: string
  updatedAt?: string
}

export interface Experience {
  _id?: string
  company: string
  role: string
  description: string
  responsibilities: string[]
  technologies: string[]
  startDate: string
  endDate?: string
  current: boolean
  order: number
  createdAt?: string
  updatedAt?: string
}

export type SkillTier = 'core' | 'production' | 'working'

export interface Skill {
  _id?: string
  name: string
  tier: SkillTier
  category: 'languages' | 'fullstack' | 'ml' | 'dl' | 'llm' | 'data' | 'cloud' | 'viz'
}

export interface LeadershipRole {
  _id: string
  title: string
  organisation: string
  period: string
  description: string
  impact: string[]
  icon: 'users' | 'trophy' | 'star'
}

export interface Paper {
  _id: string
  title: string
  authors?: string
  venue?: string
  year: string
  summary: string
  link: string
  category: string
}

export interface Certification {
  _id: string
  name: string
  issuer: string
  date: string
  description: string
  credential: string
  color: 'blue' | 'orange' | 'green' | 'purple'
}

export interface FaqEntry {
  _id: string
  question: string
  answer: string
}

export interface ArticleSection {
  heading: string
  body: string[]
  bullets?: string[]
}

export interface CaseStudy {
  slug: string
  title: string
  tagline: string
  summary: string
  role: string
  timeline: string
  stack: string[]
  liveUrl?: string
  githubUrl?: string
  imageUrl?: string
  publishedAt: string
  metrics: { label: string; value: string }[]
  sections: ArticleSection[]
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  readingMinutes: number
  tags: string[]
  sections: ArticleSection[]
}

export interface SocialLink {
  id: 'github' | 'linkedin' | 'email' | 'resume' | 'whatsapp'
  label: string
  href: string
  icon: LucideIcon

  username?: string
}

