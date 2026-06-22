import type { Metadata } from 'next'
import Link from 'next/link'
import RouteHeroBg from '../components/RouteHeroBg'

export const metadata: Metadata = {
  title: 'Porto Belo — Epicentro da Costa Esmeralda',
  description:
    'Por que Porto Belo concentra a maior assimetria entre demanda e oferta de alto padrão no litoral catarinense. Tese, dados e estruturação ARCK1PRO.',
  alternates: { canonical: '/portobelo' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'ARCK1PRO',
    url: '/portobelo',
    title: 'Porto Belo — Epicentro da Costa Esmeralda · ARCK1PRO',
    description:
      'A tese, os dados e a estruturação por trás do mercado de alto padrão de Porto Belo e da Costa Esmeralda.',
    images: ['/header.png'],
  },
}

const triade = [
  {
    name: 'Balneário Camboriú',
    tag: 'Consolidado',
    text: 'A referência do alto padrão vertical no Brasil, com um dos m² mais caros do país, a R$ 15.215 (FIPEZAP), agora superado por Itapema. Os terrenos são poucos e caros, e o ciclo de entrada de menor valor já se encerrou.',
  },
  {
    name: 'Itapema',
    tag: 'Em maturação',
    text: 'Hoje tem o m² mais valorizado do país, a R$ 15.226, à frente de Balneário Camboriú (FIPEZAP). Quem comprou na planta no começo dessa alta ganhou mais do que renderia qualquer aplicação no mesmo período.',
  },
  {
    name: 'Porto Belo',
    tag: 'Ponto de inflexão',
    text: 'Foi a cidade onde o mercado imobiliário mais cresceu em Santa Catarina em 2024, com mais vendas que Balneário Camboriú e Itapema. Tem um terço da oferta de Itapema para uma procura cada vez maior, fica ao lado de Bombinhas e recebe o excesso de demanda das duas vizinhas.',
  },
]


const porqueAgora = [
  {
    title: 'Megaobras e infraestrutura',
    text: 'Píer Oporto, Hard Rock Café sobre a água, golfe resort, marina e a reurbanização do Perequê. São mais de R$ 200 milhões em obras que devem segurar a valorização nos próximos cinco a dez anos.',
  },
  {
    title: 'Maturação acelerada',
    text: 'Porto Belo liderou o Brasil em VGV lançado em 2024, com R$ 11,45 bilhões, e valorizou mais de 300% em cinco anos. Ainda falta oferta de alto padrão para a procura que existe.',
  },
  {
    title: 'Herança de Balneário Camboriú',
    text: 'Quem não consegue mais comprar em Balneário Camboriú encontra em Porto Belo a próxima oportunidade, com preço ainda acessível e boa parte da valorização por vir.',
  },
]

const dados = [
  { kind: 'donut' as const, pct: 83, center: '83%', label: 'taxa de absorção: 9.107 unidades vendidas de 10.912 lançadas em Porto Belo', fonte: 'ABRAINC / GeoBrain' },
  { kind: 'donut' as const, pct: 25, center: '25%', label: 'do VGV lançado de SC (R$ 45 bi) veio só de Porto Belo (R$ 11,45 bi)', fonte: 'ABRAINC / GeoBrain' },
  { kind: 'num' as const, value: 'R$ 11,45 bi', label: 'Porto Belo, líder do Brasil em VGV lançado em 2024', fonte: 'ABRAINC / GeoBrain' },
  { kind: 'num' as const, value: '70 mil', label: 'visitantes na temporada de transatlânticos 2024/25', fonte: 'NSCtotal' },
]

const megaDestaque = [
  {
    tag: 'Píer Oporto · Rio Perequê',
    title: 'O píer que vai redefinir o entretenimento do litoral',
    text: 'Estrutura inovadora de lazer e sofisticação sobre as margens do Rio Perequê, com prazo de entrega de 36 meses e obras já em andamento.',
    stats: [
      { v: '8.274 m²', l: 'de área total' },
      { v: '28 lojas', l: 'em 9.458 m² comerciais' },
      { v: '226 vagas', l: '+ 50 vagas molhadas' },
      { v: 'Roda gigante', l: 'e rooftop panorâmico' },
    ],
  },
  {
    tag: 'Hard Rock Café Itapema',
    title: 'A única unidade do mundo inteiramente sobre a água',
    text: 'Instalada de forma exclusiva no Píer Oporto, será a primeira e única Hard Rock Café construída totalmente sobre o mar, com vista de 360°.',
    stats: [
      { v: '1.200 m²', l: 'de área' },
      { v: '360°', l: 'de vista para o mar' },
      { v: 'Única', l: 'do mundo sobre a água' },
      { v: 'Exclusiva', l: 'no Píer Oporto' },
    ],
  },
]

