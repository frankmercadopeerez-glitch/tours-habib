import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import "./responsive-bilingual.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"] });
const sans = Montserrat({ variable: "--font-sans", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Tours Habib | Fiestas Privadas en Yates en Cartagena",
  description: "Producción de fiestas privadas en yates en Cartagena con animación, anfitrionas, DJ, catering, bebidas y coordinación completa.",
  keywords: ["fiestas privadas en yates Cartagena", "fiestas en yates Cartagena", "eventos privados en yates", "animación en yates", "Tours Habib"],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Tours Habib | Tu fiesta. Tu yate. Tu mar.",
    description: "Fiestas privadas de lujo en yates con animación, música, catering y bebidas en Cartagena.",
    locale: "es_CO",
    type: "website",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "Tours Habib, fiestas privadas en yates en Cartagena" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tours Habib | Tu fiesta. Tu yate. Tu mar.",
    description: "Fiestas privadas de lujo en yates con animación, música, catering y bebidas en Cartagena.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    name: "Tours Habib",
    description: "Producción de fiestas privadas en yates con animación, anfitrionas, música, catering y bebidas en Cartagena.",
    telephone: "+573215055649",
    areaServed: "Cartagena de Indias, Colombia",
    address: { "@type": "PostalAddress", addressLocality: "Cartagena de Indias", addressCountry: "CO" },
  };
  return <html lang="es" suppressHydrationWarning><body className={`${display.variable} ${sans.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}</body></html>;
}
