import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import {
  formatDate,
  getAdjacentPosts,
  getBlogPosts,
  getReadingTimeMarkdown,
  parseTagsLine,
} from 'app/blog/utils'
import { getBaseUrl, siteConfig } from 'app/site'

function absoluteImageUrl(
  image: string | undefined,
  title: string,
  baseUrl: string
): string {
  if (!image) {
    return `${baseUrl}/og?title=${encodeURIComponent(title)}`
  }
  if (image.startsWith('http')) {
    return image
  }
  return `${baseUrl}${image}`
}

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const baseUrl = getBaseUrl()
  let post = getBlogPosts().find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  const ogImage = absoluteImageUrl(image, title, baseUrl)

  return {
    title,
    description,
    authors: [{ name: siteConfig.authorName }],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const baseUrl = getBaseUrl()
  let post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  const { prev, next } = getAdjacentPosts(slug)
  const readMinutes = getReadingTimeMarkdown(post.content)
  const tags = parseTagsLine(post.metadata.tags)
  const schemaImage = absoluteImageUrl(
    post.metadata.image,
    post.metadata.title,
    baseUrl
  )

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: schemaImage,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: siteConfig.authorName,
            },
          }),
        }}
      />
      <p className="mb-8">
        <Link
          href="/blog"
          className="link-styled link-tap -ms-2 inline-flex min-h-11 items-center gap-1 rounded-md px-2 text-sm motion-safe:transition-colors"
        >
          <span aria-hidden className="opacity-70">
            ←
          </span>
          Blog
        </Link>
      </p>
      <h1 className="article-title title">{post.metadata.title}</h1>
      <div className="flex flex-wrap gap-x-3 gap-y-1 items-baseline mt-3 mb-7 text-sm text-[var(--color-muted)]">
        <time dateTime={post.metadata.publishedAt}>
          {formatDate(post.metadata.publishedAt)}
        </time>
        <span className="opacity-40" aria-hidden>
          ·
        </span>
        <span className="tabular-nums">{readMinutes} min read</span>
      </div>
      {tags.length > 0 ? (
        <ul className="flex flex-wrap gap-2 mb-9">
          {tags.map((tag) => (
            <li key={tag} className="tag-pill">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      <article className="prose" lang="en">
        <CustomMDX source={post.content} />
      </article>
      <nav
        className="mt-14 flex flex-col gap-6 border-t border-solid border-subtle pt-8 text-sm sm:flex-row sm:items-start sm:justify-between"
        aria-label="Adjacent posts"
      >
        <div className="min-w-0 flex-1">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group -m-1 block min-h-12 rounded-md p-2 motion-safe:transition-[background-color,color] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--color-accent-soft)] focus-visible:bg-[var(--color-accent-soft)]"
            >
              <span className="block text-[0.65rem] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-1">
                Older
              </span>
              <span className="font-heading text-fg line-clamp-2 text-[1.02rem] font-semibold leading-snug motion-safe:transition-colors group-hover:text-[var(--color-accent)]">
                {prev.metadata.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>
        <div className="min-w-0 flex-1 sm:text-right">
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group -m-1 block min-h-12 rounded-md p-2 motion-safe:transition-[background-color,color] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--color-accent-soft)] focus-visible:bg-[var(--color-accent-soft)] sm:ml-auto"
            >
              <span className="block text-[0.65rem] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-1 sm:text-right">
                Newer
              </span>
              <span className="font-heading text-fg line-clamp-2 text-[1.02rem] font-semibold leading-snug motion-safe:transition-colors group-hover:text-[var(--color-accent)] sm:text-right">
                {next.metadata.title}
              </span>
            </Link>
          ) : null}
        </div>
      </nav>
    </section>
  )
}