const megaOutros = [
  {
    title: 'Vivapark',
    text: 'O 1º "bairro parque" do país, conceito de urbanismo integrado localizado em Porto Belo.',
  },
  {
    title: 'Porto Belo Golf Resort',
    text: 'Da Wert Empreendimentos, com o 1º campo de golfe iluminado do Brasil e da América Latina, com 9 buracos.',
  },
  {
    title: 'Terra All Resort',
    text: 'Complexo hoteleiro e residencial localizado ao lado do campo de golfe, em Porto Belo.',
  },
  {
    title: 'Novo Shopping da Meia Praia',
    text: 'Projeto de R$ 100 milhões com inauguração prevista para 2026, com marcas como Eco Bistro e Ja Russe.',
  },
  {
    title: 'Marina de Itapema',
    text: 'Investimento de R$ 19 milhões no Canto da Praia, com capacidade para cerca de 400 embarcações.',
  },
  {
    title: 'Alargamento da faixa de areia',
    text: 'Avaliado em mais de R$ 100 milhões e com aval do IMA, deve impulsionar a valorização local em até 45%. Início previsto para 2025.',
  },
  {
    title: 'Reurbanização do Perequê',
    text: 'Projeto da ACIP em parceria com a Prefeitura, com design inspirado no oceano, espaços náuticos e novas áreas de lazer.',
  },
]

const valorizacao = [
  { label: 'Porto Belo', pct: 300, destaque: true },
  { label: 'Itapema', pct: 96, destaque: false },
  { label: 'Balneário Camboriú', pct: 82, destaque: false },
  { label: 'Ibovespa', pct: 54, destaque: false },
  { label: 'Dólar', pct: 48, destaque: false },
  { label: 'Poupança', pct: 28, destaque: false },
]

const celebridades = [
  { nome: 'Neymar Jr.', area: 'Jogador de futebol', iniciais: 'NJ', foto: '/neymar.webp' },
  { nome: 'Leonardo', area: 'Cantor', iniciais: 'L', foto: '/leonardo.webp' },
  { nome: 'Zezé Di Camargo', area: 'Cantor', iniciais: 'ZD', foto: '/zezedicamargo.webp' },
  { nome: 'Alexandre Pires', area: 'Cantor', iniciais: 'AP', foto: '/alexandrepires.webp' },
  { nome: 'Ratinho', area: 'Apresentador', iniciais: 'R', foto: '/ratinho.webp' },
  { nome: 'Fernando & Sorocaba', area: 'Dupla sertaneja', iniciais: 'FS', foto: '/fernandoesorocaba.webp' },
  { nome: 'Felipe Titto', area: 'Ator', iniciais: 'FT', foto: '/felipetitto.webp' },
  { nome: 'Rafael Nadal', area: 'Tenista', iniciais: 'RN', foto: '/rafaelnadal.webp' },
]

const sectionTitle: React.CSSProperties = {
  fontSize: 'var(--fs-40)',
  fontWeight: 400,
  lineHeight: 1.1,
  margin: 0,
}

