# HalloweenVerse — Technical Architecture

> **Version:** 1.0 | **Stack:** Next.js App Router · React · TypeScript · Tailwind CSS · Three.js · React Three Fiber · Drei

---

## 1. Architecture Overview

HalloweenVerse is a statically-generated and client-rendered Next.js application. Most pages are pre-rendered at build time (SSG) for fast delivery. The 3D Halloween world is loaded client-side only, dynamically imported to avoid SSR issues with WebGL APIs.

```
┌─────────────────────────────────────────────────────────┐
│                  HalloweenVerse (Next.js)                │
├──────────────┬──────────────────────┬───────────────────┤
│  SSG Pages   │  Client Components   │  Static Data      │
│              │                      │                   │
│  /           │  HalloweenScene      │  costumes.ts      │
│  /guide      │  PumpkinStudio       │  guide-content.ts │
│  /costumes   │  MemoryGame          │  events.ts        │
│  /events     │  HauntedQuiz         │  planner-data.ts  │
│  /games      │                      │  game-data.ts     │
│  /planner    │                      │                   │
└──────────────┴──────────────────────┴───────────────────┘
```

---

## 2. Technology Stack

| Layer | Technology | Version | Reason |
|---|---|---|---|
| Framework | Next.js App Router | 15.x | SSG, layouts, metadata API, image optimisation |
| UI Library | React | 19.x | Component model |
| Language | TypeScript | 5.x | Type safety, IDE support |
| Styling | Tailwind CSS | 3.x | Utility-first, design token integration |
| 3D Rendering | Three.js | 0.170.x | WebGL scene primitives |
| React 3D | React Three Fiber | 8.x | React bindings for Three.js |
| 3D Utilities | Drei | 9.x | Orbit controls, loaders, effects |
| Animation | Motion (framer-motion) | 11.x | Page transitions, panel animations |
| State | Zustand | 5.x | Global shared state (3D world, settings) |
| Validation | Zod | 3.x | Planner form inputs |
| Icons | Lucide React | 0.460.x | Consistent UI icon set |

### Dependency Policy
> Add a dependency only when:
> 1. The native browser or React API cannot achieve the same in < 50 lines
> 2. The dependency is actively maintained with > 10k weekly downloads
> 3. It does not significantly increase bundle size unnecessarily

---

## 3. Route Structure

```
app/
├── layout.tsx              # Root layout: fonts, metadata, Navbar, Footer
├── page.tsx                # Landing page (SSG)
├── world/
│   └── page.tsx            # 3D World page (Client-only canvas)
├── guide/
│   └── page.tsx            # Educational guide (SSG)
├── planner/
│   └── page.tsx            # Celebration planner (CSR form)
├── costumes/
│   ├── page.tsx            # Costume explorer (SSG grid)
│   └── [slug]/
│       └── page.tsx        # Individual costume detail
├── games/
│   ├── page.tsx            # Games hub (SSG)
│   ├── memory-match/
│   │   └── page.tsx        # Memory Match game
│   ├── pumpkin-studio/
│   │   └── page.tsx        # Pumpkin Carving Studio
│   └── haunted-quiz/
│       └── page.tsx        # Haunted House Challenge quiz
└── events/
    └── page.tsx            # Event explorer (SSG with client filter)
```

---

## 4. Component Architecture

```
components/
├── layout/
│   ├── Navbar.tsx          # Responsive nav, mobile hamburger
│   └── Footer.tsx          # Links, attribution
├── ui/
│   ├── Button.tsx          # Primary, secondary, ghost, danger variants
│   ├── Card.tsx            # Base card with hover effect
│   ├── Modal.tsx           # Focus-trapped modal overlay
│   ├── Badge.tsx           # Pill-shaped tag/badge
│   ├── Skeleton.tsx        # Loading skeleton pulse
│   ├── Toast.tsx           # Stacked toast notification system
│   ├── InfoPanel.tsx       # Slide-in panel (3D world info)
│   └── EmptyState.tsx      # Empty search results etc.
├── world/
│   ├── HalloweenScene.tsx  # R3F Canvas root (client-only)
│   ├── Environment.tsx     # Sky, moon, ground, ambient lighting
│   ├── Zone.tsx            # Clickable zone with hover label
│   ├── ZoneObjects.tsx     # Props per zone (pumpkins, trees, etc.)
│   ├── Particles.tsx       # Firefly / leaf particle system
│   ├── HUD.tsx             # Floating overlay (sound toggle, minimap)
│   └── WorldFallback.tsx   # Static image fallback for no-WebGL
├── sections/               # Landing page sections (one per feature)
│   ├── HeroSection.tsx
│   ├── WorldPreviewSection.tsx
│   ├── GuidePreviewSection.tsx
│   ├── PlannerPreviewSection.tsx
│   ├── GamesPreviewSection.tsx
│   └── EventsPreviewSection.tsx
├── guide/
│   ├── TopicCard.tsx
│   └── QuotePull.tsx
├── planner/
│   ├── PlannerForm.tsx
│   ├── PlanOutput.tsx
│   └── CostBreakdown.tsx
├── costumes/
│   ├── CostumeCard.tsx
│   ├── CostumeFilter.tsx
│   └── CostumeDetail.tsx
├── games/
│   ├── GameCard.tsx
│   ├── MemoryMatch/
│   │   ├── MemoryBoard.tsx
│   │   └── MemoryCard.tsx
│   ├── PumpkinStudio/
│   │   ├── PumpkinCanvas.tsx
│   │   └── Toolbox.tsx
│   └── HauntedQuiz/
│       ├── QuizEngine.tsx
│       └── QuizResult.tsx
└── events/
    ├── EventCard.tsx
    └── EventFilters.tsx
```

