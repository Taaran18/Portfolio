export interface SectionMeta {
  id: string
  path: string
  navLabel: string
  blurb: string
}

export const SECTIONS: SectionMeta[] = [
  { id: 'about', path: '/about', navLabel: 'About', blurb: 'Background, focus areas and how I work.' },
  {
    id: 'projects',
    path: '/projects',
    navLabel: 'Projects',
    blurb: 'Shipped AI products with screenshots, live demos and case studies.',
  },
  {
    id: 'experience',
    path: '/experience',
    navLabel: 'Experience',
    blurb: 'Roles, responsibilities and what I shipped.',
  },
  { id: 'research', path: '/research', navLabel: 'Research', blurb: 'Papers on AI in finance and healthcare.' },
  { id: 'skills', path: '/skills', navLabel: 'Skills', blurb: 'Tools and frameworks, grouped by depth of use.' },
  {
    id: 'leadership',
    path: '/leadership',
    navLabel: 'Leadership',
    blurb: 'Community, mentoring and event leadership roles.',
  },
  {
    id: 'certifications',
    path: '/certifications',
    navLabel: 'Certifications',
    blurb: 'Courses and credentials in AI, ML, deep learning and cloud.',
  },
  { id: 'contact', path: '/contact', navLabel: 'Contact', blurb: 'Roles, projects or collaborations. Get in touch.' },
]

const STANDALONE_PAGES: SectionMeta[] = [
  {
    id: 'case-studies',
    path: '/case-studies',
    navLabel: 'Case Studies',
    blurb: 'Architecture, tradeoffs and lessons behind the systems.',
  },
  { id: 'blog', path: '/blog', navLabel: 'Blog', blurb: 'Notes on applied AI and retrieval.' },
]

export const ALL_PAGES: SectionMeta[] = [...SECTIONS, ...STANDALONE_PAGES]

const NAV_IDS = ['about', 'projects', 'experience', 'research', 'skills', 'case-studies']

export const NAV_LINKS: SectionMeta[] = NAV_IDS.map((id) => ALL_PAGES.find((p) => p.id === id)!)

const READING_ORDER = [
  'about',
  'projects',
  'case-studies',
  'experience',
  'research',
  'skills',
  'leadership',
  'certifications',
  'blog',
  'contact',
]

export const PAGE_SEQUENCE: SectionMeta[] = READING_ORDER.map((id) => ALL_PAGES.find((p) => p.id === id)!)

export function getPage(path: string): SectionMeta | undefined {
  return ALL_PAGES.find((p) => p.path === path)
}

export const SCROLL_SECTION_IDS = new Set(SECTIONS.map((s) => s.id))

function sectionNumber(id: string): string {
  const index = SECTIONS.findIndex((s) => s.id === id)
  return String(index + 1).padStart(2, '0')
}

export function sectionEyebrow(id: string, isHome: boolean): { index?: string; name: string } {
  const name = ALL_PAGES.find((s) => s.id === id)?.navLabel ?? id
  if (!isHome || !SCROLL_SECTION_IDS.has(id)) return { name }
  return { index: sectionNumber(id), name }
}
