export interface SectionMeta {
  id: string
  path: string
  navLabel: string
}

export const SECTIONS: SectionMeta[] = [
  { id: 'about', path: '/about', navLabel: 'About' },
  { id: 'projects', path: '/projects', navLabel: 'Projects' },
  { id: 'experience', path: '/experience', navLabel: 'Experience' },
  { id: 'research', path: '/research', navLabel: 'Research' },
  { id: 'skills', path: '/skills', navLabel: 'Skills' },
  { id: 'leadership', path: '/leadership', navLabel: 'Leadership' },
  { id: 'certifications', path: '/certifications', navLabel: 'Certifications' },
  { id: 'contact', path: '/contact', navLabel: 'Contact' },
]

export const STANDALONE_PAGES: SectionMeta[] = [
  { id: 'case-studies', path: '/case-studies', navLabel: 'Case Studies' },
  { id: 'blog', path: '/blog', navLabel: 'Blog' },
]

export const ALL_PAGES: SectionMeta[] = [...SECTIONS, ...STANDALONE_PAGES]

const NAV_IDS = ['about', 'projects', 'case-studies', 'experience', 'research', 'skills', 'blog', 'contact']

export const NAV_LINKS: SectionMeta[] = NAV_IDS.map(
  (id) => ALL_PAGES.find((p) => p.id === id)!
)

export const SCROLL_SECTION_IDS = new Set(SECTIONS.map((s) => s.id))

function sectionNumber(id: string): string {
  const index = SECTIONS.findIndex((s) => s.id === id)
  return String(index + 1).padStart(2, '0')
}

export function sectionEyebrow(id: string, isHome: boolean): string {
  const name = ALL_PAGES.find((s) => s.id === id)?.navLabel ?? id
  if (!isHome || !SCROLL_SECTION_IDS.has(id)) return name.toUpperCase()
  return `${sectionNumber(id)} / ${name}`
}
