const API_BASE = 'https://api.airticles.ai'

function apiKey() {
  const key = process.env.BLOG_API
  if (!key) throw new Error('BLOG_API env var is missing')
  return key
}

export interface Post {
  id: number
  title: string
  slug: string | null // a API vem mandando null; use postSlug() para a URL
  status: string
  createdAt: string
  updatedAt: string
  scheduledAt: string | null
  mainKeyword: string
  secondaryKeywords: string[]
  html?: string
  coverImageUrl?: string | null
}

export interface PostDetail extends Post {
  html: string
  coverImageUrl: string | null
  category: string
  // O endpoint de detalhe manda a data em snake_case (e não manda scheduledAt).
  scheduled_at?: string | null
}

export interface PostsResponse {
  projectId: number
  count: number
  items: Post[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    limit: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export async function getPosts(params?: Record<string, string>): Promise<PostsResponse> {
  const url = new URL(`${API_BASE}/api/posts`)
  if (params) {
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  }
  const res = await fetch(url.toString(), {
    headers: { 'X-API-Key': apiKey() },
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`Airticles API error: ${res.status}`)
  return res.json()
}

export async function getPost(id: string): Promise<PostDetail> {
  const res = await fetch(`${API_BASE}/api/posts/${id}`, {
    headers: { 'X-API-Key': apiKey() },
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`Airticles API error: ${res.status}`)
  return res.json()
}

// Busca o detalhe (só existe por id) e completa com o item da listagem: o
// detalhe não devolve id/createdAt/updatedAt e manda a data como scheduled_at.
async function withListFields(id: number, item?: Post): Promise<PostDetail> {
  const detail = await getPost(String(id))
  return {
    ...detail,
    id,
    slug: item?.slug ?? detail.slug,
    createdAt: item?.createdAt ?? detail.createdAt,
    updatedAt: item?.updatedAt ?? detail.updatedAt,
    scheduledAt: item?.scheduledAt ?? detail.scheduled_at ?? null,
  }
}

// A URL é /blog/<slug> e a API não tem busca por slug, então o slug é resolvido
// pela listagem — mesmo fetch cacheado de 5 min que o /blog já faz.
// Títulos iguais gerariam o mesmo slug: nesse caso vence o primeiro da lista.
export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const { items } = await getPosts({ limit: '200' })
  const item = items.find((post) => postSlug(post) === slug)
  if (!item) return null
  return withListFields(item.id, item)
}

// Compatibilidade com as URLs antigas /blog/<id>.
export async function getSlugById(id: string): Promise<string | null> {
  const { items } = await getPosts({ limit: '200' })
  const item = items.find((post) => String(post.id) === id)
  return item ? postSlug(item) : null
}

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[^\x00-\x7f]/g, '') // tira acentos e outros nao-ASCII
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Slug da URL: o slug curado da Airticles tem prioridade; quando a API manda
// null (o caso de hoje) o título vira a fonte.
export function postSlug(post: { slug?: string | null; title: string }): string {
  const base = post.slug?.trim() ? post.slug : post.title
  return slugify(base) || 'artigo'
}
