import Link from 'next/link'
import {
  formatDate,
  getBlogPostsSorted,
  getReadingTimeMarkdown,
} from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPostsSorted()

  return (
    <div>
      {allBlogs.map((post) => {
        const minutes = getReadingTimeMarkdown(post.content)
        return (
          <Link
            key={post.slug}
            className="group mb-7 flex max-w-full flex-col gap-1 rounded-md px-2 py-2.5 last:mb-0 motion-safe:transition-[background-color,color] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--color-accent-soft)] focus-visible:bg-[var(--color-accent-soft)] min-h-12"
            href={`/blog/${post.slug}`}
          >
            <div className="flex w-full flex-col gap-1 md:flex-row md:items-baseline md:gap-x-3">
              <time
                className="w-[7.5rem] shrink-0 tabular-nums text-sm text-[var(--color-muted)]"
                dateTime={post.metadata.publishedAt}
              >
                {formatDate(post.metadata.publishedAt, false)}
              </time>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-fg text-[1.05rem] font-semibold leading-snug tracking-tight motion-safe:transition-colors group-hover:text-[var(--color-accent)] sm:text-[1.08rem]">
                  {post.metadata.title}
                </p>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {post.metadata.summary}
                </p>
                <p className="mt-1.5 text-sm tabular-nums text-[var(--color-muted)]">
                  {minutes} min read
                </p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
