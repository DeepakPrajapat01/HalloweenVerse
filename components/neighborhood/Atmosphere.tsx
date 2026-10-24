"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Stars } from "@react-three/drei";

/**
 * Atmospheric lighting, sky dome, moon, stars, and fog for the night neighborhood.
 * Stylized indie-game aesthetic: deep blue-purple night tones, visible architecture, and warm ambient illumination.
 */
export default function Atmosphere() {
    const moonGlowRef = useRef<THREE.Mesh>(null);
    const cloudsRef = useRef<THREE.Group>(null);
    const timeRef = useRef(0);

    // Sky shader gradient
    const skyMat = useMemo(() => {
        return new THREE.ShaderMaterial({
            side: THREE.BackSide,
            depthWrite: false,
            uniforms: {
                topColor: { value: new THREE.Color("#080514") },
                horizonColor: { value: new THREE.Color("#180f35") },
                offset: { value: 15 },
                exponent: { value: 0.5 },
            },
            vertexShader: `
                varying vec3 vWorldPosition;
                void main() {
                    vec4 worldPos = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPos.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 topColor;
                uniform vec3 horizonColor;
                uniform float offset;
                uniform float exponent;
                varying vec3 vWorldPosition;
                void main() {
                    float h = normalize(vWorldPosition + offset).y;
                    gl_FragColor = vec4(mix(horizonColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
                }
            `,
        });
    }, []);

    useFrame((_, delta) => {
        timeRef.current += delta;
        const t = timeRef.current;
        // Gentle moon halo pulsing
        if (moonGlowRef.current) {
            const scale = 1 + Math.sin(t * 0.8) * 0.04;
            moonGlowRef.current.scale.setScalar(scale);
        }
        // Subtle drift of thin night clouds
        if (cloudsRef.current) {
            cloudsRef.current.position.x = Math.sin(t * 0.05) * 4;
        }
    });

    return (
        <group>
            {/* Fog for spooky nighttime depth with extended visible range */}
            <fog attach="fog" args={["#0e0a22", 36, 115]} />

            {/* Hemisphere light: rich indigo sky with mossy ground bounce */}
            <hemisphereLight args={["#685299", "#243d2c", 0.75]} />

            {/* Ambient nocturnal illumination — keeps shadow areas clearly distinguishable */}
            <ambientLight intensity={0.7} color="#4a3b72" />

            {/* Primary cool silver-blue directional moonlight */}
            <directionalLight
                position={[20, 35, -25]}
                intensity={1.15}
                color="#d8e6ff"
                castShadow={false}
            />

            {/* Secondary soft moonlight fill from opposite flank — illuminates both sides of street */}
            <directionalLight
                position={[-20, 25, 20]}
                intensity={0.45}
                color="#a0b8f0"
                castShadow={false}
            />

            {/* Subtle warm ground bounce light from street party & pumpkins */}
            <directionalLight
                position={[0, -2, 0]}
                intensity={0.2}
                color="#ff9540"
            />

            {/* Sky gradient dome */}
            <mesh material={skyMat}>
                <sphereGeometry args={[75, 20, 20]} />
            </mesh>

            {/* Twinkling stars */}
            <Stars
                radius={65}
                depth={25}
                count={550}
                factor={2.5}
                saturation={0.2}
                fade
                speed={0.4}
            />

            {/* Full Harvest Moon with craters and soft halo */}
            <group position={[22, 28, -35]}>
                {/* Luminous corona glow behind */}
                <mesh ref={moonGlowRef} position={[0, 0, -0.2]}>
                    <circleGeometry args={[5.6, 32]} />
                    <meshBasicMaterial
                        color="#FFE88C"
                        transparent
                        opacity={0.28}
                        depthWrite={false}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Moon Disc */}
                <mesh>
                    <circleGeometry args={[3.2, 32]} />
                    <meshStandardMaterial
                        color="#FFF6D8"
                        emissive="#FFECA0"
                        emissiveIntensity={1.35}
                        roughness={0.8}
                        metalness={0}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Moon Craters */}
                <mesh position={[-0.7, 0.5, 0.02]}>
                    <circleGeometry args={[0.5, 16]} />
                    <meshBasicMaterial color="#E2D099" side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[0.9, -0.6, 0.02]}>
                    <circleGeometry args={[0.38, 16]} />
                    <meshBasicMaterial color="#E2D099" side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[-0.2, -1.0, 0.02]}>
                    <circleGeometry args={[0.3, 16]} />
                    <meshBasicMaterial color="#E2D099" side={THREE.DoubleSide} />
                </mesh>
            </group>

            {/* Wispy stylized night clouds */}
            <group ref={cloudsRef} position={[15, 26, -30]}>
                {[-6, 2, 8].map((cx, i) => (
                    <mesh key={i} position={[cx, Math.sin(i) * 2, 0]}>
                        <planeGeometry args={[12, 1.8]} />
                        <meshBasicMaterial
                            color="#221845"
                            transparent
                            opacity={0.3}
                            depthWrite={false}
                        />
                    </mesh>
                ))}
            </group>
        </group>
    );
}
