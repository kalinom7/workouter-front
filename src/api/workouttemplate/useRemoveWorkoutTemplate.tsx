import { useMutation } from "@tanstack/react-query";
import { WorkoutTemplateApi } from "./WorkoutTemplateApi";

export const useDeleteWorkoutTemplate = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      workoutTemplateId,
    }: {
      userId: string;
      workoutTemplateId: string;
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay
      return WorkoutTemplateApi.deleteWorkoutTemplate(
        userId,
        workoutTemplateId,
      );
    },
  });
};
