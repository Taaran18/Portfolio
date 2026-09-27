const fs = require('fs')
const tw = require(process.cwd() + '/node_modules/tailwindcss/colors')

const lin = (c) => {
  c /= 255
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}
const L = (h) => {
  h = h.replace('#', '')
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
const ratio = (a, b) => {
  const x = L(a),
    y = L(b)
  const hi = Math.max(x, y),
    lo = Math.min(x, y)
  return (hi + 0.05) / (lo + 0.05)
}
const fmt = (n) => n.toFixed(2)
const grade = (r, large = false) =>
  r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? (large ? 'AA (large)' : 'fails') : 'fails'

const TOKENS = {
  light: {
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f4f4f5',
    '--text-primary': '#000000',
    '--text-muted': '#52525b',
    '--surface-bg': '#ffffff',
    '--surface-border': '#d4d4d8',
    '--nav-bg': '#ffffff',
    '--nav-border': '#d4d4d8',
    '--accent': '#0d9488',
    '--accent-alt': '#0891b2',
  },
  dark: {
    '--bg-primary': '#000000',
    '--bg-secondary': '#0a0a0a',
    '--text-primary': '#ffffff',
    '--text-muted': '#a1a1aa',
    '--surface-bg': '#0e0e0e',
    '--surface-border': '#2e2e32',
    '--nav-bg': '#0e0e0e',
    '--nav-border': '#2e2e32',
    '--accent': '#0d9488',
    '--accent-alt': '#0891b2',
  },
}

const CORE = [
  [
    'brand-700 (teal-700)',
    tw.teal[700],
    'Primary accent. Links, CTA gradient start, active nav, gradient headings (light).',
    60,
  ],
  ['brand-500 (teal-500)', tw.teal[500], 'Focus rings, borders, dots, chart bars (decorative only).', 55],
  ['brand-400 (teal-400)', tw.teal[400], 'Dark-mode accent text and gradient headings (dark).', 45],
  ['brand-800 (teal-800)', tw.teal[800], 'Hover state on solid brand buttons.', 3],
  ['accent-700 (cyan-700)', tw.cyan[700], 'Gradient partner. CTA gradient end, logo mark.', 20],
  ['accent-400 (cyan-400)', tw.cyan[400], 'Dark-mode gradient partner, tech tag text.', 6],
]
const NEUTRAL = [
  ['slate-900', tw.slate[900], 'Headings and primary body text in light mode.', 36],
  ['slate-700', tw.slate[700], 'Article body copy, definition values.', 7],
  ['slate-600', tw.slate[600], 'Muted body text in light mode. Pairs with slate-400 in dark.', 67],
  ['slate-500', tw.slate[500], 'Micro-labels, timestamps, eyebrow text.', 27],
  ['slate-400', tw.slate[400], 'Muted body text in dark mode.', 65],
  ['slate-300', tw.slate[300], 'Article body copy in dark mode.', 14],
]
const SEMANTIC = [
  ['green-500', tw.green[500], 'Success, "available" status dot, certification tone.', 11],
  ['blue-500', tw.blue[500], 'Certification tone (Microsoft/Azure).', 6],
  ['orange-400', tw.orange[400], 'Certification tone (DeepLearning.AI).', 6],
  ['amber-500', tw.amber[500], 'Warning banner in the analytics dashboard.', 4],
  ['red-500', tw.red[500], 'Destructive actions, form errors, sign-out hover.', 4],
  ['yellow-500', tw.yellow[500], 'Featured badge tone.', 2],
]
const FIXED = [
  ['WhatsApp green', '#25D366', 'Brand-locked. The WhatsApp FAB must use the official colour.'],
  ['Email teal', '#0f766e', 'Hard-coded in the contact email template — mail clients cannot read CSS variables.'],
  ['OG gradient', '#2dd4bf -> #22d3ee', 'Open Graph card headline gradient (teal-400 to cyan-400).'],
]

const CONTRAST = [
  ['Body text on page', '#000000', '#ffffff', 'light', false],
  ['Muted text on page', '#52525b', '#ffffff', 'light', false],
  ['Accent link on page', tw.teal[700], '#ffffff', 'light', false],
  ['White on accent button', '#ffffff', tw.teal[700], 'light', false],
  ['White on gradient end', '#ffffff', tw.cyan[700], 'light', false],
  ['Body text on page', '#ffffff', '#000000', 'dark', false],
  ['Muted text on page', '#a1a1aa', '#000000', 'dark', false],
  ['Accent link on surface', tw.teal[400], '#0e0e0e', 'dark', false],
  ['Muted text on surface', tw.slate[400], '#0e0e0e', 'dark', false],
]

let md = `# Colour reference

Every colour used in this portfolio, pulled directly from the source. Regenerate
with \`npm run docs:colors\`.

Two systems are in play. **Design tokens** are CSS custom properties defined in
\`app/globals.css\`; they flip between light and dark and should be preferred for
anything new. **Palette colours** are Tailwind utilities used directly in
components, mostly predating the token layer.

## Design tokens

Defined on \`:root\` and overridden under \`[data-theme='dark']\`.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
`
const ROLES = {
  '--bg-primary': 'Page background',
  '--bg-secondary': 'Recessed sections',
  '--text-primary': 'Headings and body text',
  '--text-muted': 'Secondary text',
  '--surface-bg': 'Card and panel fill',
  '--surface-border': 'Card and divider borders',
  '--nav-bg': 'Navigation bar fill',
  '--nav-border': 'Navigation bar border',
  '--accent': 'Primary accent',
  '--accent-alt': 'Gradient partner',
}
for (const k of Object.keys(TOKENS.light)) {
  md += `| \`${k}\` | \`${TOKENS.light[k]}\` | \`${TOKENS.dark[k]}\` | ${ROLES[k]} |\n`
}

const section = (title, note, rows) => {
  let s = `\n## ${title}\n\n${note}\n\n| Colour | Hex | Uses | Where |\n| --- | --- | --- | --- |\n`
  for (const [name, hex, use, count] of rows) s += `| \`${name}\` | \`${hex}\` | ${count} | ${use} |\n`
  return s
}
md += section(
  'Brand palette',
  'Teal (`brand`) and cyan (`accent`) carry the brand. Teal is the action colour; cyan only ever appears alongside it in gradients and on tech tags. Both are aliased in tailwind.config.ts, so the palette changes in one place.',
  CORE
)
md += section(
  'Neutrals',
  'Slate for all text and structure. Light and dark modes use different steps to hold contrast.',
  NEUTRAL
)
md += section(
  'Semantic and category colours',
  'Used sparingly, to classify rather than decorate — certification issuers, status, and alerts.',
  SEMANTIC
)

md += `\n## Fixed colours\n\nThese do not follow the theme and must not be tokenised.\n\n| Colour | Value | Why |\n| --- | --- | --- |\n`
for (const [n, v, why] of FIXED) md += `| ${n} | \`${v}\` | ${why} |\n`

md += `\n## Measured contrast\n\nWCAG 2.1 ratios computed from the values above. Normal text needs 4.5:1, large or bold text 3:1.\n\n| Pair | Theme | Ratio | Grade |\n| --- | --- | --- | --- |\n`
for (const [label, fg, bg, theme] of CONTRAST) {
  const r = ratio(fg, bg)
  md += `| ${label} | ${theme} | ${fmt(r)}:1 | ${grade(r)} |\n`
}
md += `\n### Known limits\n\n- \`brand-600\` on white is only ${fmt(ratio(tw.teal[600], '#ffffff'))}:1, so light-mode text and white-on-colour buttons use \`brand-700\` (${fmt(ratio(tw.teal[700], '#ffffff'))}:1).\n- \`brand-500\` on white is ${fmt(ratio(tw.teal[500], '#ffffff'))}:1. Use it for fills, borders and dots, never for text on a light background.\n- Dark mode swaps to \`brand-400\` (${fmt(ratio(tw.teal[400], '#0e0e0e'))}:1 on surface).\n`

fs.writeFileSync('docs/colors.md', md)

const swatchRows = (rows) =>
  rows
    .map(
      ([name, hex, use]) =>
        `<tr><td class="sw"><span style="background:${hex}"></span></td><td><code>${name}</code></td><td><code>${hex}</code></td><td>${use}</td></tr>`
    )
    .join('')

const html = `<!doctype html><html><head><meta charset="utf-8"><title>Colour reference</title><style>
@page { size: A4; margin: 16mm; }
* { box-sizing: border-box; }
body { font: 11px/1.55 -apple-system, "Helvetica Neue", Arial, sans-serif; color: #18181b; margin: 0; }
h1 { font-size: 26px; letter-spacing: -.02em; margin: 0 0 4px; }
h2 { font-size: 15px; letter-spacing: -.01em; margin: 26px 0 6px; padding-bottom: 5px; border-bottom: 2px solid #0f766e; page-break-after: avoid; }
p.lede { color: #52525b; margin: 0 0 18px; max-width: 62ch; }
p.note { color: #52525b; margin: 0 0 9px; max-width: 74ch; }
table { width: 100%; border-collapse: collapse; margin-bottom: 6px; page-break-inside: auto; }
th { text-align: left; font-size: 9px; text-transform: uppercase; letter-spacing: .08em; color: #71717a; border-bottom: 1px solid #d4d4d8; padding: 5px 7px; }
td { padding: 5px 7px; border-bottom: 1px solid #ededf0; vertical-align: middle; }
tr { page-break-inside: avoid; }
code { font: 10px ui-monospace, Menlo, monospace; background: #f4f4f5; padding: 1px 4px; border-radius: 3px; }
td.sw { width: 30px; }
td.sw span { display: block; width: 20px; height: 20px; border-radius: 4px; border: 1px solid rgba(0,0,0,.16); }
.pair { display: flex; gap: 5px; }
.pair span { width: 20px; height: 20px; border-radius: 4px; border: 1px solid rgba(0,0,0,.16); }
.grade { font-weight: 700; }
.aaa { color: #15803d } .aa { color: #15803d } .large { color: #b45309 } .fail { color: #b91c1c }
footer { margin-top: 22px; padding-top: 8px; border-top: 1px solid #d4d4d8; color: #71717a; font-size: 9px; }
</style></head><body>
<h1>Colour reference</h1>
<p class="lede">Every colour used in the Taaran Jain portfolio, generated from source. Design tokens flip with the theme and should be preferred; palette colours are Tailwind utilities used directly in components.</p>

<h2>Design tokens</h2>
<p class="note">Defined on <code>:root</code> in <code>app/globals.css</code>, overridden under <code>[data-theme='dark']</code>.</p>
<table><thead><tr><th></th><th>Token</th><th>Light</th><th>Dark</th><th>Role</th></tr></thead><tbody>
${Object.keys(TOKENS.light)
  .map(
    (k) =>
      `<tr><td class="sw"><div class="pair"><span style="background:${TOKENS.light[k]}"></span><span style="background:${TOKENS.dark[k]}"></span></div></td><td><code>${k}</code></td><td><code>${TOKENS.light[k]}</code></td><td><code>${TOKENS.dark[k]}</code></td><td>${ROLES[k]}</td></tr>`
  )
  .join('')}
</tbody></table>

<h2>Brand palette</h2>
<p class="note">Indigo is the action colour. Violet only ever appears alongside it in gradients.</p>
<table><thead><tr><th></th><th>Colour</th><th>Hex</th><th>Role</th></tr></thead><tbody>${swatchRows(CORE)}</tbody></table>

<h2>Neutrals</h2>
<p class="note">Slate carries all text and structure. Light and dark use different steps to hold contrast.</p>
<table><thead><tr><th></th><th>Colour</th><th>Hex</th><th>Role</th></tr></thead><tbody>${swatchRows(NEUTRAL)}</tbody></table>

<h2>Semantic and category colours</h2>
<p class="note">Used to classify rather than decorate — certification issuers, status, and alerts.</p>
<table><thead><tr><th></th><th>Colour</th><th>Hex</th><th>Role</th></tr></thead><tbody>${swatchRows(SEMANTIC)}</tbody></table>

<h2>Fixed colours</h2>
<p class="note">These do not follow the theme and must not be tokenised.</p>
<table><thead><tr><th>Colour</th><th>Value</th><th>Why</th></tr></thead><tbody>
${FIXED.map(([n, v, w]) => `<tr><td>${n}</td><td><code>${v}</code></td><td>${w}</td></tr>`).join('')}
</tbody></table>

<h2>Measured contrast</h2>
<p class="note">WCAG 2.1 ratios computed from the values above. Normal text needs 4.5:1; large or bold text needs 3:1.</p>
<table><thead><tr><th></th><th>Pair</th><th>Theme</th><th>Ratio</th><th>Grade</th></tr></thead><tbody>
${CONTRAST.map(([label, fg, bg, theme]) => {
  const r = ratio(fg, bg)
  const g = grade(r)
  const cls = g === 'AAA' ? 'aaa' : g === 'AA' ? 'aa' : g.startsWith('AA') ? 'large' : 'fail'
  return `<tr><td class="sw"><div class="pair"><span style="background:${bg}"></span><span style="background:${fg}"></span></div></td><td>${label}</td><td>${theme}</td><td><code>${fmt(r)}:1</code></td><td class="grade ${cls}">${g}</td></tr>`
}).join('')}
</tbody></table>
<footer>Generated from source by <code>npm run docs:colors</code>. Do not edit by hand.</footer>
</body></html>`

fs.writeFileSync('docs/colors.html', html)
console.log('docs/colors.md written')
