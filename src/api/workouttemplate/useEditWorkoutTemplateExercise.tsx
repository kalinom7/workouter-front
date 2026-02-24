import { useMutation } from "@tanstack/react-query";
import { WorkoutTemplateApi } from "./WorkoutTemplateApi";

export const useEditWorkoutTemplateExercise = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      workoutTemplateId,
      originalSets,
      originalRestPeriod,
      order,
      newSets,
      newRestPeriod,
    }: {
      userId: string;
      workoutTemplateId: string;
      order: number;
      originalSets?: number;
      originalRestPeriod?: number;
      newSets?: number;
      newRestPeriod?: number;
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay

      if (order === undefined) {
        throw new Error("Order is required to edit an exercise.");
      }

      if (newSets !== undefined && newSets !== originalSets) {
        await WorkoutTemplateApi.setNumberOfSets(
          userId,
          order,
          newSets,
          workoutTemplateId,
        );
      }

      if (newRestPeriod != undefined && newRestPeriod !== originalRestPeriod) {
        await WorkoutTemplateApi.setRestPeriod(
          userId,
          order,
          newRestPeriod,
          workoutTemplateId,
        );
      }
    },
  });
};
