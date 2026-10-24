"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Streetlight positions along both sidewalks
const STREETLIGHTS: [number, number, number][] = [
    [-4.5, 0, -32],
    [-4.5, 0, -18],
    [-4.5, 0, -6],
    [-4.5, 0, 6],
    [-4.5, 0, 18],
    [-4.5, 0, 32],

    [4.5, 0, -32],
    [4.5, 0, -18],
    [4.5, 0, -6],
    [4.5, 0, 6],
    [4.5, 0, 18],
    [4.5, 0, 32],
];

// Glowing Jack-o'-lantern placements
const PUMPKINS: { pos: [number, number, number]; scale: number; rotY: number }[] = [
    // Near houses front walkways
    { pos: [-5.8, 0.25, -27], scale: 1.1, rotY: 0.4 },
    { pos: [-5.8, 0.25, -25], scale: 0.9, rotY: -0.2 },
    { pos: [-5.8, 0.25, -11], scale: 1.2, rotY: 0.1 },
    { pos: [-5.8, 0.25, -9], scale: 0.85, rotY: 0.6 },
    { pos: [-5.8, 0.25, 9], scale: 1.0, rotY: -0.5 },
    { pos: [-5.8, 0.25, 11], scale: 1.15, rotY: 0.3 },
    { pos: [-5.8, 0.25, 25], scale: 0.9, rotY: 0.2 },
    { pos: [-5.8, 0.25, 27], scale: 1.05, rotY: -0.4 },

    { pos: [5.8, 0.25, -27], scale: 1.1, rotY: -0.3 },
    { pos: [5.8, 0.25, -25], scale: 0.85, rotY: 0.5 },
    { pos: [5.8, 0.25, -11], scale: 1.0, rotY: -0.1 },
    { pos: [5.8, 0.25, -9], scale: 1.25, rotY: 0.4 },
    { pos: [5.8, 0.25, 9], scale: 0.95, rotY: -0.6 },
    { pos: [5.8, 0.25, 11], scale: 1.1, rotY: 0.2 },
    { pos: [5.8, 0.25, 25], scale: 1.2, rotY: -0.2 },
    { pos: [5.8, 0.25, 27], scale: 0.85, rotY: 0.3 },

    // Park entrance and party area
    { pos: [-3.2, 0.25, -34], scale: 1.2, rotY: 0.2 },
    { pos: [3.2, 0.25, -34], scale: 1.15, rotY: -0.3 },
    { pos: [-2.2, 0.25, -3], scale: 0.9, rotY: 0.6 },
    { pos: [2.2, 0.25, 3], scale: 0.9, rotY: -0.4 },
    { pos: [-3.0, 0.25, 3], scale: 1.0, rotY: 0.1 },
    { pos: [3.0, 0.25, -3], scale: 1.05, rotY: -0.2 },
];

// Mailbox positions (one near each house walkway)
const MAILBOXES: [number, number, number, number][] = [
    // [x, z, rotY, houseNumber]
    [-5.6, -24.8, Math.PI / 2, 1],
    [-5.6, -8.8, Math.PI / 2, 2],
    [-5.6, 11.2, Math.PI / 2, 3],
    [-5.6, 27.2, Math.PI / 2, 4],

    [5.6, -24.8, -Math.PI / 2, 5],
    [5.6, -8.8, -Math.PI / 2, 6],
    [5.6, 11.2, -Math.PI / 2, 7],
    [5.6, 27.2, -Math.PI / 2, 8],
];

// Spooky gnarled trees scattered around yards and borders
const TREES: [number, number, number, number][] = [
    // [x, z, scale, rotY]
    [-8, -18, 1.2, 0.3],
    [-8, 18, 1.1, -0.5],
    [-22, -34, 1.4, 0.8],
    [-22, -18, 1.3, -0.2],
    [-22, 18, 1.3, 0.6],
    [-22, 34, 1.4, -0.4],

    [8, -18, 1.1, -0.3],
    [8, 18, 1.2, 0.4],
    [22, -34, 1.4, -0.7],
    [22, -18, 1.3, 0.3],
    [22, 18, 1.3, -0.5],
    [22, 34, 1.4, 0.2],
];

/**
 * Streetlights, glowing carved jack-o'-lanterns, mailboxes,
 * front yard fences, spooky trees, and flying night bats.
 */
