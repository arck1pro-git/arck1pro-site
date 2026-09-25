import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import RouteHero from '../components/RouteHero'
import SimuladorTabela from './SimuladorTabela'
import BreadcrumbJsonLd from '@/app/components/BreadcrumbJsonLd'
import Link from 'next/link'
import AriFaq from '@/app/ari/AriFaq'
import { ARI_FAQS } from '@/lib/ari-conteudo'
import { PRAZOS, taxaPara, taxaPct } from '@/lib/ari-taxas'
import { GUIAS, GUIA_SLUGS } from '@/lib/guias'
import { SITE_URL, jsonLdString } from '@/lib/site'

// Faixas de aporte da tabela oficial (teto inclusivo, ver lib/ari-taxas). As
// taxas são lidas da mesma função do simulador, nunca digitadas aqui.
const FAIXAS = [
  { rotulo: 'Até R$ 100 mil', capital: 100_000 },
  { rotulo: 'De R$ 100 mil a R$ 200 mil', capital: 200_000 },
  { rotulo: 'De R$ 200 mil a R$ 400 mil', capital: 400_000 },
  { rotulo: 'Acima de R$ 400 mil', capital: 400_001 },
]

const FAQS = ARI_FAQS.filter((f) =>
  ['Qual a diferença entre retorno mensal', 'O rendimento é realmente isento', 'Qual o aporte mínimo', 'O ARI é um investimento seguro'].some((q) =>
    f.q.startsWith(q),
  ),
)

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/simulador#faq`,
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export const metadata: Metadata = pageMetadata({
  title: 'Simulador do ARI: Calcule seu Retorno · ARCK1PRO',
  description:
    'Simule o retorno do Ativo de Renda Imobiliária da ARCK1PRO por capital, prazo e forma de recebimento. Rendimento isento de Imposto de Renda.',
  path: '/simulador',
})

// Página de uma coisa só: o simulador, sem as dobras de explicação que o /ari
// tem em volta dele. É uma variante do componente, e não o mesmo: aqui o prazo
// sai dos controles e os três aparecem juntos numa tabela. Serve para mandar o
// link direto a quem já entendeu o produto e só quer ver número.
//
// A hero é a mesma das demais rotas. Ela ocupa a primeira dobra inteira, então
// o simulador nasce abaixo dela — quem chegar pelo link precisa de uma rolagem
// para ver o campo. Em compensação o topo é escuro, que é o que o header pede:
// ele é creme nos dois estados e só ganha fundo depois de 24px de rolagem.
export default function SimuladorPage() {
  return (
    <main
      style={{
        marginTop: 'calc(var(--header-h) * -1)',
        position: 'relative',
        background: 'var(--brand-navy)',
      }}
    >
      <BreadcrumbJsonLd items={[{ name: 'Simulador', path: '/simulador' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(faqJsonLd) }} />
      <RouteHero
        escala="grande"
        titulo={
          <>
            Simule o seu{' '}
            <span className="text-gold-hero font-serif-italic font-normal">retorno</span>
          </>
        }
      />

      <section
        className="section overflow-clip relative z-10"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 100% 100%, rgba(0,16,49,0.13) 0%, transparent 100%), var(--surface)',
        }}
      >
        <div aria-hidden className="claro-dots" />

        {/* Bem mais estreito que o .container de 1280px: o conteúdo é um campo,
            um par de botões e uma tabela de cinco colunas. Na largura cheia a
            tabela espalhava os números pela tela e o slider virava uma régua de
            um metro. O piso de 680px da .cmp continua cabendo aqui dentro. */}
        <div className="container relative" style={{ maxWidth: 900 }}>
          <SimuladorTabela />

          {/* Como o cálculo funciona: a tabela oficial por faixa e prazo. */}
          <div style={{ marginTop: 'var(--s-24)' }}>
            <h2 className="font-display text-navy" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 300, lineHeight: 1.15, margin: 0 }}>
              Como a simulação é calculada
            </h2>
            <p className="font-sans text-navy" style={{ fontSize: 'var(--fs-16)', lineHeight: 1.85, margin: 'var(--s-5) 0 0' }}>
              O retorno do ARI é calculado em juros simples sobre o capital. A taxa ao mês depende
              da faixa de aporte e do prazo. No retorno no final, capital e rendimento são pagos no
              vencimento, com meio ponto percentual a mais por mês em relação ao retorno mensal.
            </p>
            <figure style={{ margin: 'var(--s-8) 0 0' }}>
              <div className="cmp-wrap">
                <table className="cmp">
                  <caption className="sr-only">Taxa ao mês do ARI por faixa de aporte e prazo, retorno mensal e no final</caption>
                  <thead>
                    <tr>
                      <th scope="col">Faixa de aporte</th>
                      {PRAZOS.map((p) => (
                        <th key={p} scope="col">{p} meses</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {FAIXAS.map((f) => (
                      <tr key={f.rotulo}>
                        <th scope="row">{f.rotulo}</th>
                        {PRAZOS.map((p) => (
                          <td key={p}>
                            {taxaPct(taxaPara('mensal', p, f.capital))} mensal
                            <br />
                            {taxaPct(taxaPara('final', p, f.capital))} no final
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <figcaption className="font-sans" style={{ fontSize: 'var(--fs-12)', color: 'var(--text-faint)', lineHeight: 1.6, marginTop: 'var(--s-3)' }}>
                Taxas estimadas ao mês, definidas em contrato. Rentabilidade passada não garante resultado futuro.
              </figcaption>
            </figure>
          </div>

          <div style={{ marginTop: 'var(--s-24)' }}>
            <h2 className="font-display text-navy" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 300, lineHeight: 1.15, margin: '0 0 var(--s-8)' }}>
              Perguntas frequentes
            </h2>
            <AriFaq items={FAQS} />
          </div>

          <nav aria-label="Guias do investidor" style={{ marginTop: 'var(--s-16)' }}>
            <p className="font-sans" style={{ fontSize: 'var(--fs-15)', color: 'var(--text-muted)', margin: '0 0 var(--s-4)' }}>
              Quer entender antes de simular?{' '}
              <Link href="/ari" className="text-navy" style={{ textDecoration: 'underline' }}>Conheça o ARI</Link> ou leia os guias:
            </p>
            <ul className="font-sans" style={{ margin: 0, paddingLeft: '1.2em', lineHeight: 1.9, fontSize: 'var(--fs-15)' }}>
              {GUIA_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link href={`/${slug}`} className="text-navy" style={{ textDecoration: 'underline' }}>{GUIAS[slug].nome}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </main>
  )
}
