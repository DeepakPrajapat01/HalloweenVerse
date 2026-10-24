"use client";

import NeighborhoodLoader from "./NeighborhoodLoader";

/**
 * Explorable 3D Neighborhood Page Client.
 * Renders an immersive, full-viewport 3D canvas with minimal HUD.
 * No conventional website navigation bar or external footers inside the 3D experience.
 */
export default function ExploreClient() {
    return (
        <main className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#090811] text-white select-none">
            <NeighborhoodLoader />
        </main>
    );
}
