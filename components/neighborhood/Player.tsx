"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { resolveMovement, checkCollision, PLAYABLE_BOUNDS } from "./collision";
import { HOUSES, LANDMARKS, useNeighborhoodStore, findNearestInteraction } from "./interactions";
import { neighborhoodAudio } from "./audio";

/**
 * Pulsing destination ring for click-to-move navigation.
 */
function DestinationMarker() {
    const ringRef = useRef<THREE.Mesh>(null);
    const destinationTarget = useNeighborhoodStore((s) => s.destinationTarget);
    const pulseRef = useRef(0);

    useFrame((_, delta) => {
        if (ringRef.current) {
            pulseRef.current += Math.min(delta, 0.1);
            const s = 1 + Math.sin(pulseRef.current * 7) * 0.15;
            ringRef.current.scale.set(s, s, s);
        }
    });

    if (!destinationTarget) return null;

    return (
        <group position={[destinationTarget[0], 0.05, destinationTarget[1]]}>
            {/* Outer pulsating ring */}
            <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.35, 0.55, 32]} />
                <meshBasicMaterial
                    color="#FF7518"
                    side={THREE.DoubleSide}
                    transparent
                    opacity={0.85}
                />
            </mesh>
            {/* Center beacon dot */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <circleGeometry args={[0.18, 16]} />
                <meshBasicMaterial color="#FFD166" />
            </mesh>
            {/* Vertical light beam */}
            <mesh position={[0, 0.45, 0]}>
                <cylinderGeometry args={[0.02, 0.04, 0.9, 6]} />
                <meshBasicMaterial
                    color="#FFAA22"
                    transparent
                    opacity={0.5}
                />
            </mesh>
            <pointLight color="#FF7518" intensity={1.5} distance={3.5} />
        </group>
    );
}

/**
 * Controllable stylized third-person player avatar (Pumpkin Sorcerer).
 * Equipped with camera-relative movement, click-to-move navigation,
 * lantern lighting, walk/jump animations, collision handling, and interaction trigger.
 */
