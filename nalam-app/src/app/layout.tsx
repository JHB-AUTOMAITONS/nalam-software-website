import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RequirementsPopup } from "@/components/sections/RequirementsPopup";
import { JsonLd } from "@/components/structured-data/JsonLd";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/structured-data";
import { siteConfig } from "@/lib/constants";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: "%s | Nalam Software",
    default: "Nalam Software | Hospital, Lab & Clinic Management Software",
  },
  description: siteConfig.description,
  keywords: [
    "hospital management software",
    "laboratory management software",
    "lab management software",
    "clinic management software",
    "healthcare management software",
    "hospital software",
    "laboratory software",
    "clinic software",
    "Nalam Software",
    "Nalam Hospital Management System",
    "Nalam Lab Management System",
    "Nalam Clinic Management System",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Nalam Software | Hospital, Lab & Clinic Management Software",
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nalam Software | Hospital, Lab & Clinic Management Software",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export const viewport = {
  themeColor: "#071019",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-ink">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <JsonLd data={[buildOrganizationSchema(), buildWebsiteSchema()]} />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <RequirementsPopup />
      </body>
    </html>
  );
}
