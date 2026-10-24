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
