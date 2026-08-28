import type { CSSProperties } from "react";

// Etapas do processo: as cinco fases da incorporação numa esteira infinita
// no desktop e numa pilha de cards sobrepostos no telefone.
//
// Saiu da section branca própria e passou a ser renderizada dentro da
// PeopleSection: as etapas e a apresentação do líder dividem o mesmo
// --navy-grad, sem emenda entre as duas. O bloco continua num arquivo próprio
// porque são cinco textos longos e o CardEtapa junto — dentro da PeopleSection
// isso enterraria a headline dela no meio do arquivo.
//
// Os cards vinham com faixa navy no topo, título em Manrope 700 e texto em
// preto puro. Nenhum outro card do projeto usa esse vocabulário, e era ele que
// fazia a esteira parecer vinda de outro site. Agora é o mesmo cartão
// translúcido das camadas de proteção de /ari e do "Por que o ARI ganha" das
// comparações: número dourado, título em Poppins e texto em creme.

const solutions = [
  {
    title: "Desenvolvimento de Projeto",
    body: "Aquisição do terreno, diligências jurídicas da área e viabilidades técnicas do projeto com os órgãos públicos, inclusive ambientais. Desenvolvimento de todo o projeto em tecnologia BIM. Todo o projeto é desenvolvido para um público específico, com tipologias de plantas orientadas à eficiência de capital e maior retorno do investidor em todas as fases. Cada metro quadrado é projetado para maximizar VGV e reduzir o tempo de venda. Além de contar com sustentabilidade integrada e certificada e tecnologia IA Smart Building.",
  },
  {
    title: "Captação de Recursos",
    body: "Após o desenvolvimento e validação de todo o projeto, com critérios extremamente rígidos, entra a estrutura própria de captação via ARI – Ativo de Renda Imobiliária. Aqui é onde o investidor entra. Captamos no máximo 5% do valor do VGV para a estruturação de todo o projeto. Esse valor normalmente é captado com grupos de 8 a 17 investidores qualificados, criteriosamente selecionados para participar do desenvolvimento do projeto e do sucesso da incorporação.",
    destaque: true,
  },
  {
    title: "Incorporação",
    body: "Nesse momento finalizamos todo o processo legal de aprovar e registrar a construção de um empreendimento, para então obter o R.I. (Registro da Incorporação), que nos permite vender as unidades antes ou durante as obras de forma totalmente legal e com segurança aos compradores e investidores.",
  },
  {
    title: "Lançamento Imobiliário",
    body: "Aqui é onde toda a nossa equipe comercial, devidamente treinada, capacita e orienta mais de 10.000 corretores, no Brasil e no exterior, para a venda do empreendimento. As unidades disponíveis esgotam-se em poucos meses. Com a venda do empreendimento, fechamos o ciclo ARI, onde o capital retorna aos investidores, encerrando a operação de incorporação imobiliária.",
  },
  {
    title: "Construção do Empreendimento",
    body: "Para concretizar todo o processo, entramos na fase de construção do empreendimento com a execução física do projeto. Através da captação com a venda e parceria com fundos imobiliários, garantimos o capital necessário para que a obra avance com rapidez. Essa fase exige seguir normas técnicas rigorosas e a execução de etapas interdependentes, que garantem a segurança, a qualidade estrutural e a entrega do imóvel no prazo.",
  },
];

function CardEtapa({
  n,
  title,
  body,
  destaque = false,
}: {
  n: number;
  title: string;
  body: string;
  destaque?: boolean;
}) {
  return (
    <article
      className={`etapa-card${destaque ? " etapa-card--destaque" : ""}`}
      // Degrau da pilha no mobile: cada etapa gruda 10px abaixo da anterior,
      // e é essa diferença que deixa à mostra a faixa de quem já passou. No
      // desktop a variável fica sem uso, porque o card da esteira não é sticky.
      style={{ "--degrau": `${(n - 1) * 10}px` } as CSSProperties}
    >
      <span className="etapa-card__num">{String(n).padStart(2, "0")}</span>
      <h3 className="etapa-card__titulo">{title}</h3>
      {destaque && <span className="etapa-card__selo">Onde o investidor entra</span>}
      <p className="etapa-card__texto">{body}</p>
    </article>
  );
}

export default function EtapasCarrossel() {
  return (
    // position:relative pelo mesmo motivo dos outros blocos da PeopleSection: a
    // .navy-dots roda em z-index 0 e passaria por cima do conteúdo sem isto.
    <div id="pilares" className="relative w-full">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2
          className="font-display text-cream text-center"
          style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, lineHeight: 1.1, margin: 0 }}
        >
          Etapas do processo:
        </h2>
      </div>

      {/* Fora do container de 1100px de propósito: a esteira ocupa a largura toda
          da tela, senão os cards apareceriam e sumiriam no meio do vazio em vez
          de entrar e sair pelas bordas. */}
      <div className="etapas-carrossel">
        <div className="etapas-track">
          {solutions.map((s, i) => (
            <CardEtapa key={i} n={i + 1} {...s} />
          ))}
          {/* Segunda volta: é ela que fecha o laço do movimento horizontal.
              Cópia visual pura, então sai da árvore de acessibilidade para o
              leitor de tela não anunciar as cinco etapas duas vezes — e some no
              mobile, onde não há esteira para fechar. */}
          <div aria-hidden className="etapas-clone contents">
            {solutions.map((s, i) => (
              <CardEtapa key={`clone-${i}`} n={i + 1} {...s} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
