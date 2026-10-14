/**
 * Shared domain types for the FitZone app.
 */

/** Equipment-based grouping used by the library filters and cards. */
export type Equipment = "Dumbbell" | "Bodyweight" | "Kickboxing" | "Gym";

/** Equipment filter, including the "All" option. */
export type Category = "All" | Equipment;

export type MuscleGroup =
  | "Chest"
  | "Back"
  | "Arms"
  | "Shoulders"
  | "Legs"
  | "Core";

export type FitnessLevel = "Beginner" | "Intermediate" | "Advanced";

/** Difficulty filter, including the "All" option. */
export type LevelFilter = "All" | FitnessLevel;

/** Workout styles offered by the planner and the hero focus selector. */
export type WorkoutType = Equipment;

export type Exercise = {
  id: string;
  name: string;
  /** Equipment grouping for this exercise. */
  category: Equipment;
  level: FitnessLevel;
  sets: number;
  reps: string;
  description: string;
  /** Human readable list of the muscles worked. */
  muscles: string;
  muscleGroups: MuscleGroup[];
  instructions: string[];
  /** Short, important safety / technique tips. */
  tips: string[];
  /** Verified YouTube video id for a tutorial demonstrating the exercise. */
  videoId?: string;
};

export type WorkoutHistoryEntry = {
  id: string;
  completedAt: string;
  exerciseNames: string[];
  totalExercises: number;
};

export type SetChecks = Record<string, boolean[]>;

/** Progress for the Dashboard's 30-day challenge. */
export type ChallengeState = {
  /** Challenge days (1–30) the user has completed. */
  completedDays: number[];
  /** Highest day that is currently unlocked (starts at 1). */
  unlockedDay: number;
  /** Consecutive calendar days with at least one completed challenge day. */
  streak: number;
  /** Local `yyyy-mm-dd` of the most recent completion, used to grow the streak. */
  lastCompletedDate: string | null;
  /** ISO timestamp of the most recent completion, used for the 24h unlock timer. */
  lastCompletedAt: string | null;
  /** Workout type the muscle-building challenge program is built around. */
  workoutType: WorkoutType;
};

/** Compact view of the challenge for the Hero and other summaries. */
export type ChallengeSummary = {
  /** Current (unlocked) day number. */
  day: number;
  /** Total number of challenge days. */
  length: number;
  /** Title of the current day's workout. */
  title: string;
  /** True once every day is complete. */
  finished: boolean;
  /** Timestamp the next day unlocks, or null when nothing is pending. */
  nextUnlockAt: number | null;
};
