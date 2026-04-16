'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface NavItem {
  path: string
  name: string
  whisper: string | undefined
}

function pathIsCurrent(path: string, pathname: string) {
  if (path === '/') return pathname === '/'
  if (path === '/rss') return pathname === '/rss'
  return pathname === path || pathname.startsWith(`${path}/`)
}

export function NavPrimary({ items }: { items: NavItem[] }) {
  const pathname = usePathname()

  return (
    <nav
      className="relative flex flex-row flex-wrap items-center gap-x-1 gap-y-1 md:relative md:overflow-auto md:scroll-pr-6"
      id="nav"
      aria-label="Primary"
    >
      {items.map(({ path, name, whisper }) => {
        const current = pathIsCurrent(path, pathname)
        return (
          <Link
            key={path}
            href={path}
            title={whisper}
            aria-current={current ? 'page' : undefined}
            className="link-styled link-tap inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm px-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] motion-safe:transition-colors"
          >
            {name}
          </Link>
        )
      })}
    </nav>
  )
}
