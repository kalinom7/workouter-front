import { useMutation } from "@tanstack/react-query";
import { WorkoutApi } from "../WorkoutApi";

export const useMarkSetAsUnCompleted = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      workoutId,
      exerciseOrder,
      setOrder,
    }: {
      userId: string;
      workoutId: string;
      exerciseOrder: number;
      setOrder: number;
    }) => {
      return WorkoutApi.markSetAsUncompleted(
        userId,
        workoutId,
        exerciseOrder,
        setOrder,
      );
    },
  });
};
