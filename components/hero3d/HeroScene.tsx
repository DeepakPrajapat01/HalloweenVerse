"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion, useIsMobile } from "@/src/lib/hooks";
import { LOCATIONS, type WorldLocation } from "@/src/data/locations";
import { useWorldStore } from "@/src/lib/store";
import Lighting from "./Lighting";
import Sky from "./Sky";
import Moon from "./Moon";
import Ground from "./Ground";
import Mansion from "./Mansion";
import Trees from "./Trees";
import Pumpkins from "./Pumpkins";
import Bats from "./Bats";
import Particles from "./Particles";
import InteractiveZone from "./InteractiveZone";

// Target camera state — lerped toward each frame
const DEFAULT_CAM_POS = new THREE.Vector3(0, 3, 8);
const DEFAULT_CAM_TARGET = new THREE.Vector3(0, 2, -8);

/** Pointer-following + zone-transitioning camera rig */
function CameraRig({
    disabled,
}: {
    disabled: boolean;
    isMobile: boolean;
}) {
    const { camera } = useThree();
    const pointer = useRef(new THREE.Vector2(0, 0));
    const currentPointer = useRef(new THREE.Vector2(0, 0));
    const activeCamTarget = useRef(DEFAULT_CAM_TARGET.clone());
    const activeCamPos = useRef(DEFAULT_CAM_POS.clone());
    const { activeZone } = useWorldStore();

    useFrame(({ pointer: p }) => {
        // Determine target camera position
        const zone = activeZone
            ? LOCATIONS.find((l) => l.id === activeZone)
            : null;

        const targetPos = zone
            ? new THREE.Vector3(
                zone.cameraTarget[0],
                zone.cameraTarget[1] + 3,
                zone.cameraTarget[2] + 6
            )
            : DEFAULT_CAM_POS;

        const targetLook = zone
            ? new THREE.Vector3(...zone.cameraTarget)
            : DEFAULT_CAM_TARGET;

        activeCamPos.current.lerp(targetPos, 0.035);
        activeCamTarget.current.lerp(targetLook, 0.035);

        camera.position.copy(activeCamPos.current);

        // Subtle pointer-drift when no zone is active
        if (!disabled && !zone) {
            pointer.current.set(p.x * 0.8, p.y * 0.4);
            currentPointer.current.lerp(pointer.current, 0.02);
            camera.position.x += currentPointer.current.x;
            camera.position.y += currentPointer.current.y * 0.5;
        }

        camera.lookAt(activeCamTarget.current);
    });

    return null;
}

/**
 * 60FPS Screen-space position tracker.
 * Projects 3D beacon positions into 2D screen space coordinates
 * and smoothly updates the DOM label elements without triggering React rerenders.
 */
