const icpOptions = [
  { label: "Quero investir no ARI", sub: "Qualificação de investidor", href: "#ari" },
  { label: "Sou corretor e quero vender o Tourmaline", sub: "Contato comercial Harpaluus", href: "#tourmaline" },
  { label: "Quero comprar um apartamento no Tourmaline", sub: "LP do Tourmaline Tower", href: "#tourmaline" },
  { label: "Tenho um terreno para negociar", sub: "Formulário de terrenos", href: "#contato" },
];

export default function ContatoSection() {
  return (
    <section id="contato" className="bg-navy" style={{ padding: "var(--s-20) var(--s-6)" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "var(--s-10)" }}>
        {/* Copy */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-5)", maxWidth: 560 }}>
          
          <h2
            className="font-display text-cream"
            style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, lineHeight: 0.98, letterSpacing: "-0.01em" }}
          >
            Solicite sua qualificação.
          </h2>
         
        </div>

        {/* Filtro ICP */}
        <div>
          <p
            className="font-mono"
            style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(236,235,231,0.4)", marginBottom: "var(--s-5)" }}
          >
            Antes de continuar, nos diga: qual é o seu interesse?
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--s-3)" }}>
            {icpOptions.map((opt, i) => (
              <a
                key={i}
                href={opt.href}
                className="icp-option"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--s-2)",
                  padding: "var(--s-6)",
                  border: "var(--hairline) solid rgba(236,235,231,0.2)",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <span className="font-sans text-cream" style={{ fontSize: "var(--fs-14)", fontWeight: 500, lineHeight: 1.4 }}>
                  {opt.label} →
                </span>
                <span className="font-mono" style={{ fontSize: 11, color: "rgba(236,235,231,0.35)", letterSpacing: "0.08em" }}>
                  {opt.sub}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* WhatsApp */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--s-4)",
            paddingTop: "var(--s-4)",
            borderTop: "var(--hairline) solid rgba(236,235,231,0.12)",
            flexWrap: "wrap",
          }}
        >
         
          <a
            href="https://wa.me/5547991458708"
            className="btn btn--ghost-inv btn--sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp <span className="arrow">→</span> (47) 9 9145-8708
          </a>
        </div>
      </div>
    </section>
  );
}
