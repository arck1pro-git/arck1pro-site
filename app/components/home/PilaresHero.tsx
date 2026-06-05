export default function PilaresHero() {
  return (
    <div className="lg:hidden max-w-[1400px] mx-auto px-6 py-10">
      <h2
        className="font-display font-bold leading-[1.15] text-2xl tracking-[-0.01em]"
        style={{ color: "var(--brand-navy)" }}
      >
        A incorporação é a fase
        <br />
        de maior rendimento no mercado imobiliário, e poucos sabem acessá-la.
        <br />
        <span style={{ color: "var(--brand-gold)" }}>Nós abrimos essa porta para você.</span>
      </h2>
      <div className="max-w-2xl mt-6 flex flex-col gap-4" style={{ color: "var(--brand-navy)" }}>
        <p className="text-base leading-relaxed opacity-80">
          Desenvolvemos empreendimentos imobiliários únicos e convidamos pessoas selecionadas a se tornarem nossos sócios.
        </p>
        <p className="text-base leading-relaxed opacity-80">
          Como investidor, você acompanha cada etapa com total clareza sobre os resultados esperados.
        </p>
        <p className="text-base leading-relaxed font-semibold">
          Aqui, você lucra do jeito que um incorporador lucra.
        </p>
      </div>
    </div>
  );
}
