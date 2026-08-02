import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { WorkoutScheduleApi } from "../WorkoutScheduleApi";
import type {
  WorkoutPatternItem,
  WorkoutSchedule,
} from "@/types/WorkoutScheduleTypes";

export const useRemovePatternItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      workoutScheduleId,
      patternItemId,
    }: {
      userId: string;
      workoutScheduleId: string;
      patternItemId: string;
    }) => {
      return await WorkoutScheduleApi.removePatternItem(
        userId,
        patternItemId,
        workoutScheduleId,
      );
    },
    onMutate: async ({ userId, workoutScheduleId, patternItemId }) => {
      await queryClient.cancelQueries({
        queryKey: ["workout-schedule", workoutScheduleId, userId],
      });

      const previousData = queryClient.getQueryData([
        "workout-schedule",
        workoutScheduleId,
        userId,
      ]);

      queryClient.setQueryData(
        ["workout-schedule", workoutScheduleId, userId],
        (oldData: WorkoutSchedule) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            patternItems: oldData.pattern.filter(
              (item: WorkoutPatternItem) => item.id !== patternItemId,
            ),
          };
        },
      );

      return { previousData };
    },
    onError: (error: Error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["workout-schedule", variables.workoutScheduleId, variables.userId],
          context.previousData,
        );
      }
      toast.error(`Failed to remove pattern item: ${error.message}`);
    },
    onSettled: (_data, _error, { userId, workoutScheduleId }) => {
      queryClient.invalidateQueries({
        queryKey: ["workout-schedule", workoutScheduleId, userId],
      });
      toast.success(`Pattern item removed successfully!`);
    },
  });
};
