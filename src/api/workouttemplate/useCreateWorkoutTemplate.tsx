import type { WorkoutTemplateExercise } from "@/types/WorkoutTemplateTypes";
import { useMutation } from "@tanstack/react-query";
import { WorkoutTemplateApi } from "./WorkoutTemplateApi";

export type WorkoutTemplate = {
  id: string;
  name: string;
  userId: string;
  exercises: WorkoutTemplateExercise[];
};

export const useCreateWorkoutTemplate = () => {
  return useMutation({
    mutationFn: async ({ userId, name }: { userId: string; name: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay
      return WorkoutTemplateApi.createWorkoutTemplate(userId, name);
    },
  });
};
