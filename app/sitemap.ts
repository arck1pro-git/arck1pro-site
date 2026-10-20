import type { MetadataRoute } from 'next'
import { getAllPosts, postSlug } from '@/lib/airticles'
import { COMPARATIVOS } from '@/lib/comparativos'
import { GUIAS, GUIA_SLUGS } from '@/lib/guias'
import { SITE_URL } from '@/lib/site'

// Regera a cada hora. O sitemap em produção estava congelado no build de
// 28/08/2026, listando 48 URLs que já não existiam e só 2 dos posts no ar.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Páginas fixas e comparativos vão sem lastmod: a data do build mudava a cada
  // regeração sem o conteúdo mudar, e o Google aprende a ignorar lastmod que
  // não é confiável. Posts e guias levam a data real da última alteração.

  // /empreendimentos e /contato saíram daqui junto com as páginas: estavam
  // listadas e respondiam 404, o que derruba a confiança do sitemap inteiro.
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [`${SITE_URL}/hero.png`],
    },
    {
      url: `${SITE_URL}/ari`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/simulador`,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/portobelo`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sobre`,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // As 10 comparações (/cdb, /poupanca etc.) saem da mesma fonte que gera as
  // rotas, então uma comparação nova entra no sitemap sozinha.
  const comparativos: MetadataRoute.Sitemap = COMPARATIVOS.map((c) => ({
    url: `${SITE_URL}/${c.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Guias do investidor (páginas comerciais), com a data da última revisão.
  const guias: MetadataRoute.Sitemap = GUIA_SLUGS.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: new Date(GUIAS[slug].atualizadoEm),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  // Posts do blog: todas as páginas da API, só artigos no ar.
  let postRoutes: MetadataRoute.Sitemap = []
  try {
    const items = await getAllPosts()
    // postSlug, e não post.id: o id só existe como atalho que redireciona para
    // o slug, e sitemap com URL que redireciona é URL desperdiçada.
    postRoutes = items.map((post) => ({
      url: `${SITE_URL}/blog/${postSlug(post)}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : undefined,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  } catch (err) {
    console.error('[sitemap] Airticles API error:', err)
    // Em produção, relança: a regeração falha e o Next segue servindo o
    // sitemap anterior, em vez de publicar por uma hora um sitemap sem posts.
    // No build, segue sem posts para uma instabilidade da API não travar o deploy.
    if (process.env.NEXT_PHASE !== 'phase-production-build') throw err
  }

  return [...staticRoutes, ...guias, ...comparativos, ...postRoutes]
}
