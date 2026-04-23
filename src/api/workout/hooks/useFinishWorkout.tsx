import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkoutApi } from "../WorkoutApi";
import { toast } from "sonner";
import type { Workout } from "@/types/WorkoutTypes";

export const useFinishWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      workoutId,
    }: {
      userId: string;
      workoutId: string;
    }) => {
      WorkoutApi.finishWorkout(userId, workoutId);
    },
    onMutate: async ({ userId, workoutId }) => {
      await queryClient.cancelQueries({
        queryKey: ["workout", workoutId, userId],
      });

      const previousWorkout = queryClient.getQueryData([
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
            isFinished: true,
          };
        },
      );

      return { previousWorkout };
    },
    onError: () => {
      toast.error("failed to finish workout, please try again");
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["workout", variables.workoutId, variables.userId],
      });
    },
  });
};
