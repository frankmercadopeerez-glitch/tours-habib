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
  title: "Tours Habib | Fiestas Privadas en Cartagena",
  description: "Producción de fiestas privadas de lujo en yates, islas, fincas y cabañas en Cartagena con DJ, animación, catering, bebidas y coordinación completa.",
  keywords: ["fiestas privadas Cartagena", "fiestas en yates Cartagena", "fiestas en islas Cartagena", "fiestas en fincas Cartagena", "fiestas en cabañas Cartagena", "Tours Habib"],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Tours Habib | Tu fiesta. Tu escenario. Tu momento.",
    description: "Fiestas privadas de lujo en yates, islas, fincas y cabañas con animación, música, catering y bebidas en Cartagena.",
    locale: "es_CO",
    type: "website",
    images: [{ url: "/og.webp", width: 1200, height: 631, alt: "Tours Habib, fiestas privadas en Cartagena" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tours Habib | Tu fiesta. Tu yate. Tu mar.",
    description: "Fiestas privadas de lujo en yates con animación, música, catering y bebidas en Cartagena.",
    images: ["/og.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    name: "Tours Habib",
    description: "Producción de fiestas privadas en yates, islas, fincas y cabañas con animación, anfitriones, música, catering y bebidas en Cartagena.",
    telephone: "+573215055649",
    areaServed: "Cartagena de Indias, Colombia",
    address: { "@type": "PostalAddress", addressLocality: "Cartagena de Indias", addressCountry: "CO" },
  };
  return <html lang="es" suppressHydrationWarning><head><link rel="preload" as="image" href="/images/hero-private-party.webp" type="image/webp" /></head><body className={`${display.variable} ${sans.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}</body></html>;
}
