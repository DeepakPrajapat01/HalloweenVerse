"use client";

import Link from "next/link";
import { LOCATIONS } from "@/src/data/locations";

/**
 * Text-based fallback grid — always visible below the hero.
 * No WebGL required. All 5 destinations accessible via keyboard/screen reader.
 */
export default function ZoneFallback() {
    return (
        <section
            aria-labelledby="zones-fallback-heading"
            style={{ padding: "72px 24px", backgroundColor: "var(--color-surface)" }}
        >
            <div className="container-hv">
                <div style={{ marginBottom: "40px" }}>
                    <p
                        style={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--color-text-ghost)",
                            marginBottom: "8px",
                        }}
                    >
                        Explore the world
                    </p>
                    <h2
                        id="zones-fallback-heading"
                        style={{
                            fontSize: "var(--text-2xl)",
                            fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                            fontWeight: 700,
                            color: "var(--color-text)",
                            lineHeight: 1.2,
                        }}
                    >
                        Five destinations await
                    </h2>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                        gap: "1px",
                        backgroundColor: "var(--color-border)",
                    }}
                >
                    {LOCATIONS.map((loc) => (
                        <Link
                            key={loc.id}
                            href={loc.href}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "28px",
                                backgroundColor: "var(--color-surface)",
                                textDecoration: "none",
                                transition: "background-color 150ms ease",
                            }}
                            onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.backgroundColor =
                                "var(--color-surface-raised)")
                            }
                            onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.backgroundColor =
                                "var(--color-surface)")
                            }
                        >
                            <span
                                style={{
                                    fontSize: "2.2rem",
                                    marginBottom: "12px",
                                    lineHeight: 1,
                                }}
                                aria-hidden
                            >
                                {loc.emoji}
                            </span>

                            <div
                                style={{
                                    width: "32px",
                                    height: "2px",
                                    background: loc.color,
                                    borderRadius: "2px",
                                    marginBottom: "12px",
                                }}
                            />

                            <h3
                                style={{
                                    fontSize: "var(--text-lg)",
                                    fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                                    fontWeight: 700,
                                    color: "var(--color-text)",
                                    marginBottom: "8px",
                                    lineHeight: 1.2,
                                }}
                            >
                                {loc.name}
                            </h3>

                            <p
                                style={{
                                    fontSize: "0.875rem",
                                    color: "var(--color-text-muted)",
                                    lineHeight: 1.6,
                                    flex: 1,
                                    marginBottom: "16px",
                                }}
                            >
                                {loc.description}
                            </p>

                            <span
                                style={{
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                    color: loc.color,
                                    fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                                }}
                            >
                                Explore →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
