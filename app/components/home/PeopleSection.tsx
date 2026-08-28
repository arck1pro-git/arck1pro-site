import EtapasCarrossel from "./EtapasCarrossel";

// Voltaram como cards vazados, não como as pills com ícone de antes. O rótulo
// segue numa frase corrida, igual ao texto original.
const stats = [
  { value: "+20", label: "anos de atuação no mercado imobiliário" },
  { value: "+350", label: "empreendimentos estruturados" },
];

export default function PeopleSection() {
  // O overflow-clip vale só do md para cima: no telefone os cards de etapa são
  // sticky, e sticky dentro de um ancestral com overflow clip/hidden gruda no
  // ancestral em vez de grudar na tela — a pilha simplesmente não aconteceria.
  //
  // min-h-svh, e não h-screen: a section tem overflow-clip, e com altura travada
  // a headline a 96px (que no telefone passa de oito linhas) seria cortada. Com
  // min- a dobra fica cheia quando cabe e cresce quando não cabe. E svh em vez de
  // vh pelo mesmo motivo da hero: no mobile o vh ignora a barra do browser e
  // estoura a tela.
  return (
    <section
      id="lider"
      className="reveal font-sans relative z-10 overflow-visible md:overflow-clip min-h-svh flex flex-col justify-center"
      style={{ background: "var(--navy-grad)" }}
    >
      {/* Mesma trama da intro do Método, que também roda sobre --navy-grad. A
          máscara vertical dissolve os dots contra as sections vizinhas, e o
          z-index 0 do .navy-dots exige os wrappers de conteúdo em position:relative. */}
      <div aria-hidden className="navy-dots" />

      {/* As etapas do processo entram aqui, e não numa section branca
          própria logo acima: sobre o mesmo --navy-grad, a esteira e a
          apresentação do líder leem como um bloco só, sem a emenda clara que
          existia entre as duas. O padding do topo é o que separa a esteira do
          fim da section clara; o py-16 do bloco do líder faz o resto. */}
      <div className="w-full pt-16 lg:pt-20">
        <EtapasCarrossel />
      </div>

      {/* Apresentação do líder. Com as pills de números fora, a headline é todo
          o conteúdo da section, então o padding vertical — que antes se repartia
          entre os dois blocos — fica simétrico aqui. */}
      <div className="relative max-w-[1400px] w-full mx-auto px-6 py-16 lg:py-20 text-center flex flex-col items-center">
        {/* Saiu do clamp da h1 da hero (3.5rem a 6rem), que aqui deixava a frase
            grande demais para o que ela é: a abertura da section, não o título
            do site. Entrelinha, tracking e peso continuam os mesmos da hero. A
            largura de 1280px fica: é a do .container da hero, e sem ela a frase
            viraria uma coluna estreita de sete linhas neste corpo. */}
        <h2 className="font-display text-cream font-light max-w-[1280px] leading-[0.96] tracking-[-0.02em] text-4xl lg:text-[clamp(2.75rem,5.2vw,4.25rem)]">
          Nascemos da visão de que o litoral catarinense é
          <br />
          {/* Dourado em Playfair itálica e em linha própria, como o
              "rentabilidade" da hero. O font-normal é necessário: o itálico
              herdaria o font-light do h2 e nesse corpo um serif em 300 fica
              quebradiço. O ponto final fica fora do span, para não entrar em
              itálico nem no recorte do gradiente. */}
          <span className="text-gold font-serif-italic font-normal">o rendimento mais sólido do mercado imobiliário</span>.
          {/* Subiu de text-2xl junto com a redução da frase de cima: com a
              headline menor, 24px aqui abriam um degrau grande demais entre as
              duas. Vai como bloco, e não inline — no meio da linha grande ela
              cairia com a base desalinhada e leria como defeito. Em linha
              própria vira o apoio da afirmação de cima, e o leading-snug
              substitui o 0.96 do h2, que só serve ao corpo maior. */}
          <span className="block text-[1.625rem] lg:text-3xl leading-snug mt-8">
            Somos formados por pessoas que acreditam no
            <br />
            <span className="text-gold font-serif-italic font-normal">potencial regional de valorização</span>
          </span>
        </h2>

        {/* Indicadores, abaixo da segunda frase. */}
        <div className="lider-cards">
          {stats.map(({ value, label }, i) => (
            <div key={i} className="lider-card font-sans">
              <span className="lider-card__num">{value}</span>
              <span className="lider-card__label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
