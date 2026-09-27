# Colour reference

Every colour used in this portfolio, pulled directly from the source. Regenerate
with `npm run docs:colors`.

Two systems are in play. **Design tokens** are CSS custom properties defined in
`app/globals.css`; they flip between light and dark and should be preferred for
anything new. **Palette colours** are Tailwind utilities used directly in
components, mostly predating the token layer.

## Design tokens

Defined on `:root` and overridden under `[data-theme='dark']`.

| Token              | Light     | Dark      | Role                     |
| ------------------ | --------- | --------- | ------------------------ |
| `--bg-primary`     | `#ffffff` | `#000000` | Page background          |
| `--bg-secondary`   | `#f4f4f5` | `#0a0a0a` | Recessed sections        |
| `--text-primary`   | `#000000` | `#ffffff` | Headings and body text   |
| `--text-muted`     | `#52525b` | `#a1a1aa` | Secondary text           |
| `--surface-bg`     | `#ffffff` | `#0e0e0e` | Card and panel fill      |
| `--surface-border` | `#d4d4d8` | `#2e2e32` | Card and divider borders |
| `--nav-bg`         | `#ffffff` | `#0e0e0e` | Navigation bar fill      |
| `--nav-border`     | `#d4d4d8` | `#2e2e32` | Navigation bar border    |
| `--accent`         | `#0d9488` | `#0d9488` | Primary accent           |
| `--accent-alt`     | `#0891b2` | `#0891b2` | Gradient partner         |

## Brand palette

Teal (`brand`) and cyan (`accent`) carry the brand. Teal is the action colour; cyan only ever appears alongside it in gradients and on tech tags. Both are aliased in tailwind.config.ts, so the palette changes in one place.

| Colour                  | Hex       | Uses | Where                                                                             |
| ----------------------- | --------- | ---- | --------------------------------------------------------------------------------- |
| `brand-700 (teal-700)`  | `#0f766e` | 60   | Primary accent. Links, CTA gradient start, active nav, gradient headings (light). |
| `brand-500 (teal-500)`  | `#14b8a6` | 55   | Focus rings, borders, dots, chart bars (decorative only).                         |
| `brand-400 (teal-400)`  | `#2dd4bf` | 45   | Dark-mode accent text and gradient headings (dark).                               |
| `brand-800 (teal-800)`  | `#115e59` | 3    | Hover state on solid brand buttons.                                               |
| `accent-700 (cyan-700)` | `#0e7490` | 20   | Gradient partner. CTA gradient end, logo mark.                                    |
| `accent-400 (cyan-400)` | `#22d3ee` | 6    | Dark-mode gradient partner, tech tag text.                                        |

## Neutrals

Slate for all text and structure. Light and dark modes use different steps to hold contrast.

| Colour      | Hex       | Uses | Where                                                        |
| ----------- | --------- | ---- | ------------------------------------------------------------ |
| `slate-900` | `#0f172a` | 36   | Headings and primary body text in light mode.                |
| `slate-700` | `#334155` | 7    | Article body copy, definition values.                        |
| `slate-600` | `#475569` | 67   | Muted body text in light mode. Pairs with slate-400 in dark. |
| `slate-500` | `#64748b` | 27   | Micro-labels, timestamps, eyebrow text.                      |
| `slate-400` | `#94a3b8` | 65   | Muted body text in dark mode.                                |
| `slate-300` | `#cbd5e1` | 14   | Article body copy in dark mode.                              |

## Semantic and category colours

Used sparingly, to classify rather than decorate — certification issuers, status, and alerts.

| Colour       | Hex       | Uses | Where                                                |
| ------------ | --------- | ---- | ---------------------------------------------------- |
| `green-500`  | `#22c55e` | 11   | Success, "available" status dot, certification tone. |
| `blue-500`   | `#3b82f6` | 6    | Certification tone (Microsoft/Azure).                |
| `orange-400` | `#fb923c` | 6    | Certification tone (DeepLearning.AI).                |
| `amber-500`  | `#f59e0b` | 4    | Warning banner in the analytics dashboard.           |
| `red-500`    | `#ef4444` | 4    | Destructive actions, form errors, sign-out hover.    |
| `yellow-500` | `#eab308` | 2    | Featured badge tone.                                 |

## Fixed colours

These do not follow the theme and must not be tokenised.

| Colour         | Value                | Why                                                                                |
| -------------- | -------------------- | ---------------------------------------------------------------------------------- |
| WhatsApp green | `#25D366`            | Brand-locked. The WhatsApp FAB must use the official colour.                       |
| Email teal     | `#0f766e`            | Hard-coded in the contact email template — mail clients cannot read CSS variables. |
| OG gradient    | `#2dd4bf -> #22d3ee` | Open Graph card headline gradient (teal-400 to cyan-400).                          |

## Measured contrast

WCAG 2.1 ratios computed from the values above. Normal text needs 4.5:1, large or bold text 3:1.

| Pair                   | Theme | Ratio   | Grade |
| ---------------------- | ----- | ------- | ----- |
| Body text on page      | light | 21.00:1 | AAA   |
| Muted text on page     | light | 7.73:1  | AAA   |
| Accent link on page    | light | 5.47:1  | AA    |
| White on accent button | light | 5.47:1  | AA    |
| White on gradient end  | light | 5.36:1  | AA    |
| Body text on page      | dark  | 21.00:1 | AAA   |
| Muted text on page     | dark  | 8.19:1  | AAA   |
| Accent link on surface | dark  | 10.37:1 | AAA   |
| Muted text on surface  | dark  | 7.53:1  | AAA   |

### Known limits

- `brand-600` on white is only 3.74:1, so light-mode text and white-on-colour buttons use `brand-700` (5.47:1).
- `brand-500` on white is 2.49:1. Use it for fills, borders and dots, never for text on a light background.
- Dark mode swaps to `brand-400` (10.37:1 on surface).
