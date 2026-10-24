"use client";

import { useRef, KeyboardEvent } from "react";
import { LOCATIONS } from "@/src/data/locations";
import { useWorldStore } from "@/src/lib/store";

/** Compact pill-based location menu — keyboard navigable */
export default function ZoneMenu() {
    const { activeZone, setActiveZone } = useWorldStore();
    const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const handleKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            const next = (index + 1) % LOCATIONS.length;
            pillRefs.current[next]?.focus();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            const prev = (index - 1 + LOCATIONS.length) % LOCATIONS.length;
            pillRefs.current[prev]?.focus();
        }
    };

    return (
        <nav
            aria-label="World destinations"
            style={{
                position: "absolute",
                bottom: "40px",
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                padding: "0 16px",
                zIndex: 15,
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: "8px",
                    overflowX: "auto",
                    scrollbarWidth: "none",
                    padding: "6px 4px",
                    WebkitOverflowScrolling: "touch",
                }}
            >
                {LOCATIONS.map((loc, i) => {
                    const isActive = activeZone === loc.id;
                    return (
                        <button
                            key={loc.id}
                            ref={(el) => { pillRefs.current[i] = el; }}
                            onClick={() => setActiveZone(isActive ? null : loc.id)}
                            onKeyDown={(e) => handleKey(e, i)}
                            aria-pressed={isActive}
                            aria-label={`Select ${loc.name}`}
                            style={{
                                flexShrink: 0,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "7px 14px",
                                borderRadius: "9999px",
                                border: `1px solid ${isActive ? loc.color : "rgba(255,255,255,0.12)"}`,
                                background: isActive
                                    ? `${loc.color}22`
                                    : "rgba(21,19,34,0.7)",
                                backdropFilter: "blur(8px)",
                                color: isActive ? loc.color : "#B5AEC8",
                                fontSize: "0.78rem",
                                fontWeight: 600,
                                fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                                cursor: "pointer",
                                transition: "all 150ms ease",
                                whiteSpace: "nowrap",
                                boxShadow: isActive
                                    ? `0 0 12px ${loc.color}44`
                                    : "none",
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    (e.currentTarget as HTMLElement).style.borderColor =
                                        `${loc.color}88`;
                                    (e.currentTarget as HTMLElement).style.color = loc.color;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    (e.currentTarget as HTMLElement).style.borderColor =
                                        "rgba(255,255,255,0.12)";
                                    (e.currentTarget as HTMLElement).style.color = "#B5AEC8";
                                }
                            }}
                        >
                            <span aria-hidden>{loc.emoji}</span>
                            {loc.name}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
