/**
 * app/page.tsx
 * Home page — renders the Navbar + Hero section.
 * All other page sections (#products, #story, etc.) can be appended below.
 */

import { Navbar } from "@/components/Navbar";
import { Hero }   from "@/components/Hero";
import { Story }  from "@/components/Story";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      {/* ── Persistent top navbar ─────────────────────────── */}
      <Navbar />

      {/* ── Hero scrollytelling section ────────────────────── */}
      <Hero />

      {/* ── Story scrollytelling section ───────────────────── */}
      <Story />

      {/* ── Product listings — current placeholder ────────── */}
      <section
        id="products"
        className="min-h-screen flex items-center justify-center p-6"
        style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #3b2f1c 100%)" }}
      >
        <div className="text-center">
          <h2
            className="font-extrabold mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              background: "linear-gradient(90deg, #FFC300, #FF6A00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Mangoes
          </h2>
          <p style={{ color: "rgba(245,230,200,0.6)", fontSize: "1.1rem" }}>
            Product listings coming soon…
          </p>
        </div>
      </section>

      <section
        id="contact"
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#120c06" }}
      >
        <div className="text-center">
          <h2
            className="font-extrabold mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color:    "#FFC300",
            }}
          >
            Get in Touch
          </h2>
          <p style={{ color: "rgba(245,230,200,0.6)", fontSize: "1.1rem" }}>
            Contact section coming soon…
          </p>
        </div>
      </section>
    </main>
  );
}
