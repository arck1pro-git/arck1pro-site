import { getPosts, type Post } from '@/lib/airticles'
import BlogList from './BlogList'
import RouteHeroBg from '../components/RouteHeroBg'

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
        marginTop: "-74px",
        position: "relative",
        background: "var(--brand-navy)",
      }}
    >
      <RouteHeroBg />
      {/* Hero sobre a imagem do footer */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '75svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'calc(74px + var(--s-12)) var(--s-6) var(--s-16)',
        }}
      >
        <h1
          className="font-display text-cream lg:text-5xl text-center text-4xl"
          style={{ fontWeight: 700, lineHeight: 1.15, margin: 0 }}
        >
          Investidor que se informa <span className="text-gold-hero">investe melhor</span>
        </h1>
      </div>

      <section
        className="section rounded-4xl overflow-clip relative z-10"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 100% 100%, rgba(0,16,49,0.13) 0%, transparent 100%), var(--surface)',
          paddingTop: 'var(--s-20)',
        }}
      >
        <div className="container">
          <BlogList
            posts={posts.map((post) => ({
              id: post.id,
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
