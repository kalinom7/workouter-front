import { useQuery } from "@tanstack/react-query";
import { WorkoutTemplateApi } from "./WorkoutTemplateApi";

export const useGetAllWorkoutTemplates = (userId: string) => {
  return useQuery({
    queryKey: ["AllWorkoutTemplates", userId],
    queryFn: async () => WorkoutTemplateApi.getAllWorkoutTemplates(userId),
  });
};
