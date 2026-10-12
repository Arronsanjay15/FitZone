import { ImageOff } from "lucide-react";

import type { Exercise } from "../types";
import { exerciseIcons } from "../lib/icons";
import { useExerciseImage } from "../hooks/useExerciseImage";

type ExerciseThumbProps = {
  exercise: Exercise;
};

/**
 * Compact, resilient thumbnail used in the 30-day challenge workout list.
 * Uses the same candidate-walking logic as `ExerciseMedia` and falls back to a
 * per-exercise icon when no image loads.
 */
export function ExerciseThumb({ exercise }: ExerciseThumbProps) {
  const { src, status, onLoad, onError } = useExerciseImage(exercise);
  const Icon = exerciseIcons[exercise.id];

  return (
    <span
      className={`exercise-thumb ${status} ${
        src ? "has-image" : "no-image"
      }`}
    >
      {src ? (
        <>
          {status === "loading" ? (
            <span className="exercise-thumb-skeleton" aria-hidden="true" />
          ) : null}
          <img
            key={src}
            src={src}
            alt={`${exercise.name} demonstration`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            draggable={false}
            className={status === "loaded" ? "is-loaded" : ""}
            onLoad={onLoad}
            onError={onError}
          />
        </>
      ) : (
        <span className="exercise-thumb-fallback" aria-hidden="true">
          {Icon ? <Icon size={20} /> : <ImageOff size={18} />}
        </span>
      )}
    </span>
  );
}