function ZonePositionTracker({
    labelsRef,
}: {
    labelsRef: React.RefObject<Map<string, HTMLDivElement>>;
}) {
    const { camera, size } = useThree();
    const vec = useRef(new THREE.Vector3());

    useFrame(() => {
        const elements = labelsRef.current;
        if (!elements) return;

        LOCATIONS.forEach((loc) => {
            const el = elements.get(loc.id);
            if (!el) return;

            // Position label right above the beacon
            vec.current.set(
                loc.scenePosition[0],
                loc.scenePosition[1] + 1.25,
                loc.scenePosition[2]
            );
            vec.current.project(camera);

            // Clip if behind the camera
            if (vec.current.z > 1.0) {
                el.style.opacity = "0";
                el.style.pointerEvents = "none";
                return;
            }

            const x = (vec.current.x * 0.5 + 0.5) * size.width;
            const y = (-vec.current.y * 0.5 + 0.5) * size.height;

            el.style.opacity = "1";
            el.style.pointerEvents = "auto";
            el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -100%)`;
        });
    });

    return null;
}

function SceneContent({
    reducedMotion,
    isMobile,
    labelsRef,
}: {
    reducedMotion: boolean;
    isMobile: boolean;
    labelsRef: React.RefObject<Map<string, HTMLDivElement>>;
}) {
    const { activeZone, setActiveZone } = useWorldStore();
    const particleCount = isMobile ? 60 : 180;

    return (
        <>
            <CameraRig disabled={reducedMotion} isMobile={isMobile} />
            <ZonePositionTracker labelsRef={labelsRef} />
            <Lighting />
            <Sky />
            <Moon />
            <Ground />
            <Mansion />
            <Trees />
            <Pumpkins />
            <Bats count={isMobile ? 3 : 6} />
            <Particles count={particleCount} disabled={reducedMotion} />

            {/* Interactive 3D zone markers (pure WebGL) */}
            {LOCATIONS.map((loc) => (
                <InteractiveZone
                    key={loc.id}
                    location={loc}
                    isActive={activeZone === loc.id}
                    onSelect={(id) =>
                        setActiveZone(activeZone === id ? null : id)
                    }
                    isMobile={isMobile}
                />
            ))}
        </>
    );
}

/**
 * Accessible HTML labels overlay managed directly by React DOM.
 * Completely eliminates independently managed createRoot instances,
 * preventing any React 19 synchronous unmount race conditions.
 */
function HeroZoneOverlay({
    labelsRef,
}: {
    labelsRef: React.RefObject<Map<string, HTMLDivElement>>;
}) {
    const { activeZone, setActiveZone } = useWorldStore();

    return (
        <div
            aria-label="Interactive World Zones"
            style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 6,
                overflow: "hidden",
            }}
        >
            {LOCATIONS.map((loc: WorldLocation) => {
                const isActive = activeZone === loc.id;
                return (
                    <div
                        key={loc.id}
                        ref={(el) => {
                            if (el) labelsRef.current.set(loc.id, el);
                            else labelsRef.current.delete(loc.id);
                        }}
                        id={`hero-zone-${loc.id}`}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            willChange: "transform, opacity",
                            transform: "translate3d(-9999px, -9999px, 0)",
                            transition: "opacity 200ms ease",
                            pointerEvents: "auto",
                        }}
                    >
                        <button
                            type="button"
                            onClick={() =>
                                setActiveZone(activeZone === loc.id ? null : loc.id)
                            }
                            aria-label={`Select ${loc.name} destination`}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                background: isActive
                                    ? `${loc.color}33`
                                    : "rgba(9,8,17,0.78)",
                                border: `1px solid ${isActive ? loc.color : "rgba(255,255,255,0.18)"}`,
                                borderRadius: "9999px",
                                padding: "4px 12px",
                                color: isActive ? loc.color : "#DDD5F0",
                                fontSize: "11px",
                                fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                                fontWeight: 600,
                                letterSpacing: "0.04em",
                                whiteSpace: "nowrap",
                                cursor: "pointer",
                                backdropFilter: "blur(8px)",
                                boxShadow: isActive
                                    ? `0 0 16px ${loc.color}66, 0 4px 12px rgba(0,0,0,0.5)`
                                    : "0 2px 8px rgba(0,0,0,0.4)",
                                transition: "all 180ms ease",
                            }}
                            onMouseEnter={(e) => {
                                const btn = e.currentTarget;
                                btn.style.transform = "scale(1.08)";
                                btn.style.borderColor = loc.color;
                                btn.style.color = loc.color;
                            }}
                            onMouseLeave={(e) => {
                                const btn = e.currentTarget;
                                btn.style.transform = "scale(1)";
                                btn.style.borderColor = isActive ? loc.color : "rgba(255,255,255,0.18)";
                                btn.style.color = isActive ? loc.color : "#DDD5F0";
                            }}
                        >
                            <span aria-hidden>{loc.emoji}</span>
                            <span>{loc.name}</span>
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

/** R3F Canvas root + unified React DOM overlay */
export default function HeroScene() {
    const reducedMotion = useReducedMotion();
    const isMobile = useIsMobile();
    const labelsMapRef = useRef<Map<string, HTMLDivElement>>(new Map());

    // Clean up all DOM map references on unmount
    useEffect(() => {
        const map = labelsMapRef.current;
        return () => {
            map.clear();
        };
    }, []);

    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
            }}
        >
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 3, 8], fov: 55, near: 0.1, far: 60 }}
                gl={{
                    antialias: !isMobile,
                    alpha: false,
                    powerPreference: "default",
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.25,
                }}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    touchAction: "none",
                }}
                eventSource={
                    typeof document !== "undefined" ? document.documentElement : undefined
                }
                eventPrefix="client"
            >
                <Suspense fallback={null}>
                    <SceneContent
                        reducedMotion={reducedMotion}
                        isMobile={isMobile}
                        labelsRef={labelsMapRef}
                    />
                </Suspense>
            </Canvas>

            {/* Accessible HTML Labels rendered in React DOM — Zero independent React roots! */}
            {!isMobile && <HeroZoneOverlay labelsRef={labelsMapRef} />}
        </div>
    );
}
