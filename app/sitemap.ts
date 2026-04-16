import { getBlogPosts } from 'app/blog/utils'
import { getBaseUrl } from 'app/site'

export default async function sitemap() {
  const baseUrl = getBaseUrl()
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
  }))

  let routes = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))

  return [...routes, ...blogs]
}
