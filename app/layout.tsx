import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HalloweenVerse — One Night. A Thousand Spooky Stories.",
    template: "%s | HalloweenVerse",
  },
  description:
    "Step into HalloweenVerse — a cinematic Halloween experience. Explore a 3D neighborhood, uncover spooky lore, and live the night.",
  keywords: ["Halloween 2026", "Halloween experience", "3D Halloween world", "Halloween India"],
  openGraph: {
    title: "HalloweenVerse — One Night. A Thousand Spooky Stories.",
    description: "Step into HalloweenVerse — a cinematic Halloween experience.",
    siteName: "HalloweenVerse",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HalloweenVerse",
    description: "One Night. A Thousand Spooky Stories.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
    >
      <body className="antialiased" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)", minHeight: "100dvh" }}>
        {children}
      </body>
    </html>
  );
}
