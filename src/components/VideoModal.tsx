import { CirclePlay, ExternalLink, Search, TriangleAlert } from "lucide-react";
import type { Exercise } from "../types";
import { getExerciseVideo } from "../lib/video";
import { Modal } from "./Modal";

type VideoModalProps = {
  exercise: Exercise;
  onClose: () => void;
};

export function VideoModal({ exercise, onClose }: VideoModalProps) {
  const video = getExerciseVideo(exercise);

  return (
    <Modal
      onClose={onClose}
      labelledBy="video-modal-title"
      className="video-modal"
      closeLabel="Close video"
    >
      <p className="section-label">WORKOUT VIDEO</p>
      <h2 id="video-modal-title">{exercise.name}</h2>
      <p className="video-subtitle">
        Follow along with a step-by-step technique demonstration.
      </p>

      <div className="video-frame">
        {video.embedUrl ? (
          <iframe
            src={video.embedUrl}
            title={`${exercise.name} tutorial video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className="video-fallback">
            <TriangleAlert size={26} aria-hidden="true" />
            <p>
              A verified video isn&apos;t available for this exercise yet. Use the
              link below to find a tutorial for {exercise.name}.
            </p>
          </div>
        )}
      </div>

      {video.embedUrl ? (
        <p className="video-hint">
          Video not playing? Open it directly on YouTube.
        </p>
      ) : null}

      <div className="modal-actions">
        {video.watchUrl ? (
          <>
            <a
              className="button-primary"
              href={video.watchUrl}
              target="_blank"
              rel="noreferrer"
            >
              <CirclePlay size={16} aria-hidden="true" />
              Open on YouTube
            </a>
            <a
              className="details-button"
              href={video.searchUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Search size={16} aria-hidden="true" />
              More videos
            </a>
          </>
        ) : (
          <a
            className="button-primary"
            href={video.searchUrl}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={16} aria-hidden="true" />
            Find this exercise on YouTube
          </a>
        )}
      </div>
    </Modal>
  );
}
