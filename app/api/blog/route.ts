import { type NextRequest } from 'next/server'
import { getPosts, isLive } from '@/lib/airticles'

// Proxy público da listagem. Só repassa paginação e busca: antes qualquer
// parâmetro chegava à API, inclusive status=Erro ou Em criação, o que expunha
// rascunhos. O resultado é sempre filtrado para artigos no ar.
const PARAMS_PERMITIDOS = ['page', 'limit', 'search'] as const

export async function GET(request: NextRequest) {
  try {
    const params: Record<string, string> = {}
    for (const key of PARAMS_PERMITIDOS) {
      const value = request.nextUrl.searchParams.get(key)
      if (value) params[key] = value
    }
    const data = await getPosts(params)
    const items = data.items.filter((post) => isLive(post))
    return Response.json({ ...data, count: items.length, items })
  } catch (err) {
    console.error('[api/blog] Airticles API error:', err)
    return Response.json({ error: 'Não foi possível carregar os artigos.' }, { status: 500 })
  }
}
