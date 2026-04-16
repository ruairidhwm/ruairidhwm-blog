import { getBaseUrl, siteConfig } from 'app/site'
import { getBlogPosts } from 'app/blog/utils'

function escapeXml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  const baseUrl = getBaseUrl()
  let allBlogs = getBlogPosts()

  const itemsXml = allBlogs
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    .map((post) => {
      const link = `${baseUrl}/blog/${post.slug}`
      const title = escapeXml(post.metadata.title)
      const description = escapeXml(post.metadata.summary || '')
      const pubDate = new Date(post.metadata.publishedAt).toUTCString()
      return `<item>
          <title>${title}</title>
          <link>${link}</link>
          <guid isPermaLink="true">${link}</guid>
          <description>${description}</description>
          <pubDate>${pubDate}</pubDate>
        </item>`
    })
    .join('\n')

  const channelTitle = escapeXml(siteConfig.name)
  const channelDesc = escapeXml(siteConfig.description)

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>${channelTitle}</title>
        <link>${baseUrl}</link>
        <description>${channelDesc}</description>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
