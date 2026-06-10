"use client";

import { useState, useEffect } from "react";
import { LayoutTemplate, TrendingUp, Building2, Megaphone, HardHat } from "lucide-react";
import PilaresHero from "./PilaresHero";
import PilaresCards from "./PilaresCards";

const solutions = [
  {
    title: "Desenvolvimento de Projeto",
    body: "Aquisição do terreno, diligências jurídicas da área e viabilidades técnicas do projeto com os órgãos públicos, inclusive ambientais. Desenvolvimento de todo o projeto em tecnologia BIM. Todo o projeto é desenvolvido para um público específico, com tipologias de plantas orientadas à eficiência de capital e maior retorno do investidor em todas as fases. Cada metro quadrado é projetado para maximizar VGV e reduzir o tempo de venda. Além de contar com sustentabilidade integrada e certificada e tecnologia IA Smart Building.",
    Icon: LayoutTemplate,
  },
  {
    title: "Captação de Recursos",
    body: "Após o desenvolvimento e validação de todo o projeto, com critérios extremamente rígidos, entra a estrutura própria de captação via ARI – Ativo de Renda Imobiliária. Aqui é onde o investidor entra. Captamos no máximo 5% do valor do VGV para a estruturação de todo o projeto. Esse valor normalmente é captado com grupos de 8 a 17 investidores qualificados, criteriosamente selecionados para participar do desenvolvimento do projeto e do sucesso da incorporação.",
    Icon: TrendingUp,
  },
  {
    title: "Incorporação",
    body: "Nesse momento finalizamos todo o processo legal de aprovar e registrar a construção de um empreendimento, para então obter o R.I. (Registro da Incorporação), que nos permite vender as unidades antes ou durante as obras de forma totalmente legal e com segurança aos compradores e investidores.",
    Icon: Building2,
  },
  {
    title: "Lançamento Imobiliário",
    body: "Aqui é onde toda a nossa equipe comercial, devidamente treinada, capacita e orienta mais de 10.000 corretores, no Brasil e no exterior, para a venda do empreendimento. As unidades disponíveis esgotam-se em poucos meses. Com a venda do empreendimento, fechamos o ciclo ARI, onde o capital retorna aos investidores, encerrando a operação de incorporação imobiliária.",
    Icon: Megaphone,
  },
  {
    title: "Construção do Empreendimento",
    body: "Para concretizar todo o processo, entramos na fase de construção do empreendimento com a execução física do projeto. Através da captação com a venda e parceria com fundos imobiliários, garantimos o capital necessário para que a obra avance com rapidez. Essa fase exige seguir normas técnicas rigorosas e a execução de etapas interdependentes, que garantem a segurança, a qualidade estrutural e a entrega do imóvel no prazo.",
    Icon: HardHat,
  },
];

export default function PilaresSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((a) => (a + 1) % solutions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="metodo" className="font-display bg-white relative z-10 -mt-12 rounded-4xl overflow-clip">
      {/* Mobile */}
      <PilaresHero />
      <PilaresCards />

      {/* Desktop intro */}
      <div className="hidden lg:block max-w-[1400px] mx-auto px-6 py-10">
        <h2
          className="font-display font-bold leading-[1.15] text-6xl tracking-[-0.01em] mb-20 mt-10"
          style={{ color: "var(--brand-navy)" }}
        >
          A incorporação é a fase
          
          de maior rendimento no mercado imobiliário e <span className="text-gold">poucos sabem como acessá-la.</span>
          <br />
        </h2>
        <div className="max-w-2xl mt-8 flex flex-col gap-4" style={{ color: "var(--brand-navy)" }}>
          <p className="text-lg leading-relaxed opacity-80">
            Desenvolvemos empreendimentos imobiliários únicos com tecnologia e sustentabilidade e convidamos poucos investidores qualificados e criteriosamente selecionados para se tornarem nossos sócios investidores.
          </p>
          <p className="text-lg leading-relaxed opacity-80">
            Como investidor, você acompanha cada etapa com total transparência sobre os números e resultados esperados.
          </p>
          <p className="text-lg leading-relaxed font-semibold">
            Aqui, você lucra como um incorporador, participando dos bastidores da multiplicação de patrimônio do mercado imobiliário.
          </p>
        </div>
      </div>

      {/* Desktop timeline */}
      <div className="hidden lg:block bg-white">
        <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-16">
          <div className="relative py-20">
            {/* Linha horizontal conectando os nós */}
            <div
              className="absolute left-[10%] right-[10%] h-px"
              style={{ top: "calc(var(--s-20) + 28px)", background: "var(--brand-stone)" }}
            />
            <div className="grid grid-cols-5 gap-8">
              {solutions.map(({ title, body, Icon }, i) => {
                const isActive = i === active;
                return (
                  <div key={i} className="relative flex flex-col items-center text-center gap-4">
                    {/* Nó com ícone */}
                    <div
                      className="relative z-10 flex items-center justify-center rounded-full bg-white"
                      style={{
                        width: 56,
                        height: 56,
                        border: "2px solid var(--brand-gold)",
                        transform: isActive ? "scale(1.12)" : "scale(1)",
                        boxShadow: isActive
                          ? "0 0 0 4px rgba(194,143,80,0.18), 0 0 28px rgba(194,143,80,0.65)"
                          : "0 0 0 0 rgba(194,143,80,0)",
                        transition: "transform 0.6s var(--ease-out), box-shadow 0.6s var(--ease-out)",
                      }}
                    >
                      <Icon
                        size={24}
                        style={{
                          color: "var(--brand-gold)",
                          opacity: isActive ? 1 : 0.55,
                          transition: "opacity 0.6s var(--ease-out)",
                        }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="font-bold text-sm tracking-widest" style={{ color: "var(--brand-gold)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-bold text-xl leading-snug" style={{ color: "var(--brand-navy)" }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--brand-navy)", opacity: 0.7 }}>{body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
