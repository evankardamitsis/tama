import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    default: "Villa Tama — Private Cycladic beachfront property, Mykonos",
    template: "%s — Villa Tama",
  },
  description:
    "Set above a secluded sandy beach in Aleomandra, Mykonos, Tama is a private Cycladic property for up to 14 guests — seven bedrooms, an in-house chef, a wellness area and a heated pool overlooking Delos.",
  metadataBase: new URL("https://tamamykonos.com"),
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const site = await getSiteSettings();
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/AngieSansStd-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/AngieSansStd-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-sand">
        <Navbar site={site} />
        {children}
        <Footer site={site} />
      </body>
    </html>
  );
}
