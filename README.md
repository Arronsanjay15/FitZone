<div align="center">

# 🏋️ FitZone

**A premium, offline-first fitness web app for planning, learning, and completing guided workouts.**

Build a personalized workout plan, explore a curated library of **48 exercises**, follow step-by-step instructions, watch technique videos, and track your progress — all saved locally in your browser.

### [🚀 Live Demo → fitzonepro-zephyr.vercel.app](https://fitzonepro-zephyr.vercel.app/)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?logo=vercel&logoColor=white)](https://fitzonepro-zephyr.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Lucide](https://img.shields.io/badge/icons-Lucide-f56565?logo=lucide&logoColor=white)](https://lucide.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](#-license)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Data Model](#-data-model)
- [Exercise Library](#-exercise-library)
- [Data Sources & Attribution](#-data-sources--attribution)
- [Persistence](#-persistence)
- [Accessibility](#-accessibility)
- [Customization](#-customization)
- [License](#-license)

---

## 🔎 Overview

FitZone is a single-page React application with **no backend and no account required**. Everything a user does — completed exercises, per-set check-offs, and finished workout sessions — is persisted to `localStorage`, so the app works fully offline after the first load and keeps progress between visits.

> 🔗 **Try it now:** [https://fitzonepro-zephyr.vercel.app/](https://fitzonepro-zephyr.vercel.app/) — deployed on Vercel.

The experience is organized into five anchor-linked sections:

| Section | Purpose |
| --- | --- |
| **Home** | Hero introduction with live stats and primary calls to action. |
| **Planner** | Generates a personalized 3–4 exercise workout from your selections. |
| **Dashboard** | Progress overview: exercises, completions, sessions, and sets. |
| **Exercises** | Searchable, filterable library of all exercises. |
| **History** | Log of guided workout sessions you have finished. |

---

## ✨ Features

### 🎯 Personalized Workout Planner
- Choose a **fitness level** (Beginner / Intermediate / Advanced).
- Choose a **workout type** (Dumbbell / Bodyweight / Gym / Kickboxing).
- Select **target muscle groups** (Chest, Back, Arms, Shoulders, Legs, Core).
- Generates a tailored **3–4 exercise plan** using a coverage-based selection algorithm (see [How It Works](#-how-it-works)).

### 🧭 Guided Workout Sessions
- Full-screen step-by-step session runner with an exercise progress bar.
- Built-in **30-second rest timer** between exercises, with skip option.
- Complete, go back, or skip exercises, and a celebratory completion summary.
- Finishing a session automatically logs it to your history.

### 📚 Exercise Library
- **48 curated exercises** across four equipment categories.
- Live **search** across names, descriptions, and muscles.
- Filter by **equipment**, **difficulty**, and multiple **muscle groups**.
- Responsive filter sidebar with an active-filter reset.

### 🖼️ Rich Exercise Media
- Demonstration photos from the open **Free Exercise DB**.
- Verified **YouTube tutorial** embeds with graceful search fallback.
- Multi-source, resilient image loading with skeleton and icon fallbacks.

### ✅ Progress Tracking
- Mark individual **sets** as complete per exercise.
- Mark whole exercises as **done**.
- Animated dashboard statistics and a persistent workout history.

### 🌙 Premium Dark UI
- Refined dark theme with a single lime accent and Inter typography.
- Smooth scrolling, hover states, and responsive layouts.
- Fully responsive navigation with a mobile menu.

---

## 🛠 Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | [React 19](https://react.dev/) (function components + hooks) |
| **Language** | [TypeScript 6](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vite.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Styling** | Hand-written CSS with design tokens (`App.css`) |
| **Linting** | ESLint 10 + `typescript-eslint` + React Hooks / Refresh plugins |
| **State & Persistence** | React `useState` / `useMemo` + browser `localStorage` |

No routing library, no state-management library, and no runtime data fetching framework — the app intentionally stays lean.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.19+ or 22.12+ (required by Vite 8)
- **npm** (or pnpm / yarn)

### Installation

```bash
# 1. Clone the repository
git clone <your-repository-url>
cd FitZone

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Vite prints a local URL (typically `http://localhost:5173`). Open it in your browser.

### Production Build

```bash
npm run build     # type-check + bundle into dist/
npm run preview   # serve the production build locally
```

---

## 📜 Available Scripts

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `vite` | Start the development server with HMR. |
| `build` | `tsc -b && vite build` | Type-check all projects, then build for production. |
| `lint` | `eslint .` | Run ESLint across the codebase. |
| `preview` | `vite preview` | Preview the production build locally. |

---

## 🗂 Project Structure

```text
FitZone/
├─ public/
│  ├─ favicon.svg              # App favicon
│  └─ icons.svg                # Shared public icon sprite
├─ src/
│  ├─ assets/                  # Static images and starter SVGs
│  ├─ components/              # UI components (presentational + shell)
│  │  ├─ Dashboard.tsx         # Progress statistics + quick start
│  │  ├─ EmptyState.tsx        # Reusable empty-state block
│  │  ├─ ExerciseCard.tsx      # Library/plan exercise card
│  │  ├─ ExerciseDetailModal.tsx # Full exercise details dialog
│  │  ├─ ExerciseFilters.tsx   # Search + equipment/level/muscle filters
│  │  ├─ ExerciseLibrary.tsx   # Library section + layout
│  │  ├─ ExerciseMedia.tsx     # Resilient image/thumbnail component
│  │  ├─ Hero.tsx              # Landing hero with live stats
│  │  ├─ Modal.tsx             # Accessible modal shell
│  │  ├─ Navbar.tsx            # Sticky navigation + mobile menu
│  │  ├─ Planner.tsx           # Workout planner form + results
│  │  ├─ SectionHeading.tsx    # Shared section heading
│  │  ├─ VideoModal.tsx        # YouTube tutorial modal
│  │  ├─ WorkoutHistory.tsx    # Saved sessions list
│  │  └─ WorkoutSession.tsx    # Guided session runner
│  ├─ data/
│  │  └─ exercises.ts          # The full 48-exercise dataset + lookups
│  ├─ lib/
│  │  ├─ icons.ts              # Equipment / level / exercise icon maps
│  │  ├─ images.ts             # Free Exercise DB image URL resolver
│  │  ├─ storage.ts            # Typed localStorage helpers
│  │  └─ video.ts              # YouTube URL + thumbnail resolver
│  ├─ App.css                  # All component styling + design tokens
│  ├─ App.tsx                  # Application root: state + orchestration
│  ├─ index.css                # Base document styles + font import
│  ├─ main.tsx                 # React entry point
│  └─ types.ts                 # Shared domain types
├─ .gitignore
├─ eslint.config.js            # Flat ESLint configuration
├─ index.html                  # HTML entry point
├─ package.json                # Dependencies + scripts
├─ tsconfig.json               # Root TS project references
├─ tsconfig.app.json           # App TS config
├─ tsconfig.node.json          # Build-tooling TS config
└─ vite.config.ts              # Vite configuration
```

---

## ⚙️ How It Works

### Application State (root)

`src/App.tsx` is the single source of truth. It owns all application state with `useState` and derives filtered data with `useMemo`, passing values down as props:

- **Library filters** — `category`, `levelFilter`, `search`, `selectedMuscles`
- **Persisted progress** — `completedExercises`, `setChecks`, `workoutHistory`
- **Planner** — `plannerLevel`, `selectedWorkoutType`, `plan`
- **Modals** — `selectedExercise`, `activeVideo`
- **Guided session** — `session`, `sessionIndex`, `sessionOpen`, `resting`, `restSeconds`, `sessionFinished`

Three `useEffect` hooks sync progress state back to `localStorage`; a fourth drives the rest countdown timer.

### The Planning Algorithm

`generatePlan()` builds a balanced plan in four steps:

1. **Filter** the library to exercises at or below the selected difficulty level whose equipment matches the chosen workout type. Target-muscle filtering applies to every type **except Kickboxing**.
2. **Shuffle** the eligible exercises.
3. **Pick 3 or 4** exercises (randomized) using a greedy, coverage-maximizing loop:
   - Prefer exercises that introduce **new muscle groups** (`score += newMuscles`).
   - Bonus-weight exercises that cover your explicitly **selected target muscles** (`score += uncoveredSelected * 2`).
   - Break ties randomly for variety.
4. Store the result as the active `plan`.

This keeps plans varied between generations while still respecting your goals.

### Resilient Media Loading

`ExerciseMedia` builds an ordered list of candidate image URLs — curated Free Exercise DB photos first, then verified YouTube thumbnails — and walks the list on any load error. While loading it shows a skeleton; if every candidate fails, it falls back to a per-exercise Lucide icon. A card can therefore never render blank or crash due to a broken image.

### Guided Session Flow

```
startWorkout() → exercise 1 → Complete → [30s rest] → exercise 2 → … → finishSession()
                                                                              │
                                                        saves history + completed exercises
```

---

## 🧬 Data Model

Defined in `src/types.ts`:

```ts
type Equipment    = "Dumbbell" | "Bodyweight" | "Kickboxing" | "Gym";
type MuscleGroup  = "Chest" | "Back" | "Arms" | "Shoulders" | "Legs" | "Core";
type FitnessLevel = "Beginner" | "Intermediate" | "Advanced";

type Exercise = {
  id: string;
  name: string;
  category: Equipment;
  level: FitnessLevel;
  sets: number;
  reps: string;
  description: string;
  muscles: string;
  muscleGroups: MuscleGroup[];
  instructions: string[];
  tips: string[];
  videoId?: string;      // verified YouTube tutorial id
};

type WorkoutHistoryEntry = {
  id: string;
  completedAt: string;   // ISO timestamp
  exerciseNames: string[];
  totalExercises: number;
};

type SetChecks = Record<string, boolean[]>;   // exerciseId → per-set flags
```

Each `Exercise` also carries a **description**, ordered **step-by-step instructions**, and safety/technique **tips** surfaced in the detail and session views.

---

## 🏆 Exercise Library

The library contains **48 exercises**, split across equipment categories and difficulty levels:

**By equipment**

| Category | Count |
| --- | ---: |
| Bodyweight | 21 |
| Dumbbell | 15 |
| Gym | 6 |
| Kickboxing | 6 |

**By difficulty**

| Level | Count |
| --- | ---: |
| Beginner | 24 |
| Intermediate | 19 |
| Advanced | 5 |

Exercises span all six muscle groups (Chest, Back, Arms, Shoulders, Legs, Core) and cover strength, core, cardio, and martial-arts conditioning.

---

## 🔗 Data Sources & Attribution

FitZone pulls in open external resources for media, with safe fallbacks everywhere:

- **Demonstration photos** — [Free Exercise DB](https://github.com/yuhonas/free-exercise-db) (Unlicense / public domain), mirrored via `cdn.jsdelivr.net` and `raw.githubusercontent.com`.
- **Tutorial videos** — YouTube. Verified `videoId`s are embedded through `youtube-nocookie.com`; every exercise also has a generated YouTube search fallback so the feature always works.
- **Thumbnails** — YouTube image hosts (`i.ytimg.com`, `img.youtube.com`).

> Exercises not covered by the dataset (e.g. burpees, high knees, kickboxing drills) gracefully fall back to their tutorial thumbnail or an icon.

---

## 💾 Persistence

Progress is stored in `localStorage` under three keys (see `src/lib/storage.ts`):

| Key | Contents |
| --- | --- |
| `fitzone-completed` | Array of completed exercise ids |
| `fitzone-set-checks` | Map of exercise id → per-set completion flags |
| `fitzone-history` | Array of finished workout sessions |

Storage access is wrapped in `try/catch`, so private-browsing modes or quota errors degrade gracefully — progress simply won't persist, and the app keeps working.

---

## ♿ Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`, `section`).
- Modals use `role="dialog"`, `aria-modal`, `aria-labelledby`, lock background scroll, trap initial focus on the close button, and close on **Escape** or backdrop click.
- Toggle buttons expose state via `aria-pressed` / `aria-expanded`.
- Icon-only controls provide `aria-label`s, and decorative icons use `aria-hidden`.
- Visible focus states and a responsive, keyboard-friendly mobile menu.

---

## 🎨 Customization

**Theme & design tokens** live at the top of `src/App.css` in `:root` — colors (`--accent`, `--bg`, `--surface`), radii, shadows, and `--maxw`. Change them once to re-skin the entire app.

**Adding an exercise** — append an entry to the `exercises` array in `src/data/exercises.ts`. To give it custom imagery/icons, also add it to:

- `src/lib/icons.ts` → `exerciseIcons`
- `src/lib/images.ts` → `datasetFolders`

**Adding a workout type** — extend the `Equipment` union in `src/types.ts`, the `WorkoutType` union in `src/components/Planner.tsx`, and the `equipmentIcons` / `equipmentOptions` / `equipmentLabels` maps.

---

## 📄 License

This project is released under the **MIT License**. Exercise media is used under the terms of its respective sources (see [Data Sources & Attribution](#-data-sources--attribution)).

---

<div align="center">

**Build your routine. Track your progress. Keep moving.** 💪

</div>
