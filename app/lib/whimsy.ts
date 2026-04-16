/** Deterministic per UTC day so SSR stays consistent. */

function daySeed(): number {
  const d = new Date()
  return d.getUTCFullYear() * 1000 + d.getUTCMonth() * 50 + d.getUTCDate()
}

function pick<T>(items: readonly T[], seed: number): T {
  return items[Math.abs(seed) % items.length]
}

const navHints: Record<string, readonly string[]> = {
  '/': [
    'there is no place like ~',
    'you made it. welcome.',
    'this way to the beginning',
  ],
  '/blog': [
    'words, in order, on purpose',
    'opinions may contain traces of experience',
    'scroll responsibly',
  ],
  '/rss': [
    'XML enjoyers, unite quietly',
    'still syndicating after all these years',
    'for the aggregators among us',
  ],
}

export function navWhisper(href: string): string | undefined {
  const hints = navHints[href]
  if (!hints) return undefined
  return pick(hints, daySeed() + href.length * 31)
}

const footerWhispers = [
  'all rights reserved, affectionately',
  'thanks for reading the fine print',
  'you found the quiet part',
  'MIT licensed, heart optional',
] as const

export function footerWhisper(): string {
  return pick(footerWhispers, daySeed())
}

const notFoundWhispers = [
  'This URL never learned to sit still.',
  'The page you seek is elsewhere, politely.',
  'Nothing here but good intentions.',
  'A blank chapter — try another shelf.',
] as const

export function notFoundWhisper(): string {
  return pick(notFoundWhispers, daySeed())
}

const writingWhispers = [
  'Essays, notes, and occasional opinions',
  'Longer thoughts, shorter scrolls',
  'Where sentences earn their keep',
  'Prose with the serial numbers filed off',
] as const

export function writingSectionWhisper(): string {
  return pick(writingWhispers, daySeed() + 11)
}

const themeWhispersFromLight = [
  'Dim the margins for a longer read',
  'Inkwell tone — easy on the eyes',
  'Trade daylight for lamplight',
  'Dark mode, editorial edition',
] as const

const themeWhispersFromDark = [
  'Return to the paper-bright room',
  'Daylight on the page again',
  'Light mode, same words',
  'Brighten like a fresh proof',
] as const

/** Tooltip copy; keep `aria-label` on the control plain for assistive tech. */
export function themeToggleWhisper(isDark: boolean): string {
  const list = isDark ? themeWhispersFromDark : themeWhispersFromLight
  return pick(list, daySeed() + 19)
}
