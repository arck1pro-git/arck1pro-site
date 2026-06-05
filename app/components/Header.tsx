"use client";

import { useState } from "react";

const navLinks = [
  { label: "Nossa História", href: "/sobre" },
  { label: "ARI", href: "/ari" },
  { label: "Porto Belo", href: "/portobelo" },
  { label: "Tourmaline Tower", href: "/empreendimentos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const bar: React.CSSProperties = {
    display: "block",
    width: 22,
    height: 2,
    borderRadius: 2,
    background: "var(--brand-cream)",
    transition: "transform var(--dur-2) var(--ease-out), opacity var(--dur-1) var(--ease-out)",
  };

  return (
    <header
      className="rounded-full m-2"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        height: 58,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--s-8)",
        padding: "0 var(--s-6)",
        background: "rgba(0,16,49,0.55)",
        backdropFilter: "blur(28px) saturate(160%)",
        WebkitBackdropFilter: "blur(28px) saturate(160%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
      }}
    >
      {/* Logo */}
      <a
        href="/"
        className="font-carla text-white"
        style={{
          textDecoration: "none",
          flexShrink: 0,
          fontSize: "var(--fs-18)",
          fontWeight: 400,
          letterSpacing: "0.08em",
        }}
      >
        ARCK<span style={{ color: "var(--brand-gold)" }}>1</span>PRO
      </a>

      {/* Nav desktop */}
      <nav
        className="hidden lg:flex"
        style={{ alignItems: "center", gap: "var(--s-8)", marginLeft: "auto" }}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link font-sans"
            style={{
              fontSize: "var(--fs-12)",
              fontWeight: 500,
              letterSpacing: "0.1em",
              color: "var(--brand-cream)",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "color var(--dur-1) var(--ease-out)",
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Toggle mobile (3 barras) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
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

      {/* Menu mobile */}
      {open && (
        <div
          className="flex lg:hidden font-sans"
          style={{
            position: "absolute",
            top: "calc(100% + var(--s-2))",
            left: 0,
            right: 0,
            flexDirection: "column",
            gap: "var(--s-1)",
            padding: "var(--s-3)",
            borderRadius: 20,
            background: "rgba(0,16,49,0.92)",
            backdropFilter: "blur(28px) saturate(160%)",
            WebkitBackdropFilter: "blur(28px) saturate(160%)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "var(--s-3) var(--s-4)",
                borderRadius: "var(--r-pill)",
                fontSize: "var(--fs-14)",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--brand-cream)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
