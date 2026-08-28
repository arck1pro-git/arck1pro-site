import type { Metadata } from 'next'
import Image from 'next/image'
import footerImg from '../../public/footer.jpg'
import RouteHero from '../components/RouteHero'
import { ArrowUpRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contato";

export const metadata: Metadata = {
  title: 'Porto Belo · ARCK1PRO',
  description:
    'Por que Porto Belo e a Costa Esmeralda se tornaram a região que mais valoriza no litoral brasileiro.',
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

// As fotos estavam em public/ e a foto de cada um entra como background do
// círculo. As iniciais continuam no dado e aparecem se a foto faltar.
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

// Só aparece na dobra do ponto de inflexão, que hoje é navy: trilho em creme
// translúcido e número em creme. Se um dia voltar a uma superfície clara, as
// duas cores precisam virar prop.
function MegaCard({ title, text }: { title: string; text: string }) {
  return (
    <article
      className="mega-card rounded-lg lift"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, rgba(0,16,49,0.025) 100%)' }}
    >
      <h3
        className="font-display text-navy"
        style={{ fontSize: 'var(--fs-20)', fontWeight: 500, margin: 0, lineHeight: 1.2 }}
      >
        {title}
      </h3>
      <p
        className="font-sans"
        style={{ fontSize: 'var(--fs-14)', lineHeight: 1.65, color: 'var(--text-muted)', margin: 0 }}
      >
        {text}
      </p>
    </article>
  )
}

function Donut({ pct, center }: { pct: number; center: string }) {
  const r = 46
  const c = 2 * Math.PI * r
  const filled = (pct / 100) * c
  return (
    <svg viewBox="0 0 120 120" role="img" style={{ width: 124, height: 124, display: 'block' }}>
      <circle cx="60" cy="60" r={r} fill="none" strokeWidth="11" style={{ stroke: 'rgba(236,235,231,0.15)' }} />
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
        style={{ fill: 'var(--brand-cream)' }}
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
        marginTop: 'calc(var(--header-h) * -1)',
        position: 'relative',
        background: 'var(--brand-navy)',
      }}
    >
      {/* DOBRA 1 — Abertura */}
      <RouteHero
        titulo={
          <>
            O litoral que redefiniu o{' '}
            <span className="text-gold-hero font-serif-italic font-normal">
              Mercado imobiliário brasileiro
            </span>
          </>
        }
        texto="Itapema, Porto Belo são cidades da Costa Esmeralda no litoral catarinense e concentram a atenção dos grandes investidores do Brasil e do exterior. A valorização não é moda: tem base econômica, geográfica e populacional que não se repete em nenhum outro trecho do litoral do país."
      />

      <section
        className="section overflow-clip relative z-10"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 100% 100%, rgba(0,16,49,0.13) 0%, transparent 100%), var(--surface)',
          paddingTop: 'var(--s-20)',
        }}
      >
        <div aria-hidden className="claro-dots" />
        <div className="container relative" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-24)' }}>
          {/* DOBRAS 2 a 4 — o macro à esquerda, os dois desdobramentos à direita.
              Eram três blocos centrados de 760px empilhados, e o leitor descia
              três telas de texto corrido antes de chegar aos números. Aqui a
              afirmação de abertura fica maior, de um lado, e os dois
              desdobramentos ficam do outro, na altura dela.

              Texto alinhado à esquerda, e não mais centrado: em coluna estreita
              o texto centrado deixa as duas margens serrilhadas e a leitura
              trava a cada linha. */}
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2
                className="font-display text-navy"
                style={{ ...sectionTitle, fontSize: 'var(--fs-56)' }}
              >
                O capital precisa ir para algum lugar
              </h2>
              {/* fs-18 contra os fs-16 das colunas da direita: é o "um pouco
                  maior" que separa a abertura dos desdobramentos. */}
              <div
                className="font-sans"
                style={{ fontSize: 'var(--fs-18)', lineHeight: 1.85, color: 'var(--text)', marginTop: 'var(--s-6)' }}
              >
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-16)' }}>
              {/* O litoral */}
              <div>
                <h2 className="font-display text-navy" style={sectionTitle}>
                  De casa de veraneio a patrimônio
                </h2>
                <div
                  className="font-sans"
                  style={{ fontSize: 'var(--fs-16)', lineHeight: 1.85, color: 'var(--text)', marginTop: 'var(--s-5)' }}
                >
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

              {/* O corredor */}
              <div>
                <h2 className="font-display text-navy" style={sectionTitle}>
                  O eixo que cresceu junto
                </h2>
                <p
                  className="font-sans"
                  style={{ fontSize: 'var(--fs-16)', lineHeight: 1.85, color: 'var(--text)', margin: 'var(--s-5) 0 0' }}
                >
                  Em vinte anos, o litoral catarinense se transformou num corredor contínuo de
                  valorização, de Florianópolis ao norte. As cidades desse eixo, até Piçarras,
                  amadurecem no mesmo padrão, com três a cinco anos de diferença entre uma e outra.
                  Entender esse ritmo é saber em que ponto cada cidade está dentro do ciclo de valorização.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Dobra em navy. É a alternância clara → navy → clara da home: com uma
          superfície só do topo ao pé, uma página desta altura vira um bloco de
          texto sem respiro, e nada nela se destaca. */}
      <section
        className="section overflow-clip relative z-10"
        style={{ background: 'var(--navy-grad)' }}
      >
        <div aria-hidden className="navy-dots" />
        <div className="container relative" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-24)' }}>
          {/* DOBRA 5 — A tríade */}
          <div className="reveal">
            <div style={{ textAlign: 'center', marginBottom: 'var(--s-12)' }}>
              <h2 className="font-display text-cream" style={{ ...sectionTitle, fontWeight: 300 }}>
                Três cidades, o mesmo movimento
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
              {triade.map((c) => (
                <div
                  key={c.name}
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
                  <span
                    className="font-display text-gold text-base"
                    style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
                  >
                    {c.tag}
                  </span>
                  <h3 className="font-display text-cream" style={{ fontSize: 'var(--fs-24)', fontWeight: 500, margin: 0, lineHeight: 1.2 }}>
                    {c.name}
                  </h3>
                  <p className="font-sans" style={{ fontSize: 'var(--fs-14)', lineHeight: 1.75, color: 'rgba(236,235,231,0.75)', margin: 0 }}>
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DOBRA 6 — Porto Belo, por que agora */}
          <div className="reveal">
            <div style={{ marginBottom: 'var(--s-10)', textAlign: 'center' }}>
              <h2 className="font-display text-cream" style={sectionTitle}>
                O ponto de inflexão
              </h2>
              <p className="font-sans" style={{ fontSize: 'var(--fs-16)', lineHeight: 1.85, color: 'rgba(236,235,231,0.75)', margin: 'var(--s-4) auto 0', maxWidth: 680 }}>
                Porto Belo reúne hoje os três fatores que definem o atual estágio do ciclo de valorização.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: 'var(--s-4)' }}>
              {porqueAgora.map((p, i) => (
                <div
                  key={p.title}
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
                    0{i + 1}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dados.map((d) => (
                <div
                  key={d.label}
                  className="rounded-lg"
                  style={{
                    padding: 'var(--s-8)',
                    border: 'var(--line-1) solid rgba(236,235,231,0.14)',
                    background: 'rgba(236,235,231,0.05)',
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
                    className="font-sans text-cream"
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
                      color: 'rgba(236,235,231,0.5)',
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

          {/* DOBRA 7 — Porto Belo em imagem. Só a foto: o bloco de texto que
              vinha abaixo dela saiu. */}
          <div className="reveal">
            {/* next/image em vez de background-image: o arquivo original tem
                5464x3640 e 14 MB, e como background o browser baixaria os 14 MB
                inteiros. Pelo otimizador ele chega redimensionado, em webp e com
                o blur do import estático enquanto carrega. */}
            <div className="rounded-lg overflow-clip relative" style={{ minHeight: 380 }}>
              <Image
                src={footerImg}
                alt="Vista do litoral de Porto Belo, na Costa Esmeralda"
                fill
                sizes="(min-width: 1280px) 1240px, 100vw"
                placeholder="blur"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

        </div>
      </section>

      <section
        className="section overflow-clip relative z-10"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 100% 100%, rgba(0,16,49,0.13) 0%, transparent 100%), var(--surface)',
        }}
      >
        <div aria-hidden className="claro-dots" />
        <div className="container relative" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-24)' }}>
          {/* DOBRA 8 — Megaprojetos */}
          <div className="reveal">
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
                // Degradê e trama de dots, o mesmo fundo das sections navy do
                // site, no lugar do navy chapado. O overflow-clip recorta a
                // trama no raio do card, e o conteúdo vai num wrapper relative
                // porque a .navy-dots roda em z-index 0 e passaria por cima.
                <div
                  key={m.tag}
                  className="rounded-lg lift overflow-clip"
                  style={{
                    position: 'relative',
                    background: 'var(--navy-grad)',
                    color: 'var(--brand-cream)',
                    padding: 'var(--s-10) var(--s-8)',
                  }}
                >
                  <div aria-hidden className="navy-dots" />

                  <div
                    className="relative"
                    style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}
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
                </div>
              ))}
            </div>

            {/* Os sete correm numa esteira infinita, no lugar da grade parada em
                que um card de cada vez acendia em dourado (.pb-glow). Aquilo
                dava movimento sem dar leitura: o olho ia para o card que
                brilhava e os outros seis ficavam de enfeite. */}
            <div className="mega-carrossel">
              <div className="mega-track">
                {megaOutros.map((m) => (
                  <MegaCard key={m.title} {...m} />
                ))}
                {/* Segunda volta: é ela que fecha o laço. Cópia visual pura, então
                    sai da árvore de acessibilidade para o leitor de tela não
                    anunciar os sete projetos duas vezes. */}
                <div aria-hidden className="contents">
                  {megaOutros.map((m) => (
                    <MegaCard key={`clone-${m.title}`} {...m} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DOBRA 9 — Valorização comparada */}
          <div className="reveal grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
                className="rounded-lg"
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
                className="rounded-lg lift"
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
          <div className="reveal">
            {/* A frase que sobrou passa a ser o título da dobra: saíram a headline
                "Onde o grande capital já chegou" e a abertura sobre assessoria de
                patrimônio, e ela ficaria sozinha em corpo de texto. */}
            <div style={{ maxWidth: 720, margin: '0 auto var(--s-10)', textAlign: 'center' }}>
              <h2 className="font-display text-navy" style={{ ...sectionTitle, margin: 0 }}>
                Grandes nomes do esporte e da música já compraram imóveis aqui em Porto Belo.
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {celebridades.map((c) => (
                <div
                  key={c.nome}
                  className="rounded-lg lift"
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
                      <span className="font-display text-gold" style={{ fontSize: 'var(--fs-18)', fontWeight: 600, letterSpacing: '0.02em' }}>
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

        </div>
      </section>

      {/* Dobra em navy. É a alternância clara → navy → clara da home: com uma
          superfície só do topo ao pé, uma página desta altura vira um bloco de
          texto sem respiro, e nada nela se destaca. */}
      <section
        className="section overflow-clip relative z-10"
        style={{ background: 'var(--navy-grad)' }}
      >
        <div aria-hidden className="navy-dots" />
        <div className="container relative" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-24)' }}>
          {/* DOBRA 11 — CTA */}
          {/* Sem caixa: o CTA vinha num retângulo navy sólido, que sobre o
              --navy-grad da section virava um bloco chapado por cima do
              degradê e cobria a trama de dots. Agora ele é só texto sobre o
              fundo da dobra. */}
          <div className="reveal" style={{ color: 'var(--brand-cream)', textAlign: 'center' }}>
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
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--gold"
              >
                Solicitar qualificação <ArrowUpRight className="arrow" size={16} strokeWidth={2} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
