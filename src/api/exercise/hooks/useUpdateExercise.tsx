import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExerciseApi } from "../Exercise.api";
import type { Exercise } from "@/types/ExerciseTypes";

export const useUpdateExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      exerciseId,
      name,
      description,
    }: {
      userId: string;
      exerciseId: string;
      name: string | undefined;
      description: string | undefined;
    }) => {
      return ExerciseApi.updateExercise(userId, exerciseId, name, description);
    },
    onMutate: async ({ userId, exerciseId, name, description }) => {
      await queryClient.cancelQueries({
        queryKey: ["exercises", exerciseId, userId],
      });
      const previousExercise = queryClient.getQueryData<Exercise>([
        "exercises",
        exerciseId,
        userId,
      ]);

      queryClient.setQueryData(
        ["exercises", exerciseId, userId],
        (old: Exercise) => {
          return {
            ...old,
            name: name ?? old.name,
            description: description ?? old.description,
          };
        },
      );

      return { previousExercise };
    },
    onError: (_err, { userId, exerciseId }, context) => {
      if (context) {
        queryClient.setQueryData(
          ["exercises", exerciseId, userId],
          context.previousExercise,
        );
      }
    },
    onSettled: (_data, _err, { exerciseId, userId }) => {
      queryClient.invalidateQueries({
        queryKey: ["exercises", exerciseId, userId],
      });
    },
  });
};
