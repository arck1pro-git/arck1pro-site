"use client";

import { useState } from "react";
import ContactModal from "../ContactModal";
import { ArrowUpRight } from "lucide-react";
import { HERO_VIDEO } from "@/lib/media";

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  // O rounded-b-4xl conta com o overflow-hidden que já estava na section: é o
  // overflow que faz o vídeo, posicionado em inset-0, respeitar o canto. O branco
  // que aparece no recorte vem do <main>, em page.tsx — o fundo da própria
  // section seria recortado junto com ele.
  return (
    <section
      id="hero"
      className="reveal reveal--fade min-h-svh flex flex-col justify-between pt-32 px-6 pb-24 relative overflow-hidden rounded-b-4xl"
      style={{ marginTop: "calc(var(--header-h) * -1)" }}
    >
      {/* Vídeo direto, sem camada de foto atrás. Por isso `object-cover` em vez da
          geometria da antiga header.png (largura cheia, altura proporcional): sem
          nada embaixo para tapar, uma tela mais alta que 16:9 deixaria à mostra o
          fundo da section. Cobrir garante a hero preenchida em qualquer proporção,
          ao custo de cortar as laterais nessas telas. */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Sombra uniforme sobre a seção inteira. */}
      <div aria-hidden className="hero-scrim" />

      {/* Título ancorado no topo. */}
      <div className="container relative text-center">
        {/* Desktop: escala com a largura e satura em 6rem (= text-8xl), para a
            primeira linha caber inteira e o título ficar sempre em 2 linhas.
            Mobile em text-5xl (48px): com o subtexto oculto abaixo, sobra altura
            para o título dominar. A 48px a primeira linha quebra em duas, mas
            nenhuma palavra isolada estoura a largura nem no menor telefone. */}
        <h1 className="font-display text-cream font-light leading-[0.96] tracking-[-0.02em] text-5xl lg:text-[clamp(3.5rem,7.2vw,6rem)]">
          Segurança, valorização e<br />
          <span className="text-gold-hero font-serif-italic font-normal">rentabilidade</span>
        </h1>
      </div>

      {/* Descido pelo `justify-between` da section, não por `mt-auto` aqui: .container
          declara `margin: 0 auto` fora de cascade layer, e isso vence as utilities do
          Tailwind (que ficam em @layer utilities), zerando qualquer margin aplicada
          por classe neste elemento. */}
      <div className="container relative flex flex-col items-center gap-8 text-center">
        {/* Oculto no mobile: hidden tira do fluxo, então o gap-8 do flex some
            junto e não deixa buraco entre o título e os botões. */}
        <p className="hidden lg:block font-sans fs-16 leading-[1.75] font-normal text-white max-w-[540px]">
          Abrimos a fase mais rentável do mercado imobiliário, a incorporação, para um grupo restrito de investidores qualificados, onde o capital realmente multiplica com segurança e lastro físico.
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <button type="button" className="btn btn--gold" onClick={() => setModalOpen(true)}>
            Quero me qualificar <ArrowUpRight className="arrow" size={16} strokeWidth={2} aria-hidden />
          </button>
          <a href="/ari" className="btn btn--gold">
            Conhecer o ARI <ArrowUpRight className="arrow" size={16} strokeWidth={2} aria-hidden />
          </a>
        </div>
      </div>

      <ContactModal open={modalOpen} role={modalOpen ? "investidor" : null} onClose={() => setModalOpen(false)} />
    </section>
  );
}
