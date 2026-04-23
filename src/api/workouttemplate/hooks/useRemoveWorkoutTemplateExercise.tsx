import { useMutation } from "@tanstack/react-query";
import { WorkoutTemplateApi } from "../WorkoutTemplateApi";

export const useRemoveWorkoutTemplateExercise = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      workoutTemplateId,
      order,
    }: {
      userId: string;
      workoutTemplateId: string;
      order: number;
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return WorkoutTemplateApi.removeWorkoutTemplateExercise(
        userId,
        workoutTemplateId,
        order,
      );
    },
  });
};
