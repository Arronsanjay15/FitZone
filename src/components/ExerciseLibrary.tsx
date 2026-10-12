import { useState, type ReactNode } from "react";
import { Funnel, Heart, RotateCcw, Search } from "lucide-react";
import type { Category, Exercise, LevelFilter, MuscleGroup } from "../types";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ExerciseFilters } from "./ExerciseFilters";
import { EmptyState } from "./EmptyState";

type ExerciseLibraryProps = {
  visibleExercises: Exercise[];
  totalCount: number;
  search: string;
  onSearchChange: (value: string) => void;
  category: Category;
  onCategoryChange: (category: Category) => void;
  level: LevelFilter;
  onLevelChange: (level: LevelFilter) => void;
  selectedMuscles: MuscleGroup[];
  onToggleMuscle: (group: MuscleGroup) => void;
  savedOnly: boolean;
  onToggleSavedOnly: () => void;
  favoriteCount: number;
  onReset: () => void;
  renderCard: (exercise: Exercise) => ReactNode;
};

export function ExerciseLibrary({
  visibleExercises,
  totalCount,
  search,
  onSearchChange,
  category,
  onCategoryChange,
  level,
  onLevelChange,
  selectedMuscles,
  onToggleMuscle,
  savedOnly,
  onToggleSavedOnly,
  favoriteCount,
  onReset,
  renderCard
}: ExerciseLibraryProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "All" ||
    level !== "All" ||
    selectedMuscles.length > 0 ||
    savedOnly;

  return (
    <section className="section" id="exercises">
      <SectionHeading
        label="The exercise library"
        title="Find your next workout"
        description="Browse the full library, filter by equipment, difficulty and muscle group, or search by name."
        aside={
          <span className="exercise-count">
            {visibleExercises.length}{" "}
            {visibleExercises.length === 1 ? "exercise" : "exercises"}
          </span>
        }
      />

      <button
        type="button"
        className="filters-toggle"
        aria-expanded={filtersOpen}
        onClick={() => setFiltersOpen((open) => !open)}
      >
        <Funnel size={16} aria-hidden="true" />
        {filtersOpen ? "Hide filters" : "Show filters"}
      </button>

      <div className="library-layout">
        <aside className={`filter-sidebar${filtersOpen ? " open" : ""}`}>
          <ExerciseFilters
            search={search}
            onSearchChange={onSearchChange}
            category={category}
            onCategoryChange={onCategoryChange}
            level={level}
            onLevelChange={onLevelChange}
            selectedMuscles={selectedMuscles}
            onToggleMuscle={onToggleMuscle}
            onReset={onReset}
            resultCount={visibleExercises.length}
            totalCount={totalCount}
            hasActiveFilters={hasActiveFilters}
            savedOnly={savedOnly}
            onToggleSavedOnly={onToggleSavedOnly}
            favoriteCount={favoriteCount}
          />
        </aside>

        <div className="library-results">
          {visibleExercises.length > 0 ? (
            <Reveal variant="stagger" className="exercise-grid">
              {visibleExercises.map(renderCard)}
            </Reveal>
          ) : savedOnly && favoriteCount === 0 ? (
            <EmptyState
              icon={Heart}
              title="No saved exercises yet"
              message="Tap the heart on any exercise to save it here for quick access later."
            >
              <button
                type="button"
                className="details-button"
                onClick={onToggleSavedOnly}
              >
                Browse all exercises
              </button>
            </EmptyState>
          ) : (
            <EmptyState
              icon={Search}
              title="No exercises found"
              message="Try another search term or clear your filters to see more exercises."
            >
              <button type="button" className="button-primary" onClick={onReset}>
                <RotateCcw size={16} aria-hidden="true" />
                Reset filters
              </button>
            </EmptyState>
          )}
        </div>
      </div>
    </section>
  );
}
