import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { pageMetadata } from '@/lib/seo'
import { getAllPosts, postImage, postSlug, type Post } from '@/lib/airticles'
import BlogList from './BlogList'
import RouteHero from '../components/RouteHero'
import { BLOG_PER_PAGE, blogPageHref, parsePagina } from './paginacao'
import BreadcrumbJsonLd from '@/app/components/BreadcrumbJsonLd'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const TITULO = 'Blog ARCK1PRO: Inteligência Imobiliária Aplicada'
const DESCRICAO =
  'Conteúdo técnico sobre incorporação, estruturação de capital e mercado imobiliário do litoral catarinense, para investidor qualificado.'

// Cada página da listagem é canônica de si mesma: /blog?pagina=2 aponta para
// ela própria, não para /blog, senão o Google descarta os links que só ela tem.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<Metadata> {
  const pagina = parsePagina((await searchParams).pagina) ?? 1
  const sufixo = pagina > 1 ? ` (página ${pagina})` : ''
  return pageMetadata({
    title: `${TITULO}${sufixo}`,
    // Página N com description própria: sem isso as 5 páginas da listagem
    // compartilhavam o mesmo texto.
    description: pagina > 1 ? `${DESCRICAO} Página ${pagina}.` : DESCRICAO,
    ogDescription:
      'Conteúdo técnico sobre incorporação, estruturação de capital e mercado imobiliário do litoral catarinense.',
    path: blogPageHref(pagina),
  })
}

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const pagina = parsePagina((await searchParams).pagina)
  if (pagina === null) notFound()

  // Sem try/catch de propósito: com a API fora, a listagem responde 5xx
  // (temporário) em vez de um 200 vazio que o Google leria como blog sem posts.
  const posts: Post[] = await getAllPosts()

  // Página além da última só existiria como duplicata vazia.
  const totalPages = Math.max(1, Math.ceil(posts.length / BLOG_PER_PAGE))
  if (pagina > totalPages) notFound()

  return (
    <main
      style={{
        marginTop: 'calc(var(--header-h) * -1)',
        position: 'relative',
        background: 'var(--brand-navy)',
      }}
    >
      <BreadcrumbJsonLd items={[{ name: 'Blog', path: '/blog' }]} />
      {/* Hero */}
      <RouteHero
        escala="grande"
        titulo={
          <>
            Investidor que se informa{' '}
            <span className="text-gold-hero font-serif-italic font-normal">investe melhor</span>
          </>
        }
      />

      <section
        className="reveal section overflow-clip relative z-10"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 100% 100%, rgba(0,16,49,0.13) 0%, transparent 100%), var(--surface)',
          paddingTop: 'var(--s-20)',
        }}
      >
        <div aria-hidden className="claro-dots" />
        <div className="container relative">
          <BlogList
            pagina={pagina}
            posts={posts.map((post) => ({
              id: post.id,
              slug: postSlug(post),
              title: post.title,
              mainKeyword: post.mainKeyword ?? null,
              imageUrl: postImage(post),
            }))}
          />
        </div>
      </section>
    </main>
  )
}
