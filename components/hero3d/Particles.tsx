"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Atmospheric firefly / dust particles */
export default function Particles({
    count = 150,
    disabled = false,
}: {
    count?: number;
    disabled?: boolean;
}) {
    const ref = useRef<THREE.Points>(null);
    const timeRef = useRef(0);

    const { positions, sizes, baseY } = useMemo(() => {
        const p = new Float32Array(count * 3);
        const s = new Float32Array(count);
        const bY = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 40;
            p[i * 3 + 1] = Math.random() * 12 + 0.5;
            p[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
            s[i] = Math.random() * 0.06 + 0.02;
            bY[i] = p[i * 3 + 1];
        }
        return { positions: p, sizes: s, baseY: bY };
    }, [count]);

    useFrame((_, delta) => {
        if (disabled || !ref.current) return;
        timeRef.current += delta;
        const t = timeRef.current;

        const geo = ref.current.geometry;
        const pos = geo.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
            pos[i * 3 + 1] = baseY[i] + Math.sin(t * 0.3 + i * 1.7) * 0.4;
        }
        geo.attributes.position.needsUpdate = true;

        // Subtle opacity oscillation via material
        const mat = ref.current.material as THREE.PointsMaterial;
        mat.opacity = 0.55 + Math.sin(t * 0.5) * 0.15;
    });

    if (disabled) return null;

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={count}
                />
                <bufferAttribute
                    attach="attributes-size"
                    args={[sizes, 1]}
                    count={count}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#FFD166"
                size={0.08}
                sizeAttenuation
                transparent
                opacity={0.65}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
