import type { Workout } from "@/types/WorkoutTypes";

export const areAllExercisesDone = (workout: Workout): boolean => {
  return workout.exercises.every((ex) => ex.isCompleted);
};
