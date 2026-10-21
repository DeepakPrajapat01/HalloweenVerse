# HalloweenVerse — Design System

> **Version:** 1.0 | The visual and interaction language of HalloweenVerse

---

## 1. Brand Direction

HalloweenVerse should feel like a **cinematic, atmospheric Halloween fantasy world** — not a retail holiday shop, not a flat information site.

The aesthetic reference points are:
- Atmospheric night sky with a moon — deep, dark, full of ambient detail
- Low-poly stylised 3D geometry — characterful, not hyper-realistic
- Typography that oscillates between gothic grandeur and clean readability
- Micro-animations that feel spooky and alive (particles floating, candles flickering)

The brand is **playful and spooky** — not grotesque or disturbing. It should be welcoming to a 20-year-old Indian student encountering Halloween seriously for the first time, while still feeling cool and immersive to someone already familiar with the holiday.

---

## 2. Color System

### Core Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#090811` | Page background — deepest dark |
| `--color-surface` | `#151322` | Cards, panels, navigation |
| `--color-surface-raised` | `#1E1B30` | Elevated surface, modals, tooltips |
| `--color-border` | `#302840` | Dividers, card borders, input outlines |
| | | |
| `--color-orange` | `#FF7518` | Primary CTA, highlight, Halloween icon accents |
| `--color-orange-muted` | `#B85310` | Hover states for orange elements |
| `--color-purple` | `#9B5CFF` | Secondary accent, badges, tag chips |
| `--color-purple-muted` | `#6A3DB8` | Hover states, lower-emphasis purple |
| `--color-gold` | `#FFD166` | Gold highlights, "verified" badges, star ratings |
| | | |
| `--color-text` | `#F8F5FF` | Primary body text and headings |
| `--color-text-muted` | `#B5AEC8` | Secondary text, metadata, descriptions |
| `--color-text-ghost` | `#7A7296` | Placeholder text, disabled labels |
| | | |
| `--color-success` | `#4ADE80` | Correct answer, success toast |
| `--color-error` | `#F87171` | Validation error, wrong answer |
| `--color-warning` | `#FBBF24` | Budget warning, expiry notice |

### Color Philosophy
- **Dark-first**: All backgrounds are near-black. Do not use white or light grey backgrounds.
- **One primary accent per interaction**: Use orange for primary actions, purple for discovery/tags, gold for achievements and verification.
- **Never use pure black (`#000000`)**: The deep purple-black (`#090811`) preserves the atmospheric quality.

---

## 3. Typography

### Font Families
- **Display / Headings:** `Space Grotesk` — loaded from Google Fonts, weights 500 and 700
- **Body / UI:** `Inter` — loaded from Google Fonts, weights 400 and 500

```css
/* Google Fonts import (in globals.css or layout.tsx) */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&display=swap');
```

### Type Scale (Fluid)

| Step | CSS Variable | Use |
|---|---|---|
| `--text-xs` | `clamp(0.75rem, 1.5vw, 0.875rem)` | Captions, metadata |
| `--text-sm` | `clamp(0.875rem, 1.8vw, 1rem)` | Labels, badges, helper text |
| `--text-base` | `clamp(1rem, 2vw, 1.125rem)` | Body text |
| `--text-lg` | `clamp(1.125rem, 2.5vw, 1.25rem)` | Card titles, sub-headings |
| `--text-xl` | `clamp(1.25rem, 3vw, 1.5rem)` | Section headings |
| `--text-2xl` | `clamp(1.5rem, 4vw, 2rem)` | Page headings |
| `--text-3xl` | `clamp(2rem, 6vw, 3.5rem)` | Hero headings |
| `--text-display` | `clamp(3rem, 8vw, 6rem)` | Landing hero display text |

### Rules
- Maximum line length: 70ch for body paragraphs
- Line height: 1.6 for body, 1.2 for headings
- Letter spacing: `0.02em` on display headings for atmosphere
- Never use font sizes below 14px in the rendered UI (accessibility)

---

## 4. Spacing System

Uses a base-8 grid. All spacing values are multiples of 4px or 8px.

```css
/* spacing scale */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-24: 6rem;    /* 96px */
```

---

## 5. Border Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `6px` | Buttons, compact elements |
| `--radius-md` | `12px` | Cards, panels |
| `--radius-lg` | `20px` | Feature cards, modals |
| `--radius-xl` | `32px` | Hero overlays |
| `--radius-full` | `9999px` | Badges, pills, icon containers |

---

## 6. Component Library

### NavBar
- Dark background (`--color-surface`)
- Logo left, links center, CTA button right
- Mobile: logo left, hamburger right — menu opens from top as slide-down overlay
- Active route: orange underline + orange text

### Button

| Variant | Background | Text | Hover |
|---|---|---|---|
| Primary | `--color-orange` | `#000` (black) | `--color-orange-muted`, slight scale up |
| Secondary | Transparent | `--color-text` | `--color-surface-raised` background |
| Ghost | Transparent | `--color-orange` | Orange border appears |
| Danger | `--color-error` (10% opacity) | `--color-error` | Error bg 30% opacity |

All buttons: `border-radius: --radius-sm`, `font-weight: 500`, `transition: 150ms ease`, `focus-visible ring`

### Card
- Background: `--color-surface`
- Border: `1px solid --color-border`
- Border-radius: `--radius-md`
- Hover: border becomes `--color-purple` (30% opacity), subtle `translateY(-2px)` lift
- Padding: `--space-6`

