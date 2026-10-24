/**
 * Interaction data and state management for HalloweenVerse neighborhood.
 * Manages trick-or-treating, dialogue, treats inventory, and nearby prompt triggers.
 */

import { create } from "zustand";

export interface TreatItem {
    id: string;
    name: string;
    emoji: string;
    source: string;
    description: string;
    color: string;
}

export interface NeighborhoodHouse {
    id: string;
    name: string;
    resident: string;
    tagline: string;
    doorPos: [number, number, number];
    dialogue: string[];
    treat: TreatItem;
    accentColor: string;
}

export interface LandmarkInteraction {
    id: string;
    name: string;
    pos: [number, number, number];
    actionLabel: string;
    title: string;
    description: string;
    type: "bonfire" | "dj" | "fountain" | "tree" | "graveyard" | "apples";
}

export const HOUSES: NeighborhoodHouse[] = [
    {
        id: "house_1",
        name: "The Blackthorn Manor",
        resident: "Lord Alistair Blackthorn",
        tagline: "Victorian Gothic Manor — Ancestral haunted estate",
        doorPos: [-9.5, 0, -26],
        dialogue: [
            "Ah, a bold wanderer arrives under the Blood Moon!",
            "For three centuries, the Blackthorns have guarded the Hollow's secrets.",
            "Take this Obsidian Toffee — forged in spectral embers. Happy haunting!",
        ],
        treat: {
            id: "obsidian_toffee",
            name: "Obsidian Toffee",
            emoji: "🍬",
            source: "The Blackthorn Manor",
            description: "Deep dark spun-sugar candy that sparkles with purple edible starlight.",
            color: "#9B5CFF",
        },
        accentColor: "#9B5CFF",
    },
    {
        id: "house_2",
        name: "Stingy Jack's Pumpkin Roost",
        resident: "Old Stingy Jack",
        tagline: "Rustic timber homestead with cascading jack-o'-lanterns",
        doorPos: [-9.5, 0, -10],
        dialogue: [
            "Hehe! Welcome to the coziest porch on Spooky Lane!",
            "I've carved turnips, gourds, and squash since 1826.",
            "Have some Glowing Cider Taffy — made from freshly pressed autumn apples!",
        ],
        treat: {
            id: "cider_taffy",
            name: "Glowing Cider Taffy",
            emoji: "🎃",
            source: "Stingy Jack's Pumpkin Roost",
            description: "Soft chewy honey-apple taffy wrapped in golden parchment.",
            color: "#FF7518",
        },
        accentColor: "#FF7518",
    },
    {
        id: "house_3",
        name: "The Witch's Cottage",
        resident: "Madame Hazel & Bramble the Crow",
        tagline: "Crooked whimsical cottage with bubbling emerald cauldron",
        doorPos: [-9.5, 0, 10],
        dialogue: [
            "Double bubble, sweet tooth and trouble!",
            "You navigated the moonlit fog just in time for the stirring.",
            "Careful with this Potion Gummy Frog — it might make you leap 10 feet into the air!",
        ],
        treat: {
            id: "potion_gummy",
            name: "Potion Gummy Frog",
            emoji: "🐸",
            source: "The Witch's Cottage",
            description: "Translucent lime-green gummy enchanted with sour blackberry dew.",
            color: "#4ADE80",
        },
        accentColor: "#4ADE80",
    },
    {
        id: "house_4",
        name: "The Sweet Tooth Bakehouse",
        resident: "Baker Barnaby Buttercup",
        tagline: "Warm cinnamon scents and giant candy-corn pillars",
        doorPos: [-9.5, 0, 26],
        dialogue: [
            "Ding-dong! The oven just chimed for midnight!",
            "Halloween wouldn't be complete without warm pastry magic.",
            "Take two Spooky Pumpkin Spiced Donuts — still warm with powdered sugar glaze!",
        ],
        treat: {
            id: "pumpkin_donut",
            name: "Spiced Pumpkin Donut",
            emoji: "🍩",
            source: "The Sweet Tooth Bakehouse",
            description: "Tender nutmeg cake ring glazed with maple and decorated with bat sprinkles.",
            color: "#FFD166",
        },
        accentColor: "#FFD166",
    },
    {
        id: "house_5",
        name: "The Cryptkeeper's Lodge",
        resident: "Yorick the Gravekeeper",
        tagline: "Ancient granite stone masonry with gothic gargoyles",
        doorPos: [9.5, 0, -26],
        dialogue: [
            "Rattle me bones! Someone actually dared to ring the bell of the crypt!",
            "The silent neighbors send their sweetest regards.",
            "Crunch on this Sugar Bone Brittle — 100% white chocolate and crushed peppermint!",
        ],
        treat: {
            id: "sugar_bone",
            name: "Sugar Bone Brittle",
            emoji: "🦴",
            source: "The Cryptkeeper's Lodge",
            description: "Crispy white-chocolate mint bark shaped like tiny smiling skeleton keys.",
            color: "#F8F5FF",
        },
        accentColor: "#7A7296",
    },
    {
        id: "house_6",
        name: "The Cobweb Villa",
        resident: "The Weaver Twins (Silvia & Charlotte)",
        tagline: "Grand weathered columns draped in ornate glowing spiderwebs",
        doorPos: [9.5, 0, -10],
        dialogue: [
            "Watch your step! Charlotte spun a fresh velvet web across the banister.",
            "We spin tales and weave treats for all who walk the night.",
            "Enjoy our Spider-Silk Caramel Popcorn — crunchy, sweet, and sticky!",
        ],
        treat: {
            id: "caramel_popcorn",
            name: "Spider-Silk Caramel Popcorn",
            emoji: "🍿",
            source: "The Cobweb Villa",
            description: "Gourmet buttery popcorn tossed in spun caramel with candied spiders.",
            color: "#FFB03B",
        },
        accentColor: "#38BDF8",
    },
    {
        id: "house_7",
        name: "The Vampire's Velvet Chateau",
        resident: "Countess Carmilla von Nacht",
        tagline: "Crimson-lit gothic spires with roosting velvet bats",
        doorPos: [9.5, 0, 10],
        dialogue: [
            "Good evening, darling creature of the night...",
            "Your lantern light is quite exquisite against my crimson velvet drapes.",
            "Savor these Midnight Cherry Bat Truffles — dark cocoa ganache filled with tart black cherry.",
        ],
        treat: {
            id: "cherry_bat",
            name: "Midnight Cherry Bat",
            emoji: "🦇",
            source: "The Vampire's Velvet Chateau",
            description: "Dark chocolate truffle with ruby red pomegranate & black cherry heart.",
            color: "#F87171",
        },
        accentColor: "#F87171",
    },
    {
        id: "house_8",
        name: "The Ghost Hunter's Observatory",
        resident: "Dr. Thaddeus Spookley",
        tagline: "Brass telescope dome, lightning rods, and glowing cyan runes",
        doorPos: [9.5, 0, 26],
        dialogue: [
            "Aha! My ectoplasm detector registered your approach from three streets away!",
            "Spectral readings are off the charts tonight — exactly as predicted!",
            "Here's your Cosmic Nebula Cotton Candy — it literally glows in dark spaces!",
        ],
        treat: {
            id: "cosmic_cotton_candy",
            name: "Cosmic Nebula Candy",
            emoji: "🌌",
            source: "The Ghost Hunter's Observatory",
            description: "Spun iridescent turquoise sugar spun under simulated moonlight.",
            color: "#22D3EE",
        },
        accentColor: "#22D3EE",
    },
];

