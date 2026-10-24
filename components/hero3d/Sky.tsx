"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Stars } from "@react-three/drei";

/** Night sky background sphere + stars */
export default function Sky() {
    const skyMat = useMemo(() => {
        return new THREE.ShaderMaterial({
            side: THREE.BackSide,
            depthWrite: false,
            uniforms: {
                topColor: { value: new THREE.Color("#0a0818") },
                bottomColor: { value: new THREE.Color("#1a1040") },
                offset: { value: 10 },
                exponent: { value: 0.6 },
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
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,
        });
    }, []);

    return (
        <>
            <mesh material={skyMat}>
                <sphereGeometry args={[50, 16, 16]} />
            </mesh>
            <Stars
                radius={40}
                depth={30}
                count={300}
                factor={2}
                saturation={0}
                fade
                speed={0.5}
            />
        </>
    );
}
