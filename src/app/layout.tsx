import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Villa Tama — Private Cycladic beachfront residence, Mykonos",
    template: "%s — Villa Tama",
  },
  description:
    "Set above a secluded sandy beach in Aleomandra, Mykonos, Villa Tama is a private Cycladic residence with seven bedrooms, an in-house chef and a heated pool overlooking Delos.",
  metadataBase: new URL("https://tamamykonos.com"),
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const site = await getSiteSettings();
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-sand">
        <Navbar site={site} />
        {children}
        <Footer site={site} />
      </body>
    </html>
  );
}
