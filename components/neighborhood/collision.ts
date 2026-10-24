/**
 * Collision system for the HalloweenVerse 3D Neighborhood.
 * Handles AABB boxes, cylinders, and boundary limits with smooth sliding response.
 */

export interface BoxCollider {
    id: string;
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
    tag?: string;
}

export interface CircleCollider {
    id: string;
    x: number;
    z: number;
    radius: number;
    tag?: string;
}

// World playable boundary
export const PLAYABLE_BOUNDS = {
    minX: -26,
    maxX: 26,
    minZ: -44,
    maxZ: 40,
};

// All static obstacle colliders in the neighborhood
export const STATIC_BOX_COLLIDERS: BoxCollider[] = [
    // --- WEST HOUSES (X ~ -14) ---
    // House 1: The Blackthorn Manor (Z ~ -26)
    { id: "house_1", minX: -19, maxX: -8.5, minZ: -30.5, maxZ: -21.5, tag: "house" },
    // House 2: Stingy Jack's Pumpkin House (Z ~ -10)
    { id: "house_2", minX: -18, maxX: -8.5, minZ: -14.5, maxZ: -5.5, tag: "house" },
    // House 3: The Witch's Cottage (Z ~ 10)
    { id: "house_3", minX: -18, maxX: -8.5, minZ: 5.5, maxZ: 14.5, tag: "house" },
    // House 4: The Baker's Sweet Tooth Manor (Z ~ 26)
    { id: "house_4", minX: -18, maxX: -8.5, minZ: 21.5, maxZ: 30.5, tag: "house" },

    // --- EAST HOUSES (X ~ +14) ---
    // House 5: The Cryptkeeper's Lodge (Z ~ -26)
    { id: "house_5", minX: 8.5, maxX: 19, minZ: -30.5, maxZ: -21.5, tag: "house" },
    // House 6: The Cobweb Villa (Z ~ -10)
    { id: "house_6", minX: 8.5, maxX: 18, minZ: -14.5, maxZ: -5.5, tag: "house" },
    // House 7: The Vampire's Chateau (Z ~ 10)
    { id: "house_7", minX: 8.5, maxX: 18, minZ: 5.5, maxZ: 14.5, tag: "house" },
    // House 8: The Ghost Hunter's Observatory (Z ~ 26)
    { id: "house_8", minX: 8.5, maxX: 18, minZ: 21.5, maxZ: 30.5, tag: "house" },

    // --- PARTY AREA OBSTACLES (Z ~ 0) ---
    // DJ Stage table & speakers
    { id: "party_dj_stage", minX: -5.5, maxX: -3.5, minZ: -2.5, maxZ: 2.5, tag: "party" },
    // Food & Treat bar table
    { id: "party_treat_bar", minX: 3.5, maxX: 5.5, minZ: -2.5, maxZ: 2.5, tag: "party" },

    // --- COMMUNITY PARK (Z: -36 to -44) ---
    // Graveyard enclosure wall/corner (X: -11 to -4, Z: -44 to -38)
    { id: "park_graveyard", minX: -12, maxX: -5, minZ: -44, maxZ: -38, tag: "park" },

    // --- FRONT YARD FENCE SECTIONS (Leave gaps for walkways at houses) ---
    // West yard fences
    { id: "fence_w_1", minX: -6.5, maxX: -5.5, minZ: -36, maxZ: -28, tag: "fence" },
    { id: "fence_w_2", minX: -6.5, maxX: -5.5, minZ: -23, maxZ: -13, tag: "fence" },
    { id: "fence_w_3", minX: -6.5, maxX: -5.5, minZ: -7, maxZ: 7, tag: "fence" },
    { id: "fence_w_4", minX: -6.5, maxX: -5.5, minZ: 13, maxZ: 23, tag: "fence" },
    { id: "fence_w_5", minX: -6.5, maxX: -5.5, minZ: 29, maxZ: 36, tag: "fence" },

    // East yard fences
    { id: "fence_e_1", minX: 5.5, maxX: 6.5, minZ: -36, maxZ: -28, tag: "fence" },
    { id: "fence_e_2", minX: 5.5, maxX: 6.5, minZ: -23, maxZ: -13, tag: "fence" },
    { id: "fence_e_3", minX: 5.5, maxX: 6.5, minZ: -7, maxZ: 7, tag: "fence" },
    { id: "fence_e_4", minX: 5.5, maxX: 6.5, minZ: 13, maxZ: 23, tag: "fence" },
    { id: "fence_e_5", minX: 5.5, maxX: 6.5, minZ: 29, maxZ: 36, tag: "fence" },
];

