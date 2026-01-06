import type { WorkoutSchedule } from "../../types/WorkoutScheduleTypes";
import { apiFetch } from "../fetch";

export class WorkoutScheduleApi {

    static async createWorkoutSchedule(userId: string, name: string){
        return apiFetch<WorkoutSchedule>(`/workout-schedules?userId=${userId}`, {
            method: "POST",
            body: JSON.stringify({ name }),
        });
    }

    static async getWorkoutSchedule(userId: string, workoutScheduleId: string){
        return apiFetch<WorkoutSchedule>(`/workout-schedules/${workoutScheduleId}?userId=${userId}`, {
            method: "GET",
        });
    }
    
    static async deleteWorkoutSchedule(userId: string, workoutScheduleId: string) {
        return apiFetch<void>(`/workout-schedules/${workoutScheduleId}?userId=${userId}`, {
            method: "DELETE",
        });
    }

    static async addWorkoutToBlock(userId: string, workoutTemplateId: string, workoutScheduleId: string){
        return apiFetch<WorkoutSchedule>(`/workout-schedules/${workoutScheduleId}/block/workout?userId=${userId}`, {
            method: "POST",
            body: JSON.stringify({ workoutTemplateId }),
        });
    }

    static async addRestToBlock(userId: string, restPeriod: number, workoutScheduleId: string){
        return apiFetch<WorkoutSchedule>(`/workout-schedules/${workoutScheduleId}/block/rest?userId=${userId}`, {
            method: "POST",
            body: JSON.stringify({ restPeriod }),
        });
    }

    static async removeBlockItem(userId: string, blockItemId: string, workoutScheduleId: string){
        return apiFetch<WorkoutSchedule>(`/workout-schedules/${workoutScheduleId}/block/${blockItemId}?userId=${userId}`, {
            method: "DELETE",
        });
    }

    static async setWorkoutScheduleActive(userId: string, workoutScheduleId: string){
        return apiFetch<WorkoutSchedule>(`/workout-schedules/${workoutScheduleId}/activate?userId=${userId}`, {
            method: "PATCH",
        });
    }
    
    static async setWorkoutScheduleInactive(userId: string, workoutScheduleId: string){
        return apiFetch<WorkoutSchedule>(`/workout-schedules/${workoutScheduleId}/deactivate?userId=${userId}`, {
            method: "PATCH",
        });
    }
}