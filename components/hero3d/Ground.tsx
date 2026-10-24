"use client";

import { useMemo } from "react";
import * as THREE from "three";

/** Stylized dark twilight ground plane with winding cobblestone path */
export default function Ground() {
    const pathShape = useMemo(() => {
        const shape = new THREE.Shape();
        // Winding path from front-center back toward the mansion
        shape.moveTo(-1.2, 0);
        shape.quadraticCurveTo(-0.5, -4, 0.8, -8);
        shape.quadraticCurveTo(1.5, -12, 0.2, -16);
        shape.lineTo(0.8, -16);
        shape.quadraticCurveTo(2.1, -12, 1.4, -8);
        shape.quadraticCurveTo(0.1, -4, -0.6, 0);
        shape.closePath();
        return shape;
    }, []);

    return (
        <group>
            {/* Main ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                <planeGeometry args={[60, 40]} />
                <meshLambertMaterial color="#1f1836" />
            </mesh>

            {/* Path overlay */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 4]}>
                <shapeGeometry args={[pathShape]} />
                <meshLambertMaterial color="#352854" />
            </mesh>

            {/* Grassy tufts — small cones along edges */}
            {[
                [-3, 0, 1],
                [-5, 0, -3],
                [4, 0, 0],
                [6, 0, -5],
                [-7, 0, -7],
                [3, 0, -9],
                [-4, 0, -12],
            ].map(([x, y, z], i) => (
                <mesh key={i} position={[x, y + 0.15, z]}>
                    <coneGeometry args={[0.16, 0.38, 4]} />
                    <meshLambertMaterial color="#2c3e28" />
                </mesh>
            ))}
        </group>
    );
}
