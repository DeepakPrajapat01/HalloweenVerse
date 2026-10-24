// ─────────────────────────────────────────────
// HalloweenVerse — Shared TypeScript Interfaces
// ─────────────────────────────────────────────

// Indian cities supported in event explorer
export type IndianCity =
    | 'Mumbai'
    | 'Delhi'
    | 'Bengaluru'
    | 'Hyderabad'
    | 'Pune'
    | 'Chennai'
    | 'Kolkata'
    | 'Online';

// ── Costume Explorer ────────────────────────────
export type CostumeCategory = 'classic' | 'scary' | 'funny' | 'couples' | 'child-friendly';
export type CostumeDifficulty = 'easy' | 'medium' | 'advanced';

export interface CostumeEntry {
    id: string;
    slug: string;
    name: string;
    category: CostumeCategory;
    difficulty: CostumeDifficulty;
    estimatedCostINR: number;
    timeMinutes: number;
    description: string;
    materials: string[];
    instructions: string[];
    imageAlt: string;
    tags: string[];
}

// ── Event Explorer ───────────────────────────────
export type EventCategory = 'party' | 'cultural' | 'family' | 'online' | 'competition';

export interface HalloweenEvent {
    id: string;
    name: string;
    city: IndianCity;
    date: string;               // ISO 8601
    time: string;               // e.g. "7:00 PM"
    venue: string;
    category: EventCategory;
    price: 'free' | number;     // number = INR
    organiser: string;
    registrationUrl: string;
    lastVerifiedDate: string;   // ISO 8601
    isVerified: boolean;
    isSample: boolean;          // ⚠️ must be true for MVP seed data
    description: string;
}

// ── Celebration Planner ──────────────────────────
export type PlannerSetting = 'home' | 'office' | 'outdoor';
export type PlannerAtmosphere = 'spooky' | 'fun' | 'romantic' | 'professional';
export type PlannerHours = 2 | 4 | 8;

export interface PlannerInput {
    setting: PlannerSetting;
    participants: number;
    budgetINR: number;
    atmosphere: PlannerAtmosphere[];
    availableHours: PlannerHours;
    flexibleBudget?: boolean;
}

export interface Activity {
    name: string;
    description: string;
    durationMinutes: number;
    costINR: number;
    link?: string;
}

export interface CostItem {
    label: string;
    estimatedCostINR: number;
    optional?: boolean;
}

export interface ScheduleSlot {
    time: string;
    activity: string;
}

export interface PlannerOutput {
    activities: Activity[];
    costBreakdown: CostItem[];
    totalCostINR: number;
    schedule: ScheduleSlot[];
    shoppingList: string[];
}

// ── Guide Content ────────────────────────────────
export interface GuideSection {
    id: string;
    title: string;
    emoji: string;
    summary: string;
    content: string;
    facts: string[];
    sources?: { label: string; url: string }[];
}

// ── Games ────────────────────────────────────────
export interface MemoryCard {
    id: string;
    symbol: string;       // emoji or short text
    pairId: string;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

// ── Zone (3D World) ──────────────────────────────
export interface WorldZone {
    id: string;
    name: string;
    description: string;
    lore: string;
    ctaLabel?: string;
    ctaHref?: string;
    position: [number, number, number];
    color: string;
}
