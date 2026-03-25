import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "../styles/hero.css";

/* ── Outfit font ────────────────────────────────────────────── */
const outfit = Outfit({
  variable:       "--font-outfit",
  subsets:        ["latin"],
  weight:         ["400", "500", "600", "700", "800"],
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col"
        style={{
          fontFamily: "var(--font-outfit), system-ui, sans-serif",
          background: "#1a1a1a",
          color:      "#f5e6c8",
        }}
      >
        {children}
      </body>
    </html>
  );
}
