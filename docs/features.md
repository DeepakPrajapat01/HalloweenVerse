# HalloweenVerse — Feature Specification

> **Version:** 1.0 | **Status:** Pre-development

---

## Feature 1: Landing Page

### Purpose
The landing page is the first impression. It must communicate the product's value immediately, establish the visual identity, and guide users toward their primary intent (enter the world, plan a celebration, play a game, or find an event).

### Requirements
- Responsive navigation bar with logo, links (Guide, Planner, Costumes, Games, Events), and a "Start Exploring" CTA
- Animated hero section: atmospheric typography, optional looping 3D preview background, primary CTA button
- Five feature preview sections linking to each major section (3D World, Guide, Planner, Costumes, Games, Events)
- Non-3D atmospheric hero fallback if WebGL is unavailable
- SEO metadata (title, description, Open Graph tags)
- Footer with secondary links and attribution

### Acceptance Criteria
- [ ] All navigation links navigate to correct routes
- [ ] Hero CTA is keyboard-focusable and activatable
- [ ] Page renders without JavaScript errors on load
- [ ] No horizontal overflow at 375px viewport width
- [ ] Page remains fully readable and navigable if the 3D canvas fails to load
- [ ] Lighthouse performance score ≥ 80 on mobile (3G simulation)
- [ ] `og:image`, `og:title`, `og:description`, `twitter:card` tags are present

---

## Feature 2: 3D Halloween World

### Purpose
An atmospheric, navigable Three.js environment built with React Three Fiber. Users rotate the camera and click on themed zones to reveal Halloween content and lore.

### Locations / Zones

| Zone | Halloween Theme | Content Revealed |
|---|---|---|
| Haunted Mansion | Classic Halloween haunt | History of trick-or-treating; ghost lore |
| Pumpkin Patch | Jack-o'-lanterns | Jack-o'-lantern origin story; carving guide |
| Witch's Workshop | Potion brewing | Costume & decoration DIY |
| Graveyard | Skull motifs, tombstones | Samhain and Day of the Dead origins |
| Carnival Tent | Games, prizes | Links to Games hub |

### Interactions
- Click or tap a zone → camera animates to zone → info panel slides in from the right
- Info panel contains: zone name, short lore paragraph, and a link to the relevant content page
- "Exit World" button returns to landing page
- Minimap overlay showing all zones and current camera location
- Sound toggle (ambient spooky music — not autoplay; user must click play)

### Technical Approach
- `<Canvas>` is loaded client-only via `dynamic(() => import('../components/HalloweenScene'), { ssr: false })`
- Low-poly procedural geometry: pumpkins (lathed shapes), trees (cones + cylinders), mansion (box geometry with door/window cutouts)
- Atmosphere: dark sky (`#090811`), moon plane geometry with emissive material, particle system for floating fireflies/leaves
- Orbit controls restricted to horizontal rotation only on mobile for mobile comfort
- `devicePixelRatio` capped at 1.5 to preserve performance on high-DPI devices

### Fallback
If WebGL is unavailable: render a full-bleed atmospheric illustration (generated image) with zone navigation as HTML cards beneath it.

### Acceptance Criteria
- [ ] At least 3 interactive zones with working info panels
- [ ] Camera animated transition completes in < 1.2s
- [ ] Info panel closes when user presses Escape or clicks the close button
- [ ] Sound does not autoplay
- [ ] Keyboard: Tab selects interactive zone markers, Enter activates, Escape closes panel
- [ ] FPS stable ≥ 30 on mid-range Android (no frame rate death spiral)
- [ ] 2D fallback renders visibly and all zone cards link correctly
- [ ] All zone label text passes colour contrast check against background

---

## Feature 3: Educational Guide (`/guide`)

### Purpose
Teach Indian users about Halloween — its origins, key traditions, symbols, and cultural evolution — in an engaging, honest, and accessible format.

### Content Structure

