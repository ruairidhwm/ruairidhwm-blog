import fs from 'fs'
import path from 'path'

export interface PostMetadata {
  title: string
  publishedAt: string
  summary: string
  image?: string
  /** Comma-separated labels, e.g. `vim, tooling` */
  tags?: string
}

export interface BlogPost {
  metadata: PostMetadata
  slug: string
  content: string
}

const POSTS_DIR = path.join(process.cwd(), 'app', 'blog', 'posts')

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  if (!match) {
    throw new Error('Missing frontmatter (--- ... ---)')
  }
  let frontMatterBlock = match[1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<PostMetadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1')
    metadata[key.trim() as keyof PostMetadata] = value
  })

  return { metadata: metadata as PostMetadata, content }
}

function validatePostMetadata(metadata: PostMetadata, fileLabel: string) {
  for (const key of ['title', 'publishedAt', 'summary'] as const) {
    if (!metadata[key]?.trim()) {
      throw new Error(`Post ${fileLabel}: missing or empty "${key}" in frontmatter`)
    }
  }
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string): BlogPost[] {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    validatePostMetadata(metadata, file)
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getBlogPosts(): BlogPost[] {
  return getMDXData(POSTS_DIR)
}

export function getBlogPostsSorted(): BlogPost[] {
  return getBlogPosts().sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPost | null
  next: BlogPost | null
} {
  const sorted = getBlogPostsSorted()
  const index = sorted.findIndex((p) => p.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: sorted[index + 1] ?? null,
    next: sorted[index - 1] ?? null,
  }
}

const WORDS_PER_MINUTE = 200

export function getReadingTimeMarkdown(source: string): number {
  const text = source.replace(/```[\s\S]*?```/g, ' ').replace(/\s+/g, ' ').trim()
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

export function parseTagsLine(tags: string | undefined): string[] {
  if (!tags?.trim()) return []
  return tags.split(',').map((t) => t.trim()).filter(Boolean)
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
