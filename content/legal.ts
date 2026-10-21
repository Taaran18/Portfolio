import { SITE } from '@/lib/site'
import type { ArticleSection } from '@/types'

export type LegalDocId = 'privacy' | 'terms' | 'disclaimer'

export interface LegalDoc {
  id: LegalDocId
  path: string
  title: string
  navLabel: string
  description: string
  updated: string
  summary: string
  sections: ArticleSection[]
}

const UPDATED = '2026-09-26'

const privacy: LegalDoc = {
  id: 'privacy',
  path: '/privacy',
  title: 'Privacy Policy',
  navLabel: 'Privacy',
  description:
    'What taaranjain.com collects and why: visit statistics from its own analytics and Google Analytics, contact form messages and chat. No advertising.',
  updated: '2026-10-21',
  summary:
    'This site collects as little as it can: visit statistics, and whatever you choose to send through the contact form or chat. No advertising, and nothing is sold.',
  sections: [
    {
      heading: 'Visit Statistics',
      body: [
        'To see which pages people read, the site records a small event when a page loads or when you click a link to another website. It does this with its own first-party analytics and with Google Analytics 4.',
      ],
      bullets: [
        'Recorded: the page path, the outbound link you clicked, the website that referred you (domain only), your device type and your country as reported by the hosting provider.',
        'Visitor counts use a one-way hash of your IP address and browser details. Your IP address itself is not stored.',
        'Only the most recent 50,000 events are kept; older ones are deleted automatically.',
        'Google Analytics records the pages you view, scrolling, outbound link clicks, your device type and approximate location. Google Analytics 4 does not log or store IP addresses, and the data is not used for advertising.',
        'You can opt out of Google Analytics with Google’s opt-out browser add-on or by blocking cookies for this site.',
      ],
    },
    {
      heading: 'Contact Form',
      body: [
        `Your name, email address, subject and message are sent as an email to ${SITE.email}. They are not saved in a database on this site, and are used only to reply to you.`,
      ],
    },
    {
      heading: 'Chat Assistant',
      body: [
        'Messages you type into the chat assistant are sent to the server to generate a reply. When the AI mode is enabled, your message and the last few messages of the conversation are sent to OpenAI for that purpose; otherwise replies come from a fixed knowledge base on the site. Chat conversations are not saved by this site.',
        'Please don’t share personal or sensitive information in the chat.',
      ],
    },
    {
      heading: 'Cookies and Browser Storage',
      body: [
        'The only cookies are set by Google Analytics (_ga and _ga_ZWPEP9X6EP) to tell one visit from another. There are no advertising cookies. The site remembers your light or dark theme choice in your browser’s local storage, which never leaves your device. Fonts are served from this site, so loading a page makes no requests to Google Fonts.',
      ],
    },
    {
      heading: 'Links to Other Services',
      body: [
        'Links to GitHub, LinkedIn, WhatsApp, Google Drive (for the résumé) and project demos take you to services with their own privacy policies.',
      ],
    },
    {
      heading: 'Your Choices',
      body: [`To have a message you sent deleted, or to ask anything about this page, email ${SITE.email}.`],
    },
  ],
}

const terms: LegalDoc = {
  id: 'terms',
  path: '/terms',
  title: 'Terms of Use',
  navLabel: 'Terms',
  description:
    'The terms for using taaranjain.com: how its content may be reused, fair use of the contact form and chat assistant, and the limits of liability.',
  updated: UPDATED,
  summary:
    'This is a personal portfolio. You are welcome to read, share and link to it. These terms explain what you can reuse, how to use the interactive features fairly, and what the site does not promise.',
  sections: [
    {
      heading: 'Using This Site',
      body: [
        'By browsing this site you agree to these terms. If you don’t agree with them, please don’t use the site.',
      ],
    },
    {
      heading: 'Content and Ownership',
      body: [
        `The writing, case studies, design and images on this site belong to ${SITE.name} unless stated otherwise. You may quote short excerpts with a link back to the original page. Please ask before republishing whole articles or case studies.`,
        'Source code for individual projects lives in their GitHub repositories and is covered by the licence in each repository, not by these terms.',
      ],
    },
    {
      heading: 'Fair Use of the Contact Form and Chat',
      body: ['The contact form and chat assistant are for genuine enquiries. Please don’t use them to:'],
      bullets: [
        'Send spam, advertising or automated messages.',
        'Submit content that is unlawful, abusive or infringes someone else’s rights.',
        'Try to extract the assistant’s instructions, overload the service or interfere with how the site works.',
      ],
    },
    {
      heading: 'Third-Party Links',
      body: [
        'The site links to live demos, GitHub, LinkedIn and other services. Those services are run by others, and their own terms apply once you follow a link.',
      ],
    },
    {
      heading: 'No Warranty',
      body: [
        'The site and everything on it are provided “as is”. Reasonable care goes into keeping it accurate and available, but there is no guarantee that it is error-free, complete or always online. To the extent the law allows, the site owner is not liable for losses arising from using it.',
      ],
    },
    {
      heading: 'Changes to These Terms',
      body: [
        'These terms may be updated as the site changes. The date at the top of this page shows when they last changed.',
        `Questions about these terms can be sent to ${SITE.email}.`,
      ],
    },
  ],
}

const disclaimer: LegalDoc = {
  id: 'disclaimer',
  path: '/disclaimer',
  title: 'Disclaimer',
  navLabel: 'Disclaimer',
  description:
    'Content on taaranjain.com reflects personal views and is for information only. Chat assistant answers can be wrong; the site owner is the source of truth.',
  updated: UPDATED,
  summary:
    'Everything on this site is shared in good faith and for general information. Please read it as one engineer’s experience rather than professional advice.',
  sections: [
    {
      heading: 'Personal Views',
      body: [
        `Opinions in the blog, case studies and project write-ups are ${SITE.name}’s own. They do not represent the views of any current or past employer, client or institution.`,
      ],
    },
    {
      heading: 'Not Professional Advice',
      body: [
        'Technical articles and case studies describe what worked in specific situations. They are not a substitute for testing in your own environment, and applying them is at your own risk.',
      ],
    },
    {
      heading: 'Chat Assistant Answers',
      body: [
        'The chat assistant answers questions about this portfolio automatically. Its replies can be incomplete or wrong, and nothing it says is a commitment or an offer. For anything that matters, such as availability, rates or experience, confirm directly by email.',
      ],
    },
    {
      heading: 'Project Results and Figures',
      body: [
        'Metrics, benchmarks and cost figures reflect the conditions at the time of writing. Model versions, pricing and free-tier limits change, so the same setup may behave differently today.',
      ],
    },
    {
      heading: 'Trademarks',
      body: [
        'Product and company names mentioned on this site are trademarks of their respective owners. Mentioning them does not imply endorsement or affiliation.',
      ],
    },
  ],
}

export const LEGAL_DOCS: LegalDoc[] = [privacy, terms, disclaimer]

export function getLegalDoc(id: LegalDocId): LegalDoc {
  return LEGAL_DOCS.find((doc) => doc.id === id)!
}
