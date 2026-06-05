import type { Metadata } from 'next'
import Link from 'next/link'
import AriForm from './AriForm'
import AriFaq from './AriFaq'
import AriSimulador from './AriSimulador'
import RouteHeroBg from '../components/RouteHeroBg'

export const metadata: Metadata = {
  title: 'ARI · Ativo de Renda Imobiliária — ARCK1PRO',
  description:
    'Invista com retornos de até 3% ao mês no litoral de Santa Catarina, isento de IR e com garantia real de 200% em ativos registrados em cartório.',
}

const metrics = [
  { value: '200%', label: 'de garantia real em ativos registrados em cartório' },
  { value: '0%', label: 'de IR sobre os rendimentos: o valor declarado já é líquido' },
  { value: 'R$ 50 mil', label: 'de aporte mínimo' },
  { value: '1,5% a 3%', label: 'de retorno ao mês' },
]

const protecoes = [
  {
    n: '01',
    title: 'Contrato regido pelo Código Civil',
    text: 'A estrutura de Sociedade em Conta de Participação (SCP) é regida pelo Código Civil Brasileiro. Seus direitos ficam formalizados em contrato, e não em prospectos.',
  },
  {
    n: '02',
    title: 'Garantia de 200% em unidades futuras',
    text: 'Cada participação é garantida por 200% do valor investido em unidades imobiliárias registradas em cartório no próprio empreendimento em que você investe.',
  },
  {
    n: '03',
    title: 'Imóvel físico reservado como garantia',
    text: 'Um imóvel físico de propriedade da incorporadora fica reservado como garantia no seu nome durante todo o prazo do contrato.',
  },
]

const mercado = [
  { value: '+132%', label: 'de valorização do m² de Porto Belo em 2 anos', fonte: 'DWV Inteligência de Mercado' },
  { value: '#1', label: 'Porto Belo liderou o Brasil em VGV lançado em 2024 (R$ 11,45 bi)', fonte: 'ABRAINC / GeoBrain' },
  { value: 'R$ 13,47 bi', label: 'em VGV em desenvolvimento ativo no litoral catarinense', fonte: 'DWV Inteligência de Mercado' },
  { value: '100x', label: 'Porto Belo multiplicou o mercado imobiliário em 4 anos', fonte: 'ABRAINC / GeoBrain' },
]

const faqs = [
  {
    q: 'O ARI é um investimento seguro?',
    a: 'Sim. O ARI conta com três camadas de proteção: contrato regido pelo Código Civil, garantia de 200% em unidades futuras do empreendimento em que você investe e um imóvel físico de propriedade da incorporadora reservado como garantia no seu nome.',
  },
  {
    q: 'O rendimento é realmente isento de IR?',
    a: 'Sim. A operação é estruturada para se enquadrar nas regras legais que permitem a isenção de Imposto de Renda sobre os rendimentos. É o enquadramento correto da operação, e o rendimento declarado já é o rendimento líquido.',
  },
  {
    q: 'Qual a diferença entre retorno mensal e no final?',
    a: 'No retorno mensal, você recebe o rendimento todo mês durante o prazo contratado. No retorno no final, o capital e todo o rendimento são pagos de uma só vez no vencimento, e por isso o retorno aplicado é superior.',
  },
  {
    q: 'Qual o aporte mínimo?',
    a: 'O aporte mínimo é de R$ 50.000. Investidores com aportes maiores podem negociar condições específicas com a equipe de estruturação.',
  },
  {
    q: 'Preciso de experiência com mercado imobiliário?',
    a: 'Não. O ARI foi estruturado para o investidor que compreende o valor do litoral catarinense e prefere não operar diretamente no mercado. A ARCK1PRO cuida de toda a estruturação, governança e gestão do empreendimento.',
  },
  {
    q: 'O que é a ARCK1PRO?',
    a: 'A ARCK1PRO é a estruturadora do ecossistema, o hub de método, capital intelectual e governança que viabiliza empreendimentos de alto padrão no litoral catarinense. Funciona como o motor operacional que estrutura cada empreendimento do terreno ao lançamento, com método próprio desenvolvido em mais de vinte anos de atuação na região. O ARI é o instrumento de capital criado pela ARCK1PRO para financiar a fase mais estratégica desse ciclo.',
  },
]

