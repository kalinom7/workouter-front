import type { CreateExercisePayload, Exercise, UpdateExercisePayload,} from "../../types/ExerciseTypes";
import { apiFetch } from "../fetch";

export class ExerciseApi { 

    static async createExercise(userId: string, payload: CreateExercisePayload) {
        return apiFetch<Exercise>(`/exercises?userId=${userId}`, {
            method: "POST",
            body: JSON.stringify(payload),
        });
    }

    static async getExercise(userId: string, exerciseId: string ) {
        return apiFetch<Exercise>(`/exercises/${exerciseId}?userId=${userId}`, {
            method: "GET",
        });
    }

    static async updateExercise(userId: string, exerciseId: string, payload: UpdateExercisePayload){
        return apiFetch<Exercise>(`/exercises/${exerciseId}?userId=${userId}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
        });
    }

    static async deleteExercise(userId: string, exerciseId: string) {
        return apiFetch<void>(`/exercises/${exerciseId}?userId=${userId}`, {
            method: "DELETE",
        });
    }
}