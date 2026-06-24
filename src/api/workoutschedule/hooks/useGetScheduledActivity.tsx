import { useQuery } from "@tanstack/react-query";
import { WorkoutScheduleApi } from "../WorkoutScheduleApi";
import { HttpError } from "@/api/errors/HttpError";

export const useGetScheduledActivity = (userId: string) => {
  return useQuery({
    queryKey: ["scheduledActivity", userId],
    queryFn: async () => {
      try {
        return await WorkoutScheduleApi.getScheduledActivity(userId);
      } catch (error) {
        if (error instanceof HttpError && error.status == 404) {
          return "skipped";
        } else if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    },
  });
};
