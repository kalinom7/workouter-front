import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../fetch";
import type { Exercise } from "@/types/ExerciseTypes";

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
      return apiFetch<Exercise>(`/exercises?userId=${userId}`, {
        method: "POST",
        body: JSON.stringify({ name, description }),
      });
    },
  });
};
