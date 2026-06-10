"use client";

import { useState } from "react";

const faqItems = [
  {
    number: "/01",
    question: "Quem é a ARCK1PRO e o que ela faz?",
    answer:
      "A ARCK1PRO é uma estruturadora imobiliária — o hub de método, capital intelectual e governança de um ecossistema completo. Ela não é uma construtora, nem uma imobiliária, nem uma consultoria aberta ao mercado. Opera exclusivamente para o próprio ecossistema: estrutura empreendimentos da captação do terreno ao lançamento, com método proprietário desenvolvido em mais de vinte anos de atuação no litoral catarinense.",
    cta: null,
    ctaHref: null,
  },
  {
    number: "/02",
    question: "O que é o ARI, Ativo de Renda Imobiliária?",
    answer:
      "O ARI é o instrumento de captação de capital estruturado pela ARCK1PRO para financiar a fase de pré-incorporação dos empreendimentos do ecossistema. Funciona como uma Sociedade em Conta de Participação (SCP) — o investidor aporta capital, recebe retornos contratuais de 1,5% a 3% ao mês com garantia real em unidades imobiliárias registradas, isentos de IR para pessoa física. Não é um apartamento. É uma posição estruturada na fase mais estratégica do ciclo imobiliário.",
    cta: "Conhecer o ARI completo",
    ctaHref: "#ari",
  },
  {
    number: "/03",
    question: "Onde fica o empreendimento e por que Porto Belo?",
    answer:
      "O Tourmaline Tower está em Porto Belo, Santa Catarina — no eixo entre Balneário Camboriú, Itapema e Bombinhas. Porto Belo é o mercado que está repetindo o ciclo de valorização que Itapema viveu entre 2018 e 2023: assimetria entre oferta e demanda de alto padrão, com mercado em expansão acelerada e ainda com janela de entrada aberta.",
    cta: "Ver análise completa do mercado",
    ctaHref: "#mercado",
  },
  {
    number: "/04",
    question: "Quem é a Harpaluus Incorporadora?",
    answer:
      "A Harpaluus é a incorporadora do ecossistema. Executa e assina os empreendimentos perante o mercado, compradores e cartório. Ela recebe da ARCK1PRO toda a estruturação técnica, jurídica e comercial — e foca exclusivamente em entregar empreendimentos de alto padrão no litoral catarinense. O Tourmaline Tower é o primeiro empreendimento lançado pela Harpaluus.",
    cta: null,
    ctaHref: null,
  },
  {
    number: "/05",
    question: "Tenho um terreno. Como negocio com a ARCK1PRO?",
    answer:
      "A ARCK1PRO tem um processo estruturado de análise e negociação de terrenos. Se o seu terreno está no litoral norte de Santa Catarina e você quer entender se ele tem potencial para incorporação de alto padrão, o caminho começa pelo formulário de contato.",
    cta: "Negocie seu terreno",
    ctaHref: "#contato",
  },
  {
    number: "/06",
    question: "A ARCK1PRO pode fazer um projeto para o meu empreendimento?",
    answer:
      "Não. A ARCK1PRO trabalha exclusivamente para o próprio ecossistema — ARCK1PRO, Harpaluus, ARI e Instituto Futurus. Não prestamos consultoria nem serviços de projeto para terceiros. Essa exclusividade é o que garante a profundidade do método e a qualidade dos nossos empreendimentos.",
    cta: null,
    ctaHref: null,
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="section"
      style={{
        background:
          "linear-gradient(to bottom, rgba(246,245,241,0.96) 0%, rgba(246,245,241,0.78) 100%), url('/footer.png') center/cover no-repeat",
      }}
    >
      <div className="container">
        <div style={{ marginBottom: "var(--s-12)" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "var(--s-4)" }}>
            <h2
              className="font-display text-navy"
              style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, lineHeight: 1.1 }}
            >
              Tudo o que você precisa saber.
            </h2>
            <p className="font-sans" style={{ fontSize: "var(--fs-14)", color: "var(--text-muted)" }}>
              Se a sua dúvida não estiver aqui, fale diretamente com a equipe.
            </p>
          </div>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  position: "relative",
                  border: `var(--line-1) solid ${isOpen ? "var(--brand-gold)" : "var(--line-strong)"}`,
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: isOpen ? "var(--gold-grad-h)" : "transparent",
                  boxShadow: "0 4px 24px rgba(0, 16, 49, 0.08)",
                  transition: "border-color var(--dur-2) var(--ease-out), background var(--dur-3) var(--ease-out)",
                }}
              >
                {/* Trigger — right padding reserves space for the absolute button */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    padding: "var(--s-5) var(--s-6)",
                    paddingRight: "calc(var(--s-6) + 28px + var(--s-4))",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span className="font-sans" style={{ fontSize: "var(--fs-15)", fontWeight: 500, color: "var(--brand-navy)", letterSpacing: "-0.005em", margin: "var(--s-3)" }}>
                    {item.question}
                  </span>
                </button>

                {/* Answer — animates via grid trick */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows var(--dur-3) var(--ease-out)",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ padding: "0 var(--s-6) var(--s-7)", paddingRight: "calc(var(--s-6) + 28px + var(--s-4))", display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>
                      <p className="font-sans" style={{ fontSize: "var(--fs-15)", lineHeight: 1.75, color: isOpen ? "var(--brand-navy)" : "var(--text-muted)", maxWidth: 720, margin: "var(--s-3)" }}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>

                {/* +/− tracks vertical center of the full card */}
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
                    flexShrink: 0,
                    borderRadius: "var(--r-pill)",
                    border: `var(--line-1) solid ${isOpen ? "var(--brand-navy)" : "var(--line-strong)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--fs-16)",
                    lineHeight: 1,
                    padding: 0,
                    background: isOpen ? "var(--brand-navy)" : "transparent",
                    color: isOpen ? "var(--brand-gold)" : "var(--brand-navy)",
                    cursor: "pointer",
                    transition: "background var(--dur-2) var(--ease-out), border-color var(--dur-2) var(--ease-out), transform var(--dur-2) var(--ease-out), color var(--dur-2) var(--ease-out)",
                  }}
                >
                  +
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
