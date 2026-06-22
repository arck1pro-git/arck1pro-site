"use client";

import { useState } from "react";
import ContactModal from "./ContactModal";

type ModalRole = "corretor" | "investidor";

export default function Footer() {
  const [modalRole, setModalRole] = useState<ModalRole | null>(null);

  return (
    <footer
      id="contato"
      className="relative z-0 -mt-12 font-display"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 2.5%), radial-gradient(120% 80% at 50% 100%, rgba(28,48,95,0.45) 0%, rgba(0,16,49,0) 60%), linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.82) 100%), url('/footerold.webp') center/cover no-repeat",
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
            className="font-carla"
            style={{
              fontSize: "var(--fs-24)",
              fontWeight: 400,
            }}
          >
            ARCK<span className="text-gold-grad">1</span>PRO
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
            className="font-display text-base"
            style={{
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