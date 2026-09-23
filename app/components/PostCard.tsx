import Link from 'next/link'

// Card de artigo usado na listagem do /blog e nos relacionados de cada post.
// Sem estado nem hooks, então serve tanto em componente de servidor quanto no
// BlogList, que é de cliente.

export type PostCardData = {
  id: number
  slug: string
  title: string
  imageUrl: string | null
}

export default function PostCard({
  post,
  headingLevel = 'h2',
}: {
  post: PostCardData
  headingLevel?: 'h2' | 'h3'
}) {
  const Heading = headingLevel

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
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
          <Heading
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
          </Heading>
          <span className="font-sans" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11 }}>
            Ler artigo →
          </span>
        </div>
      </article>
    </Link>
  )
}
