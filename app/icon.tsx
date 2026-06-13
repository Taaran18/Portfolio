import { ImageResponse } from 'next/og'

// Favicon — the <TJ /> brand mark, gradient background + mono "TJ".
export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
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
          fontSize: 34,
          fontWeight: 800,
          fontFamily: 'monospace',
          letterSpacing: -1,
          borderRadius: 14,
        }}
      >
        TJ
      </div>
    ),
    { ...size }
  )
}
