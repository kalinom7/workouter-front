import type { Workout, WorkoutExerciseSet } from "@/types/WorkoutTypes";

export const updateSet = (
  workout: Workout,
  exerciseOrder: number,
  setOrder: number,
  valueToUpdate: Partial<WorkoutExerciseSet>,
): Workout => {
  return {
    ...workout,
    exercises: workout.exercises.map((exercise) => {
      if (exercise.order !== exerciseOrder) return exercise;

      return {
        ...exercise,
        sets: exercise.sets.map((set) => {
          if (set.order !== setOrder) return set;

          return {
            ...set,
            ...valueToUpdate,
          };
        }),
      };
    }),
  };
};
