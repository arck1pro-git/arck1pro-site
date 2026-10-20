import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import HeroSection from "./components/home/HeroSection";
import BlogSection from "./components/home/BlogSection";
import PilaresSection from './components/home/PilaresSection'
import PeopleSection from "./components/home/PeopleSection";

// O branco do <main> é o que aparece nos cantos que o rounded-b-4xl da hero
// recorta. Não dá para deixar por conta do <body>, que é navy (layout.tsx), nem
// da própria hero, cujo fundo o border-radius recorta junto. --surface é o mesmo
// branco da section logo abaixo, para o encontro das duas não marcar.
// Título absoluto: o template do layout acrescenta o sufixo da marca, e na home
// ele duplicaria "ARCK1PRO".
export const metadata: Metadata = pageMetadata({
  title: "ARCK1PRO: Hub de Estruturação Imobiliária em Porto Belo SC",
  description:
    "Estruturação de incorporações de alto padrão no litoral catarinense. ARI com garantia real de 200% em unidades registradas. Porto Belo, SC.",
  ogDescription:
    "Estruturação de incorporações de alto padrão no litoral catarinense. ARI com garantia real de 200% em unidades registradas em cartório.",
  path: "/",
});

export default function Home() {
  return (
    <main style={{ background: "var(--surface)" }}>
      <HeroSection />
      <PilaresSection />
      <PeopleSection />
      <BlogSection />
    </main>
  );
}
