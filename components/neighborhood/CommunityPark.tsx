"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LANDMARKS, useNeighborhoodStore } from "./interactions";
import { neighborhoodAudio } from "./audio";

/**
 * Community Park at the north end of Maple Hollow:
 * Entrance archway, Ancient Whispering Willow with hanging lanterns,
 * Spooky Mist Fountain, Historic Cemetery corner, and park benches.
 * Clickable to navigate to and interact!
 */
export default function CommunityPark() {
    const hangingLanternsRef = useRef<THREE.Group>(null);
    const fountainGlowRef = useRef<THREE.PointLight>(null);

    const onLandmarkClick = (landmarkId: string) => {
        const store = useNeighborhoodStore.getState();
        const landmark = LANDMARKS.find((l) => l.id === landmarkId);
        if (!landmark) return;

        const currentX = store.playerPos[0];
        const currentZ = store.playerPos[2];
        const dist = Math.hypot(currentX - landmark.pos[0], currentZ - landmark.pos[2]);

        if (dist <= 2.8) {
            neighborhoodAudio.playSpookyChime();
            store.triggerLandmark(landmark);
        } else {
            store.setDestinationTarget([landmark.pos[0], landmark.pos[2]], () => {
                neighborhoodAudio.playSpookyChime();
                store.triggerLandmark(landmark);
            });
        }
    };

    const timeRef = useRef(0);

    useFrame((_, delta) => {
        timeRef.current += delta;
        const t = timeRef.current;

        // Swaying lanterns in the ancient willow tree
        if (hangingLanternsRef.current) {
            hangingLanternsRef.current.children.forEach((lantern, i) => {
                lantern.rotation.z = Math.sin(t * 1.5 + i * 1.2) * 0.12;
                lantern.rotation.x = Math.cos(t * 1.2 + i * 0.8) * 0.08;
            });
        }

        // Pulsing fountain mist glow
        if (fountainGlowRef.current) {
            fountainGlowRef.current.intensity = 1.6 + Math.sin(t * 2.2) * 0.4;
        }
    });

    return (
        <group position={[0, 0, -40]}>
            {/* Park Ground Base (Cobblestone / mossy grass clearing) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <circleGeometry args={[11, 32]} />
                <meshStandardMaterial color="#141a16" roughness={0.9} />
            </mesh>

            {/* Park Cobblestone Walking Loop */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
                <ringGeometry args={[6.8, 8.8, 32]} />
                <meshStandardMaterial color="#222030" roughness={0.8} />
            </mesh>

            {/* Wrought-Iron Park Entrance Archway (Z: 4.5 relative to park center = Z: -35.5) */}
            <group position={[0, 0, 4.8]}>
                {/* Left Pillar */}
                <mesh position={[-2.4, 1.8, 0]}>
                    <boxGeometry args={[0.5, 3.6, 0.5]} />
                    <meshStandardMaterial color="#1c1924" roughness={0.8} />
                </mesh>
                {/* Right Pillar */}
                <mesh position={[2.4, 1.8, 0]}>
                    <boxGeometry args={[0.5, 3.6, 0.5]} />
                    <meshStandardMaterial color="#1c1924" roughness={0.8} />
                </mesh>
                {/* Arch Bar */}
                <mesh position={[0, 3.6, 0]}>
                    <boxGeometry args={[5.2, 0.25, 0.2]} />
                    <meshStandardMaterial color="#120f18" metalness={0.7} />
                </mesh>
                {/* Arch Sign "MAPLE HOLLOW PARK" */}
                <mesh position={[0, 3.3, 0]}>
                    <planeGeometry args={[3.2, 0.6]} />
                    <meshStandardMaterial
                        color="#2a2238"
                        emissive="#FF7518"
                        emissiveIntensity={0.35}
                    />
                </mesh>
                {/* Entrance Lanterns on Pillars */}
                {[-2.4, 2.4].map((px, i) => (
                    <group key={i} position={[px, 3.8, 0]}>
                        <mesh>
                            <sphereGeometry args={[0.18, 8, 6]} />
                            <meshStandardMaterial
                                color="#FFB347"
                                emissive="#FF9922"
                                emissiveIntensity={2.0}
                            />
                        </mesh>
                        <pointLight
                            color="#FF9922"
                            intensity={1.2}
                            distance={6}
                            decay={2}
                        />
                    </group>
                ))}
            </group>

            {/* ========================================================
                THE ANCIENT WHISPERING WILLOW (X: -2, Z: -1)
                Gnarled trunk, sprawling branches, hanging glass lanterns
               ======================================================== */}
            <group
                position={[-2, 0, -1]}
                onClick={(e) => {
                    e.stopPropagation();
                    onLandmarkClick("park_tree");
                }}
            >
                {/* Thick Gnarled Trunk */}
                <mesh position={[0, 2.2, 0]}>
                    <cylinderGeometry args={[0.45, 0.9, 4.4, 8]} />
                    <meshStandardMaterial color="#21151e" roughness={0.95} />
                </mesh>
                {/* Root flares spreading on the ground */}
                {[0, 1.3, 2.6, 4.0, 5.2].map((ang, i) => (
                    <mesh
                        key={`root_${i}`}
                        position={[Math.cos(ang) * 0.7, 0.2, Math.sin(ang) * 0.7]}
                        rotation={[0, ang, 0.4]}
                    >
                        <boxGeometry args={[0.35, 0.4, 1.2]} />
                        <meshStandardMaterial color="#1c111a" roughness={0.95} />
                    </mesh>
                ))}

                {/* Sprawling Branches */}
                <mesh position={[-1.2, 4.0, 0]} rotation={[0, 0, 0.6]}>
                    <cylinderGeometry args={[0.2, 0.35, 2.8, 6]} />
                    <meshStandardMaterial color="#21151e" />
                </mesh>
                <mesh position={[1.4, 3.8, 0.4]} rotation={[0.3, 0, -0.6]}>
                    <cylinderGeometry args={[0.18, 0.3, 2.6, 6]} />
                    <meshStandardMaterial color="#21151e" />
                </mesh>
                <mesh position={[0, 4.4, -1.3]} rotation={[-0.6, 0, 0.1]}>
                    <cylinderGeometry args={[0.18, 0.3, 2.5, 6]} />
                    <meshStandardMaterial color="#21151e" />
                </mesh>
                <mesh position={[0.2, 4.6, 1.2]} rotation={[0.5, 0, -0.2]}>
                    <cylinderGeometry args={[0.16, 0.28, 2.4, 6]} />
                    <meshStandardMaterial color="#21151e" />
                </mesh>

                {/* Twisted Crown Foliage / Canopy */}
                <mesh position={[0, 5.5, 0]}>
                    <sphereGeometry args={[2.8, 8, 6]} />
                    <meshStandardMaterial color="#141a15" roughness={0.9} />
                </mesh>

                {/* 5 Hanging Glowing Glass Lanterns Swaying in the Wind */}
                <group ref={hangingLanternsRef}>
                    {[
                        [-1.8, 3.2, 0.6, "#FFD166"],
                        [1.9, 2.9, 0.8, "#FF7518"],
                        [0.2, 3.4, -1.8, "#9B5CFF"],
                        [-1.2, 3.0, -1.4, "#4ADE80"],
                        [1.4, 3.1, -1.1, "#FFB347"],
                    ].map(([lx, ly, lz, col], idx) => (
                        <group key={`willow_lantern_${idx}`} position={[Number(lx), Number(ly), Number(lz)]}>
                            {/* Hanging Chain */}
                            <mesh position={[0, 0.45, 0]}>
                                <cylinderGeometry args={[0.015, 0.015, 0.9, 4]} />
                                <meshStandardMaterial color="#333" />
                            </mesh>
                            {/* Glass Lantern Housing */}
                            <mesh>
                                <boxGeometry args={[0.24, 0.35, 0.24]} />
                                <meshStandardMaterial
                                    color={String(col)}
                                    emissive={String(col)}
                                    emissiveIntensity={2.5}
                                    transparent
                                    opacity={0.9}
                                />
                            </mesh>
                            <pointLight
                                color={String(col)}
                                intensity={1.2}
                                distance={5}
                                decay={2}
                            />
                        </group>
                    ))}
                </group>
            </group>

            {/* ========================================================
                THE SPOOKY MIST FOUNTAIN (X: 4.5, Z: -0.5)
                Stone basin, gargoyle fountainhead, glowing azure mist
               ======================================================== */}
            <group
                position={[4.5, 0, -0.5]}
                onClick={(e) => {
                    e.stopPropagation();
                    onLandmarkClick("park_fountain");
                }}
            >
                {/* Octagonal Stone Outer Basin Wall */}
                <mesh position={[0, 0.4, 0]}>
                    <cylinderGeometry args={[2.0, 2.2, 0.8, 8]} />
                    <meshStandardMaterial color="#252430" roughness={0.8} />
                </mesh>
                {/* Basin Inner Cavity */}
                <mesh position={[0, 0.6, 0]}>
                    <cylinderGeometry args={[1.7, 1.7, 0.5, 8]} />
                    <meshStandardMaterial color="#171622" />
                </mesh>

                {/* Glowing Azure Water Surface */}
                <mesh position={[0, 0.68, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[1.7, 16]} />
                    <meshStandardMaterial
                        color="#38BDF8"
                        emissive="#0284C7"
                        emissiveIntensity={1.5}
                        roughness={0.1}
                        metalness={0.4}
                    />
                </mesh>

                {/* Central Carved Stone Column & Gargoyle Fountainhead */}
                <mesh position={[0, 1.2, 0]}>
                    <cylinderGeometry args={[0.35, 0.45, 1.4, 8]} />
                    <meshStandardMaterial color="#2d2b38" roughness={0.7} />
                </mesh>
                <mesh position={[0, 1.9, 0]}>
                    <sphereGeometry args={[0.3, 8, 8]} />
                    <meshStandardMaterial color="#1f1e29" />
                </mesh>

                {/* Soft Glowing Water Fog / Mist */}
                <mesh position={[0, 0.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[3.2, 3.2]} />
                    <meshBasicMaterial
                        color="#38BDF8"
                        transparent
                        opacity={0.25}
                        depthWrite={false}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Fountain Light */}
                <pointLight
                    ref={fountainGlowRef}
                    position={[0, 1.1, 0]}
                    color="#38BDF8"
                    intensity={1.8}
                    distance={8}
                    decay={2}
                />
            </group>

            {/* ========================================================
                HISTORIC CEMETERY CORNER (X: -8.5, Z: 0)
                Wrought iron fence, 4 mossy stone tombstones, tilted Celtic cross
               ======================================================== */}
            <group
                position={[-8.5, 0, 0]}
                onClick={(e) => {
                    e.stopPropagation();
                    onLandmarkClick("park_graveyard");
                }}
            >
                {/* Cemetery Ground Dirt */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.022, 0]}>
                    <planeGeometry args={[4.5, 5]} />
                    <meshStandardMaterial color="#121017" roughness={0.95} />
                </mesh>

                {/* Tilted Celtic Cross Tombstone */}
                <group position={[-0.8, 0, -1.2]} rotation={[0.08, 0.1, -0.12]}>
                    {/* Cross Vertical */}
                    <mesh position={[0, 0.9, 0]}>
                        <boxGeometry args={[0.22, 1.8, 0.16]} />
                        <meshStandardMaterial color="#374151" roughness={0.8} />
                    </mesh>
                    {/* Cross Horizontal */}
                    <mesh position={[0, 1.2, 0]}>
                        <boxGeometry args={[1.0, 0.2, 0.16]} />
                        <meshStandardMaterial color="#374151" roughness={0.8} />
                    </mesh>
                    {/* Cross Ring */}
                    <mesh position={[0, 1.2, 0]}>
                        <torusGeometry args={[0.35, 0.04, 6, 12]} />
                        <meshStandardMaterial color="#374151" roughness={0.8} />
                    </mesh>
                </group>

                {/* Rounded Arch Tombstone 1 */}
                <group position={[0.8, 0, -0.6]} rotation={[-0.05, -0.2, 0.05]}>
                    <mesh position={[0, 0.6, 0]}>
                        <boxGeometry args={[0.65, 1.2, 0.15]} />
                        <meshStandardMaterial color="#4b5563" roughness={0.9} />
                    </mesh>
                </group>

                {/* Pointed Gothic Tombstone 2 */}
                <group position={[-0.9, 0, 1.1]} rotation={[0.04, 0.3, -0.05]}>
                    <mesh position={[0, 0.5, 0]}>
                        <boxGeometry args={[0.55, 1.0, 0.14]} />
                        <meshStandardMaterial color="#374151" roughness={0.9} />
                    </mesh>
                </group>

                {/* Cracked Tombstone 3 */}
                <group position={[0.9, 0, 1.3]} rotation={[-0.1, 0.05, 0.1]}>
                    <mesh position={[0, 0.45, 0]}>
                        <boxGeometry args={[0.6, 0.9, 0.15]} />
                        <meshStandardMaterial color="#4b5563" roughness={0.9} />
                    </mesh>
                </group>
            </group>

            {/* Wooden Park Benches */}
            {/* Bench near the fountain */}
            <group position={[4.5, 0, 3.2]} rotation={[0, Math.PI, 0]}>
                <mesh position={[0, 0.3, 0]}>
                    <boxGeometry args={[1.8, 0.08, 0.5]} />
                    <meshStandardMaterial color="#3e2417" />
                </mesh>
                <mesh position={[0, 0.65, -0.22]}>
                    <boxGeometry args={[1.8, 0.45, 0.06]} />
                    <meshStandardMaterial color="#3e2417" />
                </mesh>
                {[-0.8, 0.8].map((bx, i) => (
                    <mesh key={i} position={[bx, 0.15, 0]}>
                        <boxGeometry args={[0.08, 0.3, 0.45]} />
                        <meshStandardMaterial color="#111" metalness={0.8} />
                    </mesh>
                ))}
            </group>

            {/* Bench near the willow */}
            <group position={[-2, 0, 3.2]} rotation={[0, Math.PI, 0]}>
                <mesh position={[0, 0.3, 0]}>
                    <boxGeometry args={[1.8, 0.08, 0.5]} />
                    <meshStandardMaterial color="#3e2417" />
                </mesh>
                <mesh position={[0, 0.65, -0.22]}>
                    <boxGeometry args={[1.8, 0.45, 0.06]} />
                    <meshStandardMaterial color="#3e2417" />
                </mesh>
                {[-0.8, 0.8].map((bx, i) => (
                    <mesh key={i} position={[bx, 0.15, 0]}>
                        <boxGeometry args={[0.08, 0.3, 0.45]} />
                        <meshStandardMaterial color="#111" metalness={0.8} />
                    </mesh>
                ))}
            </group>
        </group>
    );
}
