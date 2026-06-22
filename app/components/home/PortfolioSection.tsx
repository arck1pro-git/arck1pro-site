"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

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
        {/* Foto de fundo com parallax — next/image (AVIF + responsivo) */}
        <div
          ref={bgRef}
          aria-hidden
          className="absolute top-[-25%] bottom-[-25%] left-0 right-0 will-change-transform"
        >
          <Image
            src="/tourmaline perspectiva.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
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
                O Tourmaline Tower transcende a ideia de construção; ele é um ativo imobiliário de alta performance, a primeira infraestrutura física de Porto Belo totalmente ativada por um sistema operacional predial com Inteligência Artificial integrada.
              </p>
              <p className="font-sans text-white/80 text-xs lg:text-base leading-snug lg:leading-[1.8] m-0">
                Nossa engenharia de performance desenha a tipologia para a eficiência de capital, transformando a governança predial em um investimento que reduz riscos e protege o preço no longo prazo.
                Aqui, a inteligência preditiva e a neuroarquitetura não são apenas diferenciais estéticos, mas sim o alicerce para uma harmonia operacional que permite recuperar o luxo mais escasso da era moderna: o seu tempo.
              </p>
              <p className="font-sans text-white/80 text-xs lg:text-base leading-snug lg:leading-[1.8] m-0">
                Além da arquitetura e das paredes, entregamos um ecossistema digital projetado para performar, onde a tecnologia serve à vida e a inteligência garante a perpetuidade do valor.
              </p>
            </div>

            <Link
              href="/empreendimentos"
              className="btn btn--gold"
              style={{ width: "fit-content" }}
            >
              Quero conhecer o Tourmaline <span className="arrow">→</span>
            </Link>
          </div>
        </div>
    </section>
  );
}
