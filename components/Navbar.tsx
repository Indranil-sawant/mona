"use client";

/**
 * Navbar.tsx
 * ──────────────────────────────────────────────────────────────────────────
 * Fixed top navbar for MONA Mangoes.
 *
 * Behaviour:
 *   • Transparent + no backdrop-blur at top of page
 *   • Transitions to blurred glass panel after 60px of scroll
 *   • MONA logotype on the left
 *   • Navigation links (centre, hidden on mobile)
 *   • CTA button on the right
 *   • Fully keyboard accessible (focus-visible rings)
 * ──────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback } from "react";

/* ── Nav links ──────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Story",    href: "#story"    },
  { label: "Mangoes",  href: "#products" },
  { label: "Orchards", href: "#orchards" },
  { label: "Contact",  href: "#contact"  },
] as const;

/* ── Mango logotype icon ────────────────────────────────────── */
function MangoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#FFC300" />
          <stop offset="100%" stopColor="#FF6A00" />
        </linearGradient>
      </defs>
      <path
        d="M16 3 C22 5, 28 11, 27 19 C26 26, 20 30, 14 28 C8 26, 4 20, 6 13 C8 7, 12 2, 16 3Z"
        fill="url(#mgGrad)"
      />
      <path
        d="M16 3 C14 0, 18 -1, 20 2 C22 5, 19 7, 16 3Z"
        fill="#2E7D32"
      />
      <ellipse cx="12" cy="12" rx="3" ry="5" fill="rgba(255,255,255,0.22)" transform="rotate(-20,12,12)" />
    </svg>
  );
}

/* ── Hamburguer icon (mobile) ───────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="18" y1="6"  x2="6"  y2="18" />
          <line x1="6"  y1="6"  x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3"  y1="6"  x2="21" y2="6"  />
          <line x1="3"  y1="12" x2="21" y2="12" />
          <line x1="3"  y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
}

/* ── Main Navbar ────────────────────────────────────────────── */
export function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        background: scrolled
          ? "rgba(10, 10, 10, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(160%)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,195,0,0.15)"
          : "1px solid transparent",
        boxShadow: scrolled
          ? "0 10px 40px rgba(0,0,0,0.4)"
          : "none",
      }}
      role="banner"
    >
      <nav
        className={`mx-auto max-w-[1400px] px-6 md:px-12 flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-20' : 'h-24 md:h-32'}`}
        aria-label="Main navigation"
      >
        {/* ── Logo / Brand ─────────────────────────────────── */}
        <a
          href="#hero"
          id="navbar-logo"
          className="flex items-center gap-3.5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm transition-transform duration-300 hover:scale-[1.02]"
          style={{ outlineColor: "#FFC300" }}
          aria-label="MONA Mangoes — back to top"
        >
          <MangoIcon className={`transition-all duration-300 ${scrolled ? 'w-8 h-8 md:w-10 md:h-10' : 'w-10 h-10 md:w-14 md:h-14'}`} />
          <div className="flex flex-col justify-center">
            <span
              className="font-black tracking-tighter leading-none"
              style={{
                fontSize: scrolled ? "clamp(1.5rem, 3vw, 2.2rem)" : "clamp(1.8rem, 4vw, 3rem)",
                background: "linear-gradient(90deg, #FFC300, #FF6A00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                transition: "font-size 0.5s ease",
              }}
            >
              MONA
            </span>
            <span
              className={`font-black tracking-[0.5em] uppercase transition-all duration-500 ${scrolled ? 'text-[8px] md:text-xs' : 'text-xs md:text-sm'}`}
              style={{ color: "rgba(245,230,200,0.6)", marginTop: scrolled ? "0px" : "4px" }}
            >
              MANGOES
            </span>
          </div>
        </a>

        {/* ── Desktop nav links ─────────────────────────────── */}
        <ul
          className="hidden lg:flex items-center gap-4"
          role="list"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                id={`navbar-link-${label.toLowerCase()}`}
                className="relative px-5 py-3 text-lg font-bold tracking-tight rounded-md transition-all duration-300 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  color:        "rgba(245,230,200,0.85)",
                  outlineColor: "#FFC300",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#FFC300";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,230,200,0.85)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                {label}
                <span
                  className="absolute bottom-1.5 left-5 right-5 h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: "linear-gradient(90deg, #FFC300, #FF6A00)" }}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* ── Right side actions ───────────────────────────── */}
        <div className="flex items-center gap-6">
          <a
            id="navbar-cta"
            href="#products"
            className={`hidden sm:inline-flex items-center justify-center font-black uppercase tracking-tight transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_15px_40px_rgba(255,106,0,0.3)] hover:shadow-[0_20px_60px_rgba(255,106,0,0.5)] ${scrolled ? 'px-8 py-3 text-base rounded-full' : 'px-12 py-5 text-xl rounded-full'}`}
            style={{
              background:   "linear-gradient(135deg, #FFC300 0%, #FF6A00 100%)",
              color:        "#1a1a1a",
              outlineColor: "#FFD54F",
            }}
            aria-label="Shop MONA Mangoes"
          >
            Shop Now
          </a>

          <button
            id="navbar-mobile-toggle"
            className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              color:        "rgba(255,195,0,0.9)",
              outlineColor: "#FFC300",
              background:   mobileOpen ? "rgba(255,195,0,0.15)" : "rgba(255,255,255,0.05)",
            }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown menu ──────────────────────────────── */}
      <div
        id="mobile-menu"
        className="lg:hidden overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight:  mobileOpen ? "450px" : "0",
          opacity:    mobileOpen ? 1 : 0,
          background: "rgba(10, 10, 10, 0.98)",
          backdropFilter: "blur(30px)",
          borderTop:  mobileOpen ? "1px solid rgba(255,195,0,0.2)" : "none",
        }}
        aria-hidden={!mobileOpen}
        role="menu"
      >
        <ul className="px-8 py-8 flex flex-col gap-3" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label} role="none">
              <a
                href={href}
                id={`mobile-link-${label.toLowerCase()}`}
                role="menuitem"
                className="flex items-center gap-4 px-6 py-5 rounded-2xl text-2xl font-black transition-all duration-300"
                style={{
                  color:        "rgba(245,230,200,0.9)",
                }}
                onClick={() => setMobileOpen(false)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#FFC300";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,195,0,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "2rem";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,230,200,0.9)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "1.5rem";
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#FFC300", boxShadow: "0 0 10px #FFC300" }}
                  aria-hidden="true"
                />
                {label}
              </a>
            </li>
          ))}

          <li role="none" className="mt-6">
            <a
              href="#products"
              id="mobile-cta"
              role="menuitem"
              className="flex items-center justify-center gap-2 w-full px-8 py-6 rounded-full text-2xl font-black transition-all duration-300 active:scale-95"
              style={{
                background:   "linear-gradient(135deg, #FFC300 0%, #FF6A00 100%)",
                color:        "#1a1a1a",
                boxShadow:    "0 15px 40px rgba(255,106,0,0.4)",
              }}
              onClick={() => setMobileOpen(false)}
            >
              Shop Collection
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
