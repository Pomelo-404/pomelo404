import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeScript = `
  (function () {
    try {
      var savedTheme =
        localStorage.getItem("pomelo-theme");

      if (
        savedTheme === "light" ||
        savedTheme === "dark"
      ) {
        document.documentElement.dataset.theme =
          savedTheme;
      }
    } catch (error) {}
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://pomelo404.vercel.app",
  ),
  title: "pomelo404 — Sitios que hacen click",
  description:
    "Estudio web independiente. Estrategia, diseño y desarrollo Next.js para marcas con buenas ideas.",
  openGraph: {
    title: "pomelo404 — Sitios que hacen click",
    description:
      "Estrategia, diseño y desarrollo Next.js para marcas con buenas ideas.",
    images: [{ url: "/og-v2.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
