import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  CircleCheck,
  Dumbbell,
  Flame,
  Lock,
  Play,
  Timer,
  Trophy
} from "lucide-react";

import type { ChallengeState } from "../types";
import { getChallengeDay } from "../data/challenge";
import { nextUnlockAt, UNLOCK_HOURS } from "../lib/challenge";
import { AnimatedNumber } from "./AnimatedNumber";
import { ExerciseThumb } from "./ExerciseThumb";
import { ProgressBar } from "./ProgressBar";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type DashboardProps = {
  totalExercises: number;
  challenge: ChallengeState;
  challengeLength: number;
  onStartDay: (day: number) => void;
  onCompleteDay: (day: number) => void;
  onResetChallenge: () => void;
  onStartVisible: () => void;
};

/** `HH:MM:SS` for the 24-hour unlock countdown. */
function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

/** `9:00 AM` style label for the exact unlock time. */
function formatClock(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit"
  });
}

export function Dashboard({
  totalExercises,
  challenge,
  challengeLength,
  onStartDay,
  onCompleteDay,
  onResetChallenge,
  onStartVisible
}: DashboardProps) {
  const completedDays = challenge.completedDays.length;
  const completion =
    challengeLength > 0
      ? Math.round((completedDays / challengeLength) * 100)
      : 0;
  const finished = completedDays >= challengeLength;

  const currentDay = challenge.unlockedDay;
  const currentTask = getChallengeDay(currentDay);
  const currentDone = challenge.completedDays.includes(currentDay);
  const unlockAt = nextUnlockAt(challenge);

  const days = Array.from({ length: challengeLength }, (_, index) => index + 1);

  // Live clock for the unlock countdown (only ticks while a day is pending).
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (unlockAt === null || unlockAt <= Date.now()) return;

    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [unlockAt]);

  const countdown =
    unlockAt !== null ? formatCountdown(unlockAt - now) : "00:00:00";

  return (
    <section className="section" id="workouts">
      <SectionHeading
        label="Explore"
        title="Your fitness dashboard"
        description={`Take on the 30-day challenge — a new workout every day, unlocked ${
          UNLOCK_HOURS
        } hours after the last.`}
      />

      <Reveal className="challenge-panel">
        <div className="challenge-head">
          <div className="challenge-intro">
            <p className="section-label">
              <Flame size={14} aria-hidden="true" />
              30-Day Challenge
            </p>

            <h3>
              {finished
                ? "Challenge complete!"
                : currentDone
                  ? `Day ${currentDay} complete`
                  : `Day ${currentDay} of ${challengeLength}`}
            </h3>

            <p>
              {finished
                ? "You finished all 30 days. Reset any time to start a fresh streak."
                : currentDone
                  ? `Nice work. Day ${currentDay + 1} unlocks in ${countdown}.`
                  : "Finish today's workout, then rest — the next day unlocks 24 hours later."}
            </p>
          </div>

          <div className="challenge-stats">
            <div className="challenge-stat">
              <span className="challenge-stat-icon">
                <Flame size={18} aria-hidden="true" />
              </span>
              <div>
                <strong>{challenge.streak}</strong>
                <span>day streak</span>
              </div>
            </div>
            <div className="challenge-stat">
              <span className="challenge-stat-icon">
                <CircleCheck size={18} aria-hidden="true" />
              </span>
              <div>
                <strong>{completedDays}</strong>
                <span>of {challengeLength} done</span>
              </div>
            </div>
          </div>
        </div>

        <div className="challenge-progress">
          <div className="challenge-progress-head">
            <span>Challenge progress</span>
            <strong>{completion}%</strong>
          </div>
          <ProgressBar
            value={completedDays}
            max={challengeLength}
            label={`30-day challenge progress: ${completion}%`}
          />
        </div>

        {finished ? (
          <div className="challenge-finished">
            <span className="challenge-finished-icon">
              <Trophy size={22} aria-hidden="true" />
            </span>
            <div>
              <strong>All {challengeLength} days complete</strong>
              <p>You built a month-long habit. That&rsquo;s legendary.</p>
            </div>
          </div>
        ) : currentTask ? (
          <div className={`challenge-today${currentDone ? " is-done" : ""}`}>
            <div className="challenge-today-head">
              <span className="challenge-today-badge" aria-hidden="true">
                {currentDone ? <Check size={16} /> : `Day ${currentTask.day}`}
              </span>
              <div className="challenge-today-info">
                <h4>{currentTask.title}</h4>
                <p>
                  {currentTask.focus} · {currentTask.exercises.length} exercises
                </p>
              </div>
              {currentDone ? (
                <span className="challenge-today-status">Completed</span>
              ) : null}
            </div>

            <ul className="challenge-task-list">
              {currentTask.exercises.map((exercise) => (
                <li key={exercise.id}>
                  <ExerciseThumb exercise={exercise} />
                  <span className="challenge-task-name">
                    {exercise.name}
                  </span>
                  <small>
                    {exercise.sets} sets · {exercise.reps}
                  </small>
                </li>
              ))}
            </ul>

            {currentDone ? (
              <p className="challenge-countdown">
                <Timer size={15} aria-hidden="true" />
                <span>
                  Day {currentTask.day + 1} unlocks in{" "}
                  <strong>{countdown}</strong>
                  {unlockAt !== null ? ` · at ${formatClock(unlockAt)}` : null}
                </span>
              </p>
            ) : (
              <div className="challenge-actions">
                <button
                  type="button"
                  className="button-primary"
                  onClick={() => onStartDay(currentTask.day)}
                >
                  <Play size={16} aria-hidden="true" />
                  Start day {currentTask.day} workout
                </button>
                <button
                  type="button"
                  className="details-button"
                  onClick={() => onCompleteDay(currentTask.day)}
                >
                  <Check size={16} aria-hidden="true" />
                  Mark complete
                </button>
              </div>
            )}
          </div>
        ) : null}

        <div className="challenge-days">
          {days.map((day) => {
            const task = getChallengeDay(day);
            const done = challenge.completedDays.includes(day);
            const locked = day > currentDay;
            const state = done ? "done" : locked ? "locked" : "current";

            const label = done
              ? `Day ${day} completed${task ? ` — ${task.title}` : ""}`
              : locked
                ? `Day ${day} locked${task ? ` — ${task.title}` : ""}`
                : `Start day ${day}${task ? ` — ${task.title}` : ""}`;

            return (
              <button
                type="button"
                key={day}
                className={`challenge-day is-${state}`}
                onClick={() => onStartDay(day)}
                disabled={locked || done}
                aria-label={label}
                title={label}
              >
                <span className="challenge-day-icon" aria-hidden="true">
                  {done ? (
                    <Check size={15} />
                  ) : locked ? (
                    <Lock size={13} />
                  ) : (
                    <Play size={13} />
                  )}
                </span>
                <small>Day {day}</small>
              </button>
            );
          })}
        </div>

        <div className="challenge-actions challenge-actions-reset">
          <button
            type="button"
            className="details-button"
            onClick={onResetChallenge}
          >
            Reset challenge
          </button>
        </div>
      </Reveal>

      <Reveal variant="stagger" className="dashboard-grid">
        <div className="stat-card">
          <span className="stat-icon">
            <Dumbbell size={20} aria-hidden="true" />
          </span>
          <p>Total exercises</p>
          <strong>
            <AnimatedNumber value={totalExercises} />
          </strong>
          <small>Available in the library</small>
        </div>
      </Reveal>

      <Reveal className="quick-start-panel">
        <div>
          <p className="section-label">Ready when you are</p>
          <h3>Make today count.</h3>
          <p>Start a guided session from your filtered exercise library.</p>
        </div>
        <button type="button" className="button-primary" onClick={onStartVisible}>
          <Play size={16} aria-hidden="true" />
          Start workout
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </Reveal>
    </section>
  );
}
