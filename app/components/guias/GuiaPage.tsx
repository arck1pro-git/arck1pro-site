import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import RouteHero from '@/app/components/RouteHero'
import BreadcrumbJsonLd from '@/app/components/BreadcrumbJsonLd'
import QualificacaoCta from '@/app/components/QualificacaoCta'
import AriSimulador from '@/app/ari/AriSimulador'
import AriFaq from '@/app/ari/AriFaq'
import { GUIAS, GUIA_SLUGS, type Guia, type GuiaSlug, type Tabela } from '@/lib/guias'
import { ARI_AVISO_REGULATORIO, ARI_CONDICOES, ARI_PROTECOES } from '@/lib/ari-conteudo'
import { whatsappUrl } from '@/lib/contato'
import { SITE_NAME, SITE_URL, absoluteUrl, jsonLdString } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'
import AutorBox from '@/app/components/AutorBox'
import { AUTOR_ORGANIZACAO, PRODUTO_ID } from '@/lib/empresa'

// Página de guia do investidor: resposta direta no topo (o trecho que buscador
// e IA citam), tabelas com números calculados da tabela oficial, simulador,
// FAQ com dados estruturados e duas saídas de conversão (qualificação e
// WhatsApp com mensagem que identifica a página).

const H2: React.CSSProperties = {
  fontSize: 'clamp(28px, 3.4vw, 44px)',
  fontWeight: 300,
  lineHeight: 1.15,
  margin: 0,
}

const SUPERFICIE =
  'radial-gradient(ellipse 55% 55% at 100% 100%, rgba(0,16,49,0.13) 0%, transparent 100%), var(--surface)'

export function guiaMetadata(slug: GuiaSlug): Metadata {
  const g = GUIAS[slug]
  return pageMetadata({
    title: g.tituloSeo,
    description: g.descricao,
    path: `/${g.slug}`,
    type: 'article',
    modifiedTime: g.atualizadoEm,
  })
}

