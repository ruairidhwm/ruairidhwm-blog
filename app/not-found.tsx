import Link from 'next/link'
import { notFoundWhisper } from 'app/lib/whimsy'

export default function NotFound() {
  const whisper = notFoundWhisper()

  return (
    <section>
      <h1 className="page-title text-2xl mb-4">404 — not found</h1>
      <p className="lede mb-6" title={whisper}>
        The page you are looking for does not exist (or wandered off).
      </p>
      <Link
        href="/"
        className="link-accent link-tap inline-flex min-h-11 items-center gap-1 text-sm"
      >
        <span aria-hidden className="opacity-70">
          ←
        </span>{' '}
        Home
      </Link>
    </section>
  )
}
