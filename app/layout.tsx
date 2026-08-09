import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.pomelo404.com";

const title = "pomelo404 — Diseño y desarrollo web en Next.js";
const description =
  "Estudio web independiente en CDMX. Diseñamos y desarrollamos sitios rápidos, claros y memorables con estrategia, UX/UI, Next.js y Vercel.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "pomelo404",
  title: {
    default: title,
    template: "%s | pomelo404",
  },
  description,
  keywords: [
    "diseño web CDMX",
    "desarrollo web",
    "estudio web",
    "Next.js",
    "UX/UI",
    "landing pages",
    "e-commerce",
    "Vercel",
    "diseño digital",
  ],
  authors: [{ name: "pomelo404", url: siteUrl }],
  creator: "pomelo404",
  publisher: "pomelo404",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/favicon.svg?v=3", type: "image/svg+xml" }],
    shortcut: "/favicon.svg?v=3",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: "pomelo404",
    title,
    description,
    images: [
      {
        url: "/og-pomelo404-v2.png",
        width: 1200,
        height: 630,
        alt: "pomelo404 — Sitios que hacen click",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-pomelo404-v2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b12" },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "pomelo404",
  url: siteUrl,
  logo: `${siteUrl}/pomelo404-pixel-iso.png`,
  image: `${siteUrl}/og-pomelo404-v2.png`,
  email: "hola@pomelo404.com",
  description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ciudad de México",
    addressCountry: "MX",
  },
  areaServed: {
    "@type": "Country",
    name: "México",
  },
  knowsAbout: [
    "Estrategia digital",
    "Diseño web",
    "UX/UI",
    "Next.js",
    "Desarrollo frontend",
    "Vercel",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" suppressHydrationWarning>
      <head>
        <script
          noModule
          dangerouslySetInnerHTML={{
            __html: "window.location.replace('/legacy/');",
          }}
        />
        <noscript>
          <meta httpEquiv="refresh" content="0; url=/legacy/" />
        </noscript>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