export const LANDMARKS: LandmarkInteraction[] = [
    {
        id: "bonfire",
        name: "Community Bonfire",
        pos: [0, 0, 1.8],
        actionLabel: "Warm Hands at Fire",
        title: "The Great All-Hallows Bonfire",
        description: "A towering bonfire crackles with cedar and hickory embers. You hold your hands out to the soothing orange warmth, feeling your spooky energy restored!",
        type: "bonfire",
    },
    {
        id: "dj_skeleton",
        name: "DJ Skelly's Stage",
        pos: [-3, 0, 0],
        actionLabel: "Dance with DJ Skelly",
        title: "Dance Floor Madness",
        description: "DJ Skelly drops a funky bone-rattling groove! You bust out your best Halloween moves right alongside the party guests!",
        type: "dj",
    },
    {
        id: "apple_bobbing",
        name: "Apple Bobbing Tub",
        pos: [3, 0, 0],
        actionLabel: "Bob for Apples",
        title: "Enchanted Apple Tub",
        description: "You dunk your head into the sparkling cider tub and snag a crisp, honey-sweet crimson apple! (+1 Apple Champion)",
        type: "apples",
    },
    {
        id: "park_fountain",
        name: "The Spooky Mist Fountain",
        pos: [4.5, 0, -38.5],
        actionLabel: "Make a Wish",
        title: "The Whispering Waters",
        description: "You toss an antique copper coin into the glowing azure fountain. Ripples spread out, and a gentle chime echoes across the park. The spirits wish you good fortune!",
        type: "fountain",
    },
    {
        id: "park_tree",
        name: "The Ancient Whispering Willow",
        pos: [-2, 0, -39],
        actionLabel: "Inspect Ancient Lanterns",
        title: "The Whispering Willow",
        description: "Six blown-glass lanterns sway gently from the gnarled willow boughs. Old runes carved into the bark spell out: 'Those who wander the Hollow on All Hallows' Eve never truly walk alone.'",
        type: "tree",
    },
    {
        id: "park_graveyard",
        name: "The Founder's Tombstone",
        pos: [-8.5, 0, -40],
        actionLabel: "Read Ancient Epitaph",
        title: "The Historic Graveyard",
        description: "The tilted mossy cross reads: 'Here lies Stingy Jack's first carved turnip — October 31, 1826. May the light within forever guide the curious.'",
        type: "graveyard",
    },
];

