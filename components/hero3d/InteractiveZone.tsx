"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { WorldLocation } from "@/src/data/locations";

interface InteractiveZoneProps {
    location: WorldLocation;
    isActive: boolean;
    onSelect: (id: string) => void;
    isMobile: boolean;
}

/**
 * 3D Glowing pulsing beacon marker for a clickable world destination.
 * Pure React Three Fiber geometry with zero independent React roots.
 */
export default function InteractiveZone({
    location,
    isActive,
    onSelect,
}: InteractiveZoneProps) {
    const ringRef = useRef<THREE.Mesh>(null);
    const beaconRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const timeRef = useRef(0);

    const color = new THREE.Color(location.color);

    // Clean up cursor on unmount if component unmounts while hovered
    useEffect(() => {
        return () => {
            if (typeof document !== "undefined") {
                document.body.style.cursor = "auto";
            }
        };
    }, []);

    useFrame((_, delta) => {
        timeRef.current += delta;
        const t = timeRef.current;

        // Ring pulse
        if (ringRef.current) {
            const s = isActive
                ? 1 + Math.sin(t * 3) * 0.15
                : hovered
                    ? 1 + Math.sin(t * 4) * 0.08
                    : 1;
            ringRef.current.scale.setScalar(s);
            (ringRef.current.material as THREE.MeshBasicMaterial).opacity = isActive
                ? 0.7 + Math.sin(t * 3) * 0.3
                : hovered
                    ? 0.5
                    : 0.25;
        }

        // Beacon float
        if (beaconRef.current) {
            beaconRef.current.position.y =
                0.6 + Math.sin(t * 2 + location.scenePosition[0]) * 0.12;
        }
    });

    return (
        <group
            position={location.scenePosition}
            onClick={(e) => {
                e.stopPropagation();
                onSelect(location.id);
            }}
            onPointerEnter={(e) => {
                e.stopPropagation();
                setHovered(true);
                document.body.style.cursor = "pointer";
            }}
            onPointerLeave={() => {
                setHovered(false);
                document.body.style.cursor = "auto";
            }}
        >
            {/* Ground ring */}
            <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
                <ringGeometry args={[0.55, 0.75, 32]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.25}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Floating beacon orb */}
            <mesh ref={beaconRef} position={[0, 0.6, 0]}>
                <sphereGeometry args={[isActive ? 0.24 : 0.16, 16, 12]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={isActive ? 2.8 : hovered ? 2.2 : 1.2}
                    roughness={0.1}
                    metalness={0.1}
                    transparent
                    opacity={isActive ? 1 : 0.9}
                />
            </mesh>

            {/* Active glow point light */}
            {(isActive || hovered) && (
                <pointLight
                    position={[0, 0.8, 0]}
                    color={color}
                    intensity={isActive ? 2.5 : 1.5}
                    distance={5}
                    decay={2}
                />
            )}
        </group>
    );
}
