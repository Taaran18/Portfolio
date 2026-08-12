import type { BlogPost } from '@/types'

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'rag-chunking-boundaries',
    title: 'Your RAG pipeline is probably splitting tables in half',
    excerpt:
      'Most retrieval failures I have debugged were not embedding problems or ranking problems. They were chunking problems — and they are invisible until you read the retrieved context directly.',
    publishedAt: '2026-01-18',
    readingMinutes: 6,
    tags: ['RAG', 'LLM', 'Retrieval'],
    sections: [
      {
        heading: 'The symptom',
        body: [
          'A retrieval-augmented system starts answering confidently and wrongly. Not hallucinating from nowhere — the answer is clearly derived from your documents, it is just incomplete or subtly inverted. A figure is right but its label is wrong. A conditional loses its condition.',
          'The instinct is to blame the model, then the embeddings, then the ranker. In my experience the cause is usually earlier and duller than any of those.',
        ],
      },
      {
        heading: 'Fixed-size chunking is a lossy operation',
        body: [
          'The default in most tutorials is to split text every N characters with some overlap. It is simple, fast, and completely blind to what the text actually is.',
          'Run that over a document containing a table and you get a chunk holding three rows with no header, and another holding a header with no rows. Both embed fine. Both retrieve fine. Both are useless, and the second one is actively dangerous because a model will happily infer values to fill the gap.',
        ],
        bullets: [
          'Tables lose their header row, so columns become unlabelled numbers',
          'Code blocks lose their opening context, so the language and purpose vanish',
          'Numbered lists lose the stem that said what the list enumerated',
          'Conditionals get separated from the clause they depend on',
        ],
      },
      {
        heading: 'Split on structure first',
        body: [
          'The fix is to treat length as a fallback, not a rule. Split on the document’s own structure — headings, paragraphs, list boundaries, table blocks — and only apply a size limit inside a structural unit that is genuinely too large.',
          'When a unit does have to be broken, carry its header forward into every resulting piece. A table fragment that repeats its column headers is still useful; one that does not is noise wearing the costume of data.',
        ],
      },
      {
        heading: 'Read the retrieved context, not just the answer',
        body: [
          'The habit worth building is simple: when an answer is wrong, log and read the exact chunks that were retrieved before touching anything else. Not the similarity scores — the actual text.',
          'Nearly every time I have done this, the problem was visible immediately and had nothing to do with the model. The retrieval was working exactly as designed. What it retrieved had been damaged well before it ever reached an embedding.',
        ],
      },
      {
        heading: 'A cheap evaluation loop',
        body: [
          'Once chunking is structural, keep it honest with a small labelled set — twenty or thirty questions where you know which chunk should be retrieved. Measure whether it is, and whether the chunk is intact.',
          'This is unglamorous and takes an afternoon, and it will catch a class of bug that no amount of prompt engineering will fix downstream.',
        ],
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
