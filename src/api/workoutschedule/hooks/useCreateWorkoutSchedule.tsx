import { useMutation } from "@tanstack/react-query";
import { WorkoutScheduleApi } from "../WorkoutScheduleApi";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useCreateWorkoutSchedule = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ userId, name }: { userId: string; name: string }) => {
      return WorkoutScheduleApi.createWorkoutSchedule(userId, name);
    },
    onSuccess: ({
      name,
      id,
      userId,
    }: {
      name: string;
      id: string;
      userId: string;
    }) => {
      toast.success(`Workout schedule "${name}" created successfully!`);
      navigate(`/workout-schedule/${id}?userId=${userId}`);
    },
    onError: (error: Error) => {
      toast.error(`Failed to create workout schedule: ${error.message}`);
    },
  });
};
