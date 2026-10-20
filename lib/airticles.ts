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

// Status que valem nova tentativa: limite de requisições (429) e falhas
// temporárias do servidor. A API informa o limite nos headers RateLimit.
const TENTAR_DE_NOVO = new Set([429, 500, 502, 503, 504])
const TENTATIVAS = 3
const ESPERA_BASE_MS = 400
const ESPERA_MAX_MS = 3000

const esperar = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * GET na API com nova tentativa em 429/5xx, respeitando Retry-After quando
 * vier. Em produção, robôs de busca abrem dezenas de posts em sequência; sem
 * isso, uma recusa por limite de requisições virava erro 500 na página.
 */
async function apiGet<T>(url: string): Promise<T> {
  let ultimoStatus = 0
  for (let tentativa = 0; tentativa < TENTATIVAS; tentativa++) {
    const res = await fetch(url, {
      headers: { 'X-API-Key': apiKey() },
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (res.ok) return res.json()
    ultimoStatus = res.status
    if (!TENTAR_DE_NOVO.has(res.status) || tentativa === TENTATIVAS - 1) break
    const retryAfter = Number(res.headers.get('retry-after'))
    const espera = Number.isFinite(retryAfter) && retryAfter > 0
      ? retryAfter * 1000
      : ESPERA_BASE_MS * 2 ** tentativa
    await esperar(Math.min(espera, ESPERA_MAX_MS))
  }
  throw new Error(`Airticles API error: ${ultimoStatus}`)
}

export async function getPosts(params?: Record<string, string>): Promise<PostsResponse> {
  const url = new URL(`${API_BASE}/api/posts`)
  if (params) {
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  }
  return apiGet<PostsResponse>(url.toString())
}

export async function getPost(id: string): Promise<PostDetail> {
  return apiGet<PostDetail>(`${API_BASE}/api/posts/${id}`)
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

// As tentativas com espera já acontecem dentro de apiGet.
async function getPageWithRetry(page: number): Promise<PostsResponse> {
  return getPosts({ limit: String(PAGE_LIMIT), page: String(page) })
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

/**
 * Monta o post a partir do item da listagem, que já traz o HTML completo, a
 * capa e a meta description. O detalhe por id só acrescenta a categoria; se
 * ele falhar (limite de requisições, instabilidade), a página sai com os dados
 * da listagem em vez de virar erro 500.
 */
async function withListFields(item: Post): Promise<PostDetail> {
  let detail: PostDetail | null = null
  try {
    detail = await getPost(String(item.id))
  } catch (err) {
    console.error(`[airticles] detalhe do post ${item.id} indisponível, usando a listagem`, err)
  }
  if (!detail) {
    if (!item.html) throw new Error(`Airticles API: post ${item.id} sem HTML na listagem e sem detalhe`)
    return {
      ...item,
      html: item.html,
      coverImageUrl: item.coverImageUrl ?? null,
      metaDescription: item.metaDescription ?? null,
      category: null,
    }
  }
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
