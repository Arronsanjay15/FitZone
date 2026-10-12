import type { Exercise } from "../types";
import { exercises } from "./exercises";

/** One day of the 30-day challenge: a themed mini-workout. */
export type ChallengeDay = {
  day: number;
  title: string;
  /** Short label for the day's focus, e.g. "Full Body". */
  focus: string;
  exercises: Exercise[];
};

type ChallengeDaySeed = {
  title: string;
  focus: string;
  exerciseIds: string[];
};

/**
 * The 30-day challenge program. Each day references ids from the shared
 * exercise library so the dashboard can show the plan and launch it inside the
 * existing guided workout session.
 */
const challengeSeeds: ChallengeDaySeed[] = [
  { title: "Full Body Ignition", focus: "Full Body", exerciseIds: ["bodyweight-squats", "knee-push-ups", "plank"] },
  { title: "Upper Body Start", focus: "Upper Body", exerciseIds: ["incline-push-ups", "bicep-curls", "lateral-raises"] },
  { title: "Lower Body & Core", focus: "Lower Body", exerciseIds: ["reverse-lunges", "glute-bridges", "crunches"] },
  { title: "Cardio Kickstart", focus: "Cardio", exerciseIds: ["jumping-jacks", "high-knees", "plank"] },
  { title: "Chest & Arms", focus: "Push", exerciseIds: ["dumbbell-chest-press", "hammer-curls", "triceps-kickbacks"] },
  { title: "Back & Shoulders", focus: "Pull", exerciseIds: ["lat-pulldown", "reverse-flyes", "front-raises"] },
  { title: "Active Recovery", focus: "Recovery", exerciseIds: ["glute-bridges", "calf-raises", "dead-bug"] },
  { title: "Full Body Strength", focus: "Full Body", exerciseIds: ["dumbbell-squats", "push-ups", "bicep-curls"] },
  { title: "Core Circuit", focus: "Core", exerciseIds: ["crunches", "bicycle-crunches", "plank"] },
  { title: "Upper Body Pump", focus: "Upper Body", exerciseIds: ["dumbbell-chest-press", "shoulder-press", "hammer-curls"] },
  { title: "Leg Builder", focus: "Lower Body", exerciseIds: ["romanian-deadlifts", "reverse-lunges", "calf-raises"] },
  { title: "Kickboxing Cardio", focus: "Cardio", exerciseIds: ["jab-cross", "front-kick", "knee-strikes"] },
  { title: "Push Power", focus: "Push", exerciseIds: ["wide-push-ups", "dumbbell-flyes", "triceps-extensions"] },
  { title: "Recovery Flow", focus: "Recovery", exerciseIds: ["glute-bridges", "wall-sit", "dead-bug"] },
  { title: "Full Body Burn", focus: "Full Body", exerciseIds: ["dumbbell-squats", "push-ups", "mountain-climbers"] },
  { title: "Back & Biceps", focus: "Pull", exerciseIds: ["seated-cable-row", "lat-pulldown", "concentration-curls"] },
  { title: "Core & Legs", focus: "Core", exerciseIds: ["bicycle-crunches", "reverse-lunges", "glute-bridges"] },
  { title: "Shoulder Sculpt", focus: "Shoulders", exerciseIds: ["shoulder-press", "lateral-raises", "reverse-flyes"] },
  { title: "Leg Day", focus: "Lower Body", exerciseIds: ["barbell-squats", "leg-press", "calf-raises"] },
  { title: "Kickboxing Blitz", focus: "Cardio", exerciseIds: ["hooks", "uppercuts", "roundhouse-kick"] },
  { title: "Chest & Triceps", focus: "Push", exerciseIds: ["barbell-bench-press", "dumbbell-floor-press", "triceps-kickbacks"] },
  { title: "Active Recovery", focus: "Recovery", exerciseIds: ["glute-bridges", "calf-raises", "dead-bug"] },
  { title: "Full Body Power", focus: "Full Body", exerciseIds: ["dumbbell-squats", "push-ups", "plank"] },
  { title: "Pull Strength", focus: "Pull", exerciseIds: ["barbell-deadlift", "seated-cable-row", "lat-pulldown"] },
  { title: "Core Inferno", focus: "Core", exerciseIds: ["bicycle-crunches", "leg-raises", "mountain-climbers"] },
  { title: "Leg Endurance", focus: "Lower Body", exerciseIds: ["barbell-squats", "reverse-lunges", "wall-sit"] },
  { title: "Shoulders & Arms", focus: "Shoulders", exerciseIds: ["arnold-press", "pike-push-ups", "hammer-curls"] },
  { title: "Conditioning", focus: "Cardio", exerciseIds: ["burpees", "high-knees", "skaters"] },
  { title: "Total Body Final", focus: "Full Body", exerciseIds: ["barbell-deadlift", "barbell-bench-press", "romanian-deadlifts"] },
  { title: "Grand Finale", focus: "Push", exerciseIds: ["burpees", "diamond-push-ups", "mountain-climbers"] }
];

const exerciseById = new Map(
  exercises.map((exercise) => [exercise.id, exercise])
);

export const challengeDays: ChallengeDay[] = challengeSeeds.map(
  (seed, index) => ({
    day: index + 1,
    title: seed.title,
    focus: seed.focus,
    exercises: seed.exerciseIds
      .map((id) => exerciseById.get(id))
      .filter((exercise): exercise is Exercise => Boolean(exercise))
  })
);

const dayByNumber = new Map(challengeDays.map((day) => [day.day, day]));

/** Look up a single challenge day by its 1-based number. */
export function getChallengeDay(day: number): ChallengeDay | undefined {
  return dayByNumber.get(day);
}
