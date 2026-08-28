import type { MetadataRoute } from 'next'
import { getPosts, postSlug } from '@/lib/airticles'
import { COMPARATIVOS } from '@/lib/comparativos'

const SITE_URL = 'https://arck1pro.com.br'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // /empreendimentos e /contato saíram daqui junto com as páginas: estavam
  // listadas e respondiam 404, o que derruba a confiança do sitemap inteiro.
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
      url: `${SITE_URL}/simulador`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
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
  ]

  // As 10 comparações (/cdb, /poupanca etc.) saem da mesma fonte que gera as
  // rotas, então uma comparação nova entra no sitemap sozinha.
  const comparativos: MetadataRoute.Sitemap = COMPARATIVOS.map((c) => ({
    url: `${SITE_URL}/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Posts do blog — falha em silêncio se a API estiver indisponível no build.
  let postRoutes: MetadataRoute.Sitemap = []
  try {
    const { items } = await getPosts({ limit: '200' })
    // postSlug, e não post.id: o id só existe como atalho que redireciona para
    // o slug, e sitemap com URL que redireciona é URL desperdiçada.
    postRoutes = items.map((post) => ({
      url: `${SITE_URL}/blog/${postSlug(post)}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  } catch {
    // sem posts no sitemap quando a API não responde
  }

  return [...staticRoutes, ...comparativos, ...postRoutes]
}
