import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { HERO_VIDEO } from '@/lib/media'
import {
  ARI,
  COMPARATIVOS,
  DIMENSOES,
  ROTULO_DIMENSAO,
  getComparativo,
} from '@/lib/comparativos'

// As 10 rotas saem prerenderizadas no build a partir do próprio módulo de dados.
// dynamicParams = false para um slug inventado cair em 404 em vez de tentar
// renderizar sob demanda uma comparação que não existe.
export const dynamicParams = false

export function generateStaticParams() {
  return COMPARATIVOS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const c = getComparativo(slug)
  if (!c) return {}

  const title = `${c.nome} ou ARI? Comparativo · ARCK1PRO`
  return {
    title,
    description: c.metaDescription,
    alternates: { canonical: `/${c.slug}` },
    openGraph: {
      title,
      description: c.metaDescription,
      url: `/${c.slug}`,
      type: 'article',
    },
  }
}

// Mesma escala das headings de section da home: peso 300 num clamp de 32 a 48px.
// A home não usa 700 em canto nenhum porque a Poppins é carregada só em
// 300/400/600, e 700 sairia como falso negrito sintetizado pelo browser.
const H2 = {
  fontSize: 'clamp(32px, 4vw, 48px)',
  fontWeight: 300,
  lineHeight: 1.1,
  margin: 0,
} as const

