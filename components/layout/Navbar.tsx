"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Ghost } from "lucide-react";

import { ACTIVE_ROUTES } from "@/src/config/navigation";

// Only publicly active routes appear in navigation
const navLinks = ACTIVE_ROUTES.filter((r) => r.path !== "/").map((r) => ({
    href: r.path,
    label: r.label,
}));

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Add shadow when scrolled
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 16);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            role="banner"
            className={`sticky top-0 z-50 transition-all duration-200`}
            style={{
                backgroundColor: "var(--color-surface)",
                borderBottom: `1px solid ${scrolled ? "var(--color-border)" : "transparent"}`,
                boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.4)" : "none",
            }}
        >
            <div className="container-hv flex items-center justify-between h-16">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-lg"
                    style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-text)" }}
                    aria-label="HalloweenVerse home"
                >
                    <Ghost
                        size={22}
                        style={{ color: "var(--color-orange)" }}
                        aria-hidden="true"
                    />
                    <span>
                        Halloween<span style={{ color: "var(--color-orange)" }}>Verse</span>
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav
                    aria-label="Main navigation"
                    className="hidden md:flex items-center gap-1"
                >
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-150"
                                style={{
                                    color: isActive ? "var(--color-orange)" : "var(--color-text-muted)",
                                    backgroundColor: isActive ? "rgba(255,117,24,0.08)" : "transparent",
                                    borderBottom: isActive ? "2px solid var(--color-orange)" : "2px solid transparent",
                                }}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:block">
                    <Link
                        href="/explore"
                        className="px-4 py-2 rounded-md text-sm font-semibold transition-all duration-150 glow-orange"
                        style={{
                            backgroundColor: "var(--color-orange)",
                            color: "#000",
                            fontFamily: "var(--font-space-grotesk)",
                        }}
                    >
                        Enter the World 🎃
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button
                    type="button"
                    onClick={() => setIsOpen((o) => !o)}
                    className="md:hidden p-2 rounded-md"
                    style={{ color: "var(--color-text)" }}
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                >
                    {isOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
                </button>
            </div>

            {/* Mobile menu */}
            <div
                id="mobile-menu"
                role="navigation"
                aria-label="Mobile navigation"
                className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                style={{ borderTop: isOpen ? `1px solid var(--color-border)` : "none" }}
            >
                <div
                    className="px-4 py-3 flex flex-col gap-1"
                    style={{ backgroundColor: "var(--color-surface)" }}
                >
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-3 py-3 rounded-md text-sm font-medium transition-colors"
                                style={{
                                    color: isActive ? "var(--color-orange)" : "var(--color-text-muted)",
                                    backgroundColor: isActive ? "rgba(255,117,24,0.08)" : "transparent",
                                }}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    <Link
                        href="/explore"
                        className="mt-2 px-4 py-3 rounded-md text-sm font-semibold text-center"
                        style={{ backgroundColor: "var(--color-orange)", color: "#000" }}
                    >
                        Enter the World 🎃
                    </Link>
                </div>
            </div>
        </header>
    );
}
