
import { useEffect, useMemo, useState } from "react";
import { ArrowUp, Dumbbell, Sparkles } from "lucide-react";

import "./App.css";

import type {
  Category,
  ChallengeState,
  Exercise,
  FitnessLevel,
  LevelFilter,
  MuscleGroup,
  SetChecks,
  WorkoutHistoryEntry,
  WorkoutType,
} from "./types";

import { exercises, levelOrder } from "./data/exercises";
import { getChallengeDay } from "./data/challenge";
import {
  makeId,
  readStorage,
  STORAGE_KEYS,
  writeStorage,
} from "./lib/storage";
import {
  advanceChallenge,
  CHALLENGE_LENGTH,
  completeDay,
  emptyChallenge,
  nextUnlockAt,
  normalizeChallenge,
} from "./lib/challenge";

import { useToast } from "./hooks/useToast";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Planner } from "./components/Planner";
import { Dashboard } from "./components/Dashboard";
import { ExerciseLibrary } from "./components/ExerciseLibrary";
import { ExerciseCard } from "./components/ExerciseCard";
import { ExerciseDetailModal } from "./components/ExerciseDetailModal";
import { VideoModal } from "./components/VideoModal";
import { WorkoutSession } from "./components/WorkoutSession";
import { WorkoutHistory } from "./components/WorkoutHistory";
import { BackToTop } from "./components/BackToTop";
import { PwaManager } from "./components/PwaManager";
import { Reveal } from "./components/Reveal";

const REST_SECONDS = 30;

