import { SITE, SITE_URL } from '@/lib/site'
import { ALL_PAGES } from '@/content/sections'
import { PROJECTS } from '@/content/projects'
import { CASE_STUDIES } from '@/content/case-studies'
import { BLOG_POSTS } from '@/content/blog'

export const dynamic = 'force-static'

function body() {
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    '## Pages',
    '',
    ...ALL_PAGES.map((page) => `- [${page.navLabel}](${SITE_URL}${page.path}): ${page.blurb}`),
    '',
    '## Projects',
    '',
    ...PROJECTS.flatMap((project) => [
      `- [${project.title}](${project.liveUrl ?? `${SITE_URL}/projects`}): ${project.description}`,
      `  - Problem: ${project.problem}`,
      `  - Impact: ${project.impact.slice(0, 2).join('; ')}`,
      ...(project.caseStudySlug ? [`  - Case study: ${SITE_URL}/case-studies/${project.caseStudySlug}`] : []),
    ]),
    '',
    '## Case Studies',
    '',
    ...CASE_STUDIES.map((study) => `- [${study.title}](${SITE_URL}/case-studies/${study.slug}): ${study.summary}`),
    '',
    '## Writing',
    '',
    ...BLOG_POSTS.map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.excerpt}`),
    '',
    '## Contact',
    '',
    `- Email: ${SITE.email}`,
    `- Contact page: ${SITE_URL}/contact`,
    '',
  ]
  return lines.join('\n')
}

export function GET() {
  return new Response(body(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
