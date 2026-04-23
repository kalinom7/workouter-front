import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkoutTemplateApi } from "../WorkoutTemplateApi";
import type { WorkoutTemplate } from "@/types/WorkoutTemplateTypes";

export const useDeleteWorkoutTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      workoutTemplateId,
    }: {
      userId: string;
      workoutTemplateId: string;
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay
      return WorkoutTemplateApi.deleteWorkoutTemplate(
        userId,
        workoutTemplateId,
      );
    },
    onMutate: async (variables) => {
      const { userId, workoutTemplateId } = variables;

      await queryClient.cancelQueries({
        queryKey: ["AllWorkoutTemplates", userId],
      });

      const previousWorkoutTemplates = queryClient.getQueryData<
        WorkoutTemplate[]
      >(["AllWorkoutTemplates", userId]);

      queryClient.setQueryData(
        ["AllWorkoutTemplates", userId],
        (old: WorkoutTemplate[] | undefined) => {
          if (!old) return old;

          return old.filter((template) => template.id !== workoutTemplateId);
        },
      );

      return { previousWorkoutTemplates };
    },
    onError: (_err, variables, context) => {
      if (context?.previousWorkoutTemplates) {
        queryClient.setQueryData(
          ["AllWorkoutTemplates", variables.userId],
          context.previousWorkoutTemplates,
        );
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["AllWorkoutTemplates", variables.userId],
      });
    },
  });
};
