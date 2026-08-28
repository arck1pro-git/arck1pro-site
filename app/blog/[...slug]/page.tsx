import Link from 'next/link'
import RouteHero from '@/app/components/RouteHero'
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
        marginTop: 'calc(var(--header-h) * -1)',
        position: 'relative',
        background: 'var(--brand-navy)',
      }}
    >
      {/* Categoria, título e data saíram do topo do corpo e viram a hero: é a
          mesma cópia, na mesma peça que /ari, /sobre, /portobelo e /blog usam. */}
      <RouteHero
        eyebrow={post.category ?? undefined}
        titulo={post.title}
        texto={formatDate(post.scheduledAt ?? post.updatedAt)}
      />

      <section
        className="section overflow-clip relative z-10"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 100% 100%, rgba(0,16,49,0.13) 0%, transparent 100%), var(--surface)',
        }}
      >
        <div aria-hidden className="claro-dots" />
        <article
          className="reveal relative"
          style={{
            maxWidth: '780px',
            margin: '0 auto',
          }}
        >
          <Link
            href="/blog"
            className="btn btn--ghost btn--sm"
            style={{ marginBottom: 'var(--s-10)', display: 'inline-flex' }}
          >
            <span style={{ marginRight: 'var(--s-2)' }}>←</span> Voltar para o blog
          </Link>


          {coverUrl && (
            <div
              className="rounded-lg"
              style={{
                width: '100%',
                aspectRatio: '16/9',
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
      </section>
    </main>
  )
}
