# Taaran Jain — AI Engineer Portfolio

Personal portfolio showcasing my work, research, and experience as an AI Engineer.

**Live:** [www.taaranjain.com](https://www.taaranjain.com)

## Features

- **Dual navigation model** — a single-scroll home page, plus a standalone route for every section (`/about`, `/projects`, …) so individual sections can be linked and shared directly
- **Portfolio assistant** — an in-page chatbot answering questions about projects, skills, and experience; backed by an OpenAI-compatible LLM with a Fuse.js static knowledge base as fallback, and code-split so it costs nothing until opened
- **Contact form** — Nodemailer over Gmail SMTP, with server-side validation and HTML escaping
- **Admin dashboard** (`/admin`) — HMAC-signed, HttpOnly-cookie session over a single set of env-configured credentials
- **SEO** — per-route metadata, JSON-LD `@graph` (Person / WebSite / ProfilePage), generated OG and Twitter images, sitemap, robots, and web manifest
- **Light / dark themes** via `data-theme`, with a View Transitions crossfade
- **Accessibility** — skip link, focus-visible rings throughout, keyboard-trapped chat dialog, and full `prefers-reduced-motion` support
- Responsive from 320px up

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) · React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3 + CSS custom properties |
| Animation | Framer Motion |
| Search | Fuse.js |
| Email | Nodemailer |
| Deployment | Vercel |

## Project Structure

```text
app/           App Router — routes, API handlers, SEO/metadata files
  (site)/      Public portfolio pages
  admin/       Password-gated dashboard
  api/         Contact, chat, and admin-auth route handlers
components/
  sections/    One component per portfolio section
  ui/          Shared primitives (Card, Badge, Button, …)
  chatbot/     Chat widget and its colocated hook
content/       All copy and data, typed against types/
lib/           Auth, motion tokens, chatbot responders, formatting
types/         Shared domain types
docs/          Engineering decisions worth keeping
```

Content is fully separated from presentation: every section component reads
from a typed module in `content/`, so updating the site means editing data,
not JSX.

## Run Locally

```bash
npm install
npm run dev
```

Create a `.env.local` — see [.env.example](.env.example) for the full list
with explanations. Only the contact form and admin panel need secrets; the
site renders without them.

```bash
npm run build      # production build
npm run typecheck  # tsc --noEmit
```
