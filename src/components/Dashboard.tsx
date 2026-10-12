import {
  ArrowRight,
  CircleCheck,
  Dumbbell,
  Play,
  Target,
  Trophy
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

type DashboardProps = {
  totalExercises: number;
  completedCount: number;
  workoutsCount: number;
  totalSets: number;
  onStartVisible: () => void;
};

export function Dashboard({
  totalExercises,
  completedCount,
  workoutsCount,
  totalSets,
  onStartVisible
}: DashboardProps) {
  return (
    <section className="section" id="workouts">
      <SectionHeading
        label="Track your progress"
        title="Your fitness dashboard"
        description="A quick overview of your exercise and training activity."
      />

      <div className="dashboard-grid">
        <div className="stat-card">
          <span className="stat-icon">
            <Dumbbell size={20} aria-hidden="true" />
          </span>
          <p>Total exercises</p>
          <strong>{totalExercises}</strong>
          <small>Available in the library</small>
        </div>
        <div className="stat-card">
          <span className="stat-icon">
            <CircleCheck size={20} aria-hidden="true" />
          </span>
          <p>Exercises completed</p>
          <strong>{completedCount}</strong>
          <small>Unique exercises marked done</small>
        </div>
        <div className="stat-card">
          <span className="stat-icon">
            <Trophy size={20} aria-hidden="true" />
          </span>
          <p>Workouts completed</p>
          <strong>{workoutsCount}</strong>
          <small>Saved training sessions</small>
        </div>
        <div className="stat-card">
          <span className="stat-icon">
            <Target size={20} aria-hidden="true" />
          </span>
          <p>Sets checked</p>
          <strong>{totalSets}</strong>
          <small>Sets marked in the library</small>
        </div>
      </div>

      <div className="quick-start-panel">
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
      </div>
    </section>
  );
}
