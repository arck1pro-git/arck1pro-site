"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contato";

const INSTAGRAM = "https://instagram.com/arck1pro";

// lucide-react 1.17 não exporta ícones de marca (não há Instagram), então os
// dois são desenhados inline. Traço, para casar com o resto do header.
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Mesmo path usado no WhatsappFloat.
function WhatsappIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}

// A partir daqui o header deixa de ser transparente e vira branco.
const SCROLL_PARA_SOLIDO = 24;

// As seis rotas agrupadas em dois índices. Cada grupo é um botão com seta no
// header; as rotas só aparecem ao abrir.
const navGrupos = [
  {
    label: "O Negócio",
    itens: [
      { label: "ARI", href: "/ari" },
      { label: "Porto Belo", href: "/portobelo" },
    ],
  },
  {
    label: "Sobre",
    itens: [
      { label: "Nossa História", href: "/sobre" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

// Vidro escuro compartilhado pelo dropdown do desktop e pelo painel mobile.
const superficieMenu: React.CSSProperties = {
  background: "rgba(0,16,49,0.92)",
  backdropFilter: "blur(28px) saturate(160%)",
  WebkitBackdropFilter: "blur(28px) saturate(160%)",
  boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solido, setSolido] = useState(false);
  // Qual grupo está aberto (pelo label). Um de cada vez, no desktop e no mobile.
  const [grupoAberto, setGrupoAberto] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Fecha o dropdown ao clicar fora do header ou no Esc. Só monta os listeners
  // enquanto há algo aberto, para não escutar a página inteira à toa.
  useEffect(() => {
    if (!grupoAberto) return;

    const aoClicarFora = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setGrupoAberto(null);
      }
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGrupoAberto(null);
    };

    document.addEventListener("mousedown", aoClicarFora);
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("mousedown", aoClicarFora);
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [grupoAberto]);

  useEffect(() => {
    let rafId = 0;

    // Booleano, não valor contínuo: o React descarta o setState quando o valor
    // não muda, então isso só re-renderiza ao cruzar o limiar.
    const tick = () => setSolido(window.scrollY > SCROLL_PARA_SOLIDO);

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Creme nos dois estados: o header rolado deixou de ser branco e passou a usar
  // o mesmo degradê navy da section de explicação, então não há mais inversão.
  const corTexto = "var(--brand-cream)";

  // Barras brancas sobre a foto. No header branco elas viram navy — brancas ali
  // seriam invisíveis.
  const estiloBarra: React.CSSProperties = {
    color: "#ffffff",
    fontSize: "var(--fs-12)",
    fontWeight: 400,
    userSelect: "none",
    transition: "color 450ms var(--ease-out)",
  };

  const bar: React.CSSProperties = {
    display: "block",
    width: 22,
    height: 2,
    borderRadius: 2,
    background: corTexto,
    transition:
      "transform var(--dur-2) var(--ease-out), opacity var(--dur-1) var(--ease-out), background var(--dur-2) var(--ease-out)",
  };

  // Índice do header: mesma tipografia do link plano que existia antes.
  const estiloIndice: React.CSSProperties = {
    fontSize: "var(--fs-12)",
    fontWeight: 400,
    letterSpacing: "0.1em",
    color: corTexto,
    textTransform: "uppercase",
    transition: "color var(--dur-1) var(--ease-out)",
  };

  return (
    <header
      ref={headerRef}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        height: "var(--header-h)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--s-8)",
        padding: "0 var(--s-6)",
        boxShadow: solido
          ? "0 4px 20px rgba(0,16,49,0.10)"
          : "0 4px 20px rgba(0,16,49,0)",
        transition: "box-shadow 450ms var(--ease-out)",
      }}
    >
      {/* O fundo é uma camada própria: animar a opacidade dela dá a mesma transição
          suave que o backgroundColor dava antes. z-index -1 a mantém atrás do
          conteúdo, dentro do stacking context do próprio header (z-index 100). */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          background: "rgba(255, 255, 255, 0.2)",
          opacity: solido ? 1 : 0,
          transition: "opacity 450ms var(--ease-out)",
        }}
      />
      {/* Logo */}
      <a
        href="/"
        className="font-carla"
        style={{
          textDecoration: "none",
          flexShrink: 0,
          fontSize: "var(--fs-18)",
          fontWeight: 400,
          letterSpacing: "0.08em",
          color: corTexto,
          transition: "color 450ms var(--ease-out)",
        }}
      >
        ARCK<span className="text-gold">1</span>PRO
      </a>

      {/* Nav desktop — dois índices agrupados. Cada um abre um dropdown com as
          rotas; o marginLeft auto empurra nav e sociais para a direita. */}
      <nav
        className="hidden lg:flex"
        style={{ alignItems: "center", gap: "var(--s-3)", marginLeft: "auto" }}
      >
        {navGrupos.map((grupo, i) => {
          const aberto = grupoAberto === grupo.label;
          return (
            <Fragment key={grupo.label}>
              {i > 0 && (
                <span aria-hidden style={estiloBarra}>
                  |
                </span>
              )}
              {/* relative ancora o dropdown neste índice, não no header inteiro. */}
              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  className="nav-link font-sans"
                  onClick={() => setGrupoAberto(aberto ? null : grupo.label)}
                  aria-expanded={aberto}
                  aria-haspopup="true"
                  style={{
                    ...estiloIndice,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {grupo.label}
                  <ChevronDown
                    size={14}
                    strokeWidth={2}
                    aria-hidden
                    style={{
                      transform: aberto ? "rotate(180deg)" : "none",
                      transition: "transform var(--dur-2) var(--ease-out)",
                    }}
                  />
                </button>

                {aberto && (
                  <div
                    className="font-sans"
                    style={{
                      ...superficieMenu,
                      position: "absolute",
                      top: "calc(100% + var(--s-4))",
                      left: 0,
                      minWidth: 210,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      padding: "var(--s-2)",
                      borderRadius: 16,
                    }}
                  >
                    {grupo.itens.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setGrupoAberto(null)}
                        className="nav-link"
                        style={{
                          display: "block",
                          padding: "var(--s-3) var(--s-4)",
                          borderRadius: "var(--r-pill)",
                          fontSize: "var(--fs-12)",
                          fontWeight: 400,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--brand-cream)",
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </Fragment>
          );
        })}
      </nav>

      {/* Sociais — no fim da direita, afastados da nav. O marginLeft soma ao
          gap do header, senão ficariam colados nos índices. */}
      <div
        className="hidden lg:flex"
        style={{ alignItems: "center", gap: "var(--s-4)", marginLeft: "var(--s-24)" }}
      >
        <a
          href={INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram da ARCK1PRO"
          className="nav-link"
          style={{
            display: "flex",
            color: corTexto,
            transition: "color 450ms var(--ease-out)",
          }}
        >
          <InstagramIcon />
        </a>
        <span aria-hidden style={estiloBarra}>
          |
        </span>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="nav-link"
          style={{
            display: "flex",
            color: corTexto,
            transition: "color 450ms var(--ease-out)",
          }}
        >
          <WhatsappIcon />
        </a>
      </div>

      {/* Toggle mobile (3 barras) */}
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setGrupoAberto(null);
        }}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        className="flex lg:hidden"
        style={{
          flexShrink: 0,
          width: 40,
          height: 40,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <span style={{ ...bar, transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
        <span style={{ ...bar, opacity: open ? 0 : 1 }} />
        <span style={{ ...bar, transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
      </button>

      {/* Menu mobile — mesmos dois grupos, em acordeão: o índice abre a lista de
          rotas no lugar, sem dropdown flutuante. */}
      {open && (
        <div
          className="flex lg:hidden font-sans"
          style={{
            ...superficieMenu,
            position: "absolute",
            top: "calc(100% + var(--s-2))",
            left: 0,
            right: 0,
            flexDirection: "column",
            gap: "var(--s-1)",
            padding: "var(--s-3)",
            borderRadius: 20,
          }}
        >
          {navGrupos.map((grupo) => {
            const aberto = grupoAberto === grupo.label;
            return (
              <div key={grupo.label}>
                <button
                  type="button"
                  onClick={() => setGrupoAberto(aberto ? null : grupo.label)}
                  aria-expanded={aberto}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "var(--s-3) var(--s-4)",
                    borderRadius: "var(--r-pill)",
                    fontSize: "var(--fs-14)",
                    fontWeight: 400,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--brand-cream)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {grupo.label}
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    aria-hidden
                    style={{
                      transform: aberto ? "rotate(180deg)" : "none",
                      transition: "transform var(--dur-2) var(--ease-out)",
                    }}
                  />
                </button>

                {aberto &&
                  grupo.itens.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setOpen(false);
                        setGrupoAberto(null);
                      }}
                      style={{
                        display: "block",
                        // Recuo alinha as rotas sob o rótulo do grupo.
                        padding: "var(--s-2) var(--s-4) var(--s-2) var(--s-8)",
                        borderRadius: "var(--r-pill)",
                        fontSize: "var(--fs-13)",
                        fontWeight: 400,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--brand-cream)",
                        opacity: 0.85,
                        textDecoration: "none",
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
}
