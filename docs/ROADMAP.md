# HalloweenVerse — Implementation Roadmap

> **Version:** 1.0 | **Last Updated:** October 2026  
> Priority: P0 = Must-ship MVP | P1 = Important | P2 = Post-MVP

---

## Phase 0 — Documentation & Planning ✅ COMPLETE

| Item | Priority | Status |
|---|---|---|
| Inspect reference website (melachaloge.online) | P0 | ✅ Done |
| Write PRD.md | P0 | ✅ Done |
| Write features.md | P0 | ✅ Done |
| Write designsystem.md | P0 | ✅ Done |
| Write TECHNICAL_ARCHITECTURE.md | P0 | ✅ Done |
| Write ROADMAP.md | P0 | ✅ Done |

---

## Phase 1 — Project Bootstrap

> Estimated effort: 0.5 day

| Item | Priority | Notes |
|---|---|---|
| Initialise Next.js 15 App Router (TypeScript + Tailwind CSS) | P0 | `npx create-next-app@latest --typescript --tailwind --app` |
| Install Three.js, React Three Fiber, Drei | P0 | `npm i three @react-three/fiber @react-three/drei` |
| Install Motion, Zustand, Zod, Lucide React | P0 | `npm i motion zustand zod lucide-react` |
| Configure `tailwind.config.ts` with design tokens | P0 | All CSS variables from designsystem.md |
| Set up `next/font/google` for Space Grotesk + Inter | P0 | In `app/layout.tsx` |
| Define global CSS variables in `globals.css` | P0 | Color, spacing, type tokens |
| Create folder structure (`components/`, `src/data/`, `src/lib/`, `src/types/`) | P0 | |
| Write `src/types/index.ts` with all shared interfaces | P0 | `CostumeEntry`, `HalloweenEvent`, `PlannerInput`, etc. |

---

## Phase 2 — Design System & Layout Shell

> Estimated effort: 1 day

| Item | Priority | Notes |
|---|---|---|
| `Navbar.tsx` — responsive, hamburger on mobile | P0 | Sticky top, dark surface background |
| `Footer.tsx` — links and attribution | P0 | |
| `Button.tsx` — primary, secondary, ghost, danger variants | P0 | Keyboard accessible, focus ring |
| `Card.tsx` — base card with hover lift | P0 | |
| `Modal.tsx` — focus-trapped overlay | P0 | Use native dialog or focus-trap-react |
| `Badge.tsx`, `Skeleton.tsx`, `Toast.tsx`, `EmptyState.tsx` | P0 | |
| Root `layout.tsx` — Navbar + Footer wrapping all routes | P0 | |
| 404 page (`not-found.tsx`) | P1 | |

---

## Phase 3 — Landing Page (`/`)

> Estimated effort: 1 day

| Item | Priority | Notes |
|---|---|---|
| `HeroSection.tsx` — atmospheric animated title + CTA | P0 | CSS animation, no 3D dependency |
| `WorldPreviewSection.tsx` — teaser for the 3D world | P0 | Static atmospheric image with CTA |
| `GuidePreviewSection.tsx`, `PlannerPreviewSection.tsx` | P0 | Feature discovery blocks |
| `GamesPreviewSection.tsx`, `EventsPreviewSection.tsx` | P0 | |
| SEO metadata in `app/page.tsx` | P0 | `title`, `description`, OG tags |
| Mobile responsiveness pass | P0 | Test at 375px |
| Non-3D atmospheric hero image (generated) | P0 | Via generate_image tool |

---

## Phase 4 — 3D Halloween World (`/world`)

> Estimated effort: 2 days  
> ⚠️ Highest technical risk — treat as first real integration test

| Item | Priority | Notes |
|---|---|---|
| `HalloweenScene.tsx` — R3F Canvas with OrbitControls | P0 | `dynamic` import, `ssr: false` |
| `Environment.tsx` — sky, moon, ground, ambient lights | P0 | Procedural geometry only |
| At least 3 `Zone.tsx` instances (Mansion, Pumpkin Patch, Graveyard) | P0 | Click → info panel |
| `ZoneObjects.tsx` — pumpkins, trees, tombstones (InstancedMesh) | P0 | |
| `Particles.tsx` — firefly particles (<200 desktop, <60 mobile) | P1 | Disable on reducedMotion |
| `HUD.tsx` — minimap overlay, sound toggle, exit button | P0 | |
| `InfoPanel.tsx` — slide-in from right on zone click | P0 | Zone name, lore text, CTA link |
| `WorldFallback.tsx` — 2D fallback if WebGL unavailable | P0 | Static grid of zone cards |
| DPR cap at 1.5 | P0 | Performance |
| Mobile touch controls (drag to rotate) | P1 | |
| Sound player (user-initiated, not autoplay) | P1 | |
| WorldLoadingScreen — loading state while 3D initialises | P0 | |
| FPS stress test on mid-range Android simulation | P0 | Verification step |

---

## Phase 5 — Educational Guide (`/guide`)

> Estimated effort: 0.5 day

