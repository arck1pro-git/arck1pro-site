"use client";

import { useEffect, useState } from "react";

/**
 * Aviso de cookies com escolha granular (LGPD), separando categorias
 * essenciais, de análise e de marketing. O consentimento fica registrado
 * em localStorage e dispara um CustomEvent("cookie-consent") para que as
 * ferramentas de análise/marketing possam ser carregadas só após o aceite.
 */

const STORAGE_KEY = "arck1pro-cookie-consent";

type Consent = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

function persist(consent: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // localStorage indisponível — segue sem persistir
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: consent }));
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    let hasConsent = false;
    try {
      hasConsent = Boolean(localStorage.getItem(STORAGE_KEY));
    } catch {
      hasConsent = false;
    }
    // Lê o consentimento só no cliente para evitar mismatch de hidratação.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!hasConsent) setVisible(true);
  }, []);

  function save(next: { analytics: boolean; marketing: boolean }) {
    persist({
      essential: true,
      analytics: next.analytics,
      marketing: next.marketing,
      timestamp: new Date().toISOString(),
    });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Aviso de cookies"
      className="font-sans"
      style={{
        position: "fixed",
        left: "var(--s-4)",
        right: "var(--s-4)",
        bottom: "var(--s-4)",
        zIndex: 300,
        maxWidth: 560,
        marginInline: "auto",
        background: "rgba(0,16,49,0.96)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        color: "var(--brand-cream)",
        border: "1px solid rgba(236,235,231,0.14)",
        borderRadius: 20,
        boxShadow: "0 16px 48px rgba(0,0,0,0.45)",
        padding: "var(--s-6)",
      }}
    >
      <p
        className="font-display"
        style={{ fontSize: "var(--fs-15)", fontWeight: 500, margin: "0 0 var(--s-2)" }}
      >
        Privacidade e cookies
      </p>
      <p
        style={{
          fontSize: "var(--fs-13)",
          lineHeight: 1.65,
          color: "rgba(236,235,231,0.72)",
          margin: 0,
        }}
      >
        Utilizamos cookies essenciais para o funcionamento do site e, com a sua
        autorização, cookies de análise e de marketing. Você pode escolher o que
        permitir e revisar essa escolha a qualquer momento.
      </p>

      {customizing && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)", marginTop: "var(--s-5)" }}>
          <label style={{ display: "flex", gap: "var(--s-3)", alignItems: "flex-start", opacity: 0.7 }}>
            <input type="checkbox" checked disabled aria-label="Cookies essenciais (sempre ativos)" style={{ marginTop: 3 }} />
            <span style={{ fontSize: "var(--fs-13)", lineHeight: 1.5 }}>
              <strong>Essenciais</strong> — sempre ativos. Necessários para a navegação e segurança.
            </span>
          </label>
          <label style={{ display: "flex", gap: "var(--s-3)", alignItems: "flex-start", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              style={{ marginTop: 3 }}
            />
            <span style={{ fontSize: "var(--fs-13)", lineHeight: 1.5 }}>
              <strong>Análise</strong> — medem o uso do site para melhorarmos a experiência.
            </span>
          </label>
          <label style={{ display: "flex", gap: "var(--s-3)", alignItems: "flex-start", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              style={{ marginTop: 3 }}
            />
            <span style={{ fontSize: "var(--fs-13)", lineHeight: 1.5 }}>
              <strong>Marketing</strong> — permitem mensuração de campanhas e remarketing.
            </span>
          </label>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--s-3)",
          marginTop: "var(--s-5)",
        }}
      >
        {customizing ? (
          <button
            type="button"
            className="btn btn--gold btn--sm"
            onClick={() => save({ analytics, marketing })}
          >
            Salvar preferências
          </button>
        ) : (
          <>
            <button
              type="button"
              className="btn btn--gold btn--sm"
              onClick={() => save({ analytics: true, marketing: true })}
            >
              Aceitar todos
            </button>
            <button
              type="button"
              className="btn btn--ghost-inv btn--sm"
              onClick={() => save({ analytics: false, marketing: false })}
            >
              Rejeitar não essenciais
            </button>
          </>
        )}
        <button
          type="button"
          className="btn btn--ghost-inv btn--sm"
          onClick={() => setCustomizing((v) => !v)}
        >
          {customizing ? "Voltar" : "Personalizar"}
        </button>
      </div>
    </div>
  );
}
