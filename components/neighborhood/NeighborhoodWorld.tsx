"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Atmosphere from "./Atmosphere";
import RoadsAndPaths from "./RoadsAndPaths";
import Houses from "./Houses";
import CommunityPark from "./CommunityPark";
import PartyArea from "./PartyArea";
import Decorations from "./Decorations";
import EducationalBeacons from "./EducationalBeacons";
import Player from "./Player";
import FollowCamera from "./FollowCamera";
import NeighborhoodHUD from "./NeighborhoodHUD";

/**
 * Main 3D World container for the explorable Halloween neighborhood.
 * Renders the Three.js Canvas with all modular scene elements and the game HUD.
 */
export default function NeighborhoodWorld() {
    return (
        <div className="relative h-full w-full overflow-hidden bg-[#090811] select-none">
            {/* React Three Fiber Canvas */}
            <Canvas
                dpr={[1, 1.5]}
                camera={{
                    position: [0, 3.5, 22],
                    fov: 55,
                    near: 0.1,
                    far: 130,
                }}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: "high-performance",
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                }}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    touchAction: "none",
                }}
            >
                <Suspense fallback={null}>
                    {/* Lighting, sky, moon, stars, and fog */}
                    <Atmosphere />

                    {/* Central street, curbs, sidewalks, and house walkways */}
                    <RoadsAndPaths />

                    {/* 8 Unique Halloween houses */}
                    <Houses />

                    {/* Community Park with whispering willow & fountain */}
                    <CommunityPark />

                    {/* Central Halloween party plaza with bonfire & DJ */}
                    <PartyArea />

                    {/* Streetlights, jack-o'-lanterns, mailboxes, trees, bats */}
                    <Decorations />

                    {/* 8 Interactive Waypoint Beacons for Educational Locations */}
                    <EducationalBeacons />

                    {/* Playable character avatar with lantern & physics */}
                    <Player />

                    {/* Smooth third-person follow camera rig */}
                    <FollowCamera />
                </Suspense>
            </Canvas>

            {/* Interactive HUD Overlay (Mini-map, Dialogue, Inventory, Touch Joystick) */}
            <NeighborhoodHUD />
        </div>
    );
}