export default async function ComparativoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const c = getComparativo(slug)
  if (!c) notFound()

  // A tabela lista apenas os critérios em que o ARI leva vantagem. O título da
  // seção diz isso com todas as letras, para o recorte ficar explícito ao leitor.
  const criterios = DIMENSOES.filter((d) => c.vantagem[d] === 'ari')

  return (
    <main
      style={{
        marginTop: 'calc(var(--header-h) * -1)',
        position: 'relative',
        background: 'var(--brand-navy)',
      }}
    >
      {/* Hero no mesmo padrão da home: vídeo em object-cover, scrim uniforme por
          cima e o conteúdo separado pelo justify-between, com título ancorado no
          topo e chamada mais botões no rodapé da dobra. O marginTop negativo que
          puxa a hero para trás do header fica no <main>, por isso não se repete
          aqui. */}
      <section className="reveal reveal--fade min-h-svh flex flex-col justify-between pt-32 px-6 pb-24 relative overflow-hidden">
        <video
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        <div aria-hidden className="hero-scrim" />

        <div className="container relative text-center">
          <h1 className="font-display text-cream font-light leading-[0.96] tracking-[-0.02em] text-5xl lg:text-[clamp(3.5rem,7.2vw,6rem)]">
            {c.nome} ou <span className="text-gold-hero">ARI</span>?
          </h1>
        </div>

        <div className="container relative flex flex-col items-center gap-8 text-center">
          <p className="font-sans fs-16 leading-[1.75] font-normal text-white max-w-[620px]">
            {c.chamada}
          </p>

          <div className="flex gap-3 flex-wrap justify-center">
            <Link href="/ari#comercial" className="btn btn--gold">
              Solicitar qualificação <ArrowUpRight className="arrow" size={16} strokeWidth={2} aria-hidden />
            </Link>
            <a href="#comparativo" className="btn btn--ghost-inv">
              Ver o comparativo ↓
            </a>
          </div>
        </div>
      </section>

      {/* Superfície clara para a tabela e para o texto corrido que a segue, com
          o mesmo radial das demais rotas internas. A alternância clara e navy que vem depois é o ritmo que a home
          usa entre a intro do Método, o acordeão e a seção do líder. */}
      <section
        id="comparativo"
        className="reveal section overflow-clip relative z-10 scroll-mt-[80px]"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 100% 100%, rgba(0,16,49,0.13) 0%, transparent 100%), var(--surface)',
        }}
      >
        <div className="container">
          <h2
            className="font-display text-navy text-center"
            style={{ ...H2, maxWidth: 900, marginInline: 'auto', marginBottom: 'var(--s-12)' }}
          >
            Onde o ARI leva vantagem sobre <span className="text-gold">{c.nome}</span>
          </h2>

          <div className="cmp-wrap">
            <table className="cmp">
              <caption className="sr-only">
                Critérios em que o ARI leva vantagem sobre {c.nome}
              </caption>
              <thead>
                <tr>
                  <th scope="col">Critério</th>
                  <th scope="col">{c.nome}</th>
                  <th scope="col" className="cmp-ari">
                    ARI
                  </th>
                </tr>
              </thead>
              <tbody>
                {criterios.map((d) => (
                  <tr key={d}>
                    <th scope="row">{ROTULO_DIMENSAO[d]}</th>
                    <td>{c.alternativa[d]}</td>
                    <td className="cmp-ari">{ARI[d]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Texto corrido logo abaixo da tabela, na mesma superfície clara. A
              tabela resolve a leitura rápida e este bloco resolve a leitura
              atenta, com o argumento inteiro de cada comparação. Coluna de 820px
              é a mesma medida da dobra "O que é o ARI" em /ari, para o site não
              ter duas larguras de leitura diferentes. */}
          <div className="max-w-[820px] mx-auto" style={{ marginTop: 'var(--s-24)' }}>
            <h2
              className="font-display text-navy text-center"
              style={{ ...H2, marginBottom: 'var(--s-8)' }}
            >
              {c.dissertacao.titulo}
            </h2>

            <div
              className="font-sans text-navy"
              style={{ fontSize: 'var(--fs-16)', lineHeight: 1.85 }}
            >
              {c.dissertacao.paragrafos.map((p, i) => (
                <p key={i} style={{ margin: i === 0 ? 0 : 'var(--s-5) 0 0' }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fecho em navy com a trama de dots, do mesmo jeito que a ContatoSection
          encerra a home. Conclusão e chamada dividem a dobra: separá-las em duas
          sections navy seguidas criaria uma emenda sem contraste no meio. */}
      <section
        className="reveal section overflow-clip relative z-10"
        style={{ background: 'var(--navy-grad)' }}
      >
        <div aria-hidden className="navy-dots" />

        <div className="container relative">
          <h2
            className="font-display text-cream text-center"
            style={{ ...H2, marginBottom: 'var(--s-12)' }}
          >
            Por que o <span className="text-gold">ARI</span> ganha
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.porqueGanha.map((p, i) => (
              <div
                key={p.titulo}
                className="rounded-lg"
                style={{
                  padding: 'var(--s-8)',
                  // Creme translúcido, e não branco chapado: sobre o degradê navy
                  // um card sólido brigaria com o brilho dos botões dourados.
                  background: 'rgba(236,235,231,0.05)',
                  border: 'var(--line-1) solid rgba(236,235,231,0.14)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--s-3)',
                }}
              >
                <span
                  className="font-display text-gold"
                  style={{ fontSize: 'var(--fs-32)', fontWeight: 600, lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="font-display text-cream"
                  style={{ fontSize: 'var(--fs-20)', fontWeight: 500, margin: 0, lineHeight: 1.3 }}
                >
                  {p.titulo}
                </h3>
                <p
                  className="font-sans text-cream"
                  style={{ fontSize: 'var(--fs-14)', lineHeight: 1.7, margin: 0, opacity: 0.75 }}
                >
                  {p.texto}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--s-20)' }}>
            <h2 className="font-display text-cream" style={H2}>
              O ARI opera por seleção
            </h2>
            <p
              className="font-sans text-cream"
              style={{
                fontSize: 'var(--fs-15)',
                lineHeight: 1.8,
                maxWidth: 560,
                marginInline: 'auto',
                marginTop: 'var(--s-5)',
                opacity: 0.8,
              }}
            >
              São de 8 a 17 investidores por operação. Envie sua candidatura e nossa equipe de
              estruturação avalia o seu perfil antes de apresentar a operação disponível.
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'var(--s-3)',
                flexWrap: 'wrap',
                marginTop: 'var(--s-8)',
              }}
            >
              <Link href="/ari#comercial" className="btn btn--gold">
                Solicitar qualificação <ArrowUpRight className="arrow" size={16} strokeWidth={2} aria-hidden />
              </Link>
              <Link href="/ari" className="btn btn--ghost-inv">
                Entender o ARI a fundo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