export default function Decorations() {
    const batsGroupRef = useRef<THREE.Group>(null);
    const pumpkinFlickerRef = useRef<THREE.Group>(null);

    // Flying bats trajectory data
    const batData = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => ({
            radiusX: 8 + (i % 3) * 4,
            radiusZ: 14 + (i % 4) * 5,
            speed: 0.35 + (i * 0.05),
            offset: (i / 8) * Math.PI * 2,
            baseY: 9 + (i % 3) * 2,
        }));
    }, []);

    const timeRef = useRef(0);

    useFrame((_, delta) => {
        timeRef.current += delta;
        const t = timeRef.current;

        // Animated flying bats swooping overhead
        if (batsGroupRef.current) {
            batsGroupRef.current.children.forEach((batMesh, i) => {
                const b = batData[i];
                if (!b) return;
                const angle = t * b.speed + b.offset;
                batMesh.position.x = Math.sin(angle) * b.radiusX;
                batMesh.position.z = Math.cos(angle) * b.radiusZ;
                batMesh.position.y = b.baseY + Math.sin(angle * 3) * 1.5;

                // Wing flap oscillation
                const flap = 0.6 + Math.sin(t * 12 + i) * 0.4;
                batMesh.scale.set(1, flap, 1);
                batMesh.rotation.y = angle + Math.PI / 2;
            });
        }
    });

    return (
        <group>
            {/* ========================================================
                VINTAGE STREETLIGHTS ALONG SIDEWALKS
               ======================================================== */}
            {STREETLIGHTS.map(([x, y, z], idx) => {
                const facing = x < 0 ? 1 : -1;
                return (
                    <group key={`streetlight_${idx}`} position={[x, y, z]}>
                        {/* Base Pedestal */}
                        <mesh position={[0, 0.2, 0]}>
                            <cylinderGeometry args={[0.2, 0.28, 0.4, 8]} />
                            <meshStandardMaterial color="#222030" metalness={0.7} roughness={0.3} />
                        </mesh>
                        {/* Wrought Iron Post */}
                        <mesh position={[0, 1.8, 0]}>
                            <cylinderGeometry args={[0.08, 0.12, 3.2, 8]} />
                            <meshStandardMaterial color="#1e1a2b" metalness={0.7} roughness={0.3} />
                        </mesh>
                        {/* Ornate Curved Top Bracket extending toward street */}
                        <mesh position={[facing * 0.3, 3.4, 0]} rotation={[0, 0, facing * -0.5]}>
                            <cylinderGeometry args={[0.04, 0.05, 0.8, 6]} />
                            <meshStandardMaterial color="#1e1a2b" metalness={0.7} />
                        </mesh>
                        {/* Lantern Housing */}
                        <mesh position={[facing * 0.5, 3.3, 0]}>
                            <boxGeometry args={[0.3, 0.45, 0.3]} />
                            <meshStandardMaterial
                                color="#FFC466"
                                emissive="#FFA826"
                                emissiveIntensity={3.2}
                                transparent
                                opacity={0.94}
                            />
                        </mesh>
                        {/* Point Light (Warm streetlight glow on road, sidewalk and front yards) */}
                        <pointLight
                            position={[facing * 0.5, 3.2, 0]}
                            color="#FFA826"
                            intensity={2.8}
                            distance={14.5}
                            decay={2}
                        />
                    </group>
                );
            })}

            {/* ========================================================
                GLOWING CARVED JACK-O'-LANTERNS
               ======================================================== */}
            <group ref={pumpkinFlickerRef}>
                {PUMPKINS.map((p, i) => (
                    <group
                        key={`pumpkin_${i}`}
                        position={p.pos}
                        scale={[p.scale, p.scale, p.scale]}
                        rotation={[0, p.rotY, 0]}
                    >
                        {/* Squashed Pumpkin Body */}
                        <mesh scale={[1, 0.78, 1]}>
                            <sphereGeometry args={[0.32, 10, 8]} />
                            <meshStandardMaterial color="#E85D04" roughness={0.7} />
                        </mesh>
                        {/* Stem */}
                        <mesh position={[0, 0.28, 0]} rotation={[0.1, 0, 0.1]}>
                            <cylinderGeometry args={[0.03, 0.05, 0.14, 5]} />
                            <meshStandardMaterial color="#38541e" roughness={0.9} />
                        </mesh>
                        {/* Carved Glowing Face */}
                        <mesh position={[0, 0, 0.28]}>
                            <planeGeometry args={[0.24, 0.2]} />
                            <meshStandardMaterial
                                color="#FFDD00"
                                emissive="#FF9E00"
                                emissiveIntensity={2.6}
                                side={THREE.DoubleSide}
                            />
                        </mesh>
                        {/* Candle Flicker Point Light on a subset to keep performance great */}
                        {i % 2 === 0 && (
                            <pointLight
                                position={[0, 0.1, 0.3]}
                                color="#FF9E00"
                                intensity={0.9}
                                distance={3.2}
                                decay={2}
                            />
                        )}
                    </group>
                ))}
            </group>

            {/* ========================================================
                MAILBOXES AT HOUSE DRIVEWAYS
               ======================================================== */}
            {MAILBOXES.map(([x, z, rotY, num], idx) => (
                <group key={`mailbox_${idx}`} position={[x, 0, z]} rotation={[0, rotY, 0]}>
                    {/* Post */}
                    <mesh position={[0, 0.55, 0]}>
                        <cylinderGeometry args={[0.05, 0.05, 1.1, 6]} />
                        <meshStandardMaterial color="#3b2d24" />
                    </mesh>
                    {/* Box */}
                    <mesh position={[0, 1.15, 0.15]}>
                        <boxGeometry args={[0.26, 0.28, 0.5]} />
                        <meshStandardMaterial color="#1a1c23" metalness={0.7} roughness={0.4} />
                    </mesh>
                    {/* Red Flag */}
                    <mesh position={[0.15, 1.25, 0.1]}>
                        <boxGeometry args={[0.02, 0.12, 0.08]} />
                        <meshStandardMaterial color="#EF4444" />
                    </mesh>
                </group>
            ))}

            {/* ========================================================
                SPOOKY GNARLED TREES
               ======================================================== */}
            {TREES.map(([tx, tz, s, rY], idx) => (
                <group key={`tree_${idx}`} position={[tx, 0, tz]} scale={[s, s, s]} rotation={[0, rY, 0]}>
                    {/* Twisted Trunk */}
                    <mesh position={[0, 2.2, 0]}>
                        <cylinderGeometry args={[0.18, 0.38, 4.4, 6]} />
                        <meshStandardMaterial color="#19121d" roughness={0.95} />
                    </mesh>
                    {/* Left Branch */}
                    <mesh position={[-0.8, 3.2, 0]} rotation={[0, 0, 0.7]}>
                        <cylinderGeometry args={[0.08, 0.15, 2.2, 5]} />
                        <meshStandardMaterial color="#19121d" />
                    </mesh>
                    {/* Right Branch */}
                    <mesh position={[0.7, 3.6, 0.3]} rotation={[0.2, 0, -0.6]}>
                        <cylinderGeometry args={[0.07, 0.14, 2.0, 5]} />
                        <meshStandardMaterial color="#19121d" />
                    </mesh>
                </group>
            ))}

            {/* ========================================================
                ANIMATED FLYING BATS IN NIGHT SKY
               ======================================================== */}
            <group ref={batsGroupRef}>
                {batData.map((_, i) => (
                    <group key={`bat_${i}`}>
                        {/* Bat Body */}
                        <mesh>
                            <sphereGeometry args={[0.14, 6, 6]} />
                            <meshBasicMaterial color="#08030c" />
                        </mesh>
                        {/* Left Wing */}
                        <mesh position={[-0.32, 0, 0]} rotation={[0, 0, 0.3]}>
                            <planeGeometry args={[0.5, 0.25]} />
                            <meshBasicMaterial color="#12061e" side={THREE.DoubleSide} />
                        </mesh>
                        {/* Right Wing */}
                        <mesh position={[0.32, 0, 0]} rotation={[0, 0, -0.3]}>
                            <planeGeometry args={[0.5, 0.25]} />
                            <meshBasicMaterial color="#12061e" side={THREE.DoubleSide} />
                        </mesh>
                    </group>
                ))}
            </group>
        </group>
    );
}
