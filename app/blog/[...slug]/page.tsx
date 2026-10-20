import type { Metadata } from 'next'
import Link from 'next/link'
import RouteHero from '@/app/components/RouteHero'
import PostCard from '@/app/components/PostCard'
import { notFound, permanentRedirect } from 'next/navigation'
import {
  getAllPosts,
  getPostBySlug,
  getSlugById,
  postImage,
  postSlug,
  publishedAt,
  resolveImageUrl,
  type Post,
  type PostDetail,
} from '@/lib/airticles'
import { articleText, cleanArticleHtml, leadText, truncate } from '@/lib/article-html'
import { relatedPosts } from '@/lib/related-posts'
import { OG_IMAGE, SITE_NAME, SITE_URL, absoluteUrl, jsonLdString } from '@/lib/site'
import AutorBox from '@/app/components/AutorBox'
import { AUTOR_ORGANIZACAO } from '@/lib/empresa'

type Params = Promise<{ slug: string[] }>

function formatDate(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Para os metadados, falha da API só omite os campos; a página em si decide
// entre 404 (post comprovadamente inexistente) e erro 5xx (API indisponível).
async function loadPostForMetadata(first: string): Promise<PostDetail | null> {
  try {
    return await getPostBySlug(first)
  } catch {
    return null
  }
}

function describe(post: PostDetail, html: string): string {
  const fromApi = post.metaDescription?.trim()
  return truncate(fromApi || leadText(html), 158)
}

// Antes esta rota não tinha generateMetadata e herdava tudo do layout: title e
// description da home e canonical "/", o que fazia cada post se declarar cópia
// da página inicial para o Google.
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const [first] = slug
  if (/^\d+$/.test(first)) return {} // URL legada: a página redireciona

  const post = await loadPostForMetadata(first)
  if (!post) return {}

  const path = `/blog/${postSlug(post)}`
  const { html } = cleanArticleHtml(post.html)
  const description = describe(post, html)
  const image = postImage(post)

  return {
    // Título longo vira absoluto para o sufixo da marca não empurrar o fim do
    // título para fora do resultado de busca.
    title: post.title.length > 55 ? { absolute: post.title } : post.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      siteName: SITE_NAME,
      url: path,
      title: post.title,
      description,
      publishedTime: publishedAt(post),
      modifiedTime: post.updatedAt,
      section: post.category ?? undefined,
      images: image ? [{ url: image, alt: post.title }] : [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [image ?? OG_IMAGE.url],
    },
  }
}

function articleJsonLd(post: PostDetail, description: string, wordCount: number) {
  const url = absoluteUrl(`/blog/${postSlug(post)}`)
  const image = postImage(post) ?? absoluteUrl(OG_IMAGE.url)
  const keywords = [post.mainKeyword, ...(post.secondaryKeywords ?? [])].filter(Boolean).join(', ')
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description,
        image,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        datePublished: publishedAt(post),
        dateModified: post.updatedAt ?? publishedAt(post),
        // Autoria da organização, com o @id do grafo do layout (razão social,
        // CNPJ e fundadores).
        author: AUTOR_ORGANIZACAO,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'pt-BR',
        ...(post.category ? { articleSection: post.category } : {}),
        ...(keywords ? { keywords } : {}),
        wordCount,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  }
}

async function loadRelated(postId: number): Promise<Post[]> {
  try {
    return relatedPosts(await getAllPosts(), postId, 3)
  } catch {
    return []
  }
}

export default async function ArticlePage({ params }: { params: Params }) {
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

  // Sem try/catch de propósito: se a API cair, o erro vira 5xx (temporário para
  // o Google) em vez de um 404 que tiraria um post real do índice.
  const post = await getPostBySlug(first)
  if (!post) notFound()

  // Segmento extra depois do slug (link torto, tracking) volta para a canônica.
  if (rest.length > 0) permanentRedirect(`/blog/${postSlug(post)}`)

  const { html, jsonLd: articleOwnJsonLd } = cleanArticleHtml(post.html)
  const bodyText = articleText(html)
  const description = describe(post, html)
  const wordCount = bodyText ? bodyText.split(' ').length : 0
  const coverUrl = resolveImageUrl(post.coverImageUrl)
  const related = await loadRelated(post.id)
  const dataPublicacao = formatDate(publishedAt(post))

  return (
    <main
      style={{
        marginTop: 'calc(var(--header-h) * -1)',
        position: 'relative',
        background: 'var(--brand-navy)',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(articleJsonLd(post, description, wordCount)) }}
      />
      {/* Dados estruturados que o próprio artigo traz (FAQPage, por exemplo). */}
      {articleOwnJsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(block) }}
        />
      ))}

      {/* Categoria, título e data viram a hero: é a mesma peça que /ari, /sobre,
          /portobelo e /blog usam. */}
      <RouteHero
        eyebrow={post.category ?? undefined}
        titulo={post.title}
        texto={dataPublicacao ? `${dataPublicacao} · por ${SITE_NAME}` : `Por ${SITE_NAME}`}
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
          <nav aria-label="Trilha de navegação" style={{ marginBottom: 'var(--s-10)' }}>
            <ol
              className="font-sans"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--s-2)',
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: 'var(--fs-14)',
                color: 'var(--text-muted)',
              }}
            >
              <li>
                <Link href="/" style={{ color: 'inherit' }}>Início</Link>
              </li>
              <li aria-hidden>›</li>
              <li>
                <Link href="/blog" style={{ color: 'inherit' }}>Blog</Link>
              </li>
              <li aria-hidden>›</li>
              <li aria-current="page" style={{ color: 'var(--text)' }}>
                {truncate(post.title, 60)}
              </li>
            </ol>
          </nav>

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
                width={1200}
                height={675}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}

          <div
            className="font-sans article-body"
            dangerouslySetInnerHTML={{ __html: html }}
            style={{
              color: 'var(--text)',
              lineHeight: 1.8,
              fontSize: 'var(--fs-16)',
            }}
          />

          <AutorBox />

          <div className="flex flex-wrap gap-3" style={{ marginTop: 'var(--s-12)' }}>
            <Link href="/ari" className="btn btn--gold btn--sm">
              Conheça o ARI
            </Link>
            <Link href="/simulador" className="btn btn--ghost btn--sm">
              Simule seu retorno
            </Link>
          </div>
        </article>

        {related.length > 0 && (
          <aside
            aria-labelledby="relacionados"
            className="container relative"
            style={{ marginTop: 'var(--s-20)' }}
          >
            <h2
              id="relacionados"
              className="font-display text-navy"
              style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 300, margin: '0 0 var(--s-8)' }}
            >
              Continue lendo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((p) => (
                <PostCard
                  key={p.id}
                  headingLevel="h3"
                  post={{ id: p.id, slug: postSlug(p), title: p.title, imageUrl: postImage(p) }}
                />
              ))}
            </div>
          </aside>
        )}
      </section>
    </main>
  )
}