import {
    EDUCATIONAL_LOCATIONS,
    type EducationalLocation,
} from "./educationalContent";

export { EDUCATIONAL_LOCATIONS, type EducationalLocation };

interface NeighborhoodState {
    visitedHouses: string[];
    collectedTreats: TreatItem[];
    visitedEducational: string[];
    activeHouse: NeighborhoodHouse | null;
    activeLandmark: LandmarkInteraction | null;
    activeEducational: EducationalLocation | null;
    isDancing: boolean;
    isSoundMuted: boolean;
    playerPos: [number, number, number];
    playerHeading: number; // In radians
    nearPrompt: {
        id: string;
        label: string;
        sublabel?: string;
        accentColor?: string;
        onTrigger: () => void;
    } | null;
    showInventory: boolean;
    showHelp: boolean;
    showControlsHint: boolean;
    destinationTarget: [number, number] | null; // For click-to-move navigation
    targetInteraction: (() => void) | null; // Optional callback when destination reached
    joystickVector: { x: number; y: number };
    isSprinting: boolean;
    jumpRequested: boolean;
    isSceneReady: boolean;
    welcomeMessage: string | null;

    // Actions
    setSceneReady: (ready: boolean) => void;
    dismissWelcome: () => void;
    visitHouse: (house: NeighborhoodHouse) => void;
    openEducationalLocation: (location: EducationalLocation) => void;
    closeEducationalLocation: () => void;
    closeModal: () => void;
    closeAllModals: () => void;
    triggerLandmark: (landmark: LandmarkInteraction) => void;
    setDancing: (val: boolean) => void;
    setSoundMuted: (val: boolean) => void;
    setPlayerPos: (pos: [number, number, number], heading: number) => void;
    setNearPrompt: (prompt: NeighborhoodState["nearPrompt"]) => void;
    toggleInventory: () => void;
    toggleHelp: () => void;
    dismissControlsHint: () => void;
    setDestinationTarget: (dest: [number, number] | null, onArrival?: (() => void) | null) => void;
    setJoystickVector: (v: { x: number; y: number }) => void;
    setIsSprinting: (val: boolean) => void;
    requestJump: () => void;
    consumeJumpRequest: () => boolean;
}

