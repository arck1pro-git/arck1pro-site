"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const bio = [
  "Arquiteto e urbanista de formação, Fabrício transformou duas décadas de obra em uma tese sobre eficiência de capital aplicada ao mercado imobiliário. Cada projeto que assina nasce de uma pergunta simples: como proteger e multiplicar o patrimônio de quem confia na ARI?",
  "À frente da incorporadora, ele lidera a engenharia de performance que une neuroarquitetura, inteligência preditiva e governança predial.",
];

export default function PeopleSection() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="lider"
      className="font-display bg-white relative z-10 -mt-12 rounded-t-4xl overflow-clip min-h-auto lg:h-auto flex flex-col"
    >
      {/* Hero — apresentação do líder (centralizado) */}
      <div className="shrink-0 max-w-[1400px] w-full mx-auto px-6 pt-12 pb-8 lg:pt-16 lg:pb-6 text-center flex flex-col items-center">
        <h2
          className="font-display font-bold hidden lg:block leading-[1.1] text-3xl lg:text-2xl max-w-4xl"
          style={{ color: "var(--brand-navy)" }}
        >
          A <span className="font-carla font-normal">ARCK<span className="text-gold">1</span>PRO</span> nasce da visão de que o litoral catarinense é o rendimento mais sólido do mercado imobiliário. Somos formados por pessoas que acreditam no potencial regional de valorização
        </h2>
        
      </div>

      {/* Foto centralizada + toggle; texto surge sobre a foto */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-start px-6 pb-12 pt-8 lg:pt-12">
        {/* Rótulo — só no mobile, acima da foto */}
        <span
          className="lg:hidden font-bold uppercase tracking-widest text-sm mb-3"
          style={{ color: "var(--brand-gold)" }}
        >
          Nosso Fundador
        </span>

        {/* Wrapper — largura total no mobile, dimensionado pela foto no lg */}
        <div className="flex w-full p-5 lg:p-0 lg:inline-flex lg:w-auto flex-col items-stretch gap-6">
          {/* Foto com overlay de texto no mesmo formato */}
          <div className="relative">
            <img
              src="/fabhricio.png"
              alt="Fabrício — fundador e líder da ARI"
              className="block w-full h-auto lg:w-auto lg:max-h-[40vh] object-contain rounded-xl"
            />
            {/* Overlay — mesmo recorte da foto */}
            <div
              className="absolute inset-0 rounded-xl flex flex-col justify-center gap-3 p-6 overflow-hidden backdrop-blur-sm transition-opacity duration-500"
              style={{
                background: "rgba(0,16,49,0.92)",
                opacity: open ? 1 : 0,
                pointerEvents: open ? "auto" : "none",
              }}
            >
              {bio.map((paragraph, i) => (
                <p key={i} className="text-white/85 text-[11px] lg:text-xs leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Botão com o nome — largura da foto */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="btn btn--gold w-full justify-center"
            aria-expanded={open}
          >
            Fabhrício
            <ChevronDown
              size={16}
              className="transition-transform duration-300"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
