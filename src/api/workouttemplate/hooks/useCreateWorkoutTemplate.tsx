import { useMutation } from "@tanstack/react-query";
import { WorkoutTemplateApi } from "../WorkoutTemplateApi";

export const useCreateWorkoutTemplate = () => {
  return useMutation({
    mutationFn: async ({ userId, name }: { userId: string; name: string }) => {
      return WorkoutTemplateApi.createWorkoutTemplate(userId, name);
    },
  });
};
