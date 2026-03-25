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
function MangoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className="w-7 h-7 flex-shrink-0"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#FFC300" />
          <stop offset="100%" stopColor="#FF6A00" />
        </linearGradient>
      </defs>
      {/* Mango body */}
      <path
        d="M16 3 C22 5, 28 11, 27 19 C26 26, 20 30, 14 28 C8 26, 4 20, 6 13 C8 7, 12 2, 16 3Z"
        fill="url(#mgGrad)"
      />
      {/* Leaf */}
      <path
        d="M16 3 C14 0, 18 -1, 20 2 C22 5, 19 7, 16 3Z"
        fill="#2E7D32"
      />
      {/* Highlight */}
      <ellipse cx="12" cy="12" rx="3" ry="5" fill="rgba(255,255,255,0.22)" transform="rotate(-20,12,12)" />
    </svg>
  );
}

/* ── Hamburguer icon (mobile) ───────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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

  /* ── Scroll listener ──────────────────────────────────────── */
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ── Close mobile menu on route change / resize ──────────── */
  useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(18, 12, 6, 0.72)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,195,0,0.12)"
          : "1px solid transparent",
        boxShadow: scrolled
          ? "0 4px 32px rgba(0,0,0,0.3)"
          : "none",
      }}
      role="banner"
    >
      <nav
        className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12 h-16 md:h-18 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* ── Logo / Brand ─────────────────────────────────── */}
        <a
          href="#hero"
          id="navbar-logo"
          className="flex items-center gap-2.5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm"
          style={{ outlineColor: "#FFC300" }}
          aria-label="MONA Mangoes — back to top"
        >
          <MangoIcon />
          <span
            className="font-extrabold tracking-tight leading-none"
            style={{
              fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)",
              background: "linear-gradient(90deg, #FFC300, #FF6A00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            MONA
          </span>
          <span
            className="hidden sm:inline-block text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ color: "rgba(245,230,200,0.55)", marginTop: "1px" }}
          >
            Mangoes
          </span>
        </a>

        {/* ── Desktop nav links ─────────────────────────────── */}
        <ul
          className="hidden md:flex items-center gap-1"
          role="list"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                id={`navbar-link-${label.toLowerCase()}`}
                className="relative px-4 py-2 text-sm font-medium tracking-wide rounded-md transition-colors duration-200 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  color:        "rgba(245,230,200,0.75)",
                  outlineColor: "#FFC300",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#FFC300";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,230,200,0.75)";
                }}
              >
                {label}
                {/* Underline accent */}
                <span
                  className="absolute bottom-1 left-4 right-4 h-px transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                  style={{ background: "linear-gradient(90deg, #FFC300, #FF6A00)" }}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* ── Right side actions ───────────────────────────── */}
        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <a
            id="navbar-cta"
            href="#products"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              background:   "linear-gradient(135deg, #FFC300 0%, #FF6A00 100%)",
              color:        "#1a1a1a",
              outlineColor: "#FFD54F",
              boxShadow:    "0 2px 16px rgba(255,195,0,0.3)",
            }}
            aria-label="Shop MONA Mangoes"
          >
            Shop Now
          </a>

          {/* Mobile menu toggle */}
          <button
            id="navbar-mobile-toggle"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              color:        "rgba(245,230,200,0.8)",
              outlineColor: "#FFC300",
              background:   mobileOpen ? "rgba(255,195,0,0.12)" : "transparent",
            }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown menu ──────────────────────────────── */}
      <div
        id="mobile-menu"
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight:  mobileOpen ? "320px" : "0",
          opacity:    mobileOpen ? 1 : 0,
          background: "rgba(18, 12, 6, 0.92)",
          backdropFilter: "blur(20px)",
          borderTop:  mobileOpen ? "1px solid rgba(255,195,0,0.1)" : "none",
        }}
        aria-hidden={!mobileOpen}
        role="menu"
      >
        <ul className="px-5 py-4 flex flex-col gap-1" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label} role="none">
              <a
                href={href}
                id={`mobile-link-${label.toLowerCase()}`}
                role="menuitem"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  color:        "rgba(245,230,200,0.8)",
                  outlineColor: "#FFC300",
                }}
                onClick={() => setMobileOpen(false)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#FFC300";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,195,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,230,200,0.8)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: "#FFC300" }}
                  aria-hidden="true"
                />
                {label}
              </a>
            </li>
          ))}

          {/* Mobile CTA */}
          <li role="none" className="mt-2">
            <a
              href="#products"
              id="mobile-cta"
              role="menuitem"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full text-sm font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                background:   "linear-gradient(135deg, #FFC300 0%, #FF6A00 100%)",
                color:        "#1a1a1a",
                outlineColor: "#FFD54F",
              }}
              onClick={() => setMobileOpen(false)}
            >
              Shop Mangoes
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
