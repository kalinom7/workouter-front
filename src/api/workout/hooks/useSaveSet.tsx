import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkoutApi } from "../WorkoutApi";
import type { Workout } from "@/types/WorkoutTypes";
import { updateSet } from "./helper/updateSet";

export const useSaveSet = () => {
  const queryClient = useQueryClient();

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
    onMutate: async ({
      userId,
      workoutId,
      exerciseOrder,
      setOrder,
      weight,
      reps,
    }) => {
      await queryClient.cancelQueries({
        queryKey: ["workout", workoutId, userId],
      });
      const previousWorkout = queryClient.getQueryData<Workout>([
        "workout",
        workoutId,
        userId,
      ]);

      queryClient.setQueryData(
        ["workout", workoutId, userId],
        (old: Workout) => {
          if (!old) return old;

          return updateSet(old, exerciseOrder, setOrder, {
            weight,
            reps,
            isCompleted: true,
          });
        },
      );
      return { previousWorkout };
    },
    onError: (_err, variables, context) => {
      if (context?.previousWorkout) {
        queryClient.setQueryData(
          ["workout", variables.workoutId, variables.userId],
          context.previousWorkout,
        );
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["workout", variables.workoutId, variables.userId],
      });
    },
  });
};
