import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agencia Digital México | Desarrollo Web Profesional",
  description: "Ayudamos a empresas medianas en México a establecer su presencia digital de forma rápida, profesional y accesible. Landing pages, e-commerce y más en 3-10 días.",
  keywords: "desarrollo web méxico, agencia digital, landing pages, e-commerce, sitios web profesionales",
  authors: [{ name: "Agencia Digital" }],
  openGraph: {
    title: "Agencia Digital México | Tu presencia digital lista en días",
    description: "Desarrollo web profesional para empresas medianas. Precios justos, entrega rápida.",
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
      <body className={inter.className}>
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


