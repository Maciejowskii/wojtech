import type { Metadata, Viewport } from "next";
import { Archivo, Source_Sans_3 } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { localBusinessJsonLd } from "@/lib/schema";
import { siteConfig } from "@/lib/site.config";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f3f6f9",
};

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
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_AHREFS_SITE_VERIFICATION
      ? {
          "ahrefs-site-verification":
            process.env.NEXT_PUBLIC_AHREFS_SITE_VERIFICATION,
        }
      : undefined,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = localBusinessJsonLd();

  return (
    <html
      lang="pl"
      className={`${archivo.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-mist font-sans text-graphite">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
