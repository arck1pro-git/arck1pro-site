"use client";

import { useState } from "react";
import ContactModal from "./ContactModal";

type ModalRole = "corretor" | "investidor";

type FAQItem = {
  number: string;
  question: string;
  answer: string;
  cta: string | null;
  ctaHref: string | null;
};

const faqItems: FAQItem[] = [
  {
    number: "/01",
    question: "Quem é a ARCK1PRO e o que ela faz?",
    answer:
      "A ARCK1PRO é uma estruturadora imobiliária — o hub de método, capital intelectual e governança de um ecossistema completo. Ela não é uma construtora, nem uma imobiliária, nem uma consultoria aberta ao mercado.",
    cta: null,
    ctaHref: null,
  },
  {
    number: "/02",
    question: "O que é o ARI, Ativo de Renda Imobiliária?",
    answer:
      "O ARI é o instrumento de captação de capital estruturado pela ARCK1PRO para financiar a fase de pré-incorporação dos empreendimentos do ecossistema.",
    cta: "Conhecer o ARI completo",
    ctaHref: "#ari",
  },
  {
    number: "/03",
    question: "Onde fica o empreendimento?",
    answer:
      "O Tourmaline Tower está em Porto Belo, Santa Catarina — no eixo entre Balneário Camboriú, Itapema e Bombinhas.",
    cta: "Ver análise completa do mercado",
    ctaHref: "#mercado",
  },
  {
    number: "/04",
    question: "Quem é a Harpaluus Incorporadora?",
    answer:
      "A Harpaluus é a incorporadora do ecossistema. Executa e assina os empreendimentos perante o mercado.",
    cta: null,
    ctaHref: null,
  },
];

export default function Footer() {
  const [open, setOpen] = useState<number | null>(null);
  const [modalRole, setModalRole] = useState<ModalRole | null>(null);

  return (
    <footer
      id="contato"
      className="relative z-0 -mt-12 font-display"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 2.5%), radial-gradient(120% 80% at 50% 100%, rgba(28,48,95,0.45) 0%, rgba(0,16,49,0) 60%), linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.82) 100%), url('/footerold.png') center/cover no-repeat",
        color: "var(--brand-cream)",
        overflowX: "hidden",
        boxShadow: "inset 0 0 220px 40px rgba(0,16,49,0.55)",
      }}
    >
      {/* FAQ */}
      <div
        className="container"
        style={{
          padding: "var(--s-16) var(--s-6)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--s-10)",
        }}
      >
        {/* Segmentação — abre o formulário no modal conforme o perfil */}
        <div style={{ maxWidth: 560, margin: "0 auto", width: "100%", textAlign: "center" }}>
          <p
            className="font-display"
            style={{
              fontSize: "var(--fs-24)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
              marginBottom: "var(--s-3)",
            }}
          >
            Fale com a ARCK<span className="text-gold-grad" style={{ fontWeight: 600 }}>1</span>PRO
          </p>
          <p
            className="font-sans"
            style={{
              fontSize: "var(--fs-14)",
              lineHeight: 1.65,
              color: "rgba(236,235,231,0.6)",
              marginBottom: "var(--s-6)",
            }}
          >
            Diga quem você é e damos sequência à sua qualificação.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s-3)", justifyContent: "center" }}>
            <button type="button" className="btn btn--gold" onClick={() => setModalRole("investidor")}>
              Sou investidor <span className="arrow">→</span>
            </button>
            <button type="button" className="btn btn--ghost-inv" onClick={() => setModalRole("corretor")}>
              Sou corretor <span className="arrow">→</span>
            </button>
          </div>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
          {faqItems.map((item, i) => {
            const isOpen = open === i;

            return (
              <div
                key={i}
                className="rounded-4xl"
                style={{
                  position: "relative",
                  height: "auto",
                  border: "none",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(6px)",
                  transition: "background var(--dur-3) var(--ease-out)",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "var(--s-2) calc(var(--s-6) + 28px + var(--s-4)) var(--s-2) var(--s-6)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    className="font-display"
                    style={{
                      fontSize: "var(--fs-15)",
                      fontWeight: 500,
                      letterSpacing: "-0.005em",
                      margin: "var(--s-3)",
                      color: isOpen ? "#ffffff" : "var(--brand-cream)",
                    }}
                  >
                    {item.question}
                  </span>
                </button>

                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows var(--dur-3) var(--ease-out)",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <div
                      style={{
                        padding: "0 calc(var(--s-6) + 28px + var(--s-4)) var(--s-7)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "var(--s-5)",
                      }}
                    >
                      <p
                        className="font-display"
                        style={{
                          fontSize: "var(--fs-15)",
                          lineHeight: 1.75,
                          color: "rgba(255,255,255,0.85)",
                          maxWidth: 720,
                          margin: "var(--s-3)",
                          textAlign: "center",
                        }}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: "var(--s-6)",
                    top: "50%",
                    transform: `translateY(-50%) rotate(${isOpen ? "45deg" : "0deg"})`,
                    width: 28,
                    height: 28,
                    borderRadius: "var(--r-pill)",
                    border: `var(--line-1) solid ${
                      isOpen ? "var(--brand-gold)" : "rgba(236,235,231,0.2)"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isOpen ? "var(--brand-gold)" : "transparent",
                    color: isOpen ? "var(--brand-navy)" : "var(--brand-cream)",
                    cursor: "pointer",
                    transition:
                      "background var(--dur-2) var(--ease-out), transform var(--dur-2) var(--ease-out)",
                  }}
                >
                  +
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Divisor */}
      <div style={{ borderTop: "var(--hairline) solid rgba(236,235,231,0.12)" }} />

      {/* Footer Grid */}
      <div
        className="container grid grid-cols-1 lg:grid-cols-4 gap-10"
        style={{
          padding: "var(--s-12) var(--s-6)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>
          <span
            className="font-display"
            style={{
              fontSize: "var(--fs-24)",
              fontWeight: 300,
              letterSpacing: "0.1em",
            }}
          >
            ARCK<span className="text-gold-grad" style={{ fontWeight: 600 }}>1</span>PRO
          </span>

          <p
            className="font-display"
            style={{
              fontSize: "var(--fs-14)",
              lineHeight: 1.65,
              color: "rgba(236,235,231,0.55)",
              maxWidth: 280,
            }}
          >
            Estruturação proprietária de incorporações de alto padrão.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-4)" }}>
          <p
            className="font-display"
            style={{
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(236,235,231,0.4)",
            }}
          >
            Contato
          </p>

          {["atendimento@arck1pro.com.br", "(47) 9 9145-8708", "@arck1pro"].map((item) => (
            <span
              key={item}
              className="font-display"
              style={{
                fontSize: "var(--fs-13)",
                color: "rgba(236,235,231,0.65)",
                wordBreak: "break-all",
              }}
            >
              {item}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-4)" }}>
          <p
            className="font-display"
            style={{
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(236,235,231,0.4)",
            }}
          >
            Endereço
          </p>

          <p
            className="font-display"
            style={{
              fontSize: "var(--fs-13)",
              color: "rgba(236,235,231,0.65)",
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

      <ContactModal
        open={modalRole !== null}
        role={modalRole}
        onClose={() => setModalRole(null)}
      />
    </footer>
  );
}