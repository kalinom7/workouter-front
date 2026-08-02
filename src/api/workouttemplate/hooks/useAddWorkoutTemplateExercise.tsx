import { useMutation } from "@tanstack/react-query";
import { WorkoutTemplateApi } from "../WorkoutTemplateApi";

export const useAddWorkoutTemplateExercise = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      workoutTemplateId,
      exerciseId,
      sets,
      restPeriod,
    }: {
      userId: string;
      workoutTemplateId: string;
      exerciseId: string;
      sets: number;
      restPeriod: number;
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay
      return WorkoutTemplateApi.addWorkoutTemplateExercise(
        userId,
        exerciseId,
        workoutTemplateId,
        sets,
        restPeriod,
      );
    },
  });
};
