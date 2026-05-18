import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { highlight } from 'sugar-high'
import React, { type ReactNode } from 'react'

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index} scope="col">
      {header}
    </th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props: React.ComponentPropsWithoutRef<'a'>) {
  const { href = '', children, ...rest } = props

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Pullquote({ children }: { children: ReactNode }) {
  return (
    <aside className="font-heading my-12 mx-auto max-w-xl border-y border-[var(--color-border)] py-6 text-center text-xl italic leading-snug text-[var(--color-accent)] sm:text-2xl">
      {children}
    </aside>
  )
}

function Term({ children, hint }: { children: ReactNode; hint: string }) {
  return (
    <span className="term-wrapper">
      <span tabIndex={0} title={hint} className="term-trigger">
        {children}
      </span>
      <span aria-hidden="true" className="term-tooltip">
        {hint}
      </span>
    </span>
  )
}

function Details({
  summary,
  children,
}: {
  summary: string
  children: ReactNode
}) {
  return (
    <details className="details-block">
      <summary>{summary}</summary>
      <div className="details-content">{children}</div>
    </details>
  )
}

function codePlainText(children: ReactNode): string {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(codePlainText).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    const el = children as { props?: { children?: ReactNode } }
    return codePlainText(el.props?.children)
  }
  return ''
}

function Code({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'code'>) {
  const isBlock =
    typeof className === 'string' && className.startsWith('language-')
  if (!isBlock) {
    return <code {...props}>{children}</code>
  }
  const raw = codePlainText(children)
  if (!raw) {
    return <code {...props}>{children}</code>
  }
  let codeHTML = highlight(raw)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  Pullquote,
  Term,
  Details,
}

export function CustomMDX(props: MDXRemoteProps) {
  const { options: userOptions, components: userComponents, ...rest } = props
  return (
    <MDXRemote
      {...rest}
      components={{ ...components, ...(userComponents ?? {}) }}
      options={{
        ...userOptions,
        mdxOptions: {
          ...userOptions?.mdxOptions,
          remarkPlugins: [
            remarkGfm,
            ...(userOptions?.mdxOptions?.remarkPlugins ?? []),
          ],
        },
      }}
    />
  )
}
