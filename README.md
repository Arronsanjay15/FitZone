# 🏋️ FitZone

### Plan smarter. Train better. Track your progress.

FitZone is a premium, offline-first fitness web application for planning workouts, learning exercises, and completing guided training sessions.

Explore **80 exercises**, create personalized workout plans, follow step-by-step instructions, and track your progress — with data saved locally in your browser.

<div align="center">

### 🚀 [Live Demo — FitZone](https://fitzonepro-zephyr.vercel.app/)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?logo=vercel&logoColor=white)](https://fitzonepro-zephyr.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](#-license)

</div>

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Exercise Library](#-exercise-library)
- [Local Data Storage](#-local-data-storage)
- [Progressive Web App and Offline Support](#-progressive-web-app-and-offline-support)
- [Accessibility](#-accessibility)
- [Customization](#-customization)
- [Data Sources and Attribution](#-data-sources-and-attribution)
- [License](#-license)

---

## 📖 About the Project

**FitZone** is a responsive, single-page fitness application built with React and TypeScript. It helps users create personalized workout plans, learn exercise techniques, complete guided workout sessions, and monitor their fitness progress.

FitZone does not require an account or backend. Workout progress, favourites, set completion, workout history, and challenge progress are stored in the browser using `localStorage`.

The application also supports Progressive Web App (PWA) features, allowing users to install it on supported devices and access cached resources offline.

**Live application:** https://fitzonepro-zephyr.vercel.app/

### Main Sections

| Section | Description |
|---|---|
| **Home** | Introduction, fitness statistics, workout focus, and challenge shortcuts. |
| **Planner** | Generates personalized workout plans based on fitness level and workout type. |
| **Dashboard** | Displays progress statistics and the 30-day workout challenge. |
| **Exercises** | Searchable exercise library with filters and favourites. |
| **History** | Displays completed guided workout sessions. |

---

## ✨ Features

### 🎯 1. Personalized Workout Planner

- Choose your fitness level: Beginner, Intermediate, or Advanced.
- Select a workout type: Dumbbell, Bodyweight, Gym, or Kickboxing.
- Select target muscle groups: Chest, Back, Arms, Shoulders, Legs, and Core.
- Generate workout plans based on your selected fitness level.
- Target-muscle filtering is not applied to Kickboxing workouts.

| Fitness Level | Sets per Exercise | Exercises per Plan |
|---|---:|---:|
| Beginner | 2 | Up to 3 |
| Intermediate | 3 | 4 |
| Advanced | 3 | 3–4 |

### 🧭 2. Guided Workout Sessions

- Full-screen, step-by-step workout guidance.
- Exercise progress indicator.
- Built-in **30-second rest timer** between exercises.
- Option to skip rest periods.
- Complete, revisit, or skip exercises.
- Workout completion summary.
- Automatic workout history tracking.

### 📚 3. Exercise Library

- **80 exercises** across four workout categories.
- Three difficulty levels.
- Search exercises by name, description, or muscle group.
- Filter by workout type, difficulty, and muscle group.
- Save favourite exercises.
- View exercise descriptions, instructions, and technique tips.

### 🖼️ 4. Exercise Images and Videos

- Exercise demonstration images from the Free Exercise DB.
- YouTube tutorial videos.
- YouTube search fallbacks when a specific tutorial is unavailable.
- Image loading placeholders and fallback icons.

### 🗓️ 5. 30-Day Workout Challenge

- A structured workout program covering 30 days.
- Automatically increasing difficulty:
  - **Days 1–10:** Beginner
  - **Days 11–20:** Intermediate
  - **Days 21–30:** Advanced
- Choose Dumbbell, Bodyweight, Gym, or Kickboxing workouts.
- Daily workouts generated according to the day's focus.
- The next day unlocks 24 hours after completing the current day.
- Track completed days, streaks, and challenge progress.

### 📈 6. Progress Tracking

- Mark individual sets as complete.
- Mark exercises as completed.
- View dashboard progress statistics.
- Track completed workout sessions.
- Monitor workout streaks and challenge completion.
- Maintain workout history between visits using browser storage.

### 📲 7. Progressive Web App (PWA)

- Install FitZone on supported desktop and mobile browsers.
- Launch the application in a standalone window.
- Cache application resources for offline access.
- Cache supported exercise images and tutorial thumbnails.
- Receive an update prompt when a new version becomes available.

### 🌙 8. Modern Responsive UI

- Premium dark interface with lime accents.
- Inter typography.
- Responsive navigation and mobile menu.
- Smooth scrolling and hover effects.
- Toast notifications.
- Scroll progress indicator.
- Floating back-to-top button.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend Framework | React 19 |
| Programming Language | TypeScript 6 |
| Build Tool | Vite 8 |
| Icons | Lucide React |
| Styling | Custom CSS and design tokens |
| State Management | React Hooks |
| Local Storage | Browser `localStorage` |
| Progressive Web App | `vite-plugin-pwa` and Workbox |
| Code Quality | ESLint and `typescript-eslint` |
| Deployment | Vercel |

### Why These Technologies?

- **React:** Builds reusable UI components and interactive interfaces.
- **TypeScript:** Provides static typing and improves code maintainability.
- **Vite:** Offers fast development and optimized production builds.
- **Lucide React:** Provides lightweight, consistent icons.
- **localStorage:** Persists workout progress without requiring a backend.
- **Workbox:** Supports service-worker caching for the PWA.

---

## 🚀 Getting Started

### Prerequisites

Install the following tools:

- **Node.js:** Version 20.19+ or 22.12+
- **npm:** Included with Node.js
- **Git:** Required to clone the repository

Check your installed versions:

```bash
node --version
npm --version
git --version
```

### Installation

**Step 1: Clone the repository**

```bash
git clone https://github.com/Arronsanjay15/FitZone.git
```

**Step 2: Navigate to the project directory**

```bash
cd FitZone
```

**Step 3: Install dependencies**

```bash
npm install
```

**Step 4: Start the development server**

```bash
npm run dev
```

Vite will display a local URL, usually:

```text
http://localhost:5173
```

Open the URL in your browser to use FitZone locally.

> If your repository URL or folder name is different, replace the values in these commands accordingly.

### Build for Production

```bash
npm run build
```

The optimized production files will be generated in the `dist/` directory.

### Preview the Production Build

```bash
npm run preview
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server with hot module replacement. |
| `npm run build` | Type-checks the TypeScript projects and creates a production build. |
| `npm run lint` | Runs ESLint to check the codebase. |
| `npm run preview` | Serves the production build locally. |
| `npm run generate-pwa-assets` | Regenerates PWA icons from `public/favicon.svg`. |

---

## 🗂️ Project Structure

```text
FitZone/
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── pwa-64x64.png
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   ├── maskable-icon-512x512.png
│   ├── apple-touch-icon-180x180.png
│   └── icons.svg
│
├── src/
│   ├── assets/                   # Static assets
│   │
│   ├── components/               # Reusable UI components
│   │   ├── AnimatedNumber.tsx
│   │   ├── BackToTop.tsx
│   │   ├── Dashboard.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ExerciseCard.tsx
│   │   ├── ExerciseDetailModal.tsx
│   │   ├── ExerciseFilters.tsx
│   │   ├── ExerciseLibrary.tsx
│   │   ├── ExerciseMedia.tsx
│   │   ├── ExerciseThumb.tsx
│   │   ├── Hero.tsx
│   │   ├── Modal.tsx
│   │   ├── Navbar.tsx
│   │   ├── Planner.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── PwaManager.tsx
│   │   ├── Reveal.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── Select.tsx
│   │   ├── ToastProvider.tsx
│   │   ├── VideoModal.tsx
│   │   ├── WorkoutHistory.tsx
│   │   └── WorkoutSession.tsx
│   │
│   ├── data/
│   │   ├── challenge.ts           # 30-day challenge data
│   │   └── exercises.ts           # Exercise dataset
│   │
│   ├── hooks/                     # Reusable React hooks
│   │
│   ├── lib/
│   │   ├── challenge.ts            # Challenge progress and unlock logic
│   │   ├── icons.ts                # Icon mappings
│   │   ├── images.ts               # Exercise image resolver
│   │   ├── planner.ts              # Workout plan generation
│   │   ├── storage.ts              # localStorage helpers
│   │   ├── toast.ts                # Toast notification logic
│   │   └── video.ts                # Video and thumbnail helpers
│   │
│   ├── App.css                     # Application styling
│   ├── App.tsx                     # Main application component
│   ├── index.css                   # Global styles
│   ├── main.tsx                    # Application entry point
│   └── types.ts                    # Shared TypeScript types
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── pwa-assets.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## ⚙️ How It Works

### Application State

`src/App.tsx` coordinates the main application state and passes the necessary data and callbacks to child components.

The main state areas include:

- **Exercise library:** Category, difficulty, search query, selected muscle groups, and favourites filter.
- **Progress tracking:** Completed exercises, set checks, workout history, and favourites.
- **Workout planner:** Selected fitness level, workout type, and generated workout plan.
- **Challenge:** Completed days, streak, unlock timing, and workout type.
- **Modals:** Selected exercise and active video.
- **Guided sessions:** Current exercise, rest timer, session progress, and completion status.

React hooks manage the interface, while `localStorage` saves relevant progress between visits.

### Workout Plan Generation

The workout planner uses `generateWorkoutPlan()` from `src/lib/planner.ts`.

The process works as follows:

1. Filter exercises by workout type and selected difficulty.
2. Apply target muscle-group preferences, except for Kickboxing.
3. Determine the number of exercises and sets based on fitness level.
4. Prioritize exercises that cover new muscle groups and selected targets.
5. Add eligible exercises if necessary to complete the plan.
6. Adjust set counts according to the selected fitness level.

This approach helps create varied workout plans that align with the user's selected preferences.

### 30-Day Challenge Generation

The challenge is defined in `src/data/challenge.ts`.

- Each day has a theme or target focus.
- Workout difficulty increases through three phases.
- Daily workouts are generated using the workout planner.
- The selected workout type is saved in challenge state.
- Plans are generated consistently for a given workout type and day.
- The next day unlocks 24 hours after the previous day's completion.

### Exercise Media Handling

The application attempts to load exercise images and supported video thumbnails.

If an image fails to load, another candidate can be tried. If all candidates fail, a fallback icon is displayed instead of leaving the exercise card blank.

### Guided Workout Flow

```text
Start Workout
      |
      v
Complete or Skip Exercise
      |
      v
30-Second Rest (Optional)
      |
      v
Move to Next Exercise
      |
      v
Finish Workout
      |
      v
Save History and Progress
```

---

## 🏆 Exercise Library

FitZone includes **80 exercises** across four workout categories and three difficulty levels.

### Exercises by Workout Type

| Workout Type | Number of Exercises |
|---|---:|
| Bodyweight | 31 |
| Dumbbell | 23 |
| Gym | 15 |
| Kickboxing | 11 |
| **Total** | **80** |

### Exercises by Difficulty

| Fitness Level | Number of Exercises |
|---|---:|
| Beginner | 34 |
| Intermediate | 31 |
| Advanced | 15 |
| **Total** | **80** |

The exercise library covers six muscle groups:

- Chest
- Back
- Arms
- Shoulders
- Legs
- Core

It includes strength training, core exercises, cardio movements, and martial-arts conditioning.

---

## 💾 Local Data Storage

FitZone uses the browser's `localStorage` to save workout progress.

| Storage Key | Information Stored |
|---|---|
| `fitzone-completed` | Completed exercise IDs |
| `fitzone-set-checks` | Set completion status for each exercise |
| `fitzone-history` | Completed workout sessions |
| `fitzone-favorites` | Favourite exercise IDs |
| `fitzone-challenge` | Challenge progress, streak, unlock timing, and workout type |

### Important Notes

- Data is stored locally in the browser.
- Progress is not automatically synchronized between devices.
- Clearing browser data may remove saved progress.
- If browser storage is unavailable, the application may continue working without saving progress persistently.

---

## 📲 Progressive Web App and Offline Support

FitZone uses [`vite-plugin-pwa`](https://vite-pwa-org.netlify.app/) and [Workbox](https://developer.chrome.com/docs/workbox/) for Progressive Web App functionality.

### PWA Components

| Component | Purpose |
|---|---|
| Web app manifest | Defines the application name, icons, colours, and display mode. |
| Service worker | Caches the application shell and applies caching rules. |
| PWA icons | Generated from `public/favicon.svg`. |
| Install control | Offers installation when supported by the browser. |
| Update prompt | Allows users to reload when a new version is available. |

### Cached Resources

- Application HTML, JavaScript, and CSS.
- Supported fonts and icons.
- Previously requested exercise images.
- Supported YouTube video thumbnails.

**Note:** YouTube video playback requires an internet connection. Offline access to external media depends on whether the relevant resources have been cached.

### Install FitZone

**Android and desktop Chrome or Edge**

Use the browser's Install option or the FitZone Install control when available.

**iPhone and iPad**

1. Open FitZone in Safari.
2. Tap the Share button.
3. Select **Add to Home Screen**.

### Test Offline Support

Build and preview the production application:

```bash
npm run build
npm run preview
```

Open the preview URL and inspect:

**Developer Tools → Application → Service Workers / Manifest**

Test offline behavior after the application has loaded and its resources have been cached.

### Regenerate PWA Icons

```bash
npm run generate-pwa-assets
```

PWA icon settings are configured in `pwa-assets.config.ts`.

---

## ♿ Accessibility

FitZone includes accessibility-focused features such as:

- Semantic HTML landmarks and sections.
- Accessible labels and dialog roles for modals.
- Keyboard-friendly controls and visible focus states.
- Escape-key and backdrop handling for dialogs.
- Accessible state attributes for toggle controls.
- Live regions for toast notifications.
- Labels for icon-only buttons.
- Responsive navigation and mobile menu controls.

---

## 🎨 Customization

### Change the Theme

Design tokens such as colours, radii, shadows, and content width are defined near the top of `src/App.css`.

If you change the primary background colour, review the theme colour in:

- `vite.config.ts`
- `index.html`

Keep the PWA theme colour consistent with the application's visual design.

### Add a New Exercise

1. Add the exercise to the `exercises` array in `src/data/exercises.ts`.
2. Add an icon mapping in `src/lib/icons.ts` if a custom icon is required.
3. Add an image mapping in `src/lib/images.ts` if the exercise needs a custom image source.

### Add a New Workout Type

Update the `Equipment` type in `src/types.ts`, then review the option lists and mappings used by:

- `src/data/exercises.ts`
- `src/lib/icons.ts`
- `src/components/Planner.tsx`
- `src/components/Dashboard.tsx`
- `src/components/Hero.tsx`

Ensure the new workout type is supported throughout the planner, exercise library, and challenge.

---

## 🔗 Data Sources and Attribution

FitZone uses external resources for exercise imagery and tutorials.

- **Exercise demonstration images:** [Free Exercise DB](https://github.com/yuhonas/free-exercise-db), distributed under the Unlicense/public-domain terms described by that project.
- **Tutorial videos:** YouTube, with privacy-enhanced `youtube-nocookie.com` embeds where supported.
- **Video thumbnails:** YouTube image hosts, including `i.ytimg.com` and `img.youtube.com`.

When an exercise does not have a matching dataset image, the application falls back to an alternative thumbnail or an exercise icon.

External media remains subject to the terms and availability of its respective providers.

---

## 📄 License

FitZone is released under the **MIT License**.

External exercise images and other media remain subject to the terms of their respective sources.

---

<div align="center">

### 💪 Build your routine. Track your progress. Keep moving.

**[Try FitZone Live](https://fitzonepro-zephyr.vercel.app/)**

</div>