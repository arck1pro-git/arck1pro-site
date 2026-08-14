import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import { getPostBySlug, getSlugById, postSlug, type PostDetail } from '@/lib/airticles'

const API_BASE = 'https://api.airticles.ai'

function resolveImageUrl(url: string | null): string | null {
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${API_BASE}${url}`
}

function formatDate(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const [first, ...rest] = slug

  // URLs antigas /blog/<id> e /blog/<id>/<slug>: 308 para a URL só com slug.
  if (/^\d+$/.test(first)) {
    let legacySlug: string | null = null
    try {
      legacySlug = await getSlugById(first)
    } catch {
      // cai no 404 abaixo
    }
    if (legacySlug) permanentRedirect(`/blog/${legacySlug}`)
  }

  let post: PostDetail | null = null
  try {
    post = await getPostBySlug(first)
  } catch {
    notFound()
  }
  if (!post) notFound()

  // Segmento extra depois do slug (link torto, tracking) volta para a canônica.
  if (rest.length > 0) permanentRedirect(`/blog/${postSlug(post)}`)

  const coverUrl = resolveImageUrl(post.coverImageUrl)

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(ellipse 55% 55% at 100% 100%, rgba(0,16,49,0.13) 0%, transparent 100%), var(--surface)',
      }}
    >
      <article
        style={{
          maxWidth: '780px',
          margin: '0 auto',
          padding: 'var(--s-20) var(--s-6)',
        }}
      >
        <Link
          href="/blog"
          className="btn btn--ghost btn--sm"
          style={{ marginBottom: 'var(--s-10)', display: 'inline-flex' }}
        >
          <span style={{ marginRight: 'var(--s-2)' }}>←</span> Voltar para o blog
        </Link>

        <header style={{ marginBottom: 'var(--s-10)' }}>
          {post.category && (
            <p
              className="font-display text-gold text-base"
              style={{
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: 'var(--s-3)',
              }}
            >
              {post.category}
            </p>
          )}

          <h1
            className="font-display text-navy"
            style={{
              fontSize: 'var(--fs-56)',
              fontWeight: 300,
              lineHeight: 1.1,
              margin: '0 0 var(--s-4)',
            }}
          >
            {post.title}
          </h1>

          <p
            className="font-display text-base"
            style={{ color: 'var(--text-faint)', letterSpacing: '0.1em' }}
          >
            {formatDate(post.scheduledAt ?? post.updatedAt)}
          </p>
        </header>

        {coverUrl && (
          <div
            style={{
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: 'var(--s-10)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverUrl}
              alt={post.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        <div
          className="font-sans article-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
          style={{
            color: 'var(--text)',
            lineHeight: 1.8,
            fontSize: 'var(--fs-16)',
          }}
        />
      </article>
    </main>
  )
}
