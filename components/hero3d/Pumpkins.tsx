"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PUMPKIN_POSITIONS: [number, number, number][] = [
    [-2, 0.35, 1],
    [1.5, 0.35, 0],
    [-0.5, 0.35, -3],
    [3, 0.35, -5],
    [-3.5, 0.35, -7],
];

function Pumpkin({ position }: { position: [number, number, number] }) {
    const glowRef = useRef<THREE.PointLight>(null);
    const timeRef = useRef(0);

    useFrame((_, delta) => {
        timeRef.current += delta;
        if (glowRef.current) {
            glowRef.current.intensity =
                1.4 + Math.sin(timeRef.current * 2.5 + position[0] * 3) * 0.4;
        }
    });

    return (
        <group position={position}>
            {/* Body — squashed sphere */}
            <mesh scale={[1, 0.75, 1]}>
                <sphereGeometry args={[0.38, 12, 10]} />
                <meshStandardMaterial
                    color="#F06510"
                    roughness={0.65}
                />
            </mesh>

            {/* Stem */}
            <mesh position={[0, 0.32, 0]}>
                <cylinderGeometry args={[0.04, 0.06, 0.16, 5]} />
                <meshLambertMaterial color="#3a5a20" />
            </mesh>

            {/* Carved face glow — emissive front */}
            <mesh position={[0, -0.02, 0.3]}>
                <planeGeometry args={[0.22, 0.16]} />
                <meshStandardMaterial
                    color="#FFAA22"
                    emissive="#FF7518"
                    emissiveIntensity={2.8}
                    transparent
                    opacity={0.95}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Eyes */}
            <mesh position={[-0.1, 0.09, 0.32]}>
                <planeGeometry args={[0.08, 0.06]} />
                <meshStandardMaterial
                    color="#FFDD00"
                    emissive="#FFB700"
                    emissiveIntensity={3.0}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <mesh position={[0.1, 0.09, 0.32]}>
                <planeGeometry args={[0.08, 0.06]} />
                <meshStandardMaterial
                    color="#FFDD00"
                    emissive="#FFB700"
                    emissiveIntensity={3.0}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Point light for candle glow */}
            <pointLight
                ref={glowRef}
                position={[0, 0.1, 0.32]}
                intensity={1.4}
                distance={3.8}
                decay={2}
                color="#FFA033"
            />
        </group>
    );
}

/** Glowing jack-o-lanterns along the path */
export default function Pumpkins() {
    return (
        <group>
            {PUMPKIN_POSITIONS.map((pos, i) => (
                <Pumpkin key={i} position={pos} />
            ))}
        </group>
    );
}
