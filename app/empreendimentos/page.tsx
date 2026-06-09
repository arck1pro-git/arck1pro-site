import type { Metadata } from 'next'
import Link from 'next/link'
import RouteHeroBg from '../components/RouteHeroBg'

export const metadata: Metadata = {
  title: 'Empreendimentos · ARCK1PRO',
  description:
    'Tourmaline Tower e o portfólio da ARCK1PRO: empreendimentos de alto padrão no litoral catarinense.',
}

const specs = [
  { label: 'Localização', value: 'Porto Belo — SC' },
  { label: 'Tipologia', value: 'Residencial alto padrão' },
  { label: 'Status', value: 'Em estruturação' },
  { label: 'Tecnologia', value: 'Sistema integrado do prédio' },
]

const numeros = [
  { value: '1º', label: 'edifício inteligente de Porto Belo' },
  { value: '+18', label: 'meses para o retorno-alvo do investimento' },
  { value: '100%', label: 'da operação do prédio em um só sistema' },
]

const portfolio: { name: string; local: string; src: string; objectPosition?: string }[] = [
  { name: 'Alameda', local: 'Itapema — SC', src: '/alameda1.jpg' },
  { name: 'Atmohaus', local: 'Balneário Camboriú — SC', src: '/atmohaus1.jpg' },
  { name: 'Capri', local: 'Porto Belo — SC', src: '/capri1.jpeg', objectPosition: 'right' },
  { name: 'Carolina', local: 'Bombinhas — SC', src: '/carolina1.jpg' },
  { name: 'Erenita', local: 'Itapema — SC', src: '/erenita1.jpg' },
  { name: 'Paradise', local: 'Porto Belo — SC', src: '/paradise1.jpg' },
]

