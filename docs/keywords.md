# Keyword strategy

Research date: **4 September 2026**. Review every six months — this field's
vocabulary moves fast.

## What these numbers are, and are not

I could not pull true Google search volumes. Those come from Keyword Planner,
Ahrefs, or Semrush, all of which need a paid account this project does not have.
Anything labelled with a number below is a **demand signal** — job-posting counts
and year-on-year growth from published market reports — not a monthly search
volume. They tell you which terms recruiters and job boards actually use, which
is the thing worth optimising for. Treat any figure here as directional.

If you want real volumes later, run the shortlist in the last section through
Keyword Planner and replace this file.

## Core finding: target both titles, lead with AI Engineer

| Title                     | Signal                               | Read                                                              |
| ------------------------- | ------------------------------------ | ----------------------------------------------------------------- |
| Machine Learning Engineer | ~4,781 active postings; +33% YoY     | Larger, older, better paid (median $165k base)                    |
| AI Engineer               | ~4,091 active postings; **+74% YoY** | Newer, growing twice as fast, the wider entry door (median $145k) |

The gap in postings is only ~1.17x, but AI Engineer is growing at more than
double the rate. Neither term wins outright, so the site should rank for both
rather than picking one. Lead with "AI Engineer" for identity and momentum, and
carry "Machine Learning Engineer" in metadata, structured data, and body copy so
searches for the larger, better-paid pool still land.

## Skill keywords, ranked by hiring demand

These are the terms that moved from optional to explicitly required in postings
between 2023 and 2025.

| Keyword                                        | Signal                                                          | Status after this pass     |
| ---------------------------------------------- | --------------------------------------------------------------- | -------------------------- |
| RAG / retrieval-augmented generation           | Highest-demand GenAI skill; named in 321 open AI engineer roles | Yes — strong               |
| Vector database (pgvector, Pinecone, Weaviate) | Now an explicit requirement, not a nice-to-have                 | Added — pgvector, Supabase |
| LangChain / LangGraph                          | Named by LinkedIn among the fastest-growing AI role skills      | Added — LangGraph          |
| Agentic AI / multi-agent systems               | **Fastest-growing specialisation** in 2026                      | Added — agentic workflows  |
| LLM fine-tuning                                | Standard expectation for ML engineer postings                   | Partial                    |
| Prompt engineering                             | Premium skill, consistently listed                              | Yes                        |
| MLOps / model deployment                       | Gap most acute in production-ready skills                       | Yes                        |
| LLM APIs, Hugging Face, Python, FastAPI        | Baseline stack for LLM Engineer roles                           | Yes                        |

The clear openings were **vector databases**, **LangGraph**, and **agentic /
multi-agent systems**. All three are things Taaran has genuinely built — Nexus AI
runs a LangGraph pipeline over Supabase pgvector — so this was the copy
under-selling real work, not a gap to invent around. All three are now surfaced
in the hero, skills, about copy, and metadata; nothing unsupported was added.

## Geographic and market context

- India posted ~290,256 AI-linked roles in 2025, projected ~380,000 in 2026 (+32% YoY).
- GenAI and LLM skills specifically saw a ~60% YoY jump in demand.
- NASSCOM projects a need for ~1M AI-skilled professionals by 2027 against a pool of ~500–650k.
- Bengaluru, Hyderabad, Pune and Delhi NCR dominate; Tier-2 cities are growing as GCCs expand.

Jaipur is not a hub, so "AI engineer Jaipur" is low-competition but also
low-demand. Keep it for local and structured-data signals, but do not build the
strategy on it. "Remote" and "India" are the higher-value modifiers.

## Why a portfolio site is worth optimising

- 73% of hiring managers view a portfolio site before making contact.
- 78% prioritise candidates with a custom portfolio over a generic resume.
- Page-one rankings draw 10–20x the organic traffic of page two or three.

## On-page rules to follow

Standard practice, and cheap to comply with:

1. Title tag carries name and role — `Taaran Jain | AI Engineer`.
2. Meta description names the niche explicitly.
3. Primary keyword appears in the H1 and at least two H2s.
4. Person, WebSite and breadcrumb schema — already implemented in `lib/seo.ts`.
5. Long-tail beats head terms for a personal site. `RAG pipeline developer`
   outranks `AI engineer` in achievability by a wide margin.

## Priority keyword shortlist

Ordered by expected return for this specific site. Run these through a real
keyword tool before committing further.

**Branded (own these outright)**

- Taaran Jain, Taaran Jain AI engineer, Taaran Jain portfolio

**Primary (realistic targets)**

- AI engineer portfolio
- machine learning engineer portfolio
- RAG pipeline developer
- LLM application developer
- AI engineer India / remote AI engineer India

**Long-tail (highest achievability)**

- LangGraph RAG pipeline example
- multimodal RAG chatbot project
- pgvector RAG implementation
- neuroevolution NEAT self-driving car simulation
- production LLM systems portfolio
- AI engineer resume RAG LLM MLOps

**Local (low volume, low competition)**

- AI engineer Jaipur, machine learning engineer Rajasthan

## Sources

- [AI Engineer vs Machine Learning Engineer: Close, but $20K Apart — InterviewStack](https://interviewstack.io/blog/ai-engineer-vs-machine-learning-engineer-2026)
- [Fastest Growing AI Roles in 2026 — HeroHunt](https://www.herohunt.ai/blog/fastest-growing-ai-roles-in-2026-data-and-rankings/)
- [RAG Skills for AI Jobs — SuperCareer](https://www.supercareer.co/blog/rag-skills-vector-database-ai-career)
- [AI Engineer Resume 2026: RAG, LLMs & MLOps Keywords — LevStack](https://levstack.io/en/blog/ai-engineer-resume-2026/)
- [The 2026 AI Job Market Report: India Edition — Masai](https://www.masaischool.com/blog/the-2026-ai-job-market-report-india-edition/)
- [AI Jobs in India 2026 — NNHire](https://nnhire.com/blog/ai-jobs-in-india-2026-roles-salaries-skills-and-career-guide)
- [Portfolio SEO Optimization Guide 2026 — InfluenceFlow](https://influenceflow.io/resources/portfolio-seo-optimization-the-complete-2026-guide-to-ranking-your-creative-work/)
- [How to Create a Portfolio Website in 2026 — MeshBase](https://meshbase.io/blog/how-to-create-portfolio-website)
