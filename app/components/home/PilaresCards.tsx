"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "Desenvolvimento de Projeto",
    body: "BIM completo com tipologia orientada à eficiência de capital. Cada metro quadrado é projetado para maximizar VGV e reduzir o tempo de venda.",
    src: "/pilar1.png",
  },
  {
    title: "Captação de Recursos",
    body: "Estrutura própria de captação via ARI. Aqui é onde o investidor entra. Captamos recurso necessário para o desenvolvimento do projeto.",
    src: "/pilar 2.png",
  },
  {
    title: "Lançamento Imobiliário",
    body: "Equipe comercial, evento e treinamento de corretores dentro do mesmo ecossistema. A operação de vendas é montada antes do lançamento, não durante.",
    src: "/pilar3.png",
  },
  {
    title: "Incorporação",
    body: "Estruturação técnica, jurídica e comercial do empreendimento em uma operação integrada. Do registro de incorporação à entrega das chaves.",
    src: "/pilar4.png",
  },
];

const N = projects.length;
const CARD_H = 60;                          // svh — altura do card (svh = fixo, não muda com a barra do browser)
const STICKY_TOP = (100 - CARD_H) / 2;     // 20svh — centraliza o card na tela
const SEG = 100;                            // svh por segmento de scroll
const Y_PER_CARD = 20;                      // px que cada card enterrado sobe

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

  for (let j = index; j < N; j++) {
    keys.push(stickProgress(j));
    // Y só começa a mudar um passo depois de o próximo chegar
    const buried = Math.max(0, j - index - 1);
    yVals.push(-buried * Y_PER_CARD);
  }

  const y = useTransform(progress, keys, yVals);

  return (
    <motion.div
      style={{
        y,
        position: "sticky",
        top: `${STICKY_TOP}svh`,
        height: `${CARD_H}svh`,
        marginTop: index === 0 ? 0 : `${SEG - CARD_H}svh`,
        zIndex: index,
      }}
      className="rounded-2xl overflow-hidden bg-white border border-white/10"
    >
      <img src={src} alt={title} className="h-full w-full object-cover" />
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