| Item | Priority | Notes |
|---|---|---|
| `src/data/guide-content.ts` — 5 topic sections written | P0 | Origins, Symbols, Traditions, India, Cultural Respect |
| `TopicCard.tsx` — content card with heading and body | P0 | |
| Quick-nav sidebar / anchor links | P1 | |
| `QuotePull.tsx` — "Did you know?" highlights | P1 | |
| Source references section at bottom | P0 | Credible links |
| India-specific section | P0 | Practical, relatable examples |
| Page is fully readable without JS | P0 | SSG page |

---

## Phase 6 — Celebration Planner (`/planner`)

> Estimated effort: 1 day

| Item | Priority | Notes |
|---|---|---|
| `src/data/planner-rules.ts` — budget/activity mapping data | P0 | INR-based, India-appropriate |
| `src/lib/planner.ts` — `generatePlan(input: PlannerInput): PlannerOutput` | P0 | Pure function, no network call |
| `PlannerForm.tsx` — multi-field form with Zod validation | P0 | |
| `PlanOutput.tsx` — activities, schedule, checklist | P0 | |
| `CostBreakdown.tsx` — itemised cost summary | P0 | |
| Budget guard: total ≤ budget unless flexible toggle enabled | P0 | |
| Accessible validation error messages | P0 | `aria-describedby` |
| Reset & Regenerate functionality | P0 | |
| Copy-to-clipboard share button | P2 | |

---

## Phase 7 — Costume Explorer (`/costumes`)

> Estimated effort: 1 day

| Item | Priority | Notes |
|---|---|---|
| `src/data/costumes.ts` — 10+ costume entries | P0 | INR costs, local materials |
| `CostumeCard.tsx` — card with difficulty, cost, description | P0 | |
| `CostumeFilter.tsx` — difficulty, budget, category filters | P0 | |
| `/costumes/[slug]/page.tsx` — full detail view | P0 | Materials + instructions |
| Accessible image alt text for all illustrations | P0 | |
| Empty state: no results after filtering | P0 | |
| `generateStaticParams` for all costume slugs | P0 | SSG |

---

## Phase 8 — Games Hub (`/games`)

> Estimated effort: 2 days

| Item | Priority | Notes |
|---|---|---|
| `GameCard.tsx` — hub card linking to each game | P0 | |
| **Memory Match** — full implementation | P0 | Timer, score, win state |
| **Pumpkin Studio** — SVG canvas with tool selection | P0 | Download as PNG |
| **Haunted Quiz** — 10 questions, score, reveal answers | P0 | |
| Touch + keyboard controls for all games | P0 | |
| Restart/reset for all games | P0 | |
| Game score/win screens | P0 | |
| No login required for any game | P0 | |

---

## Phase 9 — Event Explorer (`/events`)

> Estimated effort: 0.5 day

| Item | Priority | Notes |
|---|---|---|
| `src/data/events.ts` — sample events (`isSample: true`) | P0 | Clear warning in code |
| `EventCard.tsx` — card with verified badge logic | P0 | |
| `EventFilters.tsx` — city, category, date, price | P0 | |
| Past event filtering (hide events before today) | P0 | |
| Sample event notice displayed in UI | P0 | "Sample data — not real events" banner |
| External links with `rel="noopener noreferrer"` | P0 | |

---

## Phase 10 — Verification & Launch Readiness

> Estimated effort: 1 day

| Item | Priority | Notes |
|---|---|---|
| `npx tsc --noEmit` — zero TypeScript errors | P0 | |
| `npx next lint` — zero ESLint errors | P0 | |
| Playwright smoke tests (7 flows) | P0 | Navigate, planner, memory match, events filter |
| Responsive test: 375px, 768px, 1440px | P0 | |
| Reduced-motion test: toggle OS preference, verify no animations | P0 | |
| WebGL fallback test: disable WebGL in browser, verify fallback renders | P0 | |
| Accessibility: axe-core scan on all 7 routes — zero critical violations | P0 | |
| `npm run build` — zero build errors | P0 | |
| Performance: Lighthouse mobile score ≥ 80 on landing page | P1 | |
| Write `docs/walkthrough.md` with proof-of-work | P0 | |

---

## Post-MVP Backlog (P2)

| Feature | Notes |
|---|---|
| Real event submission workflow | Admin-curated with Supabase |
| Region auto-detection | Auto-filter events by browser locale |
| Costume Try-On (AR) | Camera API + face-tracking — major scope |
| Animated 3D character guide | Introduce navigable avatar |
| Community DIY submissions | User-generated costume ideas |
| Saved celebration plans | Requires auth |
| Social sharing (image cards) | OG image generation |
| Hindi / Hinglish UI toggle | Localisation |
| Multiplayer game modes | WebSocket scope |

---

## Risk Register

| Risk | Severity | Mitigation | Owner |
|---|---|---|---|
| 3D scene too heavy on mobile | High | Procedural geometry, DPR cap, FPS monitor | Tech |
| WebGL unavailable on target devices | Medium | Full 2D fallback mandatory | Tech |
| Event data becomes stale before launch | High | `isSample` flag, clear UI notice | Product |
| Bundle size exceeds 500KB initial JS | Medium | Bundle analysis, dynamic imports | Tech |
| Accessibility failures on games | Medium | Keyboard nav + screen reader testing | Tech |
| Design system not enforced consistently | Medium | All tokens via CSS variables, no hardcoded values | Design |
