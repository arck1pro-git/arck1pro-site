import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import RouteHeroBg from '../components/RouteHeroBg'

export const metadata: Metadata = {
  title: 'Sobre — Método, Ecossistema e Governança',
  description:
    'De escritório de projetos a ecossistema imobiliário: a história, o método próprio e a governança da ARCK1PRO. Autoridade técnica construída em vinte anos no litoral catarinense.',
  alternates: { canonical: '/sobre' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'ARCK1PRO',
    url: '/sobre',
    title: 'Sobre a ARCK1PRO — Método, Ecossistema e Governança',
    description:
      'A história, o método próprio e a governança da ARCK1PRO. Vinte anos de prática no litoral catarinense.',
    images: ['/hero.png'],
  },
}

const timeline = [
  {
    year: '2006',
    title: 'Desenvolvimento imobiliário',
    text: 'Início da jornada com a especialização no desenvolvimento de projetos de alto padrão.',
  },
  {
    year: '2008',
    title: 'Obra',
    text: 'Acompanhamento de obra, mobília e decoração de empreendimentos residenciais e comerciais.',
  },
  {
    year: '2018',
    title: 'Estruturação de negócios imobiliários',
    text: 'Estruturação do planejamento de marketing para empreendimentos e negociação de áreas estratégicas para incorporação.',
  },
  {
    year: '2020',
    title: 'Representação de fornecedores',
    text: 'Início da representação de fornecedores para obras, otimizando custos e logística para nossos parceiros.',
  },
  {
    year: '2021',
    title: 'Consultoria e gestão comercial',
    text: 'Lançamento da consultoria Incorphore Pro e do serviço de treinamento e gestão de times comerciais.',
  },
  {
    year: '2024',
    title: 'ARI · Ativo de Renda Imobiliária',
    text: 'Estruturação do Ativo de Renda Imobiliária, conectando investidores e incorporadores.',
  },
]

const ecossistema = [
  {
    name: 'ARCK1PRO',
    role: 'Hub central',
    text: 'O método, o capital intelectual e a governança do ecossistema. É o cérebro operacional de cada empreendimento, da tese de terreno ao registro da incorporação.',
  },
  {
    name: 'ARI',
    role: 'Motor de capital',
    text: 'Capta recursos de investidores para financiar a pré-incorporação. Estruturado como SCP, com retornos de 1,5% a 3% ao mês, garantia real em unidades registradas e isenção de IR para pessoa física.',
  },
  {
    name: 'Harpaluus',
    role: 'Incorporadora executora',
    text: 'Executa e assina os empreendimentos. Recebe da ARCK1PRO toda a estruturação técnica, jurídica e comercial, e é o rosto dos projetos para compradores e mercado.',
  },
  {
    name: 'Instituto Futurus',
    role: 'Braço comercial',
    text: 'Plataforma de capacitação de corretores autônomos. Forma profissionais especializados em vendas de alto valor no litoral catarinense, com foco no mercado de Porto Belo.',
  },
]

const pilares = [
  {
    title: 'Método próprio',
    text: 'Cinco etapas de negociação de terrenos com 50% de fechamento, BIM, ARI e processo documentado de ponta a ponta.',
  },
  {
    title: 'Capital estruturado',
    text: 'O ARI financia a pré-incorporação e elimina a dependência de banco na fase de maior retorno do ciclo.',
  },
  {
    title: 'Mercado estratégico',
    text: 'Porto Belo soma força natural de venda, cidades vizinhas consagradas e uma lacuna de profissionalismo pronta para ser ocupada.',
  },
  {
    title: 'Legado inteligente',
    text: 'Smart buildings, neuroarquitetura e sustentabilidade. Ativos que valem mais e se mantêm relevantes por décadas.',
  },
]

