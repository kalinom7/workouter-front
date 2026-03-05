import type { WorkoutTemplate } from "../../types/WorkoutTemplateTypes";
import { apiFetch } from "../fetch";

export class WorkoutTemplateApi {
  static async createWorkoutTemplate(userId: string, name: string) {
    return apiFetch<WorkoutTemplate>(`/workout-templates?userId=${userId}`, {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  }

  static async editName(userId: string, workoutTemplateId: string, newName: string){
    return apiFetch<WorkoutTemplate>(`workout-templates/${workoutTemplateId}/edit-name/?userId=${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ newName }),
    }
    )
  }

  static async getWorkoutTemplate(userId: string, workoutTemplateId: string) {
    return apiFetch<WorkoutTemplate>(
      `/workout-templates/${workoutTemplateId}?userId=${userId}`,
      {
        method: "GET",
      },
    );
  }

  static async getAllWorkoutTemplates(userId: string) {
    return apiFetch<WorkoutTemplate[]>(`/workout-templates?userId=${userId}`, {
      method: "GET",
    });
  }

  static async addWorkoutTemplateExercise(
    userId: string,
    exerciseId: string,
    workoutTemplateId: string,
    sets: number,
    restPeriod: number,
  ) {
    return apiFetch<WorkoutTemplate>(
      `/workout-templates/${workoutTemplateId}/exercises?userId=${userId}`,
      {
        method: "POST",
        body: JSON.stringify({ exerciseId, sets, restPeriod }),
      },
    );
  }

  static async removeWorkoutTemplateExercise(
    userId: string,
    workoutTemplateId: string,
    order: number,
  ) {
    return apiFetch<WorkoutTemplate>(
      `/workout-templates/${workoutTemplateId}/exercises/${order}?userId=${userId}`,
      {
        method: "DELETE",
      },
    );
  }
  static async editWorkoutTemplateExercise(
    userId: string,
    exerciseId: string,
    workoutTemplateId: string,
    sets: number,
    restPeriod: number,
    order: number,
  ){
    return apiFetch<WorkoutTemplate>(
      `/workout-templates/${workoutTemplateId}/exercises/${order}?userId=${userId}`,
      {
        method: "PUT",
        body: JSON.stringify({ exerciseId, sets, restPeriod }),
      },
    );
  }

  static async deleteWorkoutTemplate(
    userId: string,
    workoutTemplateId: string,
  ) {
    return apiFetch<void>(
      `/workout-templates/${workoutTemplateId}?userId=${userId}`,
      {
        method: "DELETE",
      },
    );
  }
}