---

## 5. Data Architecture

### Static Data Modules (MVP — no database)

All data lives in `src/data/*.ts` TypeScript modules. These are tree-shaken and bundled at build time.

```
src/data/
├── costumes.ts             # CostumeEntry[] — 10+ initial costumes
├── guide-content.ts        # GuideSection[] — educational content
├── events.ts               # HalloweenEvent[] — sample events (labelled)
├── planner-rules.ts        # PlannerRule[] — budget/activity mapping
└── game-data.ts            # Quiz questions, memory card data
```

### Key TypeScript Interfaces

```typescript
// Costume Explorer
interface CostumeEntry {
  id: string;
  name: string;
  category: 'classic' | 'scary' | 'funny' | 'couples' | 'child-friendly';
  difficulty: 'easy' | 'medium' | 'advanced';
  estimatedCostINR: number;
  timeMinutes: number;
  materials: string[];
  instructions: string[];
  imageAlt: string;
}

// Event Explorer
interface HalloweenEvent {
  id: string;
  name: string;
  city: IndianCity;
  date: string; // ISO 8601
  venue: string;
  category: 'party' | 'cultural' | 'family' | 'online' | 'competition';
  price: 'free' | number; // number = INR
  organiser: string;
  registrationUrl: string;
  lastVerifiedDate: string; // ISO 8601
  isVerified: boolean;
  isSample: boolean; // ⚠️ must be true for MVP seed data
}

// Celebration Planner
interface PlannerInput {
  setting: 'home' | 'office' | 'outdoor';
  participants: number;
  budgetINR: number;
  atmosphere: ('spooky' | 'fun' | 'romantic' | 'professional')[];
  availableHours: 2 | 4 | 8;
}

interface PlannerOutput {
  activities: Activity[];
  costBreakdown: CostItem[];
  totalCostINR: number;
  schedule: ScheduleSlot[];
  shoppingList: string[];
}
```

### Future Data (Post-MVP)
When persistent storage is needed:
- **Supabase PostgreSQL** for events (admin-curated, row-level security)
- **Vercel KV** for session-scoped scores if needed
- Optional auth via Supabase Auth (only if user accounts become a feature)

---

## 6. Rendering Strategy

| Route | Strategy | Reason |
|---|---|---|
| `/` | SSG | Marketing page, cacheable |
| `/world` | CSR | WebGL cannot run on server |
| `/guide` | SSG | Static educational content |
| `/planner` | CSR | Interactive form, client logic |
| `/costumes` | SSG | Static catalogue |
| `/costumes/[slug]` | SSG (generateStaticParams) | Pre-render all costume pages |
| `/games/*` | CSR | Games require browser APIs |
| `/events` | SSG + CSR filter | List pre-rendered, filter client-side |

### 3D Scene Loading Pattern

```typescript
// app/world/page.tsx
import dynamic from 'next/dynamic';

const HalloweenScene = dynamic(
  () => import('@/components/world/HalloweenScene'),
  { 
    ssr: false,
    loading: () => <WorldLoadingScreen /> 
  }
);
```

---

## 7. State Management

### Local Component State
Use `useState` / `useReducer` for:
- Form field values (planner)
- Game state (score, current card, timer)
- Filter selections (costumes, events)
- Modal open/close

### Zustand Global Store
Use **one store** for truly global shared state:

```typescript
interface HalloweenStore {
  // 3D World
  activeZone: string | null;
  setActiveZone: (zone: string | null) => void;
  
  // Settings
  soundEnabled: boolean;
  toggleSound: () => void;
  
  // Preferences
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
}
```

