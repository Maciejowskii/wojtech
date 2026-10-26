import type { Metadata } from "next";
import { Archivo, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCta } from "@/components/layout/MobileCta";
import { localBusinessJsonLd } from "@/lib/schema";
import { siteConfig } from "@/lib/site.config";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "WOJ-TECH Elektroserwis Ostrzeszów | Naprawa elektroniki i AGD",
    template: "%s | WOJ-TECH Elektroserwis",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/brand/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/brand/icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "WOJ-TECH Elektroserwis Ostrzeszów",
    description: siteConfig.description,
    images: [{ url: "/brand/icon-512.png", width: 512, height: 512 }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = localBusinessJsonLd();

  return (
    <html
      lang="pl"
      className={`${archivo.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-mist font-sans text-graphite pb-20 md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}
