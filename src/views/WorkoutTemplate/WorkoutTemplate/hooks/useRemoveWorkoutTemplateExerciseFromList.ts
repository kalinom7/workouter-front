import { useRemoveWorkoutTemplateExercise } from "@/api/workouttemplate/hooks/useRemoveWorkoutTemplateExercise";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveWorkoutTemplateExerciseFromList = (
  workoutTemplateId: string,
  userId: string,
) => {
  const mutation = useRemoveWorkoutTemplateExercise();
  const queryClient = useQueryClient();

  const removeExercise = (order: number) => {
    mutation.mutate(
      { userId, workoutTemplateId, order },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["workout-templates", workoutTemplateId, userId],
          });
          toast.success("Exercise removed from template.");
        },
        onError: (error: Error) => {
          toast.error(
            `Failed to remove exercise from template: ${error.message}`,
          );
        },
      },
    );
  };

  return {
    removeExercise,
    isPending: mutation.isPending,
  };
};
