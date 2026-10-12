import { CirclePlay, ImageOff } from "lucide-react";

import type { Exercise } from "../types";
import { equipmentLabels } from "../data/exercises";
import { equipmentIcons, exerciseIcons } from "../lib/icons";
import { useExerciseImage } from "../hooks/useExerciseImage";

type ExerciseMediaProps = {
  exercise: Exercise;
  onWatchVideo: () => void;
  variant?: "card" | "detail";
  /** Hide the play overlay when the surrounding UI already offers a video CTA. */
  showPlay?: boolean;
};

/**
 * Resilient demonstration media for an exercise card or detail view. Walks an
 * ordered list of candidate image URLs (curated photos, then a YouTube
 * thumbnail) and falls back to a per-exercise icon when every candidate fails,
 * so a card can never render blank or crash on a broken image.
 */
export function ExerciseMedia({
  exercise,
  onWatchVideo,
  variant = "card",
  showPlay = true
}: ExerciseMediaProps) {
  const { src: imageSrc, status, onLoad, onError } =
    useExerciseImage(exercise);

  const Icon = exerciseIcons[exercise.id];
  const EquipmentIcon = equipmentIcons[exercise.category];
  const showImage = imageSrc !== null;

  return (
    <div
      className={`exercise-media exercise-media-${variant} ${
        showImage ? "has-image" : "no-image"
      } ${status}`}
    >
      {showImage ? (
        <>
          {status === "loading" ? (
            <span className="exercise-media-skeleton" aria-hidden="true" />
          ) : null}
          <img
            key={imageSrc}
            src={imageSrc ?? undefined}
            alt={`${exercise.name} demonstration showing the correct exercise position`}
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
        <span className="exercise-media-fallback">
          <Icon size={variant === "detail" ? 42 : 34} aria-hidden="true" />
          <span className="exercise-media-fallback-text">
            <ImageOff size={13} aria-hidden="true" />
            Preview unavailable
          </span>
        </span>
      )}

      <span className="exercise-media-badge">
        <EquipmentIcon size={13} aria-hidden="true" />
        {equipmentLabels[exercise.category]}
      </span>

      {showPlay ? (
        <button
          type="button"
          className="exercise-media-play"
          onClick={onWatchVideo}
          aria-label={`Watch the ${exercise.name} video`}
        >
          <CirclePlay size={18} aria-hidden="true" />
          Watch video
        </button>
      ) : null}
    </div>
  );
}