export const useNeighborhoodStore = create<NeighborhoodState>((set, get) => ({
    visitedHouses: [],
    collectedTreats: [],
    visitedEducational: [],
    activeHouse: null,
    activeLandmark: null,
    activeEducational: null,
    isDancing: false,
    isSoundMuted: true,
    playerPos: [0, 0, 16], // Starts on the central street near party
    playerHeading: Math.PI, // Facing towards the party / north
    nearPrompt: null,
    showInventory: false,
    showHelp: false,
    showControlsHint: true,
    destinationTarget: null,
    targetInteraction: null,
    joystickVector: { x: 0, y: 0 },
    isSprinting: false,
    jumpRequested: false,
    isSceneReady: false,
    welcomeMessage: "Welcome to the neighborhood. Explore wherever the night takes you.",

    setSceneReady: (ready) => set({ isSceneReady: ready }),
    dismissWelcome: () => set({ welcomeMessage: null }),

    visitHouse: (house) => {
        // Prevent opening if another modal is currently active
        const { visitedHouses, collectedTreats, activeEducational } = get();
        if (activeEducational) return;

        const alreadyVisited = visitedHouses.includes(house.id);
        const newVisited = alreadyVisited ? visitedHouses : [...visitedHouses, house.id];
        const newTreats = alreadyVisited
            ? collectedTreats
            : [...collectedTreats, house.treat];

        set({
            activeHouse: house,
            activeLandmark: null,
            activeEducational: null,
            visitedHouses: newVisited,
            collectedTreats: newTreats,
            destinationTarget: null,
            targetInteraction: null,
        });
    },

    openEducationalLocation: (location) => {
        const { visitedEducational } = get();
        const alreadyVisited = visitedEducational.includes(location.id);
        const newVisited = alreadyVisited ? visitedEducational : [...visitedEducational, location.id];

        set({
            activeEducational: location,
            activeHouse: null,
            activeLandmark: null,
            visitedEducational: newVisited,
            destinationTarget: null,
            targetInteraction: null,
            nearPrompt: null,
        });
    },

    closeEducationalLocation: () =>
        set({
            activeEducational: null,
        }),

    closeModal: () =>
        set({
            activeHouse: null,
            activeLandmark: null,
            activeEducational: null,
        }),

    closeAllModals: () =>
        set({
            activeHouse: null,
            activeLandmark: null,
            activeEducational: null,
            showInventory: false,
            showHelp: false,
        }),

    triggerLandmark: (landmark) => {
        // Prevent opening if educational modal is active
        const { activeEducational } = get();
        if (activeEducational) return;

        if (landmark.type === "dj") {
            set((state) => ({
                activeLandmark: landmark,
                activeHouse: null,
                activeEducational: null,
                isDancing: !state.isDancing,
                destinationTarget: null,
                targetInteraction: null,
            }));
        } else {
            set({
                activeLandmark: landmark,
                activeHouse: null,
                activeEducational: null,
                destinationTarget: null,
                targetInteraction: null,
            });
        }
    },

    setDancing: (val) => set({ isDancing: val }),
    setSoundMuted: (val) => set({ isSoundMuted: val }),
    setPlayerPos: (pos, heading) => set({ playerPos: pos, playerHeading: heading }),
    setNearPrompt: (prompt) => set({ nearPrompt: prompt }),
    toggleInventory: () => set((state) => ({ showInventory: !state.showInventory })),
    toggleHelp: () => set((state) => ({ showHelp: !state.showHelp })),
    dismissControlsHint: () => set({ showControlsHint: false }),
    setDestinationTarget: (dest, onArrival = null) =>
        set({ destinationTarget: dest, targetInteraction: onArrival }),
    setJoystickVector: (v) => set({ joystickVector: v }),
    setIsSprinting: (val) => set({ isSprinting: val }),
    requestJump: () => set({ jumpRequested: true }),
    consumeJumpRequest: () => {
        const req = get().jumpRequested;
        if (req) set({ jumpRequested: false });
        return req;
    },
}));

/**
 * Universal Interaction Manager
 * Finds the nearest eligible interaction to the player without duplicating logic
 * in component files or coupling to player movement code.
 */
export function findNearestInteraction(px: number, pz: number) {
    const store = useNeighborhoodStore.getState();

    // If an interaction panel is already open, do not trigger or suggest new prompts
    if (
        store.activeEducational ||
        store.activeHouse ||
        store.activeLandmark ||
        store.showInventory ||
        store.showHelp
    ) {
        return null;
    }

    // 1. Check all 8 Educational Locations first
    for (let i = 0; i < EDUCATIONAL_LOCATIONS.length; i++) {
        const loc = EDUCATIONAL_LOCATIONS[i];
        const dist = Math.hypot(px - loc.position[0], pz - loc.position[2]);
        if (dist <= loc.interactionRadius) {
            const isVisited = store.visitedEducational.includes(loc.id);
            return {
                id: loc.id,
                label: `${loc.badgeEmoji} ${loc.title}`,
                sublabel: isVisited
                    ? `Press [E] to revisit topic`
                    : loc.promptHint,
                accentColor: loc.accentColor,
                onTrigger: () => {
                    store.openEducationalLocation(loc);
                },
            };
        }
    }

    // 2. Check 8 Houses (if not covered by an educational location trigger)
    for (let j = 0; j < HOUSES.length; j++) {
        const h = HOUSES[j];
        const dist = Math.hypot(px - h.doorPos[0], pz - h.doorPos[2]);
        if (dist <= 2.8) {
            const visited = store.visitedHouses.includes(h.id);
            return {
                id: h.id,
                label: visited ? `Visit ${h.name}` : `Trick-or-Treat at ${h.name}!`,
                sublabel: visited ? "Treat collected" : "Press [E] or Tap to Knock",
                accentColor: h.accentColor,
                onTrigger: () => {
                    store.visitHouse(h);
                },
            };
        }
    }

    // 3. Check Landmarks
    for (let k = 0; k < LANDMARKS.length; k++) {
        const l = LANDMARKS[k];
        const dist = Math.hypot(px - l.pos[0], pz - l.pos[2]);
        if (dist <= 2.8) {
            return {
                id: l.id,
                label: l.name,
                sublabel: `Press [E] to ${l.actionLabel}`,
                accentColor: "#A855F7",
                onTrigger: () => {
                    store.triggerLandmark(l);
                },
            };
        }
    }

    return null;
}

