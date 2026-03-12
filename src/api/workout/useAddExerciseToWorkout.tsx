import { useMutation } from "@tanstack/react-query"
import { WorkoutApi } from "./WorkoutApi";

export const useAddExerciseToWorkout = () => {
    return useMutation({
        mutationFn: async ({userId, workoutId, exerciseId} : {userId: string, workoutId: string, exerciseId: string}) => {
            return WorkoutApi.addExerciseToWorkout(userId, workoutId, exerciseId);
        }
    });
}