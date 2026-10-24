"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { type ThreeEvent } from "@react-three/fiber";
import { PLAYABLE_BOUNDS, checkCollision } from "./collision";
import { useNeighborhoodStore } from "./interactions";

/**
 * Roads, sidewalks, curbs, house walkways, and ground terrain for the neighborhood.
 */
export default function RoadsAndPaths() {
    const pointerDownPos = useRef<{ x: number; y: number } | null>(null);

    const onGroundPointerDown = (e: ThreeEvent<PointerEvent>) => {
        if (e.button === 0) {
            pointerDownPos.current = { x: e.clientX, y: e.clientY };
        }
    };

    const onGroundPointerUp = (e: ThreeEvent<PointerEvent>) => {
        if (!pointerDownPos.current) return;
        const dx = e.clientX - pointerDownPos.current.x;
        const dy = e.clientY - pointerDownPos.current.y;
        pointerDownPos.current = null;

        const store = useNeighborhoodStore.getState();
        if (!store.isSceneReady) return;

        // Distinguish click from camera rotation drag
        if (Math.hypot(dx, dy) < 8) {
            const hitX = e.point.x;
            const hitZ = e.point.z;

            // Validate destination inside bounds & obstacle-free
            if (
                hitX >= PLAYABLE_BOUNDS.minX + 0.5 &&
                hitX <= PLAYABLE_BOUNDS.maxX - 0.5 &&
                hitZ >= PLAYABLE_BOUNDS.minZ + 0.5 &&
                hitZ <= PLAYABLE_BOUNDS.maxZ - 0.5 &&
                !checkCollision(hitX, hitZ, 0.45)
            ) {
                useNeighborhoodStore.getState().setDestinationTarget([hitX, hitZ]);
            }
        }
    };

    // Generate dashed center line coordinates
    const dashes = useMemo(() => {
        const list: number[] = [];
        // Leave center plaza (Z: -5 to +5) open
        for (let z = -34; z <= -6; z += 3.2) {
            list.push(z);
        }
        for (let z = 6; z <= 36; z += 3.2) {
            list.push(z);
        }
        return list;
    }, []);

    // Generate sidewalk paver seams
    const sidewalkSeams = useMemo(() => {
        const list: number[] = [];
        for (let z = -35; z <= 37; z += 2.5) {
            list.push(z);
        }
        return list;
    }, []);

    // Fallen leaves scattered across grass
    const leafClusters = useMemo(() => {
        const leaves: { x: number; z: number; color: string; scale: number; rot: number }[] = [];
        const colors = ["#d9531e", "#e87a20", "#cc3322", "#e6a122", "#992211"];
        for (let i = 0; i < 90; i++) {
            // Pick side lawns or sidewalk edges
            const side = Math.random() > 0.5 ? 1 : -1;
            const x = side * (5.5 + Math.random() * 8);
            const z = -36 + Math.random() * 72;
            const color = colors[Math.floor(Math.random() * colors.length)];
            leaves.push({
                x,
                z,
                color,
                scale: 0.15 + Math.random() * 0.2,
                rot: Math.random() * Math.PI * 2,
            });
        }
        return leaves;
    }, []);

    return (
        <group>
            {/* Main grass ground plane with click-to-move */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.01, 0]}
                receiveShadow
                onPointerDown={onGroundPointerDown}
                onPointerUp={onGroundPointerUp}
            >
                <planeGeometry args={[75, 95]} />
                <meshStandardMaterial
                    color="#1d3224"
                    roughness={0.85}
                    metalness={0.04}
                />
            </mesh>

            {/* Central asphalt road with click-to-move */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0.02, 1]}
                onPointerDown={onGroundPointerDown}
                onPointerUp={onGroundPointerUp}
            >
                <planeGeometry args={[7.2, 76]} />
                <meshStandardMaterial
                    color="#2f273d"
                    roughness={0.68}
                    metalness={0.1}
                />
            </mesh>

            {/* Glowing dashed yellow/orange road centerline */}
            {dashes.map((z, idx) => (
                <mesh key={`dash_${idx}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, z]}>
                    <planeGeometry args={[0.22, 1.8]} />
                    <meshStandardMaterial
                        color="#FFA022"
                        emissive="#E57810"
                        emissiveIntensity={1.4}
                        roughness={0.35}
                    />
                </mesh>
            ))}

            {/* Cobblestone crosswalks near park and party */}
            {[-22, -6, 6, 22].map((z, idx) => (
                <group key={`crosswalk_${idx}`} position={[0, 0.025, z]}>
                    {[-2.8, -1.8, -0.8, 0.2, 1.2, 2.2].map((x, stripeIdx) => (
                        <mesh key={`stripe_${stripeIdx}`} rotation={[-Math.PI / 2, 0, 0]} position={[x + 0.3, 0, 0]}>
                            <planeGeometry args={[0.55, 1.6]} />
                            <meshStandardMaterial
                                color="#584c6e"
                                roughness={0.7}
                            />
                        </mesh>
                    ))}
                </group>
            ))}

            {/* West Sidewalk (X: -4.7, Width: 2.2, Height: 0.12) */}
            <mesh position={[-4.7, 0.06, 1]}>
                <boxGeometry args={[2.2, 0.12, 76]} />
                <meshStandardMaterial color="#443a59" roughness={0.7} />
            </mesh>

            {/* East Sidewalk (X: 4.7, Width: 2.2, Height: 0.12) */}
            <mesh position={[4.7, 0.06, 1]}>
                <boxGeometry args={[2.2, 0.12, 76]} />
                <meshStandardMaterial color="#443a59" roughness={0.7} />
            </mesh>

            {/* Granite curbs lining the street */}
            <mesh position={[-3.65, 0.08, 1]}>
                <boxGeometry args={[0.15, 0.16, 76]} />
                <meshStandardMaterial color="#30263d" roughness={0.6} />
            </mesh>
            <mesh position={[3.65, 0.08, 1]}>
                <boxGeometry args={[0.15, 0.16, 76]} />
                <meshStandardMaterial color="#30263d" roughness={0.6} />
            </mesh>

            {/* Sidewalk seams */}
            {sidewalkSeams.map((z, i) => (
                <group key={`seam_${i}`}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-4.7, 0.125, z]}>
                        <planeGeometry args={[2.2, 0.04]} />
                        <meshBasicMaterial color="#231a33" />
                    </mesh>
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4.7, 0.125, z]}>
                        <planeGeometry args={[2.2, 0.04]} />
                        <meshBasicMaterial color="#231a33" />
                    </mesh>
                </group>
            ))}

            {/* House Walkways connecting sidewalk to front doors */}
            {/* West Houses: Walkway from X = -5.8 to -9.5 */}
            {[-26, -10, 10, 26].map((z, i) => (
                <group key={`west_walkway_${i}`} position={[-7.65, 0.04, z]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[3.7, 1.6]} />
                        <meshStandardMaterial color="#382e4e" roughness={0.8} />
                    </mesh>
                    {/* Stepping stone pavers */}
                    {[-1.2, -0.4, 0.4, 1.2].map((px, j) => (
                        <mesh key={`p_w_${j}`} rotation={[-Math.PI / 2, 0, 0]} position={[px, 0.01, 0]}>
                            <planeGeometry args={[0.65, 1.3]} />
                            <meshStandardMaterial color="#4a3e66" roughness={0.7} />
                        </mesh>
                    ))}
                </group>
            ))}

            {/* East Houses: Walkway from X = 5.8 to 9.5 */}
            {[-26, -10, 10, 26].map((z, i) => (
                <group key={`east_walkway_${i}`} position={[7.65, 0.04, z]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[3.7, 1.6]} />
                        <meshStandardMaterial color="#382e4e" roughness={0.8} />
                    </mesh>
                    {/* Stepping stone pavers */}
                    {[-1.2, -0.4, 0.4, 1.2].map((px, j) => (
                        <mesh key={`p_e_${j}`} rotation={[-Math.PI / 2, 0, 0]} position={[px, 0.01, 0]}>
                            <planeGeometry args={[0.65, 1.3]} />
                            <meshStandardMaterial color="#4a3e66" roughness={0.7} />
                        </mesh>
                    ))}
                </group>
            ))}

            {/* Manhole covers on the street */}
            {[-18, 14].map((z, i) => (
                <mesh key={`manhole_${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0.8 * (i % 2 === 0 ? 1 : -1), 0.025, z]}>
                    <circleGeometry args={[0.45, 16]} />
                    <meshStandardMaterial color="#1a1820" metalness={0.7} roughness={0.4} />
                </mesh>
            ))}

            {/* Fallen Autumn Leaves */}
            {leafClusters.map((leaf, idx) => (
                <mesh
                    key={`leaf_${idx}`}
                    position={[leaf.x, 0.02, leaf.z]}
                    rotation={[-Math.PI / 2, 0, leaf.rot]}
                    scale={[leaf.scale, leaf.scale, 1]}
                >
                    <planeGeometry args={[0.8, 0.5]} />
                    <meshBasicMaterial
                        color={leaf.color}
                        side={THREE.DoubleSide}
                        transparent
                        opacity={0.85}
                    />
                </mesh>
            ))}
        </group>
    );
}
