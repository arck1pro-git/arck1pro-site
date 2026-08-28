import Link from 'next/link'
import { getPosts, postSlug, type Post } from '@/lib/airticles'
import { ArrowUpRight } from "lucide-react";

const API_BASE = 'https://api.airticles.ai'

function extractImage(post: Post): string | null {
  const url = post.coverImageUrl ?? null
  if (url) return url.startsWith('http') ? url : `${API_BASE}${url}`
  const match = post.html?.match(/<img[^>]+src=["']([^"']+)["']/i)
  if (!match) return null
  const src = match[1]
  return src.startsWith('http') ? src : `${API_BASE}${src}`
}

export default async function BlogSection() {
  let posts: Post[] = []
  let error = false

  try {
    const data = await getPosts({ limit: '3' })
    posts = data.items
  } catch (err) {
    console.error('[BlogSection] Airticles API error:', err)
    error = true
  }

  const aviso = (texto: string) => (
    <p className="font-sans" style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-14)' }}>
      {texto}
    </p>
  )

  return (
    <section
      id="blog"
      className="reveal section overflow-clip relative z-10"
      // Branco limpo: saiu o radial navy que escurecia o canto inferior direito.
      // A textura de grão passa a ser a única camada sobre a superfície. O rodapé
      // mantém a versão dele desse radial.
      style={{ background: 'var(--surface)' }}
    >
      {/* Textura de grão. Fica atrás de tudo por z-index 0, o que exige o
          .container em position:relative logo abaixo — sem isso um elemento
          posicionado passaria por cima do conteúdo em fluxo. */}
      <div aria-hidden className="grao" />

      <div className="container relative">
        {/* Headline e link numa faixa própria acima dos artigos. A coluna
            lateral saiu porque três cards de 360px lado a lado precisam da
            largura inteira do container: espremidos em pouco mais da metade
            dela, cada um ficaria com ~220px e o título quebraria em cinco linhas. */}
        <div className="flex flex-wrap items-end justify-between gap-6" style={{ marginBottom: 'var(--s-10)' }}>
          {/* Mesma spec das outras headings da home: font-display em peso 300
              num clamp(32px, 4vw, 48px). Estava em lg:text-6xl com fontWeight
              700 — e 700 nem existe: o layout.tsx carrega a Poppins em
              300/400/500/600, então o browser sintetizava um falso negrito. */}
          <h2
            className="font-display text-navy"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 300, lineHeight: 1.1, margin: 0 }}
          >
            Fique por dentro da
            <br />
            {/* .text-gold: o mesmo --gold-grad-h da hero, recortado no texto.
                Sem o brilho animado do .text-gold-hero, que fica só na hero. */}
            <span className="text-gold font-serif-italic font-normal">Costa Esmeralda</span>
          </h2>

          <Link href="/blog" className="btn btn--link btn--sm">
            Ver todos os artigos <ArrowUpRight className="arrow" size={16} strokeWidth={2} aria-hidden />
          </Link>
        </div>

        {/* Três colunas no desktop; uma só no mobile, onde 3 × 360px lado a lado
            não cabe. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {error
              ? aviso('Não foi possível carregar os artigos no momento.')
              : posts.length === 0
                ? aviso('Nenhum artigo publicado ainda.')
                : posts.map((post) => {
                    const imageUrl = extractImage(post)
                    return (
                      <Link key={post.id} href={`/blog/${postSlug(post)}`} style={{ textDecoration: 'none' }}>
                        <article
                          className="rounded-lg"
                          style={{
                            position: 'relative',
                            height: '360px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            // Preta, e não a sombra navy dos outros cards do
                            // site: sobre a foto escura do artigo o azul
                            // desapareceria. O deslocamento vertical (30px) é
                            // maior que antes em relação ao blur, o que junta a
                            // sombra num poço embaixo do card em vez de espalhá-la
                            // por igual em volta.
                            boxShadow:
                              '0 3px 8px rgba(0,0,0,0.16), 0 30px 52px -14px rgba(0,0,0,0.72)',
                            background: imageUrl
                              ? `url(${imageUrl}) center/cover no-repeat`
                              : 'var(--brand-navy)',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              // Preto, e não mais o navy da marca: o navy
                              // tingia a foto de azul; o preto só escurece e
                              // deixa a imagem na cor dela.
                              background:
                                'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)',
                            }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              padding: 'var(--s-6)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 'var(--s-3)',
                            }}
                          >
                            <h3
                              className="font-sans"
                              style={{
                                color: '#ffffff',
                                fontSize: 'var(--fs-20)',
                                fontWeight: 400,
                                lineHeight: 1.25,
                                margin: 0,
                              }}
                            >
                              {post.title}
                            </h3>
                            <span
                              className="font-sans"
                              style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--fs-12)' }}
                            >
                              Ler artigo →
                            </span>
                          </div>
                        </article>
                      </Link>
                    )
                  })}
        </div>
      </div>
    </section>
  )
}
