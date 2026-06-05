import { type NextRequest } from 'next/server'
import { getPosts } from '@/lib/airticles'

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams)
    const data = await getPosts(params)
    return Response.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return Response.json({ error: message }, { status: 500 })
  }
}
