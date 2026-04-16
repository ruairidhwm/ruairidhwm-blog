import { ImageResponse } from 'next/og'
import { siteConfig } from 'app/site'

const bg = '#f5f2ed'
const fg = '#1a1918'
const muted = '#534e49'
const accent = '#b94920'

export function GET(request: Request) {
  let url = new URL(request.url)
  let title = url.searchParams.get('title') || siteConfig.name

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: bg,
          alignItems: 'stretch',
        }}
      >
        <div style={{ width: 10, flexShrink: 0, backgroundColor: accent }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            paddingLeft: 56,
            paddingRight: 48,
          }}
        >
          <p
            style={{
              fontSize: 22,
              color: muted,
              marginBottom: 16,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {siteConfig.name}
          </p>
          <h1
            style={{
              fontSize: title.length > 48 ? 48 : 56,
              fontWeight: 600,
              color: fg,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h1>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
