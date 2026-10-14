
import {
  Play,
  SlidersHorizontal,
  Sparkles,
  Target,
  Dumbbell,
  PersonStanding,
  Weight,
  Swords,
} from "lucide-react";
import type { ReactNode } from "react";

import type {
  Exercise,
  FitnessLevel,
  MuscleGroup,
  WorkoutType,
} from "../types";

import { levels, muscleGroups } from "../data/exercises";
import { planRules } from "../lib/planner";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Select } from "./Select";

export type { WorkoutType } from "../types";

type PlannerProps = {
  level: FitnessLevel;
  onLevelChange: (level: FitnessLevel) => void;
  selectedWorkoutType: WorkoutType;
  onWorkoutTypeChange: (type: WorkoutType) => void;
  selectedMuscles: MuscleGroup[];
  onToggleMuscle: (group: MuscleGroup) => void;
  onGenerate: () => void;
  plan: Exercise[];
  onStartPlan: () => void;
  renderCard: (exercise: Exercise) => ReactNode;
};

const workoutTypes = [
  { name: "Dumbbell", icon: Dumbbell },
  { name: "Bodyweight", icon: PersonStanding },
  { name: "Gym", icon: Weight },
  { name: "Kickboxing", icon: Swords },
] as const;

/** Short description of how a level shapes the generated plan. */
function describeLevelPlan(level: FitnessLevel): string {
  const { minExercises, maxExercises, sets } = planRules[level];

  const exerciseCount =
    minExercises === maxExercises
      ? `${minExercises} exercises`
      : `${minExercises}–${maxExercises} exercises`;

  return `${sets} sets per exercise · ${exerciseCount}`;
}

export function Planner({
  level,
  onLevelChange,
  selectedWorkoutType,
  onWorkoutTypeChange,
  selectedMuscles,
  onToggleMuscle,
  onGenerate,
  plan,
  onStartPlan,
  renderCard,
}: PlannerProps) {
  return (
    <section className="section" id="planner">
      <SectionHeading
        label="Personalized training"
        title="Workout planner"
        description="Choose your fitness level, workout type, and target muscle groups to build your personalized workout plan."
      />

      <Reveal className="planner-panel">
        <div className="planner-field">
          <label htmlFor="fitness-level">
            <SlidersHorizontal size={15} aria-hidden="true" />
            Fitness level
          </label>

          <Select
            id="fitness-level"
            value={level}
            options={levels}
            onChange={onLevelChange}
            ariaLabel="Fitness level"
          />

          <small>
            {level} plans use {describeLevelPlan(level)}.
          </small>
        </div>

        <div className="planner-field">
          <span className="field-label">
            <Dumbbell size={15} aria-hidden="true" />
            Workout type
          </span>

          <div className="muscle-options">
            {workoutTypes.map(({ name, icon: Icon }) => (
              <button
                type="button"
                key={name}
                className={
                  selectedWorkoutType === name
                    ? "filter-chip active"
                    : "filter-chip"
                }
                onClick={() => onWorkoutTypeChange(name)}
                aria-pressed={selectedWorkoutType === name}
              >
                <Icon size={15} aria-hidden="true" />
                {name}
              </button>
            ))}
          </div>

          <small>
            Select the type of workout you want to perform.
          </small>
        </div>

        {selectedWorkoutType !== "Kickboxing" && (
          <div className="planner-field planner-field-wide">
            <span className="field-label">
              <Target size={15} aria-hidden="true" />
              Target muscle groups
            </span>

            <div className="muscle-options">
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

            <small>
              Leave all muscle groups unselected to include every group.
            </small>
          </div>
        )}

        <button
          type="button"
          className="button-primary"
          onClick={onGenerate}
        >
          <Sparkles size={16} aria-hidden="true" />
          Generate my plan
        </button>
      </Reveal>

      {plan.length > 0 && (
        <div className="plan-results">
          <div className="section-heading">
            <div>
              <h3>Your workout plan</h3>
              <p>
                {plan.length} exercises · {plan[0]?.sets} sets each for
                your {selectedWorkoutType.toLowerCase()} workout.
              </p>
            </div>

            <button
              type="button"
              className="button-primary"
              onClick={onStartPlan}
            >
              <Play size={16} aria-hidden="true" />
              Start this plan
            </button>
          </div>

          <Reveal variant="stagger" className="exercise-grid">
            {plan.map(renderCard)}
          </Reveal>
        </div>
      )}
    </section>
  );
}
