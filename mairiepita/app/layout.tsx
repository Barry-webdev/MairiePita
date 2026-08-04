import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mairie de Pita - Commune Urbaine de Pita, Guinée",
  description:
    "Site officiel de la Mairie de Pita. La Mairie de Pita s'engage chaque jour pour améliorer le cadre de vie des citoyens et promouvoir un développement durable et inclusif.",
  keywords: "Mairie de Pita, Pita, Guinée, commune, municipalité, services publics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${geistSans.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
