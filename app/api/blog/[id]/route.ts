import { getPost } from '@/lib/airticles'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await getPost(id)
    return Response.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    const status = message.includes('404') ? 404 : 500
    return Response.json({ error: message }, { status })
  }
}