export const STATIC_CIRCLE_COLLIDERS: CircleCollider[] = [
    // Central Bonfire in Party Plaza
    { id: "bonfire", x: 0, z: 0, radius: 1.6, tag: "bonfire" },

    // Community Park Center Fountain / Gazebo
    { id: "park_fountain", x: 4.5, z: -40.5, radius: 2.2, tag: "fountain" },

    // Ancient Whispering Willow Tree in Park
    { id: "park_ancient_tree", x: -2, z: -41, radius: 1.6, tag: "tree" },

    // Streetlights (West side: X = -4.5, East side: X = 4.5)
    { id: "lamp_w1", x: -4.5, z: -32, radius: 0.35, tag: "lamp" },
    { id: "lamp_w2", x: -4.5, z: -18, radius: 0.35, tag: "lamp" },
    { id: "lamp_w3", x: -4.5, z: -6, radius: 0.35, tag: "lamp" },
    { id: "lamp_w4", x: -4.5, z: 6, radius: 0.35, tag: "lamp" },
    { id: "lamp_w5", x: -4.5, z: 18, radius: 0.35, tag: "lamp" },
    { id: "lamp_w6", x: -4.5, z: 32, radius: 0.35, tag: "lamp" },

    { id: "lamp_e1", x: 4.5, z: -32, radius: 0.35, tag: "lamp" },
    { id: "lamp_e2", x: 4.5, z: -18, radius: 0.35, tag: "lamp" },
    { id: "lamp_e3", x: 4.5, z: -6, radius: 0.35, tag: "lamp" },
    { id: "lamp_e4", x: 4.5, z: 6, radius: 0.35, tag: "lamp" },
    { id: "lamp_e5", x: 4.5, z: 18, radius: 0.35, tag: "lamp" },
    { id: "lamp_e6", x: 4.5, z: 32, radius: 0.35, tag: "lamp" },

    // Notable yard trees
    { id: "tree_w1", x: -7.5, z: -19, radius: 0.8, tag: "tree" },
    { id: "tree_w2", x: -7.5, z: 17, radius: 0.8, tag: "tree" },
    { id: "tree_e1", x: 7.5, z: -19, radius: 0.8, tag: "tree" },
    { id: "tree_e2", x: 7.5, z: 17, radius: 0.8, tag: "tree" },
];

/**
 * Checks if a circle at (x, z) with radius r intersects any obstacle.
 */
export function checkCollision(x: number, z: number, r: number): boolean {
    // Check boundary
    if (
        x - r < PLAYABLE_BOUNDS.minX ||
        x + r > PLAYABLE_BOUNDS.maxX ||
        z - r < PLAYABLE_BOUNDS.minZ ||
        z + r > PLAYABLE_BOUNDS.maxZ
    ) {
        return true;
    }

    // Check box colliders
    for (let i = 0; i < STATIC_BOX_COLLIDERS.length; i++) {
        const b = STATIC_BOX_COLLIDERS[i];
        const closestX = Math.max(b.minX, Math.min(x, b.maxX));
        const closestZ = Math.max(b.minZ, Math.min(z, b.maxZ));
        const dx = x - closestX;
        const dz = z - closestZ;
        if (dx * dx + dz * dz < r * r) {
            return true;
        }
    }

    // Check circle colliders
    for (let i = 0; i < STATIC_CIRCLE_COLLIDERS.length; i++) {
        const c = STATIC_CIRCLE_COLLIDERS[i];
        const dx = x - c.x;
        const dz = z - c.z;
        const combinedR = r + c.radius;
        if (dx * dx + dz * dz < combinedR * combinedR) {
            return true;
        }
    }

    return false;
}

/**
 * Resolves player movement with independent X and Z axis checks for smooth sliding along walls.
 */
export function resolveMovement(
    currentX: number,
    currentZ: number,
    desiredDx: number,
    desiredDz: number,
    radius: number = 0.45
): { x: number; z: number } {
    let newX = currentX;
    let newZ = currentZ;

    // Test X movement independently (allows sliding along Z-facing walls)
    if (desiredDx !== 0) {
        const testX = currentX + desiredDx;
        if (!checkCollision(testX, currentZ, radius)) {
            newX = testX;
        }
    }

    // Test Z movement independently (allows sliding along X-facing walls)
    if (desiredDz !== 0) {
        const testZ = currentZ + desiredDz;
        if (!checkCollision(newX, testZ, radius)) {
            newZ = testZ;
        }
    }

    // Clamp strictly within world perimeter bounds
    newX = Math.max(PLAYABLE_BOUNDS.minX + radius, Math.min(PLAYABLE_BOUNDS.maxX - radius, newX));
    newZ = Math.max(PLAYABLE_BOUNDS.minZ + radius, Math.min(PLAYABLE_BOUNDS.maxZ - radius, newZ));

    return { x: newX, z: newZ };
}
