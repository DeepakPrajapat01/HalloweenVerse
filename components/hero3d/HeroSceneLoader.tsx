"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

/* Lazy-load the 3D scene — no SSR */
const HeroScene = dynamic(() => import("./HeroScene"), {
    ssr: false,
    loading: () => <HeroLoading />,
});

/** Styled loading skeleton matching the scene palette */
function HeroLoading() {
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                background:
                    "linear-gradient(180deg, #090811 0%, #0e0a1e 40%, #1a1040 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    opacity: 0.6,
                }}
            >
                <div
                    style={{
                        width: "40px",
                        height: "40px",
                        border: "3px solid rgba(155,92,255,0.3)",
                        borderTop: "3px solid #9B5CFF",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                    }}
                />
                <span
                    style={{
                        color: "#7A7296",
                        fontSize: "0.75rem",
                        letterSpacing: "0.1em",
                        fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                    }}
                >
                    Loading scene…
                </span>
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            </div>
        </div>
    );
}

/** Static gradient fallback for no-WebGL / reduced-motion */
function HeroFallback() {
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                background: `
          radial-gradient(ellipse 120% 70% at 50% -20%, rgba(155,92,255,0.18) 0%, transparent 55%),
          radial-gradient(ellipse 60% 40% at 15% 80%, rgba(255,117,24,0.10) 0%, transparent 50%),
          radial-gradient(ellipse 40% 30% at 85% 70%, rgba(155,92,255,0.08) 0%, transparent 50%),
          linear-gradient(180deg, #090811 0%, #0e0a1e 40%, #1a1040 100%)
        `,
            }}
        />
    );
}

/** Detects WebGL support */
function hasWebGL(): boolean {
    try {
        const c = document.createElement("canvas");
        return !!(
            c.getContext("webgl2") || c.getContext("webgl")
        );
    } catch {
        return false;
    }
}

/**
 * Wrapper: lazy-loads the 3D scene with loading state,
 * shows fallback for no-WebGL or prefers-reduced-motion.
 */
export default function HeroSceneLoader() {
    const [canRender, setCanRender] = useState<boolean | null>(null);

    useEffect(() => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        setCanRender(!reducedMotion && hasWebGL());
    }, []);

    // SSR / initial render — show loading state
    if (canRender === null) return <HeroLoading />;
    if (!canRender) return <HeroFallback />;

    return <HeroScene />;
}
