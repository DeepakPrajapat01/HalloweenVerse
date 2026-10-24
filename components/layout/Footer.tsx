"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Ghost, Heart } from "lucide-react";
import { getActiveNavigationCategories } from "@/src/config/navigation";

export default function Footer() {
    const [year, setYear] = useState(2026);
    const activeCategories = getActiveNavigationCategories();

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer
            role="contentinfo"
            className="mt-auto relative z-20"
            style={{
                backgroundColor: "var(--color-surface)",
                borderTop: "1px solid var(--color-border)",
            }}
        >
            <div className="container-hv py-10 sm:py-12">
                {/* Main branding & minimal navigation row */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-8">
                    {/* Brand */}
                    <div className="max-w-md">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-bold text-lg mb-3"
                            style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-text)" }}
                            aria-label="HalloweenVerse home"
                        >
                            <Ghost size={20} style={{ color: "var(--color-orange)" }} aria-hidden />
                            <span>
                                Halloween<span style={{ color: "var(--color-orange)" }}>Verse</span>
                            </span>
                        </Link>
                        <p
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--color-text-muted)" }}
                        >
                            An explorable 3D Halloween neighborhood with haunted streets, glowing pumpkins,
                            and secrets hidden in the dark.
                        </p>
                    </div>

                    {/* Active Navigation Categories (only categories with fully implemented experiences appear) */}
                    {activeCategories.length > 0 && (
                        <div className="flex flex-wrap gap-10">
                            {activeCategories.map((category) => (
                                <div key={category.title}>
                                    <h3
                                        className="text-xs font-semibold uppercase tracking-widest mb-3"
                                        style={{ color: "var(--color-text-ghost)" }}
                                    >
                                        {category.title}
                                    </h3>
                                    <ul className="flex flex-col gap-2" role="list">
                                        {category.links.map((link) => (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    className="text-sm transition-colors duration-150"
                                                    style={{ color: "var(--color-text-muted)" }}
                                                    onMouseEnter={(e) =>
                                                        ((e.currentTarget as HTMLElement).style.color = "var(--color-orange)")
                                                    }
                                                    onMouseLeave={(e) =>
                                                        ((e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)")
                                                    }
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Minimal Bottom Bar */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
                    style={{ borderTop: "1px solid var(--color-border)" }}
                >
                    <p
                        className="flex items-center gap-1.5 text-xs"
                        style={{ color: "var(--color-text-ghost)" }}
                    >
                        <span>Made with</span>
                        <Heart
                            size={12}
                            style={{ color: "var(--color-orange)", fill: "var(--color-orange)" }}
                            aria-label="love"
                        />
                        <span>in India · {year} HalloweenVerse</span>
                    </p>
                    <p
                        className="text-xs"
                        style={{ color: "var(--color-text-ghost)" }}
                    >
                        A voluntary independent creative project
                    </p>
                </div>
            </div>
        </footer>
    );
}
