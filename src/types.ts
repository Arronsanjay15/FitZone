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