function Donut({ pct, center }: { pct: number; center: string }) {
  const r = 46
  const c = 2 * Math.PI * r
  const filled = (pct / 100) * c
  return (
    <svg viewBox="0 0 120 120" role="img" style={{ width: 124, height: 124, display: 'block' }}>
      <circle cx="60" cy="60" r={r} fill="none" strokeWidth="11" style={{ stroke: 'rgba(0,16,49,0.08)' }} />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        strokeWidth="11"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${c - filled}`}
        transform="rotate(-90 60 60)"
        style={{ stroke: 'var(--brand-gold)' }}
      />
      <text
        x="60"
        y="60"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-display"
        fontSize="26"
        fontWeight="600"
        style={{ fill: 'var(--brand-navy)' }}
      >
        {center}
      </text>
    </svg>
  )
}

export default function PortoBeloPage() {
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
        <h1
          className="font-display text-cream lg:text-6xl text-4xl"
          style={{ fontWeight: 700, lineHeight: 1.1, margin: 0, maxWidth: 920, marginInline: 'auto' }}
        >
          O litoral que redefiniu o <span className="text-gold-hero">Mercado imobiliário brasileiro</span>
        </h1>
        <p
          className="font-sans"
          style={{
            fontSize: 'var(--fs-16)',
            lineHeight: 1.75,
            color: 'rgba(236,235,231,0.7)',
            maxWidth: 640,
            margin: 'var(--s-6) auto 0',
          }}
        >
          Itapema, Porto Belo são cidades da Costa Esmeralda no litoral catarinense
          e concentram a atenção dos grandes investidores do Brasil e do exterior.
          A valorização não é moda: tem base econômica, geográfica e populacional
          que não se repete em nenhum outro trecho do litoral do país.
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
          {/* DOBRA 2 — O macro */}
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <h2 className="font-display text-navy" style={sectionTitle}>
              O capital precisa ir para algum lugar
            </h2>
            <div className="font-sans" style={{ fontSize: 'var(--fs-16)', lineHeight: 1.85, color: 'var(--text)', marginTop: 'var(--s-6)' }}>
              <p style={{ margin: '0 0 var(--s-5)' }}>
                Com os juros altos, o investidor que entende do assunto não larga o imóvel: troca pelo
                imóvel certo. O alto padrão residencial no Brasil segue firme, com imóveis que vendem
                rápido, compradores que dependem pouco de crédito e preços que sobem acima da inflação
                onde falta terreno.
              </p>
              <p style={{ margin: 0 }}>
                O litoral norte de Santa Catarina é uma dessas regiões, e Porto Belo é onde mais falta
                imóvel para a procura que existe.
              </p>
            </div>
          </div>

          {/* DOBRA 3 — O litoral */}
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <h2 className="font-display text-navy" style={sectionTitle}>
              De casa de veraneio a patrimônio
            </h2>
            <div className="font-sans" style={{ fontSize: 'var(--fs-16)', lineHeight: 1.85, color: 'var(--text)', marginTop: 'var(--s-6)' }}>
              <p style={{ margin: '0 0 var(--s-5)' }}>
                O comprador do litoral catarinense mudou. Famílias do Sul e do Centro-Oeste passaram a
                viver aqui o ano inteiro, não só na temporada. Têm renda mais alta, dependem menos de
                financiamento e fecham negócio com mais rapidez.
              </p>
              <p style={{ margin: 0 }}>
                Esse litoral oferece o que nenhuma cidade grande tem: terra escassa de verdade. A cada
                ciclo sobra menos terreno na orla, e o preço acompanha. A escassez se reflete
                diretamente no valor do metro quadrado.
              </p>
            </div>
          </div>

          {/* DOBRA 4 — O corredor */}
          <div>
            <div style={{ maxWidth: 720, margin: '0 auto var(--s-8)', textAlign: 'center' }}>
              <h2 className="font-display text-navy" style={{ ...sectionTitle, marginBottom: 'var(--s-5)' }}>
                O eixo que cresceu junto
              </h2>
              <p className="font-sans" style={{ fontSize: 'var(--fs-16)', lineHeight: 1.85, color: 'var(--text)', margin: 0 }}>
                Em vinte anos, o litoral catarinense se transformou num corredor contínuo de
                valorização, de Florianópolis ao norte. As cidades desse eixo, até Piçarras,
                amadurecem no mesmo padrão, com três a cinco anos de diferença entre uma e outra.
                Entender esse ritmo é saber em que ponto cada cidade está dentro do ciclo de valorização.
              </p>
            </div>

          </div>

          {/* DOBRA 5 — A tríade */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: 'var(--s-12)' }}>
              <h2 className="font-display text-navy" style={{ ...sectionTitle, fontWeight: 300 }}>
                Três cidades, o mesmo movimento
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
              {triade.map((c) => (
                <div
                  key={c.name}
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
                  <span
                    className="font-display text-gold text-base"
                    style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
                  >
                    {c.tag}
                  </span>
                  <h3 className="font-display text-navy" style={{ fontSize: 'var(--fs-24)', fontWeight: 500, margin: 0, lineHeight: 1.2 }}>
                    {c.name}
                  </h3>
                  <p className="font-sans" style={{ fontSize: 'var(--fs-14)', lineHeight: 1.75, color: 'var(--text-muted)', margin: 0 }}>
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DOBRA 6 — Porto Belo, por que agora */}
          <div>
            <div style={{ marginBottom: 'var(--s-10)', textAlign: 'center' }}>
              <h2 className="font-display text-navy" style={sectionTitle}>
                O ponto de inflexão
              </h2>
              <p className="font-sans" style={{ fontSize: 'var(--fs-16)', lineHeight: 1.85, color: 'var(--text-muted)', margin: 'var(--s-4) auto 0', maxWidth: 680 }}>
                Porto Belo reúne hoje os três fatores que definem o atual estágio do ciclo de valorização.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: 'var(--s-4)' }}>
              {porqueAgora.map((p, i) => (
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
                  <span className="font-display text-gold" style={{ fontSize: 'var(--fs-32)', fontWeight: 600, lineHeight: 1 }}>
                    0{i + 1}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dados.map((d) => (
                <div
                  key={d.label}
                  className="rounded-4xl lift"
                  style={{
                    padding: 'var(--s-8)',
                    border: 'var(--line-1) solid rgba(0,16,49,0.1)',
                    background: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                  }}
                >
                  {d.kind === 'donut' ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--s-2)' }}>
                      <Donut pct={d.pct} center={d.center} />
                    </div>
                  ) : (
                    <p className="font-display text-gold" style={{ fontSize: 'var(--fs-32)', fontWeight: 600, lineHeight: 1, margin: 0 }}>
                      {d.value}
                    </p>
                  )}
                  <p
                    className="font-sans text-navy"
                    style={{
                      fontSize: 'var(--fs-14)',
                      lineHeight: 1.55,
                      margin: 'var(--s-3) 0',
                      textAlign: d.kind === 'donut' ? 'center' : 'left',
                    }}
                  >
                    {d.label}
                  </p>
                  <p
                    className="font-display text-base"
                    style={{
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-faint)',
                      marginTop: 'auto',
                      textAlign: d.kind === 'donut' ? 'center' : 'left',
                    }}
                  >
                    Fonte: {d.fonte}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DOBRA 7 — Porto Belo em imagem */}
          <div>
            <div
              className="rounded-4xl lift overflow-clip"
              style={{
                minHeight: 380,
                background: "url('/header.webp') center / cover no-repeat",
              }}
            />
            <div style={{ maxWidth: 720, marginInline: 'auto', textAlign: 'center', marginTop: 'var(--s-10)' }}>
              <p
                className="font-display text-base"
                style={{
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--brand-gold)',
                  margin: '0 0 var(--s-5)',
                }}
              >
                Porto Belo · Costa Esmeralda
              </p>
              <h2
                className="font-display text-navy"
                style={{ fontSize: 'var(--fs-40)', fontWeight: 400, lineHeight: 1.15, margin: 0 }}
              >
                O litoral que virou <span className="text-gold">palco dos grandes investimentos</span> do Brasil
              </h2>
              <p
                className="font-sans"
                style={{
                  fontSize: 'var(--fs-16)',
                  lineHeight: 1.75,
                  color: 'var(--text-muted)',
                  margin: 'var(--s-5) auto 0',
                  maxWidth: 600,
                }}
              >
                Porto Belo deixou de ser promessa. A região se valoriza a cada ano e atrai capital,
                grandes projetos e nomes conhecidos do país. Virou um dos principais endereços de alto
                padrão do litoral catarinense.
              </p>
            </div>
          </div>

          {/* DOBRA 8 — Megaprojetos */}
          <div>
            <div style={{ maxWidth: 720, margin: '0 auto var(--s-10)', textAlign: 'center' }}>
              <h2 className="font-display text-navy" style={{ ...sectionTitle, marginBottom: 'var(--s-5)' }}>
                A infraestrutura que sustenta o próximo ciclo
              </h2>
              <p className="font-sans" style={{ fontSize: 'var(--fs-16)', lineHeight: 1.85, color: 'var(--text)', margin: 0 }}>
                A valorização tem motivo. A região reúne um número fora do comum de obras públicas e
                privadas, do píer que vai abrigar a única Hard Rock do mundo sobre a água ao
                alargamento da faixa de areia de Itapema. É o que sustenta o crescimento dos próximos anos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: 'var(--s-4)' }}>
              {megaDestaque.map((m) => (
                <div
                  key={m.tag}
                  className="rounded-4xl lift"
                  style={{
                    background: 'var(--brand-navy)',
                    color: 'var(--brand-cream)',
                    padding: 'var(--s-10) var(--s-8)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--s-4)',
                  }}
                >
                  <span className="font-display text-gold text-base" style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {m.tag}
                  </span>
                  <h3 className="font-display" style={{ fontSize: 'var(--fs-24)', fontWeight: 500, margin: 0, lineHeight: 1.2 }}>
                    {m.title}
                  </h3>
                  <p className="font-sans" style={{ fontSize: 'var(--fs-14)', lineHeight: 1.7, color: 'rgba(236,235,231,0.7)', margin: 0 }}>
                    {m.text}
                  </p>
                  <div className="grid grid-cols-2 gap-3" style={{ marginTop: 'var(--s-2)' }}>
                    {m.stats.map((s) => (
                      <div key={s.l} style={{ borderTop: 'var(--line-1) solid rgba(236,235,231,0.14)', paddingTop: 'var(--s-3)' }}>
                        <p className="font-display text-gold" style={{ fontSize: 'var(--fs-20)', fontWeight: 600, margin: 0, lineHeight: 1.1 }}>
                          {s.v}
                        </p>
                        <p className="font-sans" style={{ fontSize: 'var(--fs-12)', color: 'rgba(236,235,231,0.6)', margin: 'var(--s-1) 0 0', lineHeight: 1.4 }}>
                          {s.l}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
              {megaOutros.map((m, i) => (
                <div
                  key={m.title}
                  className="rounded-4xl lift pb-glow"
                  style={{
                    padding: 'var(--s-8) var(--s-6)',
                    background: 'linear-gradient(180deg, #ffffff 0%, rgba(0,16,49,0.025) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--s-3)',
                    minWidth: 0,
                    ['--pb-glow-cycle' as string]: `${megaOutros.length * 3}s`,
                    ['--pb-glow-delay' as string]: `${i * 3}s`,
                  } as React.CSSProperties}
                >
                  <h3 className="font-display text-navy" style={{ fontSize: 'var(--fs-20)', fontWeight: 500, margin: 0, lineHeight: 1.2, overflowWrap: 'break-word' }}>
                    {m.title}
                  </h3>
                  <p className="font-sans" style={{ fontSize: 'var(--fs-14)', lineHeight: 1.65, color: 'var(--text-muted)', margin: 0 }}>
                    {m.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DOBRA 9 — Valorização comparada */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <h2 className="font-display text-navy" style={{ fontSize: 'var(--fs-32)', fontWeight: 400, lineHeight: 1.2, margin: 0 }}>
                Quem entendeu o litoral em 2018 não precisou de mais nada
              </h2>
              <p className="font-sans" style={{ fontSize: 'var(--fs-16)', lineHeight: 1.85, color: 'var(--text)', margin: 'var(--s-5) 0 0' }}>
                Em cinco anos, Porto Belo valorizou mais de 300%, quase quatro vezes mais que a
                poupança e o dólar e bem acima do Ibovespa no mesmo período. A cidade repete o caminho
                de Itapema, com boa parte do ciclo de valorização ainda à frente.
              </p>

              <div
                className="rounded-4xl"
                style={{
                  border: 'var(--line-1) solid rgba(0,16,49,0.1)',
                  background: 'rgba(0,16,49,0.02)',
                  padding: 'var(--s-6)',
                  marginTop: 'var(--s-6)',
                }}
              >
                <p className="font-display text-gold" style={{ fontSize: 'var(--fs-40)', fontWeight: 600, lineHeight: 1, margin: 0 }}>
                  19,1% <span style={{ fontSize: 'var(--fs-16)' }}>a.a.</span>
                </p>
                <p className="font-sans text-navy" style={{ fontSize: 'var(--fs-14)', lineHeight: 1.6, margin: 'var(--s-3) 0' }}>
                  retorno médio do imóvel no Brasil, acima da Selic de 14,25%, somando 6,2% de
                  aluguel e 12,9% de valorização real.
                </p>
                <p className="font-display text-base" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: 0 }}>
                  Fonte: FGV-IBRE / QuintoAndar · via Estadão
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                className="rounded-4xl lift"
                style={{
                  border: 'var(--line-1) solid rgba(0,16,49,0.1)',
                  background: '#ffffff',
                  padding: 'var(--s-10) var(--s-8)',
                }}
              >
                <p className="font-display text-base" style={{ letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: '0 0 var(--s-6)' }}>
                  Valorização acumulada · 2018–2023
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-5)' }}>
                  {valorizacao.map((v) => (
                    <div key={v.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--s-2)' }}>
                        <span className="font-display text-navy" style={{ fontSize: 'var(--fs-14)', fontWeight: v.destaque ? 600 : 400 }}>
                          {v.label}
                        </span>
                        <span className={v.destaque ? 'font-display text-gold' : 'font-display text-navy'} style={{ fontSize: 'var(--fs-16)', fontWeight: 600 }}>
                          +{v.pct}%
                        </span>
                      </div>
                      <div style={{ height: 8, borderRadius: 'var(--r-pill)', background: 'rgba(0,16,49,0.06)', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${(v.pct / 300) * 100}%`,
                            height: '100%',
                            borderRadius: 'var(--r-pill)',
                            background: v.destaque ? 'var(--brand-gold)' : 'rgba(0,16,49,0.25)',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="font-display text-base" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: 'var(--s-6) 0 0' }}>
                  Fonte: FipeZAP · rendimento acumulado em 5 anos
                </p>
              </div>
            </div>
          </div>

          {/* DOBRA 10 — Celebridades */}
          <div>
            <div style={{ maxWidth: 720, margin: '0 auto var(--s-10)', textAlign: 'center' }}>
              <h2 className="font-display text-navy" style={{ ...sectionTitle, marginBottom: 'var(--s-5)' }}>
                Onde o grande capital já chegou
              </h2>
              <p className="font-sans" style={{ fontSize: 'var(--fs-16)', lineHeight: 1.85, color: 'var(--text)', margin: 0 }}>
                Quem tem a melhor assessoria de patrimônio do país aposta na mesma região. Grandes nomes do esporte e da música já compraram imóveis aqui em Porto Belo.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {celebridades.map((c) => (
                <div
                  key={c.nome}
                  className="rounded-4xl lift"
                  style={{
                    padding: 'var(--s-8) var(--s-6)',
                    border: 'var(--line-1) solid rgba(0,16,49,0.1)',
                    background: 'linear-gradient(180deg, #ffffff 0%, rgba(0,16,49,0.025) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 'var(--s-3)',
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: c.foto
                        ? `var(--brand-navy) url('${c.foto}') center / cover no-repeat`
                        : 'var(--brand-navy)',
                      border: '2px solid var(--brand-gold)',
                      flexShrink: 0,
                      overflow: 'hidden',
                    }}
                  >
                    {!c.foto && (
                      <span className="font-display" style={{ fontSize: 'var(--fs-18)', fontWeight: 600, color: 'var(--brand-gold)', letterSpacing: '0.02em' }}>
                        {c.iniciais}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-navy" style={{ fontSize: 'var(--fs-16)', fontWeight: 500, margin: 0, lineHeight: 1.2, overflowWrap: 'break-word' }}>
                    {c.nome}
                  </h3>
                  <span className="font-display text-gold text-base" style={{ letterSpacing: '0.12em', textTransform: 'uppercase', overflowWrap: 'break-word' }}>
                    {c.area}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DOBRA 11 — CTA */}
          <div
            className="rounded-4xl lift"
            style={{
              background: 'var(--brand-navy)',
              color: 'var(--brand-cream)',
              padding: 'var(--s-16) var(--s-10)',
              textAlign: 'center',
            }}
          >
            <h2
              className="font-display"
              style={{ fontSize: 'var(--fs-40)', fontWeight: 400, lineHeight: 1.15, margin: '0 auto var(--s-5)', maxWidth: 640 }}
            >
              O mercado está claro. Candidate-se para investir.
            </h2>
            <p
              className="font-sans"
              style={{ fontSize: 'var(--fs-16)', lineHeight: 1.7, color: 'rgba(236,235,231,0.65)', maxWidth: 560, margin: '0 auto var(--s-8)' }}
            >
              O ARI é o caminho para investir no litoral catarinense com proteção do capital e retorno
              garantido em contrato.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-3)', justifyContent: 'center' }}>
              <Link href="/contato" className="btn btn--gold">
                Solicitar qualificação <span className="arrow">→</span>
              </Link>
              <Link href="/ari" className="btn btn--ghost-inv">
                Baixar o Guia do Investidor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
