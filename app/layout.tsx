import type { Metadata } from "next";
import { Exo_2, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const exo2 = Exo_2({ 
  subsets: ["latin"],
  variable: '--font-exo2',
  display: 'swap',
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "VELANT - Agencia Digital | Tu Presencia Digital en Días, No Meses",
  description: "VELANT Agencia Digital: Innovación constante, adaptabilidad y confianza. Software, E-commerce, Landing Pages, AI Services y Diseño. Tu presencia digital lista en días.",
  keywords: "velant, agencia digital méxico, desarrollo web, e-commerce, landing pages, ai services, diseño web, software desarrollo",
  authors: [{ name: "VELANT Agencia Digital" }],
  openGraph: {
    title: "VELANT Agencia Digital | Tu Presencia Digital en Días, No Meses",
    description: "Velocidad, eficiencia y liderazgo. Servicios de Software, E-commerce, Landing Pages, AI y Diseño.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX">
      <body className={`${poppins.variable} ${exo2.variable} font-sans`} style={{ fontFamily: 'var(--font-poppins)' }}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}


