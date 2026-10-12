import {
  useMemo,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent
} from "react";
import {
  ArrowRight,
  CircleCheck,
  Dumbbell,
  Flame,
  PersonStanding,
  Play,
  Sparkles,
  Swords,
  Trophy,
  Weight,
  type LucideIcon
} from "lucide-react";

import type { ChallengeSummary, WorkoutType } from "../types";
import { exercises } from "../data/exercises";
import { AnimatedNumber } from "./AnimatedNumber";
import { Reveal } from "./Reveal";

type HeroProps = {
  exerciseCount: number;
  completedCount: number;
  workoutsLogged: number;
  focus: WorkoutType;
  onFocusChange: (focus: WorkoutType) => void;
  challenge: ChallengeSummary;
};

type FocusOption = {
  id: WorkoutType;
  label: string;
  icon: LucideIcon;
  blurb: string;
};

const focusOptions: FocusOption[] = [
  { id: "Dumbbell", label: "Dumbbell", icon: Dumbbell, blurb: "Build real strength" },
  {
    id: "Bodyweight",
    label: "Bodyweight",
    icon: PersonStanding,
    blurb: "Train anywhere"
  },
  { id: "Gym", label: "Gym", icon: Weight, blurb: "Move heavier weight" },
  { id: "Kickboxing", label: "Kickboxing", icon: Swords, blurb: "Sharpen speed & cardio" }
];

/** `9:00 AM` style label for the next challenge unlock. */
function formatClock(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit"
  });
}

export function Hero({
  exerciseCount,
  completedCount,
  workoutsLogged,
  focus,
  onFocusChange,
  challenge
}: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const focusGroupRef = useRef<HTMLDivElement | null>(null);

  // Exercise count per focus, so the floating card reflects the live library.
  const countsByFocus = useMemo(() => {
    const counts = {} as Record<WorkoutType, number>;

    for (const exercise of exercises) {
      counts[exercise.category] = (counts[exercise.category] ?? 0) + 1;
    }

    return counts;
  }, []);

  const active = focusOptions.find((option) => option.id === focus) ?? focusOptions[0];
  const ActiveIcon = active.icon;

  // Subtle pointer parallax. Touch and reduced-motion users are left untouched.
  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const node = sectionRef.current;
    if (!node || event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));

    node.style.setProperty("--px", x.toFixed(3));
    node.style.setProperty("--py", y.toFixed(3));
  };

  const resetParallax = () => {
    const node = sectionRef.current;
    if (!node) return;
    node.style.setProperty("--px", "0");
    node.style.setProperty("--py", "0");
  };

  // Arrow keys move through the focus options, matching radio-group behaviour.
  const handleFocusKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const last = focusOptions.length - 1;
    let next: number | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = index === last ? 0 : index + 1;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = index === 0 ? last : index - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        break;
    }

    if (next === null) return;

    event.preventDefault();
    onFocusChange(focusOptions[next].id);

    const buttons = focusGroupRef.current?.querySelectorAll<HTMLButtonElement>(
      '[role="radio"]'
    );
    buttons?.[next]?.focus();
  };

  return (
    <section
      className="hero-section"
      id="home"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
    >
      <Reveal variant="stagger" className="hero-content">
        <p className="section-label">
          <Sparkles size={14} aria-hidden="true" />
          Your fitness journey starts here
        </p>

        <h1>
          Train smarter.
          <br />
          Get <span>stronger.</span>
        </h1>

        <p className="hero-description">
          Your personal workout space for strength, consistency and progress.
          Pick a focus, then let FitZone plan the session for you.
        </p>

        <div className="hero-focus">
          <span className="hero-focus-label">Choose your focus</span>
          <div
            className="hero-focus-options"
            role="radiogroup"
            aria-label="Choose your workout focus"
            ref={focusGroupRef}
          >
            {focusOptions.map(({ id, label, icon: Icon }, index) => (
              <button
                type="button"
                key={id}
                role="radio"
                aria-checked={focus === id}
                tabIndex={focus === id ? 0 : -1}
                className={`hero-focus-chip${focus === id ? " active" : ""}`}
                onClick={() => onFocusChange(id)}
                onKeyDown={(event) => handleFocusKeyDown(event, index)}
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="hero-actions">
          <a className="button-primary" href="#planner">
            <ActiveIcon size={18} aria-hidden="true" />
            Build my {active.label} workout
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="details-button" href="#exercises">
            <Play size={16} aria-hidden="true" />
            Explore exercises
          </a>
        </div>

        <div className="hero-challenge">
          <span className="hero-challenge-icon">
            <Flame size={16} aria-hidden="true" />
          </span>
          <span className="hero-challenge-text">
            {challenge.finished ? (
              <>
                30-day challenge <strong>complete</strong> — legendary work!
              </>
            ) : challenge.nextUnlockAt !== null ? (
              <>
                Rest up — day {challenge.day + 1} unlocks at{" "}
                <strong>{formatClock(challenge.nextUnlockAt)}</strong>
              </>
            ) : (
              <>
                Today&rsquo;s challenge: <strong>{challenge.title}</strong>{" "}
                (day {challenge.day})
              </>
            )}
          </span>
        </div>

        <div className="hero-stats">
          <div>
            <strong>
              <AnimatedNumber value={exerciseCount} />
            </strong>
            <span>
              <Dumbbell size={13} aria-hidden="true" />
              Exercises
            </span>
          </div>
          <div>
            <strong>
              <AnimatedNumber value={completedCount} />
            </strong>
            <span>
              <CircleCheck size={13} aria-hidden="true" />
              Completed
            </span>
          </div>
          <div>
            <strong>
              <AnimatedNumber value={workoutsLogged} />
            </strong>
            <span>
              <Trophy size={13} aria-hidden="true" />
              Workouts logged
            </span>
          </div>
          <div>
            <strong>
              <AnimatedNumber value={challenge.day} />
            </strong>
            <span>
              <Flame size={13} aria-hidden="true" />
              {challenge.length}-day challenge
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal variant="scale" className="hero-visual" ariaHidden>
        <div className="hero-spotlight" />
        <div className="hero-stage">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <span className="hero-ring" />
          <span className="hero-ring hero-ring-two" />

          <div className="hero-figure" key={focus}>
            <ActiveIcon size={124} strokeWidth={1.1} />
          </div>
        </div>

        <div className="hero-floating-card hero-floating-card-alt" key={`count-${focus}`}>
          <span className="hero-floating-icon">
            <ActiveIcon size={20} aria-hidden="true" />
          </span>
          <div>
            <strong>{countsByFocus[focus] ?? 0} exercises</strong>
            <small>{active.label} focus</small>
          </div>
        </div>

        <div className="hero-floating-card" key={`blurb-${focus}`}>
          <span className="hero-floating-icon">
            <Sparkles size={20} aria-hidden="true" />
          </span>
          <div>
            <strong>{active.blurb}</strong>
            <small>One session at a time</small>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
