/** Single source of truth for all 5 world destinations */
export interface WorldLocation {
    id: string;
    name: string;
    emoji: string;
    description: string;
    href: string;
    color: string;
    /** 3D scene position [x, y, z] */
    scenePosition: [number, number, number];
    /** Camera look-at target when this zone is active */
    cameraTarget: [number, number, number];
}

export const LOCATIONS: WorldLocation[] = [
    {
        id: "haunted-mansion",
        name: "Haunted Mansion",
        emoji: "🏚️",
        description:
            "The ancestral seat of the cursed Blackthorn family. Explore seven floors of trapped spirits, hidden passages, and legendary artefacts.",
        href: "/explore",
        color: "#FF7518",
        scenePosition: [0, 0.5, -14],
        cameraTarget: [0, 4, -14],
    },
    {
        id: "pumpkin-patch",
        name: "Pumpkin Patch",
        emoji: "🎃",
        description:
            "Row upon row of glowing jack-o'-lanterns nestled in the moonlit field. Pick your perfect pumpkin and learn the art of carving.",
        href: "/games",
        color: "#FFD166",
        scenePosition: [-4, 0.3, -2],
        cameraTarget: [-4, 2, -2],
    },
    {
        id: "trick-or-treat-street",
        name: "Trick-or-Treat Street",
        emoji: "🍬",
        description:
            "A winding cobblestone lane lined with costumed neighbours, decorated doorsteps, and the promise of sweet rewards.",
        href: "/costumes",
        color: "#9B5CFF",
        scenePosition: [0, 0.3, 2],
        cameraTarget: [0, 2, 2],
    },
    {
        id: "halloween-carnival",
        name: "Halloween Carnival",
        emoji: "🎪",
        description:
            "Spinning ghost wheels, a fortune-teller's tent, and three free browser games. Win prizes, test your luck, and face your fears.",
        href: "/games",
        color: "#FF7518",
        scenePosition: [5, 0.3, -6],
        cameraTarget: [5, 3, -6],
    },
    {
        id: "halloween-workshop",
        name: "Halloween Workshop",
        emoji: "🧙",
        description:
            "Craft potions, mix spells, and plan your perfect celebration. The witch's workshop holds everything you need to throw a legendary party.",
        href: "/celebrate",
        color: "#9B5CFF",
        scenePosition: [-6, 0.3, -8],
        cameraTarget: [-6, 3, -8],
    },
];

export function getLocation(id: string): WorldLocation | undefined {
    return LOCATIONS.find((l) => l.id === id);
}
