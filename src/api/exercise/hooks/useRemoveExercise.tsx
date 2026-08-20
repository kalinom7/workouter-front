import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExerciseApi } from "../Exercise.api";
import type { Exercise } from "@/types/ExerciseTypes";

export const useRemoveExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      exerciseId,
    }: {
      userId: string;
      exerciseId: string;
    }) => {
      return ExerciseApi.deleteExercise(userId, exerciseId);
    },
    onMutate: async ({ userId, exerciseId }) => {
      await queryClient.cancelQueries({ queryKey: ["exercises", userId] });

      const previousExercises = queryClient.getQueryData<Exercise[]>([
        "exercises",
        userId,
      ]);

      queryClient.setQueryData(["exercises", userId], (old: Exercise[]) => {
        if (!old) return old;
        return old.filter((ex) => ex.id != exerciseId);
      });
      return { previousExercises };
    },
    onError: (_err, { userId }, context) => {
      if (context) {
        queryClient.setQueryData(
          ["exercises", userId],
          context.previousExercises,
        );
      }
    },
    onSettled: (_data, _err, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["exercises", userId] });
    },
  });
};
