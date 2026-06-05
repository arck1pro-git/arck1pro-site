import Link from 'next/link'
import { getPosts, type Post } from '@/lib/airticles'

const API_BASE = 'https://api.airticles.ai'

function extractImage(post: Post): string | null {
  const url = post.coverImageUrl ?? null
  if (url) return url.startsWith('http') ? url : `${API_BASE}${url}`
  const match = post.html?.match(/<img[^>]+src=["']([^"']+)["']/i)
  if (!match) return null
  const src = match[1]
  return src.startsWith('http') ? src : `${API_BASE}${src}`
}

export default async function BlogSection() {
  let posts: Post[] = []
  let error = false

  try {
    const data = await getPosts({ limit: '3' })
    posts = data.items
  } catch (err) {
    console.error('[BlogSection] Airticles API error:', err)
    error = true
  }

  return (
    <section
      id="blog"
      className="section rounded-b-4xl overflow-clip relative z-10"
      style={{
        background:
          'radial-gradient(ellipse 55% 55% at 100% 100%, rgba(0,16,49,0.13) 0%, transparent 100%), var(--surface)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 'var(--s-10)',
            gap: 'var(--s-6)',
            flexWrap: 'wrap',
          }}
        >
          <h2
            className="font-display text-center lg:text-6xl text-2xl text-navy lg:whitespace-nowrap"
            style={{ fontWeight: 700, lineHeight: 1.15, margin: 0 }}
          >
            Fique por dentro da <span className="text-gold-hero">Costa Esmeralda</span>
          </h2>
          <a href="/blog" className="text-center btn btn--link btn--sm">
            Ver todos os artigos <span className="arrow">→</span>
          </a>
        </div>

        {error ? (
          <p className="font-sans" style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-14)' }}>
            Não foi possível carregar os artigos no momento.
          </p>
        ) : posts.length === 0 ? (
          <p className="font-sans" style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-14)' }}>
            Nenhum artigo publicado ainda.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--s-4)' }}>
            {posts.map((post) => {
              const imageUrl = extractImage(post)
              return (
                <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                  <article
                  className='rounded-2xl'
                    style={{
                      position: 'relative',
                      height: '360px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: imageUrl
                        ? `url(${imageUrl}) center/cover no-repeat`
                        : 'var(--brand-navy)',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to top, rgba(0,16,49,0.92) 0%, rgba(0,16,49,0.45) 55%, transparent 100%)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: 'var(--s-6)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--s-3)',
                      }}
                    >
                      <h3
                        className="font-display"
                        style={{
                          color: '#ffffff',
                          fontSize: 'var(--fs-20)',
                          fontWeight: 400,
                          lineHeight: 1.25,
                          margin: 0,
                        }}
                      >
                        {post.title}
                      </h3>
                      <span
                        className="font-sans"
                        style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--fs-12)' }}
                      >
                        Ler artigo →
                      </span>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
