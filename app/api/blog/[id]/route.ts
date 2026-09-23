import { getPost, isLive } from '@/lib/airticles'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  if (!/^\d+$/.test(id)) {
    return Response.json({ error: 'Artigo não encontrado.' }, { status: 404 })
  }
  try {
    const data = await getPost(id)
    // Artigo fora do ar (rascunho, erro, agendado futuro) responde como inexistente.
    if (!isLive({ status: data.status, scheduledAt: data.scheduledAt ?? null })) {
      return Response.json({ error: 'Artigo não encontrado.' }, { status: 404 })
    }
    return Response.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : ''
    if (message.includes('404')) {
      return Response.json({ error: 'Artigo não encontrado.' }, { status: 404 })
    }
    console.error('[api/blog/id] Airticles API error:', err)
    return Response.json({ error: 'Não foi possível carregar o artigo.' }, { status: 500 })
  }
}
