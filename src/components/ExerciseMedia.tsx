import { useMemo, useState } from "react";
import { CirclePlay, ImageOff } from "lucide-react";
import type { Exercise } from "../types";
import { equipmentLabels } from "../data/exercises";
import {
  defaultExerciseIcon,
  equipmentIcons,
  exerciseIcons
} from "../lib/icons";
import { getExerciseVideo } from "../lib/video";
import { getExerciseImages } from "../lib/images";

type ExerciseMediaProps = {
  exercise: Exercise;
  onWatchVideo: () => void;
  variant?: "card" | "detail";
  /** Hide the built-in "Watch video" button when the host already shows one. */
  showPlay?: boolean;
};

type MediaStatus = "loading" | "loaded" | "error";

/**
 * Exercise thumbnail.
 *
 * It prefers a curated demonstration photo from the open Free Exercise DB,
 * then the verified tutorial's YouTube thumbnail, and finally falls back to an
 * equipment icon. A skeleton is shown while the image loads and any broken
 * image is skipped, so a failed request can never leave a card blank or crash.
 */
export function ExerciseMedia({
  exercise,
  onWatchVideo,
  variant = "card",
  showPlay = true
}: ExerciseMediaProps) {
  const Icon = exerciseIcons[exercise.id] ?? defaultExerciseIcon;
  const EquipmentIcon = equipmentIcons[exercise.category];

  // The underlying datasets are static, so `exercise` is a stable reference and
  // this list is only rebuilt when a different exercise is rendered.
  const candidates = useMemo(() => {
    const { thumbnailCandidates } = getExerciseVideo(exercise);
    return [...getExerciseImages(exercise.id), ...thumbnailCandidates];
  }, [exercise]);

  const [imageIndex, setImageIndex] = useState(0);
  const [status, setStatus] = useState<MediaStatus>(
    candidates.length > 0 ? "loading" : "error"
  );

  // Reset the media state when a different exercise is rendered. Adjusting the
  // state during render (rather than in an effect) avoids a cascading re-render.
  const [shownExercise, setShownExercise] = useState(exercise);
  if (shownExercise !== exercise) {
    setShownExercise(exercise);
    setImageIndex(0);
    setStatus(candidates.length > 0 ? "loading" : "error");
  }

  const imageSrc = status === "error" ? null : candidates[imageIndex] ?? null;
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
            onLoad={() => setStatus("loaded")}
            onError={() => {
              if (imageIndex + 1 < candidates.length) {
                setImageIndex((index) => index + 1);
                setStatus("loading");
              } else {
                setStatus("error");
              }
            }}
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