| Topic | Content Summary |
|---|---|
| Origins | Celtic Samhain, Christian All Saints' Day, evolution into modern Halloween |
| Symbols | Pumpkins, bats, witches, skeletons, black cats — origin of each |
| Traditions | Trick-or-treating, costume parties, haunted houses |
| Halloween in India | How colleges, clubs, and urban communities celebrate; growth since 2010s |
| Cultural Respect | Explanation of Day of the Dead vs. Halloween; avoid cultural appropriation |

### Requirements
- Content cards or sections with heading, body text, and optional illustration
- Quick-nav sidebar or anchor links for each topic
- "Did you know?" pull-quote highlights
- Credible source references listed at bottom (citations, links to Wikipedia, BBC, academic sources)
- India-specific section with relatable, practical celebration examples

### Acceptance Criteria
- [ ] All links in source references open in a new tab with `rel="noopener noreferrer"`
- [ ] Page readable and functional without JavaScript
- [ ] No unverified historical claims presented as fact
- [ ] Content displays correctly at 375px without truncation
- [ ] Anchor links scroll smoothly to their sections

---

## Feature 4: Celebration Planner (`/planner`)

### Purpose
An interactive form that generates a personalised Halloween celebration plan within the user's budget. Designed specifically for Indian users with INR pricing and locally relevant suggestions.

### Inputs

| Field | Type | Values |
|---|---|---|
| Setting | Select | Home party, Office/College event, Outdoor gathering |
| Participants | Number input | 1–100 |
| Budget | Number input (INR) | Min ₹500 |
| Atmosphere | Multi-select | Spooky, Fun/Family, Romantic, Professional |
| Available time | Select | 2 hours, Half day, Full day |

### Outputs (Generated Plan)
- **Activities list**: 3–6 suggested activities with time allocation
- **Cost breakdown**: Line items per activity/item with individual and total cost in INR
- **Shopping checklist**: Itemised list with material suggestions (include locally available alternatives)
- **Schedule**: Hour-by-hour suggested timeline
- **Reset & Regenerate** button
- Optional: Share button that copies a plain-text summary to clipboard

### Logic
- Rule-based local generation (TypeScript data modules — no network request)
- Budget guard: total estimated cost must not exceed selected budget unless user opts into "flexible budget" toggle
- Edge case: if budget is < ₹500 per person × participant count, show a warning and cap the plan to budget

### Acceptance Criteria
- [ ] Submitting form with valid inputs generates a complete plan with at least 3 activities
- [ ] Total generated plan cost ≤ selected budget (unless flexible toggle is on)
- [ ] Invalid/empty inputs show accessible inline validation messages
- [ ] Resetting the form clears all inputs and the generated plan
- [ ] Plan is readable and complete at 375px
- [ ] No network request is made during plan generation

---

## Feature 5: Costume Explorer (`/costumes`)

### Purpose
Inspire users with Halloween costume ideas that can be assembled in India using locally available materials, with clear DIY instructions.

### Costume Card Contents
- Costume name and description
- Difficulty: Easy / Medium / Advanced
- Estimated cost in INR
- Time required
- Materials list (with local Indian store category e.g., "craft store", "saree shop")
- Step-by-step instructions (3–8 steps)
- Accessible image description (alt text)

### Filters
- Difficulty (Easy, Medium, Advanced)
- Budget range (< ₹500 / ₹500–₹1500 / ₹1500+)
- Category (Classic, Scary, Funny, Couples/Group, Child-friendly)

### Initial Costume Catalogue (at least 10 entries)
Classic Witch, Vampire, Skeleton, Zombie, Ghost, Mummy, Werewolf, Pumpkin (child), Devil, DIY Scarecrow — all with India-available materials.

### Acceptance Criteria
- [ ] Filters update visible results without page reload
- [ ] Empty filter results show a helpful message
- [ ] All images have meaningful alt text (not "image")
- [ ] Cost estimates use INR and are realistic (2026 pricing)
- [ ] Instructions are complete and unambiguous

