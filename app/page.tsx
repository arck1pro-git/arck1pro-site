import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/site";
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
export const metadata: Metadata = {
  title: { absolute: "ARCK1PRO — Hub de Estruturação Imobiliária · Porto Belo SC" },
  description:
    "Estruturação de incorporações de alto padrão no litoral catarinense. ARI com garantia real de 200% em unidades registradas. Porto Belo, SC.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "ARCK1PRO",
    url: "/",
    title: "ARCK1PRO — Hub de Estruturação Imobiliária · Porto Belo SC",
    description:
      "Estruturação de incorporações de alto padrão no litoral catarinense. ARI com garantia real de 200% em unidades registradas em cartório.",
    images: [OG_IMAGE],
  },
};

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
