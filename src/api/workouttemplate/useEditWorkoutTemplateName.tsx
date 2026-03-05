import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkoutTemplateApi } from "./WorkoutTemplateApi";
import type { WorkoutTemplate } from "@/types/WorkoutTemplateTypes";

export const useEditWorkoutTemplateName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      workoutTemplateId,
      newName,
    }: {
      userId: string;
      workoutTemplateId: string;
      newName: string;
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return WorkoutTemplateApi.editName(userId, workoutTemplateId, newName);
    },

    onMutate: async (variables) => {
      const { userId, workoutTemplateId, newName } = variables;

      await queryClient.cancelQueries({
        queryKey: ["AllWorkoutTemplates", userId],
      });

      const previousWorkoutTemplates =
        queryClient.getQueryData<WorkoutTemplate[]>([
          "AllWorkoutTemplates",
          userId,
        ]);

      queryClient.setQueryData(
        ["AllWorkoutTemplates", userId],
        (old: WorkoutTemplate[] | undefined) => {
          if (!old) return old;

          return old.map((template) => {
            if (template.id === workoutTemplateId) {
              return { ...template, name: newName };
            }
            return template;
          });
        }
      );

      return { previousWorkoutTemplates };
    },

    onError: (_err, variables, context) => {
      if (context?.previousWorkoutTemplates) {
        queryClient.setQueryData(
          ["AllWorkoutTemplates", variables.userId],
          context.previousWorkoutTemplates
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