import type { ChallengeState, WorkoutType } from "../types";
import { equipmentOptions } from "../data/exercises";

/** How many days the challenge runs for. */
export const CHALLENGE_LENGTH = 30;

/** How long the next day stays locked after a workout is finished. */
export const UNLOCK_HOURS = 24;
export const UNLOCK_MS = UNLOCK_HOURS * 60 * 60 * 1000;

/** Default workout type for a fresh challenge program. */
export const DEFAULT_CHALLENGE_TYPE: WorkoutType = "Dumbbell";

const isWorkoutType = (value: unknown): value is WorkoutType =>
  typeof value === "string" &&
  (equipmentOptions as readonly string[]).includes(value);

/** A brand new, untouched challenge. */
export function emptyChallenge(): ChallengeState {
  return {
    completedDays: [],
    unlockedDay: 1,
    streak: 0,
    lastCompletedDate: null,
    lastCompletedAt: null,
    workoutType: DEFAULT_CHALLENGE_TYPE
  };
}

const clampDay = (day: number) =>
  Math.min(Math.max(1, day), CHALLENGE_LENGTH);

/** Local `yyyy-mm-dd` key — avoids the timezone drift of `toISOString`. */
export function dateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Whole-day difference between two `yyyy-mm-dd` keys. */
function daysBetween(from: string, to: string): number {
  const [fy, fm, fd] = from.split("-").map(Number);
  const [ty, tm, td] = to.split("-").map(Number);

  const start = Date.UTC(fy, fm - 1, fd);
  const end = Date.UTC(ty, tm - 1, td);

  return Math.round((end - start) / 86_400_000);
}

/**
 * Grow or reset the streak based on consecutive calendar days:
 * - same day again  → unchanged
 * - next day        → +1
 * - any longer gap  → restart at 1
 */
export function nextStreak(
  previous: ChallengeState,
  today = dateKey()
): number {
  if (!previous.lastCompletedDate) return 1;

  const gap = daysBetween(previous.lastCompletedDate, today);

  if (gap <= 0) return Math.max(1, previous.streak);
  if (gap === 1) return previous.streak + 1;
  return 1;
}

/**
 * Complete a day and start the 24-hour cooldown before the next day unlocks.
 * Completing an already-finished day is a no-op so the timer can't be reset.
 */
export function completeDay(
  previous: ChallengeState,
  day: number,
  now = Date.now()
): ChallengeState {
  if (previous.completedDays.includes(day)) return previous;

  const completedDays = [...previous.completedDays, day].sort(
    (a, b) => a - b
  );

  return {
    ...previous,
    completedDays,
    unlockedDay: Math.max(previous.unlockedDay, clampDay(day)),
    streak: nextStreak(previous),
    lastCompletedDate: dateKey(new Date(now)),
    lastCompletedAt: new Date(now).toISOString()
  };
}

/** Timestamp at which the next day becomes available, or `null` if none is pending. */
export function nextUnlockAt(previous: ChallengeState): number | null {
  if (!previous.lastCompletedAt) return null;
  if (!previous.completedDays.includes(previous.unlockedDay)) return null;
  if (previous.unlockedDay >= CHALLENGE_LENGTH) return null;

  const completedAt = Date.parse(previous.lastCompletedAt);
  if (Number.isNaN(completedAt)) return null;

  return completedAt + UNLOCK_MS;
}

/**
 * Unlock the next day once its 24-hour cooldown has elapsed. Returns the same
 * object when nothing changes so callers can bail out of renders cheaply.
 */
export function advanceChallenge(
  previous: ChallengeState,
  now = Date.now()
): ChallengeState {
  const unlockAt = nextUnlockAt(previous);

  if (unlockAt === null || now < unlockAt) return previous;

  return { ...previous, unlockedDay: clampDay(previous.unlockedDay + 1) };
}

/** Repair anything read from storage (older saves, hand-edited data, …). */
export function normalizeChallenge(value: unknown): ChallengeState {
  if (!value || typeof value !== "object") return emptyChallenge();

  const raw = value as Partial<ChallengeState> & { currentDay?: number };

  const completedDays = Array.isArray(raw.completedDays)
    ? raw.completedDays.filter(
        (day): day is number =>
          typeof day === "number" && day >= 1 && day <= CHALLENGE_LENGTH
      )
    : [];

  const unlockedDay = clampDay(
    typeof raw.unlockedDay === "number"
      ? raw.unlockedDay
      : typeof raw.currentDay === "number"
        ? raw.currentDay
        : completedDays.length + 1
  );

  return {
    completedDays: [...new Set(completedDays)].sort((a, b) => a - b),
    unlockedDay,
    streak: typeof raw.streak === "number" ? raw.streak : 0,
    lastCompletedDate:
      typeof raw.lastCompletedDate === "string"
        ? raw.lastCompletedDate
        : null,
    lastCompletedAt:
      typeof raw.lastCompletedAt === "string"
        ? raw.lastCompletedAt
        : null,
    workoutType: isWorkoutType(raw.workoutType)
      ? raw.workoutType
      : DEFAULT_CHALLENGE_TYPE
  };
}
