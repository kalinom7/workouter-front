


export type Workout = {
  id: string;
  userId: string;
  startTime: Date;
  endTime: Date | null;
  exercises: WorkoutExercise[];
};

export type WorkoutExerciseSet = {
  weight: number | null;
  reps: number | null;
  order: number;
  isCompleted: boolean;
};


export type WorkoutExercise = {
  exerciseId: string;
  sets: WorkoutExerciseSet[];
  restPeriod?: number; //seconds
  order: number;
  isCompleted: boolean;
};