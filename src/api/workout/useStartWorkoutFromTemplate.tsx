import { useMutation } from "@tanstack/react-query"
import { WorkoutApi } from "./WorkoutApi";

export const useStartWorkoutFromTemplate = () => {
    return (
        useMutation({
            mutationFn: async ({userId, workoutTemplateId}: {userId: string, workoutTemplateId: string}) => {
                await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay
                return WorkoutApi.startWorkoutFromTemplate(userId, workoutTemplateId);
            }
})
    )
}