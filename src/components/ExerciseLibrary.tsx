import { useState, type ReactNode } from "react";
import { Funnel, RotateCcw, Search } from "lucide-react";
import type { Category, Exercise, LevelFilter, MuscleGroup } from "../types";
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
  onReset,
  renderCard
}: ExerciseLibraryProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "All" ||
    level !== "All" ||
    selectedMuscles.length > 0;

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
          />
        </aside>

        <div className="library-results">
          {visibleExercises.length > 0 ? (
            <div className="exercise-grid">
              {visibleExercises.map(renderCard)}
            </div>
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
