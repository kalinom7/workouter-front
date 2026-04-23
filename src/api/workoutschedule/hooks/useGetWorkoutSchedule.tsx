import { useMutation } from "@tanstack/react-query";
import { WorkoutScheduleApi } from "../WorkoutScheduleApi";

export const useGetWorkoutSchedule = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      scheduleId,
    }: {
      userId: string;
      scheduleId: string;
    }) => {
      return WorkoutScheduleApi.getWorkoutSchedule(userId, scheduleId);
    },
  });
};
