import type { Metadata } from 'next'
import RouteHero from '../components/RouteHero'
import SimuladorTabela from './SimuladorTabela'

export const metadata: Metadata = {
  title: 'Simulador do ARI · ARCK1PRO',
  description:
    'Simule o retorno do Ativo de Renda Imobiliária da ARCK1PRO por capital, prazo e forma de recebimento. Rendimento isento de Imposto de Renda.',
  alternates: { canonical: '/simulador' },
}

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
        </div>
      </section>
    </main>
  )
}
