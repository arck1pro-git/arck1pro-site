import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost } from '@/lib/airticles'

const API_BASE = 'https://api.airticles.ai'
const SITE_URL = 'https://arck1pro.com.br'

function resolveImageUrl(url: string | null): string | null {
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${API_BASE}${url}`
}

function stripHtml(html: string | undefined, max = 160): string {
  if (!html) return ''
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  try {
    const post = await getPost(id)
    const description = stripHtml(post.html) || `${post.title} — Blog ARCK1PRO.`
    const cover = resolveImageUrl(post.coverImageUrl)
    const url = `/blog/${id}`
    return {
      title: post.title,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: 'article',
        locale: 'pt_BR',
        siteName: 'ARCK1PRO',
        url,
        title: post.title,
        description,
        images: cover ? [cover] : ['/hero.png'],
        publishedTime: post.scheduledAt ?? post.createdAt ?? undefined,
        modifiedTime: post.updatedAt ?? undefined,
      },
    }
  } catch {
    return { title: 'Artigo', robots: { index: false, follow: true } }
  }
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
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let post
  try {
    post = await getPost(id)
  } catch {
    notFound()
  }

  const coverUrl = resolveImageUrl(post.coverImageUrl)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: coverUrl ?? `${SITE_URL}/hero.png`,
    datePublished: post.scheduledAt ?? post.createdAt ?? undefined,
    dateModified: post.updatedAt ?? undefined,
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/blog/${id}`,
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(ellipse 55% 55% at 100% 100%, rgba(0,16,49,0.13) 0%, transparent 100%), var(--surface)',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
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
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: 'var(--s-10)',
            }}
          >
            <Image
              src={coverUrl}
              alt={post.title}
              fill
              sizes="(max-width: 780px) 100vw, 780px"
              style={{ objectFit: 'cover' }}
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
