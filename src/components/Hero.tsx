import {
  ArrowRight,
  CircleCheck,
  Dumbbell,
  Flame,
  HeartPulse,
  Play,
  Sparkles,
  Trophy
} from "lucide-react";

type HeroProps = {
  exerciseCount: number;
  completedCount: number;
  workoutsLogged: number;
};

export function Hero({
  exerciseCount,
  completedCount,
  workoutsLogged
}: HeroProps) {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
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
          Choose your exercises and build a routine that works for you.
        </p>

        <div className="hero-actions">
          <a className="button-primary" href="#planner">
            <Dumbbell size={18} aria-hidden="true" />
            Build My Workout
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="details-button" href="#exercises">
            <Play size={16} aria-hidden="true" />
            Explore Exercises
          </a>
        </div>

        <div className="hero-stats">
          <div>
            <strong>{exerciseCount}</strong>
            <span>
              <Dumbbell size={13} aria-hidden="true" />
              Exercises
            </span>
          </div>
          <div>
            <strong>{completedCount}</strong>
            <span>
              <CircleCheck size={13} aria-hidden="true" />
              Completed
            </span>
          </div>
          <div>
            <strong>{workoutsLogged}</strong>
            <span>
              <Trophy size={13} aria-hidden="true" />
              Workouts logged
            </span>
          </div>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="hero-figure">
          <Dumbbell size={128} strokeWidth={1.1} />
        </div>
        <div className="hero-floating-card">
          <span className="hero-floating-icon">
            <Flame size={20} aria-hidden="true" />
          </span>
          <div>
            <strong>Keep moving</strong>
            <small>One session at a time</small>
          </div>
        </div>
        <div className="hero-floating-card hero-floating-card-alt">
          <span className="hero-floating-icon">
            <HeartPulse size={20} aria-hidden="true" />
          </span>
          <div>
            <strong>Stay consistent</strong>
            <small>Small steps add up</small>
          </div>
        </div>
      </div>
    </section>
  );
}
