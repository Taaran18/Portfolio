# Engineering notes

Decisions that are not self-evident from the code, kept here because the
source itself is comment-free. Each entry records a measurement or a
platform quirk that would otherwise have to be rediscovered.

## Colour contrast (WCAG 2.1 AA)

Measured ratios against the light theme's page background (`#f0f4ff`) unless
stated otherwise. Normal-weight text needs 4.5:1; large bold text needs 3:1.

| Token | Measured | Resolution |
| --- | --- | --- |
| `cyan-500` `#06b6d4` | 2.21:1 | Too low for any text. `.text-gradient` uses `cyan-700` `#0e7490` (3.35:1) and is only applied to 18px+ bold. |
| `cyan-600` | 3.35:1 | Below 4.5:1 for body text — `Button` `secondary` uses `cyan-700` (4.87:1). |
| `cyan-700` on gradient | 5.36:1 | White text on the primary CTA gradient holds at both ends (`purple-600` end is 5.38:1). `cyan-500` there was 2.43:1. |
| `slate-400` / `dark:slate-500` | 2.33:1 / 4.26:1 | Both fail at 12px. Site-wide muted-text pairing is `slate-600` / `dark:slate-400` (6.89:1 / 7.91:1). |

`Badge` tones were swept twice — first against the page background, then
against the badge's **own** tinted background. `cyan-700` and `green-700`
passed the first sweep but landed at 4.47–4.48:1 against their own tint, so
both moved to `-800` (6.08:1 / 6.36:1). `purple-600` (4.89) and `blue-600`
(4.70) passed unchanged.

Font sizing: 18px bold sits just under the 18.66px WCAG large-text
threshold, so the brand marks in `Navbar` and `Footer` use `text-xl` (20px)
to clear it unambiguously.

## Tailwind

- `darkMode` must use the `'selector'` strategy, not `'class'`. `'class'`
  ignores the custom selector and matches a literal `.dark`, which never
  appears under attribute theming.
- A single selector string is used rather than a comma-separated list.
  Tailwind 3.4.x appends the ` *` descendant combinator only to the **last**
  selector in a multi-selector list — verified against compiled CSS output.
- Badge tone classes are written as full literal strings. JIT cannot see
  dynamically built names like `` `bg-${tone}-500` `` and generates no CSS.

## CSS

`.surface` sets `background-color`, never the `background` shorthand. The
shorthand resets every sub-property it omits — including `background-image`
— which silently discards any Tailwind gradient utility applied alongside
it. This previously broke the active filter-pill state, whose white text
then sat on a near-white fill.

## Performance

- The hero description is a plain `<p>`, not a `motion.p`. Framer Motion
  renders `initial={{ opacity: 0 }}` into the server HTML, so the LCP element
  stayed invisible until hydration — that dependency, not the delay value,
  inflated LCP to ~3.7s.
- The first project card sets `priority` on `next/image`. It is the
  above-the-fold LCP candidate and the default `loading="lazy"` delayed its
  own fetch discovery.
- `.browserslistrc` pins modern evergreen targets. Without it Next falls back
  to a conservative target and polyfills baseline JS that every supported
  browser ships natively — Lighthouse flagged ~22KB of this as legacy
  JavaScript.
- The chat widget is behind `next/dynamic` with `ssr: false`, so Fuse.js and
  the knowledge base stay out of every page's initial bundle.

## Accessibility

- `MotionConfig reducedMotion="user"` covers every Framer Motion animation.
  The hero typewriter is plain `setTimeout` state, which `MotionConfig` does
  not reach, so it checks `prefers-reduced-motion` directly and skips
  cycling entirely.
- A skip link targets `#main-content` (WCAG 2.4.1) so keyboard users can
  bypass the eight-link nav on every page.
