const stats = [
  { value: "+20", line1: "anos de atuação", line2: "no mercado imobiliário" },
  { value: "+350", line1: "empreendimentos", line2: "estruturados" },
];

export default function PeopleSection() {
  return (
    <section
      id="lider"
      className="font-display bg-white relative z-10 -mt-12 rounded-t-4xl overflow-clip min-h-auto lg:h-auto flex flex-col"
    >
      {/* Hero — apresentação do líder (centralizado) */}
      <div className="shrink-0 max-w-[1400px] w-full mx-auto px-6 pt-12 pb-8 lg:pt-16 lg:pb-6 text-center flex flex-col items-center">
        <h2
          className="font-display font-bold leading-[1.1] text-3xl lg:text-2xl max-w-4xl"
          style={{ color: "var(--brand-navy)" }}
        >
          A <span className="font-carla font-normal">ARCK<span className="text-gold">1</span>PRO</span> nasce da visão de que o litoral catarinense é o rendimento mais sólido do mercado imobiliário. Somos formados por pessoas que acreditam no potencial regional de valorização
        </h2>

      </div>

      {/* Números — indicadores de trajetória */}
      <div className="shrink-0 max-w-[1400px] w-full mx-auto px-6 pb-16 lg:pb-20 pt-4 lg:pt-8">
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center rounded-2xl px-10 py-8 lg:px-14 lg:py-10 min-w-[200px]"
              style={{
                background: "rgba(0,16,49,0.03)",
                border: "1px solid rgba(0,16,49,0.08)",
              }}
            >
              <span className="font-display font-bold text-5xl lg:text-7xl text-gold leading-none">
                {s.value}
              </span>
              <span
                className="font-sans text-sm lg:text-base mt-3 max-w-[220px] leading-snug"
                style={{ color: "var(--brand-navy)", opacity: 0.7 }}
              >
                {s.line1}
                <br />
                {s.line2}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
