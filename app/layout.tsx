import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

// Base absoluta das URLs de metadata (canonical, OpenGraph, JSON-LD).
const SITE_URL = "https://arck1pro.com.br";
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
    default: "ARCK1PRO — Hub de Estruturação Imobiliária · Porto Belo SC",
    template: "%s · ARCK1PRO",
  },
  description:
    "Hub de estruturação de incorporações de alto padrão no litoral catarinense. Conheça o ARI, ativo imobiliário com garantia real de 200% em unidades registradas. Porto Belo, Santa Catarina.",
  applicationName: "ARCK1PRO",
  alternates: { canonical: "/" },
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
    url: SITE_URL,
    siteName: "ARCK1PRO",
    title: "ARCK1PRO — Hub de Estruturação Imobiliária · Porto Belo SC",
    description:
      "Estruturação de incorporações de alto padrão no litoral catarinense. ARI com garantia real de 200% em unidades registradas em cartório.",
    images: [
      {
        url: "/hero.png",
        alt: "ARCK1PRO — hub de estruturação imobiliária no litoral catarinense",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARCK1PRO — Hub de Estruturação Imobiliária · Porto Belo SC",
    description:
      "Estruturação de incorporações de alto padrão no litoral catarinense. ARI com garantia real de 200% em unidades registradas.",
    images: ["/hero.png"],
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "RealEstateAgent"],
      "@id": `${SITE_URL}/#organization`,
      name: "ARCK1PRO",
      alternateName: "Arck1Pro",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description:
        "Hub de estruturação de incorporações de alto padrão no litoral catarinense.",
      foundingDate: "2004",
      founder: { "@type": "Person", name: "Fabrício Pavesi Junior" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. João Manoel Jacques, 160, Sala 1Z",
        addressLocality: "Porto Belo",
        addressRegion: "SC",
        addressCountry: "BR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+55-47-99145-8708",
        contactType: "customer service",
        email: "atendimento@arck1pro.com.br",
        availableLanguage: "Portuguese",
      },
      sameAs: ["https://www.instagram.com/arck1pro/"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "ARCK1PRO",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "pt-BR",
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
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
