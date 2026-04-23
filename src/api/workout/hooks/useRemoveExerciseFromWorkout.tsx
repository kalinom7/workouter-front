import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkoutApi } from "../WorkoutApi";
import type { Workout } from "@/types/WorkoutTypes";

export const useRemoveExerciseFromWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      workoutId,
      exerciseOrder,
    }: {
      userId: string;
      workoutId: string;
      exerciseOrder: number;
    }) => {
      return WorkoutApi.removeExerciseFromWorkout(
        userId,
        workoutId,
        exerciseOrder,
      );
    },
    onMutate: async ({ userId, workoutId, exerciseOrder }) => {
      queryClient.cancelQueries({ queryKey: ["workout", workoutId, userId] });

      const previousWorkout = queryClient.getQueryData<Workout>([
        "workout",
        workoutId,
        userId,
      ]);

      queryClient.setQueryData(
        ["workout", workoutId, userId],
        (old: Workout) => {
          if (!old) return old;
          return {
            ...old,
            exercises: old.exercises.filter((ex) => ex.order !== exerciseOrder),
          };
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