export default function EmpreendimentosPage() {
  return (
    <main
      style={{
        marginTop: '-74px',
        position: 'relative',
        background: 'var(--brand-navy)',
      }}
    >
      <RouteHeroBg />
      {/* Hero sobre a imagem do footer */}
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
          className="font-mono text-gold-soft"
          style={{ fontSize: 'var(--fs-12)', letterSpacing: '0.15em', marginBottom: 'var(--s-3)' }}
        >
          Empreendimentos
        </p>
        <h1
          className="font-display text-cream lg:text-5xl text-4xl"
          style={{ fontWeight: 700, lineHeight: 1.15, margin: 0, maxWidth: 860, marginInline: 'auto' }}
        >
          Imóveis de alto padrão no <span className="text-gold-hero">litoral catarinense</span>
        </h1>
        <p
          className="font-sans"
          style={{
            fontSize: 'var(--fs-16)',
            lineHeight: 1.7,
            color: 'rgba(236,235,231,0.7)',
            maxWidth: 560,
            margin: 'var(--s-5) auto 0',
          }}
        >
          Cuidamos de cada empreendimento do começo ao fim, da análise do terreno à gestão do
          investimento.
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
          {/* Destaque — Tourmaline (imagem + overlay no desktop, texto abaixo no mobile) */}
          <div>
            <div
              className="tm-hero rounded-4xl overflow-clip"
              style={{ position: 'relative', aspectRatio: '16 / 9', background: 'var(--brand-navy)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="tm-hero__img"
                src="/tourmaline%20perspectiva.png"
                alt="Tourmaline Tower — perspectiva"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div
                className="tm-hero__overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(90deg, rgba(0,16,49,0.85) 0%, rgba(0,16,49,0.45) 55%, rgba(0,16,49,0.1) 100%)',
                }}
              />
              <div
                className="tm-hero__content"
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 'clamp(var(--s-6), 5vw, var(--s-12))',
                  maxWidth: 640,
                }}
              >
                <h2
                  className="font-display"
                  style={{
                    fontSize: 'clamp(var(--fs-32), 5vw, var(--fs-56))',
                    fontWeight: 700,
                    lineHeight: 1.05,
                    color: '#fff',
                    margin: '0 0 var(--s-4)',
                  }}
                >
                  Tourmaline Tower
                </h2>
                <p
                  className="font-sans"
                  style={{
                    fontSize: 'var(--fs-15)',
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.8)',
                    margin: '0 0 var(--s-6)',
                  }}
                >
                  O primeiro edifício inteligente de Porto Belo, com um sistema que controla e integra
                  toda a operação do prédio.
                </p>
                <Link href="/contato" className="btn btn--gold" style={{ width: 'fit-content' }}>
                  Solicitar acesso <span className="arrow">→</span>
                </Link>
              </div>
            </div>

            {/* Mobile — texto e botão abaixo da imagem, em azul */}
            <div className="lg:hidden" style={{ marginTop: 'var(--s-6)' }}>
              <h2
                className="font-display"
                style={{
                  fontSize: 'var(--fs-32)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: 'var(--brand-navy)',
                  margin: '0 0 var(--s-3)',
                }}
              >
                Tourmaline Tower
              </h2>
              <p
                className="font-sans"
                style={{
                  fontSize: 'var(--fs-15)',
                  lineHeight: 1.7,
                  color: 'var(--brand-navy-500)',
                  margin: '0 0 var(--s-5)',
                }}
              >
                O primeiro edifício inteligente de Porto Belo, com um sistema que controla e integra
                toda a operação do prédio.
              </p>
              <Link href="/contato" className="btn btn--gold" style={{ width: 'fit-content' }}>
                Solicitar acesso <span className="arrow">→</span>
              </Link>
            </div>
          </div>

          {/* Descrição + specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div
              className="lg:col-span-7 font-sans"
              style={{ fontSize: 'var(--fs-16)', lineHeight: 1.85, color: 'var(--text)' }}
            >
              <p
                className="font-mono text-gold"
                style={{ fontSize: 'var(--fs-12)', letterSpacing: '0.15em', marginBottom: 'var(--s-3)' }}
              >
                Por dentro do projeto
              </p>
              <p style={{ margin: '0 0 var(--s-5)' }}>
                O Tourmaline Tower é mais do que um endereço de alto padrão. Ele foi concebido para
                render e para se valorizar com o tempo: um sistema integrado controla a operação do
                edifício, reduz custos e desgaste e sustenta o valor do imóvel no longo prazo.
              </p>
              <p style={{ margin: 0 }}>
                A tecnologia trabalha a favor de quem mora e de quem investe. Ela cuida da rotina do
                prédio nos bastidores, deixa o dia a dia mais simples e confortável e, com ambientes
                pensados para o bem-estar, mantém o patrimônio valorizado ao longo dos anos.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div
                className="rounded-4xl lift"
                style={{
                  border: 'var(--line-1) solid rgba(0,16,49,0.1)',
                  background: '#ffffff',
                  overflow: 'hidden',
                }}
              >
                {specs.map((s, i) => (
                  <div
                    key={s.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 'var(--s-4)',
                      padding: 'var(--s-5) var(--s-6)',
                      borderTop: i === 0 ? 'none' : 'var(--hairline) solid rgba(0,16,49,0.1)',
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 11,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--text-faint)',
                      }}
                    >
                      {s.label}
                    </span>
                    <span
                      className="font-display text-navy"
                      style={{ fontSize: 'var(--fs-15)', fontWeight: 500, textAlign: 'right' }}
                    >
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Faixa navy — números */}
          <div
            className="rounded-4xl lift"
            style={{
              background: 'var(--brand-navy)',
              color: 'var(--brand-cream)',
              padding: 'var(--s-12) var(--s-10)',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {numeros.map((n) => (
                <div key={n.label} style={{ textAlign: 'center' }}>
                  <p
                    className="font-display text-gold"
                    style={{ fontSize: 'var(--fs-40)', fontWeight: 600, lineHeight: 1, margin: 0 }}
                  >
                    {n.value}
                  </p>
                  <p
                    className="font-sans"
                    style={{
                      fontSize: 'var(--fs-14)',
                      color: 'rgba(236,235,231,0.6)',
                      marginTop: 'var(--s-2)',
                      lineHeight: 1.5,
                    }}
                  >
                    {n.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Portfólio */}
          <div>
            <div style={{ marginBottom: 'var(--s-10)' }}>
              <p
                className="font-mono text-gold"
                style={{ fontSize: 'var(--fs-12)', letterSpacing: '0.15em', marginBottom: 'var(--s-3)' }}
              >
                Portfólio
              </p>
              <h2
                className="font-display text-navy"
                style={{ fontSize: 'var(--fs-32)', fontWeight: 300, lineHeight: 1.2, margin: 0 }}
              >
                Outros projetos que já estruturamos
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
              {portfolio.map((p) => (
                <div
                  key={p.name}
                  className="blog-card rounded-3xl"
                  style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1542 / 2160' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    alt={p.name}
                    style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.objectPosition ?? 'center' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(0,16,49,0.85) 0%, rgba(0,16,49,0.2) 55%, transparent 100%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 'var(--s-6)',
                    }}
                  >
                    <h3
                      className="font-display"
                      style={{ fontSize: 'var(--fs-20)', fontWeight: 500, color: '#fff', margin: 0 }}
                    >
                      {p.name}
                    </h3>
                    <p
                      className="font-mono"
                      style={{
                        fontSize: 11,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--brand-gold-soft)',
                        marginTop: 'var(--s-1)',
                      }}
                    >
                      {p.local}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center' }}>
            <p
              className="font-display text-navy"
              style={{
                fontSize: 'var(--fs-24)',
                fontWeight: 300,
                lineHeight: 1.4,
                margin: '0 auto var(--s-6)',
                maxWidth: 560,
              }}
            >
              Quer ser avaliado para investir em um empreendimento estruturado pela ARCK1PRO?
            </p>
            <Link href="/contato" className="btn btn--gold">
              Solicitar avaliação estratégica <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
