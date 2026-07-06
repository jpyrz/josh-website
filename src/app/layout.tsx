import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteSettings } from "@/lib/sanity/queries";
import "./globals.scss";

const bodyFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.title,
      template: `%s | ${settings.title}`,
    },
    description: settings.description,
    openGraph: {
      title: settings.title,
      description: settings.description,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>
        <SiteHeader
          artistName={settings.artistName}
          brandLogo={settings.brandLogo}
          navLabels={settings.navLabels}
        />
        {children}
        <SiteFooter socialLinks={settings.socialLinks} />
      </body>
    </html>
  );
}
