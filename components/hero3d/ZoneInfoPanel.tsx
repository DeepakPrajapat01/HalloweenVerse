"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useWorldStore } from "@/src/lib/store";
import { getLocation } from "@/src/data/locations";

/** Slide-up info panel shown when a zone is selected */
export default function ZoneInfoPanel() {
    const { activeZone, clearZone } = useWorldStore();
    const location = activeZone ? getLocation(activeZone) : null;
    const enterRef = useRef<HTMLAnchorElement>(null);

    // Keyboard: Escape closes, auto-focus Enter link
    useEffect(() => {
        if (!activeZone) return;
        enterRef.current?.focus();

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") clearZone();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [activeZone, clearZone]);

    return (
        <div
            role="region"
            aria-live="polite"
            aria-label="Zone information"
            style={{
                position: "absolute",
                bottom: "80px",
                left: "50%",
                transform: `translateX(-50%) translateY(${activeZone ? "0" : "20px"})`,
                opacity: activeZone ? 1 : 0,
                pointerEvents: activeZone ? "auto" : "none",
                transition: "opacity 300ms ease, transform 300ms ease",
                zIndex: 20,
                width: "min(480px, calc(100vw - 32px))",
            }}
        >
            {location && (
                <div
                    style={{
                        background: "rgba(21,19,34,0.92)",
                        backdropFilter: "blur(12px)",
                        border: `1px solid ${location.color}44`,
                        borderLeft: `3px solid ${location.color}`,
                        borderRadius: "12px",
                        padding: "20px 24px",
                        boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${location.color}11`,
                    }}
                >
                    {/* Header row */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                            marginBottom: "10px",
                        }}
                    >
                        <span style={{ fontSize: "2rem", lineHeight: 1, flexShrink: 0 }}>
                            {location.emoji}
                        </span>
                        <div style={{ flex: 1 }}>
                            <p
                                style={{
                                    fontSize: "0.7rem",
                                    color: location.color,
                                    letterSpacing: "0.1em",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    marginBottom: "2px",
                                    fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                                }}
                            >
                                Destination
                            </p>
                            <h3
                                style={{
                                    fontSize: "1.2rem",
                                    fontWeight: 700,
                                    color: "#F8F5FF",
                                    margin: 0,
                                    fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                                    lineHeight: 1.2,
                                }}
                            >
                                {location.name}
                            </h3>
                        </div>
                        <button
                            onClick={clearZone}
                            aria-label="Close zone info"
                            style={{
                                background: "transparent",
                                border: "none",
                                color: "#7A7296",
                                cursor: "pointer",
                                padding: "4px",
                                borderRadius: "4px",
                                lineHeight: 1,
                                fontSize: "1.1rem",
                                flexShrink: 0,
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    <p
                        style={{
                            fontSize: "0.875rem",
                            color: "#B5AEC8",
                            lineHeight: 1.6,
                            margin: "0 0 16px",
                        }}
                    >
                        {location.description}
                    </p>

                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <Link
                            ref={enterRef}
                            href={location.href}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "9px 20px",
                                borderRadius: "6px",
                                fontWeight: 700,
                                fontSize: "0.875rem",
                                color: "#000",
                                background: `linear-gradient(135deg, ${location.color} 0%, ${location.color}cc 100%)`,
                                textDecoration: "none",
                                fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                                boxShadow: `0 0 20px ${location.color}44`,
                                transition: "transform 150ms ease",
                            }}
                            onMouseEnter={(e) =>
                                ((e.currentTarget as HTMLElement).style.transform = "scale(1.04)")
                            }
                            onMouseLeave={(e) =>
                                ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
                            }
                        >
                            Explore {location.emoji}
                        </Link>
                        <button
                            onClick={clearZone}
                            style={{
                                background: "transparent",
                                border: "1px solid #302840",
                                color: "#B5AEC8",
                                padding: "9px 16px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "0.875rem",
                            }}
                        >
                            Back to world
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
