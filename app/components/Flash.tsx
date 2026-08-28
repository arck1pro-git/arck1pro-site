"use client";

import { useEffect, useState } from "react";

export default function Flash() {
  const [phase, setPhase] = useState<"visible" | "fading" | "gone">("visible");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fading"), 2600);
    const t2 = setTimeout(() => setPhase("gone"),   3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        opacity: phase === "fading" ? 0 : 1,
        transition: "opacity 0.6s cubic-bezier(.4,0,.2,1)",
        pointerEvents: phase === "fading" ? "none" : "all",
      }}
    >
      {/* hero.png borrado */}
      <div
        style={{
          position: "absolute",
          inset: "-5%",
          backgroundImage: "url('/hero.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(14px)",
        }}
      />

      {/* escurecimento sobre o blur */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,10,28,0.70)",
        }}
      />

      {/* logo + círculo pontilhado girando */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          {/* anel interno — gira normal */}
          <svg
            style={{ position: "absolute", animation: "spin-ring 6s linear infinite" }}
            width="320" height="320" viewBox="0 0 320 320"
          >
            <circle
              cx="160" cy="160" r="150"
              fill="none"
              stroke="rgba(255,255,255,0.72)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="8 22"
            />
          </svg>

          {/* anel externo — gira ao contrário */}
          <svg
            style={{ position: "absolute", animation: "spin-ring 11s linear infinite reverse" }}
            width="400" height="400" viewBox="0 0 400 400"
          >
            <circle
              cx="200" cy="200" r="190"
              fill="none"
              stroke="rgba(255,255,255,0.32)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="5 28"
            />
          </svg>

          <img
            src="/logo.webp"
            alt="ARCK1PRO"
            style={{ width: "clamp(120px, 18vw, 220px)", height: "auto", position: "relative" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes spin-ring { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
