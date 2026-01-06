import type { CreateExercisePayload, Exercise } from "../../types/Exercise";
import { apiFetch } from "../http";

export class ExerciseApi { 

    static async createExercise(userId: string, payload: CreateExercisePayload) {
        return apiFetch<Exercise>(`/exercises?userId=${userId}`, {
            method: "POST",
            body: JSON.stringify(payload),
        });
    }
}