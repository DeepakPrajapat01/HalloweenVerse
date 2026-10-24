"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HeroSceneLoader from "@/components/hero3d/HeroSceneLoader";
import ContributionSection from "./ContributionSection";
import Footer from "@/components/layout/Footer";

/** Sound toggle — off by default */
function SoundToggle() {
    const [on, setOn] = useState(false);
    return (
        <button
            onClick={() => setOn((v) => !v)}
            aria-label={on ? "Mute ambient sound" : "Enable ambient sound"}
            style={{
                background: "rgba(21,19,34,0.6)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: on ? "#FF7518" : "#7A7296",
                fontSize: "1.1rem",
                backdropFilter: "blur(8px)",
                transition: "all 150ms ease",
                flexShrink: 0,
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#FF7518";
                (e.currentTarget as HTMLElement).style.color = "#FF7518";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLElement).style.color = on ? "#FF7518" : "#7A7296";
            }}
        >
            {on ? "🔊" : "🔇"}
        </button>
    );
}

/** Minimal wordmark top-left */
function Wordmark() {
    return (
        <Link
            href="/"
            aria-label="HalloweenVerse"
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
            }}
        >
            <span style={{ fontSize: "1.3rem", lineHeight: 1 }} aria-hidden>🎃</span>
            <span
                style={{
                    fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#F8F5FF",
                    letterSpacing: "-0.01em",
                }}
            >
                Halloween<span style={{ color: "#FF7518" }}>Verse</span>
            </span>
        </Link>
    );
}

/** Animated entrance for the hero text */
function HeroContent({
    isEntering,
    onEnterParty,
}: {
    isEntering: boolean;
    onEnterParty: () => void;
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Small delay so 3D scene starts loading first
        const t = setTimeout(() => setVisible(true), 250);
        return () => clearTimeout(t);
    }, []);

    return (
        <div
            style={{
                position: "relative",
                zIndex: 10,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 700ms ease-out, transform 700ms ease-out",
                padding: "0 20px",
                maxWidth: "680px",
                width: "100%",
            }}
        >
            {/* Slim badge */}
            <div
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 14px",
                    borderRadius: "9999px",
                    background: "rgba(155,92,255,0.15)",
                    border: "1px solid rgba(155,92,255,0.3)",
                    color: "#9B5CFF",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "28px",
                    fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                }}
            >
                <span aria-hidden>🌙</span> Halloween 2026
            </div>

            {/* Main headline */}
            <h1
                style={{
                    fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: "-0.03em",
                    color: "#F8F5FF",
                    margin: "0 0 20px",
                    fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
                }}
            >
                One Night.{" "}
                <span
                    style={{
                        background:
                            "linear-gradient(135deg, #FF7518 0%, #FFD166 55%, #9B5CFF 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        display: "inline",
                    }}
                >
                    A Thousand
                </span>
                <br />
                Spooky Stories.
            </h1>

            {/* Supporting line */}
            <p
                style={{
                    color: "#B5AEC8",
                    fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
                    lineHeight: 1.55,
                    marginBottom: "36px",
                    maxWidth: "480px",
                }}
            >
                Explore an interactive Halloween neighborhood — haunted streets, glowing
                pumpkins, and secrets hidden in the dark.
            </p>

            {/* Primary CTA with instantaneous visual response & atmospheric transition */}
            <button
                onClick={onEnterParty}
                disabled={isEntering}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "16px 40px",
                    borderRadius: "6px",
                    fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#000",
                    background: isEntering
                        ? "linear-gradient(135deg, #FFA022 0%, #FF7518 100%)"
                        : "linear-gradient(135deg, #FF7518 0%, #e86500 100%)",
                    border: "none",
                    cursor: isEntering ? "wait" : "pointer",
                    boxShadow: isEntering
                        ? "0 0 60px rgba(255,117,24,0.8), 0 0 100px rgba(255,117,24,0.4)"
                        : "0 0 40px rgba(255,117,24,0.45), 0 0 80px rgba(255,117,24,0.15), 0 4px 16px rgba(0,0,0,0.4)",
                    transform: isEntering ? "scale(1.04)" : "scale(1)",
                    transition: "transform 150ms ease, box-shadow 150ms ease, background 150ms ease",
                }}
                onMouseEnter={(e) => {
                    if (!isEntering) {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                        (e.currentTarget as HTMLElement).style.boxShadow =
                            "0 0 60px rgba(255,117,24,0.6), 0 0 100px rgba(255,117,24,0.2), 0 4px 24px rgba(0,0,0,0.5)";
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isEntering) {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                        (e.currentTarget as HTMLElement).style.boxShadow =
                            "0 0 40px rgba(255,117,24,0.45), 0 0 80px rgba(255,117,24,0.15), 0 4px 16px rgba(0,0,0,0.4)";
                    }
                }}
            >
                {isEntering ? (
                    <>
                        <span className="inline-block animate-spin" aria-hidden>🎃</span>
                        <span>Entering the Party...</span>
                    </>
                ) : (
                    <>
                        <span>Enter the Party</span>
                        <span aria-hidden>🎃</span>
                    </>
                )}
            </button>

            {/* Subtle scroll hint */}
            <p
                style={{
                    marginTop: "48px",
                    color: "#7A7296",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                }}
                aria-hidden
            >
                ↓ scroll to explore
            </p>
        </div>
    );
}

