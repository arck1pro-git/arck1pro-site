"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let sectionTop = 0;
    let rafId = 0;

    const calibrate = () => {
      sectionTop = sectionRef.current?.offsetTop ?? 0;
    };

    const tick = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${(window.scrollY - sectionTop) * 0.3}px)`;
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
      id="hero"
      className="-mt-[82px] min-h-svh flex flex-col justify-center pt-24 px-6 pb-20 relative overflow-hidden"
    >
      {/* Foto de fundo com parallax */}
      <div
        ref={bgRef}
        aria-hidden
        className="absolute top-[-30%] bottom-[-30%] left-0 right-0 bg-[url('/hero.png')] bg-cover bg-[center_30%] bg-no-repeat will-change-transform"
      />

      {/* Overlay navy vindo da esquerda */}
      <div aria-hidden className="hero-overlay" />

      <div className="container flex flex-col gap-8 relative">

        <h1 className="font-display text-cream font-bold leading-[0.96] tracking-[-0.02em] text-4xl lg:text-6xl max-w-[860px]">
          Concreto, patrimônio e<br />
          <span className="text-gold-hero font-bold">rentabilidade</span>
        </h1>

        <p className="font-sans fs-16 leading-[1.75] font-bold text-[rgba(236,235,231,0.55)] max-w-[540px]">
          Grandes patrimônios se constroem sobre bases concretas. Abrimos a fase mais rentável da incorporação a um grupo restrito de investidores qualificados, onde o capital realmente trabalha.
        </p>

        <div className="flex gap-3 flex-wrap pt-2">
          <a href="#historia" className="btn btn--gold">
            Nossa história <span className="arrow">→</span>
          </a>
          <a href="#ari" className="btn btn--ghost-inv">
            Conhecer o ARI <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
