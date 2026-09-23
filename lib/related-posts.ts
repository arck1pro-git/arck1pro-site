import type { Post } from './airticles'

// Posts relacionados por afinidade de palavras chave. Antes nenhum post
// linkava outro: a maioria só era alcançável pela paginação em JavaScript do
// /blog, invisível para o Google.

const STOPWORDS = new Set([
  'a', 'o', 'as', 'os', 'de', 'da', 'do', 'das', 'dos', 'e', 'em', 'no', 'na', 'nos', 'nas',
  'um', 'uma', 'para', 'por', 'com', 'que', 'como', 'o que', 'ou', 'se', 'ao', 'sua', 'seu',
  'mais', 'qual', 'quais', 'vs', 'x', 'sobre', 'entre', 'sem', 'e',
])

function tokens(post: Pick<Post, 'title' | 'mainKeyword' | 'secondaryKeywords'>): Set<string> {
  const text = [post.title, post.mainKeyword ?? '', ...(post.secondaryKeywords ?? [])]
    .join(' ')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
  return new Set(
    text
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w)),
  )
}

export function relatedPosts(all: Post[], currentId: number, count = 3): Post[] {
  const current = all.find((p) => p.id === currentId)
  if (!current) return all.filter((p) => p.id !== currentId).slice(0, count)

  const base = tokens(current)
  return all
    .filter((p) => p.id !== currentId)
    .map((p, index) => {
      const t = tokens(p)
      let score = 0
      for (const w of t) if (base.has(w)) score += 1
      return { post: p, score, index }
    })
    // maior afinidade primeiro; empate mantém a ordem da API (mais recentes)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, count)
    .map(({ post }) => post)
}
