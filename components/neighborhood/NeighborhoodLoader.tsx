"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Lazy-load the interactive 3D neighborhood with no SSR
const NeighborhoodWorld = dynamic(() => import("./NeighborhoodWorld"), {
    ssr: false,
    loading: () => <NeighborhoodLoadingScreen />,
});

/**
 * Atmospheric loading screen matching the night Halloween palette
 */
function NeighborhoodLoadingScreen() {
    return (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-gradient-to-b from-[#090811] via-[#0f0b1e] to-[#1a1040]">
            <div className="flex flex-col items-center gap-4">
                {/* Glowing pumpkin loader */}
                <div className="relative flex h-16 w-16 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
                    <span className="text-2xl animate-pulse">🎃</span>
                </div>

                <div className="text-center">
                    <h2 className="font-display text-lg font-bold tracking-wide text-white">
                        Entering Maple Hollow...
                    </h2>
                    <p className="mt-1 text-xs text-purple-300/70">
                        Lighting streetlights & carving jack-o'-lanterns
                    </p>
                </div>
            </div>
        </div>
    );
}

/** Static fallback if WebGL is unavailable */
function WebGLFallback() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center bg-[#090811]">
            <span className="text-4xl mb-4">🕸️</span>
            <h2 className="font-display text-xl font-bold text-white mb-2">
                WebGL Required for 3D Exploration
            </h2>
            <p className="max-w-md text-sm text-gray-400 mb-6">
                Your browser or device does not have hardware-accelerated WebGL enabled.
                Please ensure hardware acceleration is turned on in your browser settings.
            </p>
            <a
                href="/"
                className="rounded-xl bg-orange-600 px-6 py-2.5 font-display text-sm font-bold text-white transition-all hover:bg-orange-500"
            >
                Return to Home
            </a>
        </div>
    );
}

function checkWebGL(): boolean {
    if (typeof window === "undefined") return false;
    try {
        const canvas = document.createElement("canvas");
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext("webgl") || canvas.getContext("experimental-webgl") || canvas.getContext("webgl2"))
        );
    } catch {
        return false;
    }
}

export default function NeighborhoodLoader() {
    const [hasSupport, setHasSupport] = useState<boolean | null>(null);

    useEffect(() => {
        setHasSupport(checkWebGL());
    }, []);

    if (hasSupport === null) return <NeighborhoodLoadingScreen />;
    if (!hasSupport) return <WebGLFallback />;

    return <NeighborhoodWorld />;
}
