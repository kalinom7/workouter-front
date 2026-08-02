import { useStartEmptyWorkout } from "@/api/workout/hooks/useStartEmptyWorkout";
import { Button } from "@/components/ui/button";
import type { Workout } from "@/types/WorkoutTypes";
import { globalUserId } from "@/utils/globalUserId";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const StartEmptyWorkoutDialog = () => {
  const { mutate, isPending } = useStartEmptyWorkout();
  const navigate = useNavigate();

  const onStartSuccess = (workout: Workout) => {
    toast.success(`Workout started! Workout ID: ${workout.id}`);
    navigate(`/workouts/${workout.id}/ongoing`);
  };
  const onStartError = (error: Error) => {
    toast.error(`Failed to start workout: ${error.message || "Unknown error"}`);
  };

  const onStartEmptyWorkoutClick = () => {
    mutate(globalUserId, {
      onSuccess: onStartSuccess,
      onError: onStartError,
    });
  };

  return (
    <Button disabled={isPending} onClick={onStartEmptyWorkoutClick}>
      Start empty workout
    </Button>
  );
};
