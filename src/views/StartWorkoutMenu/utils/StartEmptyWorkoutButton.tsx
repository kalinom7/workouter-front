import { useStartEmptyWorkout } from "@/api/workout/hooks/useStartEmptyWorkout";
import { Button } from "@/components/ui/button"
import type { Workout } from "@/types/WorkoutTypes";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const userId = "123e4567-e89b-12d3-a456-426614174000";
export const StartEmptyWorkoutButton = () => {
    const {mutate, isPending} = useStartEmptyWorkout();
    const navigate = useNavigate();

    const onStartSuccess = (workout: Workout) => {
        toast.success(`Workout started! Workout ID: ${workout.id}`);
        navigate(`/workout/${workout.id}/ongoing`);
    }
    const onStartError = (error: Error) => {
        toast.error(`Failed to start workout: ${error.message || 'Unknown error'}`);
    }

    const onStartEmptyWorkoutClick = () => {
        mutate(userId, {
            onSuccess: onStartSuccess,
            onError: onStartError
        })
    }

    return (
        <Button disabled={isPending} onClick={onStartEmptyWorkoutClick}>Start empty workout</Button>
    )
}