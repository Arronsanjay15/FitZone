import {
  Check,
  CirclePlay,
  Dumbbell,
  ExternalLink,
  Heart,
  ListChecks,
  Play,
  Repeat,
  ShieldCheck,
  Target,
  TriangleAlert
} from "lucide-react";
import type { Exercise } from "../types";
import { equipmentLabels } from "../data/exercises";
import { levelIcons } from "../lib/icons";
import { getExerciseVideo } from "../lib/video";
import { ExerciseMedia } from "./ExerciseMedia";
import { Modal } from "./Modal";

type ExerciseDetailModalProps = {
  exercise: Exercise;
  completed: boolean;
  favorite: boolean;
  onClose: () => void;
  onStart: () => void;
  onMarkDone: () => void;
  onToggleFavorite: () => void;
  onWatchVideo: () => void;
};

export function ExerciseDetailModal({
  exercise,
  completed,
  favorite,
  onClose,
  onStart,
  onMarkDone,
  onToggleFavorite,
  onWatchVideo
}: ExerciseDetailModalProps) {
  const video = getExerciseVideo(exercise);
  const LevelIcon = levelIcons[exercise.level];

  return (
    <Modal
      onClose={onClose}
      labelledBy="exercise-modal-title"
      className="exercise-modal"
      closeLabel="Close exercise details"
    >
      <p className="section-label">EXERCISE DETAILS</p>
      <h2 id="exercise-modal-title">{exercise.name}</h2>
      <p>{exercise.description}</p>

      <div className="exercise-meta">
        <span>
          <Dumbbell size={14} aria-hidden="true" />
          {equipmentLabels[exercise.category]}
        </span>
        <span>
          <LevelIcon size={14} aria-hidden="true" />
          {exercise.level}
        </span>
        <span>
          <Repeat size={14} aria-hidden="true" />
          {exercise.sets} sets
        </span>
        <span>
          <Target size={14} aria-hidden="true" />
          {exercise.reps}
        </span>
      </div>

      <ExerciseMedia
        exercise={exercise}
        onWatchVideo={onWatchVideo}
        variant="detail"
        showPlay={false}
      />

      <div className="modal-info-block">
        <h3>
          <Target size={16} aria-hidden="true" />
          Muscles worked
        </h3>
        <p>{exercise.muscles}</p>
      </div>

      <div className="modal-info-block">
        <h3>
          <ListChecks size={16} aria-hidden="true" />
          Step-by-step instructions
        </h3>
        <ol className="instruction-list">
          {exercise.instructions.map((instruction, index) => (
            <li key={`${exercise.id}-step-${index}`}>{instruction}</li>
          ))}
        </ol>
      </div>

      <div className="modal-info-block">
        <h3>
          <ShieldCheck size={16} aria-hidden="true" />
          Safety &amp; technique tips
        </h3>
        <ul className="tip-list">
          {exercise.tips.map((tip, index) => (
            <li key={`${exercise.id}-tip-${index}`}>
              <TriangleAlert size={15} aria-hidden="true" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="modal-actions">
        <button type="button" className="button-primary" onClick={onStart}>
          <Play size={16} aria-hidden="true" />
          Start this exercise
        </button>
        <button
          type="button"
          className="details-button"
          onClick={onWatchVideo}
        >
          <CirclePlay size={16} aria-hidden="true" />
          Watch video
        </button>
        <button
          type="button"
          className={`details-button${favorite ? " is-favorite" : ""}`}
          onClick={onToggleFavorite}
          aria-pressed={favorite}
        >
          <Heart
            size={16}
            aria-hidden="true"
            fill={favorite ? "currentColor" : "none"}
          />
          {favorite ? "Saved" : "Save"}
        </button>
        <button
          type="button"
          className="details-button"
          onClick={onMarkDone}
          disabled={completed}
        >
          {completed ? (
            <>
              <Check size={16} aria-hidden="true" />
              Completed
            </>
          ) : (
            "Mark as done"
          )}
        </button>
      </div>

      {video.watchUrl ? (
        <a
          className="modal-external-link"
          href={video.watchUrl}
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink size={14} aria-hidden="true" />
          Open this exercise&apos;s video on YouTube
        </a>
      ) : null}
    </Modal>
  );
}
