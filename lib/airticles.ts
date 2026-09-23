// Sobrescrevível só para testes locais contra uma API simulada; em produção
// a variável não existe e vale o host oficial.
const API_BASE = process.env.AIRTICLES_API_BASE || 'https://api.airticles.ai'

// A API ajusta qualquer limit acima de 50 para 50 (ver docs/api). Pedir 200 de
// uma vez devolvia só a primeira página: posts além dos 50 primeiros sumiam da
// listagem, do sitemap e davam 404 na própria URL.
const PAGE_LIMIT = 50
// Trava de segurança contra paginação infinita se a API responder errado.
const MAX_PAGES = 20
const REVALIDATE_SECONDS = 300

// Status que não podem ir ao ar: artigo ainda sendo gerado, parado em revisão
// ou com falha. "Pendente" fica de fora desta lista de propósito: na Airticles
// ele só indica que nenhuma integração WordPress/Wix publicou o artigo, que é
// exatamente o caso deste site, que consome a API direto.
const STATUS_FORA_DO_AR = new Set([
  'Em criação',
  'Aprovação pendente',
  'Erro',
  'Rascunho',
  'Na fila',
  'lixeira',
])

function apiKey() {
  const key = process.env.BLOG_API
  if (!key) throw new Error('BLOG_API env var is missing')
  return key
}

export interface Post {
  id: number
  title: string
  slug: string | null // a API pode mandar null; use postSlug() para a URL
  status: string
  createdAt: string
  updatedAt: string
  scheduledAt: string | null
  mainKeyword: string | null
  secondaryKeywords: string[] | null
  html?: string | null
  coverImageUrl?: string | null
  metaDescription?: string | null
}

export interface PostDetail extends Post {
  html: string
  coverImageUrl: string | null
  category: string | null
  // O endpoint de detalhe manda a data também em snake_case, no fuso do projeto.
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
    next: { revalidate: REVALIDATE_SECONDS },
  })
  if (!res.ok) throw new Error(`Airticles API error: ${res.status}`)
  return res.json()
}

export async function getPost(id: string): Promise<PostDetail> {
  const res = await fetch(`${API_BASE}/api/posts/${id}`, {
    headers: { 'X-API-Key': apiKey() },
    next: { revalidate: REVALIDATE_SECONDS },
  })
  if (!res.ok) throw new Error(`Airticles API error: ${res.status}`)
  return res.json()
}

/** Um artigo está no ar se não está em produção/erro e, se agendado, já venceu. */
export function isLive(post: Pick<Post, 'status' | 'scheduledAt'>, now = Date.now()): boolean {
  if (STATUS_FORA_DO_AR.has(post.status)) return false
  if (post.status === 'Agendado') {
    const when = post.scheduledAt ? Date.parse(post.scheduledAt) : NaN
    return Number.isFinite(when) && when <= now
  }
  return true
}

export interface AllPostsResult {
  posts: Post[]
  /** false quando alguma página da API falhou mesmo após a nova tentativa. */
  complete: boolean
}

async function getPageWithRetry(page: number): Promise<PostsResponse> {
  try {
    return await getPosts({ limit: String(PAGE_LIMIT), page: String(page) })
  } catch {
    // Uma nova tentativa cobre falha transitória (timeout, 5xx, 429 isolado).
    return getPosts({ limit: String(PAGE_LIMIT), page: String(page) })
  }
}

/**
 * Artigos no ar de todas as páginas da API, sinalizando se a lista está completa.
 * Cada página é um fetch cacheado por 5 min, então listagem, sitemap e rota do
 * post compartilham o mesmo cache. A primeira página é obrigatória (sem ela não
 * se sabe o total); as demais toleram falha e deixam `complete: false`.
 */
export async function getAllPostsResult(): Promise<AllPostsResult> {
  const first = await getPageWithRetry(1)
  const totalPages = Math.min(first.pagination?.totalPages ?? 1, MAX_PAGES)

  const rest = await Promise.allSettled(
    Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => getPageWithRetry(i + 2)),
  )
  const failed = rest.filter((r) => r.status === 'rejected')
  if (failed.length > 0) {
    console.error(`[airticles] ${failed.length} página(s) da listagem falharam`, failed)
  }

  const pages = [
    first,
    ...rest.flatMap((r) => (r.status === 'fulfilled' ? [r.value] : [])),
  ]
  const seen = new Set<number>()
  const posts = pages
    .flatMap((page) => page.items ?? [])
    .filter((post) => {
      if (seen.has(post.id)) return false
      seen.add(post.id)
      return isLive(post)
    })

  return { posts, complete: failed.length === 0 }
}

/** Artigos no ar. Lista parcial se alguma página falhou (ver getAllPostsResult). */
export async function getAllPosts(): Promise<Post[]> {
  return (await getAllPostsResult()).posts
}

/**
 * Lança erro quando o item não foi achado numa lista incompleta: um post real
 * não pode virar 404 só porque uma página da API falhou. O erro vira resposta
 * 5xx, que o Google trata como temporária.
 */
async function findInAllPosts(match: (post: Post) => boolean): Promise<Post | null> {
  const { posts, complete } = await getAllPostsResult()
  const item = posts.find(match)
  if (item) return item
  if (!complete) throw new Error('Airticles API: listagem incompleta, não é possível afirmar 404')
  return null
}

// Busca o detalhe (só existe por id) e completa com o item da listagem.
async function withListFields(item: Post): Promise<PostDetail> {
  const detail = await getPost(String(item.id))
  return {
    ...detail,
    id: item.id,
    slug: item.slug ?? detail.slug,
    createdAt: item.createdAt ?? detail.createdAt,
    updatedAt: item.updatedAt ?? detail.updatedAt,
    scheduledAt: item.scheduledAt ?? detail.scheduled_at ?? null,
    metaDescription: detail.metaDescription ?? item.metaDescription ?? null,
    coverImageUrl: detail.coverImageUrl ?? item.coverImageUrl ?? null,
  }
}

// A URL é /blog/<slug> e a API não tem busca por slug, então o slug é resolvido
// pela listagem completa. Títulos iguais gerariam o mesmo slug: vence o primeiro.
// Retorna null só quando o post comprovadamente não existe; falha da API lança.
export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const item = await findInAllPosts((post) => postSlug(post) === slug)
  if (!item) return null
  return withListFields(item)
}

// Compatibilidade com as URLs antigas /blog/<id>.
export async function getSlugById(id: string): Promise<string | null> {
  const item = await findInAllPosts((post) => String(post.id) === id)
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
// null o título vira a fonte.
export function postSlug(post: { slug?: string | null; title: string }): string {
  const base = post.slug?.trim() ? post.slug : post.title
  return slugify(base) || 'artigo'
}

/** URL absoluta de uma imagem que a API pode mandar relativa. */
export function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url) return null
  return url.startsWith('http') ? url : `${API_BASE}${url}`
}

/** Capa do post; sem capa, a primeira imagem do corpo. */
export function postImage(post: Pick<Post, 'coverImageUrl' | 'html'>): string | null {
  const cover = resolveImageUrl(post.coverImageUrl)
  if (cover) return cover
  const match = post.html?.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match ? resolveImageUrl(match[1]) : null
}

/** Data de publicação efetiva: agendamento quando houver, senão criação. */
export function publishedAt(post: Pick<Post, 'scheduledAt' | 'createdAt'>): string {
  return post.scheduledAt ?? post.createdAt
}
