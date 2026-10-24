"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    useNeighborhoodStore,
    HOUSES,
    LANDMARKS,
    EDUCATIONAL_LOCATIONS,
    type TreatItem,
    type EducationalLocation,
} from "./interactions";
import EducationalIllustration from "./EducationalIllustrations";
import { neighborhoodAudio } from "./audio";
import {
    Volume2,
    VolumeX,
    HelpCircle,
    X,
    ShoppingBag,
    Sparkles,
    Check,
    Compass,
    BookOpen,
    ArrowRight,
    MapPin,
    ArrowLeft,
} from "lucide-react";

export default function NeighborhoodHUD() {
    const router = useRouter();
    const {
        visitedHouses,
        collectedTreats,
        visitedEducational,
        activeHouse,
        activeLandmark,
        activeEducational,
        closeModal,
        closeAllModals,
        nearPrompt,
        showInventory,
        toggleInventory,
        showHelp,
        toggleHelp,
        showControlsHint,
        dismissControlsHint,
        isSoundMuted,
        setSoundMuted,
        playerPos,
        playerHeading,
        setJoystickVector,
        setIsSprinting,
        isSprinting,
        requestJump,
        openEducationalLocation,
        setDestinationTarget,
        isSceneReady,
        welcomeMessage,
        dismissWelcome,
    } = useNeighborhoodStore();

    const [isMobile, setIsMobile] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [showMinimap, setShowMinimap] = useState(false);
    const [showEducationalIndex, setShowEducationalIndex] = useState(false);

    // Virtual joystick state
    const joystickBaseRef = useRef<HTMLDivElement>(null);
    const joystickKnobRef = useRef<HTMLDivElement>(null);
    const touchOrigin = useRef<{ x: number; y: number } | null>(null);

    // Primary action button ref for keyboard focus
    const returnButtonRef = useRef<HTMLButtonElement>(null);

    // Automatically dismiss the welcome message after 5 seconds
    useEffect(() => {
        if (welcomeMessage && isSceneReady) {
            const timer = setTimeout(() => {
                dismissWelcome();
            }, 5500);
            return () => clearTimeout(timer);
        }
    }, [welcomeMessage, isSceneReady, dismissWelcome]);

    // Listen for Escape key to close any active modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Escape") {
                closeAllModals();
                setShowEducationalIndex(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeAllModals]);

    // Focus primary action button when educational modal opens for keyboard accessibility
    useEffect(() => {
        if (activeEducational) {
            setTimeout(() => {
                returnButtonRef.current?.focus();
            }, 50);
        }
    }, [activeEducational]);

    useEffect(() => {
        const checkMobile = () => {
            const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
            setIsMobile(hasTouch || window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleSoundToggle = () => {
        const muted = neighborhoodAudio.toggleMute();
        setSoundMuted(muted);
    };

    const handleExitWorld = async (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        if (isExiting) return;
        setIsExiting(true);

        // Immediately pause movement and close interactive modals
        const store = useNeighborhoodStore.getState();
        store.closeAllModals();
        store.setDestinationTarget(null);
        store.setSceneReady(false);

        // Smoothly fade audio and release audio resources
        try {
            await neighborhoodAudio.fadeAndStop(220);
            neighborhoodAudio.dispose();
        } catch {
            // Audio shutdown fallback
        }

        // Return to homepage
        router.push("/");
    };

    // Touch joystick events
    const handleJoystickStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        touchOrigin.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleJoystickMove = (e: React.TouchEvent) => {
        if (!touchOrigin.current || !joystickKnobRef.current) return;
        const touch = e.touches[0];
        const maxRadius = 38;
        const dx = touch.clientX - touchOrigin.current.x;
        const dy = touch.clientY - touchOrigin.current.y;
        const dist = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);
        const clampedDist = Math.min(dist, maxRadius);

        const knobX = Math.cos(angle) * clampedDist;
        const knobY = Math.sin(angle) * clampedDist;

        joystickKnobRef.current.style.transform = `translate(${knobX}px, ${knobY}px)`;

        // Normalized vector (-1 to 1)
        setJoystickVector({
            x: knobX / maxRadius,
            y: knobY / maxRadius,
        });
    };

    const handleJoystickEnd = () => {
        touchOrigin.current = null;
        if (joystickKnobRef.current) {
            joystickKnobRef.current.style.transform = "translate(0px, 0px)";
        }
        setJoystickVector({ x: 0, y: 0 });
    };

    return (
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between overflow-hidden p-4 select-none">
            {/* ========================================================
                MINIMAL WORLD INTERFACE HEADER:
                - Small HalloweenVerse Wordmark
                - Exit World Button
                - Accessible Mute/Unmute & Compact Utilities
               ======================================================== */}
            <header className="flex w-full items-center justify-between gap-3">
                {/* Left: Wordmark & Exit World button */}
                <div className="pointer-events-auto flex items-center gap-2">
                    {/* Small HalloweenVerse Wordmark */}
                    <div className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-black/60 px-3.5 py-1.5 backdrop-blur-md">
                        <span className="text-base" aria-hidden>🎃</span>
                        <span className="font-display text-xs sm:text-sm font-bold tracking-tight text-white">
                            Halloween<span className="text-orange-500">Verse</span>
                        </span>
                    </div>

                    {/* Exit World Button (Returns to homepage) */}
                    <button
                        type="button"
                        onClick={handleExitWorld}
                        disabled={isExiting}
                        aria-label="Exit 3D World and return to homepage"
                        title="Return to homepage"
                        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs font-semibold text-gray-300 hover:text-white hover:border-white/30 backdrop-blur-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>{isExiting ? "Exiting..." : "Exit World"}</span>
                    </button>
                </div>

                {/* Right: Sound toggle, Lore counter, Treats sack & Minimap */}
                <div className="pointer-events-auto flex items-center gap-2">
                    {/* Compact Educational Lore Badge */}
                    <button
                        onClick={() => setShowEducationalIndex(!showEducationalIndex)}
                        aria-label="View Educational Locations Lore"
                        title="Explore 8 Educational Locations"
                        className="flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-black/60 px-3 py-1.5 text-xs font-semibold text-purple-300 backdrop-blur-md transition-all hover:scale-105 hover:border-purple-400 hover:bg-purple-500/10 active:scale-95"
                    >
                        <BookOpen className="h-3.5 w-3.5 text-purple-400" />
                        <span className="text-[11px] font-bold text-purple-200">
                            {visitedEducational.length}/{EDUCATIONAL_LOCATIONS.length}
                        </span>
                    </button>

                    {/* Compact Treats Inventory Button */}
                    <button
                        onClick={toggleInventory}
                        aria-label="Open Candy Bag"
                        title="View Collected Treats"
                        className="flex items-center gap-1.5 rounded-full border border-orange-500/40 bg-black/60 px-3 py-1.5 text-xs font-semibold text-orange-300 backdrop-blur-md transition-all hover:scale-105 hover:border-orange-400 hover:bg-orange-500/10 active:scale-95"
                    >
                        <ShoppingBag className="h-3.5 w-3.5 text-orange-400" />
                        <span className="text-[11px] font-bold text-orange-300">
                            {collectedTreats.length}/{HOUSES.length}
                        </span>
                    </button>

                    {/* Minimap toggle */}
                    <button
                        onClick={() => setShowMinimap(!showMinimap)}
                        aria-label="Toggle Minimap Radar"
                        title="Toggle Radar"
                        className={`flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md transition-all ${
                            showMinimap
                                ? "border-purple-500/60 bg-purple-950/40 text-purple-300"
                                : "border-white/10 bg-black/60 text-white/80 hover:text-white"
                        }`}
                    >
                        <Compass className="h-3.5 w-3.5" />
                    </button>

                    {/* Accessible Sound toggle (Sound disabled by default) */}
                    <button
                        onClick={handleSoundToggle}
                        aria-label={isSoundMuted ? "Unmute Halloween sound (Sound is disabled by default)" : "Mute sound"}
                        title={isSoundMuted ? "Enable atmospheric sound" : "Mute sound"}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md transition-all ${
                            isSoundMuted
                                ? "border-white/10 bg-black/60 text-gray-400 hover:text-white"
                                : "border-orange-500/50 bg-orange-500/20 text-orange-400 shadow-[0_0_12px_rgba(255,117,24,0.3)]"
                        }`}
                    >
                        {isSoundMuted ? (
                            <VolumeX className="h-3.5 w-3.5" />
                        ) : (
                            <Volume2 className="h-3.5 w-3.5" />
                        )}
                    </button>

                    {/* Help toggle */}
                    <button
                        onClick={toggleHelp}
                        aria-label="View Controls Help"
                        title="Controls Guide"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/80 backdrop-blur-md transition-all hover:border-white/30 hover:text-white"
                    >
                        <HelpCircle className="h-3.5 w-3.5" />
                    </button>
                </div>
            </header>

            {/* ========================================================
                WELCOME MESSAGE BANNER (Requirement 8)
                Appears upon entry when the camera reveal finishes
               ======================================================== */}
            {welcomeMessage && isSceneReady && (
                <div className="pointer-events-auto absolute top-14 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 rounded-full border border-orange-500/40 bg-[#0d091a]/90 px-5 py-2.5 text-xs text-orange-200 backdrop-blur-md shadow-2xl animate-fadeinup max-w-[92vw]">
                    <span className="text-amber-400 text-sm" aria-hidden>✨</span>
                    <span className="font-medium tracking-wide">
                        {welcomeMessage}
                    </span>
                    <button
                        onClick={dismissWelcome}
                        className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-gray-400 hover:text-white"
                        aria-label="Dismiss welcome message"
                        title="Dismiss"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            )}

            {/* ========================================================
                BRIEF CONTROL HINT (Requirement)
                Compact and dismissible, non-intrusive
               ======================================================== */}
            {showControlsHint && !welcomeMessage && (
                <div className="pointer-events-auto absolute top-14 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 rounded-full border border-purple-500/30 bg-black/80 px-4 py-1.5 text-xs text-gray-300 backdrop-blur-md shadow-xl animate-fadeinup max-w-[92vw]">
                    <span className="text-orange-400 font-semibold">Controls:</span>
                    <span className="hidden sm:inline">WASD to Move • Shift to Run • E to Interact • Click to Walk</span>
                    <span className="sm:hidden">Joystick to Move • Tap Interact</span>
                    <button
                        onClick={dismissControlsHint}
                        className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-gray-400 hover:text-white"
                        aria-label="Dismiss controls hint"
                        title="Dismiss"
                    >
                        <X className="h-2.5 w-2.5" />
                    </button>
                </div>
            )}

            {/* ========================================================
                MINIMAP (OPTIONAL COMPASS RADAR)
               ======================================================== */}
            {showMinimap && (
                <div className="pointer-events-auto absolute top-14 right-4 hidden sm:flex flex-col items-center rounded-2xl border border-purple-500/30 bg-[#0d091a]/85 p-2.5 backdrop-blur-lg shadow-2xl">
                    <div className="mb-1.5 flex w-full items-center justify-between px-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                            Radar Map
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] text-purple-400 font-medium">
                                Lore {visitedEducational.length}/8
                            </span>
                            <span className="text-[10px] text-gray-400">N ↑</span>
                        </div>
                    </div>

                    {/* Minimap Canvas representation */}
                    <div className="relative h-44 w-36 overflow-hidden rounded-xl border border-white/10 bg-[#06040c]">
                        {/* Park Area Top (Z < -34) */}
                        <div className="absolute top-1 left-2 right-2 h-7 rounded border border-emerald-500/20 bg-emerald-950/30 flex items-center justify-center">
                            <span className="text-[9px] text-emerald-400">Park</span>
                        </div>

                        {/* Central Street */}
                        <div className="absolute top-8 bottom-2 left-1/2 w-4 -translate-x-1/2 bg-[#1b1726] border-x border-dashed border-orange-500/20" />

                        {/* Central Party Bonfire Plaza */}
                        <div className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/40 bg-orange-950/60 flex items-center justify-center">
                            <span className="text-[8px]">🔥</span>
                        </div>

                        {/* 8 Houses Markers */}
                        {HOUSES.map((h) => {
                            const isWest = h.doorPos[0] < 0;
                            const normZ = (h.doorPos[2] + 32) / 64;
                            const topPercent = Math.max(14, Math.min(86, normZ * 100));
                            const isVisited = visitedHouses.includes(h.id);

                            return (
                                <div
                                    key={`map_${h.id}`}
                                    title={h.name}
                                    style={{
                                        top: `${topPercent}%`,
                                        left: isWest ? "12%" : "88%",
                                        transform: "translate(-50%, -50%)",
                                    }}
                                    className={`absolute flex h-3.5 w-3.5 items-center justify-center rounded-sm text-[8px] font-bold ${
                                        isVisited
                                            ? "border border-green-400 bg-green-500/40 text-green-300"
                                            : "border border-orange-400/60 bg-orange-500/30 text-orange-300"
                                    }`}
                                >
                                    {isVisited ? "✓" : "🏠"}
                                </div>
                            );
                        })}

                        {/* 8 Educational Location Markers */}
                        {EDUCATIONAL_LOCATIONS.map((loc) => {
                            const mapX = 50 + (loc.position[0] / 24) * 40;
                            const mapY = 50 + (loc.position[2] / 40) * 42;
                            const isVisited = visitedEducational.includes(loc.id);

                            return (
                                <button
                                    key={`map_edu_${loc.id}`}
                                    onClick={() => {
                                        setDestinationTarget([loc.position[0], loc.position[2]], () => {
                                            openEducationalLocation(loc);
                                        });
                                    }}
                                    title={`Location ${loc.number}: ${loc.title}`}
                                    style={{
                                        top: `${Math.max(6, Math.min(94, mapY))}%`,
                                        left: `${Math.max(6, Math.min(94, mapX))}%`,
                                        transform: "translate(-50%, -50%)",
                                        borderColor: loc.accentColor,
                                    }}
                                    className={`absolute flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold shadow-md transition-transform hover:scale-125 ${
                                        isVisited
                                            ? "border border-green-400 bg-green-500/80 text-white"
                                            : "border bg-black/90 text-amber-200"
                                    }`}
                                >
                                    {isVisited ? "✓" : loc.number}
                                </button>
                            );
                        })}

                        {/* Player Blip */}
                        {(() => {
                            const mapX = 50 + (playerPos[0] / 24) * 40;
                            const mapY = 50 + (playerPos[2] / 40) * 42;
                            return (
                                <div
                                    style={{
                                        top: `${Math.max(5, Math.min(95, mapY))}%`,
                                        left: `${Math.max(5, Math.min(95, mapX))}%`,
                                        transform: `translate(-50%, -50%) rotate(${playerHeading + Math.PI}rad)`,
                                    }}
                                    className="absolute flex h-3.5 w-3.5 items-center justify-center pointer-events-none"
                                >
                                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
                                    <div className="absolute -top-1 h-2 w-0.5 bg-white" />
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}

            {/* Subtle, non-intrusive interaction prompt positioned neatly above footer (does not block player) */}
            <div className="pointer-events-none fixed bottom-16 left-0 right-0 z-30 flex flex-col items-center">
                {nearPrompt && (
                    <div className="pointer-events-auto flex flex-col items-center transition-all duration-200">
                        <button
                            onClick={nearPrompt.onTrigger}
                            style={{
                                borderColor: nearPrompt.accentColor || "#FF7518",
                                boxShadow: `0 0 20px ${nearPrompt.accentColor || "rgba(255,117,24,0.45)"}`,
                            }}
                            className="group flex items-center gap-2 rounded-full border bg-black/85 backdrop-blur-md px-4 py-2 font-display text-xs sm:text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
                        >
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/20 text-[11px] font-bold text-orange-400 border border-orange-500/40">
                                E
                            </span>
                            <span className="tracking-wide text-white drop-shadow">
                                {nearPrompt.label}
                            </span>
                            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                        </button>
                        {nearPrompt.sublabel && (
                            <span className="mt-1 rounded-full bg-black/70 px-2.5 py-0.5 text-[10px] font-medium text-orange-200/90 backdrop-blur-sm shadow">
                                {nearPrompt.sublabel}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Smooth Exit Transition Overlay */}
            {isExiting && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090811] pointer-events-auto transition-opacity duration-300">
                    <div className="flex flex-col items-center gap-3 animate-pulse">
                        <span className="text-3xl">🎃</span>
                        <span className="font-display text-xs sm:text-sm font-bold tracking-widest text-orange-400 uppercase">
                            Returning to HalloweenVerse...
                        </span>
                    </div>
                </div>
            )}

            {/* ========================================================
                BOTTOM CONTROLS BAR: Keyboard hints (desktop) or Touch Joystick (mobile)
               ======================================================== */}
            <footer className="relative flex w-full items-end justify-between">
                {/* Desktop controls reminder centered */}
                <div className="pointer-events-auto hidden md:flex items-center gap-3 rounded-full border border-white/10 bg-black/70 px-4 py-1.5 text-xs text-gray-300 backdrop-blur-md mx-auto shadow-lg">
                    <span className="flex items-center gap-1 font-medium">
                        <kbd className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-[10px] text-white">
                            WASD
                        </kbd>{" "}
                        Move
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                        <kbd className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-[10px] text-white">
                            SHIFT
                        </kbd>{" "}
                        Sprint
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                        <kbd className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-[10px] text-white">
                            E
                        </kbd>{" "}
                        Interact
                    </span>
                    <span className="text-gray-400">🖱 Drag to look • Click to walk</span>
                </div>

                {/* Mobile Virtual Joystick */}
                {isMobile && (
                    <div
                        ref={joystickBaseRef}
                        onTouchStart={handleJoystickStart}
                        onTouchMove={handleJoystickMove}
                        onTouchEnd={handleJoystickEnd}
                        className="pointer-events-auto relative flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md"
                    >
                        <div
                            ref={joystickKnobRef}
                            className="h-12 w-12 rounded-full border border-orange-500/80 bg-orange-500/40 shadow-lg transition-transform"
                        />
                    </div>
                )}

                {/* Mobile Action Buttons */}
                {isMobile && (
                    <div className="pointer-events-auto flex items-center gap-2">
                        <button
                            onTouchStart={() => {
                                if (nearPrompt) {
                                    nearPrompt.onTrigger();
                                }
                            }}
                            className={`flex h-11 px-3 items-center justify-center rounded-full border font-display text-xs font-bold transition-all ${
                                nearPrompt
                                    ? "border-orange-500 bg-orange-600 text-white shadow-[0_0_15px_#FF7518] animate-pulse"
                                    : "border-white/20 bg-black/50 text-gray-400"
                            }`}
                        >
                            INTERACT
                        </button>
                        <button
                            onTouchStart={() => setIsSprinting(!isSprinting)}
                            className={`flex h-11 w-11 items-center justify-center rounded-full border font-display text-xs font-bold ${
                                isSprinting
                                    ? "border-orange-500 bg-orange-600 text-white"
                                    : "border-white/20 bg-black/50 text-gray-300"
                            }`}
                        >
                            RUN
                        </button>
                        <button
                            onTouchStart={requestJump}
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-500 bg-purple-600/80 font-display text-xs font-bold text-white shadow-lg active:scale-95"
                        >
                            JUMP
                        </button>
                    </div>
                )}
            </footer>

            {/* ========================================================
                EDUCATIONAL LOCATION INFORMATION PANEL
                With close button (X), Return to Exploration, Facts & Cultural Context
               ======================================================== */}
            {activeEducational && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="edu-heading"
                    className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeinup"
                >
                    <div
                        style={{ borderColor: `${activeEducational.accentColor}80` }}
                        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border bg-[#110c1f] shadow-[0_0_60px_rgba(0,0,0,0.85)]"
                    >
                        {/* Header bar */}
                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-2xl shadow-inner">
                                    {activeEducational.badgeEmoji}
                                </span>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2
                                            style={{ color: activeEducational.accentColor }}
                                            className="font-display text-base font-bold tracking-wide"
                                        >
                                            {activeEducational.title}
                                        </h2>
                                        <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-gray-300">
                                            Location {activeEducational.number} of {EDUCATIONAL_LOCATIONS.length}
                                        </span>
                                    </div>
                                    <p className="text-xs text-purple-300/80">
                                        {activeEducational.category} • {activeEducational.tagline}
                                    </p>
                                </div>
                            </div>

                            {/* Close button for educational panels (Requirement) */}
                            <button
                                onClick={closeModal}
                                aria-label="Close information panel"
                                title="Close (Escape)"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gray-300 transition-colors hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Scrollable Body Content */}
                        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                            {/* Visual Illustration */}
                            <EducationalIllustration
                                type={activeEducational.illustrationType}
                                accentColor={activeEducational.accentColor}
                            />

                            {/* Heading & Subtitle */}
                            <div>
                                <h1
                                    id="edu-heading"
                                    className="font-display text-2xl font-bold tracking-tight text-white"
                                >
                                    {activeEducational.heading}
                                </h1>
                                <p className="mt-1 text-sm font-medium text-amber-300">
                                    {activeEducational.subtitle}
                                </p>
                            </div>

                            {/* Concise Explanation Paragraphs */}
                            <div className="space-y-3 text-sm leading-relaxed text-gray-200">
                                {activeEducational.explanation.map((para, idx) => (
                                    <p key={idx} className="leading-relaxed">
                                        {para}
                                    </p>
                                ))}
                            </div>

                            {/* Did You Know / Verified Historical Facts */}
                            <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                                <h3 className="mb-3 flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-amber-400">
                                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                                    Curious Historical Facts
                                </h3>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {activeEducational.facts.map((fact, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-white/[0.03] p-3"
                                        >
                                            <span className="text-xl flex-shrink-0">{fact.icon || "💡"}</span>
                                            <div>
                                                <h4 className="font-display text-xs font-bold text-gray-200">
                                                    {fact.title}
                                                </h4>
                                                <p className="mt-1 text-xs leading-relaxed text-gray-400">
                                                    {fact.text}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cultural Context & Global Perspectives */}
                            {activeEducational.culturalContext && (
                                <div className="rounded-xl border border-sky-500/20 bg-sky-950/20 p-3.5 flex items-start gap-3">
                                    <span className="text-xl flex-shrink-0">🌐</span>
                                    <div>
                                        <h4 className="font-display text-xs font-bold text-sky-300">
                                            Cultural Nuance & Global Context
                                        </h4>
                                        <p className="mt-1 text-xs leading-relaxed text-sky-200/80">
                                            {activeEducational.culturalContext}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer with return to exploration button */}
                        <div className="flex items-center justify-between border-t border-white/10 bg-black/50 px-6 py-4">
                            <span className="text-xs text-gray-400">
                                Press <kbd className="rounded border border-white/20 bg-white/10 px-1 py-0.5 text-[10px] text-white">Esc</kbd> to return
                            </span>
                            <button
                                ref={returnButtonRef}
                                onClick={closeModal}
                                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-2.5 font-display text-sm font-bold text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,117,24,0.4)] focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                Return to Exploration 🎃
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================
                EDUCATIONAL LOCATIONS OVERVIEW FIELD GUIDE DRAWER
               ======================================================== */}
            {showEducationalIndex && (
                <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeinup">
                    <div className="relative flex max-h-[88vh] w-full max-w-2xl flex-col rounded-2xl border border-purple-500/40 bg-[#120d20] p-6 shadow-2xl">
                        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                            <div className="flex items-center gap-2.5">
                                <span className="text-2xl">📚</span>
                                <div>
                                    <h2 className="font-display text-lg font-bold text-purple-300">
                                        Neighborhood Lore & Educational Locations
                                    </h2>
                                    <span className="text-xs text-gray-400">
                                        {visitedEducational.length} of {EDUCATIONAL_LOCATIONS.length} Topics Discovered
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowEducationalIndex(false)}
                                aria-label="Close Educational Guide"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gray-400 hover:text-white"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* List of 8 Educational Locations */}
                        <div className="grid flex-1 gap-3 overflow-y-auto pr-1">
                            {EDUCATIONAL_LOCATIONS.map((loc) => {
                                const isVisited = visitedEducational.includes(loc.id);

                                return (
                                    <div
                                        key={loc.id}
                                        className={`flex items-start justify-between gap-4 rounded-xl border p-4 transition-all ${
                                            isVisited
                                                ? "border-purple-500/30 bg-purple-950/20"
                                                : "border-white/10 bg-white/[0.02]"
                                        }`}
                                    >
                                        <div className="flex items-start gap-3.5">
                                            <div
                                                style={{ borderColor: loc.accentColor }}
                                                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-2xl border ${
                                                    isVisited ? "bg-purple-500/20" : "bg-white/5"
                                                }`}
                                            >
                                                {loc.badgeEmoji}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-display text-sm font-bold text-white">
                                                        {loc.number}. {loc.title}
                                                    </h3>
                                                    {isVisited && (
                                                        <span className="flex items-center gap-1 text-[11px] font-semibold text-green-400">
                                                            <Check className="h-3 w-3" /> Discovered
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-purple-300/70">
                                                    Topic: {loc.topic}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-300">
                                                    {loc.tagline}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2 items-end flex-shrink-0">
                                            <button
                                                onClick={() => {
                                                    setShowEducationalIndex(false);
                                                    openEducationalLocation(loc);
                                                }}
                                                style={{ color: loc.accentColor }}
                                                className="flex items-center gap-1 text-xs font-bold hover:underline"
                                            >
                                                Read Lore <ArrowRight className="h-3 w-3" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowEducationalIndex(false);
                                                    setDestinationTarget([loc.position[0], loc.position[2]], () => {
                                                        openEducationalLocation(loc);
                                                    });
                                                }}
                                                className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-white"
                                            >
                                                <MapPin className="h-3 w-3" /> Walk There
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================
                HOUSE DIALOGUE & TREAT MODAL
               ======================================================== */}
            {activeHouse && (
                <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-fadeinup">
                    <div
                        style={{ borderColor: activeHouse.accentColor }}
                        className="relative w-full max-w-lg rounded-2xl border bg-[#110c1f] p-6 shadow-2xl"
                    >
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            aria-label="Close"
                            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gray-400 hover:text-white"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        {/* House Header */}
                        <div className="mb-4 flex items-center gap-3.5">
                            <span className="text-3xl">{activeHouse.treat.emoji}</span>
                            <div>
                                <h2
                                    style={{ color: activeHouse.accentColor }}
                                    className="font-display text-xl font-bold tracking-tight"
                                >
                                    {activeHouse.name}
                                </h2>
                                <p className="text-xs text-gray-400">
                                    Resident:{" "}
                                    <span className="font-semibold text-gray-200">
                                        {activeHouse.resident}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Tagline */}
                        <p className="mb-4 text-xs italic text-purple-300/80">
                            "{activeHouse.tagline}"
                        </p>

                        {/* Resident Dialogue Speech Bubble */}
                        <div className="mb-5 rounded-xl border border-white/10 bg-black/40 p-4">
                            <div className="flex flex-col gap-2">
                                {activeHouse.dialogue.map((line, idx) => (
                                    <p
                                        key={idx}
                                        className="text-sm leading-relaxed text-gray-200"
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Treat Unlocked Banner */}
                        <div className="mb-6 flex items-center gap-3.5 rounded-xl border border-orange-500/40 bg-orange-950/30 p-3.5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20 text-2xl">
                                {activeHouse.treat.emoji}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-display text-sm font-bold text-orange-400">
                                        {activeHouse.treat.name}
                                    </span>
                                    <span className="rounded bg-orange-500/30 px-1.5 py-0.2 text-[10px] font-semibold text-orange-300">
                                        Treat Acquired!
                                    </span>
                                </div>
                                <p className="text-xs text-gray-300">
                                    {activeHouse.treat.description}
                                </p>
                            </div>
                        </div>

                        {/* Action Continue */}
                        <button
                            onClick={closeModal}
                            className="w-full rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 py-3 font-display text-sm font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Pocket Treat & Continue Exploring 🎃
                        </button>
                    </div>
                </div>
            )}

            {/* ========================================================
                LANDMARK INTERACTION MODAL (Bonfire, DJ, Fountain, Willow)
               ======================================================== */}
            {activeLandmark && (
                <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-fadeinup">
                    <div className="relative w-full max-w-md rounded-2xl border border-purple-500/40 bg-[#110c1f] p-6 shadow-2xl">
                        <button
                            onClick={closeModal}
                            aria-label="Close"
                            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gray-400 hover:text-white"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="mb-3 flex items-center gap-3">
                            <span className="text-3xl">
                                {activeLandmark.type === "bonfire"
                                    ? "🔥"
                                    : activeLandmark.type === "dj"
                                    ? "💀"
                                    : activeLandmark.type === "fountain"
                                    ? "⛲"
                                    : activeLandmark.type === "tree"
                                    ? "🌳"
                                    : "⚰️"}
                            </span>
                            <h2 className="font-display text-xl font-bold text-purple-300">
                                {activeLandmark.title}
                            </h2>
                        </div>

                        <p className="mb-6 text-sm leading-relaxed text-gray-300">
                            {activeLandmark.description}
                        </p>

                        <button
                            onClick={closeModal}
                            className="w-full rounded-xl bg-purple-600 py-2.5 font-display text-sm font-bold text-white transition-all hover:bg-purple-500"
                        >
                            Return to Neighborhood
                        </button>
                    </div>
                </div>
            )}

            {/* ========================================================
                TREATS INVENTORY SACK MODAL
               ======================================================== */}
            {showInventory && (
                <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeinup">
                    <div className="relative flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl border border-orange-500/40 bg-[#120d20] p-6 shadow-2xl">
                        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                            <div className="flex items-center gap-2.5">
                                <span className="text-2xl">🎃</span>
                                <div>
                                    <h2 className="font-display text-lg font-bold text-orange-400">
                                        Trick-or-Treat Candy Sack
                                    </h2>
                                    <span className="text-xs text-gray-400">
                                        {collectedTreats.length} of {HOUSES.length} Neighborhood Treats Collected
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={toggleInventory}
                                aria-label="Close Sack"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gray-400 hover:text-white"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* All 8 Treats Grid */}
                        <div className="grid flex-1 gap-3 overflow-y-auto pr-1">
                            {HOUSES.map((house) => {
                                const treat = house.treat;
                                const isCollected = collectedTreats.some(
                                    (t) => t.id === treat.id
                                );

                                return (
                                    <div
                                        key={treat.id}
                                        className={`flex items-start gap-3.5 rounded-xl border p-3.5 transition-all ${
                                            isCollected
                                                ? "border-orange-500/30 bg-orange-950/20"
                                                : "border-white/5 bg-white/[0.02] opacity-50"
                                        }`}
                                    >
                                        <div
                                            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-2xl ${
                                                isCollected
                                                    ? "bg-orange-500/20"
                                                    : "bg-white/5 grayscale"
                                            }`}
                                        >
                                            {isCollected ? treat.emoji : "❓"}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-display text-sm font-bold text-white">
                                                    {isCollected ? treat.name : "Locked Treat"}
                                                </h3>
                                                {isCollected && (
                                                    <span className="flex items-center gap-1 text-[11px] font-semibold text-green-400">
                                                        <Check className="h-3 w-3" /> Collected
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-purple-300/70">
                                                From: {house.name}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-300">
                                                {isCollected
                                                    ? treat.description
                                                    : "Knock on this doorstep to receive their spooky treat!"}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================
                HELP & CONTROLS MODAL
               ======================================================== */}
            {showHelp && (
                <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeinup">
                    <div className="relative w-full max-w-md rounded-2xl border border-purple-500/40 bg-[#120d20] p-6 shadow-2xl">
                        <button
                            onClick={toggleHelp}
                            aria-label="Close Help"
                            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gray-400 hover:text-white"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <h2 className="mb-1 font-display text-lg font-bold text-purple-300">
                            Explorer's Field Guide
                        </h2>
                        <p className="mb-4 text-xs text-gray-400">
                            How to navigate and experience the HalloweenVerse 3D neighborhood.
                        </p>

                        <div className="flex flex-col gap-3 text-xs text-gray-200">
                            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-2.5">
                                <span className="font-semibold text-orange-400">Move Around</span>
                                <span>WASD / Arrow Keys or Virtual Joystick</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-2.5">
                                <span className="font-semibold text-orange-400">Sprint</span>
                                <span>Hold SHIFT key or tap RUN</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-2.5">
                                <span className="font-semibold text-orange-400">Hop / Jump</span>
                                <span>SPACE key or tap JUMP</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-2.5">
                                <span className="font-semibold text-orange-400">Interact</span>
                                <span>Press [E] or tap prompt near waypoints and doors</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-2.5">
                                <span className="font-semibold text-orange-400">Rotate Camera</span>
                                <span>Click & Drag with mouse or swipe screen</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-2.5">
                                <span className="font-semibold text-orange-400">Exit World</span>
                                <span>Click "Exit World" top-left to return to home</span>
                            </div>
                        </div>

                        <button
                            onClick={toggleHelp}
                            className="mt-5 w-full rounded-xl bg-orange-600 py-2.5 font-display text-sm font-bold text-white transition-all hover:bg-orange-500"
                        >
                            Got It, Let's Explore! 🎃
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
