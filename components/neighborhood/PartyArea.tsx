"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LANDMARKS, useNeighborhoodStore } from "./interactions";
import { neighborhoodAudio } from "./audio";

/**
 * Central Halloween Party Area:
 * Roaring bonfire, overhead party lights & bunting, DJ skeleton,
 * dancing ghost, apple bobbing tub, and refreshment bar.
 * Clickable to navigate to and interact!
 */
export default function PartyArea() {
    const fireLightRef = useRef<THREE.PointLight>(null);
    const flamesRef = useRef<THREE.Group>(null);
    const skeletonRef = useRef<THREE.Group>(null);
    const partyGhostRef = useRef<THREE.Group>(null);
    const embersRef = useRef<THREE.Points>(null);

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

    // Procedural embers rising from bonfire
    const emberData = useMemo(() => {
        const count = 40;
        const pos = new Float32Array(count * 3);
        const speeds = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 1.2;
            pos[i * 3 + 1] = Math.random() * 3.5 + 0.3;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
            speeds[i] = 0.8 + Math.random() * 1.2;
        }
        return { pos, speeds, count };
    }, []);

    // Fairy light bulbs coordinates along overhead strings
    const fairyLights = useMemo(() => {
        const lights: { x: number; y: number; z: number; color: string }[] = [];
        const colors = ["#FF7518", "#9B5CFF", "#FFD166", "#4ADE80", "#FF4081"];

        // Connect 4 corner poles: [-4, -4], [4, -4], [4, 4], [-4, 4]
        const corners = [
            [-4.2, -4.2],
            [4.2, -4.2],
            [4.2, 4.2],
            [-4.2, 4.2],
            [-4.2, -4.2],
        ];

        for (let c = 0; c < 4; c++) {
            const [x1, z1] = corners[c];
            const [x2, z2] = corners[c + 1];
            for (let step = 1; step <= 6; step++) {
                const f = step / 7;
                const x = x1 + (x2 - x1) * f;
                const z = z1 + (z2 - z1) * f;
                // Catenary sag curve
                const y = 3.6 - Math.sin(f * Math.PI) * 0.7;
                lights.push({
                    x,
                    y,
                    z,
                    color: colors[(c * 6 + step) % colors.length],
                });
            }
        }
        return lights;
    }, []);

    const timeRef = useRef(0);

    useFrame((_, delta) => {
        timeRef.current += Math.min(delta, 0.1);
        const t = timeRef.current;

        // Bonfire light flicker
        if (fireLightRef.current) {
            fireLightRef.current.intensity =
                2.8 + Math.sin(t * 12) * 0.5 + Math.cos(t * 17) * 0.3;
        }

        // Flame deformation / rotation
        if (flamesRef.current) {
            flamesRef.current.children.forEach((flame, idx) => {
                const s = 1 + Math.sin(t * 10 + idx * 1.5) * 0.2;
                flame.scale.set(s, 1 + Math.cos(t * 8 + idx) * 0.25, s);
                flame.rotation.y = t * 1.5 + idx;
            });
        }

        // Embers rising
        if (embersRef.current) {
            const arr = embersRef.current.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < emberData.count; i++) {
                arr[i * 3 + 1] += emberData.speeds[i] * 0.03;
                arr[i * 3] += Math.sin(t * 3 + i) * 0.008;
                if (arr[i * 3 + 1] > 4.2) {
                    arr[i * 3 + 1] = 0.4;
                    arr[i * 3] = (Math.random() - 0.5) * 1.2;
                    arr[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
                }
            }
            embersRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // DJ Skeleton funky head and arm dance
        if (skeletonRef.current) {
            skeletonRef.current.position.y = 0.05 + Math.abs(Math.sin(t * 6)) * 0.12;
            skeletonRef.current.rotation.y = Math.sin(t * 4) * 0.2;
        }

        // Party ghost swaying dance
        if (partyGhostRef.current) {
            partyGhostRef.current.position.y = 1.3 + Math.sin(t * 3) * 0.2;
            partyGhostRef.current.rotation.z = Math.sin(t * 3) * 0.2;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            {/* Plaza Round Cobblestone Base (Diameter: ~11 units) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
                <circleGeometry args={[5.6, 32]} />
                <meshStandardMaterial color="#352c4a" roughness={0.8} />
            </mesh>
            {/* Outer Decorative Ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.035, 0]}>
                <ringGeometry args={[5.3, 5.6, 32]} />
                <meshStandardMaterial
                    color="#FF7518"
                    emissive="#FF7518"
                    emissiveIntensity={0.6}
                    roughness={0.5}
                />
            </mesh>

            {/* Central Bonfire (Clickable to warm hands) */}
            <group
                onClick={(e) => {
                    e.stopPropagation();
                    onLandmarkClick("bonfire");
                }}
            >
                {/* Stone Hearth */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
                    <ringGeometry args={[0.9, 1.45, 16]} />
                    <meshStandardMaterial color="#2a2533" roughness={0.9} />
                </mesh>

                {/* Charcoal & ash bed */}
                <mesh position={[0, 0.12, 0]}>
                    <cylinderGeometry args={[0.9, 0.9, 0.15, 12]} />
                    <meshStandardMaterial color="#140f12" />
                </mesh>

                {/* Charred Wood Logs in Bonfire Tepee */}
                {[0, Math.PI / 3, (Math.PI * 2) / 3, Math.PI, (Math.PI * 4) / 3, (Math.PI * 5) / 3].map(
                    (ang, i) => (
                        <mesh
                            key={`log_${i}`}
                            position={[Math.cos(ang) * 0.45, 0.45, Math.sin(ang) * 0.45]}
                            rotation={[0.35 * Math.sin(ang), ang, 0.35 * Math.cos(ang)]}
                        >
                            <cylinderGeometry args={[0.09, 0.12, 1.2, 5]} />
                            <meshStandardMaterial color="#2d1d17" roughness={0.9} />
                        </mesh>
                    )
                )}

                {/* Glowing Embers and Animated Flame Cones */}
                <group ref={flamesRef} position={[0, 0.5, 0]}>
                    {/* Core bright flame */}
                    <mesh position={[0, 0.4, 0]}>
                        <coneGeometry args={[0.45, 1.3, 8]} />
                        <meshStandardMaterial
                            color="#FFF066"
                            emissive="#FF5500"
                            emissiveIntensity={3.2}
                        />
                    </mesh>
                    {/* Secondary outer flame */}
                    <mesh position={[0.1, 0.3, -0.1]}>
                        <coneGeometry args={[0.35, 1.1, 7]} />
                        <meshStandardMaterial
                            color="#FF7518"
                            emissive="#E63900"
                            emissiveIntensity={2.5}
                            transparent
                            opacity={0.85}
                        />
                    </mesh>
                    <mesh position={[-0.1, 0.25, 0.1]}>
                        <coneGeometry args={[0.3, 0.9, 7]} />
                        <meshStandardMaterial
                            color="#FF9E00"
                            emissive="#FF4800"
                            emissiveIntensity={2.8}
                            transparent
                            opacity={0.85}
                        />
                    </mesh>
                </group>

                {/* Rising Ember Sparks */}
                <points ref={embersRef}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[emberData.pos, 3]}
                            count={emberData.count}
                        />
                    </bufferGeometry>
                    <pointsMaterial
                        color="#FFD166"
                        size={0.09}
                        transparent
                        opacity={0.9}
                        blending={THREE.AdditiveBlending}
                    />
                </points>
            </group>

            {/* Dynamic Bonfire Light */}
            <pointLight
                ref={fireLightRef}
                position={[0, 1.2, 0]}
                color="#FF6B1A"
                intensity={3.0}
                distance={14}
                decay={2}
            />

            {/* 4 Decorated Wooden Party Poles */}
            {[
                [-4.2, -4.2],
                [4.2, -4.2],
                [4.2, 4.2],
                [-4.2, 4.2],
            ].map(([px, pz], idx) => (
                <group key={`pole_${idx}`} position={[px, 0, pz]}>
                    <mesh position={[0, 2, 0]}>
                        <cylinderGeometry args={[0.1, 0.12, 4, 6]} />
                        <meshStandardMaterial color="#3e2a1e" roughness={0.9} />
                    </mesh>
                    {/* Pole Top Cap with pumpkin */}
                    <mesh position={[0, 4.2, 0]}>
                        <sphereGeometry args={[0.22, 8, 6]} />
                        <meshStandardMaterial
                            color="#E86010"
                            emissive="#FF5500"
                            emissiveIntensity={1.2}
                        />
                    </mesh>
                </group>
            ))}

            {/* Overhead Fairy String Lights */}
            {fairyLights.map((bulb, i) => (
                <group key={`bulb_${i}`} position={[bulb.x, bulb.y, bulb.z]}>
                    <mesh>
                        <sphereGeometry args={[0.07, 6, 6]} />
                        <meshStandardMaterial
                            color={bulb.color}
                            emissive={bulb.color}
                            emissiveIntensity={2.5}
                        />
                    </mesh>
                </group>
            ))}

            {/* DJ SKELETON STAGE (West side of plaza: X = -4.2, Z = 0) */}
            <group
                position={[-4.0, 0, 0]}
                rotation={[0, Math.PI / 2, 0]}
                onClick={(e) => {
                    e.stopPropagation();
                    onLandmarkClick("dj_skeleton");
                }}
            >
                {/* DJ Table */}
                <mesh position={[0, 0.75, 0]}>
                    <boxGeometry args={[2.2, 0.9, 0.9]} />
                    <meshStandardMaterial color="#1e182e" />
                </mesh>
                {/* Glowing Turntables */}
                {[-0.6, 0.6].map((tx, i) => (
                    <mesh key={i} position={[tx, 1.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.28, 0.28, 0.05, 16]} />
                        <meshStandardMaterial
                            color="#111"
                            emissive={i === 0 ? "#9B5CFF" : "#FF7518"}
                            emissiveIntensity={1.2}
                        />
                    </mesh>
                ))}
                {/* Speaker Stacks */}
                {[-1.5, 1.5].map((sx, i) => (
                    <group key={i} position={[sx, 1, 0]}>
                        <mesh>
                            <boxGeometry args={[0.7, 1.8, 0.7]} />
                            <meshStandardMaterial color="#161220" />
                        </mesh>
                        <mesh position={[0, 0.3, 0.36]}>
                            <circleGeometry args={[0.22, 12]} />
                            <meshStandardMaterial color="#333" />
                        </mesh>
                        <mesh position={[0, -0.3, 0.36]}>
                            <circleGeometry args={[0.25, 12]} />
                            <meshStandardMaterial color="#333" />
                        </mesh>
                    </group>
                ))}

                {/* Animated DJ Skeleton standing behind table */}
                <group ref={skeletonRef} position={[0, 0, -0.8]}>
                    {/* Skull */}
                    <mesh position={[0, 1.6, 0]}>
                        <sphereGeometry args={[0.2, 8, 8]} />
                        <meshStandardMaterial color="#E5E7EB" roughness={0.5} />
                    </mesh>
                    {/* DJ Headphones */}
                    <mesh position={[0, 1.65, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <torusGeometry args={[0.22, 0.04, 8, 16, Math.PI]} />
                        <meshStandardMaterial color="#9B5CFF" />
                    </mesh>
                    {/* Spine / Ribcage */}
                    <mesh position={[0, 1.15, 0]}>
                        <cylinderGeometry args={[0.12, 0.14, 0.65, 6]} />
                        <meshStandardMaterial color="#E5E7EB" roughness={0.6} />
                    </mesh>
                    {/* Arms reaching to turntables */}
                    <mesh position={[-0.28, 1.05, 0.3]} rotation={[0.4, 0, -0.3]}>
                        <cylinderGeometry args={[0.04, 0.04, 0.6, 4]} />
                        <meshStandardMaterial color="#E5E7EB" />
                    </mesh>
                    <mesh position={[0.28, 1.05, 0.3]} rotation={[0.4, 0, 0.3]}>
                        <cylinderGeometry args={[0.04, 0.04, 0.6, 4]} />
                        <meshStandardMaterial color="#E5E7EB" />
                    </mesh>
                </group>
            </group>

            {/* DANCING FRIENDLY GHOST (East side of plaza) */}
            <group ref={partyGhostRef} position={[2.8, 0, -2.2]}>
                <mesh>
                    <sphereGeometry args={[0.35, 12, 10]} />
                    <meshStandardMaterial
                        color="#F3E8FF"
                        emissive="#A855F7"
                        emissiveIntensity={1.0}
                        transparent
                        opacity={0.85}
                    />
                </mesh>
                <mesh position={[0, -0.4, 0]}>
                    <coneGeometry args={[0.32, 0.8, 10]} />
                    <meshStandardMaterial
                        color="#F3E8FF"
                        emissive="#A855F7"
                        emissiveIntensity={0.8}
                        transparent
                        opacity={0.75}
                    />
                </mesh>
                {/* Eyes */}
                <mesh position={[-0.1, 0.08, 0.3]}>
                    <sphereGeometry args={[0.04, 6, 6]} />
                    <meshBasicMaterial color="#000" />
                </mesh>
                <mesh position={[0.1, 0.08, 0.3]}>
                    <sphereGeometry args={[0.04, 6, 6]} />
                    <meshBasicMaterial color="#000" />
                </mesh>
            </group>

            {/* REFRESHMENT BAR & APPLE BOBBING TUB (East side: X = 4.0, Z = 0) */}
            <group
                position={[4.0, 0, 0]}
                rotation={[0, -Math.PI / 2, 0]}
                onClick={(e) => {
                    e.stopPropagation();
                    onLandmarkClick("apple_bobbing");
                }}
            >
                {/* Treat Table */}
                <mesh position={[0, 0.6, 0]}>
                    <boxGeometry args={[2.4, 0.8, 0.9]} />
                    <meshStandardMaterial color="#3b1d54" />
                </mesh>
                {/* Purple Tablecloth draped on top */}
                <mesh position={[0, 1.02, 0]}>
                    <boxGeometry args={[2.5, 0.06, 1.0]} />
                    <meshStandardMaterial color="#581c87" />
                </mesh>

                {/* Apple Bobbing Wooden Tub */}
                <group position={[0.7, 1.25, 0]}>
                    <mesh>
                        <cylinderGeometry args={[0.35, 0.3, 0.38, 12]} />
                        <meshStandardMaterial color="#54331b" roughness={0.8} />
                    </mesh>
                    {/* Water Surface */}
                    <mesh position={[0, 0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <circleGeometry args={[0.32, 12]} />
                        <meshStandardMaterial
                            color="#38BDF8"
                            emissive="#0284C7"
                            emissiveIntensity={0.8}
                            roughness={0.1}
                            metalness={0.3}
                        />
                    </mesh>
                    {/* Floating Red Apples */}
                    {[
                        [-0.1, 0.16, -0.05],
                        [0.12, 0.16, 0.08],
                        [-0.05, 0.16, 0.12],
                    ].map(([ax, ay, az], i) => (
                        <mesh key={i} position={[ax, ay, az]}>
                            <sphereGeometry args={[0.06, 6, 6]} />
                            <meshStandardMaterial color="#EF4444" roughness={0.4} />
                        </mesh>
                    ))}
                </group>

                {/* Spooky Party Punch Bowl */}
                <group position={[-0.7, 1.25, 0]}>
                    <mesh rotation={[Math.PI, 0, 0]}>
                        <sphereGeometry args={[0.3, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
                        <meshStandardMaterial color="#FF7518" roughness={0.2} transparent opacity={0.85} />
                    </mesh>
                </group>
            </group>
        </group>
    );
}
