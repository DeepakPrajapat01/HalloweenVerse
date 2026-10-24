"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log to console in development; swap for an error-reporting service in production
        console.error("[HalloweenVerse] Unhandled error:", error);
    }, [error]);

    return (
        <div
            className="flex flex-col items-center justify-center flex-1 px-6 py-24 text-center"
            style={{ minHeight: "60dvh" }}
        >
            <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(248,113,113,0.12)", border: "1px solid rgba(248,113,113,0.25)" }}
            >
                <AlertTriangle size={36} style={{ color: "var(--color-error)" }} aria-hidden />
            </div>

            <h1
                className="font-bold mb-3"
                style={{
                    fontSize: "var(--text-2xl)",
                    fontFamily: "var(--font-space-grotesk)",
                    color: "var(--color-text)",
                }}
            >
                Something went bump in the night.
            </h1>
            <p className="mb-8 max-w-sm" style={{ color: "var(--color-text-muted)" }}>
                An unexpected error occurred. Try refreshing — the ghosts are usually harmless.
            </p>

            {process.env.NODE_ENV === "development" && error.message && (
                <pre
                    className="mb-8 p-4 rounded-lg text-xs text-left max-w-md overflow-x-auto"
                    style={{
                        backgroundColor: "rgba(248,113,113,0.08)",
                        border: "1px solid rgba(248,113,113,0.2)",
                        color: "var(--color-error)",
                    }}
                >
                    {error.message}
                </pre>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm transition-all duration-150 hover:scale-105"
                    style={{
                        backgroundColor: "var(--color-orange)",
                        color: "#000",
                        fontFamily: "var(--font-space-grotesk)",
                    }}
                >
                    <RefreshCcw size={16} aria-hidden />
                    Try again
                </button>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm"
                    style={{ color: "var(--color-text-muted)", border: "1px solid var(--color-border)" }}
                >
                    Return home
                </Link>
            </div>
        </div>
    );
}
