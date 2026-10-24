"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TREE_DATA: [number, number, number, number][] = [
    // [x, z, height, lean]
    [-6, -3, 5, 0.1],
    [-8, -8, 6, -0.05],
    [7, -4, 4.5, -0.08],
    [9, -9, 5.5, 0.06],
    [-5, -11, 5, 0.12],
    [5, -12, 4, -0.1],
    [-9, -1, 3.5, 0.05],
    [8, -1, 3.8, -0.04],
];

function DeadTree({
    position,
    height,
    lean,
}: {
    position: [number, number, number];
    height: number;
    lean: number;
}) {
    const branchRef = useRef<THREE.Group>(null);
    const timeRef = useRef(0);

    useFrame((_, delta) => {
        timeRef.current += delta;
        if (branchRef.current) {
            branchRef.current.rotation.z =
                lean + Math.sin(timeRef.current * 0.5 + position[0]) * 0.02;
        }
    });

    return (
        <group position={position} ref={branchRef}>
            {/* Trunk */}
            <mesh position={[0, height / 2, 0]}>
                <cylinderGeometry args={[0.08, 0.18, height, 5]} />
                <meshLambertMaterial color="#2d2238" />
            </mesh>

            {/* Branch left */}
            <mesh position={[-0.5, height * 0.7, 0]} rotation={[0, 0, 0.6]}>
                <cylinderGeometry args={[0.03, 0.07, height * 0.4, 4]} />
                <meshLambertMaterial color="#2d2238" />
            </mesh>

            {/* Branch right */}
            <mesh position={[0.4, height * 0.55, 0]} rotation={[0, 0, -0.5]}>
                <cylinderGeometry args={[0.03, 0.06, height * 0.35, 4]} />
                <meshLambertMaterial color="#2d2238" />
            </mesh>

            {/* Top fork */}
            <mesh position={[0.15, height * 0.9, 0]} rotation={[0, 0, -0.3]}>
                <cylinderGeometry args={[0.02, 0.05, height * 0.25, 4]} />
                <meshLambertMaterial color="#2d2238" />
            </mesh>
        </group>
    );
}

/** Stylized dead trees scattered around the scene */
export default function Trees() {
    const treeEls = useMemo(
        () =>
            TREE_DATA.map(([x, z, h, lean], i) => (
                <DeadTree
                    key={i}
                    position={[x, 0, z]}
                    height={h}
                    lean={lean}
                />
            )),
        []
    );

    return <group>{treeEls}</group>;
}
