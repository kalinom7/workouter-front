import { useQuery } from "@tanstack/react-query";
import { WorkoutScheduleApi } from "../WorkoutScheduleApi";

export const useGetAllWorkoutSchedules = (userId: string) => {
  return useQuery({
    queryKey: ["AllWorkoutSchedules", userId],
    queryFn: async () => WorkoutScheduleApi.getAllWorkoutSchedules(userId),
  });
};