/** Cinematic fullscreen landing page */
export default function HomePageClient() {
    const router = useRouter();
    const [isEntering, setIsEntering] = useState(false);
    const [showTransitionOverlay, setShowTransitionOverlay] = useState(false);

    // Ensure transition state is clean when arriving or returning to homepage
    useEffect(() => {
        setIsEntering(false);
        setShowTransitionOverlay(false);
    }, []);

    const handleEnterParty = () => {
        if (isEntering) return;
        setIsEntering(true);

        const prefersReducedMotion =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            router.push("/explore");
            return;
        }

        // Trigger short atmospheric transition overlay
        setShowTransitionOverlay(true);
        setTimeout(() => {
            router.push("/explore");
            // Automatically clear overlay so returning via client routing restores the homepage immediately
            setTimeout(() => {
                setShowTransitionOverlay(false);
                setIsEntering(false);
            }, 600);
        }, 380);
    };

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                minHeight: "100dvh",
                overflowX: "hidden",
                backgroundColor: "#090811",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* 3D WebGL scene — full background */}
            <div
                style={{ position: "fixed", inset: 0, zIndex: 0 }}
                aria-hidden
            >
                <HeroSceneLoader />
            </div>

            {/* Layered subtle gradient overlay — allows the 3D moon, mansion & pumpkins to shine through */}
            <div
                aria-hidden
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 1,
                    background: `
            radial-gradient(ellipse 90% 60% at 50% 50%, rgba(9,8,17,0.12) 0%, rgba(9,8,17,0.48) 100%),
            linear-gradient(to bottom, rgba(9,8,17,0.35) 0%, transparent 35%, transparent 65%, rgba(9,8,17,0.7) 100%)
          `,
                    pointerEvents: "none",
                }}
            />

            {/* Top chrome — wordmark + sound toggle */}
            <header
                style={{
                    position: "relative",
                    zIndex: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 28px",
                    flexShrink: 0,
                }}
            >
                <Wordmark />
                <SoundToggle />
            </header>

            {/* Centered hero content — occupies initial viewport */}
            <main
                id="main-content"
                style={{
                    position: "relative",
                    zIndex: 20,
                    minHeight: "calc(100dvh - 80px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 20px 60px",
                }}
            >
                <HeroContent
                    isEntering={isEntering}
                    onEnterParty={handleEnterParty}
                />
            </main>

            {/* Heartfelt creator contribution section */}
            <ContributionSection />

            {/* Standard website footer */}
            <Footer />

            {/* Short atmospheric transition veil */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 100,
                    backgroundColor: "#090811",
                    opacity: showTransitionOverlay ? 1 : 0,
                    pointerEvents: showTransitionOverlay ? "all" : "none",
                    transition: "opacity 400ms ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        transform: showTransitionOverlay ? "scale(1)" : "scale(0.85)",
                        opacity: showTransitionOverlay ? 1 : 0,
                        transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "16px",
                    }}
                >
                    <span style={{ fontSize: "3rem" }} className="animate-bounce">🎃</span>
                    <span
                        style={{
                            fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            color: "#FF7518",
                            textTransform: "uppercase",
                        }}
                    >
                        Entering Maple Hollow...
                    </span>
                </div>
            </div>
        </div>
    );
}
