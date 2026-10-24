import Link from "next/link";
import { Ghost, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div
            className="flex flex-col items-center justify-center flex-1 px-6 py-24 text-center"
            style={{ minHeight: "60dvh" }}
        >
            {/* Decorative glow behind icon */}
            <div className="relative mb-8">
                <div
                    aria-hidden
                    className="absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse-glow"
                    style={{ background: "radial-gradient(circle, var(--color-purple), transparent)", transform: "scale(2)" }}
                />
                <div
                    className="relative w-24 h-24 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(155,92,255,0.12)", border: "1px solid rgba(155,92,255,0.25)" }}
                >
                    <Ghost size={40} style={{ color: "var(--color-purple)" }} aria-hidden />
                </div>
            </div>

            {/* 404 number */}
            <p
                aria-hidden
                className="font-black mb-2 leading-none opacity-10 select-none"
                style={{ fontSize: "clamp(6rem,20vw,12rem)", fontFamily: "var(--font-space-grotesk)", color: "var(--color-purple)" }}
            >
                404
            </p>

            <h1
                className="font-bold mb-3 -mt-12"
                style={{
                    fontSize: "var(--text-2xl)",
                    fontFamily: "var(--font-space-grotesk)",
                    color: "var(--color-text)",
                }}
            >
                This zone doesn&apos;t exist... yet.
            </h1>
            <p className="mb-8 max-w-sm" style={{ color: "var(--color-text-muted)" }}>
                The ghost that lives here couldn&apos;t find what you were looking for. Let&apos;s get you back to safety.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm transition-all duration-150 hover:scale-105"
                    style={{
                        backgroundColor: "var(--color-orange)",
                        color: "#000",
                        fontFamily: "var(--font-space-grotesk)",
                    }}
                >
                    <Home size={16} aria-hidden />
                    Back to HalloweenVerse
                </Link>
                <Link
                    href="/explore"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm transition-all duration-150"
                    style={{
                        color: "var(--color-text-muted)",
                        border: "1px solid var(--color-border)",
                    }}
                >
                    <ArrowLeft size={16} aria-hidden />
                    Explore instead
                </Link>
            </div>
        </div>
    );
}
