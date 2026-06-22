"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const projects = [
  {
    title: "Desenvolvimento de Projeto",
    body: "Aquisição do terreno, diligências jurídicas da área e viabilidades técnicas do projeto com os órgãos públicos, inclusive ambientais. Desenvolvimento de todo o projeto em tecnologia BIM. Todo o projeto é desenvolvido para um público específico, com tipologias de plantas orientadas à eficiência de capital e maior retorno do investidor em todas as fases. Cada metro quadrado é projetado para maximizar VGV e reduzir o tempo de venda. Além de contar com sustentabilidade integrada e certificada e tecnologia IA Smart Building.",
    src: "/pilar1.webp",
  },
  {
    title: "Captação de Recursos",
    body: "Após o desenvolvimento e validação de todo o projeto, com critérios extremamente rígidos, entra a estrutura própria de captação via ARI – Ativo de Renda Imobiliária. Aqui é onde o investidor entra. Captamos no máximo 5% do valor do VGV para a estruturação de todo o projeto. Esse valor normalmente é captado com grupos de 8 a 17 investidores qualificados, criteriosamente selecionados para participar do desenvolvimento do projeto e do sucesso da incorporação.",
    src: "/pilar 2.webp",
  },
  {
    title: "Incorporação",
    body: "Nesse momento finalizamos todo o processo legal de aprovar e registrar a construção de um empreendimento, para então obter o R.I. (Registro da Incorporação), que nos permite vender as unidades antes ou durante as obras de forma totalmente legal e com segurança aos compradores e investidores.",
    src: "/pilar4.webp",
  },
  {
    title: "Lançamento Imobiliário",
    body: "Aqui é onde toda a nossa equipe comercial, devidamente treinada, capacita e orienta mais de 10.000 corretores, no Brasil e no exterior, para a venda do empreendimento. As unidades disponíveis esgotam-se em poucos meses. Com a venda do empreendimento, fechamos o ciclo ARI, onde o capital retorna aos investidores, encerrando a operação de incorporação imobiliária.",
    src: "/pilar3.webp",
  },
  {
    title: "Construção do Empreendimento",
    body: "Para concretizar todo o processo, entramos na fase de construção do empreendimento com a execução física do projeto. Através da captação com a venda e parceria com fundos imobiliários, garantimos o capital necessário para que a obra avance com rapidez. Essa fase exige seguir normas técnicas rigorosas e a execução de etapas interdependentes, que garantem a segurança, a qualidade estrutural e a entrega do imóvel no prazo.",
    src: "/tourmaline.webp",
  },
];

const N = projects.length;
const CARD_H = 60;                          // svh — altura do card (svh = fixo, não muda com a barra do browser)
const STICKY_TOP = (100 - CARD_H) / 2;     // 20svh — centraliza o card na tela
const SEG = 100;                            // svh por segmento de scroll
const Y_PER_CARD = 40;                      // px que cada card enterrado sobe

// Card j trava no centro quando scroll ≈ j/(N-1) de progresso
const stickProgress = (j: number) => (N === 1 ? 0 : j / (N - 1));

function Card({
  index,
  progress,
  title,
  body,
  src,
}: {
  index: number;
  progress: any;
  title: string;
  body: string;
  src: string;
}) {
  // y em px — sobe apenas após o próximo card travar, não antes
  // keys: [quando eu travei, quando card+1 trava, quando card+2 trava, ...]
  // vals: [  0,                  0,                    -20,                ...]
  const keys: number[] = [];
  const yVals: number[] = [];
  const scaleVals: number[] = [];

  for (let j = index; j < N; j++) {
    keys.push(stickProgress(j));
    // Sobe e encolhe já quando o próximo card entra (em sincronia)
    const buried = Math.max(0, j - index);
    yVals.push(-buried * Y_PER_CARD);
    scaleVals.push(Math.max(0.84, 1 - buried * 0.05));
  }

  const y = useTransform(progress, keys, yVals);
  const scale = useTransform(progress, keys, scaleVals);

  return (
    <motion.div
      style={{
        y,
        scale,
        position: "sticky",
        top: `${STICKY_TOP}svh`,
        height: `${CARD_H}svh`,
        marginTop: index === 0 ? 0 : `${SEG - CARD_H}svh`,
        zIndex: index,
      }}
      className="rounded-2xl overflow-hidden bg-white border border-white/10"
    >
      <Image src={src} alt={title} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1">
        <h3 className="text-white font-bold text-base">{title}</h3>
        <p className="text-white/60 text-xs leading-relaxed">{body}</p>
      </div>
    </motion.div>
  );
}

export default function PilaresCards() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={container}
      className="relative bg-white lg:hidden"
      style={{ height: `${N * SEG}svh` }}
    >
      <div className="px-6 pt-10 pb-6">
        <p className="font-display text-4xl text-center font-nbold text-navy">
          Etapas do nosso processo:
        </p>
      </div>
      <div>
        {projects.map((project, i) => (
          <Card
            key={i}
            index={i}
            progress={scrollYProgress}
            title={project.title}
            body={project.body}
            src={project.src}
          />
        ))}
      </div>
    </div>
  );
}
