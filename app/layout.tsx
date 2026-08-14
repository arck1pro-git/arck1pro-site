import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SmoothScroller from "./components/SmoothScroller";
import WhatsappFloat from "./components/WhatsappFloat";

// Inter é variável: não precisa listar weight, vem com o eixo inteiro (o site
// usa de 300 a 700).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body style={{ background: "var(--brand-navy)" }}>
        <SmoothScroller />
        <Header />
        {children}
        <Footer />
        <WhatsappFloat />
      </body>
    </html>
  );
}
