import type { Metadata } from "next";
import HeroSection from "./components/home/HeroSection";
import BlogSection from "./components/home/BlogSection";
import PortfolioSection from "./components/home/PortfolioSection";
import PilaresSection from './components/home/PilaresSection'
import PeopleSection from "./components/home/PeopleSection";

export const metadata: Metadata = {
  title: { absolute: "ARCK1PRO — Hub de Estruturação Imobiliária · Porto Belo SC" },
  description:
    "Hub de estruturação de incorporações de alto padrão no litoral catarinense. Conheça o ARI, ativo imobiliário com garantia real de 200% em unidades registradas. Porto Belo, Santa Catarina.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PilaresSection />
      <PortfolioSection />
      <PeopleSection />
      <BlogSection />
    </main>
  );
}
