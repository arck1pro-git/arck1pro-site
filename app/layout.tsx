import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { OG_IMAGE, SITE_URL, jsonLdString } from "@/lib/site";
import { entidadesJsonLd } from "@/lib/empresa";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SmoothScroller from "./components/SmoothScroller";
import RevealObserver from "./components/RevealObserver";
import WhatsappFloat from "./components/WhatsappFloat";
import CookieConsent from "./components/CookieConsent";

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

// Poppins é a única família do site: serve tanto o corpo (--font-sans, via
// globals.css) quanto os títulos (--font-display).
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ARCK1PRO: Hub de Estruturação Imobiliária em Porto Belo SC",
    template: "%s · ARCK1PRO",
  },
  description:
    "Estruturação de incorporações de alto padrão no litoral catarinense. ARI com garantia real de 200% em unidades registradas. Porto Belo, SC.",
  applicationName: "ARCK1PRO",
  // Sem alternates.canonical aqui de propósito: o layout é herdado por todas
  // as rotas, e o canonical "/" que morava aqui fazia cada post do blog se
  // declarar cópia da home. Cada página define a própria canônica.
  keywords: [
    "ARCK1PRO",
    "ARI",
    "Ativo de Renda Imobiliária",
    "incorporação imobiliária",
    "Porto Belo",
    "Costa Esmeralda",
    "litoral catarinense",
    "SCP",
    "Tourmaline Tower",
  ],
  authors: [{ name: "ARCK1PRO" }],
  creator: "ARCK1PRO",
  publisher: "ARCK1PRO",
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "ARCK1PRO",
    title: "ARCK1PRO: Hub de Estruturação Imobiliária em Porto Belo SC",
    description:
      "Estruturação de incorporações de alto padrão no litoral catarinense. ARI com garantia real de 200% em unidades registradas em cartório.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARCK1PRO: Hub de Estruturação Imobiliária em Porto Belo SC",
    description:
      "Estruturação de incorporações de alto padrão no litoral catarinense. ARI com garantia real de 200% em unidades registradas.",
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// Grafo de entidades (empresa, site, fundadores) em lib/empresa: mesma fonte
// do rodapé, de /sobre e do llms.txt.
const organizationJsonLd = entidadesJsonLd();

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(organizationJsonLd) }}
        />
        <SmoothScroller />
        <RevealObserver />
        <Header />
        {children}
        <Footer />
        <WhatsappFloat />
        <CookieConsent />
      </body>
    </html>
  );
}
