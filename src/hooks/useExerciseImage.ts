import { useMemo, useState } from "react";

import type { Exercise } from "../types";
import { getExerciseImages } from "../lib/images";
import { getExerciseVideo } from "../lib/video";

export type ExerciseImageStatus = "loading" | "loaded" | "error";

export type ExerciseImage = {
  /** Current image URL, or null when every candidate failed. */
  src: string | null;
  status: ExerciseImageStatus;
  onLoad: () => void;
  onError: () => void;
};

/**
 * Resolve a working demonstration image for an exercise by walking the ordered
 * candidate list (curated Free Exercise DB photos first, then the YouTube
 * tutorial thumbnail). Shared by the card media and the compact challenge
 * thumbnails so both get the same resilient fallback behaviour.
 */
export function useExerciseImage(exercise: Exercise): ExerciseImage {
  const candidates = useMemo(() => {
    const { thumbnailCandidates } = getExerciseVideo(exercise);
    return [...getExerciseImages(exercise.id), ...thumbnailCandidates];
  }, [exercise]);

  const [imageIndex, setImageIndex] = useState(0);
  const [status, setStatus] = useState<ExerciseImageStatus>(
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

  const src = status === "error" ? null : candidates[imageIndex] ?? null;

  const onLoad = () => setStatus("loaded");

  const onError = () => {
    if (imageIndex + 1 < candidates.length) {
      setImageIndex((index) => index + 1);
      setStatus("loading");
    } else {
      setStatus("error");
    }
  };

  return { src, status, onLoad, onError };
}
