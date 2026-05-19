import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkoutScheduleApi } from "../WorkoutScheduleApi";
import type { WorkoutSchedule } from "@/types/WorkoutScheduleTypes";
import { toast } from "sonner";

export const useSetWorkoutScheduleInactive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      workoutScheduleId,
    }: {
      userId: string;
      workoutScheduleId: string;
    }) => {
      return WorkoutScheduleApi.setWorkoutScheduleInactive(
        userId,
        workoutScheduleId,
      );
    },
    onMutate: async ({ userId, workoutScheduleId }) => {
      await queryClient.cancelQueries({
        queryKey: ["AllWorkoutSchedules", userId],
      });

      const previousSchedules = queryClient.getQueryData([
        "AllWorkoutSchedules",
        userId,
      ]);

      queryClient.setQueryData(
        ["AllWorkoutSchedules", userId],
        (old: WorkoutSchedule[] | undefined) => {
          if (!old) return old;

          return old.map((schedule) => ({
            ...schedule,
            isActive:
              schedule.id === workoutScheduleId ? false : schedule.isActive,
          }));
        },
      );

      return { previousSchedules };
    },
    onError: (_err, { userId }, context) => {
      toast.error("Failed to set inactive schedule. Please try again.");
      if (context?.previousSchedules) {
        queryClient.setQueryData(
          ["AllWorkoutSchedules", userId],
          context.previousSchedules,
        );
      }
    },
    onSettled: (_data, _error, { userId }) => {
      toast.success("Schedule was set inactive.");
      queryClient.invalidateQueries({
        queryKey: ["AllWorkoutSchedules", userId],
      });
    },
  });
};
