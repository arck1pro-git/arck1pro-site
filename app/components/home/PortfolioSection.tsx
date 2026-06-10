"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, Building2, Briefcase, MapPin, TrendingUp, type LucideIcon } from "lucide-react";
import ContactModal from "../ContactModal";

type Stat = {
  value: string;
  label: string;
  icon: LucideIcon;
  tag: string;
  variant: "base" | "gold" | "outline";
  size: "lg" | "md" | "sm";
  desc?: string;
};

const stats: Stat[] = [
  {
    value: "+20",
    label: "anos de atuação no mercado imobiliário",
    icon: Clock,
    tag: "Experiência",
    variant: "base",
    size: "lg",
    desc: "Duas décadas estruturando e entregando empreendimentos de alto padrão no litoral catarinense.",
  },
  { value: "+350", label: "empreendimentos estruturados", icon: Building2, tag: "Trajetória", variant: "base", size: "sm" },
  {
    value: "+10",
    label: "empreendimentos no portfólio",
    icon: Briefcase,
    tag: "Portfólio",
    variant: "base",
    size: "lg",
    desc: "Ativos selecionados e em operação, com curadoria de localização e tipologia.",
  },
  {
    value: "18",
    label: "meses — tempo mínimo de retorno",
    icon: TrendingUp,
    tag: "Performance",
    variant: "gold",
    size: "lg",
    desc: "Ciclos de retorno acelerados, sustentados por engenharia de performance e governança predial.",
  },
  { value: "+5", label: "cidades no litoral catarinense", icon: MapPin, tag: "Presença", variant: "base", size: "sm" },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let sectionTop = 0;
    let rafId = 0;

    const calibrate = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      sectionTop = rect ? rect.top + window.scrollY : 0;
    };

    const tick = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${(window.scrollY - sectionTop) * 0.2}px)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    calibrate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calibrate, { passive: true });
    tick();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calibrate);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="min-h-screen lg:min-h-screen flex flex-col p-6 overflow-hidden relative"
      style={{ background: "var(--brand-navy)" }}
    >
        {/* Foto de fundo com parallax — cobre toda a section */}
        <div
          ref={bgRef}
          aria-hidden
          className="absolute top-[-25%] bottom-[-25%] left-0 right-0 bg-[url('/tourmaline%20perspectiva.png')] bg-cover lg:bg-[length:100%_auto] bg-center bg-no-repeat will-change-transform"
        />
        {/* Overlay para legibilidade */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.6) 100%)" }}
        />

        {/* Conteúdo — texto à esquerda no topo, cards minúsculos na base */}
        <div className="relative z-10 flex flex-col h-full w-full max-w-[1400px] mx-auto px-6 pt-10 pb-8 lg:pt-12 lg:pb-10">
          {/* Título + texto editorial */}
          <div className="flex flex-col max-w-[600px] gap-3 lg:gap-6">
            <h2 className="font-display text-white font-bold text-2xl lg:text-6xl">
              Tourmaline Tower: a arquitetura na era da inteligência.
            </h2>
            <div className="flex flex-col gap-2 lg:gap-5">
              <h3 className="font-display text-white text-lg lg:text-4xl font-bold">
                A Soberania da Eficiência
              </h3>
              <p className="font-sans text-white/80 text-xs lg:text-base leading-snug lg:leading-[1.8] m-0">
                Em um mercado de commodities, a verdadeira soberania não nasce do volume, mas da precisão técnica e da preservação patrimonial.
                O Tourmaline Tower transcende a ideia de construção; ele é um ativo imobiliário de alta performance, a primeira infraestrutura física de Porto Belo totalmente ativada por um sistema operacional predial.
              </p>
              <p className="font-sans text-white/80 text-xs lg:text-base leading-snug lg:leading-[1.8] m-0">
                Nossa engenharia de performance desenha a tipologia para a eficiência de capital, transformando a governança predial em uma máquina de yield que reduz riscos e protege o preço no longo prazo.
                Aqui, a inteligência preditiva e a neuroarquitetura não são apenas diferenciais estéticos, mas sim o alicerce para uma harmonia operacional que reavê o luxo mais escasso da era moderna: o seu tempo.
              </p>
              <p className="font-sans text-white/80 text-xs lg:text-base leading-snug lg:leading-[1.8] m-0">
                Não entregamos apenas paredes; entregamos um ecossistema digital projetado para performar, onde a tecnologia serve à vida e a inteligência garante a perpetuidade do valor.
              </p>
            </div>

            <button
              type="button"
              className="btn btn--gold"
              style={{ width: "fit-content" }}
              onClick={() => setModalOpen(true)}
            >
              Quero vender o Tourmaline <span className="arrow">→</span>
            </button>
          </div>

          {/* Espaçador — afasta um pouco os bullets do texto */}
          <div className="h-8 lg:h-12" />

          {/* Bullets com ícone em containers desfocados */}
          <div className="grid grid-cols-2 lg:grid-cols-5 w-full gap-2  lg:gap-3">
            {stats.map((s, i) => {
              const Icon = s.icon;
              const isGold = s.variant === "gold";
              return (
                <div
                  key={i}
                  className="flex items-center rounded-full backdrop-blur-md min-w-0 gap-2 px-3 py-1.5 lg:py-2"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <Icon size={16} strokeWidth={2} className="shrink-0 lg:w-[18px] lg:h-[18px]" style={{ color: isGold ? "var(--brand-gold)" : "#fff" }} />
                  <div className="flex flex-col leading-tight min-w-0">
                    <span
                      className="font-display font-bold text-[13px] lg:text-sm leading-none"
                      style={{ color: isGold ? "var(--brand-gold)" : "#fff" }}
                    >
                      {s.value}
                    </span>
                    <span className="font-sans text-white/55 truncate text-[10px] lg:text-xs">
                      {s.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <ContactModal open={modalOpen} role={modalOpen ? "corretor" : null} onClose={() => setModalOpen(false)} />
    </section>
  );
}
