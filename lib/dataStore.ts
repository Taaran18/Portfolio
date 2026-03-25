/**
 * Simple JSON file-based data store.
 *
 * Data lives in /data/*.json — no database required.
 * The admin panel reads and writes these files at runtime (works locally
 * and in any Node.js environment; on Vercel the filesystem is read-only
 * so admin edits only persist locally — commit & redeploy to publish).
 */

import fs from 'fs'
import path from 'path'
import type { Project, Experience, Skill } from '@/types'

const DATA_DIR = path.join(process.cwd(), 'data')

function readJSON<T>(filename: string): T[] {
  const filePath = path.join(DATA_DIR, filename)
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as T[]
  } catch {
    return []
  }
}

function writeJSON<T>(filename: string, data: T[]): void {
  const filePath = path.join(DATA_DIR, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

// ─── Projects ──────────────────────────────────────────────────────────────

export const projects = {
  getAll: (): Project[] =>
    readJSON<Project>('projects.json').sort((a, b) => a.order - b.order),

  getById: (id: string): Project | undefined =>
    readJSON<Project>('projects.json').find((p) => p._id === id),

  create: (data: Omit<Project, '_id'>): Project => {
    const all = readJSON<Project>('projects.json')
    const newItem: Project = { ...data, _id: generateId() }
    writeJSON('projects.json', [...all, newItem])
    return newItem
  },

  update: (id: string, data: Partial<Project>): Project | null => {
    const all = readJSON<Project>('projects.json')
    const idx = all.findIndex((p) => p._id === id)
    if (idx === -1) return null
    all[idx] = { ...all[idx], ...data }
    writeJSON('projects.json', all)
    return all[idx]
  },

  delete: (id: string): boolean => {
    const all = readJSON<Project>('projects.json')
    const filtered = all.filter((p) => p._id !== id)
    if (filtered.length === all.length) return false
    writeJSON('projects.json', filtered)
    return true
  },
}

// ─── Experience ────────────────────────────────────────────────────────────

export const experience = {
  getAll: (): Experience[] =>
    readJSON<Experience>('experience.json').sort((a, b) => a.order - b.order),

  getById: (id: string): Experience | undefined =>
    readJSON<Experience>('experience.json').find((e) => e._id === id),

  create: (data: Omit<Experience, '_id'>): Experience => {
    const all = readJSON<Experience>('experience.json')
    const newItem: Experience = { ...data, _id: generateId() }
    writeJSON('experience.json', [...all, newItem])
    return newItem
  },

  update: (id: string, data: Partial<Experience>): Experience | null => {
    const all = readJSON<Experience>('experience.json')
    const idx = all.findIndex((e) => e._id === id)
    if (idx === -1) return null
    all[idx] = { ...all[idx], ...data }
    writeJSON('experience.json', all)
    return all[idx]
  },

  delete: (id: string): boolean => {
    const all = readJSON<Experience>('experience.json')
    const filtered = all.filter((e) => e._id !== id)
    if (filtered.length === all.length) return false
    writeJSON('experience.json', filtered)
    return true
  },
}

// ─── Skills ────────────────────────────────────────────────────────────────

export const skills = {
  getAll: (): Skill[] =>
    readJSON<Skill>('skills.json').sort((a, b) => a.order - b.order),

  getById: (id: string): Skill | undefined =>
    readJSON<Skill>('skills.json').find((s) => s._id === id),

  create: (data: Omit<Skill, '_id'>): Skill => {
    const all = readJSON<Skill>('skills.json')
    const newItem: Skill = { ...data, _id: generateId() }
    writeJSON('skills.json', [...all, newItem])
    return newItem
  },

  update: (id: string, data: Partial<Skill>): Skill | null => {
    const all = readJSON<Skill>('skills.json')
    const idx = all.findIndex((s) => s._id === id)
    if (idx === -1) return null
    all[idx] = { ...all[idx], ...data }
    writeJSON('skills.json', all)
    return all[idx]
  },

  delete: (id: string): boolean => {
    const all = readJSON<Skill>('skills.json')
    const filtered = all.filter((s) => s._id !== id)
    if (filtered.length === all.length) return false
    writeJSON('skills.json', filtered)
    return true
  },
}
