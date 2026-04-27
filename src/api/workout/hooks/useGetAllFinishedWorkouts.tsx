import { useQuery } from "@tanstack/react-query";
import { WorkoutApi } from "../WorkoutApi";

export const useGetAllFinishedWorkouts = (userId: string) => {
  return useQuery({
    queryKey: ["AllFinishedWorkouts", userId],
    queryFn: async () => WorkoutApi.getAllFinishedWorkouts(userId),
  });
};