---

## Feature 6: Games Hub (`/games`)

### Purpose
Provide fun, replayable browser-based Halloween mini-games that drive repeat visits and social sharing.

### Game 1: Spooky Memory Match
- Classic card-flip memory game with Halloween-themed illustrated card pairs (pumpkin, bat, ghost, witch, skull, spider, cauldron, black cat)
- 4×4 grid (8 pairs)
- Timer + move counter
- Win screen with elapsed time and move count
- Difficulty selector: Easy (3×4 / 6 pairs) / Hard (4×4 / 8 pairs)

### Game 2: Pumpkin Carving Studio
- SVG canvas with a circle pumpkin base
- Toolbox: triangle eyes, nose, mouth options (various shapes), stem, glow toggle
- User assembles a jack-o'-lantern face by selecting tools and clicking placement zones
- Glow mode: applies orange radial glow to simulate candlelight
- "Save" button downloads the SVG as a PNG via canvas capture

### Game 3: Haunted House Challenge
- 10-question Halloween trivia quiz
- Three difficulty levels: Beginner / Brave / Fearless
- Questions sourced from Guide content (verifiable facts only)
- Score screen with correct answers revealed

### Global Game Requirements
- [ ] All games function on touch screens (mobile)
- [ ] All games function with keyboard for accessibility
- [ ] No game requires a user account or login
- [ ] Scores are session-only (no persistence required for MVP)
- [ ] Each game has a restart/reset button
- [ ] Loading state shown while any game assets initialise

### Acceptance Criteria
- [ ] Memory match correctly detects matches and win condition
- [ ] Pumpkin studio renders and allows at least 5 distinct face configurations
- [ ] Trivia quiz shows 10 questions, tracks score, and reveals answers on complete
- [ ] All games render without console errors

---

## Feature 7: Event Explorer (`/events`)

### Purpose
Help users discover verified Halloween events happening in Indian cities.

### Event Card Fields
- Event name
- City
- Date and time
- Venue name
- Category: Party / Cultural / Family / Online / Competition
- Price: Free / Paid (₹XXX)
- Organiser name
- Registration link (external, opens in new tab)
- Last verified date
- Verified badge (only shown if manually confirmed)

### Filters
- City (Mumbai, Delhi, Bengaluru, Hyderabad, Pune, Chennai, Kolkata, Online)
- Category
- Date (upcoming / this week / this month)
- Price (Free / Paid / All)

### Data Strategy (MVP)
For MVP: a static JSON/TS data file with sample events clearly annotated:
```typescript
// ⚠️ SAMPLE DATA — Not real events. Replace before production launch.
```
Production: manual editor review before publishing any event. No fabricated confirmed events displayed to users.

### Acceptance Criteria
- [ ] Sample events clearly identified in development builds
- [ ] Expired events (past date) are filtered out or marked "Past Event"
- [ ] External registration links open in new tab with `rel="noopener noreferrer"`
- [ ] Empty filter results show a helpful message
- [ ] No unverified event displayed with a "Verified" badge

---

## 8. Global Platform Requirements

These requirements apply to every page and feature:

### Navigation
- Persistent top navigation bar on all pages (collapses to hamburger on mobile)
- Breadcrumb or back link within deep sections
- Active route highlighted in nav

### States
Every dynamic component must implement:
- **Loading state**: Skeleton or animated placeholder
- **Error state**: Human-readable error message + retry option
- **Empty state**: Helpful message with suggested action

### Accessibility
- WCAG 2.1 AA minimum
- Keyboard navigation complete for all interactive elements
- Visible `:focus-visible` ring on all interactive elements
- `prefers-reduced-motion` respected — disable all CSS and JS animations when active
- `aria-live` regions for dynamically updated content (filter results, plan output)

### Performance
- Code-split each route (`next/dynamic` for heavy components)
- Images served with `next/image` or appropriate loading attributes
- 3D scene lazy-loaded and non-blocking
- Font display: `swap`