function dataPorExtenso(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function jsonLd(g: Guia) {
  const url = absoluteUrl(`/${g.slug}`)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: g.tituloSeo,
        headline: g.titulo,
        description: g.descricao,
        inLanguage: 'pt-BR',
        dateModified: g.atualizadoEm,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        author: AUTOR_ORGANIZACAO,
        about: {
          '@type': 'FinancialProduct',
          '@id': PRODUTO_ID,
          name: 'ARI (Ativo de Renda Imobiliária)',
          url: absoluteUrl('/ari'),
          provider: { '@id': `${SITE_URL}/#organization` },
        },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#resposta'] },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: g.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }
}

function TabelaGuia({ tabela }: { tabela: Tabela }) {
  return (
    <figure style={{ margin: 'var(--s-8) 0 0' }}>
      <div className="cmp-wrap">
        <table className="cmp">
          <caption className="sr-only">{tabela.legenda}</caption>
          <thead>
            <tr>
              {tabela.colunas.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tabela.linhas.map((linha) => {
              const cls = linha.destaque ? 'cmp-ari' : undefined
              const [primeira, ...resto] = linha.celulas
              return (
                <tr key={primeira}>
                  <th scope="row" className={cls}>
                    {linha.href ? (
                      <Link href={linha.href} style={{ color: 'inherit' }}>
                        {primeira}
                      </Link>
                    ) : (
                      primeira
                    )}
                  </th>
                  {resto.map((cel, i) => (
                    <td key={i} className={cls}>
                      {cel}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <figcaption
        className="font-sans"
        style={{ fontSize: 'var(--fs-12)', color: 'var(--text-faint)', lineHeight: 1.6, marginTop: 'var(--s-3)' }}
      >
        Fonte: {tabela.fonte}
      </figcaption>
    </figure>
  )
}

export default function GuiaPage({ slug }: { slug: GuiaSlug }) {
  const g = GUIAS[slug]
  const whatsapp = whatsappUrl(g.mensagemWhatsapp)
  const relacionados = GUIA_SLUGS.filter((s) => s !== slug).map((s) => GUIAS[s])

  return (
    <main
      style={{
        marginTop: 'calc(var(--header-h) * -1)',
        position: 'relative',
        background: 'var(--brand-navy)',
      }}
    >
      <BreadcrumbJsonLd items={[{ name: g.nome, path: `/${g.slug}` }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd(g)) }} />

      <RouteHero
        escala="compacta"
        eyebrow={g.eyebrow}
        titulo={g.titulo}
        texto={`Aporte a partir de ${ARI_CONDICOES.aporteMinimo} · acesso ${ARI_CONDICOES.acesso}`}
        acoes={
          <>
            <QualificacaoCta />
            <a href={g.simulador ? '#simulador' : '#resposta'} className="btn btn--ghost-inv">
              {g.simulador ? 'Simular meu retorno ↓' : 'Ver a resposta ↓'}
            </a>
          </>
        }
      />

      <section className="section overflow-clip relative z-10" style={{ background: SUPERFICIE, paddingTop: 'var(--s-20)' }}>
        <div aria-hidden className="claro-dots" />
        <div className="container relative" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-20)' }}>
          {/* Resposta direta: o parágrafo que responde à busca sem rolar a página. */}
          <div className="max-w-[820px] mx-auto w-full">
            <nav aria-label="Trilha de navegação" style={{ marginBottom: 'var(--s-8)' }}>
              <ol
                className="font-sans"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--s-2)',
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  fontSize: 'var(--fs-14)',
                  color: 'var(--text-muted)',
                }}
              >
                <li>
                  <Link href="/" style={{ color: 'inherit' }}>Início</Link>
                </li>
                <li aria-hidden>›</li>
                <li aria-current="page" style={{ color: 'var(--text)' }}>{g.nome}</li>
              </ol>
            </nav>

            <div
              id="resposta"
              className="rounded-lg scroll-mt-[100px]"
              style={{
                padding: 'var(--s-10)',
                background: '#ffffff',
                border: 'var(--line-1) solid rgba(194, 143, 80, 0.35)',
                borderLeft: '4px solid var(--brand-gold)',
              }}
            >
              <p
                className="font-display text-gold"
                style={{ fontSize: 'var(--fs-13)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}
              >
                Resposta direta
              </p>
              <p className="font-sans text-navy" style={{ fontSize: 'var(--fs-18)', lineHeight: 1.75, margin: 'var(--s-4) 0 0' }}>
                {g.resposta}
              </p>
              <ul
                className="font-sans"
                style={{
                  margin: 'var(--s-6) 0 0',
                  paddingLeft: '1.2em',
                  fontSize: 'var(--fs-15)',
                  lineHeight: 1.8,
                  color: 'var(--text-muted)',
                }}
              >
                {g.destaques.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <p className="font-sans" style={{ fontSize: 'var(--fs-12)', color: 'var(--text-faint)', margin: 'var(--s-6) 0 0' }}>
                Atualizado em <time dateTime={g.atualizadoEm}>{dataPorExtenso(g.atualizadoEm)}</time> · por {SITE_NAME}
              </p>
            </div>
          </div>

          {g.secoes.map((s) => (
            <div key={s.id} id={s.id} className="reveal scroll-mt-[100px]">
              <div className={s.tabela ? '' : 'max-w-[820px] mx-auto'}>
                <h2 className="font-display text-navy" style={{ ...H2, maxWidth: 900 }}>
                  {s.titulo}
                </h2>
                {s.paragrafos?.map((p, i) => (
                  <p
                    key={i}
                    className="font-sans text-navy"
                    style={{ fontSize: 'var(--fs-16)', lineHeight: 1.85, margin: 'var(--s-5) 0 0', maxWidth: 820 }}
                  >
                    {p}
                  </p>
                ))}
                {s.lista &&
                  (() => {
                    const Lista = s.listaOrdenada ? 'ol' : 'ul'
                    return (
                      <Lista
                        className="font-sans text-navy"
                        style={{ fontSize: 'var(--fs-16)', lineHeight: 1.85, margin: 'var(--s-5) 0 0', paddingLeft: '1.3em', maxWidth: 820 }}
                      >
                        {s.lista.map((item) => (
                          <li key={item} style={{ marginTop: 'var(--s-2)' }}>
                            {item}
                          </li>
                        ))}
                      </Lista>
                    )
                  })()}
                {s.tabela && <TabelaGuia tabela={s.tabela} />}
              </div>
            </div>
          ))}

          <div className="max-w-[820px] mx-auto w-full">
            <AutorBox />
          </div>

          {g.simulador && (
            <div id="simulador" className="reveal scroll-mt-[100px]">
              <h2 className="font-display text-navy text-center" style={{ ...H2, marginBottom: 'var(--s-10)' }}>
                {g.simulador.titulo}
              </h2>
              <AriSimulador
                capitalInicial={g.simulador.capital}
                prazoInicial={g.simulador.prazo}
                formaInicial={g.simulador.forma}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-3)', justifyContent: 'center', marginTop: 'var(--s-8)' }}>
                <QualificacaoCta />
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                  Falar no WhatsApp
                </a>
              </div>
              <p
                className="font-sans"
                style={{ fontSize: 'var(--fs-12)', color: 'var(--text-faint)', lineHeight: 1.6, marginTop: 'var(--s-5)', textAlign: 'center' }}
              >
                Simulação com base nas taxas estimadas do ARI. Rentabilidade passada não garante resultado futuro.
              </p>
            </div>
          )}
        </div>
      </section>

      {g.mostrarProtecoes && (
        <section className="section overflow-clip relative z-10" style={{ background: 'var(--navy-grad)' }}>
          <div aria-hidden className="navy-dots" />
          <div className="container relative reveal">
            <h2 className="font-display text-cream text-center" style={{ ...H2, marginBottom: 'var(--s-10)' }}>
              As três camadas de proteção
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ARI_PROTECOES.map((p) => (
                <div
                  key={p.n}
                  className="rounded-lg"
                  style={{
                    padding: 'var(--s-8)',
                    border: 'var(--line-1) solid rgba(236,235,231,0.14)',
                    background: 'rgba(236,235,231,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--s-3)',
                  }}
                >
                  <span className="font-display text-gold" style={{ fontSize: 'var(--fs-32)', fontWeight: 600, lineHeight: 1 }}>
                    {p.n}
                  </span>
                  <h3 className="font-display text-cream" style={{ fontSize: 'var(--fs-20)', fontWeight: 500, margin: 0 }}>
                    {p.title}
                  </h3>
                  <p className="font-sans" style={{ fontSize: 'var(--fs-14)', lineHeight: 1.7, color: 'rgba(236,235,231,0.75)', margin: 0 }}>
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section overflow-clip relative z-10" style={{ background: SUPERFICIE }}>
        <div aria-hidden className="claro-dots" />
        <div className="container relative" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-20)' }}>
          <div className="reveal">
            <h2 className="font-display text-navy text-center" style={{ ...H2, marginBottom: 'var(--s-10)' }}>
              Perguntas frequentes
            </h2>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <AriFaq items={g.faqs} />
            </div>
          </div>

          <div className="reveal" style={{ textAlign: 'center' }}>
            <h2 className="font-display text-navy" style={H2}>
              Fale com a equipe de estruturação
            </h2>
            <p
              className="font-sans"
              style={{ fontSize: 'var(--fs-16)', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: 560, margin: 'var(--s-5) auto var(--s-8)' }}
            >
              O ARI opera por seleção, em {ARI_CONDICOES.grupo}. Envie sua qualificação e a equipe
              avalia o seu perfil antes de apresentar a operação disponível.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-3)', justifyContent: 'center' }}>
              <QualificacaoCta />
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                Falar no WhatsApp
              </a>
              <Link href="/ari" className="btn btn--ghost">
                Conhecer o ARI
              </Link>
            </div>
          </div>

          <nav aria-labelledby="outros-guias" className="reveal">
            <h2 id="outros-guias" className="font-display text-navy" style={{ fontSize: 'var(--fs-20)', fontWeight: 500, margin: '0 0 var(--s-5)' }}>
              Outros guias do investidor
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relacionados.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${r.slug}`}
                  className="rounded-lg lift"
                  style={{
                    padding: 'var(--s-6)',
                    background: '#ffffff',
                    border: 'var(--line-1) solid rgba(0,16,49,0.1)',
                    textDecoration: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 'var(--s-3)',
                  }}
                >
                  <span className="font-display text-navy" style={{ fontSize: 'var(--fs-16)', fontWeight: 500 }}>
                    {r.nome}
                  </span>
                  <ArrowUpRight className="arrow text-navy" size={18} strokeWidth={2} aria-hidden />
                </Link>
              ))}
            </div>
          </nav>

          <p className="font-sans" style={{ fontSize: 'var(--fs-12)', color: 'var(--text-faint)', lineHeight: 1.6, textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            {ARI_AVISO_REGULATORIO}
          </p>
        </div>
      </section>
    </main>
  )
}
