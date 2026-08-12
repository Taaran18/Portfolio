const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="#334155" />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)

export function shimmerBlurDataURL(width = 800, height = 500) {
  return `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`
}
