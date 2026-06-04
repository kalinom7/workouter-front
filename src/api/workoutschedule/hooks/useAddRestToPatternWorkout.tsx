import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkoutScheduleApi } from "../WorkoutScheduleApi";
import type {
  WorkoutPatternItem,
  WorkoutSchedule,
} from "@/types/WorkoutScheduleTypes";
import { toast } from "sonner";

export const useAddRestToPatternWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      workoutScheduleId,
      restDays,
      patternItemId,
    }: {
      userId: string;
      workoutScheduleId: string;
      restDays: number;
      patternItemId: string;
    }) => {
      return await WorkoutScheduleApi.addRestToPatternWorkout(
        userId,
        workoutScheduleId,
        restDays,
        patternItemId,
      );
    },
    onMutate: async ({
      userId,
      workoutScheduleId,
      patternItemId,
      restDays,
    }) => {
      await queryClient.cancelQueries({
        queryKey: ["workout-schedule", workoutScheduleId, userId],
      });

      const previousSchedule = queryClient.getQueryData([
        "workout-schedule",
        workoutScheduleId,
        userId,
      ]);

      queryClient.setQueryData(
        ["workout-schedule", workoutScheduleId, userId],
        (old: WorkoutSchedule | undefined) => {
          if (!old) return old;

          return {
            ...old,
            pattern: old.pattern.map((patternItem: WorkoutPatternItem) =>
              patternItem.patternItemId == patternItemId
                ? {
                    ...patternItem,
                    restDays: restDays,
                  }
                : patternItem,
            ),
          };
        },
      );

      return { previousSchedule };
    },
    onError: (_err, { userId, workoutScheduleId }, context) => {
      toast.error("Failed to add rest days. Please try again");
      if (context?.previousSchedule) {
        queryClient.setQueryData(
          ["workout-schedule", workoutScheduleId, userId],
          context.previousSchedule,
        );
      }
    },
    onSettled: (_data, _error, { userId, workoutScheduleId }) => {
      queryClient.invalidateQueries({
        queryKey: ["workout-schedule", workoutScheduleId, userId],
      });
    },
    onSuccess: () => {
      toast.success("Rest days added.");
    },
  });
};
