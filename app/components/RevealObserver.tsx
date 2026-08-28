"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Um observer só para o site inteiro, montado no layout: toda dobra marcada com
// .reveal ganha .is-in quando entra na tela, e o CSS faz a transição.
//
// A alternativa seria um componente por dobra, o que criaria dezenas de
// IntersectionObserver e obrigaria a envolver cada seção em mais uma div. O
// estado inicial (opacity 0) vive no CSS e já sai no HTML do servidor, então
// nada aparece antes de sumir enquanto o JS carrega.
export default function RevealObserver() {
  // O App Router preserva o layout entre rotas, e este efeito rodaria uma vez
  // só. Sem o pathname na dependência, a segunda página navegada ficaria com
  // todas as dobras invisíveis.
  const pathname = usePathname();

  useEffect(() => {
    const alvos = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"),
    );
    if (alvos.length === 0) return;

    // Navegador sem IntersectionObserver mostra tudo de uma vez. É melhor perder
    // a animação do que deixar a página inteira em opacity 0.
    if (typeof IntersectionObserver === "undefined") {
      alvos.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          entrada.target.classList.add("is-in");
          // Anima uma vez só: reaparecer em fade a cada subida de scroll cansa.
          io.unobserve(entrada.target);
        }
      },
      // A dobra precisa cruzar um pouco a borda de baixo antes de acender. Com
      // rootMargin 0 a animação começa com o conteúdo ainda fora do campo de
      // visão e o usuário só enxerga o fim dela.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    alvos.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
