import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/site'

export const alt = 'Taaran Jain — AI Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background:
            'radial-gradient(1200px 600px at 80% -10%, rgba(168,85,247,0.35), transparent), radial-gradient(900px 600px at 0% 110%, rgba(6,182,212,0.35), transparent), #050510',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: '#22d3ee',
            fontSize: 28,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: '#34d399',
            }}
          />
          Open to opportunities
        </div>

        <div
          style={{
            fontSize: 92,
            fontWeight: 800,
            marginTop: 24,
            lineHeight: 1.05,
          }}
        >
          Taaran Jain
        </div>

        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            marginTop: 8,
            background: 'linear-gradient(90deg, #22d3ee, #a855f7)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          AI Engineer · ML · LLMs
        </div>

        <div
          style={{
            fontSize: 30,
            color: '#94a3b8',
            marginTop: 32,
            maxWidth: 900,
          }}
        >
          RAG pipelines, fine-tuned transformers, computer vision, and
          end-to-end ML platforms.
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 72,
            left: 80,
            fontSize: 26,
            color: '#64748b',
          }}
        >
          {SITE.url.replace('https://', '')}
        </div>
      </div>
    ),
    { ...size }
  )
}
