import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"] });
const sans = Montserrat({ variable: "--font-sans", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Tours Habib | Fiestas Privadas en Yates en Cartagena",
  description: "Fiestas privadas, alquiler de yates y botes, comida, bebidas y eventos exclusivos a bordo en Cartagena. Diseña tu experiencia con Habib.",
  keywords: ["fiestas en yates Cartagena", "alquiler de yates Cartagena", "eventos en yates", "botes Cartagena", "Tours Habib"],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Tours Habib | Tu fiesta. Tu yate. Tu mar.",
    description: "Experiencias privadas de lujo en yates y botes en Cartagena.",
    locale: "es_CO",
    type: "website",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "Tours Habib, fiestas privadas en yates en Cartagena" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tours Habib | Tu fiesta. Tu yate. Tu mar.",
    description: "Experiencias privadas de lujo en yates y botes en Cartagena.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    name: "Tours Habib",
    description: "Fiestas privadas, alquiler de yates y botes y eventos a bordo en Cartagena.",
    telephone: "+573215055649",
    areaServed: "Cartagena de Indias, Colombia",
    address: { "@type": "PostalAddress", addressLocality: "Cartagena de Indias", addressCountry: "CO" },
  };
  return <html lang="es"><body className={`${display.variable} ${sans.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}</body></html>;
}
