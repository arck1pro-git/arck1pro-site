import HeroSection from "./components/home/HeroSection";
import BlogSection from "./components/home/BlogSection";
import PortfolioSection from "./components/home/PortfolioSection";
import PilaresSection from './components/home/PilaresSection'
import PeopleSection from "./components/home/PeopleSection";

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
