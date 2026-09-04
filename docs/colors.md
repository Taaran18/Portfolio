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
| `--accent`         | `#4f46e5` | `#4f46e5` | Primary accent           |
| `--accent-alt`     | `#7c3aed` | `#7c3aed` | Gradient partner         |

## Brand palette

Indigo and violet carry the brand. Indigo is the action colour; violet only ever appears alongside it in gradients.

| Colour       | Hex       | Uses | Where                                                    |
| ------------ | --------- | ---- | -------------------------------------------------------- |
| `indigo-600` | `#4f46e5` | 108  | Primary accent. CTAs, links, active nav, focus rings.    |
| `indigo-500` | `#6366f1` | 72   | Hover and ring tints, gradient start, chart bars.        |
| `indigo-400` | `#818cf8` | 48   | Dark-mode accent text (indigo-600 is too dark on black). |
| `indigo-700` | `#4338ca` | 19   | Pressed state, gradient end on the login CTA.            |
| `violet-600` | `#7c3aed` | 21   | Gradient partner to indigo. Logo mark, primary button.   |
| `violet-500` | `#8b5cf6` | 10   | Secondary badge tone, link-click icons.                  |

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
| Email indigo   | `#4f46e5`            | Hard-coded in the contact email template — mail clients cannot read CSS variables. |
| OG gradient    | `#818cf8 -> #7c3aed` | Open Graph card headline gradient (indigo-400 to violet-600).                      |

## Measured contrast

WCAG 2.1 ratios computed from the values above. Normal text needs 4.5:1, large or bold text 3:1.

| Pair                   | Theme | Ratio   | Grade |
| ---------------------- | ----- | ------- | ----- |
| Body text on page      | light | 21.00:1 | AAA   |
| Muted text on page     | light | 7.73:1  | AAA   |
| Accent link on page    | light | 6.29:1  | AA    |
| White on accent button | light | 6.29:1  | AA    |
| Body text on page      | dark  | 21.00:1 | AAA   |
| Muted text on page     | dark  | 8.19:1  | AAA   |
| Accent link on surface | dark  | 6.47:1  | AA    |
| Muted text on surface  | dark  | 7.53:1  | AAA   |

### Known limits

- `indigo-600` on white is 6.29:1 — fine for links and bold text, but not for small muted copy.
- `indigo-500` on white is only 4.47:1. Use it for fills and borders, never for text on a light background.
- Dark mode swaps to `indigo-400` (6.47:1 on surface) because `indigo-600` drops to 3.07:1 on black.
