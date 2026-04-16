import './global.css'
import type { Metadata } from 'next'
import { Libre_Bodoni } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { WhimsyKonami } from './components/whimsy-konami'
import { ThemeInitScript } from './components/theme-init-script'
import { ThemeProvider } from './components/theme-provider'
import { getBaseUrl, siteConfig } from './site'

const editorialSerif = Libre_Bodoni({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-editorial',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getBaseUrl()
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.description,
      url: baseUrl,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      types: {
        'application/rss+xml': `${baseUrl}/rss`,
      },
    },
  }
}

const cx = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cx(
        editorialSerif.variable,
        GeistSans.variable,
        GeistMono.variable,
        GeistSans.className
      )}
    >
      <head>
        <ThemeInitScript />
      </head>
      <body
        className={cx(
          'relative min-h-screen antialiased max-w-xl mx-4 mt-8 lg:mx-auto',
          'bg-[var(--color-bg)] text-[var(--color-fg)]'
        )}
      >
        <ThemeProvider>
          <div className="ambient-wrap" aria-hidden>
            <div className="ambient-blob" />
            <div className="ambient-blob ambient-blob--2" />
            <div className="noise-overlay" />
          </div>
          <WhimsyKonami />
          <main className="relative z-0 mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
