import { Check, CirclePlay, Eye, Heart, Play, Repeat, Target } from "lucide-react";
import type { Exercise, SetChecks } from "../types";
import { equipmentLabels } from "../data/exercises";
import { levelIcons } from "../lib/icons";
import { ExerciseMedia } from "./ExerciseMedia";

type ExerciseCardProps = {
  exercise: Exercise;
  completed: boolean;
  favorite: boolean;
  setChecks: SetChecks;
  onDetails: () => void;
  onMarkDone: () => void;
  onToggleSet: (exerciseId: string, setIndex: number) => void;
  onToggleFavorite: () => void;
  onStart: () => void;
  onWatchVideo: () => void;
};

export function ExerciseCard({
  exercise,
  completed,
  favorite,
  setChecks,
  onDetails,
  onMarkDone,
  onToggleSet,
  onToggleFavorite,
  onStart,
  onWatchVideo
}: ExerciseCardProps) {
  const checks = setChecks[exercise.id] ?? [];
  const LevelIcon = levelIcons[exercise.level];

  return (
    <article
      className={`exercise-card${completed ? " is-completed" : ""}${
        favorite ? " is-favorite" : ""
      }`}
    >
      <div className="exercise-card-media">
        <ExerciseMedia exercise={exercise} onWatchVideo={onWatchVideo} />
        {completed ? (
          <span className="completion-badge">
            <Check size={13} aria-hidden="true" />
            Completed
          </span>
        ) : null}
      </div>

      <div className="exercise-card-content">
        <div className="exercise-card-top">
          <div className="exercise-card-tags">
            <span className="tag">{equipmentLabels[exercise.category]}</span>
            <span className={`tag level-${exercise.level.toLowerCase()}`}>
              <LevelIcon size={12} aria-hidden="true" />
              {exercise.level}
            </span>
          </div>

          <button
            type="button"
            className={`favorite-button${favorite ? " is-favorite" : ""}`}
            onClick={onToggleFavorite}
            aria-pressed={favorite}
            aria-label={
              favorite
                ? `Remove ${exercise.name} from saved exercises`
                : `Save ${exercise.name} for later`
            }
            title={favorite ? "Remove from saved" : "Save for later"}
          >
            <Heart size={16} aria-hidden="true" fill={favorite ? "currentColor" : "none"} />
          </button>
        </div>

        <h3>{exercise.name}</h3>
        <p>{exercise.description}</p>

        <div className="exercise-card-meta">
          <span>
            <Repeat size={15} aria-hidden="true" />
            {exercise.sets} sets
          </span>
          <span>
            <Target size={15} aria-hidden="true" />
            {exercise.reps}
          </span>
        </div>

        <div className="muscle-tags">
          {exercise.muscleGroups.map((group) => (
            <span key={`${exercise.id}-${group}`}>{group}</span>
          ))}
        </div>

        <div className="set-tracker">
          <span className="set-tracker-label">Track sets</span>
          <div className="set-checks">
            {Array.from({ length: exercise.sets }, (_, index) => (
              <button
                type="button"
                key={index}
                className={checks[index] ? "set-check checked" : "set-check"}
                onClick={() => onToggleSet(exercise.id, index)}
                aria-label={`Set ${index + 1} for ${exercise.name}`}
                aria-pressed={Boolean(checks[index])}
              >
                {checks[index] ? <Check size={14} aria-hidden="true" /> : index + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="exercise-card-actions">
          <button type="button" className="details-button" onClick={onDetails}>
            <Eye size={16} aria-hidden="true" />
            Details
          </button>
          <button
            type="button"
            className="details-button"
            onClick={onWatchVideo}
          >
            <CirclePlay size={16} aria-hidden="true" />
            Watch video
          </button>
        </div>

        <button type="button" className="button-primary card-start" onClick={onStart}>
          <Play size={16} aria-hidden="true" />
          Start exercise
        </button>

        <button
          type="button"
          className="mark-complete-button"
          onClick={onMarkDone}
          disabled={completed}
        >
          {completed ? "Marked as done" : "Mark as done"}
        </button>
      </div>
    </article>
  );
}
