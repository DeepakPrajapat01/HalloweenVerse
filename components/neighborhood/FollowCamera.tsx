"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useNeighborhoodStore } from "./interactions";
import { STATIC_BOX_COLLIDERS } from "./collision";

/**
 * Smooth third-person follow camera with free mouse orbit,
 * obstacle clipping avoidance, and ground-level clamping.
 */
export default function FollowCamera() {
    const { camera, gl } = useThree();

    // Camera angles
    const azimuth = useRef(0); // 0 = looking from behind player (+Z looking toward -Z)
    const pitch = useRef(0.28); // Slight downward tilt
    const distance = useRef(6.2);

    // Smoothed positions
    const currentCamPos = useRef(new THREE.Vector3(0, 3.5, 22));
    const currentLookTarget = useRef(new THREE.Vector3(0, 1.2, 16));

    // Cinematic entrance reveal state
    const isRevealing = useRef(true);
    const revealTime = useRef(0);
    const prefersReducedMotion = useRef(false);

    // Pointer dragging tracking
    const isDragging = useRef(false);
    const lastPointer = useRef({ x: 0, y: 0 });

    useEffect(() => {
        prefersReducedMotion.current =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion.current) {
            isRevealing.current = false;
            useNeighborhoodStore.getState().setSceneReady(true);
        } else {
            // Start elevated to reveal the illuminated neighborhood society
            currentCamPos.current.set(0, 8.5, 29);
            currentLookTarget.current.set(0, 1.8, 8);
        }
    }, []);

    useEffect(() => {
        const dom = gl.domElement;

        const onPointerDown = (e: PointerEvent) => {
            // Only primary mouse button or touch
            if (e.button === 0) {
                isDragging.current = true;
                lastPointer.current = { x: e.clientX, y: e.clientY };
            }
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!isDragging.current) return;
            const dx = e.clientX - lastPointer.current.x;
            const dy = e.clientY - lastPointer.current.y;
            lastPointer.current = { x: e.clientX, y: e.clientY };

            // Rotate azimuth and pitch
            azimuth.current -= dx * 0.005;
            pitch.current = Math.max(
                0.08,
                Math.min(0.75, pitch.current + dy * 0.004)
            );
        };

        const onPointerUp = () => {
            isDragging.current = false;
        };

        const onWheel = (e: WheelEvent) => {
            // Zoom distance within bounds (4.2 to 9.0)
            distance.current = Math.max(
                4.2,
                Math.min(9.0, distance.current + e.deltaY * 0.005)
            );
        };

        dom.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        dom.addEventListener("wheel", onWheel, { passive: true });

        return () => {
            dom.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
            dom.removeEventListener("wheel", onWheel);
        };
    }, [gl]);

    useFrame((_, delta) => {
        const dt = Math.min(delta, 0.08);
        const { playerPos } = useNeighborhoodStore.getState();

        // Target look-at point (center of player body)
        const targetLook = new THREE.Vector3(
            playerPos[0],
            playerPos[1] + 1.2,
            playerPos[2]
        );

        // Calculate desired camera position in spherical coordinates relative to player
        const cosPitch = Math.cos(pitch.current);
        const sinPitch = Math.sin(pitch.current);
        const sinAzimuth = Math.sin(azimuth.current);
        const cosAzimuth = Math.cos(azimuth.current);

        let dist = distance.current;

        // Ideal camera position before collision checks
        let targetX = playerPos[0] + sinAzimuth * dist * cosPitch;
        let targetZ = playerPos[2] + cosAzimuth * dist * cosPitch;
        let targetY = playerPos[1] + 1.5 + sinPitch * dist;

        // Prevent camera clipping into houses
        for (let i = 0; i < STATIC_BOX_COLLIDERS.length; i++) {
            const b = STATIC_BOX_COLLIDERS[i];
            if (b.tag === "house") {
                // If target cam is inside or very close to house box, pull camera closer to player
                if (
                    targetX > b.minX - 0.5 &&
                    targetX < b.maxX + 0.5 &&
                    targetZ > b.minZ - 0.5 &&
                    targetZ < b.maxZ + 0.5
                ) {
                    dist = Math.max(3.5, dist * 0.65);
                    targetX = playerPos[0] + sinAzimuth * dist * cosPitch;
                    targetZ = playerPos[2] + cosAzimuth * dist * cosPitch;
                    targetY = playerPos[1] + 1.5 + sinPitch * dist;
                    break;
                }
            }
        }

        // Never clip through the ground (keep min height 0.85)
        targetY = Math.max(0.85, targetY);

        const targetPos = new THREE.Vector3(targetX, targetY, targetZ);

        // If performing the opening reveal sweep
        if (isRevealing.current && !prefersReducedMotion.current) {
            revealTime.current += dt;
            const duration = 1.35;
            const progress = Math.min(1, revealTime.current / duration);
            // Smooth cubic ease-out
            const ease = 1 - Math.pow(1 - progress, 3);

            const startPos = new THREE.Vector3(0, 8.5, 29);
            const startLook = new THREE.Vector3(0, 1.8, 8);

            currentCamPos.current.lerpVectors(startPos, targetPos, ease);
            currentLookTarget.current.lerpVectors(startLook, targetLook, ease);

            camera.position.copy(currentCamPos.current);
            camera.lookAt(currentLookTarget.current);

            if (progress >= 1) {
                isRevealing.current = false;
                useNeighborhoodStore.getState().setSceneReady(true);
            }
            return;
        }

        // Smooth camera movement using exponential damping
        currentCamPos.current.lerp(targetPos, dt * 8);
        currentLookTarget.current.lerp(targetLook, dt * 10);

        camera.position.copy(currentCamPos.current);
        camera.lookAt(currentLookTarget.current);
    });

    return null;
}
