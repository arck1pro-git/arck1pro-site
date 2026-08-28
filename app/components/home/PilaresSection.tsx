import Image from "next/image";
import obraImg from "../../../public/obra.png";
// Sem "use client": o acordeão saiu e com ele o único estado do arquivo.
// A esteira de etapas, que também morava aqui, foi para a EtapasCarrossel e
// hoje é renderizada dentro da PeopleSection, sobre o navy.

export default function PilaresSection() {
  return (
    <section
      id="metodo"
      className="reveal font-sans relative z-10 overflow-clip"
      style={{ background: "var(--surface)" }}
    >
      {/* Mesma trama e mesma máscara da .navy-dots, em tinta escura: a trama
          branca é invisível agora que a section é clara. */}
      <div aria-hidden className="claro-dots" />

      {/* Intro — mesmo bloco no mobile e no desktop */}
      <div className="relative max-w-[1400px] mx-auto px-6 pt-20 lg:pt-28 pb-20 lg:pb-28 text-center">
        <h2
          className="font-display font-light text-2xl lg:text-[2.5rem] leading-[1.15] tracking-[-0.01em] max-w-[1280px] mx-auto mb-10 lg:mb-20"
          style={{ color: "var(--brand-navy)" }}
        >
          Aqui você lucra participando dos bastidores da multiplicação de patrimônio
          na etapa mais lucrativa do mercado imobiliário,
          <br />
          {/* Mesma dupla da hero: Playfair itálica contra a sem-serifa do resto
              da frase, e o mesmo --gold-grad-h recortado no texto. O peso 400
              sobrepõe o font-light do h2 — a itálica em 300 ficaria fina demais
              para carregar a linha sozinha. */}
          <span className="text-gold font-serif-italic font-normal">
            com total transparência em cada etapa.
          </span>
        </h2>

        {/* Texto e foto lado a lado no desktop; empilhados no mobile, com a foto
            depois do texto. As duas colunas dividem a largura por igual. */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
          {/* Preto puro, não o --brand-navy do resto da página: aqui o texto é
              tinta, não cor de marca. A headline logo acima segue em navy. */}
          <div
            className="metodo-intro flex flex-col gap-4 max-w-2xl mx-auto lg:mx-0 lg:max-w-none lg:flex-1"
            style={{ color: "#000000" }}
          >
            {/* Trocados de posição. Cada frase levou o próprio peso junto: o
                semibold marca a afirmação forte, não a primeira linha do bloco. */}
            <p className="text-base lg:text-lg leading-relaxed font-semibold">
              A incorporação é a fase de maior rendimento no mercado imobiliário e poucos sabem como acessá-la.
            </p>
            <p className="text-base lg:text-lg leading-relaxed opacity-80">
              Desenvolvemos empreendimentos imobiliários únicos com tecnologia e sustentabilidade e conectamos investidores qualificados e criteriosamente selecionados para se tornarem sócios investidores.
            </p>
          </div>

          <div className="w-full max-w-2xl mx-auto lg:mx-0 lg:max-w-none lg:flex-1">
            <Image
              src={obraImg}
              alt="Engenheiro de capacete analisando a planta do projeto em frente à estrutura de um empreendimento em obras"
              sizes="(min-width: 1024px) 45vw, 90vw"
              placeholder="blur"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
