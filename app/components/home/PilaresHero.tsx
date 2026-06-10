export default function PilaresHero() {
  return (
    <div className="lg:hidden max-w-[1400px] mx-auto px-6 py-10">
      <h2
        className="font-display font-bold leading-[1.15] text-2xl tracking-[-0.01em]"
        style={{ color: "var(--brand-navy)" }}
      >
        A incorporação é a fase
        <br />
        de maior rendimento no mercado imobiliário e <span className="text-gold">poucos sabem como acessá-la.</span>
        <br />
      </h2>
      <div className="max-w-2xl mt-6 flex flex-col gap-4" style={{ color: "var(--brand-navy)" }}>
        <p className="text-base leading-relaxed opacity-80">
          Desenvolvemos empreendimentos imobiliários únicos com tecnologia e sustentabilidade e conectamos investidores qualificados e criteriosamente selecionados para se tornarem sócios investidores das incorporadoras mais estruturadas do litoral catarinense.
        </p>
        <p className="text-base leading-relaxed opacity-80">
          Como investidor, você acompanha cada etapa com total transparência sobre os números e resultados esperados.
        </p>
        <p className="text-base leading-relaxed font-semibold">
          Aqui, você lucra como um incorporador, participando dos bastidores da multiplicação de patrimônio na etapa mais lucrativa do mercado imobiliário.
        </p>
      </div>
    </div>
  );
}
