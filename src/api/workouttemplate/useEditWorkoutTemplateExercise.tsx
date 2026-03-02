import { useMutation } from "@tanstack/react-query";
import { WorkoutTemplateApi } from "./WorkoutTemplateApi";

export const useEditWorkoutTemplateExercise = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      exerciseId,
      workoutTemplateId,
      order,
      newSets,
      newRestPeriod,
    }: {
      userId: string;
      exerciseId: string;
      workoutTemplateId: string;
      order: number;
      newSets: number;
      newRestPeriod: number;
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay
      return WorkoutTemplateApi.editWorkoutTemplateExercise(
        userId,
        exerciseId,
        workoutTemplateId,
        newSets,
        newRestPeriod,
        order,
      );
    },
  });
};
