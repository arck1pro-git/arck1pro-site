import { getPosts, postSlug, type Post } from '@/lib/airticles'
import BlogList from './BlogList'
import RouteHero from '../components/RouteHero'

const API_BASE = 'https://api.airticles.ai'

function extractImage(post: Post): string | null {
  const url = post.coverImageUrl ?? null
  if (url) return url.startsWith('http') ? url : `${API_BASE}${url}`
  const match = post.html?.match(/<img[^>]+src=["']([^"']+)["']/i)
  if (!match) return null
  const src = match[1]
  return src.startsWith('http') ? src : `${API_BASE}${src}`
}

export default async function BlogPage() {
  let posts: Post[] = []

  try {
    const data = await getPosts({ limit: '200' })
    posts = data.items
  } catch {
    // silently fail — empty state shown below
  }

  return (
    <main
      style={{
        marginTop: "calc(var(--header-h) * -1)",
        position: "relative",
        background: "var(--brand-navy)",
      }}
    >
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
            posts={posts.map((post) => ({
              id: post.id,
              slug: postSlug(post),
              title: post.title,
              mainKeyword: post.mainKeyword ?? null,
              imageUrl: extractImage(post),
            }))}
          />
        </div>
      </section>
    </main>
  )
}
