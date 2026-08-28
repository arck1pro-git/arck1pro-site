import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SmoothScroller from "./components/SmoothScroller";
import RevealObserver from "./components/RevealObserver";
import WhatsappFloat from "./components/WhatsappFloat";

// Inter é variável: não precisa listar weight, vem com o eixo inteiro (o site
// usa de 300 a 700).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Headline da seção "Método". Variável, como a Inter — sem lista de weight.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
});

// Serif do destaque "rentabilidade" na hero. Variável, então sem lista de weight;
// só o itálico é carregado, que é o único corte usado.
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["italic"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "ARCK1PRO · Estruturação Imobiliária",
  description:
    "Hub de inteligência que transforma terreno em empreendimento — do capital ao lançamento. Litoral catarinense.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-theme="light"
      className={`${inter.variable} ${manrope.variable} ${playfair.variable} ${poppins.variable}`}
    >
      {/* O vídeo da hero vem do Storage do Supabase; abrir DNS + TLS junto com o
          HTML tira o handshake do caminho crítico do autoplay. */}
      <head>
        <link rel="preconnect" href="https://vlxejpotqiodxdlmmqel.supabase.co" />
      </head>
      <body style={{ background: "var(--brand-navy)" }}>
        <SmoothScroller />
        <RevealObserver />
        <Header />
        {children}
        <Footer />
        <WhatsappFloat />
      </body>
    </html>
  );
}
