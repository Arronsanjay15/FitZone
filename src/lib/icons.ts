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
  "leg-press": Footprints,
  "goblet-squats": Dumbbell,
  "dumbbell-shrugs": Dumbbell,
  "superman-hold": PersonStanding,
  "leg-extensions": Footprints,
  "lying-leg-curls": Footprints,
  "face-pulls": Dumbbell,
  "body-kicks": Swords,
  "dumbbell-lunges": Footprints,
  "bent-over-rows": Dumbbell,
  "dumbbell-step-ups": Footprints,
  "side-plank": Activity,
  "russian-twists": Activity,
  "jump-squats": Flame,
  "inverted-rows": PersonStanding,
  "switch-kicks": Swords,
  "jab-cross-hook": Swords,
  "barbell-overhead-press": Dumbbell,
  "barbell-bent-over-rows": Dumbbell,
  "incline-bench-press": Dumbbell,
  "renegade-rows": Dumbbell,
  "pull-ups": PersonStanding,
  "chin-ups": PersonStanding,
  "triceps-dips": PersonStanding,
  "decline-push-ups": PersonStanding,
  "hanging-leg-raises": Activity,
  "spinning-back-kick": Swords,
  "flying-knee": Swords,
  "barbell-front-squats": Footprints,
  "rack-pulls": Footprints,
  "dumbbell-reverse-lunges": Footprints,
  "dumbbell-one-arm-rows": Dumbbell,
  "cable-crunches": Activity
};

/** Fallback icon for any exercise not present in the lookup. */
export const defaultExerciseIcon = Dumbbell;