function App() {
  const { notify } = useToast();

  // Exercise library filters
  const [category, setCategory] = useState<Category>("All");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("All");
  const [search, setSearch] = useState("");
  const [selectedMuscles, setSelectedMuscles] =
    useState<MuscleGroup[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);

  // Saved progress
  const [completedExercises, setCompletedExercises] = useState<string[]>(
    () => readStorage(STORAGE_KEYS.completed, [])
  );

  const [favorites, setFavorites] = useState<string[]>(() =>
    readStorage(STORAGE_KEYS.favorites, [])
  );

  const [setChecks, setSetChecks] = useState<SetChecks>(
    () => readStorage(STORAGE_KEYS.sets, {})
  );

  const [workoutHistory, setWorkoutHistory] =
    useState<WorkoutHistoryEntry[]>(
      () => readStorage(STORAGE_KEYS.history, [])
    );

  // 30-day challenge progress
  const [challenge, setChallenge] = useState<ChallengeState>(() =>
    normalizeChallenge(readStorage(STORAGE_KEYS.challenge, null))
  );

  // Which challenge day the open guided session belongs to (if any)
  const [activeChallengeDay, setActiveChallengeDay] = useState<
    number | null
  >(null);

  // Workout planner
  const [plannerLevel, setPlannerLevel] =
    useState<FitnessLevel>("Beginner");

  const [selectedWorkoutType, setSelectedWorkoutType] =
    useState<WorkoutType>("Dumbbell");

  const [plan, setPlan] = useState<Exercise[]>([]);

  // Exercise modals
  const [selectedExercise, setSelectedExercise] =
    useState<Exercise | null>(null);

  const [activeVideo, setActiveVideo] =
    useState<Exercise | null>(null);

  // Guided workout session
  const [session, setSession] = useState<Exercise[]>([]);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [sessionOpen, setSessionOpen] = useState(false);
  const [resting, setResting] = useState(false);
  const [restSeconds, setRestSeconds] = useState(REST_SECONDS);
  const [sessionFinished, setSessionFinished] = useState(false);
  const [sessionCompletedNames, setSessionCompletedNames] =
    useState<string[]>([]);

  // Save completed exercises
  useEffect(() => {
    writeStorage(STORAGE_KEYS.completed, completedExercises);
  }, [completedExercises]);

  // Save set tracking
  useEffect(() => {
    writeStorage(STORAGE_KEYS.sets, setChecks);
  }, [setChecks]);

  // Save workout history
  useEffect(() => {
    writeStorage(STORAGE_KEYS.history, workoutHistory);
  }, [workoutHistory]);

  // Save favorites
  useEffect(() => {
    writeStorage(STORAGE_KEYS.favorites, favorites);
  }, [favorites]);

  // Save 30-day challenge progress
  useEffect(() => {
    writeStorage(STORAGE_KEYS.challenge, challenge);
  }, [challenge]);

  // Unlock the next challenge day once its 24-hour cooldown has elapsed.
  useEffect(() => {
    const unlockAt = nextUnlockAt(challenge);
    if (unlockAt === null) return;

    const delay = Math.max(0, unlockAt - Date.now());
    const timer = window.setTimeout(() => {
      setChallenge((previous) => advanceChallenge(previous, Date.now()));
    }, delay + 50);

    return () => window.clearTimeout(timer);
  }, [challenge]);

  // Rest timer
  useEffect(() => {
    if (!sessionOpen || !resting) return;

    if (restSeconds <= 0) {
      const resetTimer = window.setTimeout(() => {
        setResting(false);
        setRestSeconds(REST_SECONDS);
      }, 450);

      return () => window.clearTimeout(resetTimer);
    }

    const timer = window.setTimeout(() => {
      setRestSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [sessionOpen, resting, restSeconds]);

  // Filter the exercise library
  const visibleExercises = useMemo(() => {
    const term = search.trim().toLowerCase();

    return exercises.filter((exercise) => {
      const categoryMatch =
        category === "All" || exercise.category === category;

      const levelMatch =
        levelFilter === "All" || exercise.level === levelFilter;

      const searchMatch =
        !term ||
        exercise.name.toLowerCase().includes(term) ||
        exercise.description.toLowerCase().includes(term) ||
        exercise.muscles.toLowerCase().includes(term) ||
        exercise.muscleGroups.some((group) =>
          group.toLowerCase().includes(term)
        );

      const muscleMatch =
        selectedMuscles.length === 0 ||
        selectedMuscles.some((group) =>
          exercise.muscleGroups.includes(group)
        );

      const favoriteMatch =
        !savedOnly || favorites.includes(exercise.id);

      return (
        categoryMatch &&
        levelMatch &&
        searchMatch &&
        muscleMatch &&
        favoriteMatch
      );
    });
  }, [
    category,
    levelFilter,
    search,
    selectedMuscles,
    savedOnly,
    favorites,
  ]);

  // Compact challenge snapshot for the hero
  const challengeSummary = useMemo(() => {
    const task = getChallengeDay(challenge.unlockedDay);

    return {
      day: challenge.unlockedDay,
      length: CHALLENGE_LENGTH,
      title: task?.title ?? "",
      finished: challenge.completedDays.length >= CHALLENGE_LENGTH,
      nextUnlockAt: nextUnlockAt(challenge),
    };
  }, [challenge]);

  const currentExercise = session[sessionIndex] ?? null;

  // Return to the hero section whenever the page is refreshed.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  // Select or deselect muscle groups
  const toggleMuscle = (group: MuscleGroup) => {
    setSelectedMuscles((previous) =>
      previous.includes(group)
        ? previous.filter((item) => item !== group)
        : [...previous, group]
    );
  };

  // Change workout type and clear the previous generated plan
  const changeWorkoutType = (type: WorkoutType) => {
    setSelectedWorkoutType(type);
    setPlan([]);
  };

  // Track completed sets
  const toggleSet = (exerciseId: string, setIndex: number) => {
    setSetChecks((previous) => {
      const current = previous[exerciseId] ?? [
        false,
        false,
        false,
      ];

      const updated = [...current];
      updated[setIndex] = !updated[setIndex];

      return {
        ...previous,
        [exerciseId]: updated,
      };
    });
  };

  // Mark an exercise as completed (silent — used by the guided session)
  const markExerciseDone = (exercise: Exercise) => {
    setCompletedExercises((previous) =>
      previous.includes(exercise.id)
        ? previous
        : [...previous, exercise.id]
    );
  };

  // Mark as done from a card or modal, with confirmation feedback
  const handleMarkDone = (exercise: Exercise) => {
    const alreadyDone = completedExercises.includes(exercise.id);
    markExerciseDone(exercise);

    if (!alreadyDone) {
      notify(`${exercise.name} marked as done`, "success");
    }
  };

  // Save or remove an exercise from the saved list
  const toggleFavorite = (exercise: Exercise) => {
    const isSaved = favorites.includes(exercise.id);

    setFavorites((previous) =>
      previous.includes(exercise.id)
        ? previous.filter((id) => id !== exercise.id)
        : [...previous, exercise.id]
    );

    notify(
      isSaved
        ? `Removed ${exercise.name} from saved`
        : `Saved ${exercise.name} for later`,
      isSaved ? "info" : "success"
    );
  };

  // Reset library filters
  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setLevelFilter("All");
    setSelectedMuscles([]);
    setSavedOnly(false);
  };

  // Generate a 3–4 exercise plan for the selected workout type
  const generatePlan = () => {
    const eligibleExercises = exercises.filter((exercise) => {
      const levelMatch =
        levelOrder[exercise.level] <= levelOrder[plannerLevel];

      const categoryMatch =
        exercise.category === selectedWorkoutType;

      // Kickboxing does not use the target-muscle filter.
      const muscleMatch =
        selectedWorkoutType === "Kickboxing" ||
        selectedMuscles.length === 0 ||
        selectedMuscles.some((group) =>
          exercise.muscleGroups.includes(group)
        );

      return levelMatch && categoryMatch && muscleMatch;
    });

    if (eligibleExercises.length === 0) {
      setPlan([]);
      notify("No exercises match those settings. Try another combination.", "warn");
      return;
    }

    // Randomize the available exercises.
    const shuffled = [...eligibleExercises].sort(
      () => Math.random() - 0.5
    );

    const targetCount = Math.min(
      shuffled.length,
      Math.random() < 0.5 ? 3 : 4
    );

    const selected: Exercise[] = [];
    const usedMuscles = new Set<MuscleGroup>();

    // Prefer exercises that cover different muscle groups.
    while (selected.length < targetCount) {
      const remaining = shuffled.filter(
        (exercise) =>
          !selected.some((item) => item.id === exercise.id)
      );

      if (remaining.length === 0) break;

      let bestScore = -1;
      let bestCandidates: Exercise[] = [];

      for (const exercise of remaining) {
        const newMuscles = exercise.muscleGroups.filter(
          (group) => !usedMuscles.has(group)
        );

        let score = newMuscles.length;

        if (selectedWorkoutType !== "Kickboxing") {
          const uncoveredSelectedMuscles = selectedMuscles.filter(
            (group) =>
              !usedMuscles.has(group) &&
              exercise.muscleGroups.includes(group)
          );

          score += uncoveredSelectedMuscles.length * 2;
        }

        if (score > bestScore) {
          bestScore = score;
          bestCandidates = [exercise];
        } else if (score === bestScore) {
          bestCandidates.push(exercise);
        }
      }

      const chosen =
        bestCandidates[
          Math.floor(Math.random() * bestCandidates.length)
        ];

      if (!chosen) break;

      selected.push(chosen);

      chosen.muscleGroups.forEach((group) =>
        usedMuscles.add(group)
      );
    }

    setPlan(selected);
    notify(
      `Your ${selectedWorkoutType.toLowerCase()} plan is ready — ${selected.length} exercises`,
      "success"
    );
  };

  // Start a guided workout (optionally as a specific challenge day)
  const startWorkout = (
    workout: Exercise[],
    challengeDay: number | null = null
  ) => {
    if (workout.length === 0) return;

    setSession(workout);
    setSessionIndex(0);
    setSessionCompletedNames([]);
    setResting(false);
    setRestSeconds(REST_SECONDS);
    setSessionFinished(false);
    setSessionOpen(true);
    setSelectedExercise(null);
    setActiveChallengeDay(challengeDay);
  };

  const startVisibleWorkout = () => {
    startWorkout(
      visibleExercises.length > 0
        ? visibleExercises
        : exercises
    );
  };

  // Launch the workout assigned to a challenge day
  const startChallengeDay = (day: number) => {
    const task = getChallengeDay(day);
    if (!task) return;
    startWorkout(task.exercises, day);
  };

  // Save the completed workout
  const finishSession = () => {
    const completedNames = session.map(
      (exercise) => exercise.name
    );

    setCompletedExercises((previous) => [
      ...new Set([
        ...previous,
        ...session.map((exercise) => exercise.id),
      ]),
    ]);

    setWorkoutHistory((previous) => [
      {
        id: makeId(),
        completedAt: new Date().toISOString(),
        exerciseNames: completedNames,
        totalExercises: completedNames.length,
      },
      ...previous,
    ]);

    setSessionCompletedNames(completedNames);
    setSessionFinished(true);
    setResting(false);

    if (activeChallengeDay !== null) {
      completeChallengeDay(activeChallengeDay);
    } else {
      notify(
        `Workout saved — ${completedNames.length} ${
          completedNames.length === 1 ? "exercise" : "exercises"
        } logged`,
        "success"
      );
    }
  };

  // Complete the current exercise and move forward
  const completeCurrentExercise = () => {
    if (!currentExercise) return;

    markExerciseDone(currentExercise);

    if (sessionIndex >= session.length - 1) {
      finishSession();
      return;
    }

    setSessionIndex((index) => index + 1);
    setRestSeconds(REST_SECONDS);
    setResting(true);
  };

  // Close the guided workout
  const closeSession = () => {
    setSessionOpen(false);
    setResting(false);
    setRestSeconds(REST_SECONDS);
    setSessionFinished(false);
    setActiveChallengeDay(null);
  };

  // Clear workout history
  const clearHistory = () => {
    if (
      !window.confirm(
        "Clear all workout history? This cannot be undone."
      )
    ) {
      return;
    }

    setWorkoutHistory([]);
    notify("Workout history cleared", "info");
  };

  // Complete the current day of the 30-day challenge
  const completeChallengeDay = (day: number) => {
    const alreadyDone = challenge.completedDays.includes(day);

    if (day !== challenge.unlockedDay || alreadyDone) {
      notify(
        alreadyDone
          ? `Day ${day} is already complete.`
          : "That day is still locked.",
        "warn"
      );
      return;
    }

    setChallenge((previous) => completeDay(previous, day, Date.now()));

    notify(
      day >= CHALLENGE_LENGTH
        ? "Challenge complete — all 30 days done! 🎉"
        : `Day ${day} complete — day ${day + 1} unlocks in 24 hours`,
      "success"
    );
  };

  // Reset the 30-day challenge
  const resetChallenge = () => {
    if (
      !window.confirm(
        "Reset your 30-day challenge? All challenge progress will be lost."
      )
    ) {
      return;
    }

    setChallenge(emptyChallenge());
    notify("Challenge reset", "info");
  };

  // Reusable exercise card
  const renderExerciseCard = (exercise: Exercise) => (
    <ExerciseCard
      key={exercise.id}
      exercise={exercise}
      completed={completedExercises.includes(exercise.id)}
      favorite={favorites.includes(exercise.id)}
      setChecks={setChecks}
      onDetails={() => setSelectedExercise(exercise)}
      onMarkDone={() => handleMarkDone(exercise)}
      onToggleSet={toggleSet}
      onToggleFavorite={() => toggleFavorite(exercise)}
      onStart={() => startWorkout([exercise])}
      onWatchVideo={() => setActiveVideo(exercise)}
    />
  );

  return (
    <div className="app-shell">
      <Navbar />

      <main>
        <Hero
          exerciseCount={exercises.length}
          completedCount={completedExercises.length}
          workoutsLogged={workoutHistory.length}
          focus={selectedWorkoutType}
          onFocusChange={changeWorkoutType}
          challenge={challengeSummary}
        />

        <Planner
          level={plannerLevel}
          onLevelChange={(level) => {
            setPlannerLevel(level);
            setPlan([]);
          }}
          selectedWorkoutType={selectedWorkoutType}
          onWorkoutTypeChange={changeWorkoutType}
          selectedMuscles={selectedMuscles}
          onToggleMuscle={toggleMuscle}
          onGenerate={generatePlan}
          plan={plan}
          onStartPlan={() => startWorkout(plan)}
          renderCard={renderExerciseCard}
        />

        <Dashboard
          totalExercises={exercises.length}
          challenge={challenge}
          challengeLength={CHALLENGE_LENGTH}
          onStartDay={startChallengeDay}
          onCompleteDay={completeChallengeDay}
          onResetChallenge={resetChallenge}
          onStartVisible={startVisibleWorkout}
        />

        <ExerciseLibrary
          visibleExercises={visibleExercises}
          totalCount={exercises.length}
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          level={levelFilter}
          onLevelChange={setLevelFilter}
          selectedMuscles={selectedMuscles}
          onToggleMuscle={toggleMuscle}
          savedOnly={savedOnly}
          onToggleSavedOnly={() => setSavedOnly((value) => !value)}
          favoriteCount={favorites.length}
          onReset={resetFilters}
          renderCard={renderExerciseCard}
        />

        <WorkoutHistory
          history={workoutHistory}
          onClear={clearHistory}
          onStartVisible={startVisibleWorkout}
        />

        <section className="closing-cta">
          <Reveal className="closing-cta-inner">
            <p className="section-label">
              <Sparkles size={14} aria-hidden="true" />
              Your next rep starts now
            </p>

            <h2>Consistency beats perfection.</h2>

            <p>
              Choose your workout, take it one exercise at a time, and
              keep going.
            </p>

            <a className="button-primary" href="#planner">
              <Dumbbell size={16} aria-hidden="true" />
              Plan my workout
            </a>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-icon">
            <Dumbbell size={18} aria-hidden="true" />
          </span>

          <span className="brand-text">
            Fit<span>Zone</span>
          </span>
        </a>

        <p>Build your routine. Track your progress. Keep moving.</p>

        <a className="back-to-top" href="#home">
          <ArrowUp size={15} aria-hidden="true" />
          Back to top
        </a>
      </footer>

      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          completed={completedExercises.includes(
            selectedExercise.id
          )}
          favorite={favorites.includes(selectedExercise.id)}
          onClose={() => setSelectedExercise(null)}
          onStart={() => startWorkout([selectedExercise])}
          onMarkDone={() => handleMarkDone(selectedExercise)}
          onToggleFavorite={() => toggleFavorite(selectedExercise)}
          onWatchVideo={() => setActiveVideo(selectedExercise)}
        />
      )}

      {sessionOpen && (
        <WorkoutSession
          finished={sessionFinished}
          resting={resting}
          restSeconds={restSeconds}
          session={session}
          sessionIndex={sessionIndex}
          currentExercise={currentExercise}
          completedNames={sessionCompletedNames}
          onClose={closeSession}
          onSkipRest={() => {
            setResting(false);
            setRestSeconds(REST_SECONDS);
          }}
          onPrevious={() => {
            if (sessionIndex === 0) {
              closeSession();
            } else {
              setSessionIndex((index) => index - 1);
            }
          }}
          onComplete={completeCurrentExercise}
          onSkipExercise={() => {
            if (sessionIndex >= session.length - 1) {
              finishSession();
            } else {
              setSessionIndex((index) => index + 1);
              setResting(false);
            }
          }}
          onWatchVideo={(exercise) => setActiveVideo(exercise)}
        />
      )}

      {activeVideo && (
        <VideoModal
          exercise={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}

      <BackToTop />
      <PwaManager />
    </div>
  );
}

export default App;
