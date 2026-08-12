import type { CaseStudy } from '@/types'

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'nexus-ai',
    title: 'Nexus AI',
    tagline: 'Six language models, one interface, zero infrastructure cost',
    summary:
      'A multi-modal AI platform that routes between six open-weight LLMs, grounds answers in uploaded documents and live web search, and orchestrates it all through a LangGraph node graph — running end to end on free tiers.',
    role: 'Sole engineer — architecture, backend, frontend, deployment',
    timeline: '2025',
    stack: ['Next.js', 'FastAPI', 'LangGraph', 'LangChain', 'Supabase', 'Groq API'],
    liveUrl: 'https://nexus-ai-drab.vercel.app/',
    githubUrl: 'https://github.com/Taaran18/nexus-ai',
    imageUrl: '/projects/nexus-ai.png',
    publishedAt: '2025-11-20',
    metrics: [
      { label: 'Models routed', value: '6' },
      { label: 'Infra cost / month', value: '$0' },
      { label: 'Input modes', value: 'Text · Docs · Voice' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Most chat interfaces lock you into a single model. That is fine until you notice how differently models behave: one is fast and cheap but shallow on reasoning, another handles long context well but stalls on code, a third is strong at summarising but expensive to call repeatedly.',
          'I wanted a single surface where the model is a variable rather than a constraint — and where the answer can be grounded in a document I just uploaded or a page published this morning, not only in training data.',
        ],
      },
      {
        heading: 'Constraints I set',
        body: [
          'Before writing code I fixed three constraints, because they determined nearly every decision that followed.',
        ],
        bullets: [
          'Zero recurring cost — the whole stack had to run on free tiers, so it could stay online indefinitely without a card attached.',
          'Streaming by default — a multi-second wait with no feedback reads as broken, regardless of answer quality.',
          'Swappable models — adding or removing a model should be configuration, not a refactor.',
        ],
      },
      {
        heading: 'Architecture',
        body: [
          'The system splits into three layers. A Next.js client owns the conversation UI and streams tokens as they arrive. A FastAPI service owns orchestration and provider calls. Supabase holds conversation state, uploaded document chunks, and their embeddings.',
          'Orchestration runs through LangGraph rather than a linear LangChain chain. Each capability — retrieval, web search, model call, synthesis — is a node, and the edges decide what actually runs for a given query. A question about an uploaded PDF walks a different path than one needing live search, and neither pays for the other.',
        ],
        bullets: [
          'Client (Next.js) — streaming chat surface, document upload, voice input',
          'Orchestrator (FastAPI + LangGraph) — routing, retrieval, provider fan-out',
          'State (Supabase) — conversations, document chunks, vector embeddings',
          'Inference (Groq) — six open-weight models behind one interface',
        ],
      },
      {
        heading: 'Why LangGraph over a linear chain',
        body: [
          'A linear chain forces every request through every step. That is wasteful when most questions need only one capability, and it makes conditional behaviour awkward to express — you end up with branching logic smuggled into prompt templates.',
          'Modelling it as a graph made the routing explicit and inspectable. When an answer is wrong, I can see which node produced it instead of reading through a chain of implicit steps. That single property saved more debugging time than any other decision in the project.',
        ],
      },
      {
        heading: 'Retrieval',
        body: [
          'Documents are chunked, embedded, and stored in Supabase with pgvector. At query time the retrieval node pulls the top matching chunks and injects them as grounding context.',
          'The interesting failure mode was not retrieval accuracy — it was chunk boundaries. Splitting purely on character count repeatedly cut tables and code blocks in half, and the model then confidently answered from a fragment. Chunking on structural boundaries first, and only falling back to length, fixed most of it.',
        ],
      },
      {
        heading: 'What I would do differently',
        body: [
          'Free tiers impose rate limits, and I handled them reactively — retry, then fail over to another model. A request queue with per-provider budgets would have been the better primitive, and would have made the fallback behaviour predictable instead of emergent.',
          'I would also add evaluation earlier. I judged answer quality by reading outputs, which does not scale past a few dozen examples. A small labelled set with automated scoring would have caught the chunk-boundary problem far sooner than I did.',
        ],
      },
    ],
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug)
}
