"use client";

import * as THREE from "three";

/** Ambient + directional + point lights and atmospheric scene fog */
export default function Lighting() {
    return (
        <>
            {/* Global nocturnal ambient fill with purple-slate warmth */}
            <ambientLight intensity={0.65} color="#5e4f8a" />

            {/* Cool silver-blue moonlight from upper-right */}
            <directionalLight
                position={[10, 16, 6]}
                intensity={0.95}
                color="#d0dcff"
                castShadow={false}
            />

            {/* Secondary soft purple fill light from opposite flank */}
            <directionalLight
                position={[-10, 8, -4]}
                intensity={0.35}
                color="#9b72cf"
                castShadow={false}
            />

            {/* Warm pumpkin glow — foreground */}
            <pointLight
                position={[-2, 1.2, 2]}
                intensity={2.4}
                distance={12}
                decay={2}
                color="#FF7518"
            />

            {/* Foreground right warm lantern glow */}
            <pointLight
                position={[3, 1.5, 0]}
                intensity={1.8}
                distance={10}
                decay={2}
                color="#FFA033"
            />

            {/* Mansion window warmth — background */}
            <pointLight
                position={[0, 3.5, -10]}
                intensity={2.0}
                distance={18}
                decay={2}
                color="#FF8518"
            />

            {/* Atmospheric purple-tinted depth fog with extended visibility */}
            <fog attach="fog" args={[new THREE.Color("#0d0920"), 14, 52]} />
        </>
    );
}
