import { useQuery } from "@tanstack/react-query"
import { WorkoutApi } from "./WorkoutApi"

export const useGetWorkout = (userId:string, workoutId:string) => {
    return useQuery({
        queryKey: ["workout", workoutId, userId],
        queryFn: async () => {
            return WorkoutApi.getWorkout(userId, workoutId)
        }
    })
}