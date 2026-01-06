export type WorkoutTemplateExercise = {
  exercise: string;
  sets: number;
  restPeriod: number; //seconds
  order: number;
};


export interface WorkoutTemplate{
    id: string;
    name: string;
    userId: string;
    exercises: WorkoutTemplateExercise[];
}

