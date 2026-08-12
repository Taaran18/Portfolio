import { SITE, SITE_URL } from '@/lib/site'
import { SECTIONS } from '@/content/sections'
import { PROJECTS } from '@/content/projects'
import { EXPERIENCES } from '@/content/experience'
import { PUBLISHED_PAPERS } from '@/content/research'
import { CERTIFICATIONS } from '@/content/certifications'
import { SKILLS } from '@/content/skills'
import { CASE_STUDIES } from '@/content/case-studies'
import { BLOG_POSTS } from '@/content/blog'
import type { BlogPost, CaseStudy } from '@/types'

const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

const currentRole = EXPERIENCES.find((e) => e.current) ?? EXPERIENCES[0]

function organisation(name: string) {
  return { '@type': 'Organization', name }
}

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.name,
    alternateName: SITE.alternateNames,
    givenName: 'Taaran',
    familyName: 'Jain',
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    email: `mailto:${SITE.email}`,
    jobTitle: [...SITE.openToRoles],
    description: SITE.description,
    seeks: SITE.openToRoles.map((role) => ({
      '@type': 'Demand',
      name: role,
      itemOffered: { '@type': 'JobPosting', title: role },
    })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      addressCountry: 'IN',
    },
    worksFor: currentRole ? organisation(currentRole.company) : undefined,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Poornima Institute of Engineering & Technology',
    },
    hasOccupation: SITE.openToRoles.map((role) => ({
      '@type': 'Occupation',
      name: role,
      occupationalCategory: '15-2051.00',
      skills: SKILLS.map((s) => s.name).join(', '),
    })),
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Deep Learning',
      'Large Language Models',
      'Retrieval-Augmented Generation',
      'Natural Language Processing',
      'Data Science',
      'MLOps',
    ],
    knowsLanguage: [
      { '@type': 'Language', name: 'English' },
      { '@type': 'Language', name: 'Hindi' },
    ],
    sameAs: [SITE.socials.github, SITE.socials.linkedin],
    hasCredential: CERTIFICATIONS.map((cert) => ({
      '@type': 'EducationalOccupationalCredential',
      name: cert.name,
      credentialCategory: 'certificate',
      recognizedBy: organisation(cert.issuer),
      url: cert.credential,
    })),
  }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE.name,
    description: SITE.description,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
    about: { '@id': PERSON_ID },
  }
}

export function profilePageSchema() {
  return {
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: SITE.title,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: { '@id': PERSON_ID },
  }
}

export function projectsSchema() {
  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/projects#list`,
    name: `Projects by ${SITE.name}`,
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.map((project, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: project.title,
        description: project.description,
        url: project.liveUrl ?? project.githubUrl,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        author: { '@id': PERSON_ID },
        keywords: project.technologies.join(', '),
        ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
      },
    })),
  }
}

export function researchSchema() {
  return PUBLISHED_PAPERS.map((paper) => ({
    '@type': 'ScholarlyArticle',
    headline: paper.title,
    abstract: paper.summary,
    url: paper.link,
    author: { '@id': PERSON_ID },
    datePublished: paper.year,
    ...(paper.venue ? { publisher: organisation(paper.venue) } : {}),
  }))
}

export function experienceSchema() {
  return EXPERIENCES.map((exp) => ({
    '@type': 'OrganizationRole',
    roleName: exp.role,
    startDate: exp.startDate,
    ...(exp.endDate ? { endDate: exp.endDate } : {}),
    memberOf: organisation(exp.company),
  }))
}

export function caseStudySchema(study: CaseStudy) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${SITE_URL}/case-studies/${study.slug}#article`,
        headline: study.title,
        alternativeHeadline: study.tagline,
        description: study.summary,
        url: `${SITE_URL}/case-studies/${study.slug}`,
        datePublished: study.publishedAt,
        dateModified: study.publishedAt,
        inLanguage: 'en',
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        keywords: study.stack.join(', '),
        articleSection: study.sections.map((s) => s.heading),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/case-studies/${study.slug}`,
        },
        ...(study.imageUrl ? { image: `${SITE_URL}${study.imageUrl}` } : {}),
        about: {
          '@type': 'SoftwareApplication',
          name: study.title,
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Web',
          url: study.liveUrl,
          ...(study.githubUrl ? { codeRepository: study.githubUrl } : {}),
        },
      },
      breadcrumbGraph([
        { name: 'Home', item: SITE_URL },
        { name: 'Case Studies', item: `${SITE_URL}/case-studies` },
        { name: study.title, item: `${SITE_URL}/case-studies/${study.slug}` },
      ]),
    ],
  }
}

export function caseStudyListSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/case-studies#page`,
        name: `Case Studies by ${SITE.name}`,
        url: `${SITE_URL}/case-studies`,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        hasPart: CASE_STUDIES.map((study) => ({
          '@type': 'TechArticle',
          headline: study.title,
          description: study.summary,
          url: `${SITE_URL}/case-studies/${study.slug}`,
          datePublished: study.publishedAt,
          author: { '@id': PERSON_ID },
        })),
      },
      breadcrumbGraph([
        { name: 'Home', item: SITE_URL },
        { name: 'Case Studies', item: `${SITE_URL}/case-studies` },
      ]),
    ],
  }
}

export function blogPostSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${SITE_URL}/blog/${post.slug}#post`,
        headline: post.title,
        description: post.excerpt,
        url: `${SITE_URL}/blog/${post.slug}`,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        inLanguage: 'en',
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        keywords: post.tags.join(', '),
        articleSection: post.sections.map((s) => s.heading),
        wordCount: post.sections.reduce(
          (n, s) => n + s.body.join(' ').split(/\s+/).length + (s.bullets?.join(' ').split(/\s+/).length ?? 0),
          0
        ),
        timeRequired: `PT${post.readingMinutes}M`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
      },
      breadcrumbGraph([
        { name: 'Home', item: SITE_URL },
        { name: 'Blog', item: `${SITE_URL}/blog` },
        { name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
      ]),
    ],
  }
}

export function blogListSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        name: `${SITE.name} — Writing`,
        url: `${SITE_URL}/blog`,
        inLanguage: 'en',
        isPartOf: { '@id': WEBSITE_ID },
        author: { '@id': PERSON_ID },
        blogPost: BLOG_POSTS.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          url: `${SITE_URL}/blog/${post.slug}`,
          datePublished: post.publishedAt,
          keywords: post.tags.join(', '),
          author: { '@id': PERSON_ID },
        })),
      },
      breadcrumbGraph([
        { name: 'Home', item: SITE_URL },
        { name: 'Blog', item: `${SITE_URL}/blog` },
      ]),
    ],
  }
}

function breadcrumbGraph(entries: { name: string; item: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      item: entry.item,
    })),
  }
}

export function breadcrumbSchema(path: string) {
  const section = SECTIONS.find((s) => s.path === path)
  const items = [{ name: 'Home', item: SITE_URL }]
  if (section) items.push({ name: section.navLabel, item: `${SITE_URL}${section.path}` })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      item: entry.item,
    })),
  }
}

export function rootGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(),
      websiteSchema(),
      profilePageSchema(),
      projectsSchema(),
      ...researchSchema(),
    ],
  }
}
