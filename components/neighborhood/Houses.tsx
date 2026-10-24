"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HOUSES, useNeighborhoodStore } from "./interactions";
import { neighborhoodAudio } from "./audio";

/**
 * 8 Architecturally Distinct 3D Halloween Houses with custom silhouettes,
 * porches, glowing windows, roofs, chimneys, and unique decorations.
 * Clickable to navigate to and trick-or-treat!
 */
export default function Houses() {
    const cauldronGlowRef = useRef<THREE.PointLight>(null);
    const ghostRef = useRef<THREE.Group>(null);
    const spiderEyeRef = useRef<THREE.Mesh>(null);

    const onHouseClick = (houseId: string) => {
        const store = useNeighborhoodStore.getState();
        const house = HOUSES.find((h) => h.id === houseId);
        if (!house) return;

        const currentX = store.playerPos[0];
        const currentZ = store.playerPos[2];
        const dist = Math.hypot(currentX - house.doorPos[0], currentZ - house.doorPos[2]);

        if (dist <= 2.8) {
            neighborhoodAudio.playDoorbell();
            setTimeout(() => {
                neighborhoodAudio.playTreatCollect();
                store.visitHouse(house);
            }, 400);
        } else {
            // Walk toward the house front door
            store.setDestinationTarget([house.doorPos[0], house.doorPos[2]], () => {
                neighborhoodAudio.playDoorbell();
                setTimeout(() => {
                    neighborhoodAudio.playTreatCollect();
                    store.visitHouse(house);
                }, 400);
            });
        }
    };

    const timeRef = useRef(0);

    useFrame((_, delta) => {
        timeRef.current += delta;
        const t = timeRef.current;

        // Bubbling cauldron light flicker
        if (cauldronGlowRef.current) {
            cauldronGlowRef.current.intensity = 2.0 + Math.sin(t * 8) * 0.4 + Math.cos(t * 13) * 0.2;
        }

        // Friendly floating ghost bobbing
        if (ghostRef.current) {
            ghostRef.current.position.y = 1.6 + Math.sin(t * 2.5) * 0.25;
            ghostRef.current.rotation.y = Math.sin(t * 1.5) * 0.3;
        }

        // Glowing spider eyes pulse
        if (spiderEyeRef.current) {
            const eyeMat = spiderEyeRef.current.material as THREE.MeshStandardMaterial;
            eyeMat.emissiveIntensity = 2.0 + Math.sin(t * 4) * 0.8;
        }
    });

    return (
        <group>
            {/* ========================================================
                HOUSE 1: The Blackthorn Manor (West, Z: -26, X: -13.5)
                Silhouette: 3-Story Victorian Gothic, Steep Spire, Violet Stained Glass
               ======================================================== */}
            <group
                position={[-13.5, 0, -26]}
                onClick={(e) => {
                    e.stopPropagation();
                    onHouseClick("house_1");
                }}
            >
                {/* Main Ground Floor Body */}
                <mesh position={[0, 2, 0]}>
                    <boxGeometry args={[7.5, 4, 6.5]} />
                    <meshStandardMaterial color="#382a4d" roughness={0.75} />
                </mesh>

                {/* Second Floor Gabled Tier */}
                <mesh position={[0, 4.8, 0]}>
                    <boxGeometry args={[6.2, 2.5, 5.5]} />
                    <meshStandardMaterial color="#403058" roughness={0.75} />
                </mesh>

                {/* Third Floor Attic Spire Tower */}
                <mesh position={[-1.2, 6.8, 0]}>
                    <boxGeometry args={[3, 2.2, 3]} />
                    <meshStandardMaterial color="#3a2a52" roughness={0.75} />
                </mesh>
                {/* Tower Steep Spire */}
                <mesh position={[-1.2, 9, 0]}>
                    <coneGeometry args={[1.9, 3.2, 4]} />
                    <meshStandardMaterial color="#241738" roughness={0.5} />
                </mesh>

                {/* Main Steep Gabled Roof */}
                <mesh position={[1, 6.8, 0]} rotation={[0, 0, -0.4]}>
                    <boxGeometry args={[4.5, 0.4, 6.8]} />
                    <meshStandardMaterial color="#241738" roughness={0.6} />
                </mesh>

                {/* Tall Gothic Chimney */}
                <mesh position={[2.4, 7.8, -1.8]}>
                    <boxGeometry args={[0.7, 4.2, 0.7]} />
                    <meshStandardMaterial color="#322244" roughness={0.8} />
                </mesh>

                {/* Covered Front Porch */}
                <mesh position={[3.6, 0.25, 0]}>
                    <boxGeometry args={[1.5, 0.5, 3.5]} />
                    <meshStandardMaterial color="#302444" />
                </mesh>
                {/* Porch Columns */}
                <mesh position={[4.1, 1.4, -1.5]}>
                    <cylinderGeometry args={[0.08, 0.08, 2.3, 6]} />
                    <meshStandardMaterial color="#4c3866" />
                </mesh>
                <mesh position={[4.1, 1.4, 1.5]}>
                    <cylinderGeometry args={[0.08, 0.08, 2.3, 6]} />
                    <meshStandardMaterial color="#4c3866" />
                </mesh>
                {/* Porch Roof */}
                <mesh position={[3.6, 2.7, 0]} rotation={[0, 0, 0.2]}>
                    <boxGeometry args={[1.7, 0.2, 3.8]} />
                    <meshStandardMaterial color="#241738" />
                </mesh>

                {/* Gothic Arched Front Door */}
                <mesh position={[3.65, 1.3, 0]}>
                    <boxGeometry args={[0.1, 2.2, 1.2]} />
                    <meshStandardMaterial color="#421a5e" roughness={0.5} />
                </mesh>

                {/* Glowing Violet Stained Glass Windows */}
                <mesh position={[3.8, 2.2, -1.8]}>
                    <planeGeometry args={[0.8, 1.4]} />
                    <meshStandardMaterial
                        color="#B875FF"
                        emissive="#9B5CFF"
                        emissiveIntensity={2.5}
                    />
                </mesh>
                <mesh position={[3.8, 2.2, 1.8]}>
                    <planeGeometry args={[0.8, 1.4]} />
                    <meshStandardMaterial
                        color="#B875FF"
                        emissive="#9B5CFF"
                        emissiveIntensity={2.5}
                    />
                </mesh>
                <mesh position={[3.15, 4.8, 0]}>
                    <planeGeometry args={[1.0, 1.2]} />
                    <meshStandardMaterial
                        color="#D4A0FF"
                        emissive="#9B5CFF"
                        emissiveIntensity={2.2}
                    />
                </mesh>

                {/* Warm Porch Lantern Light */}
                <pointLight
                    position={[3.8, 2.2, 0]}
                    color="#D896FF"
                    intensity={2.6}
                    distance={11}
                    decay={2}
                />
            </group>

            {/* ========================================================
                HOUSE 2: Stingy Jack's Pumpkin Roost (West, Z: -10, X: -13)
                Silhouette: Cozy Weathered Orange Wood, Cascading Jack-o'-Lanterns
               ======================================================== */}
            <group
                position={[-13, 0, -10]}
                onClick={(e) => {
                    e.stopPropagation();
                    onHouseClick("house_2");
                }}
            >
                {/* House Body */}
                <mesh position={[0, 1.8, 0]}>
                    <boxGeometry args={[7, 3.6, 6]} />
                    <meshStandardMaterial color="#542e12" roughness={0.9} />
                </mesh>

                {/* Cozy Shingle Roof */}
                <mesh position={[0, 4.3, 0]} rotation={[0, Math.PI / 4, 0]}>
                    <coneGeometry args={[4.8, 2.2, 4]} />
                    <meshStandardMaterial color="#2c1a0e" roughness={0.8} />
                </mesh>

                {/* Brick Chimney */}
                <mesh position={[-1.8, 4.8, 1.5]}>
                    <boxGeometry args={[0.8, 2.6, 0.8]} />
                    <meshStandardMaterial color="#4a2214" roughness={0.9} />
                </mesh>

                {/* Wide Rustic Porch */}
                <mesh position={[3.3, 0.2, 0]}>
                    <boxGeometry args={[1.6, 0.4, 4.6]} />
                    <meshStandardMaterial color="#381e0c" />
                </mesh>
                {/* Porch Posts */}
                {[-1.9, 0, 1.9].map((pz, idx) => (
                    <mesh key={idx} position={[3.8, 1.4, pz]}>
                        <boxGeometry args={[0.15, 2.2, 0.15]} />
                        <meshStandardMaterial color="#381e0c" />
                    </mesh>
                ))}
                {/* Porch Overhang */}
                <mesh position={[3.3, 2.6, 0]} rotation={[0, 0, 0.15]}>
                    <boxGeometry args={[1.8, 0.2, 5]} />
                    <meshStandardMaterial color="#221206" />
                </mesh>

                {/* Wooden Front Door */}
                <mesh position={[3.45, 1.2, 0]}>
                    <boxGeometry args={[0.08, 2.0, 1.1]} />
                    <meshStandardMaterial color="#733b13" />
                </mesh>

                {/* Warm Amber Glowing Multi-Pane Windows */}
                <mesh position={[3.55, 1.8, -1.8]}>
                    <planeGeometry args={[1.1, 1.1]} />
                    <meshStandardMaterial
                        color="#FFAA22"
                        emissive="#FF8811"
                        emissiveIntensity={2.0}
                    />
                </mesh>
                <mesh position={[3.55, 1.8, 1.8]}>
                    <planeGeometry args={[1.1, 1.1]} />
                    <meshStandardMaterial
                        color="#FFAA22"
                        emissive="#FF8811"
                        emissiveIntensity={2.0}
                    />
                </mesh>

                {/* Stack of Jack-o'-lanterns on the Porch */}
                <group position={[3.8, 0.5, 1.4]}>
                    <mesh scale={[1, 0.75, 1]}>
                        <sphereGeometry args={[0.32, 8, 6]} />
                        <meshStandardMaterial color="#E86010" />
                    </mesh>
                    <mesh position={[0, 0.38, 0]} scale={[0.8, 0.6, 0.8]}>
                        <sphereGeometry args={[0.25, 8, 6]} />
                        <meshStandardMaterial color="#E86010" />
                    </mesh>
                    <mesh position={[0, 0.68, 0]} scale={[0.6, 0.5, 0.6]}>
                        <sphereGeometry args={[0.2, 8, 6]} />
                        <meshStandardMaterial color="#E86010" />
                    </mesh>
                </group>

                {/* Warm Amber Porch Light */}
                <pointLight
                    position={[3.5, 2.1, 0]}
                    color="#FF8811"
                    intensity={2.0}
                    distance={9}
                    decay={2}
                />
            </group>

            {/* ========================================================
                HOUSE 3: The Witch's Cottage (West, Z: +10, X: -13)
                Silhouette: Crooked Bent Chimney, Thatched Roof, Bubbling Cauldron
               ======================================================== */}
            <group
                position={[-13, 0, 10]}
                onClick={(e) => {
                    e.stopPropagation();
                    onHouseClick("house_3");
                }}
            >
                {/* Main Asymmetrical Walls */}
                <mesh position={[0, 1.7, 0]} rotation={[0, 0.05, 0]}>
                    <boxGeometry args={[6.8, 3.4, 5.8]} />
                    <meshStandardMaterial color="#2d4834" roughness={0.8} />
                </mesh>

                {/* Crooked Sagging Thatched Roof */}
                <mesh position={[0.2, 4.2, 0]} rotation={[0.08, Math.PI / 4, -0.1]}>
                    <coneGeometry args={[4.7, 2.8, 4]} />
                    <meshStandardMaterial color="#3e2850" roughness={0.85} />
                </mesh>

                {/* Bent Twisted Stone Chimney */}
                <mesh position={[-1.5, 3.6, -1.4]} rotation={[0, 0, 0.15]}>
                    <boxGeometry args={[0.8, 2.5, 0.8]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
                <mesh position={[-1.2, 5.2, -1.4]} rotation={[0, 0, -0.2]}>
                    <boxGeometry args={[0.7, 1.8, 0.7]} />
                    <meshStandardMaterial color="#2a2a2a" />
                </mesh>

                {/* Crooked Front Porch */}
                <mesh position={[3.3, 0.2, 0]}>
                    <boxGeometry args={[1.5, 0.4, 3.6]} />
                    <meshStandardMaterial color="#30241c" />
                </mesh>
                <mesh position={[3.8, 1.4, -1.4]} rotation={[0.05, 0, 0.1]}>
                    <cylinderGeometry args={[0.07, 0.1, 2.3, 5]} />
                    <meshStandardMaterial color="#3d2c20" />
                </mesh>
                <mesh position={[3.8, 1.4, 1.4]} rotation={[-0.05, 0, -0.1]}>
                    <cylinderGeometry args={[0.07, 0.1, 2.3, 5]} />
                    <meshStandardMaterial color="#3d2c20" />
                </mesh>

                {/* Cottage Door with Crescent Moon Cutout */}
                <mesh position={[3.45, 1.2, 0]}>
                    <boxGeometry args={[0.08, 2.0, 1.0]} />
                    <meshStandardMaterial color="#4a245e" />
                </mesh>

                {/* Bubbling Witch's Cauldron on the Porch */}
                <group position={[3.6, 0.5, 1.2]}>
                    {/* Iron Pot */}
                    <mesh>
                        <sphereGeometry args={[0.35, 12, 10]} />
                        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
                    </mesh>
                    {/* Green Glowing Potion Liquid Surface */}
                    <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <circleGeometry args={[0.28, 16]} />
                        <meshStandardMaterial
                            color="#4ADE80"
                            emissive="#22C55E"
                            emissiveIntensity={2.8}
                        />
                    </mesh>
                    {/* Emerald Cauldron Light */}
                    <pointLight
                        ref={cauldronGlowRef}
                        position={[0, 0.35, 0]}
                        color="#4ADE80"
                        intensity={2.2}
                        distance={8}
                        decay={2}
                    />
                </group>

                {/* Propped Witch's Broomstick */}
                <group position={[3.6, 0.8, -1.2]} rotation={[0.2, 0, 0.2]}>
                    <mesh position={[0, 0.6, 0]}>
                        <cylinderGeometry args={[0.03, 0.03, 1.4, 5]} />
                        <meshStandardMaterial color="#6e4624" />
                    </mesh>
                    <mesh position={[0, 0.1, 0]}>
                        <coneGeometry args={[0.15, 0.4, 6]} />
                        <meshStandardMaterial color="#9e7c42" />
                    </mesh>
                </group>

                {/* Glowing Emerald Windows */}
                <mesh position={[3.5, 1.8, -1.6]}>
                    <planeGeometry args={[0.9, 0.9]} />
                    <meshStandardMaterial
                        color="#4ADE80"
                        emissive="#22C55E"
                        emissiveIntensity={2.4}
                    />
                </mesh>

                {/* Witch Porch Light */}
                <pointLight
                    position={[3.5, 2.2, 0]}
                    color="#4ADE80"
                    intensity={2.2}
                    distance={10}
                    decay={2}
                />
            </group>

            {/* ========================================================
                HOUSE 4: The Sweet Tooth Bakehouse (West, Z: +26, X: -13)
                Silhouette: Gingerbread Gothic, Candy-Corn Pillars, Giant Lollipops
               ======================================================== */}
            <group
                position={[-13, 0, 26]}
                onClick={(e) => {
                    e.stopPropagation();
                    onHouseClick("house_4");
                }}
            >
                {/* Body */}
                <mesh position={[0, 1.9, 0]}>
                    <boxGeometry args={[7.2, 3.8, 6.2]} />
                    <meshStandardMaterial color="#4a2511" roughness={0.7} />
                </mesh>

                {/* Roof with White Frosting Trim */}
                <mesh position={[0, 4.4, 0]} rotation={[0, Math.PI / 4, 0]}>
                    <coneGeometry args={[4.9, 2.4, 4]} />
                    <meshStandardMaterial color="#2d160b" roughness={0.7} />
                </mesh>

                {/* Porch */}
                <mesh position={[3.4, 0.2, 0]}>
                    <boxGeometry args={[1.6, 0.4, 4.6]} />
                    <meshStandardMaterial color="#361a0c" />
                </mesh>

                {/* Candy-Corn Striped Porch Columns */}
                {[-1.8, 1.8].map((pz, i) => (
                    <group key={i} position={[3.9, 1.4, pz]}>
                        <mesh position={[0, -0.6, 0]}>
                            <cylinderGeometry args={[0.12, 0.12, 0.7, 8]} />
                            <meshStandardMaterial color="#FF7518" />
                        </mesh>
                        <mesh position={[0, 0, 0]}>
                            <cylinderGeometry args={[0.12, 0.12, 0.7, 8]} />
                            <meshStandardMaterial color="#FFD166" />
                        </mesh>
                        <mesh position={[0, 0.6, 0]}>
                            <cylinderGeometry args={[0.12, 0.12, 0.7, 8]} />
                            <meshStandardMaterial color="#FFFFFF" />
                        </mesh>
                    </group>
                ))}

                {/* Giant Glowing Swirl Lollipops in Front Yard */}
                {[-2.8, 2.8].map((lz, idx) => (
                    <group key={idx} position={[4.6, 0, lz]}>
                        <mesh position={[0, 0.9, 0]}>
                            <cylinderGeometry args={[0.04, 0.04, 1.8, 6]} />
                            <meshStandardMaterial color="#EEE" />
                        </mesh>
                        <mesh position={[0, 1.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.45, 0.45, 0.12, 16]} />
                            <meshStandardMaterial
                                color={idx === 0 ? "#FF7518" : "#9B5CFF"}
                                emissive={idx === 0 ? "#FF5500" : "#7B2CBF"}
                                emissiveIntensity={1.4}
                            />
                        </mesh>
                    </group>
                ))}

                {/* Golden Bakery Windows */}
                <mesh position={[3.65, 1.8, -1.6]}>
                    <planeGeometry args={[1.2, 1.2]} />
                    <meshStandardMaterial
                        color="#FFE066"
                        emissive="#FFB703"
                        emissiveIntensity={2.0}
                    />
                </mesh>
                <mesh position={[3.65, 1.8, 1.6]}>
                    <planeGeometry args={[1.2, 1.2]} />
                    <meshStandardMaterial
                        color="#FFE066"
                        emissive="#FFB703"
                        emissiveIntensity={2.0}
                    />
                </mesh>

                {/* Golden Warm Porch Light */}
                <pointLight
                    position={[3.6, 2.2, 0]}
                    color="#FFB703"
                    intensity={1.8}
                    distance={8}
                    decay={2}
                />
            </group>

            {/* ========================================================
                HOUSE 5: The Cryptkeeper's Lodge (East, Z: -26, X: +13.5)
                Silhouette: Ancient Granite Blocks, Stone Crenellations, Gargoyles
               ======================================================== */}
            <group
                position={[13.5, 0, -26]}
                onClick={(e) => {
                    e.stopPropagation();
                    onHouseClick("house_5");
                }}
            >
                {/* Heavy Stone Masonry Body */}
                <mesh position={[0, 2, 0]}>
                    <boxGeometry args={[7.5, 4, 6.5]} />
                    <meshStandardMaterial color="#3c3e4a" roughness={0.8} />
                </mesh>

                {/* Stone Battlement / Crenellated Flat Roof */}
                <mesh position={[0, 4.2, 0]}>
                    <boxGeometry args={[7.9, 0.5, 6.9]} />
                    <meshStandardMaterial color="#2c2e38" roughness={0.7} />
                </mesh>
                {/* Crenellation teeth */}
                {[-3.2, -1.6, 0, 1.6, 3.2].map((tx, idx) => (
                    <mesh key={idx} position={[tx, 4.65, 3.3]}>
                        <boxGeometry args={[0.7, 0.5, 0.3]} />
                        <meshStandardMaterial color="#2c2e38" />
                    </mesh>
                ))}

                {/* Heavy Iron-Banded Doorway */}
                <mesh position={[-3.65, 1.3, 0]}>
                    <boxGeometry args={[0.1, 2.3, 1.3]} />
                    <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
                </mesh>

                {/* Gargoyle Perches */}
                {[-2.2, 2.2].map((gz, i) => (
                    <group key={i} position={[-3.8, 3.6, gz]}>
                        <mesh>
                            <boxGeometry args={[0.5, 0.5, 0.5]} />
                            <meshStandardMaterial color="#2e303a" />
                        </mesh>
                    </group>
                ))}

                {/* Spectral Cyan Glowing Slit Windows */}
                <mesh position={[-3.8, 2.2, -1.8]} rotation={[0, Math.PI, 0]}>
                    <planeGeometry args={[0.4, 1.6]} />
                    <meshStandardMaterial
                        color="#38BDF8"
                        emissive="#0284C7"
                        emissiveIntensity={2.5}
                    />
                </mesh>
                <mesh position={[-3.8, 2.2, 1.8]} rotation={[0, Math.PI, 0]}>
                    <planeGeometry args={[0.4, 1.6]} />
                    <meshStandardMaterial
                        color="#38BDF8"
                        emissive="#0284C7"
                        emissiveIntensity={2.5}
                    />
                </mesh>

                {/* Eerie Cyan Lantern Light */}
                <pointLight
                    position={[-3.8, 2.4, 0]}
                    color="#38BDF8"
                    intensity={2.6}
                    distance={11}
                    decay={2}
                />
            </group>

            {/* ========================================================
                HOUSE 6: The Cobweb Villa (East, Z: -10, X: +13)
                Silhouette: Weathered Columns, Giant Webs, Glowing Red Spider Eyes
               ======================================================== */}
            <group
                position={[13, 0, -10]}
                onClick={(e) => {
                    e.stopPropagation();
                    onHouseClick("house_6");
                }}
            >
                {/* Main Body */}
                <mesh position={[0, 1.9, 0]}>
                    <boxGeometry args={[7, 3.8, 6]} />
                    <meshStandardMaterial color="#364452" roughness={0.75} />
                </mesh>

                {/* Mansard Gabled Roof */}
                <mesh position={[0, 4.3, 0]} rotation={[0, Math.PI / 4, 0]}>
                    <coneGeometry args={[4.8, 2.3, 4]} />
                    <meshStandardMaterial color="#26333f" roughness={0.65} />
                </mesh>

                {/* Grand Porch with Tall Weathered White Pillars */}
                <mesh position={[-3.3, 0.2, 0]}>
                    <boxGeometry args={[1.5, 0.4, 4.8]} />
                    <meshStandardMaterial color="#26323c" />
                </mesh>
                {[-1.9, -0.6, 0.6, 1.9].map((pz, idx) => (
                    <mesh key={idx} position={[-3.8, 1.6, pz]}>
                        <cylinderGeometry args={[0.09, 0.1, 2.8, 8]} />
                        <meshStandardMaterial color="#e5e7eb" roughness={0.6} />
                    </mesh>
                ))}
                {/* Porch Pediment */}
                <mesh position={[-3.3, 3.1, 0]}>
                    <boxGeometry args={[1.6, 0.3, 5]} />
                    <meshStandardMaterial color="#26333f" />
                </mesh>

                {/* Giant Cobweb Draped Across Porch Header */}
                <mesh position={[-3.5, 2.6, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <planeGeometry args={[3.8, 1.2]} />
                    <meshBasicMaterial
                        color="#E2E8F0"
                        transparent
                        opacity={0.45}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Giant Spider Silhouette above door */}
                <group position={[-3.6, 2.7, 0]}>
                    <mesh>
                        <sphereGeometry args={[0.22, 8, 6]} />
                        <meshStandardMaterial color="#111" />
                    </mesh>
                    {/* Glowing Red Eyes */}
                    <mesh ref={spiderEyeRef} position={[-0.18, 0.05, -0.06]}>
                        <sphereGeometry args={[0.04, 6, 6]} />
                        <meshStandardMaterial
                            color="#EF4444"
                            emissive="#EF4444"
                            emissiveIntensity={2.8}
                        />
                    </mesh>
                    <mesh position={[-0.18, 0.05, 0.06]}>
                        <sphereGeometry args={[0.04, 6, 6]} />
                        <meshStandardMaterial
                            color="#EF4444"
                            emissive="#EF4444"
                            emissiveIntensity={2.8}
                        />
                    </mesh>
                </group>

                {/* Windows */}
                <mesh position={[-3.55, 1.8, -1.6]} rotation={[0, Math.PI, 0]}>
                    <planeGeometry args={[1.0, 1.2]} />
                    <meshStandardMaterial
                        color="#67E8F9"
                        emissive="#06B6D4"
                        emissiveIntensity={2.0}
                    />
                </mesh>
                <mesh position={[-3.55, 1.8, 1.6]} rotation={[0, Math.PI, 0]}>
                    <planeGeometry args={[1.0, 1.2]} />
                    <meshStandardMaterial
                        color="#67E8F9"
                        emissive="#06B6D4"
                        emissiveIntensity={2.0}
                    />
                </mesh>

                <pointLight
                    position={[-3.5, 2.2, 0]}
                    color="#67E8F9"
                    intensity={2.6}
                    distance={11}
                    decay={2}
                />
            </group>

            {/* ========================================================
                HOUSE 7: The Vampire's Chateau (East, Z: +10, X: +13)
                Silhouette: Twin Spired Chateau, Crimson Velvet, Bat Crest
               ======================================================== */}
            <group
                position={[13, 0, 10]}
                onClick={(e) => {
                    e.stopPropagation();
                    onHouseClick("house_7");
                }}
            >
                {/* Main Body */}
                <mesh position={[0, 2.1, 0]}>
                    <boxGeometry args={[7, 4.2, 6]} />
                    <meshStandardMaterial color="#3e2530" roughness={0.75} />
                </mesh>

                {/* Twin Pointed Spires */}
                <mesh position={[-2.2, 5.8, -1.8]}>
                    <coneGeometry args={[1.2, 3.2, 4]} />
                    <meshStandardMaterial color="#28141e" />
                </mesh>
                <mesh position={[-2.2, 5.8, 1.8]}>
                    <coneGeometry args={[1.2, 3.2, 4]} />
                    <meshStandardMaterial color="#28141e" />
                </mesh>

                {/* Center Gable */}
                <mesh position={[0, 4.8, 0]} rotation={[0, Math.PI / 4, 0]}>
                    <coneGeometry args={[4.2, 2.0, 4]} />
                    <meshStandardMaterial color="#28141e" />
                </mesh>

                {/* Balcony Railing */}
                <mesh position={[-3.6, 2.9, 0]}>
                    <boxGeometry args={[0.4, 0.8, 2.4]} />
                    <meshStandardMaterial color="#421d28" metalness={0.7} />
                </mesh>

                {/* Arched Windows with Blood Red Velvet Light */}
                <mesh position={[-3.55, 1.8, -1.6]} rotation={[0, Math.PI, 0]}>
                    <planeGeometry args={[0.9, 1.5]} />
                    <meshStandardMaterial
                        color="#F87171"
                        emissive="#DC2626"
                        emissiveIntensity={2.8}
                    />
                </mesh>
                <mesh position={[-3.55, 1.8, 1.6]} rotation={[0, Math.PI, 0]}>
                    <planeGeometry args={[0.9, 1.5]} />
                    <meshStandardMaterial
                        color="#F87171"
                        emissive="#DC2626"
                        emissiveIntensity={2.8}
                    />
                </mesh>

                {/* Crimson Ruby Porch Light */}
                <pointLight
                    position={[-3.6, 2.1, 0]}
                    color="#F87171"
                    intensity={2.8}
                    distance={11}
                    decay={2}
                />
            </group>

            {/* ========================================================
                HOUSE 8: The Ghost Hunter's Observatory (East, Z: +26, X: +13)
                Silhouette: Brass Dome & Telescope, Glowing Turquoise Runes, Floating Ghost
               ======================================================== */}
            <group
                position={[13, 0, 26]}
                onClick={(e) => {
                    e.stopPropagation();
                    onHouseClick("house_8");
                }}
            >
                {/* Main Body */}
                <mesh position={[0, 1.9, 0]}>
                    <boxGeometry args={[7, 3.8, 6]} />
                    <meshStandardMaterial color="#344256" roughness={0.7} />
                </mesh>

                {/* Roof Base */}
                <mesh position={[0, 3.9, 0]}>
                    <boxGeometry args={[7.2, 0.4, 6.2]} />
                    <meshStandardMaterial color="#45546b" />
                </mesh>

                {/* Brass Observatory Dome */}
                <mesh position={[-0.8, 5.0, 0]}>
                    <sphereGeometry args={[2.0, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.25} />
                </mesh>

                {/* Telescope Barrel poking out into the stars */}
                <mesh position={[-0.8, 6.2, 0]} rotation={[0.4, 0.3, -0.6]}>
                    <cylinderGeometry args={[0.2, 0.28, 3.2, 10]} />
                    <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
                </mesh>

                {/* Glowing Turquoise Rune Circle on Front Lawn */}
                <mesh position={[-4.5, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[1.2, 1.5, 24]} />
                    <meshBasicMaterial
                        color="#22D3EE"
                        transparent
                        opacity={0.8}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Friendly Floating Ghost near entrance */}
                <group ref={ghostRef} position={[-4.2, 1.6, -1.6]}>
                    {/* Head */}
                    <mesh>
                        <sphereGeometry args={[0.28, 12, 10]} />
                        <meshStandardMaterial
                            color="#E0F2FE"
                            emissive="#38BDF8"
                            emissiveIntensity={1.5}
                            transparent
                            opacity={0.9}
                        />
                    </mesh>
                    {/* Ghost Tail / Sheet */}
                    <mesh position={[0, -0.3, 0]}>
                        <coneGeometry args={[0.26, 0.6, 10]} />
                        <meshStandardMaterial
                            color="#E0F2FE"
                            emissive="#38BDF8"
                            emissiveIntensity={1.2}
                            transparent
                            opacity={0.82}
                        />
                    </mesh>
                    {/* Cute Black Eyes */}
                    <mesh position={[-0.22, 0.05, -0.08]}>
                        <sphereGeometry args={[0.04, 6, 6]} />
                        <meshBasicMaterial color="#000" />
                    </mesh>
                    <mesh position={[-0.22, 0.05, 0.08]}>
                        <sphereGeometry args={[0.04, 6, 6]} />
                        <meshBasicMaterial color="#000" />
                    </mesh>
                </group>

                {/* Turquoise Windows */}
                <mesh position={[-3.55, 1.8, -1.6]} rotation={[0, Math.PI, 0]}>
                    <planeGeometry args={[1.0, 1.2]} />
                    <meshStandardMaterial
                        color="#22D3EE"
                        emissive="#06B6D4"
                        emissiveIntensity={2.5}
                    />
                </mesh>

                {/* Observatory Light */}
                <pointLight
                    position={[-3.6, 2.2, 0]}
                    color="#22D3EE"
                    intensity={2.6}
                    distance={11}
                    decay={2}
                />
            </group>
        </group>
    );
}
