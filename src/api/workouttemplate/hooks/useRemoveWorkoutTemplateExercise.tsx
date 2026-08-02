import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkoutTemplateApi } from "../WorkoutTemplateApi";
import type { WorkoutTemplate } from "@/types/WorkoutTemplateTypes";
import { toast } from "sonner";

export const useRemoveWorkoutTemplateExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      workoutTemplateId,
      order,
    }: {
      userId: string;
      workoutTemplateId: string;
      order: number;
    }) => {
      return WorkoutTemplateApi.removeWorkoutTemplateExercise(
        userId,
        workoutTemplateId,
        order,
      );
    },
    onMutate: async ({ userId, workoutTemplateId, order }) => {
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
          const newWorkoutTemplate: WorkoutTemplate = {
            ...old,
            exercises: old.exercises.filter(
              (workoutTemplateExercise) =>
                workoutTemplateExercise.order != order,
            ),
          };

          return newWorkoutTemplate;
        },
      );

      return { previousData };
    },
    onError: async (_err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["workout-templates", variables.workoutTemplateId, variables.userId],
          context.previousData,
        );
      }
    },
    onSuccess: async (_data, variables, context) => {
      const removedExercise = context.previousData?.exercises.find(
        (ex) => ex.order === variables.order,
      );
      toast.success(
        `Exercise: ${removedExercise?.exercise.name ?? ""} removed successfully`,
      );
    },
    onSettled: async (_data, _error, variables) => {
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
