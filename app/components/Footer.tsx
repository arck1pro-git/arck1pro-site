"use client";

import { useState } from "react";
import ContactModal from "./ContactModal";
import { ArrowUpRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contato";
import Link from "next/link";
import { GUIAS, GUIA_SLUGS } from "@/lib/guias";
import { COMPARATIVOS } from "@/lib/comparativos";
import { EMPRESA } from "@/lib/empresa";

type ModalRole = "investidor";

// Mapa do site no rodapé: toda página indexável tem ao menos um link rastreável
// saindo de todas as outras. Antes /portobelo, /sobre e os comparativos só
// eram alcançáveis pelo sitemap.
const MAPA: { titulo: string; links: { label: string; href: string }[] }[] = [
  {
    titulo: "Institucional",
    links: [
      { label: "Início", href: "/" },
      { label: "ARI", href: "/ari" },
      { label: "Simulador", href: "/simulador" },
      { label: "Porto Belo", href: "/portobelo" },
      { label: "Nossa história", href: "/sobre" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    titulo: "Guias do investidor",
    links: GUIA_SLUGS.map((slug) => ({ label: GUIAS[slug].nome, href: `/${slug}` })),
  },
  {
    titulo: "ARI comparado",
    links: COMPARATIVOS.map((c) => ({ label: `ARI ou ${c.nome}`, href: `/${c.slug}` })),
  },
];

const CONTATOS: { texto: string; href?: string }[] = [
  { texto: "atendimento@arck1pro.com.br" },
  { texto: "(47) 9 9200-6498", href: WHATSAPP_URL },
  { texto: "@arck1pro" },
];

export default function Footer() {
  const [modalRole, setModalRole] = useState<ModalRole | null>(null);

  return (
    <footer
      id="contato"
      className="relative z-0 font-display"
      style={{
        // Mesmo fundo da section de artigos: o radial navy diluído no canto
        // inferior direito, sobre o branco do --surface, com a textura de grão
        // por cima. Saíram junto a footerold.png, os três véus pretos empilhados
        // e o vignette inset — era tudo geometria da versão escura.
        //
        // Os raios não são os 55%/55% do blog: a elipse é medida sobre o próprio
        // elemento, e o rodapé é bem mais baixo que a section de artigos. Com a
        // mesma porcentagem a mancha virava uma faixa achatada colada no canto.
        // 60%/100% devolve a ela a mesma altura aparente, e o 0.16 compensa o
        // fato de que aqui ela se espalha por mais área.
        background:
          'radial-gradient(ellipse 60% 100% at 100% 100%, rgba(0,16,49,0.16) 0%, transparent 100%), var(--surface)',
        color: "#000000",
        overflowX: "hidden",
      }}
    >
      {/* Grão em z-index 0: os blocos de conteúdo abaixo precisam de
          position:relative, senão um elemento posicionado passa por cima deles. */}
      <div aria-hidden className="grao" />

      {/* Conversão final */}
      <div
        className="container relative"
        style={{
          padding: "var(--s-16) var(--s-6)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--s-10)",
        }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto", width: "100%", textAlign: "center" }}>
          <p
            className="font-display"
            style={{
              // Era var(--fs-24), fixo em 24px. Agora escala até 40px, tamanho
              // de chamada e não de rótulo.
              fontSize: "clamp(28px, 3.2vw, 40px)",
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              marginBottom: "var(--s-4)",
            }}
          >
            {/* .text-gold-soft e não .text-gold-grad: aquela rampa vertical
                começa no #fae394 e o topo do "1" sumiria contra o branco. */}
            Fale com a ARCK<span className="text-gold-soft" style={{ fontWeight: 600 }}>1</span>PRO
          </p>
          <p
            className="font-sans"
            style={{
              fontSize: "var(--fs-14)",
              lineHeight: 1.65,
              marginBottom: "var(--s-6)",
            }}
          >
            Diga quem você é e damos sequência à sua qualificação.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s-3)", justifyContent: "center" }}>
            <button type="button" className="btn btn--gold" onClick={() => setModalRole("investidor")}>
              Sou investidor <ArrowUpRight className="arrow" size={16} strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Divisor — tinta escura agora que a superfície é clara */}
      <div style={{ position: "relative", borderTop: "var(--hairline) solid rgba(0,0,0,0.12)" }} />

      {/* Footer Grid */}
      <div
        className="container relative grid grid-cols-1 lg:grid-cols-3 gap-10"
        style={{
          padding: "var(--s-12) var(--s-6)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>
          <span
            className="font-carla"
            style={{
              fontSize: "var(--fs-24)",
              fontWeight: 400,
            }}
          >
            ARCK<span className="text-gold-soft">1</span>PRO
          </span>

          <p
            className="font-display"
            style={{
              fontSize: "var(--fs-14)",
              lineHeight: 1.65,
              maxWidth: 280,
            }}
          >
            Primeira estruturadora de incorporações do litoral catarinense.
            <br />
            20 anos de história
            <br />
            +350 empreendimentos desenvolvidos
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-4)" }}>
          <p
            className="font-display text-base"
            style={{
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Contato
          </p>

          {/* Só o telefone tem href: ele é o botão de WhatsApp do rodapé, e abre
              a mesma conversa do ícone do header e do botão flutuante. E-mail e
              @ seguem como texto. */}
          {CONTATOS.map(({ texto, href }) => {
            const estilo = {
              fontSize: "var(--fs-13)",
              wordBreak: "break-all",
            } as const;

            return href ? (
              <a
                key={texto}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar no WhatsApp"
                className="font-display"
                // color inherit e sem sublinhado: o rodapé não tem outro link
                // para servir de referência, e o azul padrão do browser brigaria
                // com o preto do bloco.
                style={{ ...estilo, color: "inherit", textDecoration: "none", width: "fit-content" }}
              >
                {texto}
              </a>
            ) : (
              <span key={texto} className="font-display" style={estilo}>
                {texto}
              </span>
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-4)" }}>
          <p
            className="font-display text-base"
            style={{
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Endereço
          </p>

          <p
            className="font-display"
            style={{
              fontSize: "var(--fs-13)",
              lineHeight: 1.7,
            }}
          >
            Av. João Manoel Jacques, 160
            <br />
            Sala 1Z · Balneário Perequê
            <br />
            Porto Belo — SC
          </p>
        </div>

      </div>

      {/* Mapa do site */}
      <nav
        aria-label="Mapa do site"
        className="container relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        style={{ padding: "0 var(--s-6) var(--s-12)" }}
      >
        {MAPA.map((grupo) => (
          <div key={grupo.titulo} style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
            <p
              className="font-display text-base"
              style={{ letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "var(--s-1)" }}
            >
              {grupo.titulo}
            </p>
            {grupo.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-display"
                style={{ fontSize: "var(--fs-13)", color: "inherit", textDecoration: "none", width: "fit-content" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Identificação legal: razão social e CNPJ visíveis em todas as páginas
          (sinal de confiança para o investidor e dado que buscadores cruzam
          com o registro público). */}
      <div
        className="container relative font-display"
        style={{
          padding: "var(--s-6)",
          borderTop: "var(--hairline) solid rgba(0,0,0,0.12)",
          fontSize: "var(--fs-12)",
          lineHeight: 1.6,
          opacity: 0.75,
        }}
      >
        {EMPRESA.razaoSocial} · CNPJ {EMPRESA.cnpj} · {EMPRESA.endereco.cidade}/{EMPRESA.endereco.uf}
      </div>

      <ContactModal
        open={modalRole !== null}
        role={modalRole}
        onClose={() => setModalRole(null)}
      />
    </footer>
  );
}