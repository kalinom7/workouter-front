import type { WorkoutTemplateExercise } from "@/types/WorkoutTemplateTypes";
import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../fetch";

export type WorkoutTemplate = {
    id: string;
    name: string;
    userId: string;
    exercises: WorkoutTemplateExercise[];
}


export const useCreateWorkoutTemplate = () => {
    return useMutation({
        mutationFn: async ({ userId, name }: { userId: string; name: string }) =>
            {
                await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay
                return  apiFetch<WorkoutTemplate>(`/workout-templates?userId=${userId}`, {
                            method: "POST",
                            body: JSON.stringify({ name }),
                        });
            },
    })
};