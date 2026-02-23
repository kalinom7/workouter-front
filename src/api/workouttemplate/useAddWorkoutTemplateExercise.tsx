import { useMutation } from "@tanstack/react-query";
import { WorkoutTemplateApi } from "./WorkoutTemplateApi";

export type WorkoutTemplateExercise = {
  exercise: string;
  sets: number;
  restPeriod: number; //seconds
  order: number;
};

export type WorkoutTemplate = {
  id: string;
  name: string;
  userId: string;
  exercises: WorkoutTemplateExercise[];
};

export const useAddWorkoutTemplateExercise = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      workoutTemplateId,
      exerciseId,
      sets,
      restPeriod,
    }: {
      userId: string;
      workoutTemplateId: string;
      exerciseId: string;
      sets?: number;
      restPeriod?: number;
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate network delay
      let updatedTemplate = await WorkoutTemplateApi.addWorkoutTemplateExercise(
        userId,
        exerciseId,
        workoutTemplateId,
      );

      if (sets !== undefined && sets > 0) {
        const exerciseIndex = updatedTemplate.exercises.findIndex(
          (ex) => ex.exercise === exerciseId,
        );
        updatedTemplate = await WorkoutTemplateApi.setNumberOfSets(
          userId,
          exerciseIndex,
          sets,
          workoutTemplateId,
        );
      }

      if (restPeriod !== undefined && restPeriod > 0) {
        const exerciseIndex = updatedTemplate.exercises.findIndex(
          (ex) => ex.exercise === exerciseId,
        );
        updatedTemplate = await WorkoutTemplateApi.setRestPeriod(
          userId,
          exerciseIndex,
          restPeriod,
          workoutTemplateId,
        );
      }

      return updatedTemplate;
    },
  });
};
