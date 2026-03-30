import { useMutation } from "@tanstack/react-query";
import { WorkoutApi } from "../WorkoutApi";
import { toast } from "sonner";

export const useFinishWorkout = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      workoutId,
    }: {
      userId: string;
      workoutId: string;
    }) => {
      WorkoutApi.finishWorkout(userId, workoutId);
    },
    onError: () => {
      toast.error("failed to finish workout, please try again");
    },
  });
};
