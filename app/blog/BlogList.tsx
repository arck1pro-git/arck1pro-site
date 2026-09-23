'use client'

import { useMemo, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import PostCard, { type PostCardData } from '../components/PostCard'
import { BLOG_PER_PAGE, blogPageHref } from './paginacao'

export type BlogCard = PostCardData & {
  mainKeyword: string | null
}

// Sem busca, a página vem da URL (/blog?pagina=N) e os controles são links
// reais: é assim que o Google chega aos posts além dos 12 primeiros. Antes a
// troca de página era só um onClick, e o HTML servido só linkava 12 posts.
// Com busca ativa o filtro é local, então a paginação volta a ser de estado.
export default function BlogList({
  posts,
  pagina,
}: {
  posts: BlogCard[]
  pagina: number
}) {
  const [query, setQuery] = useState('')
  const [searchPage, setSearchPage] = useState(1)
  const searching = query.trim().length > 0

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return posts
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.mainKeyword?.toLowerCase().includes(q) ?? false),
    )
  }, [posts, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / BLOG_PER_PAGE))
  const currentPage = Math.min(searching ? searchPage : pagina, totalPages)
  const paginated = filtered.slice((currentPage - 1) * BLOG_PER_PAGE, currentPage * BLOG_PER_PAGE)

  const control = (target: number, label: ReactNode, opts: { active?: boolean; disabled?: boolean; aria: string }) => {
    const style: React.CSSProperties = {
      ...pageBtnStyle,
      background: opts.active ? 'var(--brand-navy)' : 'transparent',
      color: opts.active ? 'var(--brand-cream)' : 'var(--brand-navy)',
      opacity: opts.disabled ? 0.35 : 1,
      cursor: opts.active || opts.disabled ? 'default' : 'pointer',
      textDecoration: 'none',
    }
    if (opts.disabled || opts.active || searching) {
      return (
        <button
          key={opts.aria}
          type="button"
          aria-label={opts.aria}
          aria-current={opts.active ? 'page' : undefined}
          disabled={opts.disabled || opts.active}
          onClick={() => setSearchPage(target)}
          className="font-sans"
          style={style}
        >
          {label}
        </button>
      )
    }
    return (
      <Link key={opts.aria} href={blogPageHref(target)} aria-label={opts.aria} className="font-sans" style={style}>
        {label}
      </Link>
    )
  }

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
        Este é o blog da ARCK<span className="text-gold">1</span>PRO.
        Aqui você acompanha as análises de mercado e o universo de investimento do ARI.
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
          aria-label="Pesquisar artigos"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            // Volta para a primeira página sempre que a busca muda
            setSearchPage(1)
          }}
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
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              aria-label="Paginação do blog"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--s-2)',
                marginTop: 'var(--s-12)',
              }}
            >
              {control(Math.max(1, currentPage - 1), '←', {
                disabled: currentPage === 1,
                aria: 'Página anterior',
              })}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) =>
                control(n, n, { active: n === currentPage, aria: `Página ${n}` }),
              )}
              {control(Math.min(totalPages, currentPage + 1), '→', {
                disabled: currentPage === totalPages,
                aria: 'Próxima página',
              })}
            </nav>
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
