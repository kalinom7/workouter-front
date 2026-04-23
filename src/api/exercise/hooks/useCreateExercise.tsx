import { useMutation } from "@tanstack/react-query";
import { ExerciseApi } from "../Exercise.api";

export const useCreateExercise = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      name,
      description,
    }: {
      userId: string;
      name: string;
      description?: string;
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay
      return ExerciseApi.createExercise(userId, name, description);
    },
  });
};
