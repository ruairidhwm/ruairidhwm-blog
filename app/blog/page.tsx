import Link from 'next/link'
import { BlogPosts } from 'app/components/posts'
import { siteConfig } from 'app/site'

export const metadata = {
  title: 'Blog',
  description: `Articles and notes — ${siteConfig.name}.`,
}

export default function Page() {
  return (
    <section>
      <h1 className="page-title text-2xl mb-2">Blog</h1>
      <p className="text-sm text-[var(--color-muted)] mb-10 max-w-prose leading-relaxed">
        Notes and longer posts. Subscribe via{' '}
        <Link href="/rss" className="link-accent">
          RSS
        </Link>
        .
      </p>
      <BlogPosts />
    </section>
  )
}
