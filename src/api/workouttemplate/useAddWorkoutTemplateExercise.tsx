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

export const useAddWorkoutTemplateExercise = () => {};
