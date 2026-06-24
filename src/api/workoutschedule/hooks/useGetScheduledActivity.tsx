import { useQuery } from "@tanstack/react-query";
import { WorkoutScheduleApi } from "../WorkoutScheduleApi";
import { HttpError } from "@/api/errors/HttpError";

type ScheduledActivityResult =
  | { status: "active"; activityId: string | null }
  | { status: "skipped" }
  | { status: "no-schedule" };

export const useGetScheduledActivity = (userId: string) => {
  return useQuery<ScheduledActivityResult>({
    queryKey: ["scheduledActivity", userId],
    queryFn: async () => {
      try {
        const data = await WorkoutScheduleApi.getScheduledActivity(userId);
        return { status: "active", activityId: data };
      } catch (error) {
        if (error instanceof HttpError && error.status === 409) {
          return { status: "skipped" };
        }
        if (error instanceof HttpError && error.status === 404) {
          return { status: "no-schedule" };
        }
        throw error;
      }
    },
  });
};
