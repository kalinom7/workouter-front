import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkoutApi } from "../WorkoutApi";
import type { Workout } from "@/types/WorkoutTypes";
import type { Exercise } from "@/types/ExerciseTypes";

export const useAddExerciseToWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      workoutId,
      exercise,
    }: {
      userId: string;
      workoutId: string;
      exercise: Exercise;
    }) => {
      return WorkoutApi.addExerciseToWorkout(userId, workoutId, exercise.id);
    },
    onMutate: async ({ userId, workoutId, exercise }) => {
      await queryClient.cancelQueries({
        queryKey: ["workout", workoutId, userId],
      });

      const previousWorkout = queryClient.getQueryData<Workout>([
        "workout",
        workoutId,
        userId,
      ]);

      queryClient.setQueryData(
        ["workout", workoutId, userId],
        (old: Workout) => {
          if (!old) return old;

          return {
            ...old,
            exercises: [
              ...old.exercises,
              {
                exercise: {
                  id: exercise.id,
                  name: exercise.name,
                },
                order: old.exercises.length,
                sets: [],
              },
            ],
          };
        },
      );

      return { previousWorkout };
    },
    onError: (_err, variables, context) => {
      if (context?.previousWorkout) {
        queryClient.setQueryData(
          ["workout", variables.workoutId, variables.userId],
          context.previousWorkout,
        );
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["workout", variables.workoutId, variables.userId],
      });
    },
  });
};
