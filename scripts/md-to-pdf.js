const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const { marked } = require(path.join(process.cwd(), 'node_modules', 'marked'))

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
].find((p) => fs.existsSync(p))

if (!CHROME) {
  console.error('No Chromium-based browser found; cannot render a PDF.')
  process.exit(1)
}

const CSS = `
@page { size: A4; margin: 16mm; }
* { box-sizing: border-box; }
body { font: 11px/1.6 -apple-system, "Helvetica Neue", Arial, sans-serif; color: #18181b; margin: 0; }
h1 { font-size: 26px; letter-spacing: -.02em; margin: 0 0 14px; }
h2 { font-size: 15px; letter-spacing: -.01em; margin: 24px 0 8px; padding-bottom: 5px; border-bottom: 2px solid #4f46e5; page-break-after: avoid; }
h3 { font-size: 12px; margin: 16px 0 6px; page-break-after: avoid; }
p, li { max-width: 78ch; }
p { margin: 0 0 9px; }
ul, ol { margin: 0 0 10px; padding-left: 18px; }
li { margin-bottom: 3px; }
table { width: 100%; border-collapse: collapse; margin: 4px 0 14px; }
th { text-align: left; font-size: 9px; text-transform: uppercase; letter-spacing: .08em; color: #71717a; border-bottom: 1px solid #d4d4d8; padding: 6px 8px; }
td { padding: 6px 8px; border-bottom: 1px solid #ededf0; vertical-align: top; }
tr { page-break-inside: avoid; }
code { font: 10px ui-monospace, Menlo, monospace; background: #f4f4f5; padding: 1px 4px; border-radius: 3px; }
a { color: #4f46e5; text-decoration: none; word-break: break-word; }
hr { border: 0; border-top: 1px solid #d4d4d8; margin: 20px 0; }
blockquote { margin: 0 0 10px; padding-left: 12px; border-left: 3px solid #d4d4d8; color: #52525b; }
`

const files = process.argv.slice(2)

if (!files.length) {
  console.error('Usage: node scripts/md-to-pdf.js <file.md> [...]')
  process.exit(1)
}

for (const md of files) {
  const src = fs.readFileSync(md, 'utf8')
  const heading = src.match(/^#\s+(.+)$/m)
  const title = heading ? heading[1] : path.basename(md, '.md')
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><style>${CSS}</style></head><body>${marked.parse(src)}</body></html>`

  const tmp = md.replace(/\.md$/, '.tmp.html')
  const pdf = md.replace(/\.md$/, '.pdf')
  fs.writeFileSync(tmp, html)

  try {
    execFileSync(
      CHROME,
      [
        '--headless',
        '--disable-gpu',
        '--no-pdf-header-footer',
        `--print-to-pdf=${path.resolve(pdf)}`,
        `file://${path.resolve(tmp)}`,
      ],
      { stdio: 'ignore' }
    )
    console.log(pdf)
  } finally {
    fs.unlinkSync(tmp)
  }
}
