import { useQuery } from "@tanstack/react-query";
import { WorkoutScheduleApi } from "../WorkoutScheduleApi";

export const useGetWorkoutSchedule = (userId: string, scheduleId: string) => {
  return useQuery({
    queryKey: ["workout-schedule", scheduleId, userId],
    queryFn: async () =>
      WorkoutScheduleApi.getWorkoutSchedule(userId, scheduleId),
  });
};
