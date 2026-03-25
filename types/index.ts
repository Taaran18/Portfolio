// ─── Portfolio Data Types ──────────────────────────────────────────────────

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
  startDate: string      // ISO date string e.g. "2022-01"
  endDate?: string       // Omit for current role
  current: boolean
  order: number
  createdAt?: string
  updatedAt?: string
}

export interface Skill {
  _id?: string
  name: string
  level: number          // 0–100
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'other'
  icon?: string
  order: number
  createdAt?: string
  updatedAt?: string
}

// ─── API Response Wrappers ─────────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

// ─── Mouse / Interaction ──────────────────────────────────────────────────

export interface MousePosition {
  x: number
  y: number
}
