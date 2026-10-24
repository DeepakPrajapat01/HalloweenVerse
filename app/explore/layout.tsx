import type { ReactNode } from "react";

/**
 * Pure wrapper for the 3D Explore world.
 * Does NOT render a conventional website navigation bar, allowing the 3D canvas
 * and its minimal in-world interface (wordmark, Exit World, controls) to be fully immersive.
 */
export default function ExploreLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
