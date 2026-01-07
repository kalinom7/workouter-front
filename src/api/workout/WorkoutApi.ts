import { apiFetch } from "../fetch";

export class WorkoutApi{

    static async startWorkoutFromTemplate(userId: string, workoutTemplateId: string){
        return apiFetch(`/workouts/start/from-template?userId=${userId}`, {
            method: "POST",
            body: JSON.stringify({ workoutTemplateId }),
        });
    }
    
    static async startEmptyWorkout(userId: string){
        return apiFetch(`/workouts/start/empty?userId=${userId}`, {
            method: "POST",
        });
    }

    static async getWorkout(userId: string, workoutId: string){
        return apiFetch(`/workouts/${workoutId}?userId=${userId}`, {
            method: "GET",
        });
    }

    static async finishWorkout(userId: string, workoutId: string){
        return apiFetch(`/workouts/${workoutId}/finish?userId=${userId}`, {
            method: "PATCH",
        });
    }

    static async addExerciseToWorkout(userId: string, workoutId: string, exerciseId: string){
        return apiFetch(`/workouts/${workoutId}/exercises?userId=${userId}`, {
            method: "POST",
            body: JSON.stringify({ exerciseId }),
        });
    }

    static async removeExerciseFromWorkout(userId: string, workoutId: string, exerciseOrder: number){
        return apiFetch(`/workouts/${workoutId}/exercises/${exerciseOrder}?userId=${userId}`, {
            method: "DELETE",
        });
    }

    static async addSet(userId: string, workoutId: string, exerciseOrder: number){
        return apiFetch(`/workouts/${workoutId}/exercises/${exerciseOrder}/sets?userId=${userId}`, {
            method: "POST",
        });
    }

    static async removeSet(userId: string, workoutId: string, exerciseOrder: number, setOrder: number){
        return apiFetch(`/workouts/${workoutId}/exercises/${exerciseOrder}/sets/${setOrder}?userId=${userId}`, {
            method: "DELETE",
        });
    }

    static async addWeightAndRepsToSet(userId: string, workoutId: string, exerciseOrder: number, setOrder:number, weight: number, reps: number){
        return apiFetch(`/workouts/${workoutId}/exercises/${exerciseOrder}/sets/${setOrder}?userId=${userId}`, {
            method: "PATCH",
            body: JSON.stringify({ weight, reps }),
        });
    }

    static async markSetAsCompleted(userId: string, workoutId: string, exerciseOrder: number, setOrder: number){
        return apiFetch(`/workouts/${workoutId}/exercises/${exerciseOrder}/sets/${setOrder}/complete?userId=${userId}`, {
            method: "PATCH",
        });
    }

    static async markSetAsUncompleted(userId: string, workoutId: string, exerciseOrder: number, setOrder: number){
        return apiFetch(`/workouts/${workoutId}/exercises/${exerciseOrder}/sets/${setOrder}/uncomplete?userId=${userId}`, {
            method: "PATCH",
        });
    }

    static async markExerciseAsCompleted(userId: string, workoutId: string, exerciseOrder: number){
        return apiFetch(`/workouts/${workoutId}/exercises/${exerciseOrder}/complete?userId=${userId}`, {
            method: "PATCH",
        });
    }

    static async markExerciseAsUncompleted(userId: string, workoutId: string, exerciseOrder: number){
        return apiFetch(`/workouts/${workoutId}/exercises/${exerciseOrder}/uncomplete?userId=${userId}`, {
            method: "PATCH",
        });
    }
}
