import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkoutApi } from "../WorkoutApi";
import type { Workout } from "@/types/WorkoutTypes";

export const useRemoveSetFromWorkoutExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      workoutId,
      exerciseOrder,
      setOrder,
    }: {
      userId: string;
      workoutId: string;
      exerciseOrder: number;
      setOrder: number;
    }) => {
      return WorkoutApi.removeSet(userId, workoutId, exerciseOrder, setOrder);
    },
    onMutate: async ({ userId, workoutId, exerciseOrder, setOrder }) => {
      queryClient.cancelQueries({ queryKey: ["workout", workoutId, userId] });

      const previousWorkout = queryClient.getQueryData<Workout>([
        "workout",
        workoutId,
        userId,
      ]);

      queryClient.setQueryData(
        ["workout", workoutId, userId],
        (old: Workout) => {
          if (!old) return old;

          return filterSet(old, exerciseOrder, setOrder);
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

const filterSet = (
  workout: Workout,
  exerciseOrder: number,
  setOrder: number,
): Workout => {
  return {
    ...workout,
    exercises: workout.exercises.map((exercise) => {
      if (exercise.order !== exerciseOrder) return exercise;

      return {
        ...exercise,
        sets: exercise.sets.filter((set) => set.order !== setOrder),
      };
    }),
  };
};