### Modal
- Backdrop: `rgba(9, 8, 17, 0.85)` with `backdrop-filter: blur(4px)`
- Panel: `--color-surface-raised`, `--radius-lg`, `max-width: 560px`
- Close button top-right: keyboard accessible
- Traps focus while open (use `focus-trap-react` or equivalent)

### Info Panel (3D World)
- Slides from the right: `transform: translateX(100%)` → `translateX(0)` on enter
- Background: `--color-surface` with a subtle orange left border
- Close via Escape, close button, or clicking outside
- Contains: zone name (heading), lore paragraph, optional CTA link

### Badge / Tag
- `background: --color-purple` at 20% opacity, `color: --color-purple`
- Border-radius: `--radius-full`
- Padding: `--space-1 --space-3`
- Verified badge: gold background at 20% opacity, gold text, shield icon

### Form Input
- Background: `--color-surface-raised`
- Border: `1px solid --color-border`
- Focus: `1px solid --color-orange`, orange glow ring
- Error: `1px solid --color-error`, error message below in `--color-error`
- Label: above input, `--color-text-muted`, `font-size: --text-sm`

### Skeleton Loader
- Dark grey animated pulse: `--color-surface-raised` → `--color-border` shimmer
- Matches the shape of the real content it represents

### Toast Notification
- Fixed bottom-right
- Variants: success (green accent), error (red accent), info (purple accent)
- Auto-dismiss after 4 seconds, dismissable by click
- Stack up to 3 toasts

---

## 7. Motion & Animation

### Principles
- Motion should feel **organic and spooky** — eases that are slightly slow to start, quick to resolve
- `prefers-reduced-motion: reduce` disables all CSS transitions, JavaScript animations, and Three.js particle effects
- Do not animate more than 3–4 elements simultaneously (cognitive overload)
- 3D environment elements that loop (floating leaves, firefly particles) should be very subtle

### Timing Scale

| Token | Duration | Use |
|---|---|---|
| `--duration-fast` | `100ms` | Button hover colour change |
| `--duration-base` | `200ms` | Card lift, icon rotation |
| `--duration-slow` | `350ms` | Panel slide-in, modal open |
| `--duration-page` | `500ms` | Page transition, 3D camera move |

### Easing
- `ease-out` for entrances (start fast, end slow — feels snappy and responsive)
- `ease-in-out` for transitions between states
- Avoid `linear` except for looping animations (particles)

### Key Animations

| Component | Animation | Duration |
|---|---|---|
| Hero title | Fade in + slide up from 20px | `500ms ease-out` |
| Feature cards | Stagger fade-in on scroll enter | `350ms ease-out`, 80ms stagger |
| Info panel (3D) | Slide in from right | `350ms ease-out` |
| Modal | Scale from 0.95 + fade in | `200ms ease-out` |
| Game cards | Lift on hover + orange glow | `200ms ease-out` |
| 3D particles | Continuous slow float | `8–15s linear infinite` per particle |
| Pumpkin candle glow | Radial pulse | `2s ease-in-out infinite` |

---

## 8. 3D Visual Direction (React Three Fiber)

### Aesthetic
- **Low-poly stylised** — not photo-realistic. Silhouettes should be immediately recognisable.
- Warm orange ambient glow from lanterns and candles
- Cool blue-purple sky with scattered particle stars
- Moon rendered as a large emissive `PlaneGeometry` or `CircleGeometry` with glow

### Materials
- Low-poly objects: `MeshToonMaterial` or `MeshLambertMaterial` for stylised flat shading
- Emissive elements (windows, eyes): `MeshStandardMaterial` with `emissive` colour and `emissiveIntensity: 1.5`
- Ground: dark `MeshLambertMaterial` with subtle texture

### Lighting
- `AmbientLight` at low intensity (`0.2`) for global fill
- 2–3 `PointLight`s for zone-specific warm orange candle glow
- `DirectionalLight` from upper-right to simulate moonlight

### Performance Budget
- Max draw calls: 80 per frame on desktop, 40 on mobile
- Particle count: ≤ 200 particles (fireflies) on desktop, ≤ 60 on mobile
- Use `InstancedMesh` for repeated objects (trees, pumpkins, tombstones)
- Cap `devicePixelRatio` at `Math.min(window.devicePixelRatio, 1.5)`

---

## 9. Icons

Use **Lucide React** for all UI icons. Consistent with the design:
- Icon size: 16px (inline), 20px (buttons), 24px (section headings)
- Icons should always be paired with a label for accessibility (visible or `aria-label`)
- Halloween-themed icons in game and world contexts may use simple inline SVGs

---

## 10. Responsive Breakpoints

| Name | Width | Notes |
|---|---|---|
| Mobile | < 640px | Single column, simplified 3D or fallback |
| Tablet | 640px–1024px | Two-column grids, full nav bar |
| Desktop | > 1024px | Full layout, 3D fully active |
| Wide | > 1440px | Max content width: 1280px centred |

---

## 11. Accessibility Standards

| Requirement | Standard |
|---|---|
| Color contrast (text) | ≥ 4.5:1 (AA) |
| Color contrast (large text) | ≥ 3:1 (AA) |
| Focus indicator | Visible orange `box-shadow` ring |
| Keyboard navigation | 100% of interactive elements |
| Screen reader labels | `aria-label` on all icon-only buttons |
| Motion | All animations respect `prefers-reduced-motion` |
| Images | All meaningful images have accurate `alt` text |
| 3D content | Text-based alternatives available for all 3D information |
