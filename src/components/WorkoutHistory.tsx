import { CalendarDays, Play, Trash, Trophy } from "lucide-react";
import type { WorkoutHistoryEntry } from "../types";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { EmptyState } from "./EmptyState";

type WorkoutHistoryProps = {
  history: WorkoutHistoryEntry[];
  onClear: () => void;
  onStartVisible: () => void;
};

function formatDate(date: string): string {
  return new Date(date).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export function WorkoutHistory({
  history,
  onClear,
  onStartVisible
}: WorkoutHistoryProps) {
  const totalExercises = history.reduce(
    (sum, entry) => sum + entry.totalExercises,
    0
  );

  return (
    <section className="section history-section" id="history">
      <SectionHeading
        label="Your journey"
        title="Workout history"
        description="Guided workouts you finish are saved in this browser so you can review your activity later."
        aside={
          history.length > 0 ? (
            <button type="button" className="details-button" onClick={onClear}>
              <Trash size={15} aria-hidden="true" />
              Clear history
            </button>
          ) : undefined
        }
      />

      <Reveal variant="stagger" className="history-summary">
        <div>
          <span>Total sessions</span>
          <strong>{history.length}</strong>
        </div>
        <div>
          <span>Exercises in completed sessions</span>
          <strong>{totalExercises}</strong>
        </div>
        <div>
          <span>Latest session</span>
          <strong className="latest-session">
            {history[0] ? formatDate(history[0].completedAt) : "Not yet"}
          </strong>
        </div>
      </Reveal>

      {history.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="Your history starts here"
          message="Finish a guided workout and it will appear here automatically."
        >
          <button
            type="button"
            className="button-primary"
            onClick={onStartVisible}
          >
            <Play size={16} aria-hidden="true" />
            Start your first workout
          </button>
        </EmptyState>
      ) : (
        <Reveal variant="stagger" className="history-list">
          {history.map((entry) => (
            <article className="history-item" key={entry.id}>
              <div className="history-icon">
                <Trophy size={20} aria-hidden="true" />
              </div>
              <div className="history-item-content">
                <h3>Workout completed</h3>
                <p>{formatDate(entry.completedAt)}</p>
                <div className="history-exercise-names">
                  {entry.exerciseNames.join(" · ")}
                </div>
              </div>
              <span className="history-total">
                {entry.totalExercises} exercises
              </span>
            </article>
          ))}
        </Reveal>
      )}
    </section>
  );
}
