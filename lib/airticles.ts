const API_BASE = 'https://api.airticles.ai'

function apiKey() {
  const key = process.env.BLOG_API
  if (!key) throw new Error('BLOG_API env var is missing')
  return key
}

export interface Post {
  id: number
  title: string
  slug: string
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
