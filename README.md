# HalloweenVerse 🎃

India's most immersive Halloween discovery platform — built for Indian audiences with 3D exploration, celebration planning in ₹, DIY costumes, browser games, and verified events.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| 3D | Three.js + React Three Fiber + Drei |
| Animation | Motion (framer-motion) |
| State | Zustand |
| Validation | Zod |
| Icons | Lucide React |
| Fonts | Space Grotesk + Inter (Google Fonts) |

## Getting started

### Prerequisites
- Node.js ≥ 20
- npm ≥ 10

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Checks

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Production build
npm run build
```

## Environment variables

No environment variables are required for the MVP. See `.env.example` for future Supabase configuration.

## Project structure

```
halloweenverse/
├── app/            # Next.js App Router pages + layouts
├── components/
│   ├── layout/     # Navbar, Footer
│   ├── ui/         # Shared UI primitives (Button, Card, Badge, etc.)
│   └── sections/   # Page-specific section components
├── src/
│   ├── data/       # Static TypeScript data modules
│   ├── lib/        # Utility functions and hooks
│   └── types/      # Shared TypeScript interfaces
├── public/         # Static assets
└── docs/           # PRD, design system, architecture docs
```

## Documentation

- [`docs/PRD.md`](docs/PRD.md) — Product Requirements Document
- [`docs/designsystem.md`](docs/designsystem.md) — Design System
- [`docs/TECHNICAL_ARCHITECTURE.md`](docs/TECHNICAL_ARCHITECTURE.md) — Technical Architecture
- [`docs/features.md`](docs/features.md) — Feature Specification
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — Implementation Roadmap
