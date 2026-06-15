import { useQuery } from "@tanstack/react-query";
import { WorkoutScheduleApi } from "../WorkoutScheduleApi";

export const useGetScheduledActivity = (userId: string) => {
  return useQuery({
    queryKey: ["scheduledActivity", userId],
    queryFn: async () => WorkoutScheduleApi.getScheduledActivity(userId),
  });
};
