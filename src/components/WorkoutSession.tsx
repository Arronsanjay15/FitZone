import {
  Check,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Sparkles,
  Timer
} from "lucide-react";
import type { Exercise } from "../types";
import { ExerciseMedia } from "./ExerciseMedia";
import { Modal } from "./Modal";

type WorkoutSessionProps = {
  finished: boolean;
  resting: boolean;
  restSeconds: number;
  session: Exercise[];
  sessionIndex: number;
  currentExercise: Exercise | null;
  completedNames: string[];
  onClose: () => void;
  onSkipRest: () => void;
  onPrevious: () => void;
  onComplete: () => void;
  onSkipExercise: () => void;
  onWatchVideo: (exercise: Exercise) => void;
};

const REST_SECONDS = 30;

export function WorkoutSession({
  finished,
  resting,
  restSeconds,
  session,
  sessionIndex,
  currentExercise,
  completedNames,
  onClose,
  onSkipRest,
  onPrevious,
  onComplete,
  onSkipExercise,
  onWatchVideo
}: WorkoutSessionProps) {
  return (
    <Modal
      onClose={onClose}
      labelledBy="session-modal-title"
      className="session-modal"
      closeLabel="Close workout session"
    >
      {finished ? (
        <div className="session-complete">
          <div className="completion-icon">
            <Sparkles size={34} aria-hidden="true" />
          </div>
          <p className="section-label">Session complete</p>
          <h2 id="session-modal-title">Great work!</h2>
          <p>
            You completed a guided session with {completedNames.length}{" "}
            {completedNames.length === 1 ? "exercise" : "exercises"}.
          </p>

          <div className="completion-list">
            {completedNames.map((name, index) => (
              <div key={`${name}-${index}`}>
                <span>
                  <Check size={13} aria-hidden="true" />
                </span>
                {name}
              </div>
            ))}
          </div>

          <button type="button" className="button-primary" onClick={onClose}>
            Finish and return
          </button>
        </div>
      ) : resting ? (
        <div className="rest-screen">
          <p className="section-label">Recovery time</p>
          <div className="rest-icon">
            <Timer size={38} aria-hidden="true" />
          </div>
          <h2 id="session-modal-title">Take a breather</h2>
          <p>Rest before moving on to your next exercise.</p>
          <div className="rest-countdown">{restSeconds}s</div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${((REST_SECONDS - restSeconds) / REST_SECONDS) * 100}%`
              }}
            />
          </div>
          <button type="button" className="button-primary" onClick={onSkipRest}>
            Skip rest
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      ) : currentExercise ? (
        <div className="guided-workout">
          <p className="section-label">Guided workout</p>
          <div className="session-progress-heading">
            <span>
              Exercise {sessionIndex + 1} of {session.length}
            </span>
            <span>{Math.round(((sessionIndex + 1) / session.length) * 100)}%</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${((sessionIndex + 1) / session.length) * 100}%`
              }}
            />
          </div>

          <div className="session-media">
            <ExerciseMedia
              exercise={currentExercise}
              onWatchVideo={() => onWatchVideo(currentExercise)}
              variant="detail"
              showPlay={false}
            />
          </div>
          <h2 id="session-modal-title">{currentExercise.name}</h2>
          <p>{currentExercise.description}</p>

          <div className="session-prescription">
            <div>
              <span>Sets</span>
              <strong>{currentExercise.sets}</strong>
            </div>
            <div>
              <span>Target</span>
              <strong>{currentExercise.reps}</strong>
            </div>
            <div>
              <span>Level</span>
              <strong>{currentExercise.level}</strong>
            </div>
          </div>

          <div className="modal-info-block">
            <h3>How to do it</h3>
            <ol className="instruction-list">
              {currentExercise.instructions.map((instruction, index) => (
                <li key={`${currentExercise.id}-guide-${index}`}>
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          <button
            type="button"
            className="details-button session-video-button"
            onClick={() => onWatchVideo(currentExercise)}
          >
            <CirclePlay size={16} aria-hidden="true" />
            Watch the workout video
          </button>

          <div className="session-actions">
            <button type="button" className="details-button" onClick={onPrevious}>
              {sessionIndex === 0 ? (
                "Exit"
              ) : (
                <>
                  <ChevronLeft size={16} aria-hidden="true" />
                  Previous
                </>
              )}
            </button>
            <button type="button" className="button-primary" onClick={onComplete}>
              {sessionIndex === session.length - 1 ? (
                <>
                  <Check size={16} aria-hidden="true" />
                  Complete workout
                </>
              ) : (
                <>
                  Complete &amp; next
                  <ChevronRight size={16} aria-hidden="true" />
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            className="skip-exercise"
            onClick={onSkipExercise}
          >
            Skip this exercise
          </button>
        </div>
      ) : null}
    </Modal>
  );
}
