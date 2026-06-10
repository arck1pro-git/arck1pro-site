"use client";

import { useEffect, useRef, useState } from "react";
import ContactModal from "../ContactModal";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

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
        className="absolute top-[-30%] bottom-[-30%] left-0 right-0 bg-[url('/header.png')] bg-cover bg-[center_30%] bg-no-repeat will-change-transform"
      />

      {/* Overlay navy vindo da esquerda */}
      <div aria-hidden className="hero-overlay" />

      <div className="container flex flex-col gap-8 relative">

        <h1 className="font-display text-cream font-bold leading-[0.96] tracking-[-0.02em] text-4xl lg:text-6xl max-w-[860px]">
          Segurança, valorização e<br />
          <span className="text-gold-hero font-bold">rentabilidade</span>
        </h1>

        <p className="font-sans fs-16 leading-[1.75] font-bold text-[rgba(236,235,231,0.55)] max-w-[540px]">
          Grandes patrimônios se constroem sobre bases sólidas. Abrimos a fase mais rentável do mercado imobiliário, a incorporação, para um grupo restrito de investidores qualificados, onde o capital realmente multiplica com segurança e lastro físico.
        </p>

        <div className="flex gap-3 flex-wrap pt-2">
          <button type="button" className="btn btn--gold" onClick={() => setModalOpen(true)}>
            Quero me qualificar <span className="arrow">→</span>
          </button>
          <a href="/ari" className="btn btn--ghost-inv">
            Conhecer o ARI <span className="arrow">→</span>
          </a>
        </div>
      </div>

      <ContactModal open={modalOpen} role={modalOpen ? "investidor" : null} onClose={() => setModalOpen(false)} />
    </section>
  );
}
