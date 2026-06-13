import { ImageResponse } from 'next/og'

// Apple touch icon — same <TJ /> brand mark, larger with padding.
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
          color: '#ffffff',
          fontSize: 96,
          fontWeight: 800,
          fontFamily: 'monospace',
          letterSpacing: -3,
        }}
      >
        TJ
      </div>
    ),
    { ...size }
  )
}
