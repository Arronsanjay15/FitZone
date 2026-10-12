import { Funnel, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import type { Category, LevelFilter, MuscleGroup } from "../types";
import { equipmentOptions, levels, muscleGroups } from "../data/exercises";
import { equipmentIcons } from "../lib/icons";

type ExerciseFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  category: Category;
  onCategoryChange: (category: Category) => void;
  level: LevelFilter;
  onLevelChange: (level: LevelFilter) => void;
  selectedMuscles: MuscleGroup[];
  onToggleMuscle: (group: MuscleGroup) => void;
  onReset: () => void;
  resultCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
};

export function ExerciseFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  level,
  onLevelChange,
  selectedMuscles,
  onToggleMuscle,
  onReset,
  resultCount,
  totalCount,
  hasActiveFilters
}: ExerciseFiltersProps) {
  const categories: Category[] = ["All", ...equipmentOptions];
  const levelOptions: LevelFilter[] = ["All", ...levels];

  return (
    <div className="filter-panel">
      <div className="filter-panel-head">
        <span className="filter-panel-title">
          <Funnel size={15} aria-hidden="true" />
          Filters
        </span>
        {hasActiveFilters ? (
          <button type="button" className="clear-filters" onClick={onReset}>
            <RotateCcw size={14} aria-hidden="true" />
            Reset
          </button>
        ) : null}
      </div>

      <div className="search-field">
        <Search size={17} aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search exercises or muscles..."
          aria-label="Search exercises"
        />
        {search ? (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            <X size={16} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div className="filter-group">
        <span className="filter-group-title">Equipment</span>
        <div className="filter-chips">
          {categories.map((item) => {
            const Icon =
              item === "All" ? SlidersHorizontal : equipmentIcons[item];
            return (
              <button
                type="button"
                key={item}
                className={
                  category === item ? "filter-chip active" : "filter-chip"
                }
                onClick={() => onCategoryChange(item)}
                aria-pressed={category === item}
              >
                <Icon size={15} aria-hidden="true" />
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-group-title">Difficulty</span>
        <div className="filter-chips">
          {levelOptions.map((item) => (
            <button
              type="button"
              key={item}
              className={
                level === item ? "filter-chip active" : "filter-chip"
              }
              onClick={() => onLevelChange(item)}
              aria-pressed={level === item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-group-title">Muscle group</span>
        <div className="filter-chips">
          {muscleGroups.map((group) => (
            <button
              type="button"
              key={group}
              className={
                selectedMuscles.includes(group)
                  ? "filter-chip active"
                  : "filter-chip"
              }
              onClick={() => onToggleMuscle(group)}
              aria-pressed={selectedMuscles.includes(group)}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      <p className="filter-summary">
        Showing <strong>{resultCount}</strong> of {totalCount} exercises
      </p>
    </div>
  );
}
