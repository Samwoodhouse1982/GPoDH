import React from 'react'

// Dependency-free renderer for the safe Markdown subset used by CMS prose
// fields: paragraphs, line breaks, **bold**, *italic* / _italic_,
// [links](https://… or /path), and "- " bullet lists. All raw HTML is escaped
// before our own tags are applied, so editor input can't inject markup.

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function inline(s: string): string {
  let t = escapeHtml(s)
  // [text](url) — external links open in a new tab
  t = t.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g,
    (_m, text: string, url: string) =>
      `<a href="${url}"${url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`
  )
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  t = t.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
  t = t.replace(/_([^_\n]+)_/g, '<em>$1</em>')
  return t
}

function toHtml(md: string): string {
  return md
    .trim()
    .split(/\n{2,}/)
    .map((block) => {
      const lines = block.split('\n')
      if (lines.length > 0 && lines.every((l) => /^\s*-\s+/.test(l))) {
        const items = lines.map((l) => `<li>${inline(l.replace(/^\s*-\s+/, ''))}</li>`).join('')
        return `<ul>${items}</ul>`
      }
      return `<p>${lines.map(inline).join('<br/>')}</p>`
    })
    .join('')
}

export default function RichText({
  children,
  style,
  className,
}: {
  children?: string | null
  style?: React.CSSProperties
  className?: string
}) {
  if (!children) return null
  return (
    <div
      className={`richtext${className ? ` ${className}` : ''}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: toHtml(children) }}
    />
  )
}
