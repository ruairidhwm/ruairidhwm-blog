/** Canonical site URL for metadata, RSS, and sitemap. */
export function getBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  if (process.env.VERCEL_URL) {
    const host = process.env.VERCEL_URL.replace(/^https?:\/\//, '')
    return `https://${host}`
  }
  return 'http://localhost:3000'
}

/** Edit these for your site (optional env overrides for name/description). */
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'My Portfolio',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? 'This is my portfolio.',
  authorName: process.env.NEXT_PUBLIC_AUTHOR_NAME ?? 'My Portfolio',
} as const
