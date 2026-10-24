"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Large luminous moon with pulsing glow halo */
export default function Moon() {
    const glowRef = useRef<THREE.Mesh>(null);
    const timeRef = useRef(0);

    useFrame((_, delta) => {
        timeRef.current += delta;
        if (glowRef.current) {
            const s = 1 + Math.sin(timeRef.current * 0.5) * 0.04;
            glowRef.current.scale.setScalar(s);
        }
    });

    return (
        <group position={[10, 10, -20]}>
            {/* Luminous corona glow halo (behind) */}
            <mesh ref={glowRef} position={[0, 0, -0.1]}>
                <circleGeometry args={[4.2, 32]} />
                <meshBasicMaterial
                    color="#FFE88C"
                    transparent
                    opacity={0.24}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Moon disc */}
            <mesh>
                <circleGeometry args={[2.4, 32]} />
                <meshStandardMaterial
                    color="#FFF8E0"
                    emissive="#FFECA0"
                    emissiveIntensity={1.35}
                    roughness={0.8}
                    metalness={0}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Crater hints — small darker circles */}
            <mesh position={[-0.4, 0.3, 0.02]}>
                <circleGeometry args={[0.38, 16]} />
                <meshBasicMaterial color="#E0CD94" side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0.6, -0.5, 0.02]}>
                <circleGeometry args={[0.28, 16]} />
                <meshBasicMaterial color="#E0CD94" side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}
