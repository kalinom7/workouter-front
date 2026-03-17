import { useMutation } from "@tanstack/react-query";
import { WorkoutApi } from "../WorkoutApi";

export const useSaveSet = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      workoutId,
      exerciseOrder,
      setOrder,
      weight,
      reps,
    }: {
      userId: string;
      workoutId: string;
      exerciseOrder: number;
      setOrder: number;
      weight: number;
      reps: number;
    }) => {
      return WorkoutApi.addWeightAndRepsToSet(
        userId,
        workoutId,
        exerciseOrder,
        setOrder,
        weight,
        reps,
      );
    },
  });
};
