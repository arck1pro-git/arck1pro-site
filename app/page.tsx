import HeroSection from "./components/home/HeroSection";
import BlogSection from "./components/home/BlogSection";
import PilaresSection from './components/home/PilaresSection'
import PeopleSection from "./components/home/PeopleSection";

// O branco do <main> é o que aparece nos cantos que o rounded-b-4xl da hero
// recorta. Não dá para deixar por conta do <body>, que é navy (layout.tsx), nem
// da própria hero, cujo fundo o border-radius recorta junto. --surface é o mesmo
// branco da section logo abaixo, para o encontro das duas não marcar.
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
