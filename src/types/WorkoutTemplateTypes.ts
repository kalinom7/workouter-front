import type { Exercise } from "./ExerciseTypes";

export type WorkoutTemplateExercise = {
  exercise: Exercise;
  sets: number;
  restPeriod: number; //seconds
  order: number;
};


export type WorkoutTemplate = {
    id: string;
    name: string;
    userId: string;
    exercises: WorkoutTemplateExercise[];
}
