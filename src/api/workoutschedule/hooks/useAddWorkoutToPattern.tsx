import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkoutScheduleApi } from "../WorkoutScheduleApi";
import { toast } from "sonner";

export const useAddWorkoutToPattern = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      workoutTemplateId,
      workoutScheduleId,
    }: {
      userId: string;
      workoutTemplateId: string;
      workoutScheduleId: string;
    }) => {
      return await WorkoutScheduleApi.addWorkoutToPattern(
        userId,
        workoutTemplateId,
        workoutScheduleId,
      );
    },
    onSuccess: ({ id, userId }) => {
      queryClient.invalidateQueries({
        queryKey: ["workout-schedule", id, userId],
      });
      toast.success(`Workout added to pattern successfully!`);
    },
    onError: (error: Error) => {
      toast.error(`Failed to add workout to pattern: ${error.message}`);
    },
  });
};