export default function Player() {
    const { camera } = useThree();

    const avatarGroupRef = useRef<THREE.Group>(null);
    const lanternLightRef = useRef<THREE.PointLight>(null);
    const staffRef = useRef<THREE.Group>(null);
    const leftLegRef = useRef<THREE.Mesh>(null);
    const rightLegRef = useRef<THREE.Mesh>(null);
    const bodyRef = useRef<THREE.Group>(null);

    // Physics & movement state
    const pos = useRef(new THREE.Vector3(0, 0, 16));
    const velY = useRef(0);
    const isGrounded = useRef(true);
    const facingAngle = useRef(Math.PI); // Facing north initially
    const walkCycle = useRef(0);

    // Keyboard state tracking
    const keys = useRef<{ [key: string]: boolean }>({});

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore keystrokes if typing inside any form input or editable field
            const target = e.target as HTMLElement | null;
            if (
                target instanceof HTMLInputElement ||
                target instanceof HTMLTextAreaElement ||
                target?.isContentEditable
            ) {
                return;
            }

            // Escape key closes open information modals / panels
            if (e.code === "Escape") {
                useNeighborhoodStore.getState().closeAllModals();
                return;
            }

            const store = useNeighborhoodStore.getState();
            const isModalOpen = Boolean(
                store.activeEducational ||
                store.activeHouse ||
                store.activeLandmark ||
                store.showInventory ||
                store.showHelp
            );

            // Prevent movement inputs if an interaction modal is open
            if (isModalOpen) {
                return;
            }

            // Prevent default page scroll on arrow keys / space
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
                e.preventDefault();
            }

            keys.current[e.code] = true;

            // Interact key 'E'
            if (e.code === "KeyE") {
                const prompt = store.nearPrompt;
                if (prompt) {
                    prompt.onTrigger();
                }
            }

            // Space to jump
            if (e.code === "Space" && isGrounded.current) {
                velY.current = 6.2;
                isGrounded.current = false;
                neighborhoodAudio.playJump();
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            keys.current[e.code] = false;
        };

        // Stop all movement immediately if window loses focus
        const handleBlur = () => {
            keys.current = {};
            useNeighborhoodStore.getState().setDestinationTarget(null);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        window.addEventListener("blur", handleBlur);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            window.removeEventListener("blur", handleBlur);
        };
    }, []);

    useFrame((_, delta) => {
        // Clamp delta to avoid physics explosion on tab-switching
        const dt = Math.min(delta, 0.08);

        const store = useNeighborhoodStore.getState();
        const { joystickVector, isSprinting: touchSprinting, destinationTarget } = store;

        // Check if an interaction modal is open - pause movement if so
        const isModalOpen = Boolean(
            store.activeEducational ||
            store.activeHouse ||
            store.activeLandmark ||
            store.showInventory ||
            store.showHelp
        );

        if (isModalOpen) {
            keys.current = {};
            if (destinationTarget) {
                store.setDestinationTarget(null);
            }
        }

        const isSceneReady = store.isSceneReady;

        // Check touch jump request
        if (!isModalOpen && isSceneReady && store.consumeJumpRequest() && isGrounded.current) {
            velY.current = 6.2;
            isGrounded.current = false;
            neighborhoodAudio.playJump();
        }

        // Compute camera-relative forward and right vectors on XZ plane
        const camForward = new THREE.Vector3();
        camera.getWorldDirection(camForward);
        camForward.y = 0;
        if (camForward.lengthSq() > 0.0001) {
            camForward.normalize();
        } else {
            camForward.set(0, 0, -1);
        }

        // Camera right vector (perpendicular to camForward on XZ plane)
        const camRight = new THREE.Vector3();
        camRight.crossVectors(camForward, new THREE.Vector3(0, 1, 0)).normalize();

        // Calculate input along camera forward/backward and camera left/right
        let forwardInput = 0;
        let rightInput = 0;

        if (!isModalOpen && isSceneReady) {
            if (keys.current["KeyW"] || keys.current["ArrowUp"]) forwardInput += 1;
            if (keys.current["KeyS"] || keys.current["ArrowDown"]) forwardInput -= 1;
            if (keys.current["KeyD"] || keys.current["ArrowRight"]) rightInput += 1;
            if (keys.current["KeyA"] || keys.current["ArrowLeft"]) rightInput -= 1;

            // Add virtual touch joystick input
            if (Math.hypot(joystickVector.x, joystickVector.y) > 0.1) {
                rightInput += joystickVector.x;
                forwardInput -= joystickVector.y; // Joystick up is negative Y
            }
        }

        const isKeyboardOrTouchMoving = Math.hypot(forwardInput, rightInput) > 0.05;

        // If manual movement is detected, cancel click-to-move destination
        if (isKeyboardOrTouchMoving && destinationTarget) {
            store.setDestinationTarget(null);
        }

        const isSprinting =
            keys.current["ShiftLeft"] || keys.current["ShiftRight"] || touchSprinting;
        const moveSpeed = isSprinting ? 7.6 : 4.6;

        let desiredDx = 0;
        let desiredDz = 0;
        let isMoving = false;

        if (isKeyboardOrTouchMoving && !isModalOpen) {
            isMoving = true;

            // Combine camera forward and camera right
            const moveDir = new THREE.Vector3();
            moveDir.addScaledVector(camForward, forwardInput);
            moveDir.addScaledVector(camRight, rightInput);

            // Normalize moveDir so diagonal movement is NEVER faster than straight movement
            if (moveDir.lengthSq() > 0.0001) {
                moveDir.normalize();
            }

            desiredDx = moveDir.x * moveSpeed * dt;
            desiredDz = moveDir.z * moveSpeed * dt;

            // Smoothly face movement direction
            const targetAngle = Math.atan2(moveDir.x, moveDir.z);
            facingAngle.current = THREE.MathUtils.damp(
                facingAngle.current,
                targetAngle,
                16,
                dt
            );

            // Play footstep sounds
            neighborhoodAudio.playFootstep();

            // Progress walk cycle animation
            walkCycle.current += dt * (isSprinting ? 16 : 10);
        } else if (destinationTarget && !isModalOpen) {
            // Click-to-move navigation toward destinationTarget
            const targetX = destinationTarget[0];
            const targetZ = destinationTarget[1];
            const dx = targetX - pos.current.x;
            const dz = targetZ - pos.current.z;
            const dist = Math.hypot(dx, dz);

            if (dist > 0.35) {
                isMoving = true;
                const dirX = dx / dist;
                const dirZ = dz / dist;

                desiredDx = dirX * moveSpeed * dt;
                desiredDz = dirZ * moveSpeed * dt;

                const targetAngle = Math.atan2(dirX, dirZ);
                facingAngle.current = THREE.MathUtils.damp(
                    facingAngle.current,
                    targetAngle,
                    16,
                    dt
                );

                neighborhoodAudio.playFootstep();
                walkCycle.current += dt * (isSprinting ? 16 : 10);
            } else {
                // Reached destination!
                const arrivalCallback = store.targetInteraction;
                store.setDestinationTarget(null);
                if (arrivalCallback) {
                    arrivalCallback();
                }
            }
        }

        // Apply obstacle collision with sliding response & boundary clamping
        const resolved = resolveMovement(
            pos.current.x,
            pos.current.z,
            desiredDx,
            desiredDz,
            0.45
        );
        pos.current.x = resolved.x;
        pos.current.z = resolved.z;

        // Vertical physics (gravity and jumping)
        if (!isGrounded.current) {
            velY.current -= 18 * dt; // Gravity
            pos.current.y += velY.current * dt;
            if (pos.current.y <= 0) {
                pos.current.y = 0;
                velY.current = 0;
                isGrounded.current = true;
            }
        }

        // Update party audio volume based on distance
        neighborhoodAudio.updatePartyDistance(pos.current.x, pos.current.z);

        // Synchronize store player pos for HUD & camera
        store.setPlayerPos(
            [pos.current.x, pos.current.y, pos.current.z],
            facingAngle.current
        );

        // Update 3D avatar transform
        if (avatarGroupRef.current) {
            avatarGroupRef.current.position.copy(pos.current);
            avatarGroupRef.current.rotation.y = facingAngle.current;

            // Walking / Dancing animation bob
            if (store.isDancing) {
                avatarGroupRef.current.rotation.y += dt * 4;
                if (bodyRef.current) {
                    bodyRef.current.position.y =
                        1.0 + Math.abs(Math.sin(walkCycle.current * 2)) * 0.2;
                }
            } else if (isMoving) {
                const bob = Math.abs(Math.sin(walkCycle.current)) * 0.08;
                if (bodyRef.current) {
                    bodyRef.current.position.y = 1.0 + bob;
                    bodyRef.current.rotation.z = Math.sin(walkCycle.current) * 0.05;
                }

                // Leg swing
                if (leftLegRef.current && rightLegRef.current) {
                    leftLegRef.current.rotation.x = Math.sin(walkCycle.current) * 0.55;
                    rightLegRef.current.rotation.x = -Math.sin(walkCycle.current) * 0.55;
                }

                // Lantern staff swing
                if (staffRef.current) {
                    staffRef.current.rotation.x = -Math.sin(walkCycle.current) * 0.35;
                }
            } else {
                // Idle breathing
                const idle = Math.sin(Date.now() * 0.003) * 0.02;
                if (bodyRef.current) {
                    bodyRef.current.position.y = 1.0 + idle;
                    bodyRef.current.rotation.z = 0;
                }
                if (leftLegRef.current && rightLegRef.current) {
                    leftLegRef.current.rotation.x = 0;
                    rightLegRef.current.rotation.x = 0;
                }
                if (staffRef.current) {
                    staffRef.current.rotation.x = 0;
                }
            }
        }

        // Proximity detection for interactive houses & landmarks
        checkProximity(pos.current.x, pos.current.z);
    });

    /** Checks whether player is close to any interactive educational location, house, or landmark */
    const checkProximity = (px: number, pz: number) => {
        const store = useNeighborhoodStore.getState();
        const prompt = findNearestInteraction(px, pz);

        if (prompt) {
            // Only update if different to avoid unnecessary React re-renders
            if (store.nearPrompt?.id !== prompt.id) {
                store.setNearPrompt(prompt);
            }
        } else if (store.nearPrompt !== null) {
            store.setNearPrompt(null);
        }
    };

    return (
        <>
            {/* Visual feedback marker for click-to-move */}
            <DestinationMarker />

            <group ref={avatarGroupRef} position={[0, 0, 16]}>
                {/* Player Body Group */}
                <group ref={bodyRef} position={[0, 1.0, 0]}>
                    {/* Glowing Jack-o'-Lantern Head */}
                    <mesh position={[0, 0.45, 0]} scale={[1, 0.85, 1]}>
                        <sphereGeometry args={[0.34, 10, 8]} />
                        <meshStandardMaterial
                            color="#E85D04"
                            emissive="#FF7518"
                            emissiveIntensity={0.6}
                            roughness={0.7}
                        />
                    </mesh>

                    {/* Carved Glowing Face */}
                    <mesh position={[0, 0.42, 0.31]}>
                        <planeGeometry args={[0.26, 0.2]} />
                        <meshStandardMaterial
                            color="#FFDD00"
                            emissive="#FF9E00"
                            emissiveIntensity={2.5}
                            side={THREE.DoubleSide}
                        />
                    </mesh>

                    {/* Crooked Witch/Wizard Hat */}
                    <group position={[0, 0.72, 0]} rotation={[0.08, 0, -0.06]}>
                        {/* Hat Brim */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]}>
                            <circleGeometry args={[0.55, 16]} />
                            <meshStandardMaterial color="#1a1024" roughness={0.8} />
                        </mesh>
                        {/* Hat Cone */}
                        <mesh position={[0, 0.38, -0.04]} rotation={[0.15, 0, 0]}>
                            <coneGeometry args={[0.26, 0.8, 8]} />
                            <meshStandardMaterial color="#140a1e" roughness={0.8} />
                        </mesh>
                        {/* Purple Hat Belt */}
                        <mesh position={[0, 0.1, 0]}>
                            <cylinderGeometry args={[0.28, 0.29, 0.08, 12]} />
                            <meshStandardMaterial color="#9B5CFF" />
                        </mesh>
                    </group>

                    {/* Dark Purple Traveler's Cloak / Coat */}
                    <mesh position={[0, -0.1, 0]}>
                        <cylinderGeometry args={[0.25, 0.42, 0.75, 8]} />
                        <meshStandardMaterial color="#2d1a45" roughness={0.8} />
                    </mesh>

                    {/* Gold Belt Buckle */}
                    <mesh position={[0, -0.18, 0.32]}>
                        <boxGeometry args={[0.12, 0.09, 0.04]} />
                        <meshStandardMaterial color="#FFD166" metalness={0.8} roughness={0.3} />
                    </mesh>

                    {/* Trick-or-Treat Candy Bucket in Left Hand */}
                    <group position={[-0.42, -0.15, 0.15]}>
                        <mesh scale={[1, 0.8, 1]}>
                            <sphereGeometry args={[0.16, 8, 6]} />
                            <meshStandardMaterial color="#FF7518" roughness={0.6} />
                        </mesh>
                        {/* Handle */}
                        <mesh position={[0, 0.12, 0]} rotation={[0, 0, Math.PI / 2]}>
                            <torusGeometry args={[0.12, 0.015, 4, 12, Math.PI]} />
                            <meshStandardMaterial color="#111" />
                        </mesh>
                    </group>

                    {/* Staff with Glowing Lantern in Right Hand */}
                    <group ref={staffRef} position={[0.42, 0.1, 0.15]}>
                        {/* Wooden Staff */}
                        <mesh position={[0, -0.3, 0]}>
                            <cylinderGeometry args={[0.025, 0.03, 1.4, 5]} />
                            <meshStandardMaterial color="#4a301f" roughness={0.9} />
                        </mesh>
                        {/* Brass Lantern Hook */}
                        <mesh position={[0.08, 0.32, 0]}>
                            <boxGeometry args={[0.14, 0.03, 0.03]} />
                            <meshStandardMaterial color="#b45309" metalness={0.8} />
                        </mesh>
                        {/* Amber Glass Lantern */}
                        <mesh position={[0.12, 0.18, 0]}>
                            <boxGeometry args={[0.16, 0.22, 0.16]} />
                            <meshStandardMaterial
                                color="#FFAA22"
                                emissive="#FF8800"
                                emissiveIntensity={2.5}
                                transparent
                                opacity={0.95}
                            />
                        </mesh>
                        {/* Illuminating Player Lantern Light */}
                        <pointLight
                            ref={lanternLightRef}
                            position={[0.12, 0.18, 0.1]}
                            color="#FFA826"
                            intensity={2.8}
                            distance={8.5}
                            decay={2}
                        />
                    </group>
                </group>

                {/* Stylized Moving Boots / Legs */}
                <mesh ref={leftLegRef} position={[-0.14, 0.3, 0]}>
                    <boxGeometry args={[0.14, 0.6, 0.2]} />
                    <meshStandardMaterial color="#15101a" />
                </mesh>
                <mesh ref={rightLegRef} position={[0.14, 0.3, 0]}>
                    <boxGeometry args={[0.14, 0.6, 0.2]} />
                    <meshStandardMaterial color="#15101a" />
                </mesh>
            </group>
        </>
    );
}
