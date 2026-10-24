"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BatData {
    offset: number;
    speed: number;
    radiusX: number;
    radiusY: number;
    baseY: number;
    baseZ: number;
}

/** Animated flying bats near the moon */
export default function Bats({ count = 6 }: { count?: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const timeRef = useRef(0);

    const bats = useMemo<BatData[]>(() => {
        return Array.from({ length: count }, (_, i) => ({
            offset: (i / count) * Math.PI * 2,
            speed: 0.3 + Math.random() * 0.2,
            radiusX: 3 + Math.random() * 4,
            radiusY: 1 + Math.random() * 2,
            baseY: 7 + Math.random() * 4,
            baseZ: -12 - Math.random() * 8,
        }));
    }, [count]);

    useFrame((_, delta) => {
        if (!groupRef.current) return;
        timeRef.current += delta;
        const t = timeRef.current;

        groupRef.current.children.forEach((child, i) => {
            const bat = bats[i];
            if (!bat) return;
            // Figure-8 flight path
            const angle = t * bat.speed + bat.offset;
            child.position.x = Math.sin(angle) * bat.radiusX;
            child.position.y = bat.baseY + Math.sin(angle * 2) * bat.radiusY;
            child.position.z = bat.baseZ + Math.cos(angle) * 2;

            // Wing flap via Y-scale oscillation
            const wingFlap = 0.7 + Math.sin(t * 8 + i) * 0.3;
            child.scale.set(1, wingFlap, 1);

            // Face direction of movement
            child.rotation.y = angle + Math.PI / 2;
        });
    });

    return (
        <group ref={groupRef}>
            {bats.map((_, i) => (
                <group key={i}>
                    {/* Body */}
                    <mesh>
                        <sphereGeometry args={[0.12, 4, 4]} />
                        <meshBasicMaterial color="#1a1228" />
                    </mesh>
                    {/* Left wing */}
                    <mesh position={[-0.25, 0, 0]} rotation={[0, 0, 0.3]}>
                        <planeGeometry args={[0.4, 0.2]} />
                        <meshBasicMaterial
                            color="#221834"
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                    {/* Right wing */}
                    <mesh position={[0.25, 0, 0]} rotation={[0, 0, -0.3]}>
                        <planeGeometry args={[0.4, 0.2]} />
                        <meshBasicMaterial
                            color="#221834"
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                </group>
            ))}
        </group>
    );
}
