import { useQuery } from "@tanstack/react-query";
import { WorkoutTemplateApi } from "../WorkoutTemplateApi";

export const useGetWorkoutTemplate = (id: string, userId: string) => {
  return useQuery({
    queryKey: ["workout-templates", id, userId],
    enabled: !!id,
    queryFn: async () => WorkoutTemplateApi.getWorkoutTemplate(userId, id),
  });
};
