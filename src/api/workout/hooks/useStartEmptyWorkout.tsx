import { useMutation } from "@tanstack/react-query";
import { WorkoutApi } from "../WorkoutApi";

export const useStartEmptyWorkout = () => {
  return useMutation({
    mutationFn: async (userId: string) => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay
      return WorkoutApi.startEmptyWorkout(userId);
    },
  });
};