function FounderPhoto({
  src,
  name,
  role,
}: {
  src?: string
  name: string
  role: string
}) {
  return (
    <div
      className="rounded-4xl overflow-clip lift"
      style={{
        position: 'relative',
        aspectRatio: '4 / 5',
        background: 'var(--brand-navy)',
        border: 'var(--line-1) solid rgba(0,16,49,0.1)',
      }}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={`${name}, ${role}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,16,49,0.6) 0%, transparent 45%)',
            }}
          />
        </>
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            className="font-display text-base"
            style={{
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(236,235,231,0.4)',
            }}
          >
            Foto em breve
          </span>
        </div>
      )}
      <div style={{ position: 'absolute', left: 'var(--s-6)', bottom: 'var(--s-6)' }}>
        <p className="font-carla text-cream" style={{ fontSize: 'var(--fs-24)', lineHeight: 1 }}>
          {name}
        </p>
        <p
          className="font-display text-base"
          style={{
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--brand-gold-soft)',
            marginTop: 'var(--s-2)',
          }}
        >
          {role}
        </p>
      </div>
    </div>
  )
}

export default function SobrePage() {
  return (
    <main
      style={{
        marginTop: '-74px',
        position: 'relative',
        background: 'var(--brand-navy)',
      }}
    >
      <RouteHeroBg />
      {/* DOBRA 1 — Abertura */}
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
        <p
          className="font-display text-gold-soft text-base"
          style={{ letterSpacing: '0.15em', marginBottom: 'var(--s-3)' }}
        >
          Nossa História
        </p>
        <h1
          className="font-display text-cream lg:text-5xl text-4xl"
          style={{ fontWeight: 700, lineHeight: 1.15, margin: 0, maxWidth: 880, marginInline: 'auto' }}
        >
          De escritório de projetos a <span className="text-gold-hero">ecossistema imobiliário</span>
        </h1>
        <p
          className="font-sans"
          style={{
            fontSize: 'var(--fs-16)',
            lineHeight: 1.7,
            color: 'rgba(236,235,231,0.7)',
            maxWidth: 600,
            margin: 'var(--s-5) auto 0',
          }}
        >
          A história de dois arquitetos que passaram anos estruturando o mercado imobiliário para
          terceiros e decidiram aplicar o mesmo método em projetos próprios.
        </p>
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
          {/* DOBRA 2 — Os fundadores */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: 'var(--s-12)' }}>
              <p
                className="font-display text-gold text-base"
                style={{ letterSpacing: '0.15em', marginBottom: 'var(--s-3)' }}
              >
                Os fundadores
              </p>
              <h2
                className="font-display text-4xl lg:text-6xl font-bold text-navy"
              >
                Duas jornadas, um ecossistema
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Fabrício */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-6)' }}>
                <FounderPhoto src="/fabhricio.png" name="Fabhrício ARI" role="Fundador · Arquiteto" />
                <div
                  className="font-sans"
                  style={{ fontSize: 'var(--fs-15)', lineHeight: 1.8, color: 'var(--text)' }}
                >
                  <p style={{ margin: '0 0 var(--s-4)' }}>
                    Fabrício Pavesi Junior cresceu dentro do mercado da construção civil. Desde cedo
                    enxergou o projeto arquitetônico como ponto de partida de um negócio maior, e
                    formou-se arquiteto para atuar ao lado de incorporadores do litoral catarinense,
                    acompanhando de perto como os empreendimentos nascem, travam e prosperam.
                  </p>
                  <p style={{ margin: '0 0 var(--s-4)' }}>
                    Por anos estruturou incorporações para terceiros. Encontrava o terreno certo,
                    desenhava o produto que o mercado pedia e conduzia a captação de capital na fase
                    mais crítica. O método já estava completo, mas o resultado ficava com quem o
                    contratava.
                  </p>
                  <p style={{ margin: 0 }}>
                    Com a especialização em incorporação imobiliária, passou a orientar incorporadores
                    de todo o Brasil interessados em atuar no litoral de Santa Catarina. A ARCK1PRO
                    começou como escritório de projetos e logo se tornou consultoria estratégica para
                    quem queria crescer na região.
                  </p>
                </div>
              </div>

              {/* Patrícia */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-6)' }}>
                <FounderPhoto name="Patrícia" role="Cofundadora · Arquiteta" />
                <div
                  className="font-sans"
                  style={{ fontSize: 'var(--fs-15)', lineHeight: 1.8, color: 'var(--text)' }}
                >
                  <p style={{ margin: '0 0 var(--s-4)' }}>
                    Patrícia construiu sua carreira na arquitetura com foco em gestão e viabilidade.
                    Para ela, um bom projeto é aquele que fecha conta, conquista aprovação e viabiliza
                    o lançamento. Essa leitura de processo complementa a visão de mercado de Fabrício.
                  </p>
                  <p style={{ margin: '0 0 var(--s-4)' }}>
                    Ao se unir a ele, trouxe rigor operacional para o que antes era intuição e método
                    informal. Juntos passaram a documentar, testar e refinar cada etapa, da negociação
                    do terreno ao lançamento.
                  </p>
                  <p style={{ margin: 0 }}>
                    A experiência acumulada virou processo, e o processo virou um método proprietário
                    que hoje sustenta todo o ecossistema.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DOBRA 2 — Linha do tempo */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: 'var(--s-12)' }}>
              <p
                className="font-display text-gold text-base"
                style={{ letterSpacing: '0.15em', marginBottom: 'var(--s-3)' }}
              >
                A trajetória
              </p>
              <h2
                className="font-display text-4xl lg:text-6xl font-bold text-navy"
              >
                Os marcos que definiram a ARCK1PRO
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4"
                  style={{
                    padding: 'var(--s-8) 0',
                    borderTop: i === 0 ? 'none' : 'var(--hairline) solid rgba(0,16,49,0.1)',
                  }}
                >
                  <div className="md:col-span-3">
                    <p
                      className="font-display text-gold"
                      style={{ fontSize: 'var(--fs-32)', fontWeight: 600, lineHeight: 1, margin: 0 }}
                    >
                      {item.year}
                    </p>
                  </div>
                  <div className="md:col-span-9">
                    <h3
                      className="font-display text-navy"
                      style={{ fontSize: 'var(--fs-20)', fontWeight: 500, margin: '0 0 var(--s-2)' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="font-sans"
                      style={{
                        fontSize: 'var(--fs-15)',
                        lineHeight: 1.75,
                        color: 'var(--text-muted)',
                        margin: 0,
                        maxWidth: 680,
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DOBRA 3 — O que é a ARCK1PRO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <p
                className="font-display text-gold text-base"
                style={{ letterSpacing: '0.15em', marginBottom: 'var(--s-3)' }}
              >
                O que é a ARCK1PRO
              </p>
              <h2
                className="font-display text-4xl font-bold text-navy"
              >
                Somos o método por trás de cada empreendimento
              </h2>
            </div>
            <div
              className="lg:col-span-8 font-sans"
              style={{ fontSize: 'var(--fs-16)', lineHeight: 1.85, color: 'var(--text)' }}
            >
              <p style={{ margin: '0 0 var(--s-5)' }}>
                A ARCK1PRO é o hub de inteligência e estruturação que viabiliza empreendimentos de
                alto padrão no litoral catarinense, do terreno ao lançamento.
              </p>
              <p style={{ margin: '0 0 var(--s-5)' }}>
                O mercado tradicional opera com gargalos: terrenos sem estrutura, capital escasso,
                projetos amadores e vendas mal conduzidas. A ARCK1PRO resolve cada um desses pontos
                com método próprio, capital inteligente e um ecossistema integrado.
              </p>
              <p style={{ margin: 0 }}>
                Trabalhamos exclusivamente para o nosso ecossistema. É assim que o método se mantém
                intacto e a qualidade se repete em cada projeto.
              </p>
            </div>
          </div>

          {/* Propósito — destaque navy */}
          <div
            className="rounded-4xl lift"
            style={{
              background: 'var(--brand-navy)',
              color: 'var(--brand-cream)',
              padding: 'var(--s-16) var(--s-10)',
              textAlign: 'center',
            }}
          >
            <p
              className="font-display"
              style={{
                fontSize: 'var(--fs-24)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.5,
                margin: '0 auto',
                maxWidth: 760,
              }}
            >
              Estruturar o futuro de quem constrói, garantindo que capital, projeto e método trabalhem
              juntos para transformar o litoral catarinense no maior polo de incorporação inteligente
              do Brasil.
            </p>
          </div>

          {/* DOBRA 5 — Missão e Visão */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              {
                label: 'Missão',
                text: 'Estruturar empreendimentos de alto padrão com método próprio, da identificação do terreno ao registro da incorporação, captando capital inteligente pelo ARI e transformando cada projeto em um ativo de referência no litoral catarinense.',
              },
              {
                label: 'Visão',
                text: 'Ser reconhecida como o maior ecossistema de estruturação de incorporação imobiliária do Brasil, com R$ 3 bilhões em VGV estruturado para incorporadoras do grupo e dezenas de empreendimentos tecnológicos e sustentáveis que redefinam o padrão de moradia e investimento no litoral catarinense.',
              },
            ].map((b) => (
              <div
                key={b.label}
                className="rounded-4xl lift"
                style={{
                  padding: 'var(--s-10) var(--s-8)',
                  border: 'var(--line-1) solid rgba(0,16,49,0.1)',
                  background: '#ffffff',
                }}
              >
                <p
                  className="font-display text-gold text-base"
                  style={{
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--s-4)',
                  }}
                >
                  {b.label}
                </p>
                <p
                  className="font-display text-navy"
                  style={{ fontSize: 'var(--fs-20)', fontWeight: 300, lineHeight: 1.55, margin: 0 }}
                >
                  {b.text}
                </p>
              </div>
            ))}
          </div>

          {/* DOBRA 6 — Os pilares */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: 'var(--s-10)' }}>
              <p
                className="font-display text-gold text-base"
                style={{ letterSpacing: '0.15em', marginBottom: 'var(--s-3)' }}
              >
                Os quatro pilares
              </p>
              <h2
                className="font-display text-4xl lg:text-6xl font-bold text-navy"
              >
                Os princípios que guiam produto, comunicação e crescimento
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pilares.map((p, i) => (
                <div
                  key={p.title}
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
                  <span className="font-display text-gold" style={{ fontSize: 'var(--fs-13)' }}>
                    0{i + 1}
                  </span>
                  <h3
                    className="font-display text-navy"
                    style={{ fontSize: 'var(--fs-20)', fontWeight: 500, margin: 0 }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="font-sans"
                    style={{ fontSize: 'var(--fs-14)', lineHeight: 1.7, color: 'var(--text-muted)', margin: 0 }}
                  >
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DOBRA 7 — CTA */}
          <div style={{ textAlign: 'center' }}>
            <h2
              className="font-display text-4xl font-bold 
 text-navy"
            >
              Quer entender o ecossistema por dentro?
            </h2>
            <p
              className="font-display"
              style={{
                fontSize: 'var(--fs-15)',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                maxWidth: 520,
                margin: '0 auto var(--s-8)',
              }}
            >
              Conheça o ARI, o Tourmaline Tower ou fale direto com a equipe.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-3)', justifyContent: 'center' }}>
              <Link href="/ari" className="btn btn--gold">
                Conhecer o ARI <span className="arrow">→</span>
              </Link>
              <Link href="/empreendimentos" className="btn btn--ghost">
                Ver o Tourmaline Tower <span className="arrow">→</span>
              </Link>
              <Link href="/contato" className="btn btn--ghost">
                Fale com a equipe <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
