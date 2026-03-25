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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled 
          ? "bg-[#0c0c0c]/85 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] border-b border-accent/10" 
          : "bg-transparent border-b border-transparent"
      }`}
      role="banner"
    >
      <nav
        className={`mx-auto max-w-[1400px] px-[var(--section-px)] flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'h-16 md:h-20' : 'h-24 md:h-32'
        }`}
        aria-label="Main navigation"
      >
        {/* ── Logo / Brand ─────────────────────────────────── */}
        <a
          href="#hero"
          id="navbar-logo"
          className="flex items-center gap-4 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm transition-transform duration-300 hover:scale-[1.01]"
          aria-label="MONA Mangoes — back to top"
        >
          <MangoIcon className={`transition-all duration-500 ${scrolled ? 'w-8 h-8 md:w-10' : 'w-10 h-10 md:w-14'}`} />
          <div className="flex flex-col justify-center">
            <span
              className="font-black tracking-tighter leading-none text-shimmer"
              style={{
                fontSize: scrolled ? "clamp(1.4rem, 2.5vw, 2rem)" : "clamp(1.8rem, 4vw, 3rem)",
                transition: "font-size 0.5s ease",
              }}
            >
              MONA
            </span>
            <span
              className={`font-black tracking-[0.5em] uppercase transition-all duration-500 text-foreground/40 ${
                scrolled ? 'text-[8px] md:text-[10px]' : 'text-[10px] md:text-xs'
              }`}
              style={{ marginTop: scrolled ? "-2px" : "4px" }}
            >
              MANGOES
            </span>
          </div>
        </a>

        {/* ── Desktop nav links ─────────────────────────────── */}
        <ul
          className="hidden lg:flex items-center gap-10"
          role="list"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                id={`navbar-link-${label.toLowerCase()}`}
                className="relative py-2 text-sm font-bold tracking-widest uppercase text-foreground/60 transition-all duration-300 group hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {label}
                <span
                  className="absolute bottom-0 left-0 w-full h-[1px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-accent"
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
            className={`hidden sm:inline-flex items-center justify-center font-black uppercase tracking-tight transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] shadow-[0_15px_40px_rgba(255,106,0,0.2)] hover:shadow-[0_20px_60px_rgba(255,106,0,0.4)] bg-gradient-to-br from-accent to-accent-alt text-[#0c0c0c] ${
              scrolled ? 'px-8 py-3 text-sm rounded-full' : 'px-10 py-5 text-lg rounded-full'
            }`}
            aria-label="Shop MONA Mangoes"
          >
            Shop Now
          </a>

          <button
            id="navbar-mobile-toggle"
            className={`lg:hidden flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              mobileOpen ? "bg-accent/10 border border-accent/20" : "bg-white/5 border border-white/5"
            }`}
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
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out bg-[#0c0c0c] backdrop-blur-3xl ${
          mobileOpen ? "max-h-[500px] opacity-100 border-t border-accent/20" : "max-h-0 opacity-0 border-t border-transparent"
        }`}
        aria-hidden={!mobileOpen}
        role="menu"
      >
        <ul className="px-8 py-10 flex flex-col gap-4" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label} role="none">
              <a
                href={href}
                id={`mobile-link-${label.toLowerCase()}`}
                role="menuitem"
                className="flex items-center gap-4 px-6 py-5 rounded-2xl text-2xl font-black text-foreground/80 transition-all duration-300 hover:text-accent hover:bg-accent/5 active:scale-95"
                onClick={() => setMobileOpen(false)}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_#FFC300]"
                  aria-hidden="true"
                />
                {label}
              </a>
            </li>
          ))}

          <li role="none" className="mt-8">
            <a
              href="#products"
              id="mobile-cta"
              role="menuitem"
              className="flex items-center justify-center gap-2 w-full px-8 py-6 rounded-full text-2xl font-black transition-all duration-300 active:scale-95 bg-gradient-to-r from-accent to-accent-alt text-[#0c0c0c] shadow-[0_15px_40px_rgba(255,106,0,0.3)]"
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
