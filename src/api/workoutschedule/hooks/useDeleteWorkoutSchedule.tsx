import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkoutScheduleApi } from "../WorkoutScheduleApi";
import type { WorkoutSchedule } from "@/types/WorkoutScheduleTypes";

export const useDeleteWorkoutSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      workoutScheduleId,
    }: {
      userId: string;
      workoutScheduleId: string;
    }) => {
      return WorkoutScheduleApi.deleteWorkoutSchedule(
        userId,
        workoutScheduleId,
      );
    },
    onMutate: async ({
      userId,
      workoutScheduleId,
    }: {
      userId: string;
      workoutScheduleId: string;
    }) => {
      await queryClient.cancelQueries({
        queryKey: ["AllWorkoutSchedules", userId],
      });
      const previousSchedules = queryClient.getQueryData<WorkoutSchedule[]>([
        "AllWorkoutSchedules",
        userId,
      ]);

      queryClient.setQueryData(
        ["AllWorkoutSchedules", userId],
        (old: WorkoutSchedule[]) => {
          if (!old) return old;

          return old.filter(
            (workoutSchedule) => workoutSchedule.id != workoutScheduleId,
          );
        },
      );
      return { previousSchedules };
    },
    onError: (_err, variables, context) => {
      if (context) {
        queryClient.setQueryData(
          ["AllWorkoutSchedules", variables.userId],
          context.previousSchedules,
        );
      }
    },
    onSettled: (_data, _err, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["AllWorkoutSchedules", variables.userId],
      });
    },
  });
};
