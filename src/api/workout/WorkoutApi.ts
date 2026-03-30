import { apiFetch } from "../fetch";
import type { Workout } from "../../types/WorkoutTypes";

export class WorkoutApi {
  static async startWorkoutFromTemplate(
    userId: string,
    workoutTemplateId: string,
  ) {
    return apiFetch<Workout>(`/workouts/start/from-template?userId=${userId}`, {
      method: "POST",
      body: JSON.stringify({ workoutTemplateId }),
    });
  }

  static async startEmptyWorkout(userId: string) {
    return apiFetch<Workout>(`/workouts/start/empty?userId=${userId}`, {
      method: "POST",
    });
  }

  static async getWorkout(userId: string, workoutId: string) {
    return apiFetch<Workout>(`/workouts/${workoutId}?userId=${userId}`, {
      method: "GET",
    });
  }

  static async finishWorkout(userId: string, workoutId: string) {
    return apiFetch<Workout>(`/workouts/${workoutId}/finish?userId=${userId}`, {
      method: "PATCH",
    });
  }

  static async addExerciseToWorkout(
    userId: string,
    workoutId: string,
    exerciseId: string,
  ) {
    return apiFetch<Workout>(
      `/workouts/${workoutId}/exercises?userId=${userId}`,
      {
        method: "POST",
        body: JSON.stringify({ exerciseId }),
      },
    );
  }

  static async removeExerciseFromWorkout(
    userId: string,
    workoutId: string,
    exerciseOrder: number,
  ) {
    return apiFetch<Workout>(
      `/workouts/${workoutId}/exercises/${exerciseOrder}?userId=${userId}`,
      {
        method: "DELETE",
      },
    );
  }

  static async addSet(
    userId: string,
    workoutId: string,
    exerciseOrder: number,
  ) {
    return apiFetch<Workout>(
      `/workouts/${workoutId}/exercises/${exerciseOrder}/sets?userId=${userId}`,
      {
        method: "POST",
      },
    );
  }

  static async removeSet(
    userId: string,
    workoutId: string,
    exerciseOrder: number,
    setOrder: number,
  ) {
    return apiFetch<Workout>(
      `/workouts/${workoutId}/exercises/${exerciseOrder}/sets/${setOrder}?userId=${userId}`,
      {
        method: "DELETE",
      },
    );
  }

  static async saveSet(
    userId: string,
    workoutId: string,
    exerciseOrder: number,
    setOrder: number,
    weight: number,
    reps: number,
  ) {
    return apiFetch<Workout>(
      `/workouts/${workoutId}/exercises/${exerciseOrder}/sets/${setOrder}?userId=${userId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ weight, reps }),
      },
    );
  }

  static async markSetAsCompleted(
    userId: string,
    workoutId: string,
    exerciseOrder: number,
    setOrder: number,
  ) {
    return apiFetch<Workout>(
      `/workouts/${workoutId}/exercises/${exerciseOrder}/sets/${setOrder}/complete?userId=${userId}`,
      {
        method: "PATCH",
      },
    );
  }

  static async markSetAsUncompleted(
    userId: string,
    workoutId: string,
    exerciseOrder: number,
    setOrder: number,
  ) {
    return apiFetch<Workout>(
      `/workouts/${workoutId}/exercises/${exerciseOrder}/sets/${setOrder}/uncomplete?userId=${userId}`,
      {
        method: "PATCH",
      },
    );
  }

  static async markExerciseAsCompleted(
    userId: string,
    workoutId: string,
    exerciseOrder: number,
  ) {
    return apiFetch<Workout>(
      `/workouts/${workoutId}/exercises/${exerciseOrder}/complete?userId=${userId}`,
      {
        method: "PATCH",
      },
    );
  }

  static async markExerciseAsUncompleted(
    userId: string,
    workoutId: string,
    exerciseOrder: number,
  ) {
    return apiFetch<Workout>(
      `/workouts/${workoutId}/exercises/${exerciseOrder}/uncomplete?userId=${userId}`,
      {
        method: "PATCH",
      },
    );
  }

  static async setRestPeriod(userId:string, workoutId: string, exerciseOrder: number, restPeriod: number){
    return apiFetch<Workout>(`/workouts/${workoutId}/exercises/${exerciseOrder}/setRestPeriod?userId=${userId}`,{
      method: "PATCH",
      body: JSON.stringify(restPeriod),
    })
  }
  
}
