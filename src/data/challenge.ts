import type {
  Exercise,
  FitnessLevel,
  MuscleGroup,
  WorkoutType
} from "../types";
import { generateWorkoutPlan } from "../lib/planner";

/** One day of the 30-day challenge: a themed muscle-building session. */
export type ChallengeDay = {
  day: number;
  title: string;
  /** Short label for the day's focus, e.g. "Push". */
  focus: string;
  /** Difficulty phase the day belongs to (progresses across the program). */
  level: FitnessLevel;
  /** Muscle groups the day targets (ignored for Kickboxing). */
  muscleGroups: MuscleGroup[];
  exercises: Exercise[];
};

/** A phase of the program where every day shares one difficulty level. */
export type ChallengePhase = {
  level: FitnessLevel;
  label: string;
  /** First day of the phase (inclusive). */
  from: number;
  /** Last day of the phase (inclusive). */
  to: number;
};

/**
 * The challenge progresses through three 10-day phases, ramping the difficulty
 * from beginner to advanced as the user builds the habit.
 */
export const challengePhases: ChallengePhase[] = [
  { level: "Beginner", label: "Foundation", from: 1, to: 10 },
  { level: "Intermediate", label: "Build", from: 11, to: 20 },
  { level: "Advanced", label: "Peak", from: 21, to: 30 }
];

/** The difficulty level for a given challenge day (1-based). */
export function challengeLevelForDay(day: number): FitnessLevel {
  const phase = challengePhases.find(
    (item) => day >= item.from && day <= item.to
  );

  return phase?.level ?? "Beginner";
}

/** The phase a given day belongs to. */
export function challengePhaseForDay(day: number): ChallengePhase | undefined {
  return challengePhases.find((item) => day >= item.from && day <= item.to);
}

/**
 * The 30-day challenge program: a structured, muscle-building rotation. Each
 * day defines a themed focus (its target muscle groups); the exercises
 * themselves are generated from the user's chosen workout type at the day's
 * phase difficulty, so the same day works for dumbbell, bodyweight, gym or
 * kickboxing training.
 */
type ChallengeDaySeed = {
  title: string;
  focus: string;
  muscleGroups: MuscleGroup[];
};

const challengeProgram: ChallengeDaySeed[] = [
  // ----- Phase 1 · Foundation (Beginner, days 1–10) -----
  { title: "Full Body Foundations", focus: "Full Body", muscleGroups: ["Chest", "Back", "Legs"] },
  { title: "Lower Body Basics", focus: "Lower Body", muscleGroups: ["Legs", "Core"] },
  { title: "Upper Body Basics", focus: "Upper Body", muscleGroups: ["Chest", "Back"] },
  { title: "Core & Stability", focus: "Core", muscleGroups: ["Core", "Shoulders"] },
  { title: "Legs & Glutes", focus: "Lower Body", muscleGroups: ["Legs"] },
  { title: "Arms & Shoulders", focus: "Arms & Shoulders", muscleGroups: ["Arms", "Shoulders"] },
  { title: "Chest & Back", focus: "Push & Pull", muscleGroups: ["Chest", "Back"] },
  { title: "Full Body Strength", focus: "Full Body", muscleGroups: ["Legs", "Chest", "Back"] },
  { title: "Core Foundations", focus: "Core", muscleGroups: ["Core"] },
  { title: "Foundation Graduation", focus: "Full Body", muscleGroups: ["Legs", "Chest", "Back", "Shoulders"] },

  // ----- Phase 2 · Build (Intermediate, days 11–20) -----
  { title: "Upper Body Push", focus: "Push", muscleGroups: ["Chest", "Shoulders", "Arms"] },
  { title: "Lower Body Strength", focus: "Lower Body", muscleGroups: ["Legs", "Core"] },
  { title: "Upper Body Pull", focus: "Pull", muscleGroups: ["Back", "Arms"] },
  { title: "Legs & Glutes II", focus: "Lower Body", muscleGroups: ["Legs"] },
  { title: "Shoulders & Core", focus: "Shoulders & Core", muscleGroups: ["Shoulders", "Core"] },
  { title: "Chest & Triceps", focus: "Push", muscleGroups: ["Chest", "Arms"] },
  { title: "Back & Biceps", focus: "Pull", muscleGroups: ["Back", "Arms"] },
  { title: "Full Body Hypertrophy", focus: "Full Body", muscleGroups: ["Legs", "Chest", "Back"] },
  { title: "Glutes & Hamstrings", focus: "Lower Body", muscleGroups: ["Legs", "Core"] },
  { title: "Build Peak", focus: "Full Body", muscleGroups: ["Chest", "Back", "Legs", "Shoulders"] },

  // ----- Phase 3 · Peak (Advanced, days 21–30) -----
  { title: "Advanced Push", focus: "Push", muscleGroups: ["Chest", "Shoulders", "Arms"] },
  { title: "Advanced Pull", focus: "Pull", muscleGroups: ["Back", "Arms"] },
  { title: "Advanced Legs", focus: "Lower Body", muscleGroups: ["Legs", "Core"] },
  { title: "Upper Body Power", focus: "Upper Body", muscleGroups: ["Chest", "Back"] },
  { title: "Lower Body Power", focus: "Lower Body", muscleGroups: ["Legs", "Core"] },
  { title: "Shoulders & Arms", focus: "Arms & Shoulders", muscleGroups: ["Shoulders", "Arms"] },
  { title: "Chest & Back Strength", focus: "Push & Pull", muscleGroups: ["Chest", "Back"] },
  { title: "Legs & Core Finisher", focus: "Lower Body", muscleGroups: ["Legs", "Core"] },
  { title: "Full Body Power", focus: "Full Body", muscleGroups: ["Legs", "Chest", "Back", "Shoulders"] },
  { title: "Grand Finale", focus: "Full Body", muscleGroups: ["Legs", "Chest", "Back", "Arms", "Shoulders"] }
];

/** Stable per-(type, day) seed so a challenge day never changes between visits. */
function seedFor(workoutType: WorkoutType, day: number): number {
  const key = `${workoutType}:${day}`;
  let hash = 2_166_136_261;

  for (let i = 0; i < key.length; i += 1) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16_777_619);
  }

  return hash >>> 0;
}

const cache = new Map<WorkoutType, ChallengeDay[]>();

/**
 * Build (and cache) the full 30-day program for a workout type. Generation is
 * deterministic, so the returned plans are identical on every call.
 */
export function challengeDaysFor(workoutType: WorkoutType): ChallengeDay[] {
  const cached = cache.get(workoutType);
  if (cached) return cached;

  const days = challengeProgram.map((seed, index) => {
    const day = index + 1;
    const level = challengeLevelForDay(day);

    const exercises = generateWorkoutPlan({
      level,
      workoutType,
      muscleGroups: seed.muscleGroups,
      seed: seedFor(workoutType, day)
    });

    return {
      day,
      title: seed.title,
      focus: seed.focus,
      level,
      muscleGroups: seed.muscleGroups,
      exercises
    };
  });

  cache.set(workoutType, days);
  return days;
}

/** Look up a single challenge day by its 1-based number. */
export function getChallengeDay(
  day: number,
  workoutType: WorkoutType
): ChallengeDay | undefined {
  return challengeDaysFor(workoutType).find((item) => item.day === day);
}
