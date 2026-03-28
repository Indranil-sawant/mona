import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import "../styles/hero.css";

/* ── Primary: Playfair Display ─────────────────────────── */
const playfair = Playfair_Display({
  variable:       "--font-playfair",
  subsets:        ["latin"],
  weight:         ["400", "500", "600", "700", "800", "900"],
  display:        "swap",
});

/* ── Secondary: Cormorant Garamond ─────────────────────── */
const cormorant = Cormorant_Garamond({
  variable:       "--font-cormorant",
  subsets:        ["latin"],
  weight:         ["300", "400", "500", "600", "700"],
  display:        "swap",
});

/* ── Accent: DM Serif Display ──────────────────────────── */
const dmSerif = DM_Serif_Display({
  variable:       "--font-dm-serif",
  subsets:        ["latin"],
  weight:         ["400"],
  display:        "swap",
});

/* ── Metadata ───────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "MONA Mangoes — Indulge in Pure Sweetness",
  description:
    "Handpicked Alphonso mangoes, naturally ripened, farm-fresh excellence. From Ratnagiri orchards to your table.",
  keywords:    ["Alphonso mangoes", "premium mangoes", "MONA Mangoes", "farm fresh fruit"],
  openGraph: {
    title:       "MONA Mangoes — Indulge in Pure Sweetness",
    description: "Handpicked Alphonso mangoes, naturally ripened, farm-fresh excellence.",
    type:        "website",
    locale:      "en_IN",
  },
};

import { SmoothScroll } from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${dmSerif.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col"
        style={{
          fontFamily: "var(--font-playfair), system-ui, serif",
          background: "#1a1a1a",
          color:      "#f5e6c8",
        }}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
