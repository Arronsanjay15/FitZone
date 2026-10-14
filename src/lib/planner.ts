import type {
  Exercise,
  FitnessLevel,
  MuscleGroup,
  WorkoutType
} from "../types";
import { exercises as exerciseLibrary, levelOrder } from "../data/exercises";

/**
 * How a fitness level shapes a generated workout plan.
 *
 * - Beginner: 2 sets, exactly 3 exercises (only beginner-level movements).
 * - Intermediate: 3 sets, exactly 4 exercises (beginner + intermediate).
 * - Advanced: 3 sets, 3–4 exercises, preferring advanced movements.
 */
export type PlanRules = {
  /** Smallest plan the level should produce. */
  minExercises: number;
  /** Largest plan the level should produce. */
  maxExercises: number;
  /** Sets every exercise in the plan is adjusted to. */
  sets: number;
};

export const planRules: Record<FitnessLevel, PlanRules> = {
  Beginner: { minExercises: 3, maxExercises: 3, sets: 2 },
  Intermediate: { minExercises: 4, maxExercises: 4, sets: 3 },
  Advanced: { minExercises: 3, maxExercises: 4, sets: 3 }
};

export type PlanRequest = {
  level: FitnessLevel;
  workoutType: WorkoutType;
  /** Target muscle groups. Empty means "every group". */
  muscleGroups: MuscleGroup[];
  /**
   * Optional seed. When provided, generation is deterministic, so the same
   * request always yields the same plan (used by the 30-day challenge).
   */
  seed?: number;
};

/**
 * Exercises a level is allowed to train: its own level and everything easier.
 * A beginner therefore only gets beginner movements, while an advanced user can
 * draw on the whole library.
 */
export function filterEligibleExercises({
  level,
  workoutType,
  muscleGroups
}: PlanRequest): Exercise[] {
  return exerciseLibrary.filter((exercise) => {
    const levelMatch = levelOrder[exercise.level] <= levelOrder[level];

    const categoryMatch = exercise.category === workoutType;

    // Kickboxing does not use the target-muscle filter.
    const muscleMatch =
      workoutType === "Kickboxing" ||
      muscleGroups.length === 0 ||
      muscleGroups.some((group) => exercise.muscleGroups.includes(group));

    return levelMatch && categoryMatch && muscleMatch;
  });
}

/** Small, fast, seedable PRNG (mulberry32). */
function createRandom(seed?: number): () => number {
  if (seed === undefined) return Math.random;

  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
}

/** In-place Fisher-Yates shuffle driven by the run's random source. */
function shuffle<T>(items: T[], random: () => number): T[] {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

/** Pick the plan size for a level, clamped to what the library can supply. */
function targetExerciseCount(
  rules: PlanRules,
  available: number,
  random: () => number
): number {
  const span = rules.maxExercises - rules.minExercises;
  const count =
    rules.minExercises + (span > 0 ? Math.floor(random() * (span + 1)) : 0);

  return Math.min(available, count);
}

/**
 * Greedily fill `target` (up to `maxCount`) from `pool`, prefering exercises
 * that cover not-yet-used muscles and the user's own difficulty level.
 * `usedMuscles` is shared across calls so a later backfill pass still favours
 * muscles the earlier pass left uncovered.
 */
function fillPlan(
  target: Exercise[],
  pool: Exercise[],
  maxCount: number,
  usedMuscles: Set<MuscleGroup>,
  request: PlanRequest,
  preferredDifficulty: number,
  random: () => number
): void {
  const shuffled = shuffle([...pool], random);

  while (target.length < maxCount) {
    const remaining = shuffled.filter(
      (exercise) => !target.some((item) => item.id === exercise.id)
    );

    if (remaining.length === 0) break;

    let bestScore = -1;
    let bestCandidates: Exercise[] = [];

    for (const exercise of remaining) {
      const newMuscles = exercise.muscleGroups.filter(
        (group) => !usedMuscles.has(group)
      );

      let score = newMuscles.length;

      if (request.workoutType !== "Kickboxing") {
        const uncoveredTargets = request.muscleGroups.filter(
          (group) =>
            !usedMuscles.has(group) && exercise.muscleGroups.includes(group)
        );

        score += uncoveredTargets.length * 2;
      }

      // Prefer movements at the user's own level so difficulty scales with it.
      if (levelOrder[exercise.level] === preferredDifficulty) {
        score += 3;
      }

      if (score > bestScore) {
        bestScore = score;
        bestCandidates = [exercise];
      } else if (score === bestScore) {
        bestCandidates.push(exercise);
      }
    }

    const chosen = bestCandidates[Math.floor(random() * bestCandidates.length)];

    if (!chosen) break;

    target.push(chosen);

    chosen.muscleGroups.forEach((group) => usedMuscles.add(group));
  }
}

/**
 * Build a level-appropriate workout plan.
 *
 * Exercises are selected to cover as many (targeted) muscle groups as possible,
 * with a difficulty nudge toward the user's own level so a higher level actually
 * feels harder. Every exercise in the returned plan is adjusted to the level's
 * set count (e.g. 2 sets for beginners). Returned exercises are copies, so the
 * shared library is never mutated.
 *
 * If the chosen muscle groups are too narrow for the level (e.g. a beginner gym
 * "core" day), the plan is topped up with other exercises from the same workout
 * type and level so a full session is always produced.
 */
export function generateWorkoutPlan(request: PlanRequest): Exercise[] {
  const rules = planRules[request.level];

  // Everything the level may train for this workout type — the backfill pool.
  const levelPool = exerciseLibrary.filter(
    (exercise) =>
      exercise.category === request.workoutType &&
      levelOrder[exercise.level] <= levelOrder[request.level]
  );

  if (levelPool.length === 0) return [];

  const preferred = filterEligibleExercises(request);
  const random = createRandom(request.seed);
  const targetCount = targetExerciseCount(rules, levelPool.length, random);
  const preferredDifficulty = levelOrder[request.level];

  const selected: Exercise[] = [];
  const usedMuscles = new Set<MuscleGroup>();

  // Pass 1: honour the targeted muscle groups.
  fillPlan(
    selected,
    preferred,
    targetCount,
    usedMuscles,
    request,
    preferredDifficulty,
    random
  );

  // Pass 2: if the focus was too thin, fill the rest of the session.
  if (selected.length < targetCount) {
    const reserve = levelPool.filter(
      (exercise) => !preferred.some((item) => item.id === exercise.id)
    );

    fillPlan(
      selected,
      reserve,
      targetCount,
      usedMuscles,
      request,
      preferredDifficulty,
      random
    );
  }

  // Adjust every exercise in the plan to the level's set count.
  return selected.map((exercise) => ({ ...exercise, sets: rules.sets }));
}
