import type { WorkoutSchedule } from "../../types/WorkoutScheduleTypes";
import { apiFetch } from "../fetch";

export class WorkoutScheduleApi {
  static async createWorkoutSchedule(userId: string, name: string) {
    return apiFetch<WorkoutSchedule>(`/workout-schedules?userId=${userId}`, {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  }

  static async getWorkoutSchedule(userId: string, workoutScheduleId: string) {
    return apiFetch<WorkoutSchedule>(
      `/workout-schedules/${workoutScheduleId}?userId=${userId}`,
      {
        method: "GET",
      },
    );
  }

  static async getAllWorkoutSchedules(userId: string) {
    return apiFetch<WorkoutSchedule[]>(`/workout-schedules?userId=${userId}`, {
      method: "GET",
    });
  }

  static async deleteWorkoutSchedule(
    userId: string,
    workoutScheduleId: string,
  ) {
    return apiFetch<void>(
      `/workout-schedules/${workoutScheduleId}?userId=${userId}`,
      {
        method: "DELETE",
      },
    );
  }

  static async addWorkoutToPattern(
    userId: string,
    workoutTemplateId: string,
    workoutScheduleId: string,
  ) {
    return apiFetch<WorkoutSchedule>(
      `/workout-schedules/${workoutScheduleId}/pattern/workout?userId=${userId}`,
      {
        method: "POST",
        body: JSON.stringify({ workoutTemplateId }),
      },
    );
  }

  static async addRestToPatternWorkout(
    userId: string,
    workoutScheduleId: string,
    restDays: number,
    patternItemId: string,    
  ) {
    return apiFetch<WorkoutSchedule>(
      `/workout-schedules/${workoutScheduleId}/pattern/${patternItemId}?userId=${userId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ restDays }),
      },
    );
  }

  static async removePatternItem(
    userId: string,
    patternItemId: string,
    workoutScheduleId: string,
  ) {
    return apiFetch<WorkoutSchedule>(
      `/workout-schedules/${workoutScheduleId}/pattern/${patternItemId}?userId=${userId}`,
      {
        method: "DELETE",
      },
    );
  }

  static async setWorkoutScheduleActive(
    userId: string,
    workoutScheduleId: string,
  ) {
    return apiFetch<WorkoutSchedule>(
      `/workout-schedules/${workoutScheduleId}/activate?userId=${userId}`,
      {
        method: "PATCH",
      },
    );
  }

  static async setWorkoutScheduleInactive(
    userId: string,
    workoutScheduleId: string,
  ) {
    return apiFetch<WorkoutSchedule>(
      `/workout-schedules/${workoutScheduleId}/deactivate?userId=${userId}`,
      {
        method: "PATCH",
      },
    );
  }

  static async renameWorkoutSchedule(
    userId: string,
    workoutScheduleId: string,
    newName: string,
  ) {
    return apiFetch<WorkoutSchedule>(
      `/workout-schedules/${workoutScheduleId}/rename?userId=${userId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ newName }),
      },
    );
  }

  static async getScheduledActivity(userId: string){
    return apiFetch<string | null>(`/workout-schedules/getScheduledActivity?userId=${userId}`,
      {
        method: "GET",
      }
    )
  }
}
