import type { MetadataRoute } from 'next'
import { getPosts } from '@/lib/airticles'

const SITE_URL = 'https://arck1pro.com.br'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [`${SITE_URL}/hero.png`],
    },
    {
      url: `${SITE_URL}/ari`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/empreendimentos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/portobelo`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sobre`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contato`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // Posts do blog — falha em silêncio se a API estiver indisponível no build.
  let postRoutes: MetadataRoute.Sitemap = []
  try {
    const { items } = await getPosts({ limit: '200' })
    postRoutes = items.map((post) => ({
      url: `${SITE_URL}/blog/${post.id}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  } catch {
    // sem posts no sitemap quando a API não responde
  }

  return [...staticRoutes, ...postRoutes]
}
