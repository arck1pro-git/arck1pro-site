"use client";

import { useState } from "react";
import ContactModal from "../ContactModal";

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="hero"
      className="min-h-svh flex flex-col justify-center pt-24 px-6 pb-20 relative overflow-hidden"
      style={{ marginTop: "calc(var(--header-h) * -1)" }}
    >
      {/* Desktop: foto na largura da tela (100% de largura, altura proporcional —
          header.png é 16:9), sem cover, que ampliava e cortava as laterais.
          Mobile: preenche a altura, senão a foto cobriria só o topo da tela. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[url('/header.png')] bg-no-repeat bg-[length:auto_100%] bg-center lg:bg-[length:100%_auto] lg:bg-top"
      />

      {/* Mobile: sombra sobre a seção toda, no lugar do painel colado no bloco. */}
      <div aria-hidden className="hero-scrim" />

      <div className="container relative">
        <div aria-hidden className="hero-panel" />

        <div className="flex flex-col gap-8 relative">
          <h1 className="font-display text-cream font-bold leading-[0.96] tracking-[-0.02em] text-4xl lg:text-6xl max-w-[860px]">
            Segurança, valorização e<br />
            <span className="text-gold-hero font-bold">rentabilidade</span>
          </h1>

          <p className="font-sans fs-16 leading-[1.75] font-bold text-white max-w-[540px]">
            Grandes patrimônios se constroem sobre bases sólidas. Abrimos a fase mais rentável do mercado imobiliário, a incorporação, para um grupo restrito de investidores qualificados, onde o capital realmente multiplica com segurança e lastro físico.
          </p>

          <div className="flex gap-3 flex-wrap pt-2">
            <button type="button" className="btn btn--gold" onClick={() => setModalOpen(true)}>
              Quero me qualificar <span className="arrow">→</span>
            </button>
            <a href="/ari" className="btn btn--gold">
              Conhecer o ARI <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>

      <ContactModal open={modalOpen} role={modalOpen ? "investidor" : null} onClose={() => setModalOpen(false)} />
    </section>
  );
}
