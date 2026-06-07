import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkoutScheduleApi } from "../WorkoutScheduleApi";
import type { WorkoutSchedule } from "@/types/WorkoutScheduleTypes";

export const useRenameWorkoutSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      workoutScheduleId,
      newName,
    }: {
      userId: string;
      workoutScheduleId: string;
      newName: string;
    }) => {
      return WorkoutScheduleApi.renameWorkoutSchedule(
        userId,
        workoutScheduleId,
        newName,
      );
    },
    onMutate: async ({ userId, workoutScheduleId, newName }) => {
      await queryClient.cancelQueries({
        queryKey: ["workout-schedule", workoutScheduleId, userId],
      });
      const previousWorkoutSchedule = queryClient.getQueryData<WorkoutSchedule>(
        ["workout-schedule", workoutScheduleId, userId],
      );

      queryClient.setQueryData(
        ["workout-schedule", workoutScheduleId, userId],
        (old: WorkoutSchedule) => {
          return {
            ...old,
            name: newName,
          };
        },
      );

      return { previousWorkoutSchedule };
    },
    onError: (_err, { userId, workoutScheduleId }, context) => {
      if (context) {
        queryClient.setQueryData(
          ["workout-schedule", workoutScheduleId, userId],
          context.previousWorkoutSchedule,
        );
      }
    },
    onSettled: (_data, _error, { userId, workoutScheduleId }) => {
      queryClient.invalidateQueries({
        queryKey: ["workout-schedule", workoutScheduleId, userId],
      });
    },
  });
};