export default function AriPage() {
  return (
    <main
      style={{
        marginTop: '-74px',
        position: 'relative',
        background: 'var(--brand-navy)',
      }}
    >
      <RouteHeroBg />
      {/* DOBRA 1 — Hero */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '75svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'calc(74px + var(--s-12)) var(--s-6) var(--s-16)',
          textAlign: 'center',
        }}
      >
        
        <h1
          className="font-display text-cream lg:text-5xl text-4xl"
          style={{ fontWeight: 700, lineHeight: 1.12, margin: 0, maxWidth: 900, marginInline: 'auto' }}
        >
          Invista com retornos de até 3% ao mês no litoral de Santa Catarina,{' '}
          <span className="text-gold-hero">isento de IR</span>
        </h1>
        <div className='m-10'  style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-3)', justifyContent: 'center' }}>
          <Link href="#formulario" className="btn btn--gold">
            Quero saber mais <span className="arrow">→</span>
          </Link>
          <a href="#o-que-e" className="btn btn--ghost-inv">
            Entenda o ativo ↓
          </a>
        </div>
      </div>

      <section
        className="section rounded-4xl overflow-clip relative z-10"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 100% 100%, rgba(0,16,49,0.13) 0%, transparent 100%), var(--surface)',
          paddingTop: 'var(--s-20)',
        }}
      >
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-24)' }}>
          {/* DOBRA 2 — O que é o ARI */}
          <div id="o-que-e" style={{ scrollMarginTop: 100 }}>
            <div className="grid grid-cols-1 text-center gap-8 items-start" style={{ marginBottom: 'var(--s-10)' }}>
              <div className="lg:col-span-5">
                <h2
                  className="font-display text-navy"
                  style={{ fontSize: 'var(--fs-32)', fontWeight: 300, lineHeight: 1.2, margin: 0 }}
                >
                  Uma estrutura de investimento diferente de tudo que você conhece
                </h2>
              </div>
              <div
                className="lg:col-span-7 font-sans"
                style={{ fontSize: 'var(--fs-16)', lineHeight: 1.85, color: 'var(--text)' }}
              >
                <p style={{ margin: '0 0 var(--s-5)' }}>
                  No ARI, Ativo de Renda Imobiliária, você entra como sócio participante de um
                  empreendimento no litoral de Santa Catarina e recebe retorno prefixado proporcional
                  à performance do projeto. Você participa do resultado e também do processo de
                  geração de valor, com previsibilidade e alinhamento direto com quem executa a obra.
                </p>
                <p style={{ margin: '0 0 var(--s-5)' }}>
                  O ARI é capital direto com lastro real. Cada participação é garantida por 200% do
                  valor investido em unidades imobiliárias registradas em cartório, uma proteção que
                  um CRI, FII ou debênture dificilmente oferece da mesma forma.
                </p>
                <p style={{ margin: 0 }}>
                  O rendimento de 1,5% a 3% ao mês é isento de Imposto de Renda pelo enquadramento
                  legal da estrutura. O valor declarado já é o rendimento líquido.
                </p>
              </div>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-4xl lift"
                  style={{
                    padding: 'var(--s-8)',
                    textAlign: 'center',
                    border: 'var(--line-1) solid rgba(0,16,49,0.1)',
                    background: '#ffffff',
                  }}
                >
                  <p
                    className="font-display text-gold"
                    style={{ fontSize: 'var(--fs-32)', fontWeight: 600, lineHeight: 1, margin: 0 }}
                  >
                    {m.value}
                  </p>
                  <p
                    className="font-sans"
                    style={{ fontSize: 'var(--fs-13)', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: 'var(--s-3)' }}
                  >
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DOBRA 3 — Simulação */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: 'var(--s-10)' }}>
              <h2
                className="font-display text-navy"
                style={{ fontSize: 'var(--fs-32)', fontWeight: 300, lineHeight: 1.2, margin: 0 }}
              >
                Simule o seu retorno
              </h2>
            </div>

            <AriSimulador />

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--s-8)' }}>
              <Link href="#formulario" className="btn btn--gold">
                Quero investir <span className="arrow">→</span>
              </Link>
            </div>

            <p
              className="font-sans"
              style={{ fontSize: 'var(--fs-12)', color: 'var(--text-faint)', lineHeight: 1.6, marginTop: 'var(--s-5)', textAlign: 'center' }}
            >
              Simulação com base nas taxas estimadas do ARI. Rentabilidade passada não garante
              resultado futuro. Valores arredondados para fins ilustrativos.
            </p>
          </div>

          {/* DOBRA 4 — Três camadas de proteção */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: 'var(--s-10)' }}>
              <h2
                className="font-display text-navy"
                style={{ fontSize: 'var(--fs-32)', fontWeight: 300, lineHeight: 1.2, margin: '0 0 var(--s-3)' }}
              >
                O ARI é um investimento seguro
              </h2>
              <p className="font-sans" style={{ fontSize: 'var(--fs-15)', color: 'var(--text-muted)', margin: 0 }}>
                Três camadas de proteção independentes, formalizadas em contrato.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {protecoes.map((p) => (
                <div
                  key={p.n}
                  className="rounded-4xl lift"
                  style={{
                    padding: 'var(--s-8)',
                    border: 'var(--line-1) solid rgba(0,16,49,0.1)',
                    background: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--s-3)',
                  }}
                >
                  <span className="font-display text-gold" style={{ fontSize: 'var(--fs-32)', fontWeight: 600, lineHeight: 1 }}>
                    {p.n}
                  </span>
                  <h3 className="font-display text-navy" style={{ fontSize: 'var(--fs-20)', fontWeight: 500, margin: 0 }}>
                    {p.title}
                  </h3>
                  <p className="font-sans" style={{ fontSize: 'var(--fs-14)', lineHeight: 1.7, color: 'var(--text-muted)', margin: 0 }}>
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DOBRA 5 — O mercado */}
          <div>
            <div className="grid text-center grid-cols-1 gap-8 items-end" style={{ marginBottom: 'var(--s-10)' }}>
              <div >
                <h2
                  className="font-display text-navy"
                  style={{ fontSize: 'var(--fs-40)', fontWeight: 400, lineHeight: 1.1, margin: 0 }}
                >
                  O litoral que não para de crescer
                </h2>
              </div>
              <div className="lg:col-span-5 lg:order-1 font-sans" style={{ fontSize: 'var(--fs-15)', lineHeight: 1.8, color: 'var(--text-muted)' }}>
                <p style={{ margin: 0 }}>
                  O investidor que compreendeu o litoral catarinense uma década atrás colheu
                  resultados bem acima da média do mercado financeiro. O ARI estrutura exatamente essa
                  exposição, com previsibilidade de retorno e proteção real do capital.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mercado.map((d) => (
                <div
                  key={d.label}
                  className="rounded-4xl lift"
                  style={{
                    padding: 'var(--s-8)',
                    border: 'var(--line-1) solid rgba(0,16,49,0.1)',
                    background: '#ffffff',
                  }}
                >
                  <p className="font-display text-gold" style={{ fontSize: 'var(--fs-32)', fontWeight: 600, lineHeight: 1, margin: 0 }}>
                    {d.value}
                  </p>
                  <p className="font-sans text-navy" style={{ fontSize: 'var(--fs-15)', lineHeight: 1.6, margin: 'var(--s-3) 0 var(--s-3)' }}>
                    {d.label}
                  </p>
                  <p
                    className="font-mono"
                    style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)' }}
                  >
                    Fonte: {d.fonte}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DOBRA 6 — FAQ */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: 'var(--s-10)' }}>
              <h2
                className="font-display text-navy"
                style={{ fontSize: 'var(--fs-32)', fontWeight: 300, lineHeight: 1.2, margin: '0 0 var(--s-3)' }}
              >
                Tire suas dúvidas
              </h2>
              <p className="font-sans" style={{ fontSize: 'var(--fs-15)', color: 'var(--text-muted)', margin: 0, maxWidth: 560, marginInline: 'auto' }}>
                Se a sua pergunta não estiver aqui, preencha o formulário abaixo e nossa equipe entra
                em contato.
              </p>
            </div>

            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <AriFaq items={faqs} />
            </div>
          </div>

          {/* DOBRA 7 — Formulário */}
          <div id="formulario" style={{ scrollMarginTop: 100 }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5">
                <h2
                  className="font-display text-navy"
                  style={{ fontSize: 'var(--fs-32)', fontWeight: 300, lineHeight: 1.2, margin: '0 0 var(--s-4)' }}
                >
                  Assuma a sua posição no litoral de SC
                </h2>
                <p className="font-sans" style={{ fontSize: 'var(--fs-16)', lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 var(--s-5)' }}>
                  Preencha o formulário e nossa equipe entrará em contato com você imediatamente.
                </p>
                <p className="font-sans" style={{ fontSize: 'var(--fs-13)', lineHeight: 1.6, color: 'var(--text-faint)', margin: 0 }}>
                  Ao enviar, você concorda em receber contato da equipe ARCK1PRO. Seus dados não são
                  compartilhados com terceiros.
                </p>
              </div>

              <div className="lg:col-span-7">
                <AriForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
