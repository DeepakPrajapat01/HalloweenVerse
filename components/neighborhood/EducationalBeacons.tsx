"use client";

import { useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import {
    EDUCATIONAL_LOCATIONS,
    type EducationalLocation,
} from "./educationalContent";
import { useNeighborhoodStore } from "./interactions";
import { neighborhoodAudio } from "./audio";

/**
 * 3D In-World Interactive Waypoint Beacons for the 8 Educational Locations.
 * Allows clicking from anywhere in the world to navigate to the location and explore its lore!
 */
export default function EducationalBeacons() {
    const visitedEducational = useNeighborhoodStore((s) => s.visitedEducational);

    return (
        <group>
            {EDUCATIONAL_LOCATIONS.map((loc) => (
                <SingleBeacon
                    key={loc.id}
                    loc={loc}
                    isVisited={visitedEducational.includes(loc.id)}
                />
            ))}
        </group>
    );
}

function SingleBeacon({
    loc,
    isVisited,
}: {
    loc: EducationalLocation;
    isVisited: boolean;
}) {
    const gemRef = useRef<THREE.Group>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const [isHovered, setIsHovered] = useState(false);
    const timeRef = useRef(0);

    // Subtle floating rotation and pulsing glow
    useFrame((_, delta) => {
        timeRef.current += delta;
        const t = timeRef.current;
        const offset = loc.number * 0.7;

        if (gemRef.current) {
            gemRef.current.position.y = 2.4 + Math.sin(t * 2 + offset) * 0.12;
            gemRef.current.rotation.y = t * 1.2 + offset;
        }

        if (ringRef.current) {
            const scale = 1.0 + Math.sin(t * 3 + offset) * 0.1;
            ringRef.current.scale.set(scale, scale, scale);
        }
    });

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        const store = useNeighborhoodStore.getState();
        const currentX = store.playerPos[0];
        const currentZ = store.playerPos[2];
        const dist = Math.hypot(currentX - loc.position[0], currentZ - loc.position[2]);

        if (dist <= loc.interactionRadius + 0.5) {
            neighborhoodAudio.playSpookyChime();
            store.openEducationalLocation(loc);
        } else {
            // Set destination target to walk to the educational location
            store.setDestinationTarget([loc.position[0], loc.position[2]], () => {
                neighborhoodAudio.playSpookyChime();
                store.openEducationalLocation(loc);
            });
        }
    };

    return (
        <group
            position={loc.position}
            onClick={handleClick}
            onPointerOver={(e) => {
                e.stopPropagation();
                setIsHovered(true);
                document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
                setIsHovered(false);
                document.body.style.cursor = "default";
            }}
        >
            {/* Ground Interaction Area Ring */}
            <mesh
                ref={ringRef}
                position={[0, 0.04, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
            >
                <ringGeometry args={[1.2, 1.45, 32]} />
                <meshBasicMaterial
                    color={isHovered ? "#FFFFFF" : isVisited ? "#10B981" : loc.accentColor}
                    transparent
                    opacity={isHovered ? 0.8 : isVisited ? 0.35 : 0.45}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Vintage Carved Wooden Signpost Base */}
            <mesh position={[0, 0.9, 0]}>
                <cylinderGeometry args={[0.07, 0.09, 1.8, 8]} />
                <meshStandardMaterial color="#2c1a0e" roughness={0.9} />
            </mesh>

            {/* Carved Sign Plaque */}
            <group position={[0, 1.5, 0.12]}>
                <mesh>
                    <boxGeometry args={[0.65, 0.32, 0.06]} />
                    <meshStandardMaterial
                        color={isHovered ? "#4a2810" : "#3b1e0c"}
                        roughness={0.8}
                    />
                </mesh>
                {/* Plaque number badge */}
                <mesh position={[0, 0, 0.04]}>
                    <planeGeometry args={[0.5, 0.2]} />
                    <meshBasicMaterial
                        color={isVisited ? "#059669" : loc.accentColor}
                        transparent
                        opacity={0.85}
                    />
                </mesh>
            </group>

            {/* Floating Magical Lore Gem & Icon */}
            <group ref={gemRef} position={[0, 2.4, 0]}>
                {/* Floating Octahedron Crystal */}
                <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
                    <octahedronGeometry args={[0.26, 0]} />
                    <meshStandardMaterial
                        color={isVisited ? "#34D399" : loc.accentColor}
                        emissive={isVisited ? "#10B981" : loc.accentColor}
                        emissiveIntensity={isHovered ? 2.8 : 1.8}
                        metalness={0.4}
                        roughness={0.2}
                    />
                </mesh>

                {/* Point Light Glow */}
                <pointLight
                    color={isVisited ? "#34D399" : loc.accentColor}
                    intensity={isHovered ? 1.6 : 0.9}
                    distance={5}
                    decay={2}
                />
            </group>
        </group>
    );
}
