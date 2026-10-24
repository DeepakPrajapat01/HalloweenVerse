"use client";

/** Procedural low-poly haunted mansion with stylized gothic palette */
export default function Mansion() {
    return (
        <group position={[0, 0, -14]}>
            {/* Main body */}
            <mesh position={[0, 2.5, 0]}>
                <boxGeometry args={[5, 5, 4]} />
                <meshLambertMaterial color="#352850" />
            </mesh>

            {/* Roof */}
            <mesh position={[0, 5.8, 0]}>
                <coneGeometry args={[4, 2.5, 4]} />
                <meshLambertMaterial color="#261b3d" />
            </mesh>

            {/* Left tower */}
            <mesh position={[-3.2, 3.5, 0]}>
                <boxGeometry args={[1.8, 7, 2]} />
                <meshLambertMaterial color="#3d2c5a" />
            </mesh>
            <mesh position={[-3.2, 7.5, 0]}>
                <coneGeometry args={[1.5, 2, 4]} />
                <meshLambertMaterial color="#24193b" />
            </mesh>

            {/* Right tower */}
            <mesh position={[3.2, 3, 0]}>
                <boxGeometry args={[1.5, 6, 1.8]} />
                <meshLambertMaterial color="#3d2c5a" />
            </mesh>
            <mesh position={[3.2, 6.5, 0]}>
                <coneGeometry args={[1.3, 1.8, 4]} />
                <meshLambertMaterial color="#24193b" />
            </mesh>

            {/* Chimney */}
            <mesh position={[1.5, 6.5, -1]}>
                <boxGeometry args={[0.6, 2, 0.6]} />
                <meshLambertMaterial color="#30234a" />
            </mesh>

            {/* Door */}
            <mesh position={[0, 1.2, 2.01]}>
                <boxGeometry args={[1, 2.2, 0.1]} />
                <meshLambertMaterial color="#1a1028" />
            </mesh>

            {/* Window 1 — glowing warm amber */}
            <mesh position={[-1.2, 3, 2.01]}>
                <boxGeometry args={[0.8, 1, 0.1]} />
                <meshStandardMaterial
                    color="#FF8518"
                    emissive="#FF7518"
                    emissiveIntensity={2.4}
                    roughness={0.4}
                />
            </mesh>

            {/* Window 2 — glowing warm amber */}
            <mesh position={[1.2, 3, 2.01]}>
                <boxGeometry args={[0.8, 1, 0.1]} />
                <meshStandardMaterial
                    color="#FF8518"
                    emissive="#FF7518"
                    emissiveIntensity={2.4}
                    roughness={0.4}
                />
            </mesh>

            {/* Window 3 — tower */}
            <mesh position={[-3.2, 5.5, 1.01]}>
                <boxGeometry args={[0.6, 0.8, 0.1]} />
                <meshStandardMaterial
                    color="#FFA033"
                    emissive="#FF8518"
                    emissiveIntensity={2.0}
                    roughness={0.4}
                />
            </mesh>

            {/* Attic window — eerie magical violet */}
            <mesh position={[0, 4.8, 2.01]}>
                <circleGeometry args={[0.42, 12]} />
                <meshStandardMaterial
                    color="#C488FF"
                    emissive="#9B5CFF"
                    emissiveIntensity={1.8}
                    roughness={0.4}
                />
            </mesh>
        </group>
    );
}
