"use client";

import { useState, useEffect } from "react";
import { LayoutTemplate, TrendingUp, Megaphone, Building2 } from "lucide-react";
import PilaresHero from "./PilaresHero";
import PilaresCards from "./PilaresCards";

const solutions = [
  {
    title: "Desenvolvimento de Projeto",
    body: "BIM completo com tipologia orientada à eficiência de capital. Cada metro quadrado é projetado para maximizar VGV e reduzir o tempo de venda.",
    Icon: LayoutTemplate,
  },
  {
    title: "Captação de Recursos",
    body: "Estrutura própria de captação via ARI. Aqui é onde o investidor entra. Captamos recurso necessário para o desenvolvimento do projeto.",
    Icon: TrendingUp,
  },
  {
    title: "Lançamento Imobiliário",
    body: "Equipe comercial, evento e treinamento de corretores dentro do mesmo ecossistema. A operação de vendas é montada antes do lançamento, não durante.",
    Icon: Megaphone,
  },
  {
    title: "Incorporação",
    body: "Estruturação técnica, jurídica e comercial do empreendimento em uma operação integrada. Do registro de incorporação à entrega das chaves.",
    Icon: Building2,
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
          <br />
          de maior rendimento no mercado imobiliário, e poucos sabem acessá-la.
          <br />
          <span style={{ color: "var(--brand-gold)" }}>Nós abrimos essa porta para você.</span>
        </h2>
        <div className="max-w-2xl mt-8 flex flex-col gap-4" style={{ color: "var(--brand-navy)" }}>
          <p className="text-lg leading-relaxed opacity-80">
            Desenvolvemos empreendimentos imobiliários únicos e convidamos pessoas selecionadas a se tornarem nossos sócios.
          </p>
          <p className="text-lg leading-relaxed opacity-80">
            Como investidor, você acompanha cada etapa com total clareza sobre os resultados esperados.
          </p>
          <p className="text-lg leading-relaxed font-semibold">
            Aqui, você lucra do jeito que um incorporador lucra.
          </p>
        </div>
      </div>

      {/* Desktop timeline */}
      <div className="hidden lg:block bg-white">
        <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-16">
          <div className="relative py-20">
            {/* Linha horizontal conectando os nós */}
            <div
              className="absolute left-[12.5%] right-[12.5%] h-px"
              style={{ top: "calc(var(--s-20) + 28px)", background: "var(--brand-stone)" }}
            />
            <div className="grid grid-cols-4 gap-8">
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
