import { useMutation, useQueryClient } from "@tanstack/react-query"
import { WorkoutApi } from "../WorkoutApi"
import type { Workout } from "@/types/WorkoutTypes";

export const useAddSetToWorkoutExercise = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({userId, workoutId, exerciseOrder} : {userId: string, workoutId: string, exerciseOrder: number}) => {
            return  WorkoutApi.addSet(userId, workoutId, exerciseOrder)
        },
        onMutate: async({userId, workoutId, exerciseOrder}) => {
            await queryClient.cancelQueries({queryKey:["workout", workoutId, userId]})

            const previousWorkout  = queryClient.getQueryData<Workout>(["workout", workoutId, userId]);

            queryClient.setQueryData(["workout", workoutId, userId], (old: Workout) => {
                if(!old) return old;
                
                return {
                    ...old,
                    exercises: old.exercises.map(ex => {
                        if(ex.order === exerciseOrder){
                            return {
                                ...ex,
                                sets: [
                                    ...ex.sets,
                                    {
                                        order: ex.sets.length,
                                        reps: 0,
                                        weight: 0
                                    }
                                ]
                            }
                        }
                        return ex;
                    })

                }
            })
            return {previousWorkout};
        },
        onError: (_err, variables, context ) => {
            if(context?.previousWorkout){
                queryClient.setQueryData(["workout", variables.workoutId, variables.userId], context.previousWorkout);
            }
        },

        onSettled: (_data, _error, variables) => {
            queryClient.invalidateQueries({queryKey: ["workout", variables.workoutId, variables.userId]});
        }
    })
}