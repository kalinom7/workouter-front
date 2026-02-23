import { apiFetch } from "../fetch";
import type { Exercise } from "@/types/ExerciseTypes";

export class ExerciseApi {
  static async createExercise(
    userId: string,
    name: string,
    description?: string,
  ) {
    return apiFetch<Exercise>(`/exercises?userId=${userId}`, {
      method: "POST",
      body: JSON.stringify({ name, description }),
    });
  }

  static async getExercise(userId: string, exerciseId: string) {
    return apiFetch<Exercise>(`/exercises/${exerciseId}?userId=${userId}`, {
      method: "GET",
    });
  }

  static async getAllExercises(userId: string) {
    return apiFetch<Exercise[]>(`/exercises?userId=${userId}`, {
      method: "GET",
    });
  }

  static async updateExercise(
    userId: string,
    exerciseId: string,
    name?: string,
    description?: string,
  ) {
    return apiFetch<Exercise>(`/exercises/${exerciseId}?userId=${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ name, description }),
    });
  }

  static async deleteExercise(userId: string, exerciseId: string) {
    return apiFetch<void>(`/exercises/${exerciseId}?userId=${userId}`, {
      method: "DELETE",
    });
  }
}
