import {
  Activity,
  Dumbbell,
  Flame,
  Footprints,
  Gauge,
  PersonStanding,
  Swords,
  TrendingUp,
  Weight,
  Zap,
  type LucideIcon
} from "lucide-react";
import type { Equipment, FitnessLevel } from "../types";

/** Icon used for each equipment category. */
export const equipmentIcons: Record<Equipment, LucideIcon> = {
  Dumbbell: Dumbbell,
  Bodyweight: PersonStanding,
  Kickboxing: Swords,
  Gym: Weight
};

/** Icon used for each difficulty level. */
export const levelIcons: Record<FitnessLevel, LucideIcon> = {
  Beginner: Gauge,
  Intermediate: TrendingUp,
  Advanced: Zap
};

/**
 * Static, per-exercise icon lookup. Declaring this at module scope keeps the
 * icon components stable across renders (they are not recreated while
 * rendering a card or the guided session).
 */
export const exerciseIcons: Record<string, LucideIcon> = {
  "dumbbell-squats": Footprints,
  "bicep-curls": Dumbbell,
  "shoulder-press": Dumbbell,
  "push-ups": PersonStanding,
  "bodyweight-squats": Footprints,
  plank: Activity,
  "dumbbell-chest-press": Dumbbell,
  "dumbbell-flyes": Dumbbell,
  "incline-push-ups": PersonStanding,
  "wide-push-ups": PersonStanding,
  "knee-push-ups": PersonStanding,
  "dumbbell-floor-press": Dumbbell,
  "hammer-curls": Dumbbell,
  "concentration-curls": Dumbbell,
  "triceps-extensions": Dumbbell,
  "triceps-kickbacks": Dumbbell,
  "diamond-push-ups": PersonStanding,
  "lateral-raises": Dumbbell,
  "front-raises": Dumbbell,
  "arnold-press": Dumbbell,
  "pike-push-ups": PersonStanding,
  "reverse-flyes": Dumbbell,
  "reverse-lunges": Footprints,
  "glute-bridges": Footprints,
  "calf-raises": Footprints,
  "romanian-deadlifts": Footprints,
  "wall-sit": Footprints,
  crunches: Activity,
  "bicycle-crunches": Activity,
  "dead-bug": Activity,
  "mountain-climbers": Flame,
  "leg-raises": Activity,
  "jumping-jacks": Flame,
  "high-knees": Flame,
  burpees: Flame,
  skaters: Flame,
  "jab-cross": Swords,
  hooks: Swords,
  uppercuts: Swords,
  "front-kick": Swords,
  "roundhouse-kick": Swords,
  "knee-strikes": Swords,
  "barbell-squats": Footprints,
  "barbell-bench-press": Dumbbell,
  "barbell-deadlift": Footprints,
  "lat-pulldown": Dumbbell,
  "seated-cable-row": Dumbbell,
  "leg-press": Footprints
};

/** Fallback icon for any exercise not present in the lookup. */
export const defaultExerciseIcon = Dumbbell;
