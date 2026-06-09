'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'

const PER_PAGE = 12

export type BlogCard = {
  id: number
  title: string
  mainKeyword: string | null
  imageUrl: string | null
}

export default function BlogList({ posts }: { posts: BlogCard[] }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return posts
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.mainKeyword?.toLowerCase().includes(q) ?? false),
    )
  }, [posts, query])

  // Volta para a primeira página sempre que a busca muda
  useEffect(() => {
    setPage(1)
  }, [query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  return (
    <>
      {/* Apresentação */}
      <p
        className="font-sans"
        style={{
          maxWidth: 520,
          margin: '0 auto var(--s-5)',
          textAlign: 'center',
          fontSize: 'var(--fs-15)',
          lineHeight: 1.7,
          color: 'var(--text-muted)',
        }}
      >
        Este é o blog da ARCK<span className="text-gold">1</span>PRO — aqui você acompanha as
        análises de mercado e o universo de investimento do ARI.
      </p>

      {/* Barra de pesquisa */}
      <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto 6.25rem' }}>
        <Search
          aria-hidden
          size={18}
          style={{
            position: 'absolute',
            left: 'var(--s-5)',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        <input
          type="search"
          placeholder="Pesquisar artigos…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="font-sans"
          style={{
            width: '100%',
            padding: 'var(--s-3) var(--s-5) var(--s-3) calc(var(--s-5) + 22px)',
            borderRadius: 'var(--r-pill)',
            border: 'var(--line-1) solid rgba(0,16,49,0.15)',
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(6px)',
            color: 'var(--text)',
            fontSize: 'var(--fs-15)',
            outline: 'none',
          }}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="font-sans" style={{ color: 'var(--text-muted)' }}>
          {posts.length === 0
            ? 'Nenhum artigo publicado ainda.'
            : `Nenhum artigo encontrado para “${query}”.`}
        </p>
      ) : (
        <>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
              <article
                className="blog-card rounded-lg"
                style={{
                  position: 'relative',
                  aspectRatio: '9 / 10',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: post.imageUrl
                    ? `url(${post.imageUrl}) center/cover no-repeat`
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
                    padding: 'var(--s-5)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--s-2)',
                  }}
                >
                  <h2
                    className="font-display"
                    style={{
                      color: '#ffffff',
                      fontSize: 'var(--fs-15)',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      margin: 0,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {post.title}
                  </h2>
                  <span
                    className="font-sans"
                    style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11 }}
                  >
                    Ler artigo →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'var(--s-2)',
              marginTop: 'var(--s-12)',
            }}
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="font-sans"
              style={{
                ...pageBtnStyle,
                opacity: currentPage === 1 ? 0.35 : 1,
                cursor: currentPage === 1 ? 'default' : 'pointer',
              }}
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
              const active = n === currentPage
              return (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className="font-sans"
                  style={{
                    ...pageBtnStyle,
                    background: active ? 'var(--brand-navy)' : 'transparent',
                    color: active ? 'var(--brand-cream)' : 'var(--brand-navy)',
                    cursor: active ? 'default' : 'pointer',
                  }}
                >
                  {n}
                </button>
              )
            })}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="font-sans"
              style={{
                ...pageBtnStyle,
                opacity: currentPage === totalPages ? 0.35 : 1,
                cursor: currentPage === totalPages ? 'default' : 'pointer',
              }}
            >
              →
            </button>
          </div>
        )}
        </>
      )}
    </>
  )
}

const pageBtnStyle: React.CSSProperties = {
  minWidth: 40,
  height: 40,
  padding: '0 var(--s-3)',
  borderRadius: 'var(--r-pill)',
  border: 'var(--line-1) solid rgba(0,16,49,0.15)',
  background: 'transparent',
  color: 'var(--brand-navy)',
  fontSize: 'var(--fs-14)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}