---

## 8. Performance Strategy

### 3D Performance
- Cap `devicePixelRatio` at 1.5
- Use `InstancedMesh` for repeated geometry (pumpkins, trees, tombstones)
- Limit particle count: 200 desktop / 60 mobile (detect via `navigator.hardwareConcurrency`)
- Lazy-load the entire `@react-three/fiber` and `@react-three/drei` via `next/dynamic`
- No GLB model files for MVP — all geometry procedural with Three.js primitives

### Image Performance
- All images via `next/image` with explicit `width` and `height`
- WebP format for all static images
- Generate atmospheric illustrations via `generate_image` tool

### Bundle Strategy
- Route-level code splitting (automatic with App Router)
- `next/dynamic` for all heavy client components
- Analyse bundle with `@next/bundle-analyzer` before production

### Fonts
- Load via `next/font/google` with `display: 'swap'`
- Preconnect to `fonts.googleapis.com`

---

## 9. Accessibility Architecture

```typescript
// Reduced motion detection hook
function useReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefers(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return prefers;
}
```

- All animations check `reducedMotion` before running
- 3D particle system disabled when `reducedMotion: true`
- All `<button>` elements have a text label or `aria-label`
- All modals trap focus and restore focus on close
- `aria-live="polite"` on dynamically updated regions (planner output, filter results)

---

## 10. Security

| Concern | Mitigation |
|---|---|
| No backend API keys | All data is static; no API keys required for MVP |
| Planner form injection | Zod schema validation; no HTML injection in output (React escapes by default) |
| Event external links | `rel="noopener noreferrer"` on all external anchors |
| No user data collection | No analytics pixels, no login, no cookies for MVP |
| Future Supabase | Row-level security policies; server-only Supabase client for mutations |

---

## 11. Testing Strategy

| Test Type | Tool | What's Covered |
|---|---|---|
| Type checking | `npx tsc --noEmit` | All TypeScript files |
| Linting | `npx next lint` | ESLint with Next.js ruleset |
| Unit | Vitest (optional) | Planner logic, filter functions |
| E2E smoke | Playwright | Navigation, planner form, memory game start |
| Responsive | Browser DevTools | 375px (mobile), 768px (tablet), 1440px (desktop) |
| Accessibility | `axe-core` / browser DevTools | Contrast, keyboard, ARIA |
| 3D fallback | Manual — disable WebGL in browser flags | WorldFallback renders |

### Playwright Smoke Tests (minimum)
1. Home page loads and CTA is visible
2. Navigation to all 7 routes works
3. Planner form submits and shows output
4. Memory match game starts and shows cards
5. Events page filter by city shows filtered results
6. External event links have `rel="noopener noreferrer"`

---

## 12. Folder Structure (Full)

```
halloweenverse/
├── app/                    # Next.js App Router routes
├── components/             # React components (see §4)
├── src/
│   ├── data/               # Static TypeScript data modules
│   ├── lib/                # Utility functions, hooks
│   │   ├── planner.ts      # Plan generation logic
│   │   ├── filters.ts      # Costume and event filter helpers
│   │   └── hooks.ts        # useReducedMotion, useWebGL, etc.
│   └── types/              # Shared TypeScript interfaces
│       └── index.ts
├── public/
│   ├── images/             # Optimised WebP images
│   └── sounds/             # Ambient audio files (optional, user-triggered)
├── docs/                   # Documentation (this directory)
├── tests/                  # Playwright test files
│   └── smoke.spec.ts
├── tailwind.config.ts      # Custom design tokens
├── next.config.ts          # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 13. Deployment

**Target platform:** Vercel (Next.js native)

```bash
# Development
npm run dev

# Type check
npx tsc --noEmit

# Lint
npx next lint

# Production build
npm run build

# Production preview
npm run start
```

### Environment Variables
For MVP: none required (no external APIs).

Future (Supabase):
```env
NEXT_PUBLIC_SUPABASE_URL=<url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-key>   # server-only, never NEXT_PUBLIC_
```

---

## 14. Known Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Three.js bundle size too large | High | High | `next/dynamic` + procedural geometry (no GLB files) |
| Poor performance on mid-range Android | Medium | High | DPR cap, particle reduction, FPS monitoring |
| WebGL not available on older devices | Medium | Medium | Full-featured 2D fallback for `/world` |
| Event data becomes stale | Low | Medium | `isSample: true` flag enforced, clear UI labelling |
| `prefers-reduced-motion` not respected | Low | High | Central `useReducedMotion` hook used by all animated components |