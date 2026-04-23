import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkoutTemplateApi } from "../WorkoutTemplateApi";
import type {
  WorkoutTemplate,
  WorkoutTemplateExercise,
} from "@/types/WorkoutTemplateTypes";

export const useEditWorkoutTemplateExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      exerciseId,
      workoutTemplateId,
      order,
      newSets,
      newRestPeriod,
    }: {
      userId: string;
      exerciseId: string;
      workoutTemplateId: string;
      order: number;
      newSets: number;
      newRestPeriod: number;
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay
      return WorkoutTemplateApi.editWorkoutTemplateExercise(
        userId,
        exerciseId,
        workoutTemplateId,
        newSets,
        newRestPeriod,
        order,
      );
    },
    onMutate: async (variables) => {
      const { userId, workoutTemplateId, order, newSets, newRestPeriod } =
        variables;

      await queryClient.cancelQueries({
        queryKey: ["workout-templates", workoutTemplateId, userId],
      });

      const previousData = queryClient.getQueryData<WorkoutTemplate>([
        "workout-templates",
        workoutTemplateId,
        userId,
      ]);

      queryClient.setQueryData(
        ["workout-templates", workoutTemplateId, userId],
        (old: WorkoutTemplate) => {
          if (!old) return old;

          return {
            ...old,
            exercises: old.exercises.map((ex: WorkoutTemplateExercise) =>
              ex.order === order
                ? {
                    ...ex,
                    sets: newSets,
                    restPeriod: newRestPeriod,
                  }
                : ex,
            ),
          };
        },
      );

      return { previousData };
    },
    onError: (_err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["workout-templates", variables.workoutTemplateId, variables.userId],
          context.previousData,
        );
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "workout-templates",
          variables.workoutTemplateId,
          variables.userId,
        ],
      });
    },
  });
};
