import type { WorkoutTemplate } from "../../types/WorkoutTemplateTypes";
import { apiFetch } from "../fetch";

export class WorkoutTemplateApi {

    static async createWorkoutTemplate(userId: string, name: string){
        return apiFetch<WorkoutTemplate>(`/workout-templates?userId=${userId}`, {
            method: "POST",
            body: JSON.stringify({ name }),
        });
    }

    static async getWorkoutTemplate(userId: string, workoutTemplateId: string){
        return apiFetch<WorkoutTemplate>(`/workout-templates/${workoutTemplateId}?userId=${userId}`, {
            method: "GET",
        });
    }

    static async addWorkoutTemplateExercise(userId: string, exerciseId: string, workoutTemplateId: string){
        return apiFetch<WorkoutTemplate>(`/workout-templates/${workoutTemplateId}/exercises?userId=${userId}`, {
            method: "POST",
            body: JSON.stringify({ exerciseId }),
        });
    }

    static async removeWorkoutTemplateExercise(userId: string, exerciseId: string, workoutTemplateId: string){
        return apiFetch<WorkoutTemplate>(`/workout-templates/${workoutTemplateId}/exercises/${exerciseId}?userId=${userId}`, {
            method: "DELETE",
        });
    }

    static async setNumberOfSets(userId: string, order: number, sets: number, workoutTemplateId: string){
        return apiFetch<WorkoutTemplate>(`/workout-templates/${workoutTemplateId}/exercises/${order}/sets?userId=${userId}`, {
            method: "PATCH",
            body: JSON.stringify({ sets }),
        });
    }
    
    static async setRestPeriod(userId: string, order: number, restPeriod: number, workoutTemplateId: string){
        return apiFetch<WorkoutTemplate>(`/workout-templates/${workoutTemplateId}/exercises/${order}/rest-period?userId=${userId}`, {
            method: "PATCH",
            body: JSON.stringify({ restPeriod }),
        });
    }

   static async deleteWorkoutTemplate(userId: string, workoutTemplateId: string) {
        return apiFetch<void>(`/workout-templates/${workoutTemplateId}?userId=${userId}`, {
            method: "DELETE",
        });
    }
}